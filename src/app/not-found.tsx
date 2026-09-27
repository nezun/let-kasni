import { headers } from "next/headers";
import Link from "next/link";

import { copy } from "@/components/lk-v2/copy";
import { LkClaimLink } from "@/components/lk-v2/lk-claim-link";
import { LkInnerHero } from "@/components/lk-v2/lk-inner";
import { LkFrame } from "@/components/lk-v2/lk-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// Strana 404 u izgledu nove verzije sajta (v2): isti tekst kao ranije, v2 hero i dugmad.
export default async function NotFound() {
  const locale = (await headers()).get("x-site-locale") === "en" ? "en" : "sr";
  const t = copy[locale].notFound;

  return (
    <LkFrame locale={locale} kind="lk-content-page">
      <SiteHeader locale={locale} />
      <main id="main">
        <LkInnerHero locale={locale} crumbs={[{ label: t.title }]} badge={t.badge} title={t.title} lead={t.lead} />
        <div className="lk-container lk-guide-cta">
          <LkClaimLink locale={locale} eventLabel="not_found_cta" className="lk-ui-button">
            {t.check} →
          </LkClaimLink>
          <Link className="lk-ui-link" href={locale === "en" ? "/en/air-passenger-rights" : "/prava-putnika-u-aviosaobracaju"}>
            {t.rights}
          </Link>
        </div>
        <div className="lk-section" />
      </main>
      <SiteFooter locale={locale} />
    </LkFrame>
  );
}
