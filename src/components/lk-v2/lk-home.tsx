/* eslint-disable @next/next/no-img-element -- SVG logotipi i slike blog kartica ostaju obični img, kao u v2 dizajnu */
import Image from "next/image";
import Link from "next/link";

import { ClaimInlineCtaButton } from "@/components/claim-inline-cta-button";
import { copy } from "@/components/lk-v2/copy";
import { LkArrow, LkIcon } from "@/components/lk-v2/lk-icon";
import { LkFinalCta } from "@/components/lk-v2/lk-inner";
import { LkIssueForm } from "@/components/lk-v2/lk-issue-form";
import { LkAmountTiers } from "@/components/lk-v2/lk-motion";
import { lkContact, lkPaths, type LkLocale } from "@/components/lk-v2/lk-paths";
import { getBlogArticleImage, getBlogArticles } from "@/lib/blog";
import { getArticleCornerstoneHref } from "@/lib/cornerstones";
import { formatDisplayDate } from "@/lib/date-format";

// Ikonice kartica „Zašto putnici biraju…“ istim redom kao tekst (v2 blok benefits).
const benefitIcons = [
  { set: "lk", name: "pin" },
  { set: "lk", name: "chat" },
  { set: "lk", name: "shield" },
  { set: "lk", name: "plane" },
  { set: "ds", name: "check-circle" },
  { set: "lk", name: "clock" },
] as const;

const airlines = [
  { name: "Air Serbia", file: "air-serbia-symbol.svg" },
  { name: "Wizz Air", file: "wizz-air.svg" },
  { name: "Ryanair", file: "ryanair-symbol.svg" },
  { name: "Lufthansa", file: "lufthansa-symbol.svg" },
  { name: "Turkish Airlines", file: "turkish-airlines-symbol.svg" },
];

// Zvezdica ocene iz v2 bloka testimonials (5 od 5, kao na originalu).
const starPath =
  "m12 2.5 2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55-4.76-4.64 6.58-.96Z";

const faqIds = ["lk-faq-amount", "lk-faq-cost", "lk-faq-documents", "lk-faq-rejected", "lk-faq-duration", "lk-faq-older"];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

// Slike blog kartica su 640×400; Unsplash slike tražimo u širini 800 umesto 1600.
function cardImageSrc(src: string) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("w", "800");
  return url.toString();
}

function latestArticles(locale: LkLocale, count: number) {
  return [...getBlogArticles(locale)]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, count);
}

/** Početna strana nove verzije sajta: blokovi iz transport-local (letkasni-v2 i letkasni), naš tekst i linkovi. */
export function LkHome({ locale }: { locale: LkLocale }) {
  const t = copy[locale];
  const paths = lkPaths(locale);
  const contact = lkContact(locale);
  const articles = latestArticles(locale, 4);

  return (
    <>
      <section className="lk-hero-section lk-v2-hero" aria-labelledby="lk-hero-title">
        <div className="lk-v2-banner">
          <div className="lk-ui-hero lk-hero lk-container">
            <div className="lk-hero-copy">
              <span className="lk-ui-badge lk-ui-badge--cyan">{t.hero.badge}</span>
              <h1 id="lk-hero-title">
                {t.hero.titleA}
                <span>{t.hero.titleB}</span>
              </h1>
              <p className="lk-promise">{t.hero.promise}</p>
            </div>
          </div>
        </div>
        <div className="lk-container lk-v2-form-wrap">
          <LkIssueForm locale={locale} t={t.hero} />
        </div>
      </section>

      <LkSteps locale={locale} />

      <section className="lk-section lk-promo" id="promocija" aria-labelledby="lk-promo-title">
        <div className="lk-container">
          <div className="services-card-grid">
            <div className="ewo-bento-hero-card-2026">
              <div className="ewo-bento-hero-card-2026-content">
                <div className="ewo-bento-hero-card-2026-badge-row">
                  <div className="ewo-bento-hero-card-2026-badge">{t.promo.badge}</div>
                </div>
                <div className="ewo-bento-hero-card-2026-body">
                  <div className="ewo-bento-hero-card-2026-header">
                    <h2 id="lk-promo-title" className="ewo-bento-hero-card-2026-title">
                      {t.promo.title}
                    </h2>
                    <p className="ewo-bento-hero-card-2026-text">{t.promo.body}</p>
                  </div>
                  <div className="ewo-bento-hero-card-2026-actions">
                    <ClaimInlineCtaButton locale={locale} eventLabel="promo_banner_cta" className="lk-ui-button">
                      {t.promo.button} <LkArrow />
                    </ClaimInlineCtaButton>
                    <small>{t.promo.note}</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="services-card-grid-feature">
              <div className="icon-card-2026 icon-card-2026--blue">
                <LkIcon name="shield" className="icon-card-2026-icon" />
                <div className="icon-card-2026-content">
                  <div className="icon-card-2026-header">
                    <h3 className="icon-card-2026-title">{t.promo.supportTitle}</h3>
                    <ul className="lk-feature-checks">
                      {t.promo.supportItems.map((item) => (
                        <li key={item}>
                          <LkIcon name="check-filled" className="lk-check" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="icon-card-2026-link-row">
                    <div className="lk-feature-contact">
                      <a className="lk-ui-link" href={`tel:${contact.phone}`}>
                        {contact.phoneDisplay}
                      </a>
                      <a className="lk-ui-link" href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lk-section lk-compensation" id="naknada-i-provera" aria-label={t.compensation.aria}>
        <div className="lk-container lk-compensation-grid">
          <div className="ewo-bento-hero-card-2026 lk-amount-panel">
            <div className="ewo-bento-hero-card-2026-content">
              <div className="ewo-bento-hero-card-2026-body">
                <div className="ewo-bento-hero-card-2026-header">
                  <h2 className="ewo-bento-hero-card-2026-title">{t.compensation.amountsTitle}</h2>
                  <p className="ewo-bento-hero-card-2026-text">{t.compensation.amountsBody}</p>
                </div>
                <div className="ewo-bento-hero-card-2026-actions">
                  <ClaimInlineCtaButton locale={locale} eventLabel="amounts_cta" className="lk-ui-button lk-ui-button--lg">
                    {t.compensation.amountsButton}
                  </ClaimInlineCtaButton>
                </div>
                <div className="ewo-bento-hero-card-2026-visual">
                  <div className="ewo-bento-hero-card-2026-visual-frame">
                    <LkAmountTiers>
                      {t.compensation.tiers.map((tier, index) => (
                        <div key={tier.label} className={`lk-amount-tier lk-amount-tier--${index + 1}`}>
                          <h3>{tier.label}</h3>
                          <div className="lk-amount-track">
                            <span aria-hidden="true" />
                            <LkIcon name="logo-airplane" />
                            <strong>{tier.amount}</strong>
                          </div>
                          <p>{tier.example}</p>
                        </div>
                      ))}
                    </LkAmountTiers>
                  </div>
                </div>
                <div className="ewo-bento-hero-card-2026-actions">
                  <p className="lk-amount-note">{t.compensation.amountsNote}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="ewo-bento-hero-card-2026 lk-phone-panel">
            <div className="ewo-bento-hero-card-2026-content">
              <div className="ewo-bento-hero-card-2026-body">
                <div className="ewo-bento-hero-card-2026-header">
                  <h2 className="ewo-bento-hero-card-2026-title">{t.compensation.phoneTitle}</h2>
                  <p className="ewo-bento-hero-card-2026-text">{t.compensation.phoneBody}</p>
                </div>
                <div className="ewo-bento-hero-card-2026-actions">
                  <ClaimInlineCtaButton locale={locale} eventLabel="phone_panel_cta" className="lk-ui-button lk-ui-button--lg">
                    {t.compensation.phoneButton}
                  </ClaimInlineCtaButton>
                </div>
              </div>
            </div>
            <div className="ewo-bento-hero-card-2026-visual">
              <div className="ewo-bento-hero-card-2026-visual-frame">
                <div className="lk-phone" role="img" aria-label={t.compensation.phoneAria}>
                  <div className="lk-phone-camera" aria-hidden="true" />
                  <div className="lk-phone-screen" aria-hidden="true">
                    <img src="/lk/assets/logo-mark.svg" alt="" width={32} height={32} />
                    <span className="lk-ui-badge">{t.compensation.phoneBadge}</span>
                    <h3>{t.compensation.phoneQuestion}</h3>
                    {t.compensation.phoneOptions.map((option, index) => (
                      <div key={option} className={index === 0 ? "lk-phone-option is-selected" : "lk-phone-option"}>
                        {option}
                        {index === 0 ? <LkIcon name="check-filled" className="lk-check" /> : <span>○</span>}
                      </div>
                    ))}
                    <div className="lk-ui-button lk-phone-next">{t.compensation.phoneNext}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lk-section lk-benefits" id="prednosti" aria-labelledby="lk-benefits-title">
        <div className="lk-container">
          <div className="lk-section-heading">
            <h2 id="lk-benefits-title">{t.benefits.title}</h2>
            <p>{t.benefits.body}</p>
          </div>
          <div className="lk-ui-grid lk-benefits-grid">
            {t.benefits.items.map((item, index) => (
              <article key={item.title} className="lk-ui-card lk-benefit-card">
                <LkIcon set={benefitIcons[index].set} name={benefitIcons[index].name} className="lk-benefit-icon" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="lk-benefits-actions">
            <ClaimInlineCtaButton locale={locale} eventLabel="features_cta" className="lk-ui-button lk-ui-button--lg">
              {t.benefits.button}
            </ClaimInlineCtaButton>
            <a className="lk-ui-link" href="#kako-radi">
              {t.benefits.link} <LkArrow />
            </a>
          </div>
        </div>
      </section>

      <section className="lk-section lk-feature lk-airlines" id="avio-kompanije" aria-labelledby="lk-airlines-title">
        <div className="lk-container">
          <div className="image-and-content__wrapper lk-airlines-panel">
            <div className="image-and-content__content">
              <span className="lk-ui-badge">{t.airlines.badge}</span>
              <h2 id="lk-airlines-title">{t.airlines.title}</h2>
              <p>{t.airlines.body}</p>
              <ul className="lk-feature-checks">
                {t.airlines.points.map((point) => (
                  <li key={point}>
                    <LkIcon name="check-filled" className="lk-check" />
                    {point}
                  </li>
                ))}
              </ul>
              <ClaimInlineCtaButton locale={locale} eventLabel="partners_cta" className="lk-ui-button lk-ui-button--lg">
                {t.airlines.button} <LkArrow />
              </ClaimInlineCtaButton>
              <p className="lk-feature-note">
                {t.airlines.note} <Link href={paths.terms}>{t.airlines.noteLink}</Link>
              </p>
            </div>
            <div className="image-and-content__image-container">
              <ul className="lk-airline-tiles" aria-label={t.airlines.listAria}>
                {airlines.map((airline) => (
                  <li key={airline.file} className="lk-ui-card lk-airline-tile">
                    <img src={`/lk/assets/${airline.file}`} alt={airline.name} width={120} height={64} loading="lazy" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="lk-section lk-feature lk-quick-check" id="brza-provera" aria-labelledby="lk-travel-title">
        <div className="lk-container">
          <div className="lk-section-heading">
            <h2 id="lk-travel-title">
              {t.quickCheck.titleA}
              <br />
              {t.quickCheck.titleB}
            </h2>
          </div>
          <div className="image-and-content__wrapper">
            <div className="image-and-content__content">
              <span className="lk-ui-badge">{t.quickCheck.badge}</span>
              <h3>{t.quickCheck.subtitle}</h3>
              <p>{t.quickCheck.body}</p>
              <ul className="lk-feature-checks">
                {t.quickCheck.points.map((point) => (
                  <li key={point}>
                    <LkIcon name="check-filled" className="lk-check" />
                    {point}
                  </li>
                ))}
              </ul>
              <ClaimInlineCtaButton locale={locale} eventLabel="quick_check_cta" className="lk-ui-button lk-ui-button--lg">
                {t.quickCheck.button} <LkArrow />
              </ClaimInlineCtaButton>
              <p className="lk-feature-note">
                * <Link href={paths.terms}>{t.quickCheck.noteLink}</Link>
              </p>
            </div>
            <div className="image-and-content__image-container">
              <Image
                className="image-and-content__image"
                src="/lk/assets/features/couple-phone.jpg"
                alt={t.quickCheck.imageAlt}
                width={1400}
                height={2100}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="lk-section lk-feature lk-local-support" id="lokalna-podrska" aria-labelledby="lk-support-title">
        <div className="lk-container">
          <div className="image-and-content__wrapper image-and-content__wrapper--reverse">
            <div className="image-and-content__content">
              <span className="lk-ui-badge">{t.localSupport.badge}</span>
              <h2 id="lk-support-title">{t.localSupport.title}</h2>
              <p>{t.localSupport.body}</p>
              <ul className="lk-feature-checks">
                {t.localSupport.points.map((point) => (
                  <li key={point}>
                    <LkIcon name="check-filled" className="lk-check" />
                    {point}
                  </li>
                ))}
              </ul>
              <p>{t.localSupport.contactLead}</p>
              <div className="lk-feature-contact">
                <a className="lk-ui-link" href={`tel:${contact.phone}`}>
                  {contact.phoneDisplay}
                </a>
                <a className="lk-ui-link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
            </div>
            <div className="image-and-content__image-container">
              <Image
                className="image-and-content__image"
                src="/lk/assets/features/office.jpg"
                alt={t.localSupport.imageAlt}
                width={1600}
                height={1067}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <LkTestimonials locale={locale} />

      <section className="lk-section lk-faq" id="faq" aria-labelledby="lk-faq-title">
        <div className="lk-container">
          <div className="lk-section-heading">
            <h2 id="lk-faq-title">{t.faq.title}</h2>
          </div>
          <div className="lk-ui-accordion">
            {t.faq.items.map((item, index) => (
              <details key={faqIds[index]} id={faqIds[index]} open={index === 0}>
                <summary>{item.q}</summary>
                <div className="lk-ui-accordion-body">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LkFinalCta locale={locale} />

      <section className="lk-section lk-blog" id="blog" aria-labelledby="lk-blog-title">
        <div className="lk-container">
          <div className="lk-blog-header">
            <div>
              <span className="lk-eyebrow">{t.blog.eyebrow}</span>
              <h2 id="lk-blog-title">{t.blog.title}</h2>
            </div>
            <Link className="lk-ui-link" href={paths.blog}>
              {t.blog.all} <LkArrow />
            </Link>
          </div>
          <div className="lk-ui-grid lk-blog-grid">
            {articles.map((article, index) => {
              const image = getBlogArticleImage(article.id);
              const readId = `lk-blog-read-${index + 1}`;
              return (
                <article key={article.id} className="lk-ui-card lk-blog-card">
                  <img
                    className="lk-ui-card-image"
                    src={cardImageSrc(image.src)}
                    alt=""
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    style={image.position ? { objectPosition: image.position } : undefined}
                  />
                  <div className="lk-ui-card-body">
                    <div className="lk-blog-meta">
                      <span>{article.localized.category}</span>
                      <time dateTime={article.publishedAt}>{formatDisplayDate(article.publishedAt, locale)}</time>
                    </div>
                    <h3>
                      <Link href={getArticleCornerstoneHref(article, locale)} aria-describedby={readId}>
                        {article.localized.title}
                      </Link>
                    </h3>
                    <span className="lk-blog-read" id={readId} aria-hidden="true">
                      {t.blog.read} <LkArrow />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

/** Tri koraka (v2 blok letkasni/steps); isti blok je i na strani vodiča za kašnjenje. */
export function LkSteps({ locale }: { locale: LkLocale }) {
  const t = copy[locale];

  return (
    <section className="lk-section lk-steps" id="kako-radi" aria-labelledby="lk-steps-title">
      <div className="lk-container">
        <div className="lk-section-heading">
          <span className="lk-eyebrow">{t.steps.eyebrow}</span>
          <h2 id="lk-steps-title">{t.steps.title}</h2>
          <p>{t.steps.body}</p>
        </div>
        <ol className="lk-steps-row">
          {t.steps.items.map((step, index) => (
            <li key={step.title} className="lk-step">
              <span className="lk-number" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Iskustva putnika sa ocenom (v2 blok letkasni/testimonials); isti blok je i na strani vodiča za kašnjenje. */
export function LkTestimonials({ locale }: { locale: LkLocale }) {
  const t = copy[locale];

  return (
    <section id="iskustva" className="lk-section lk-testimonials bg-navy" aria-labelledby="lk-testimonials-title">
      <div className="lk-container">
        <div className="lk-section-heading">
          <span className="lk-eyebrow">{t.testimonials.eyebrow}</span>
          <h2 id="lk-testimonials-title">
            {t.testimonials.titleA}
            <span>{t.testimonials.titleB}</span>
          </h2>
        </div>
        <div className="grid-3-col">
          {t.testimonials.items.map((item) => (
            <article key={item.name} className="persona-card-2026">
              <div className="persona-card-2026-avatar">
                <div className="persona-card-2026-avatar-circle" aria-hidden="true">
                  {initials(item.name)}
                </div>
              </div>
              <div className="persona-card-2026-content">
                <div className="persona-card-2026-header">
                  <h3 className="persona-card-2026-role">{item.name}</h3>
                  <p className="persona-card-2026-role-sub">
                    {t.testimonials.role} · {item.route}
                  </p>
                </div>
                <div className="lk-review-stars" role="img" aria-label={t.testimonials.ratingAria}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="currentColor" d={starPath} />
                    </svg>
                  ))}
                </div>
                <blockquote className="persona-card-2026-text">{item.quote}</blockquote>
              </div>
              <div className="persona-card-2026-footer">
                <div className="persona-card-2026-divider" />
                <p className="persona-card-2026-outcome">
                  {t.testimonials.outcome} <strong>{item.amount}</strong>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
