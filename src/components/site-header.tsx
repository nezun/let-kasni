import { copy } from "@/components/lk-v2/copy";
import { LkHeader } from "@/components/lk-v2/lk-header";
import type { LkLocale } from "@/components/lk-v2/lk-paths";

/**
 * Zajednički header svih javnih strana (nova verzija sajta, v2 iz transport-local; blok letkasni-v2/header).
 * alternateHref je ista strana na drugom jeziku; bez njega vodi na početnu drugog jezika.
 */
export function SiteHeader({
  locale,
  alternateHref,
  nav,
}: {
  locale: LkLocale;
  alternateHref?: string;
  /** Meni strane umesto zajedničkog (href kako jeste). */
  nav?: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <LkHeader
      locale={locale}
      alternateHref={alternateHref ?? (locale === "sr" ? "/en" : "/")}
      t={copy[locale].header}
      nav={nav}
    />
  );
}
