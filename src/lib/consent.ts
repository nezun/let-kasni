"use client";

import {
  getCookieHeaderValue,
  parseTrackingConsentValue,
  serializeTrackingConsentCookie,
  trackingConsentCookieMaxAge,
  trackingConsentCookieName,
  trackingConsentNoticeVersion,
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
    const cookieValue = getClientConsentCookie() ?? null;
    // The cookie is the only runtime authority. The head bootstrap migrates
    // legacy localStorage before first paint, so localStorage must never
    // become a second render-time decision path.
    const cacheKey = `cookie:${cookieValue ?? ""}`;
    if (cacheKey === cachedRawValue) {
      return cachedConsent;
    }

    cachedRawValue = cacheKey;
    cachedConsent = parseConsent(cookieValue);
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

  const consent: TrackingConsent =
    value === "granted" || value === "denied"
      ? {
          v: 3 as const,
          analytics: value === "granted",
          marketing: value === "granted",
          ts: Date.now(),
          notice: trackingConsentNoticeVersion,
        }
      : {
          v: 3 as const,
          analytics: value.analytics,
          marketing: value.marketing,
          ts: value.ts,
          notice: trackingConsentNoticeVersion,
        };

  clearOptionalTrackingCookies({
    analytics: !consent.analytics,
    advertising: !consent.marketing,
  });

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

function expireCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
}

export function clearOptionalTrackingCookies(options: { analytics: boolean; advertising: boolean }) {
  if (typeof document === "undefined") return;
  const names = document.cookie.split(";").map((item) => item.trim().split("=", 1)[0]).filter(Boolean);
  for (const name of names) {
    if ((options.analytics && (name === "_gid" || name.startsWith("_ga"))) || (options.advertising && (name === "_fbp" || name === "_fbc"))) {
      expireCookie(name);
    }
  }
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
    clearOptionalTrackingCookies({ analytics: true, advertising: true });
    document.cookie = `${trackingConsentCookieName}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
    delete document.documentElement.dataset.consent;
  } catch {
    // The banner remains available if the browser rejects cookie changes.
  }

  cachedRawValue = "storage:";
  cachedConsent = null;

  window.dispatchEvent(new Event(trackingConsentEvent));
}
