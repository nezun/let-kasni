"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

import {
  captureCurrentAttribution,
  clearStoredAttribution,
} from "@/lib/attribution";
import {
  getTrackingConsent,
  trackingConsentEvent,
  type TrackingConsent,
} from "@/lib/consent";
import { getGoogleTagManagerId } from "@/lib/env";
import {
  trackGoogleJourneyEvent,
  updateGoogleConsent,
} from "@/lib/google-tracking";
import { allowsOptionalTracking } from "@/lib/optional-tracking-path";

function isWhatsAppLink(anchor: HTMLAnchorElement) {
  try {
    const url = new URL(anchor.href);
    return ["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(
      url.hostname,
    );
  } catch {
    return false;
  }
}

export function GoogleMeasurement() {
  const gtmId = getGoogleTagManagerId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const measurementAllowed = allowsOptionalTracking(pathname);
  const [consent, setConsent] = useState<TrackingConsent | null>(null);

  useEffect(() => {
    const syncConsent = () => {
      const current = measurementAllowed ? getTrackingConsent() : null;
      updateGoogleConsent(current);
      setConsent(current);
      if (!measurementAllowed) return;
      if (current?.marketing) captureCurrentAttribution();
      else clearStoredAttribution();
    };

    syncConsent();
    window.addEventListener(trackingConsentEvent, syncConsent);
    return () => window.removeEventListener(trackingConsentEvent, syncConsent);
  }, [measurementAllowed]);

  useEffect(() => {
    if (measurementAllowed && consent?.marketing) captureCurrentAttribution();
  }, [consent?.marketing, measurementAllowed, pathname, searchParams]);

  useEffect(() => {
    const trackContactClick = (event: MouseEvent) => {
      if (!measurementAllowed) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      if (anchor.href.startsWith("tel:")) {
        trackGoogleJourneyEvent("phone_click", {
          event_category: "contact",
          event_label: "site_phone",
        });
      } else if (isWhatsAppLink(anchor)) {
        trackGoogleJourneyEvent("whatsapp_click", {
          event_category: "contact",
          event_label: "site_whatsapp",
        });
      }
    };

    document.addEventListener("click", trackContactClick, true);
    return () => document.removeEventListener("click", trackContactClick, true);
  }, [measurementAllowed]);

  if (!measurementAllowed || !gtmId || !consent?.marketing) return null;

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer',${JSON.stringify(gtmId)});
      `}
    </Script>
  );
}
