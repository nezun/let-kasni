import { copy } from "@/components/lk-v2/copy";
import { LkClaimLink } from "@/components/lk-v2/lk-claim-link";
import { LkHeader } from "@/components/lk-v2/lk-header";
import type { LkLocale } from "@/components/lk-v2/lk-paths";
import { getSiteVerzija } from "@/lib/site-version";

/**
 * Zajednički header svih javnih strana (nova verzija sajta, v2 iz transport-local; blok letkasni-v2/header).
 * alternateHref je ista strana na drugom jeziku; bez njega vodi na početnu drugog jezika. Verziju sajta (A/B, proba
 * novog loga) čita ovde iz kolačića, pa je prosleđuje LkHeader-u kao običan prop, da nema neusklađenosti pri hidraciji.
 */
export async function SiteHeader({
  locale,
  alternateHref,
  nav,
}: {
  locale: LkLocale;
  alternateHref?: string;
  /** Meni strane umesto zajedničkog (href kako jeste). */
  nav?: ReadonlyArray<{ href: string; label: string }>;
}) {
  const verzija = await getSiteVerzija();
  const t = copy[locale].header;
  return (
    <>
      {/* Traka sa trenutnom ponudom iznad zaglavlja (Niko 29.09); van <header>, pa odlazi skrolom, a zaglavlje ostaje lepljivo. */}
      <div className="lk-announcement">
        <p className="lk-container">
          {t.announcement}{" "}
          <LkClaimLink locale={locale} eventLabel="announcement_bar_cta" className="lk-announcement-link">
            {t.announcementLink} →
          </LkClaimLink>
        </p>
      </div>
      <LkHeader
        locale={locale}
        alternateHref={alternateHref ?? (locale === "sr" ? "/en" : "/")}
        t={t}
        nav={nav}
        verzija={verzija}
      />
    </>
  );
}
