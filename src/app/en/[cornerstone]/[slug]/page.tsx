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
    cornerstone: getCornerstoneForArticle(article).en.slug,
    slug: article.en.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cornerstone, slug } = await params;
  const article = getBlogArticleByCornerstoneSlug("en", cornerstone, slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.en.title} | letkasni.rs`,
    description: article.en.description,
    alternates: {
      canonical: getArticleCornerstoneHref(article, "en"),
      languages: {
        sr: getAlternateArticleCornerstoneHref(article, "en"),
        en: getArticleCornerstoneHref(article, "en"),
      },
    },
    openGraph: {
      title: article.en.title,
      description: article.en.description,
      type: "article",
      locale: "en_US",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.en.title,
      description: article.en.description,
    },
  };
}

export default async function NestedEnglishBlogArticlePage({ params }: Props) {
  const { cornerstone, slug } = await params;
  const article = getBlogArticleByCornerstoneSlug("en", cornerstone, slug);

  if (!article) {
    notFound();
  }

  return <BlogArticlePageView article={article} locale="en" />;
}
