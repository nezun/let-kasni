"use client";

export type TrackingConsent = {
  v: 2;
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

type LegacyTrackingConsent = "granted" | "denied";
type TrackingConsentInput = TrackingConsent | LegacyTrackingConsent;

const trackingConsentKey = "letkasni-tracking-consent-v1";
export const trackingConsentEvent = "letkasni:tracking-consent-change";

let cachedRawValue: string | null | undefined;
let cachedConsent: TrackingConsent | null = null;

function fromLegacyConsent(value: LegacyTrackingConsent): TrackingConsent {
  const granted = value === "granted";
  return {
    v: 2,
    analytics: granted,
    marketing: granted,
    ts: 0,
  };
}

function parseConsent(value: string | null): TrackingConsent | null {
  if (value === "granted" || value === "denied") {
    return fromLegacyConsent(value);
  }

  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Record<string, unknown>;
    if (
      parsed.v !== 2 ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean"
    ) {
      return null;
    }

    return {
      v: 2,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      ts: typeof parsed.ts === "number" ? parsed.ts : 0,
    };
  } catch {
    return null;
  }
}

export function getTrackingConsent(): TrackingConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(trackingConsentKey);
    if (rawValue === cachedRawValue) {
      return cachedConsent;
    }

    cachedRawValue = rawValue;
    cachedConsent = parseConsent(rawValue);
    return cachedConsent;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent() {
  return getTrackingConsent()?.analytics === true;
}

export function hasMarketingConsent() {
  return getTrackingConsent()?.marketing === true;
}

// Kept as a compatibility helper for callers that only need to know whether
// any optional tracking category was accepted.
export function hasTrackingConsent() {
  const consent = getTrackingConsent();
  return consent?.analytics === true || consent?.marketing === true;
}

export function setTrackingConsent(value: TrackingConsentInput) {
  if (typeof window === "undefined") {
    return;
  }

  const consent =
    value === "granted" || value === "denied"
      ? fromLegacyConsent(value)
      : {
          v: 2 as const,
          analytics: value.analytics,
          marketing: value.marketing,
          ts: value.ts,
        };

  try {
    const rawValue = JSON.stringify(consent);
    window.localStorage.setItem(trackingConsentKey, rawValue);
    cachedRawValue = rawValue;
    cachedConsent = consent;
  } catch {
    // Tracking remains blocked if storage is unavailable.
  }

  window.dispatchEvent(new Event(trackingConsentEvent));
}

export function clearTrackingConsent() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(trackingConsentKey);
    cachedRawValue = null;
    cachedConsent = null;
  } catch {
    // The banner remains available even if storage cannot be changed.
  }

  window.dispatchEvent(new Event(trackingConsentEvent));
}
