import Link from "next/link";
import type { ReactNode } from "react";

import { copy } from "@/components/lk-v2/copy";
import { LkInnerHero } from "@/components/lk-v2/lk-inner";
import { lkPaths, type LkLocale } from "@/components/lk-v2/lk-paths";

/** Sadržaj strana za e-mail ponude (v2 blok letkasni-pages/email-offers): hero i kartica sa panelom. */
export function LkEmailPanelContent({
  locale,
  title,
  children,
}: {
  locale: LkLocale;
  title: string;
  children: ReactNode;
}) {
  const t = copy[locale].emailOffersPage;

  return (
    <>
      <LkInnerHero locale={locale} crumbs={[{ label: title }]} badge={t.badge} title={title} lead={t.lead} />
      <section className="lk-section">
        <div className="lk-container lk-email-panel ew-card">
          <h2>{t.heading}</h2>
          {children}
          <p>
            <Link className="ew-link" href={lkPaths(locale).privacy}>
              {t.privacyLink}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
