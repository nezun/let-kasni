"use client";

import {
  appendForwardAttribution,
  attributionMaxAgeMs,
  attributionStorageKey,
  getAttributionFromPage,
  mergeAttribution,
  getForwardableAttribution,
  sanitizeClaimAttribution,
  sanitizeForwardableAttribution,
  type ClaimAttribution,
  type ForwardableAttribution,
} from "@/lib/attribution-core";
import { hasAnalyticsConsent, hasMarketingConsent } from "@/lib/consent";

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

// Prvi izvor u sesiji, samo uz pristanak za analitiku (sessionStorage, briše se sa karticom ili bez pristanka).
const sessionAttributionKey = "letkasni-attribution-session-v1";

export function clearSessionAttribution() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(sessionAttributionKey);
  } catch {
    // Bez skladišta nema ni čuvanja.
  }
}

export function rememberSessionAttribution() {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) {
    clearSessionAttribution();
    return;
  }
  const current = getForwardableAttribution(window.location.href);
  if (Object.keys(current).length === 0) return;
  try {
    if (!window.sessionStorage.getItem(sessionAttributionKey)) {
      window.sessionStorage.setItem(sessionAttributionKey, JSON.stringify(current));
    }
  } catch {
    // Bez skladišta važi samo prenos sa trenutne strane.
  }
}

function readSessionAttribution(): ForwardableAttribution {
  if (!hasAnalyticsConsent()) return {};
  try {
    return sanitizeForwardableAttribution(JSON.parse(window.sessionStorage.getItem(sessionAttributionKey) ?? "null"));
  } catch {
    return {};
  }
}

/**
 * Adresa forme sa izvorom posete. Parametri sa trenutne strane idu uvek (samo kroz URL, ništa se ne čuva). Ako ih
 * trenutna strana nema, a postoji pristanak za analitiku, ide prvi izvor iz ove sesije. Dva izvora se ne mešaju.
 */
export function withCurrentAttributionParameters(destination: string) {
  if (typeof window === "undefined") return destination;
  const fromPage = getForwardableAttribution(window.location.href);
  const source = Object.keys(fromPage).length > 0 ? fromPage : readSessionAttribution();
  return appendForwardAttribution(destination, source, window.location.origin);
}
