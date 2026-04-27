"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

import { trackPageView } from "@/lib/analytics";
import { getAnalyticsMode, getGoogleAnalyticsId, getPlausibleDomain } from "@/lib/env";

export function Analytics() {
  const mode = getAnalyticsMode();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skippedInitialPageView = useRef(false);

  useEffect(() => {
    if (mode !== "ga4" || !pathname) {
      return;
    }

    if (!skippedInitialPageView.current) {
      skippedInitialPageView.current = true;
      return;
    }

    const query = searchParams?.toString();
    const url = `${window.location.origin}${pathname}${query ? `?${query}` : ""}`;
    trackPageView(url);
  }, [mode, pathname, searchParams]);

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
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `}
        </Script>
      </>
    );
  }

  return null;
}
