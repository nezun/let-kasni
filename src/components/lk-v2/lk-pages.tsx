import Image from "next/image";
import Link from "next/link";

import { copy } from "@/components/lk-v2/copy";
import { LkClaimLink } from "@/components/lk-v2/lk-claim-link";
import { LkYourEuropeNote } from "@/components/lk-v2/lk-delay";
import { LkFaqSection, LkFinalCta, LkInnerHero } from "@/components/lk-v2/lk-inner";
import { lkContact, lkPaths, type LkLocale } from "@/components/lk-v2/lk-paths";
import {
  formatKasnjenje,
  kratakDatum,
  vremeHHmm,
  type LetStatus,
  type ZakasneliLetoviOdgovor,
} from "@/lib/delayed-flights";
import { siteOperator } from "@/lib/site-operator";

/**
 * Strane koje v2 dizajn dodaje (blokovi letkasni-pages/kontakt, o-nama i faq): Kontakt, O nama i Česta pitanja.
 * Podaci o firmi su iz siteOperator, kao na pravnim stranama.
 */

export function LkContactContent({ locale }: { locale: LkLocale }) {
  const t = copy[locale].contactPage;
  const contact = lkContact(locale);

  return (
    <>
      <LkInnerHero locale={locale} crumbs={[{ label: t.title }]} badge={t.badge} title={t.title} lead={t.lead} />
      <section className="lk-section">
        <div className="lk-container lk-article-grid">
          <article className="lk-ui-card lk-content-card">
            <div className="lk-ui-card-body">
              <span className="lk-ui-badge">{t.emailBadge}</span>
              <h2>{t.emailTitle}</h2>
              <p>{t.emailBody}</p>
              <a className="lk-ui-link" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
          </article>
          <article className="lk-ui-card lk-content-card">
            <div className="lk-ui-card-body">
              <span className="lk-ui-badge">{t.phoneBadge}</span>
              <h2>{t.phoneTitle}</h2>
              <p>{t.phoneBody}</p>
              <a className="lk-ui-link" href={`tel:${contact.phone}`}>
                {contact.phoneDisplay}
              </a>
            </div>
          </article>
          <article className="lk-ui-card lk-content-card">
            <div className="lk-ui-card-body">
              <span className="lk-ui-badge">{t.claimBadge}</span>
              <h2>{t.claimTitle}</h2>
              <p>{t.claimBody}</p>
              <LkClaimLink locale={locale} eventLabel="contact_page_cta" className="lk-ui-link">
                {t.claimLink}
              </LkClaimLink>
            </div>
          </article>
        </div>
        <div className="lk-container lk-contact-company">
          <h2>{t.companyTitle}</h2>
          <p>
            {siteOperator.name}
            <br />
            {siteOperator.address}, {siteOperator.country[locale]}
          </p>
          <p>
            {t.pib}: {siteOperator.pib} · {t.mb}: {siteOperator.mb}
            <br />
            {siteOperator.registry[locale]}
          </p>
        </div>
      </section>
    </>
  );
}

export function LkAboutContent({ locale }: { locale: LkLocale }) {
  const t = copy[locale].aboutPage;

  return (
    <>
      <LkInnerHero locale={locale} crumbs={[{ label: t.title }]} badge={t.badge} title={t.title} lead={t.lead} />
      <section className="lk-section">
        <div className="lk-container lk-about">
          <Image
            src="/lk/assets/features/office.jpg"
            alt={t.imageAlt}
            width={1600}
            height={1067}
            sizes="(max-width: 700px) 100vw, 50vw"
          />
          <div>
            <h2>{t.heading}</h2>
            {t.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link className="lk-ui-link" href={lkPaths(locale).terms}>
              {t.termsLink}
            </Link>
          </div>
        </div>
      </section>
      <LkFinalCta locale={locale} />
    </>
  );
}

export function LkFaqContent({ locale }: { locale: LkLocale }) {
  const t = copy[locale].faqPage;

  return (
    <>
      <LkInnerHero locale={locale} crumbs={[{ label: t.title }]} badge={t.badge} title={t.title} lead={t.lead} />
      <LkFaqSection
        id="faq"
        title={t.heading}
        intro={t.intro}
        items={t.items}
        firstOpen
        note={<LkYourEuropeNote locale={locale} centered={false} />}
      />
      <LkFinalCta locale={locale} />
    </>
  );
}

const delayedFlightsBadgeClass: Record<LetStatus, string> = {
  kasnio: "lk-ui-badge--warning",
  otkazan: "lk-ui-badge--danger",
  preusmeren: "lk-ui-badge--neutral",
};

/**
 * Strana „Letovi koji su kasnili“ (opis: ~/Documents/Letkasni/marketing/opis-letovi-koji-su-kasnili.md). Podaci
 * dolaze uživo sa CRM-a (getZakasneliLetovi, ISR); strana ne čuva nijedan podatak o letu u repo-u.
 */
export function LkDelayedFlightsContent({ locale, data }: { locale: LkLocale; data: ZakasneliLetoviOdgovor }) {
  const t = copy[locale].delayedFlightsPage;
  const title = `${t.titleA} ${t.titleB}`;

  return (
    <>
      <LkInnerHero
        locale={locale}
        crumbs={[{ label: title }]}
        badge={t.badge}
        title={title}
        lead={
          <>
            {t.leadA} {t.leadB} {t.leadC}
          </>
        }
      />
      <section className="lk-section">
        <div className="lk-container">
          {data.letovi.length > 0 ? (
            <div className="lk-ui-table-wrap">
              <table className="lk-ui-table">
                <thead>
                  <tr>
                    <th>{t.columnDate}</th>
                    <th>{t.columnFlight}</th>
                    <th>{t.columnAirline}</th>
                    <th>{t.columnRoute}</th>
                    <th>{t.columnPlanned}</th>
                    <th>{t.columnActual}</th>
                    <th>{t.columnStatus}</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data.letovi.map((l) => (
                    <tr key={`${l.brojLeta}-${l.planiranoVreme}`}>
                      <td>{kratakDatum(l.planiranoVreme, locale)}</td>
                      <td>
                        {l.brojLeta}
                        {l.codeshareBrojevi.length > 0 ? ` (${l.codeshareBrojevi.join(", ")})` : ""}
                      </td>
                      <td>{l.aviokompanija}</td>
                      <td>
                        {l.polazniIata} → {l.odredisniIata}
                      </td>
                      <td>{vremeHHmm(l.planiranoVreme)}</td>
                      <td>{vremeHHmm(l.stvarnoVreme)}</td>
                      <td>
                        <span className={`lk-ui-badge ${delayedFlightsBadgeClass[l.status]}`}>
                          {l.status === "kasnio"
                            ? `${t.statusDelayed} · ${formatKasnjenje(l.kasnjenjeMinuta, locale)}`
                            : l.status === "otkazan"
                              ? t.statusCancelled
                              : t.statusDiverted}
                        </span>
                      </td>
                      <td>
                        <LkClaimLink
                          locale={locale}
                          eventLabel="letovi_koji_su_kasnili"
                          className="lk-ui-button lk-ui-button--sm lk-ui-button--secondary"
                        >
                          {t.checkButton}
                        </LkClaimLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="lk-ui-card lk-content-card">
              <div className="lk-ui-card-body">
                <h2>{data.dostupno ? t.emptyTitle : t.unavailableTitle}</h2>
                {data.dostupno ? (
                  <>
                    <p>{t.emptyBodyA}</p>
                    <p>{t.emptyBodyB}</p>
                    <p>{t.emptyBodyC}</p>
                  </>
                ) : (
                  <p>{t.unavailableBody}</p>
                )}
                <LkClaimLink locale={locale} eventLabel="letovi_koji_su_kasnili" className="lk-ui-link">
                  {t.emptyButton}
                </LkClaimLink>
              </div>
            </div>
          )}
          <p className="lk-faq-note">{t.ruleText}</p>
          <p className="lk-faq-note">{t.olderFlightNote}</p>
          {data.dostupno && data.azurirano ? (
            <p className="lk-faq-note">
              {t.sourceNotePrefix}
              {kratakDatum(data.azurirano, locale)} {vremeHHmm(data.azurirano)}
              {t.sourceNoteSuffix}
            </p>
          ) : null}
        </div>
      </section>
      <LkFinalCta locale={locale} />
    </>
  );
}
