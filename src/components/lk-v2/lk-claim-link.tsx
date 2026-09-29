"use client";

import { useSyncExternalStore, type MouseEvent, type ReactNode } from "react";

import { adresaForme, idiNaFormu } from "@/components/claim-start-card";
import { withCurrentAttributionParameters } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";
import { getMetaEventId, trackMetaEvent } from "@/lib/meta";

type Locale = "sr" | "en";

const noSubscription = () => () => {};

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
  tabIndex,
}: {
  locale: Locale;
  eventLabel: string;
  className: string;
  children: ReactNode;
  tabIndex?: number;
}) {
  // U pregledaču href nosi i verziju sajta i izvor posete (važi i za otvaranje u novom tabu); na serveru osnovna adresa.
  const href = useSyncExternalStore(
    noSubscription,
    () => withCurrentAttributionParameters(adresaForme(locale)),
    () => adresaForme(locale).split("?")[0],
  );

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
    <a className={className} href={href} onClick={open} tabIndex={tabIndex}>
      {children}
    </a>
  );
}
