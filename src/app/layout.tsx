import type { Metadata } from "next";
import { headers } from "next/headers";
import { DM_Sans, JetBrains_Mono, Sora } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { ConsentBanner } from "@/components/consent-banner";
import { MetaPixel } from "@/components/meta-pixel";
import { getSiteUrl } from "@/lib/site-url";
import {
  getSocialPreviewImageUrl,
  socialPreview,
} from "@/lib/social-preview";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const preferredRegion = "fra1";

const srSocial = socialPreview.sr;
const srSocialImage = getSocialPreviewImageUrl("sr");

export const metadata: Metadata = {
  title: srSocial.title,
  description: srSocial.description,
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: srSocial.title,
    description: srSocial.description,
    type: "website",
    url: "/",
    siteName: "letkasni.rs",
    locale: "sr_RS",
    alternateLocale: ["en_US"],
    images: [
      {
        url: srSocialImage,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: srSocial.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: srSocial.title,
    description: srSocial.description,
    images: [srSocialImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-site-locale") === "en" ? "en" : "sr";

  return (
    <html
      lang={locale}
      className={`${sora.variable} ${dmSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Analytics />
        <MetaPixel />
        <ConsentBanner locale={locale} />
        {children}
      </body>
    </html>
  );
}
