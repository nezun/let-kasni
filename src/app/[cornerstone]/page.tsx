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
    cornerstone: page.sr.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cornerstone } = await params;
  const page = getCornerstoneBySlug("sr", cornerstone);

  if (!page) {
    return {};
  }

  return {
    title: `${page.sr.title} | letkasni.rs`,
    description: page.sr.description,
    alternates: {
      canonical: getCornerstoneHref(page, "sr"),
      languages: {
        sr: getCornerstoneHref(page, "sr"),
        en: getAlternateCornerstoneHref(page, "sr"),
      },
    },
    openGraph: {
      title: page.sr.title,
      description: page.sr.description,
      type: "article",
      locale: "sr_RS",
      modifiedTime: page.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: page.sr.title,
      description: page.sr.description,
    },
  };
}

export default async function SerbianCornerstonePage({ params }: Props) {
  const { cornerstone } = await params;
  const page = getCornerstoneBySlug("sr", cornerstone);

  if (!page) {
    notFound();
  }

  return <CornerstonePageView page={page} locale="sr" />;
}
