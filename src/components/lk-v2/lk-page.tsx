import type { ReactNode } from "react";

// Redosled je bitan: most za Tailwind (posle globals.css), pa v2 CSS istim redom kao na originalu, pa naši dodaci.
import "@/styles/lk-v2-base.css";
import "@/styles/lk-v2/tokens.css";
import "@/styles/lk-v2/components.css";
import "@/styles/lk-v2/catalog-bento.css";
import "@/styles/lk-v2/letkasni.css";
import "@/styles/lk-v2/hero-v2.css";
import "@/styles/lk-v2/pages.css";
import "@/styles/lk-v2/delay.css";
import "@/styles/lk-v2-extra.css";

import { copy } from "@/components/lk-v2/copy";
import type { LkLocale } from "@/components/lk-v2/lk-paths";

/**
 * Okvir svake javne strane nove verzije sajta (v2 iz transport-local). Na originalu su klase lk-ui-scope lk-page
 * lk-version-2 (+ vrsta strane, npr. lk-content-page) na body; ovde su na omotaču, jer body deli ceo sajt
 * (layout.tsx sa kolačićima i merenjem). Strana sama renderuje SiteHeader, <main id="main"> i SiteFooter.
 */
export function LkFrame({
  locale,
  children,
  kind,
}: {
  locale: LkLocale;
  children: ReactNode;
  /** Vrsta strane sa originala: lk-content-page (vodiči, članci, blog, pravne strane) ili lk-delay-page. */
  kind?: "lk-content-page" | "lk-delay-page";
}) {
  return (
    <div className={kind ? `lk-ui-scope lk-page lk-version-2 ${kind}` : "lk-ui-scope lk-page lk-version-2"}>
      <a className="lk-skip lk-ui-button" href="#main">
        {copy[locale].page.skip}
      </a>
      {children}
    </div>
  );
}
