import Link from "next/link";

import { ClaimInlineCtaButton } from "@/components/claim-inline-cta-button";
import { InlineRichText, InterlinkingScope } from "@/components/inline-rich-text";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSupportEmail } from "@/lib/env";
import {
  type BlogArticle,
  type BlogLocale,
  getBlogArticleImage,
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
    note:
      "Vodič je informativan. Ishod zavisi od rute, prevoznika, razloga poremećaja i dokaza u konkretnom slučaju.",
    updatedLabel: "Ažurirano",
    mainGuidePrefix: "Širi vodič za ovu temu",
    evidenceVisualEyebrow: "Dokazni fajl",
    evidenceVisualTitle: "Šta Let Kasni prvo slaže u slučaju",
    evidenceVisualItems: [
      "tačan let, datum, ruta i booking referenca",
      "planirano i stvarno vreme dolaska",
      "razlog koji aviokompanija navodi i dokaz koji ga prati",
      "računi za hranu, hotel, transfer ili novu kartu",
    ],
    processVisualEyebrow: "Profesionalna provera",
    processVisualTitle: "Zašto ne stajemo na generičkoj odbijenici",
    processVisualBody:
      "Aviokompanije često računaju da će fizičko lice odustati posle prvog kratkog odgovora. Uredan dosije, poznavanje pravila i proceduralni ton menjaju brzinu i kvalitet odgovora.",
    quickCheckTitle: "Saznajte da li vam pripada naknada i do 600 EUR.",
    quickCheckBody:
      "Brza provera spaja podatke o letu, dužinu rute i osnovne dokaze radi utvrđivanja Vašeg prava.",
    quickCheckButton: "Proveri let",
    quickCheckFlight: "Poremećaj leta",
    quickCheckStatus: "ZA STRUČNU PROVERU",
    quickCheckRoute: "Beograd",
    quickCheckDelay: "3h+ kašnjenje",
  },
  en: {
    nextStep: "Next step",
    checkTitle: "Check your flight",
    checkBody:
      "Enter your flight number and date for a conservative first review before any promise is made.",
    checkLabel: "Check flight",
    note:
      "This guide is informational. Outcome depends on route, carrier, disruption cause, and evidence in the specific case.",
    updatedLabel: "Updated",
    mainGuidePrefix: "Main guide for this topic",
    evidenceVisualEyebrow: "Case file",
    evidenceVisualTitle: "What Let Kasni organizes first",
    evidenceVisualItems: [
      "exact flight, date, route and booking reference",
      "scheduled and actual arrival time",
      "airline's stated reason and the evidence behind it",
      "receipts for meals, hotel, transfer or a new ticket",
    ],
    processVisualEyebrow: "Professional review",
    processVisualTitle: "Why we do not stop at a generic rejection",
    processVisualBody:
      "Airlines often expect individual passengers to give up after the first short answer. A structured file, knowledge of the rules and procedural pressure change the speed and quality of the response.",
    quickCheckTitle: "Find out if you are owed up to EUR 600 in compensation.",
    quickCheckBody:
      "The quick check combines flight details, route distance and basic evidence to assess your right.",
    quickCheckButton: "Check flight",
    quickCheckFlight: "Flight disruption",
    quickCheckStatus: "FOR EXPERT REVIEW",
    quickCheckRoute: "Belgrade",
    quickCheckDelay: "3h+ delay",
  },
};

function ArticleEvidenceVisual({ locale }: { locale: BlogLocale }) {
  const t = copy[locale];

  return (
    <div className="rounded-[16px] border border-[#D6E4FF] bg-[#F3F7FF] p-5 md:p-6">
      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#2470EB]">
        {t.evidenceVisualEyebrow}
      </p>
      <h3 className="mt-2 font-display text-[23px] font-black leading-[1.18] text-[#101828]">
        {t.evidenceVisualTitle}
      </h3>
      <ul className="mt-5 grid gap-3 text-[15px] leading-[1.6] text-[#344054] md:grid-cols-2">
        {t.evidenceVisualItems.map((item) => (
          <li key={item} className="rounded-[12px] border border-white bg-white p-4 font-bold shadow-[0_10px_28px_rgba(16,24,40,0.04)]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArticleProcessVisual({ locale }: { locale: BlogLocale }) {
  const t = copy[locale];

  return (
    <div className="rounded-[16px] border border-[#D8E4FF] bg-[#0B1220] p-5 text-white shadow-[0_18px_48px_rgba(16,24,40,0.14)] md:p-6">
      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-white/70">
        {t.processVisualEyebrow}
      </p>
      <h3 className="mt-2 font-display text-[24px] font-black leading-[1.18]">
        {t.processVisualTitle}
      </h3>
      <p className="mt-4 max-w-[620px] text-[16px] leading-[1.7] text-white/82">
        {t.processVisualBody}
      </p>
    </div>
  );
}

function ArticleQuickCheckBanner({ locale }: { locale: BlogLocale }) {
  const t = copy[locale];

  return (
    <div className="relative overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_72%_20%,#61A5FF_0,#226CF0_30%,#14378E_56%,#B53771_100%)] p-6 text-white shadow-[0_22px_60px_rgba(36,112,235,0.22)] md:p-8">
      <div className="relative z-10 grid gap-7 md:grid-cols-[minmax(0,0.9fr)_1.1fr] md:items-center">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/72">
            {copy[locale].nextStep}
          </p>
          <h3 className="mt-3 max-w-[390px] font-display text-[27px] font-black leading-[1.14] md:text-[32px]">
            {t.quickCheckTitle}
          </h3>
          <p className="mt-4 max-w-[420px] text-[15px] font-semibold leading-[1.65] text-white/78">
            {t.quickCheckBody}
          </p>
          <ClaimInlineCtaButton
            locale={locale}
            eventLabel="blog_quick_check_cta"
            className="mt-6 inline-flex items-center justify-center rounded-[12px] bg-[#0B1220] px-6 py-3.5 text-[14px] font-black text-white shadow-[0_14px_34px_rgba(2,8,23,0.28)] ring-1 ring-white/35 transition hover:bg-[#111827] focus:outline-none focus:ring-4 focus:ring-white/35"
          >
            {t.quickCheckButton}
          </ClaimInlineCtaButton>
        </div>
        <div className="relative min-h-[190px] md:min-h-[240px]" aria-hidden="true">
          <div className="absolute right-[6%] top-0 w-[58%] rotate-[5deg] rounded-[18px] bg-white p-4 text-[#172033] shadow-[0_24px_56px_rgba(2,8,23,0.28)]">
            <div className="flex items-center justify-between border-b border-[#E3E8F4] pb-3">
              <span className="rounded-full bg-[#EAF2FF] px-3 py-1 text-[10px] font-black text-[#2470EB]">
                LK 261
              </span>
              <span className="text-[10px] font-black uppercase text-[#98A2B3]">
                {t.quickCheckStatus}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div>
                <p className="text-[11px] font-black uppercase text-[#98A2B3]">
                  {t.quickCheckRoute}
                </p>
                <p className="mt-1 text-[24px] font-black text-[#111827]">BEG</p>
              </div>
              <div className="h-[2px] w-12 bg-[#D7E2F2]" />
              <div className="text-right">
                <p className="text-[11px] font-black uppercase text-[#98A2B3]">
                  EU
                </p>
                <p className="mt-1 text-[24px] font-black text-[#111827]">€600</p>
              </div>
            </div>
            <p className="mt-5 rounded-[12px] bg-[#FFF4E5] px-4 py-3 text-[14px] font-black text-[#C45700]">
              {t.quickCheckDelay}
            </p>
          </div>
          <div className="absolute bottom-2 left-[4%] w-[50%] -rotate-[8deg] rounded-[16px] bg-[#FF5B72] p-4 text-white shadow-[0_20px_48px_rgba(2,8,23,0.24)]">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white/72">
              {t.quickCheckFlight}
            </p>
            <div className="mt-7 h-2 w-24 rounded-full bg-white/80" />
            <div className="mt-3 h-2 w-32 rounded-full bg-white/45" />
            <div className="mt-6 inline-flex rounded-full bg-white/18 px-3 py-1 text-[12px] font-black">
              Let Kasni
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleContextImage({
  article,
}: {
  article: BlogArticle;
}) {
  const image = getBlogArticleImage(article.id);

  return (
    <figure className="overflow-hidden rounded-[20px] border border-[#DDE7F5] bg-[#F8FAFC] shadow-[0_18px_55px_rgba(16,24,40,0.08)]">
      <div className="relative aspect-[16/8]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover"
          style={{ objectPosition: image.position ?? "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07101F]/60 via-transparent to-transparent" />
      </div>
    </figure>
  );
}

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
          <div className="mx-auto max-w-[940px]">
            <InterlinkingScope currentHref={currentHref}>
              <div className="space-y-10">
                {localized.sections.map((section, index) => (
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
                    {index === 0 ? (
                      <div className="mt-8">
                        <ArticleQuickCheckBanner locale={locale} />
                      </div>
                    ) : null}
                    {index === 2 ? (
                      <div className="mt-7">
                        <ArticleEvidenceVisual locale={locale} />
                      </div>
                    ) : null}
                    {index === 5 ? (
                      <div className="mt-7">
                        <ArticleProcessVisual locale={locale} />
                      </div>
                    ) : null}
                    {index === 7 ? (
                      <div className="mt-8">
                        <ArticleContextImage article={article} />
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>
            </InterlinkingScope>
          </div>
        </section>
      </article>
      <SiteFooter locale={locale} supportEmail={supportEmail} />
    </main>
  );
}
