"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

import { hasMarketingConsent, trackingConsentEvent } from "@/lib/consent";
import { getMetaPixelId } from "@/lib/env";
import { getMetaEventId, trackMetaEvent } from "@/lib/meta";

export function MetaPixel() {
  const pixelId = getMetaPixelId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skippedInitialPageView = useRef(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => setHasConsent(hasMarketingConsent());
    syncConsent();
    window.addEventListener(trackingConsentEvent, syncConsent);
    return () => window.removeEventListener(trackingConsentEvent, syncConsent);
  }, []);

  useEffect(() => {
    if (!pixelId || !pathname || !hasConsent) {
      return;
    }

    if (!skippedInitialPageView.current) {
      skippedInitialPageView.current = true;
      return;
    }

    const query = searchParams?.toString();
    trackMetaEvent(
      "PageView",
      {
        page_path: pathname,
        page_location: `${window.location.origin}${pathname}${query ? `?${query}` : ""}`,
      },
      getMetaEventId(),
    );
  }, [hasConsent, pathname, pixelId, searchParams]);

  if (!pixelId || !hasConsent) {
    return null;
  }

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', ${JSON.stringify(pixelId)});
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
