import type { Metadata } from "next";

import { copy } from "@/components/lk-v2/copy";
import { LkHome } from "@/components/lk-v2/lk-home";
import { LkStickyCheck } from "@/components/lk-v2/lk-motion";
import { LkFrame } from "@/components/lk-v2/lk-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteIdentitySchema } from "@/components/site-identity-schema";
import {
  getSocialPreviewImageUrl,
  socialPreview,
} from "@/lib/social-preview";

const enSocial = socialPreview.en;
const enSocialImage = getSocialPreviewImageUrl("en");

export const metadata: Metadata = {
  title: "Letkasni.rs",
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
    <>
      <SiteIdentitySchema />
      {/* Nova verzija sajta (v2 iz transport-local), 26.09.2026: novi brend i UX, isti URL-ovi. */}
      <LkFrame locale="en">
        <SiteHeader locale="en" alternateHref="/" />
        <main id="main">
          <LkHome locale="en" />
        </main>
        <SiteFooter locale="en" />
        <LkStickyCheck t={copy.en.sticky} />
      </LkFrame>
    </>
  );
}
