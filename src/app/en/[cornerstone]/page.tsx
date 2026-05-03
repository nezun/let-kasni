import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CornerstonePageView } from "@/components/cornerstone-page";
import {
  cornerstonePages,
  getAlternateCornerstoneHref,
  getCornerstoneBySlug,
  getCornerstoneHref,
} from "@/lib/cornerstones";

type Props = {
  params: Promise<{
    cornerstone: string;
  }>;
};

export function generateStaticParams() {
  return cornerstonePages.map((page) => ({
    cornerstone: page.en.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cornerstone } = await params;
  const page = getCornerstoneBySlug("en", cornerstone);

  if (!page) {
    return {};
  }

  return {
    title: `${page.en.title} | letkasni.rs`,
    description: page.en.description,
    alternates: {
      canonical: getCornerstoneHref(page, "en"),
      languages: {
        sr: getAlternateCornerstoneHref(page, "en"),
        en: getCornerstoneHref(page, "en"),
      },
    },
    openGraph: {
      title: page.en.title,
      description: page.en.description,
      type: "article",
      locale: "en_US",
      modifiedTime: page.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: page.en.title,
      description: page.en.description,
    },
  };
}

export default async function EnglishCornerstonePage({ params }: Props) {
  const { cornerstone } = await params;
  const page = getCornerstoneBySlug("en", cornerstone);

  if (!page) {
    notFound();
  }

  return <CornerstonePageView page={page} locale="en" />;
}
