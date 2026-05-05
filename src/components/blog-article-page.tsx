import Link from "next/link";

import { InlineRichText, InterlinkingScope } from "@/components/inline-rich-text";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSupportEmail } from "@/lib/env";
import {
  type BlogArticle,
  type BlogLocale,
} from "@/lib/blog";
import {
  getAlternateArticleCornerstoneHref,
  getArticleCornerstoneHref,
  getCornerstoneForArticle,
  getCornerstoneHref,
} from "@/lib/cornerstones";
import { formatDisplayDate } from "@/lib/date-format";

const copy = {
  sr: {
    nextStep: "Sledeći korak",
    checkTitle: "Proverite svoj let",
    checkBody:
      "Unesite broj leta i datum, a slučaj ide na konzervativnu proveru pre bilo kakvog obećanja.",
    checkLabel: "Proveri let",
    checkHref: "/#proveri-let",
    note:
      "Vodič je informativan. Ishod zavisi od rute, prevoznika, razloga poremećaja i dokaza u konkretnom slučaju.",
    updatedLabel: "Ažurirano",
    mainGuidePrefix: "Širi vodič za ovu temu",
  },
  en: {
    nextStep: "Next step",
    checkTitle: "Check your flight",
    checkBody:
      "Enter your flight number and date for a conservative first review before any promise is made.",
    checkLabel: "Check flight",
    checkHref: "/en#proveri-let",
    note:
      "This guide is informational. Outcome depends on route, carrier, disruption cause, and evidence in the specific case.",
    updatedLabel: "Updated",
    mainGuidePrefix: "Main guide for this topic",
  },
};

export function BlogArticlePageView({
  article,
  locale,
}: {
  article: BlogArticle;
  locale: BlogLocale;
}) {
  const t = copy[locale];
  const localized = article[locale];
  const mainGuide = getCornerstoneForArticle(article);
  const alternateHref = getAlternateArticleCornerstoneHref(article, locale);
  const currentHref = getArticleCornerstoneHref(article, locale);
  const supportEmail = getSupportEmail();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: localized.title,
    description: localized.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: locale === "sr" ? "sr-RS" : "en",
    isPartOf: {
      "@type": "Blog",
      name: "letkasni.rs Blog",
      url: locale === "sr" ? "/blog" : "/en/blog",
    },
    publisher: {
      "@type": "Organization",
      name: "letkasni.rs",
    },
  };

  return (
    <main className="min-h-screen bg-white pt-16 text-[#0A0F1E]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader locale={locale} alternateHref={alternateHref} />

      <article>
        <section className="border-b border-[#E2E6EF] bg-[#F4F6FA] px-6 py-14">
          <div className="mx-auto max-w-[860px]">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.08em] text-[#6B7585]">
              <span className="rounded-full bg-white px-3 py-1 text-[#0B2E6F]">
                {localized.category}
              </span>
              <span>{localized.readTime}</span>
              <span>
                {t.updatedLabel}: {formatDisplayDate(article.updatedAt, locale)}
              </span>
            </div>
            <h1 className="font-display text-[36px] font-bold leading-[1.08] text-[#0A0F1E] md:text-[60px]">
              {localized.title}
            </h1>
            <p className="mt-6 text-[19px] leading-[1.72] text-[#4F5B75]">
              {localized.excerpt}
            </p>
            <p className="mt-5 text-[15px] font-bold leading-[1.65] text-[#66758B]">
              {t.mainGuidePrefix}:{" "}
              <Link
                href={getCornerstoneHref(mainGuide, locale)}
                className="text-[#2470EB] transition hover:text-[#1A52C8] hover:underline"
              >
                {mainGuide[locale].title}
              </Link>
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[minmax(0,720px)_280px]">
            <InterlinkingScope currentHref={currentHref}>
              <div className="space-y-10">
                {localized.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-display text-[30px] font-bold leading-[1.18] text-[#0A0F1E]">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-[17px] leading-[1.82] text-[#4F5B75]">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>
                          <InlineRichText text={paragraph} locale={locale} />
                        </p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-5 space-y-3 rounded-lg border border-[#E2E6EF] bg-[#F8FAFC] p-5 text-[15px] leading-[1.7] text-[#334155]">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2470EB]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </InterlinkingScope>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-[#E2E6EF] bg-[#F8FAFC] p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8E9BB0]">
                  {t.nextStep}
                </p>
                <h2 className="mt-3 font-display text-[22px] font-bold leading-[1.2]">
                  {t.checkTitle}
                </h2>
                <p className="mt-3 text-sm leading-[1.7] text-[#6B7585]">
                  {t.checkBody}
                </p>
                <Link
                  href={t.checkHref}
                  className="mt-5 inline-flex rounded-lg bg-[#2470EB] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1A52C8]"
                >
                  {t.checkLabel}
                </Link>
                <p className="mt-4 border-t border-[#E2E6EF] pt-4 text-xs leading-[1.6] text-[#8E9BB0]">
                  {t.note}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </article>
      <SiteFooter locale={locale} supportEmail={supportEmail} />
    </main>
  );
}
