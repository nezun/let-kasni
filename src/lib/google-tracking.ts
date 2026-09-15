"use client";

import { hasAnalyticsConsent, hasMarketingConsent } from "@/lib/consent";

export type GoogleJourneyEvent =
  | "claim_start"
  | "lead_submit"
  | "phone_click"
  | "whatsapp_click";

type GoogleJourneyParams = {
  event_category: "claim" | "contact";
  event_label?: string;
  form_locale?: "sr" | "en";
  provider_status?: string;
  transaction_id?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const deliveredEventKeys = new Set<string>();

function cleanParams(params: GoogleJourneyParams) {
  return Object.fromEntries(
    Object.entries(params).flatMap(([key, value]) => {
      if (value === undefined) return [];
      return [[key, typeof value === "string" ? value.slice(0, 200) : value]];
    }),
  );
}

export function updateGoogleConsent(consent: {
  analytics: boolean;
  marketing: boolean;
} | null) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("consent", "update", {
    analytics_storage: consent?.analytics ? "granted" : "denied",
    ad_storage: consent?.marketing ? "granted" : "denied",
    ad_user_data: consent?.marketing ? "granted" : "denied",
    ad_personalization: consent?.marketing ? "granted" : "denied",
  });
}

export function trackGoogleJourneyEvent(
  eventName: GoogleJourneyEvent,
  params: GoogleJourneyParams,
) {
  if (typeof window === "undefined") return false;

  const clean = cleanParams(params);
  const analyticsAllowed = hasAnalyticsConsent();
  const marketingAllowed = hasMarketingConsent();

  if (
    (analyticsAllowed || marketingAllowed) &&
    typeof window.gtag === "function"
  ) {
    window.gtag("event", eventName, clean);
    return true;
  }

  if (marketingAllowed) {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: eventName, ...clean });
    return true;
  }

  return false;
}

function trackOnce(
  key: string,
  eventName: GoogleJourneyEvent,
  params: GoogleJourneyParams,
) {
  const storageKey = `letkasni-google-event:${key}`;
  if (deliveredEventKeys.has(storageKey)) return false;
  try {
    if (window.sessionStorage.getItem(storageKey)) return false;
  } catch {
    // The in-memory guard below still prevents render-driven duplicates.
  }

  const delivered = trackGoogleJourneyEvent(eventName, params);
  if (delivered) {
    deliveredEventKeys.add(storageKey);
    try {
      window.sessionStorage.setItem(storageKey, "1");
    } catch {
      // Event delivery must not depend on storage availability.
    }
  }
  return delivered;
}

export function trackClaimStartOnce(
  source: string,
  locale: "sr" | "en",
) {
  return trackOnce(`claim_start:${window.location.pathname}`, "claim_start", {
    event_category: "claim",
    event_label: source,
    form_locale: locale,
  });
}

export function trackLeadSubmitOnce(input: {
  claimId: string;
  source: string;
  locale: "sr" | "en";
  providerStatus?: string;
}) {
  return trackOnce(`lead_submit:${input.claimId}`, "lead_submit", {
    event_category: "claim",
    event_label: input.source,
    form_locale: input.locale,
    provider_status: input.providerStatus,
    transaction_id: input.claimId,
  });
}
