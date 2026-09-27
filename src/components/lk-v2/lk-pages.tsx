import Image from "next/image";
import Link from "next/link";

import { copy } from "@/components/lk-v2/copy";
import { LkClaimLink } from "@/components/lk-v2/lk-claim-link";
import { LkYourEuropeNote } from "@/components/lk-v2/lk-delay";
import { LkFaqSection, LkFinalCta, LkInnerHero } from "@/components/lk-v2/lk-inner";
import { lkContact, lkPaths, type LkLocale } from "@/components/lk-v2/lk-paths";
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
          <article className="ew-card lk-content-card">
            <div className="ew-card-body">
              <span className="ew-badge">{t.emailBadge}</span>
              <h2>{t.emailTitle}</h2>
              <p>{t.emailBody}</p>
              <a className="ew-link" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
          </article>
          <article className="ew-card lk-content-card">
            <div className="ew-card-body">
              <span className="ew-badge">{t.phoneBadge}</span>
              <h2>{t.phoneTitle}</h2>
              <p>{t.phoneBody}</p>
              <a className="ew-link" href={`tel:${contact.phone}`}>
                {contact.phoneDisplay}
              </a>
            </div>
          </article>
          <article className="ew-card lk-content-card">
            <div className="ew-card-body">
              <span className="ew-badge">{t.claimBadge}</span>
              <h2>{t.claimTitle}</h2>
              <p>{t.claimBody}</p>
              <LkClaimLink locale={locale} eventLabel="contact_page_cta" className="ew-link">
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
            <Link className="ew-link" href={lkPaths(locale).terms}>
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
