import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogArticleImage, getBlogArticles, type BlogLocale } from "@/lib/blog";
import {
  articleCornerstoneMap,
  cornerstonePages,
  getArticleCornerstoneHref,
  getCornerstoneHref,
} from "@/lib/cornerstones";
import { formatDisplayDate } from "@/lib/date-format";
import { getSupportEmail } from "@/lib/env";

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
  variant?: BlogVariant;
  category?: string;
};

const copy = {
  sr: {
    blogHref: "/blog",
    checkHref: "/#proveri-let",
    checkLabel: "Proveri let",
    title: "Blog",
    subtitle:
      "Vodiči o kašnjenjima, otkazivanjima, konekcijama i pravima putnika. Bez pravnog žargona, sa jasnim sledećim korakom.",
    categoryMain: "Odšteta i prava putnika",
    categoryDelay: "Kašnjenja",
    categoryCancel: "Otkazivanja",
    categoryConnections: "Konekcije",
    categoryDocuments: "Dokumenta",
    categoryProcedure: "Procedura zahteva",
    sectionTitle: "Odšteta i prava putnika",
    emptyTitle: "Nema tekstova u ovoj temi",
    emptyBody: "Promenite filter ili otvorite sve blogove.",
    viewAll: "Pogledaj sve",
    byline: "Autor: letkasni",
    updatedLabel: "Ažurirano",
    readGuide: "Pročitaj vodič",
    featureTitle: "Najvažniji vodiči za putnike iz Srbije",
    featureBody:
      "Tri vodiča koja najčešće odlučuju da li slučaj vredi dalje proveravati: kašnjenje, otkazivanje i propuštena konekcija.",
    cornerstoneTitle: "Glavni vodiči",
    cornerstoneIntro:
      "Glavne strane pokrivaju najvažnije teme, a blogovi ispod njih ulaze u konkretne scenarije i dokaze.",
  },
  en: {
    blogHref: "/en/blog",
    checkHref: "/en#proveri-let",
    checkLabel: "Check flight",
    title: "Blog",
    subtitle:
      "Guides on delays, cancellations, missed connections, and passenger rights. Clear next steps without legal fog.",
    categoryMain: "Compensation & passenger rights",
    categoryDelay: "Delays",
    categoryCancel: "Cancellations",
    categoryConnections: "Connections",
    categoryDocuments: "Documents",
    categoryProcedure: "Claim procedure",
    sectionTitle: "Compensation & Passenger Rights",
    emptyTitle: "No articles in this topic",
    emptyBody: "Change the filter or open all blog posts.",
    viewAll: "View all",
    byline: "By letkasni",
    updatedLabel: "Updated",
    readGuide: "Read guide",
    featureTitle: "Key guides for Serbia-based passengers",
    featureBody:
      "Three guides that most often decide whether a case is worth checking further: delay, cancellation, and missed connection.",
    cornerstoneTitle: "Main guides",
    cornerstoneIntro:
      "Main guides cover the key topics, while related blog articles go deeper into specific scenarios and evidence.",
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

function filterArticles<T extends { id: string }>(articles: T[], filter: BlogCategoryFilter) {
  return articles.filter((article) => articleMatchesFilter(article.id, filter));
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

function categorySectionTitle(locale: BlogLocale, filter: BlogCategoryFilter) {
  return filter === "all" ? copy[locale].sectionTitle : categoryLabel(locale, filter);
}

function categoryDescription(locale: BlogLocale, filter: BlogCategoryFilter, count: number) {
  if (filter === "all") {
    return locale === "sr"
      ? "Svi praktični vodiči raspoređeni po glavnim temama."
      : "All practical guides grouped around the main passenger-rights topics.";
  }

  return locale === "sr"
    ? `${count} tekstova u temi: ${categoryLabel(locale, filter)}.`
    : `${count} articles in: ${categoryLabel(locale, filter)}.`;
}

function activeCategoryClass(isActive: boolean) {
  return isActive
    ? "border-[#2470EB] bg-[#2470EB] !text-white shadow-[0_14px_32px_rgba(36,112,235,0.22)]"
    : "border-[#DDE4EF] bg-white text-[#0B2E6F] hover:border-[#2470EB] hover:bg-[#EEF5FF]";
}

function EmptyState({ locale }: { locale: BlogLocale }) {
  const t = copy[locale];

  return (
    <div
      className="rounded-[18px] border border-dashed border-[#C8D3E3] bg-[#F8FAFC] p-8 text-center sm:col-span-2 lg:col-span-3"
    >
      <h3 className="text-[22px] font-black tracking-[-0.02em] text-[#161D2A]">
        {t.emptyTitle}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.7] text-[#66758B]">{t.emptyBody}</p>
      <Link
        href={t.blogHref}
        className="mt-5 inline-flex rounded-full bg-[#2470EB] px-5 py-3 text-sm font-black text-white"
      >
        {t.viewAll}
      </Link>
    </div>
  );
}

function CategoryRail({
  locale,
  variant,
  activeFilter,
}: {
  locale: BlogLocale;
  variant: BlogVariant;
  activeFilter: BlogCategoryFilter;
}) {
  const categories = categoryList(locale);

  if (variant === "b") {
    return (
      <div className="mt-10 grid max-w-[940px] gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Link
            key={category.label}
            href={category.href}
            aria-current={category.id === activeFilter ? "page" : undefined}
            className="group flex min-h-[76px] items-center justify-between rounded-[18px] border border-[#DDE4EF] bg-white px-5 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[#2470EB] hover:shadow-[0_20px_46px_rgba(36,112,235,0.12)]"
          >
            <span>
              <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-[#8E9BB0]">
                0{index + 1}
              </span>
              <span className="mt-1 block text-[13px] font-black uppercase tracking-[0.02em] text-[#0B2E6F]">
                {category.label}
              </span>
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF5FF] text-sm font-black text-[#2470EB] transition group-hover:bg-[#2470EB] group-hover:text-white">
              →
            </span>
          </Link>
        ))}
      </div>
    );
  }

  if (variant === "c") {
    return (
      <div className="mt-10 max-w-[1060px] rounded-[28px] border border-[#DDE4EF] bg-[#0B1326] p-2 shadow-[0_22px_64px_rgba(15,23,42,0.14)]">
        <div className="grid gap-1 md:grid-cols-6">
          {categories.map((category, index) => (
            <Link
              key={category.label}
              href={category.href}
              aria-current={category.id === activeFilter ? "page" : undefined}
              className="group rounded-[22px] px-4 py-4 text-white/76 transition hover:bg-white hover:text-[#0B2E6F]"
            >
              <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-[#69A1FF] transition group-hover:text-[#2470EB]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block text-[12px] font-black uppercase leading-[1.25] tracking-[0.02em]">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 flex max-w-[1220px] flex-wrap gap-3">
      {categories.map((category) => (
        <Link
          key={category.label}
          href={category.href}
          aria-current={category.id === activeFilter ? "page" : undefined}
          className={`whitespace-nowrap rounded-full border px-5 py-3 text-[12px] font-black uppercase tracking-[0.02em] transition ${activeCategoryClass(
            category.id === activeFilter,
          )}`}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}

function ImageTag({
  articleId,
  className,
}: {
  articleId: string;
  className: string;
}) {
  const image = getBlogArticleImage(articleId);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.src}
      alt={image.alt}
      className={className}
      style={{ objectPosition: image.position ?? "center" }}
    />
  );
}

function CategoryPill({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <span
      className={`inline-flex max-w-full rounded-full px-3 py-1 text-[10px] font-black uppercase leading-none tracking-[0.02em] ${
        onDark ? "bg-white/22 text-white" : "bg-white/80 text-[#4F5B75] shadow-sm"
      }`}
    >
      {children}
    </span>
  );
}

function MetaLine({
  updatedAt,
  locale,
  byline,
  light = false,
}: {
  updatedAt: string;
  locale: BlogLocale;
  byline: string;
  light?: boolean;
}) {
  const t = copy[locale];

  return (
    <div className={`flex flex-wrap gap-x-5 gap-y-1 text-[11px] font-black uppercase ${light ? "text-white/76" : "text-[#76849A]"}`}>
      <span>{byline}</span>
      <span>
        {t.updatedLabel}: {formatDisplayDate(updatedAt, locale)}
      </span>
    </div>
  );
}

function HeroStory({
  article,
  locale,
  variant,
}: {
  article: ReturnType<typeof getBlogArticles>[number];
  locale: BlogLocale;
  variant: BlogVariant;
}) {
  const t = copy[locale];
  const isCompact = variant === "c";

  const frameClass =
    variant === "a"
      ? "h-[320px] sm:h-[340px] lg:h-[360px]"
      : isCompact
        ? "h-[340px] sm:h-[400px] lg:h-[440px]"
        : "h-[360px] sm:h-[420px] lg:h-[460px]";

  return (
    <Link
      href={getArticleCornerstoneHref(article, locale)}
      className={`group relative block overflow-hidden bg-[#0B1326] text-white shadow-[0_30px_80px_rgba(15,23,42,0.16)] ${
        variant === "b" ? "rounded-[28px]" : "rounded-[20px]"
      }`}
    >
      <div className={frameClass}>
        <ImageTag
          articleId={article.id}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/88 via-black/48 to-transparent px-6 pb-7 pt-24 md:px-12 md:pb-9 md:pt-32">
        <CategoryPill onDark>{t.categoryMain}</CategoryPill>
        <h2 className="mt-5 max-w-[760px] text-[30px] font-black leading-[1.12] tracking-[-0.03em] text-white md:text-[44px]">
          {article.localized.title}
        </h2>
        <div className="mt-6">
          <MetaLine
            updatedAt={article.updatedAt}
            locale={locale}
            byline={t.byline}
            light
          />
        </div>
      </div>
    </Link>
  );
}

function BlogCard({
  article,
  locale,
  size = "default",
}: {
  article: ReturnType<typeof getBlogArticles>[number];
  locale: BlogLocale;
  size?: "default" | "large" | "horizontal";
}) {
  const t = copy[locale];

  if (size === "horizontal") {
    return (
      <Link href={getArticleCornerstoneHref(article, locale)} className="group grid overflow-hidden rounded-[18px] border border-[#E2E6EF] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)] md:grid-cols-[280px_minmax(0,1fr)]">
        <div className="relative min-h-[220px] overflow-hidden">
          <ImageTag articleId={article.id} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
          <div className="absolute bottom-4 left-4">
            <CategoryPill>{article.localized.category}</CategoryPill>
          </div>
        </div>
        <div className="flex flex-col justify-center p-7">
          <MetaLine
            updatedAt={article.updatedAt}
            locale={locale}
            byline={t.byline}
          />
          <h3 className="mt-4 text-[27px] font-black leading-[1.12] tracking-[-0.03em] text-[#0A0F1E]">
            {article.localized.title}
          </h3>
          <p className="mt-4 text-[15px] leading-[1.7] text-[#66758B]">{article.localized.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#2470EB]">
            {t.readGuide}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={getArticleCornerstoneHref(article, locale)} className="group block">
      <div className={`relative overflow-hidden rounded-[12px] bg-[#E7EEF8] ${size === "large" ? "aspect-[16/10]" : "aspect-[16/11.2]"}`}>
        <ImageTag articleId={article.id} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
        <div className="absolute bottom-4 left-4">
          <CategoryPill>{article.localized.category}</CategoryPill>
        </div>
      </div>
      <div className="pt-6">
        <MetaLine
          updatedAt={article.updatedAt}
          locale={locale}
          byline={t.byline}
        />
        <h3 className={`mt-4 font-black leading-[1.16] tracking-[-0.03em] text-[#161D2A] ${size === "large" ? "text-[28px]" : "text-[22px]"}`}>
          {article.localized.title}
        </h3>
      </div>
    </Link>
  );
}

function BlogIndexVariantA({
  locale,
  category,
}: {
  locale: BlogLocale;
  category?: string;
}) {
  const t = copy[locale];
  const supportEmail = getSupportEmail();
  const activeFilter = normalizeCategoryFilter(category);
  const allArticles = getBlogArticles(locale);
  const articles = filterArticles(allArticles, activeFilter);
  const defaultHero =
    allArticles.find((article) => article.id === "flight-delay-compensation") ??
    allArticles[0];
  const hero = articles[0] ?? defaultHero;
  const guides = cornerstonePages.map((page) => ({
    ...page,
    localized: page[locale],
    href: getCornerstoneHref(page, locale),
  }));

  return (
    <main className="min-h-screen bg-white pt-16 text-[#0A0F1E]">
      <SiteHeader locale={locale} alternateHref={locale === "sr" ? "/en/blog" : "/blog"} />
      <section className="px-6 pb-10 pt-10 md:pb-16">
        <div className="mx-auto max-w-[1220px]">
          <h1 className="text-[44px] font-black leading-none tracking-[-0.04em] text-[#161D2A] md:text-[68px]">
            {t.title}
          </h1>
          <CategoryRail locale={locale} variant="a" activeFilter={activeFilter} />

          <div className="mt-8">
            <HeroStory article={hero} locale={locale} variant="a" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-14">
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[30px] font-black tracking-[-0.035em] text-[#161D2A] md:text-[38px]">
                {t.cornerstoneTitle}
              </h2>
              <p className="mt-2 max-w-[720px] text-[15px] leading-[1.7] text-[#66758B]">
                {t.cornerstoneIntro}
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={guide.href}
                className="rounded-[12px] border border-[#DDE4EF] bg-[#F8FAFC] p-4 transition hover:-translate-y-0.5 hover:border-[#2470EB] hover:bg-white hover:shadow-[0_18px_46px_rgba(15,23,42,0.08)]"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#2470EB]">
                  {guide.localized.eyebrow}
                </p>
                <h3 className="mt-2 text-[17px] font-black leading-[1.22] tracking-[-0.015em] text-[#0A0F1E]">
                  {guide.localized.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="compensation-rights" className="scroll-mt-24 px-6 pb-20 pt-4">
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-9 flex items-end justify-between gap-6">
            <div>
              <h2 className="text-[34px] font-black tracking-[-0.035em] text-[#161D2A] md:text-[42px]">
                {categorySectionTitle(locale, activeFilter)}
              </h2>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#66758B]">
                {categoryDescription(locale, activeFilter, articles.length)}
              </p>
            </div>
            <Link href={t.blogHref} className="shrink-0 text-sm font-black text-[#2470EB]">
              {t.viewAll}
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.length > 0 ? (
              articles.map((article) => (
                <BlogCard key={article.id} article={article} locale={locale} />
              ))
            ) : (
              <EmptyState locale={locale} />
            )}
          </div>
        </div>
      </section>
      <SiteFooter locale={locale} supportEmail={supportEmail} />
    </main>
  );
}

function BlogIndexVariantB({
  locale,
  category,
}: {
  locale: BlogLocale;
  category?: string;
}) {
  const t = copy[locale];
  const supportEmail = getSupportEmail();
  const activeFilter = normalizeCategoryFilter(category);
  const allArticles = getBlogArticles(locale);
  const articles = filterArticles(allArticles, activeFilter);
  const hero = articles[1] ?? articles[0] ?? allArticles[1] ?? allArticles[0];
  const topThree = [articles[1], articles[0], articles[2]].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#F6F8FC] pt-16 text-[#0A0F1E]">
      <SiteHeader locale={locale} alternateHref={locale === "sr" ? "/en/blog" : "/blog"} />
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#2470EB]">
              {t.categoryMain}
            </p>
            <h1 className="mt-4 text-[42px] font-black leading-[1.03] tracking-[-0.045em] text-[#161D2A] md:text-[58px]">
              {t.title}
            </h1>
            <p className="mt-6 text-[17px] leading-[1.75] text-[#66758B]">{t.subtitle}</p>
            <CategoryRail locale={locale} variant="b" activeFilter={activeFilter} />
          </div>

          <div>
            <HeroStory article={hero} locale={locale} variant="b" />
            <div id="compensation-rights" className="mt-10 scroll-mt-24">
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-[32px] font-black tracking-[-0.035em]">{t.sectionTitle}</h2>
                <Link href={t.blogHref} className="text-sm font-black text-[#2470EB]">{t.viewAll}</Link>
              </div>
              <div className="grid gap-7 md:grid-cols-3">
                {topThree.map((article) => (
                  <BlogCard key={article.id} article={article} locale={locale} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter locale={locale} supportEmail={supportEmail} />
    </main>
  );
}

function BlogIndexVariantC({
  locale,
  category,
}: {
  locale: BlogLocale;
  category?: string;
}) {
  const t = copy[locale];
  const supportEmail = getSupportEmail();
  const activeFilter = normalizeCategoryFilter(category);
  const allArticles = getBlogArticles(locale);
  const articles = filterArticles(allArticles, activeFilter);
  const hero = articles[2] ?? articles[0] ?? allArticles[2] ?? allArticles[0];
  const topThree = articles.slice(0, 3);

  return (
    <main className="min-h-screen bg-white pt-16 text-[#0A0F1E]">
      <SiteHeader locale={locale} alternateHref={locale === "sr" ? "/en/blog" : "/blog"} />
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-[1220px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#2470EB]">
                {t.categoryMain}
              </p>
              <h1 className="mt-4 max-w-[850px] text-[44px] font-black leading-[1.03] tracking-[-0.045em] text-[#161D2A] md:text-[68px]">
                {t.title}
              </h1>
            </div>
            <p className="text-[17px] leading-[1.75] text-[#66758B]">{t.subtitle}</p>
          </div>

          <CategoryRail locale={locale} variant="c" activeFilter={activeFilter} />

          <div className="mt-10">
            <HeroStory article={hero} locale={locale} variant="c" />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section id="compensation-rights" className="scroll-mt-24">
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-[34px] font-black tracking-[-0.035em]">{t.sectionTitle}</h2>
                <Link href={t.blogHref} className="text-sm font-black text-[#2470EB]">{t.viewAll}</Link>
              </div>
              <div className="space-y-6">
                {topThree.map((article) => (
                  <BlogCard key={article.id} article={article} locale={locale} size="horizontal" />
                ))}
              </div>
            </section>

            <aside className="rounded-[24px] bg-[#EEF5FF] p-7 lg:sticky lg:top-28 lg:self-start">
              <h3 className="text-[28px] font-black leading-[1.12] tracking-[-0.04em] text-[#0B2E6F]">
                {t.featureTitle}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#41516B]">{t.featureBody}</p>
              <Link href={t.checkHref} className="mt-7 inline-flex rounded-xl bg-[#2470EB] px-5 py-3 text-sm font-black text-white">
                {t.checkLabel}
              </Link>
            </aside>
          </div>
        </div>
      </section>
      <SiteFooter locale={locale} supportEmail={supportEmail} />
    </main>
  );
}

export function BlogIndexPage({ locale, variant = "a", category }: Props) {
  if (variant === "b") {
    return <BlogIndexVariantB locale={locale} category={category} />;
  }

  if (variant === "c") {
    return <BlogIndexVariantC locale={locale} category={category} />;
  }

  return <BlogIndexVariantA locale={locale} category={category} />;
}
