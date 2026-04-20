import Script from "next/script";

import { getAnalyticsMode, getGoogleAnalyticsId, getPlausibleDomain } from "@/lib/env";

export function Analytics() {
  const mode = getAnalyticsMode();

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
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `}
        </Script>
      </>
    );
  }

  return null;
}
