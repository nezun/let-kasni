import type { Metadata } from "next";

import { getSocialPreviewImageUrl, socialPreview } from "@/lib/social-preview";

/**
 * Metadata strana koje dodaje nova verzija sajta (Kontakt, O nama, Česta pitanja): naslov, opis, kanonski URL,
 * hreflang i sopstveni Open Graph (bez njega bi strana nasledila og:url i naslov početne iz layout.tsx).
 */
export function lkPageMetadata({
  locale,
  title,
  description,
  path,
  alternatePath,
}: {
  locale: "sr" | "en";
  title: string;
  description: string;
  path: string;
  alternatePath: string;
}): Metadata {
  const sr = locale === "sr" ? path : alternatePath;
  const en = locale === "en" ? path : alternatePath;
  const image = getSocialPreviewImageUrl(locale);

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { sr, en, "x-default": sr },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
      siteName: "Letkasni.rs",
      locale: locale === "en" ? "en_US" : "sr_RS",
      alternateLocale: [locale === "en" ? "sr_RS" : "en_US"],
      images: [{ url: image, width: 1200, height: 630, type: "image/png", alt: socialPreview[locale].imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
