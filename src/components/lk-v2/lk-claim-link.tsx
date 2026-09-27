"use client";

import type { MouseEvent, ReactNode } from "react";

import { adresaForme, idiNaFormu } from "@/components/claim-start-card";
import { trackEvent } from "@/lib/analytics";
import { getMetaEventId, trackMetaEvent } from "@/lib/meta";

type Locale = "sr" | "en";

/**
 * Link ka formi u aplikaciji za prijave, za mesta gde v2 dizajn ima <a class="lk-ui-link"> ili <a class="lk-ui-button">.
 * Pravi link (radi i bez JavaScripta i u novom tabu); klik šalje ista merenja kao ClaimInlineCtaButton i nosi poreklo
 * posete (atribuciju) u formu.
 */
export function LkClaimLink({
  locale,
  eventLabel,
  className,
  children,
}: {
  locale: Locale;
  eventLabel: string;
  className: string;
  children: ReactNode;
}) {
  function open(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    trackEvent("begin_checkout", { event_category: "claim", event_label: eventLabel, form_locale: locale });
    trackMetaEvent(
      "InitiateCheckout",
      { content_name: "flight_compensation_claim", content_category: "claim", form_locale: locale },
      getMetaEventId(),
    );
    idiNaFormu(locale);
  }

  return (
    <a className={className} href={adresaForme(locale)} onClick={open}>
      {children}
    </a>
  );
}
