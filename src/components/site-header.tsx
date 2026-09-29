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
      {/* Traka sa trenutnom ponudom iznad zaglavlja (Niko 29.09); van <header>, pa odlazi skrolom, a zaglavlje ostaje
          lepljivo. Tekst teče u krug: isti red ponovljen 8 puta, traka se pomera za pola (4 ponavljanja), pa je spoj
          neprimetan. Čitač ekrana i tastatura vide samo prvi red; ostali su aria-hidden i van redosleda tabova. */}
      <div className="lk-announcement">
        <div className="lk-announcement-track">
          {Array.from({ length: 8 }, (_, index) => (
            <p key={index} className="lk-announcement-item" aria-hidden={index > 0 ? true : undefined}>
              {t.announcement}{" "}
              <LkClaimLink
                locale={locale}
                eventLabel="announcement_bar_cta"
                className="lk-announcement-link"
                tabIndex={index > 0 ? -1 : undefined}
              >
                {t.announcementLink} →
              </LkClaimLink>
            </p>
          ))}
        </div>
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
