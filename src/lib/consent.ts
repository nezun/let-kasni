"use client";

import {
  getCookieHeaderValue,
  parseTrackingConsentValue,
  serializeTrackingConsentCookie,
  trackingConsentCookieMaxAge,
  trackingConsentCookieName,
  type ConsentCookieValue,
} from "@/lib/consent-cookie";

export type TrackingConsent = ConsentCookieValue;

type LegacyTrackingConsent = "granted" | "denied";
type TrackingConsentInput = TrackingConsent | LegacyTrackingConsent;

const trackingConsentKey = "letkasni-tracking-consent-v1";
export const trackingConsentEvent = "letkasni:tracking-consent-change";

let cachedRawValue: string | null | undefined;
let cachedConsent: TrackingConsent | null = null;

function parseConsent(value: string | null): TrackingConsent | null {
  return parseTrackingConsentValue(value);
}

function getClientConsentCookie() {
  return getCookieHeaderValue(document.cookie, trackingConsentCookieName);
}

export function getTrackingConsent(): TrackingConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const cookieValue = getClientConsentCookie();
    if (cookieValue) {
      const cacheKey = `cookie:${cookieValue}`;
      if (cacheKey === cachedRawValue) {
        return cachedConsent;
      }

      cachedRawValue = cacheKey;
      cachedConsent = parseConsent(cookieValue);
      return cachedConsent;
    }

    const rawValue = window.localStorage.getItem(trackingConsentKey);
    const cacheKey = `storage:${rawValue ?? ""}`;
    if (cacheKey === cachedRawValue) {
      return cachedConsent;
    }

    cachedRawValue = cacheKey;
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
      ? {
          v: 2 as const,
          analytics: value === "granted",
          marketing: value === "granted",
          ts: 0,
        }
      : {
          v: 2 as const,
          analytics: value.analytics,
          marketing: value.marketing,
          ts: value.ts,
        };

  const rawValue = JSON.stringify(consent);
  try {
    window.localStorage.setItem(trackingConsentKey, rawValue);
  } catch {
    // The cookie remains the server-readable source if storage is unavailable.
  }

  try {
    const cookieValue = serializeTrackingConsentCookie(consent);
    document.cookie = `${trackingConsentCookieName}=${cookieValue}; Max-Age=${trackingConsentCookieMaxAge}; Path=/; SameSite=Lax; Secure`;
    document.documentElement.dataset.consent = "1";
    cachedRawValue = `cookie:${cookieValue}`;
    cachedConsent = consent;
  } catch {
    // Tracking remains blocked if the browser also rejects cookies.
  }

  window.dispatchEvent(new Event(trackingConsentEvent));
}

export function clearTrackingConsent() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(trackingConsentKey);
  } catch {
    // Continue and remove the server-readable cookie as well.
  }

  try {
    document.cookie = `${trackingConsentCookieName}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
    delete document.documentElement.dataset.consent;
  } catch {
    // The banner remains available if the browser rejects cookie changes.
  }

  cachedRawValue = "storage:";
  cachedConsent = null;

  window.dispatchEvent(new Event(trackingConsentEvent));
}
