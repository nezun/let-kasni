import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticlePageView } from "@/components/blog-article-page";
import { blogArticles } from "@/lib/blog";
import {
  getAlternateArticleCornerstoneHref,
  getArticleCornerstoneHref,
  getBlogArticleByCornerstoneSlug,
  getCornerstoneForArticle,
} from "@/lib/cornerstones";

type Props = {
  params: Promise<{
    cornerstone: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    cornerstone: getCornerstoneForArticle(article).sr.slug,
    slug: article.sr.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cornerstone, slug } = await params;
  const article = getBlogArticleByCornerstoneSlug("sr", cornerstone, slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.sr.title} | letkasni.rs`,
    description: article.sr.description,
    alternates: {
      canonical: getArticleCornerstoneHref(article, "sr"),
      languages: {
        sr: getArticleCornerstoneHref(article, "sr"),
        en: getAlternateArticleCornerstoneHref(article, "sr"),
      },
    },
    openGraph: {
      title: article.sr.title,
      description: article.sr.description,
      type: "article",
      locale: "sr_RS",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.sr.title,
      description: article.sr.description,
    },
  };
}

export default async function NestedSerbianBlogArticlePage({ params }: Props) {
  const { cornerstone, slug } = await params;
  const article = getBlogArticleByCornerstoneSlug("sr", cornerstone, slug);

  if (!article) {
    notFound();
  }

  return <BlogArticlePageView article={article} locale="sr" />;
}
