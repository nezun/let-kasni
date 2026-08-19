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
      suppressHydrationWarning
    >
      <head>
        <script
          id="lk-consent-bootstrap"
          dangerouslySetInnerHTML={{
            __html: `(()=>{try{const readCookie=()=>document.cookie.split(";").map((part)=>part.trim()).find((part)=>part.startsWith("lk_consent="))?.slice("lk_consent=".length);const valid=(value)=>{if(!value)return false;try{const decoded=decodeURIComponent(value);if(decoded==="granted"||decoded==="denied")return true;const parsed=JSON.parse(decoded);return parsed?.v===2&&typeof parsed.analytics==="boolean"&&typeof parsed.marketing==="boolean";}catch(_){return false;}};const cookieValue=readCookie();if(valid(cookieValue)){document.documentElement.dataset.consent="1";return;}const raw=window.localStorage.getItem("letkasni-tracking-consent-v1");if(valid(raw)){document.cookie="lk_consent="+encodeURIComponent(raw)+"; Max-Age=31536000; Path=/; SameSite=Lax; Secure";document.documentElement.dataset.consent="1";}}catch(_){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Analytics />
        <MetaPixel />
        <ConsentBanner locale={locale} />
        {children}
      </body>
    </html>
  );
}
