"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

import {
  hasMarketingConsent,
  setMetaTrackingConsent,
  trackingConsentEvent,
} from "@/lib/consent";
import { getMetaPixelId } from "@/lib/env";
import { getMetaEventId, trackMetaEvent } from "@/lib/meta";
import { allowsOptionalTracking } from "@/lib/optional-tracking-path";

export function MetaPixel() {
  const pixelId = getMetaPixelId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const measurementAllowed = allowsOptionalTracking(pathname);
  const skippedInitialPageView = useRef(false);
  const initialPageViewSent = useRef(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      const allowed = measurementAllowed && hasMarketingConsent();
      setMetaTrackingConsent(allowed);
      setHasConsent(allowed);
    };
    syncConsent();
    window.addEventListener(trackingConsentEvent, syncConsent);
    return () => window.removeEventListener(trackingConsentEvent, syncConsent);
  }, [measurementAllowed]);

  useEffect(() => {
    if (!pixelId || !pathname || !measurementAllowed || !hasConsent) {
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
  }, [hasConsent, measurementAllowed, pathname, pixelId, searchParams]);

  if (!measurementAllowed || !pixelId || !hasConsent) {
    return null;
  }

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      onReady={() => {
        // Next invokes inline onReady before inserting/executing its script.
        // Defer to the end of that task, then recheck current consent/path.
        queueMicrotask(() => {
          const allowed =
            allowsOptionalTracking(window.location.pathname) && hasMarketingConsent();
          setMetaTrackingConsent(allowed);
          if (allowed && !initialPageViewSent.current && typeof window.fbq === "function") {
            initialPageViewSent.current = true;
            window.fbq?.("track", "PageView");
          }
        });
      }}
    >
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('consent', 'revoke');
        fbq('set', 'autoConfig', false, ${JSON.stringify(pixelId)});
        fbq('init', ${JSON.stringify(pixelId)});
      `}
    </Script>
  );
}
