import { LkBlogFilter } from "@/components/lk-v2/lk-blog-filter";
import { copy as lkCopy } from "@/components/lk-v2/copy";
import { LkContentCard } from "@/components/lk-v2/lk-content-card";
import { LkFinalCta, LkInnerHero } from "@/components/lk-v2/lk-inner";
import { LkFrame } from "@/components/lk-v2/lk-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogArticles, type BlogLocale } from "@/lib/blog";
import { articleCornerstoneMap, getArticleCornerstoneHref } from "@/lib/cornerstones";
import { formatDisplayDate } from "@/lib/date-format";

// Blog u izgledu nove verzije sajta (v2 iz transport-local, blok letkasni-pages/blog: hero, pretraga i tema, kartice,
// straničenje po 9, završni poziv). Tema ostaje filter preko adrese (/blog?tema=…), kao i do sada.
type BlogVariant = "a" | "b" | "c";
export type BlogCategoryFilter =
  | "all"
  | "delays"
  | "cancellations"
  | "connections"
  | "documents"
  | "procedure";

type Props = {
  locale: BlogLocale;
  /** Zadržano radi postojećih ruta; nova verzija ima jedan izgled. */
  variant?: BlogVariant;
  category?: string;
};

const copy = {
  sr: {
    blogHref: "/blog",
    categoryMain: "Sve teme",
    categoryDelay: "Kašnjenja",
    categoryCancel: "Otkazivanja",
    categoryConnections: "Konekcije",
    categoryDocuments: "Dokumenta",
    categoryProcedure: "Procedura zahteva",
  },
  en: {
    blogHref: "/en/blog",
    categoryMain: "All topics",
    categoryDelay: "Delays",
    categoryCancel: "Cancellations",
    categoryConnections: "Connections",
    categoryDocuments: "Documents",
    categoryProcedure: "Claim procedure",
  },
};

const filterIds: BlogCategoryFilter[] = [
  "all",
  "delays",
  "cancellations",
  "connections",
  "documents",
  "procedure",
];

const documentArticleIds = new Set(["documents-for-claim", "airport-action-plan"]);

const procedureArticleIds = new Set([
  "claim-deadlines",
  "how-to-file-airline-claim",
  "airline-rejected-claim",
  "airline-response-no-answer",
  "use-claim-service-or-diy",
  "claim-template-email",
  "refund-vs-compensation",
]);

function normalizeCategoryFilter(value?: string): BlogCategoryFilter {
  return filterIds.includes(value as BlogCategoryFilter)
    ? (value as BlogCategoryFilter)
    : "all";
}

function getBlogCategoryHref(locale: BlogLocale, filter: BlogCategoryFilter) {
  const baseHref = copy[locale].blogHref;
  return filter === "all" ? baseHref : `${baseHref}?tema=${filter}`;
}

function articleMatchesFilter(articleId: string, filter: BlogCategoryFilter) {
  if (filter === "all") {
    return true;
  }

  const cornerstoneId = articleCornerstoneMap[articleId] ?? "air-passenger-rights";

  if (filter === "delays") {
    return cornerstoneId === "flight-delay-compensation";
  }

  if (filter === "cancellations") {
    return cornerstoneId === "flight-cancellation-compensation";
  }

  if (filter === "connections") {
    return cornerstoneId === "missed-connection-compensation";
  }

  if (filter === "documents") {
    return documentArticleIds.has(articleId);
  }

  return procedureArticleIds.has(articleId);
}

function categoryLabel(locale: BlogLocale, filter: BlogCategoryFilter) {
  const t = copy[locale];

  const labels: Record<BlogCategoryFilter, string> = {
    all: t.categoryMain,
    delays: t.categoryDelay,
    cancellations: t.categoryCancel,
    connections: t.categoryConnections,
    documents: t.categoryDocuments,
    procedure: t.categoryProcedure,
  };

  return labels[filter];
}

function categoryList(locale: BlogLocale) {
  return filterIds.map((filter) => ({
    id: filter,
    label: categoryLabel(locale, filter),
    href: getBlogCategoryHref(locale, filter),
  }));
}

export function BlogIndexPage({ locale, category }: Props) {
  const t = lkCopy[locale].blogIndex;
  const activeFilter = normalizeCategoryFilter(category);
  // Najnoviji tekstovi prvi, kao na originalu.
  const articles = getBlogArticles(locale)
    .filter((article) => articleMatchesFilter(article.id, activeFilter))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.publishedAt.localeCompare(a.publishedAt));

  return (
    <LkFrame locale={locale} kind="lk-content-page">
      <SiteHeader locale={locale} alternateHref={getBlogCategoryHref(locale === "sr" ? "en" : "sr", activeFilter)} />
      <main id="main">
        <LkInnerHero locale={locale} crumbs={[{ label: t.title }]} badge={t.badge} title={t.title} lead={t.lead} />
        <section className="lk-section">
          <div className="lk-container">
            <LkBlogFilter
              key={activeFilter}
              t={t}
              blogHref={copy[locale].blogHref}
              topics={categoryList(locale)}
              activeTopic={activeFilter}
              initialCount={articles.length}
            >
              <div className="lk-article-grid">
                {articles.map((article) => (
                  <LkContentCard
                    key={article.id}
                    badge={article.localized.category}
                    title={article.localized.title}
                    href={getArticleCornerstoneHref(article, locale)}
                    excerpt={article.localized.excerpt}
                    date={formatDisplayDate(article.updatedAt, locale)}
                    dateTime={article.updatedAt}
                    readTime={article.localized.readTime}
                    readLabel={lkCopy[locale].inner.readArticle}
                    data={{
                      "data-article": "",
                      "data-group": articleCornerstoneMap[article.id] ?? "air-passenger-rights",
                      "data-search": `${article.localized.title} ${article.localized.excerpt}`,
                    }}
                  />
                ))}
              </div>
            </LkBlogFilter>
          </div>
        </section>
        <LkFinalCta locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </LkFrame>
  );
}
