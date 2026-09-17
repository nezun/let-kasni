"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

import { syncAnalytics } from "@/lib/analytics";
import { hasAnalyticsConsent, trackingConsentEvent } from "@/lib/consent";
import { getAnalyticsMode, getGoogleAnalyticsId, getPlausibleDomain } from "@/lib/env";
import { allowsOptionalTracking } from "@/lib/optional-tracking-path";

export function Analytics({ publicPaths }: { publicPaths: readonly string[] }) {
  const mode = getAnalyticsMode();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const measurementAllowed = allowsOptionalTracking(pathname);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () =>
      setHasConsent(measurementAllowed && hasAnalyticsConsent());
    syncConsent();
    window.addEventListener(trackingConsentEvent, syncConsent);
    return () => window.removeEventListener(trackingConsentEvent, syncConsent);
  }, [measurementAllowed]);

  useEffect(() => {
    if (mode === "ga4") syncAnalytics(publicPaths);
  }, [hasConsent, measurementAllowed, mode, pathname, publicPaths, searchParams]);

  if (!measurementAllowed || !hasConsent) {
    return null;
  }

  if (mode === "plausible") {
    const domain = getPlausibleDomain();
    if (!domain) {
      return null;
    }

    return (
      <Script
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.js"
      />
    );
  }

  if (mode === "ga4") {
    const measurementId = getGoogleAnalyticsId();
    if (!measurementId) {
      return null;
    }

    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          strategy="lazyOnload"
        />
      </>
    );
  }

  return null;
}
