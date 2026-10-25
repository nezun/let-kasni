import type { Metadata } from "next";

import { BlogIndexPage } from "@/components/blog-index-page";

const baseMetadata: Metadata = {
  title: "Blog | Letkasni.rs",
  description:
    "Vodiči o pravima putnika, kašnjenju leta, otkazivanju, propuštenim konekcijama i avio-odšteti za putnike iz Srbije.",
  alternates: {
    canonical: "/blog",
    languages: {
      sr: "/blog",
      en: "/en/blog",
      "x-default": "/blog",
    },
  },
  openGraph: {
    title: "Blog | Letkasni.rs",
    description:
      "Praktični vodiči o avio-odšteti, pravima putnika i proveri slučaja posle kašnjenja ili otkazivanja leta.",
    type: "website",
    locale: "sr_RS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Letkasni.rs",
    description:
      "Praktični vodiči o avio-odšteti, pravima putnika i proveri slučaja posle kašnjenja ili otkazivanja leta.",
  },
};

type BlogPageProps = {
  searchParams?: Promise<{
    tema?: string | string[];
  }>;
};

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
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

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  return <BlogIndexPage locale="sr" variant="a" category={typeof params?.tema === "string" ? params.tema : undefined} />;
}
