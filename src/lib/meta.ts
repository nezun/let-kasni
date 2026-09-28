"use client";

import { hasMarketingConsent } from "@/lib/consent";
import { getSiteVerzijaClient } from "@/lib/site-version";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type MetaEventParams = Record<string, string | number | boolean | undefined>;

export function getMetaEventId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function trackMetaEvent(
  eventName: string,
  params: MetaEventParams = {},
  eventId?: string,
) {
  if (
    typeof window === "undefined" ||
    !hasMarketingConsent() ||
    typeof window.fbq !== "function"
  ) {
    return;
  }

  // proba dve verzije sajta (28.09.2026): verzija ide u svaki događaj, jedno mesto za sve pozivaoce
  const verzija = getSiteVerzijaClient() === "b" ? "B" : "A";
  const cleanParams = Object.fromEntries(
    Object.entries({ ...params, verzija }).filter(([, value]) => value !== undefined),
  );

  if (eventId) {
    window.fbq("track", eventName, cleanParams, { eventID: eventId });
    return;
  }

  window.fbq("track", eventName, cleanParams);
}
