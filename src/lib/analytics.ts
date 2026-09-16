"use client";

import { hasAnalyticsConsent } from "@/lib/consent";
import { getGoogleAnalyticsId } from "@/lib/env";
import { analyticsEventParams, analyticsPageContext } from "@/lib/analytics-privacy";

let publicPaths: readonly string[] = [];
let initialized = false;
let previousPage: string | null = null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function syncAnalytics(publicPagePaths: readonly string[]) {
  if (typeof window === "undefined") return;
  publicPaths = publicPagePaths;
  const measurementId = getGoogleAnalyticsId();
  const context = analyticsPageContext(window.location.href, document.referrer, publicPaths);
  const allowed = hasAnalyticsConsent() && context !== null;
  // Google's supported per-destination opt-out also stops a previously loaded tag.
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = !allowed;
  if (!allowed) {
    previousPage = null;
    return;
  }
  if (typeof window.gtag !== "function") return;
  if (!initialized) {
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { ...context, send_page_view: false });
    initialized = true;
  }
  if (previousPage === window.location.href) return;
  trackPageView(window.location.href);
  previousPage = window.location.href;
}

export function trackPageView(url: string) {
  if (
    typeof window === "undefined" ||
    !hasAnalyticsConsent() ||
    typeof window.gtag !== "function"
  ) {
    return;
  }
  const context = analyticsPageContext(url, document.referrer, publicPaths);
  if (!context) return;
  // Scope context to GA4, not Ads/Meta. Requires History enhanced measurement OFF.
  window.gtag("config", getGoogleAnalyticsId(), { ...context, update: true, send_page_view: false });
  window.gtag("event", "page_view", {
    ...context,
    send_to: getGoogleAnalyticsId(),
  });
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (
    typeof window === "undefined" ||
    !hasAnalyticsConsent() ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  const context = analyticsPageContext(window.location.href, document.referrer, publicPaths);
  if (!context || !initialized) return;
  window.gtag("event", eventName, {
    ...analyticsEventParams(params), ...context, send_to: getGoogleAnalyticsId(),
  });
}
