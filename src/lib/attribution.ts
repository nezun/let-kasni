"use client";

import {
  appendAttributionParameters,
  attributionMaxAgeMs,
  attributionStorageKey,
  getAttributionFromPage,
  mergeAttribution,
  sanitizeClaimAttribution,
  type ClaimAttribution,
} from "@/lib/attribution-core";
import { hasMarketingConsent } from "@/lib/consent";

function isFresh(attribution: ClaimAttribution) {
  const capturedAt = Date.parse(attribution.captured_at);
  return (
    Number.isFinite(capturedAt) &&
    Date.now() - capturedAt >= 0 &&
    Date.now() - capturedAt <= attributionMaxAgeMs
  );
}

export function clearStoredAttribution() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(attributionStorageKey);
  } catch {
    // Tracking remains disabled when storage is unavailable.
  }
}

export function getStoredAttribution() {
  if (typeof window === "undefined" || !hasMarketingConsent()) {
    return undefined;
  }

  try {
    const parsed = sanitizeClaimAttribution(
      JSON.parse(window.localStorage.getItem(attributionStorageKey) ?? "null"),
    );
    if (!parsed || !isFresh(parsed)) {
      clearStoredAttribution();
      return undefined;
    }
    return parsed;
  } catch {
    clearStoredAttribution();
    return undefined;
  }
}

export function captureCurrentAttribution() {
  if (typeof window === "undefined" || !hasMarketingConsent()) {
    clearStoredAttribution();
    return undefined;
  }

  const incoming = getAttributionFromPage(
    window.location.href,
    document.referrer,
  );
  if (!incoming) return getStoredAttribution();

  const attribution = mergeAttribution(getStoredAttribution() ?? null, incoming);
  try {
    window.localStorage.setItem(
      attributionStorageKey,
      JSON.stringify(attribution),
    );
  } catch {
    return undefined;
  }
  return attribution;
}

export function getAttributionForSubmission() {
  return captureCurrentAttribution();
}

export function withCurrentAttributionParameters(destination: string) {
  if (typeof window === "undefined") return destination;
  return appendAttributionParameters(destination, window.location.href);
}
