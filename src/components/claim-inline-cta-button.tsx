"use client";

import type { ReactNode } from "react";

import { idiNaFormu } from "@/components/claim-start-card";
import { trackEvent } from "@/lib/analytics";
import { getMetaEventId, trackMetaEvent } from "@/lib/meta";

type Locale = "sr" | "en";

/** Dugme u tekstu (blog, cornerstone): vodi na formu u aplikaciji za klijente. */
export function ClaimInlineCtaButton({
  children,
  className,
  eventLabel,
  locale,
}: {
  children: ReactNode;
  className: string;
  eventLabel: string;
  locale: Locale;
}) {
  function otvoriFormu() {
    trackEvent("begin_checkout", {
      event_category: "claim",
      event_label: eventLabel,
      form_locale: locale,
    });
    trackMetaEvent(
      "InitiateCheckout",
      {
        content_name: "flight_compensation_claim",
        content_category: "claim",
        form_locale: locale,
      },
      getMetaEventId(),
    );
    idiNaFormu(locale);
  }

  return (
    <button type="button" onClick={otvoriFormu} className={className}>
      {children}
    </button>
  );
}
