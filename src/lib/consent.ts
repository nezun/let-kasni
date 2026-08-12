"use client";

export type TrackingConsent = "granted" | "denied";

const trackingConsentKey = "letkasni-tracking-consent-v1";
export const trackingConsentEvent = "letkasni:tracking-consent-change";

export function getTrackingConsent(): TrackingConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(trackingConsentKey);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function hasTrackingConsent() {
  return getTrackingConsent() === "granted";
}

export function setTrackingConsent(value: TrackingConsent) {
  try {
    window.localStorage.setItem(trackingConsentKey, value);
  } catch {
    // Tracking remains blocked if storage is unavailable.
  }

  window.dispatchEvent(new Event(trackingConsentEvent));
}
