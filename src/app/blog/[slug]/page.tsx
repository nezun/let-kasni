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
    slug: article.sr.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug("sr", slug);

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

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticleBySlug("sr", slug);

  if (!article) {
    notFound();
  }

  permanentRedirect(getArticleCornerstoneHref(article, "sr"));
}
