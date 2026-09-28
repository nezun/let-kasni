import { copy } from "@/components/lk-v2/copy";
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
  return (
    <LkHeader
      locale={locale}
      alternateHref={alternateHref ?? (locale === "sr" ? "/en" : "/")}
      t={copy[locale].header}
      nav={nav}
      verzija={verzija}
    />
  );
}
