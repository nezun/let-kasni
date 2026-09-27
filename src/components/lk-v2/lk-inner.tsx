import Link from "next/link";
import type { ReactNode } from "react";

import { ClaimInlineCtaButton } from "@/components/claim-inline-cta-button";
import { copy } from "@/components/lk-v2/copy";
import { LkArrow } from "@/components/lk-v2/lk-icon";
import { lkPaths, type LkLocale } from "@/components/lk-v2/lk-paths";

export { LkContentCard } from "@/components/lk-v2/lk-content-card";

/**
 * Zajednički blokovi unutrašnjih strana nove verzije sajta (v2 iz transport-local; blokovi letkasni-pages/*):
 * hero sa putanjom, FAQ i završni poziv (kartica teksta je u lk-content-card.tsx). Markup i klase su kao na originalu, da v2 CSS važi 1:1.
 */

export type LkCrumb = { label: string; href?: string };

/** Tamni hero unutrašnje strane: putanja (Početna / … / trenutna strana), oznaka, naslov i uvod. */
export function LkInnerHero({
  locale,
  crumbs,
  badge,
  title,
  lead,
}: {
  locale: LkLocale;
  /** Međukoraci putanje posle „Početna“; poslednji je trenutna strana (bez linka). */
  crumbs: LkCrumb[];
  badge: string;
  title: string;
  lead?: ReactNode;
}) {
  const t = copy[locale].inner;
  const home = lkPaths(locale).home;

  return (
    <section className="lk-inner-hero">
      <div className="lk-container">
        <nav className="lk-breadcrumb" aria-label={t.breadcrumbAria}>
          <Link href={home}>{t.home}</Link>
          {crumbs.map((crumb, index) => (
            <Crumb key={`${crumb.label}-${index}`} crumb={crumb} current={index === crumbs.length - 1} />
          ))}
        </nav>
        <span className="lk-ui-badge lk-ui-badge--cyan">{badge}</span>
        <h1>{title}</h1>
        {lead ? <p>{lead}</p> : null}
      </div>
    </section>
  );
}

function Crumb({ crumb, current }: { crumb: LkCrumb; current: boolean }) {
  return (
    <>
      <span>/</span>
      {current || !crumb.href ? (
        <span aria-current={current ? "page" : undefined}>{crumb.label}</span>
      ) : (
        <Link href={crumb.href}>{crumb.label}</Link>
      )}
    </>
  );
}

/** Česta pitanja (v2 blok faq): harmonika sa details/summary. */
export function LkFaqSection({
  title,
  intro,
  items,
  firstOpen = false,
  id,
  note,
}: {
  title: string;
  intro?: string;
  items: ReadonlyArray<{ q: string; a: ReactNode; id?: string }>;
  firstOpen?: boolean;
  id?: string;
  note?: ReactNode;
}) {
  return (
    <section className="lk-section lk-faq" id={id}>
      <div className="lk-container">
        <div className="lk-section-heading">
          <h2>{title}</h2>
          {intro ? <p>{intro}</p> : null}
        </div>
        <div className="lk-ui-accordion">
          {items.map((item, index) => (
            <details key={item.id ?? item.q} id={item.id} open={firstOpen && index === 0}>
              <summary>{item.q}</summary>
              <div className="lk-ui-accordion-body">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
        {note}
      </div>
    </section>
  );
}

/** Završni poziv (v2 blok cta): tamni baner sa kosom plavom površinom i ilustracijom provere leta. */
export function LkFinalCta({ locale }: { locale: LkLocale }) {
  const t = copy[locale].cta;

  return (
    <section id="cta" className="lk-section lk-final-cta" aria-labelledby="lk-cta-title">
      <div className="lk-container">
        <div className="banner-diagonal">
          <div className="banner-diagonal-content-wrapper">
            <div className="hero-diagonal-bg" aria-hidden="true" />
            <div className="banner-diagonal-content">
              <span className="lk-ui-badge">{t.badge}</span>
              <h2 id="lk-cta-title">
                {t.titleA}
                <br />
                {t.titleB}
              </h2>
              <p>{t.body}</p>
              <ClaimInlineCtaButton locale={locale} eventLabel="cta_section" className="lk-ui-button lk-ui-button--lg">
                {t.button} <LkArrow />
              </ClaimInlineCtaButton>
            </div>
          </div>
          <FlightPreviewArt t={t} />
        </div>
      </div>
    </section>
  );
}

/** Ilustracija „primer provere leta“ u završnom pozivu (v2 blok cta), sa tekstom iz copy.ts. */
function FlightPreviewArt({ t }: { t: (typeof copy)[LkLocale]["cta"] }) {
  return (
    <svg
      className="banner-diagonal-image lk-cta-art"
      viewBox="0 0 560 410"
      fill="none"
      role="img"
      aria-labelledby="lk-flight-preview-title"
      focusable="false"
    >
      <title id="lk-flight-preview-title">{t.artTitle}</title>
      <defs>
        <linearGradient id="lk-flight-back" x1="65" y1="30" x2="500" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--lk-ui-color-cyan)" />
          <stop offset="1" stopColor="var(--lk-ui-action)" />
        </linearGradient>
      </defs>
      <rect x="48" y="37" width="462" height="320" rx="24" fill="url(#lk-flight-back)" transform="rotate(-5 279 197)" />
      <rect x="30" y="66" width="500" height="322" rx="24" fill="var(--lk-ui-color-navy-deep)" opacity=".14" />
      <rect x="30" y="54" width="500" height="322" rx="24" fill="var(--lk-ui-surface-alt)" />
      <g fontFamily="var(--lk-ui-font-body)" fill="var(--lk-ui-color-navy-deep)">
        <text x="56" y="88" fontSize="11" fontWeight="600" letterSpacing="1">
          {t.artFlightLabel}
        </text>
        <text x="502" y="88" textAnchor="end" fontSize="10" fill="var(--lk-ui-text-secondary)">
          {t.artExample}
        </text>
        <rect x="54" y="102" width="452" height="62" rx="8" fill="var(--lk-ui-surface)" stroke="var(--lk-ui-border)" />
        <text x="72" y="144" fontSize="34" fontWeight="700">
          FL2317
        </text>
        <path d="M226 116v36" stroke="var(--lk-ui-action)" strokeWidth="2" />
        <circle cx="475" cy="130" r="9" fill="none" stroke="var(--lk-ui-text-secondary)" strokeWidth="2" />
        <path d="m482 137 7 7" stroke="var(--lk-ui-text-secondary)" strokeWidth="2" strokeLinecap="round" />
        <rect x="54" y="180" width="178" height="28" rx="14" fill="#ffe7e7" />
        <text x="143" y="199" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ad3434">
          {t.artStatus}
        </text>
        <text x="504" y="199" textAnchor="end" fontSize="12" fill="var(--lk-ui-text-secondary)">
          {t.artRoute}
        </text>
        <path d="M54 224h452" stroke="var(--lk-ui-border)" />
        <text x="54" y="264" fontSize="17" fontWeight="600">
          {t.artAmountLabel}
        </text>
        <rect x="343" y="242" width="163" height="48" rx="24" fill="var(--lk-ui-success-bg)" />
        <text
          x="424"
          y="275"
          textAnchor="middle"
          fontFamily="var(--lk-ui-font-heading)"
          fontSize="30"
          fontWeight="700"
          fill="var(--lk-ui-success)"
        >
          {t.artAmount}
        </text>
        <text x="54" y="293" fontSize="11" fill="var(--lk-ui-text-secondary)">
          {t.artAmountNote}
        </text>
        <path d="M54 314h452" stroke="var(--lk-ui-border)" />
        <g style={{ color: "var(--lk-ui-color-navy)" }}>
          <use href="/lk/assets/icons.svg#check-filled" x="54" y="334" width="18" height="18" />
          <use href="/lk/assets/icons.svg#check-filled" x="207" y="334" width="18" height="18" />
          <use href="/lk/assets/icons.svg#check-filled" x="369" y="334" width="18" height="18" />
        </g>
        <g fontSize="11" fill="var(--lk-ui-text-secondary)">
          <text x="78" y="347">
            {t.artChecks[0]}
          </text>
          <text x="231" y="347">
            {t.artChecks[1]}
          </text>
          <text x="393" y="347">
            {t.artChecks[2]}
          </text>
        </g>
      </g>
    </svg>
  );
}
