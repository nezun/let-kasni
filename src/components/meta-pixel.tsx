"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const metaPixelReadyEvent = "letkasni:meta-pixel-ready";

export function MetaPixel() {
  const pixelId = getMetaPixelId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const measurementAllowed = allowsOptionalTracking(pathname);
  const skippedInitialPageView = useRef(false);
  const initialPageViewSent = useRef(false);
  const [hasConsent, setHasConsent] = useState(false);

  const syncPixel = useCallback(() => {
    const allowed = allowsOptionalTracking(window.location.pathname) && hasMarketingConsent();
    const pixel = window.fbq as (typeof window.fbq & { callMethod?: unknown });
    const ready = typeof pixel?.callMethod === "function";
    // Do not queue grant behind revoke before the actual SDK loads: its queue
    // stops at revoke. The loader's ready event grants through the live SDK.
    if (!allowed || ready) setMetaTrackingConsent(allowed);
    if (allowed && ready && !initialPageViewSent.current) {
      initialPageViewSent.current = true;
      window.fbq?.("track", "PageView");
    }
  }, []);

  useEffect(() => {
    const syncConsent = () => {
      const allowed = measurementAllowed && hasMarketingConsent();
      syncPixel();
      setHasConsent(allowed);
    };
    syncConsent();
    window.addEventListener(trackingConsentEvent, syncConsent);
    window.addEventListener(metaPixelReadyEvent, syncConsent);
    return () => {
      window.removeEventListener(trackingConsentEvent, syncConsent);
      window.removeEventListener(metaPixelReadyEvent, syncConsent);
    };
  }, [measurementAllowed, syncPixel]);

  useEffect(() => {
    if (!pixelId || !pathname || !measurementAllowed || !hasConsent) {
      return;
    }

    if (!skippedInitialPageView.current) {
      skippedInitialPageView.current = true;
      return;
    }

    // The loader emits the first PageView only after the real SDK is ready.
    // Navigation/regrant while it still loads must not queue stale pageviews.
    if (!initialPageViewSent.current) return;

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
        queueMicrotask(syncPixel);
      }}
    >
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.onload=function(){window.dispatchEvent(new Event(${JSON.stringify(metaPixelReadyEvent)}));};
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('consent', 'revoke');
        fbq.disablePushState = true;
        fbq('set', 'autoConfig', false, ${JSON.stringify(pixelId)});
        fbq('init', ${JSON.stringify(pixelId)});
      `}
    </Script>
  );
}
