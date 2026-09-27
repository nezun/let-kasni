import { ClaimInlineCtaButton } from "@/components/claim-inline-cta-button";
import { copy } from "@/components/lk-v2/copy";
import { LkArrow, LkIcon } from "@/components/lk-v2/lk-icon";
import { LkIssueForm } from "@/components/lk-v2/lk-issue-form";
import type { LkLocale } from "@/components/lk-v2/lk-paths";

/**
 * Početak strane vodiča za kašnjenje u izgledu nove verzije (v2 strana naknada-za-kasnjenje-leta, blokovi
 * letkasni-delay/*): hero sa formom za proveru, šta proveravamo, iznosi, dokumenta i pomoć tokom čekanja. Ispod njih
 * ide ceo tekst vodiča (sadržaj strane i sekcije), da strana zadrži sadržaj za pretraživače.
 */
export function LkDelayTop({ locale }: { locale: LkLocale }) {
  const t = copy[locale].delayPage;
  const hero = copy[locale].hero;

  return (
    <>
      <section className="lk-hero-section lk-v2-hero" aria-labelledby="lk-hero-title">
        <div className="lk-v2-banner">
          <div className="lk-ui-hero lk-hero lk-container">
            <div className="lk-hero-copy">
              <span className="lk-ui-badge lk-ui-badge--cyan">{t.heroBadge}</span>
              <h1 id="lk-hero-title">
                {t.heroTitleA}
                <span>{t.heroTitleB}</span>
              </h1>
              <p className="lk-promise">{t.heroPromise}</p>
            </div>
          </div>
        </div>
        <div className="lk-container lk-v2-form-wrap">
          <LkIssueForm locale={locale} t={hero} />
        </div>
      </section>

      <section className="lk-section " id="uslovi">
        <div className="lk-container">
          <div className="lk-section-heading">
            <h2>{t.checksTitle}</h2>
            <p>{t.checksIntro}</p>
          </div>
          <div className="lk-ui-grid lk-benefits-grid">
            {t.checks.map((item) => (
              <article key={item.title} className="lk-ui-card lk-benefit-card">
                <LkIcon name={item.icon} className="lk-benefit-icon" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lk-section lk-benefits" id="iznosi">
        <div className="lk-container">
          <div className="lk-section-heading">
            <h2>{t.amountsTitle}</h2>
            <p>{t.amountsIntro}</p>
          </div>
          <div className="lk-ui-grid lk-benefits-grid">
            {t.amounts.map((item) => (
              <article key={item.badge} className="lk-ui-card lk-benefit-card lk-delay-amount">
                <span className="lk-ui-badge">{item.badge}</span>
                <h3>
                  {item.amount} <span>€</span>
                </h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="lk-delay-note">{t.amountsNote}</p>
          <div className="lk-benefits-actions">
            <ClaimInlineCtaButton locale={locale} eventLabel="amounts_cta" className="lk-ui-button">
              {t.amountsButton} <LkArrow />
            </ClaimInlineCtaButton>
          </div>
        </div>
      </section>

      <section className="lk-section " id="dokumentacija">
        <div className="lk-container">
          <div className="lk-section-heading">
            <h2>{t.docsTitle}</h2>
            <p>{t.docsIntro}</p>
          </div>
          <div className="lk-ui-grid lk-benefits-grid">
            {t.docs.map((item) => (
              <article key={item.title} className="lk-ui-card lk-benefit-card">
                <LkIcon name={item.icon} className="lk-benefit-icon" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lk-section lk-benefits" id="tokom-cekanja">
        <div className="lk-container">
          <div className="lk-section-heading">
            <h2>{t.careTitle}</h2>
            <p>{t.careIntro}</p>
          </div>
          <div className="lk-delay-care">
            {t.care.map((item) => (
              <div key={item.badge}>
                <span className="lk-ui-badge">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Napomena o evropskim pravilima ispod čestih pitanja (kao na originalu). Na vodiču za kašnjenje je centrirana
 * (lk-delay-note iz delay.css); strana Česta pitanja na originalu nema delay.css, pa je tamo običan pasus.
 */
export function LkYourEuropeNote({ locale, centered = true }: { locale: LkLocale; centered?: boolean }) {
  const t = copy[locale].faqPage;

  return (
    <p className={centered ? "lk-delay-note" : "lk-faq-note"}>
      {t.notePrefix}{" "}
      <a href="https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_en.htm" target="_blank" rel="noopener">
        {t.noteLink}
      </a>
      . {t.noteSuffix}
    </p>
  );
}
