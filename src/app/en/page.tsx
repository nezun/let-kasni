import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";
import {
  getSocialPreviewImageUrl,
  socialPreview,
} from "@/lib/social-preview";

const enSocial = socialPreview.en;
const enSocialImage = getSocialPreviewImageUrl("en");

export const metadata: Metadata = {
  title: "letkasni.rs",
  description: enSocial.description,
  alternates: {
    canonical: "/en",
    languages: {
      sr: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: enSocial.title,
    description: enSocial.description,
    type: "website",
    url: "/en",
    siteName: "letkasni.rs",
    locale: "en_US",
    alternateLocale: ["sr_RS"],
    images: [
      {
        url: enSocialImage,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: enSocial.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: enSocial.title,
    description: enSocial.description,
    images: [enSocialImage],
  },
};

export default function EnglishPage() {
  return (
    <LandingPage
      locale="en"
      variant="hero-compact"
      testimonialsVariant="a"
      formFieldTone="muted"
      heroFlightPath
      heroFlightPathVariant="with-visual"
      ctaFlightPath
      heroTextColorVariant="body-and-proof-white"
    />
  );
}
