import type { Metadata } from "next";

import { BlogIndexPage } from "@/components/blog-index-page";

const baseMetadata: Metadata = {
  title: "Blog | letkasni.rs",
  description:
    "Guides on flight compensation, delayed flights, cancelled flights, missed connections, overbooking, and passenger rights.",
  alternates: {
    canonical: "/en/blog",
    languages: {
      sr: "/blog",
      en: "/en/blog",
      "x-default": "/blog",
    },
  },
  openGraph: {
    title: "Blog | letkasni.rs",
    description:
      "Practical guides on flight compensation and passenger rights for travelers connected with Serbia.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | letkasni.rs",
    description:
      "Practical guides on flight compensation and passenger rights for travelers connected with Serbia.",
  },
};

type EnglishBlogPageProps = {
  searchParams?: Promise<{
    tema?: string | string[];
  }>;
};

export async function generateMetadata({ searchParams }: EnglishBlogPageProps): Promise<Metadata> {
  const params = await searchParams;

  if (params?.tema === undefined) {
    return baseMetadata;
  }

  // Filtered lists consolidate to the base index and are not language variants.
  return {
    ...baseMetadata,
    alternates: { canonical: baseMetadata.alternates?.canonical },
  };
}

export default async function EnglishBlogPage({ searchParams }: EnglishBlogPageProps) {
  const params = await searchParams;

  return (
    <BlogIndexPage
      locale="en"
      variant="a"
      category={typeof params?.tema === "string" ? params.tema : undefined}
    />
  );
}
