import { articleImages, blogArticles as rawBlogArticles } from "@/content/blog";
import { enhanceBlogArticle } from "@/lib/blog-content-enhancements";

export type BlogLocale = "sr" | "en";

export type BlogSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type LocalizedArticle = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  readTime: string;
  sections: BlogSection[];
};

export type BlogArticle = {
  id: string;
  publishedAt: string;
  updatedAt: string;
  sr: LocalizedArticle;
  en: LocalizedArticle;
};

export type BlogArticleImage = {
  src: string;
  alt: string;
  position?: string;
};

export const blogArticles = rawBlogArticles.map(enhanceBlogArticle);
export { articleImages };

export function getBlogArticles(locale: BlogLocale) {
  return blogArticles.map((article) => ({
    ...article,
    localized: article[locale],
  }));
}

export function getBlogArticleBySlug(locale: BlogLocale, slug: string) {
  return blogArticles.find((article) => article[locale].slug === slug) ?? null;
}

export function getAlternateArticleHref(article: BlogArticle, locale: BlogLocale) {
  return locale === "sr"
    ? `/en/blog/${article.en.slug}`
    : `/blog/${article.sr.slug}`;
}

export function getBlogArticleImage(articleId: string) {
  return articleImages[articleId] ?? articleImages["flight-delay-compensation"];
}

export function getRelatedBlogArticles(article: BlogArticle, locale: BlogLocale, limit = 3) {
  return blogArticles
    .filter((candidate) => candidate.id !== article.id)
    .map((candidate) => ({
      ...candidate,
      localized: candidate[locale],
      score: candidate[locale].category === article[locale].category ? 1 : 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
