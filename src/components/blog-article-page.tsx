import Link from "next/link";

import { ClaimInlineCtaButton } from "@/components/claim-inline-cta-button";
import { InlineRichText, InterlinkingScope } from "@/components/inline-rich-text";
import { copy as lkCopy } from "@/components/lk-v2/copy";
import { LkArrow } from "@/components/lk-v2/lk-icon";
import { LkFinalCta, LkInnerHero } from "@/components/lk-v2/lk-inner";
import { LkModuleCard, LkModuleCheck, LkModuleChecks, LkModuleFigure } from "@/components/lk-v2/lk-modules";
import { LkFrame } from "@/components/lk-v2/lk-page";
import { lkPaths } from "@/components/lk-v2/lk-paths";
import { ScrollProgressToc } from "@/components/scroll-progress-toc";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
import focusedTargetIds from "@/content/seo-focused-targets.json";

// Šablon članka u izgledu nove verzije sajta (v2 iz transport-local, blok letkasni-pages/article: hero sa putanjom,
// sadržaj strane, tekst, završni poziv). Pravila sadržaja ostaju: brza provera odmah posle prvog H2, vizuali kroz
// tekst na istim mestima kao ranije, bez bočne forme i bez automatskih kartica „povezani tekstovi“ na kraju.
const copy = {
  sr: {
    updatedLabel: "Ažurirano",
    mainGuidePrefix: "Glavni vodič",
    evidenceVisualEyebrow: "DOKAZNI FAJL",
    evidenceVisualTitle: "Šta Letkasni.rs prvo slaže u slučaju",
    evidenceVisualItems: [
      "tačan let, datum, ruta i booking referenca",
      "planirano i stvarno vreme dolaska",
      "razlog koji aviokompanija navodi i dokaz koji ga prati",
      "računi za hranu, hotel, transfer ili novu kartu",
    ],
    processVisualEyebrow: "PROFESIONALNA PROVERA",
    processVisualTitle: "Zašto ne stajemo na generičkoj odbijenici",
    processVisualBody:
      "Aviokompanije često računaju da će fizičko lice odustati posle prvog kratkog odgovora. Uredan dosije, poznavanje pravila i proceduralni ton menjaju brzinu i kvalitet odgovora.",
    quickCheckEyebrow: "BESPLATNA PROVERA",
    quickCheckTitle: "Saznajte da li Vam pripada naknada i do 600 €.",
    quickCheckBody:
      "Brza provera spaja podatke o letu, dužinu rute i osnovne dokaze radi utvrđivanja Vašeg prava.",
    quickCheckButton: "Proverite let",
  },
  en: {
    updatedLabel: "Updated",
    mainGuidePrefix: "Main guide",
    evidenceVisualEyebrow: "CASE FILE",
    evidenceVisualTitle: "What Letkasni.rs organizes first",
    evidenceVisualItems: [
      "exact flight, date, route and booking reference",
      "scheduled and actual arrival time",
      "airline's stated reason and the evidence behind it",
      "receipts for meals, hotel, transfer or a new ticket",
    ],
    processVisualEyebrow: "PROFESSIONAL REVIEW",
    processVisualTitle: "Why we do not stop at a generic rejection",
    processVisualBody:
      "Airlines often expect individual passengers to give up after the first short answer. A structured file, knowledge of the rules and procedural pressure change the speed and quality of the response.",
    quickCheckEyebrow: "FREE CHECK",
    quickCheckTitle: "Find out if you are owed up to €600 in compensation.",
    quickCheckBody:
      "The quick check combines flight details, route distance and basic evidence to assess your right.",
    quickCheckButton: "Check your flight",
  },
};

function sectionId(heading: string) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/đ/g, "dj")
    .replace(/[čć]/g, "c")
    .replace(/š/g, "s")
    .replace(/ž/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ArticleEvidenceVisual({ locale }: { locale: BlogLocale }) {
  const t = copy[locale];

  return (
    <LkModuleCard badge={t.evidenceVisualEyebrow} title={t.evidenceVisualTitle}>
      <LkModuleChecks items={t.evidenceVisualItems} />
    </LkModuleCard>
  );
}

function ArticleProcessVisual({ locale }: { locale: BlogLocale }) {
  const t = copy[locale];

  return (
    <LkModuleCard dark badge={t.processVisualEyebrow} title={t.processVisualTitle}>
      <p>{t.processVisualBody}</p>
    </LkModuleCard>
  );
}

function ArticleQuickCheckBanner({ locale }: { locale: BlogLocale }) {
  const t = copy[locale];

  return (
    <LkModuleCheck badge={t.quickCheckEyebrow} title={t.quickCheckTitle} body={t.quickCheckBody}>
      <ClaimInlineCtaButton locale={locale} eventLabel="blog_quick_check_cta" className="ew-button">
        {t.quickCheckButton} <LkArrow />
      </ClaimInlineCtaButton>
    </LkModuleCheck>
  );
}

function ArticleContextImage({ article }: { article: BlogArticle }) {
  const image = getBlogArticleImage(article.id);

  return <LkModuleFigure src={image.src} alt={image.alt} position={image.position} />;
}

export function BlogArticlePageView({
  article,
  locale,
}: {
  article: BlogArticle;
  locale: BlogLocale;
}) {
  const t = copy[locale];
  const inner = lkCopy[locale].inner;
  const localized = article[locale];
  const focused = focusedTargetIds.includes(article.id);
  const processIndex = focused ? Math.min(5, localized.sections.length - 1) : 5;
  const contextImageIndex = focused ? Math.min(7, localized.sections.length - 2) : 7;
  const mainGuide = getCornerstoneForArticle(article);
  const alternateHref = getAlternateArticleCornerstoneHref(article, locale);
  const currentHref = getArticleCornerstoneHref(article, locale);
  const tocSections = localized.sections.map((section) => ({
    id: sectionId(section.heading),
    label: section.heading,
  }));
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
    <LkFrame locale={locale} kind="lk-content-page">
      <SiteHeader locale={locale} alternateHref={alternateHref} />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <LkInnerHero
          locale={locale}
          crumbs={[{ label: inner.blog, href: lkPaths(locale).blog }, { label: localized.title }]}
          badge={localized.category}
          title={localized.title}
          lead={localized.excerpt}
        />
        <div className="lk-container lk-reading-layout">
          <ScrollProgressToc label={inner.tocTitle} navLabel={inner.tocAria} sections={tocSections}>
            <ClaimInlineCtaButton locale={locale} eventLabel="blog_toc_cta" className="ew-button">
              {inner.tocButton}
            </ClaimInlineCtaButton>
          </ScrollProgressToc>
          <article className="lk-reading">
            <p className="lk-read-meta">
              {t.updatedLabel}: {formatDisplayDate(article.updatedAt, locale)} · {localized.readTime} ·{" "}
              {t.mainGuidePrefix}: <Link href={getCornerstoneHref(mainGuide, locale)}>{mainGuide[locale].title}</Link>
            </p>
            <InterlinkingScope currentHref={currentHref}>
              {localized.sections.map((section, index) => (
                <section key={section.heading} id={sectionId(section.heading)} className="lk-reading-section">
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>
                      <InlineRichText text={paragraph} locale={locale} />
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {index === 0 ? (
                    <ArticleQuickCheckBanner locale={locale} />
                  ) : null}
                  {index === 2 ? (
                    <ArticleEvidenceVisual locale={locale} />
                  ) : null}
                  {index === processIndex ? (
                    <ArticleProcessVisual locale={locale} />
                  ) : null}
                  {index === contextImageIndex ? (
                    <ArticleContextImage article={article} />
                  ) : null}
                </section>
              ))}
            </InterlinkingScope>
          </article>
        </div>
        <LkFinalCta locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </LkFrame>
  );
}
