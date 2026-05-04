import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { blogArticles, getBlogArticleBySlug } from "@/lib/blog";
import {
  getAlternateArticleCornerstoneHref,
  getArticleCornerstoneHref,
} from "@/lib/cornerstones";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.en.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug("en", slug);

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

export default async function EnglishBlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticleBySlug("en", slug);

  if (!article) {
    notFound();
  }

  permanentRedirect(getArticleCornerstoneHref(article, "en"));
}
