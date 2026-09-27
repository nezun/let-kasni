import type { ReactNode } from "react";

import { ClaimInlineCtaButton } from "@/components/claim-inline-cta-button";
import { copy } from "@/components/lk-v2/copy";
import { LkInnerHero } from "@/components/lk-v2/lk-inner";
import type { LkLocale } from "@/components/lk-v2/lk-paths";
import { ScrollProgressToc } from "@/components/scroll-progress-toc";

/**
 * Pravne strane (uslovi, privatnost) u izgledu nove verzije sajta (v2 blokovi letkasni-pages/terms i privacy): hero,
 * sadržaj strane i tekst u lk-reading lk-legal. Tekst dokumenata je nepromenjen; menja se samo okvir.
 */

export function legalSectionId(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/đ/g, "dj")
    .replace(/[čć]/g, "c")
    .replace(/š/g, "s")
    .replace(/ž/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function LkLegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="lk-reading-section" id={legalSectionId(title)}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export function LkLegalLayout({
  locale,
  title,
  version,
  toc,
  children,
}: {
  locale: LkLocale;
  title: string;
  /** Redovi zaglavlja dokumenta (naziv, pružalac, verzija i datum važenja). */
  version: ReactNode[];
  /** Naslovi sekcija istim redom kao u tekstu. */
  toc: ReadonlyArray<string>;
  children: ReactNode;
}) {
  const inner = copy[locale].inner;

  return (
    <>
      <LkInnerHero locale={locale} crumbs={[{ label: title }]} badge={inner.legalBadge} title={title} />
      <div className="lk-container lk-reading-layout">
        <ScrollProgressToc
          label={inner.tocTitle}
          navLabel={inner.tocAria}
          sections={toc.map((label) => ({ id: legalSectionId(label), label }))}
        >
          <ClaimInlineCtaButton locale={locale} eventLabel="legal_toc_cta" className="lk-ui-button">
            {inner.tocButton}
          </ClaimInlineCtaButton>
        </ScrollProgressToc>
        <article className="lk-reading lk-legal">
          <div className="lk-legal-version">
            {version.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          {children}
        </article>
      </div>
    </>
  );
}
