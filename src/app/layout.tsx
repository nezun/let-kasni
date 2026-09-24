import type { Metadata } from "next";
import { headers } from "next/headers";
import { DM_Sans, JetBrains_Mono, Sora } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { analyticsPublicPaths } from "@/lib/analytics-public-paths";
import { ConsentBanner } from "@/components/consent-banner";
import { MetaPixel } from "@/components/meta-pixel";
import { GoogleMeasurement } from "@/components/google-measurement";
import { trackingConsentNoticeVersion } from "@/lib/consent-cookie";
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
      // globals.css ima scroll-behavior: smooth (sidra na istoj strani); ovim Next pri prelasku na drugu
      // stranu privremeno gasi glatko skrolovanje, pa nova strana kreće od vrha umesto da klizi odozdo
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          id="lk-consent-bootstrap"
          dangerouslySetInnerHTML={{
            __html: `(()=>{window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});window.gtag('set','ads_data_redaction',true);try{const optionalTrackingAllowed=location.pathname!=="/admin"&&!location.pathname.startsWith("/admin/");const readCookie=()=>document.cookie.split(";").map((part)=>part.trim()).find((part)=>part.startsWith("lk_consent="))?.slice("lk_consent=".length);const parse=(value)=>{if(!value)return null;try{const parsed=JSON.parse(decodeURIComponent(value));return parsed?.v===3&&parsed.notice===${JSON.stringify(trackingConsentNoticeVersion)}&&typeof parsed.analytics==="boolean"&&typeof parsed.marketing==="boolean"&&typeof parsed.ts==="number"&&parsed.ts>0?parsed:null;}catch(_){return null;}};const consent=optionalTrackingAllowed?parse(readCookie()):null;if(consent){document.documentElement.dataset.consent="1";window.gtag('consent','update',{analytics_storage:consent.analytics?'granted':'denied',ad_storage:consent.marketing?'granted':'denied',ad_user_data:consent.marketing?'granted':'denied',ad_personalization:consent.marketing?'granted':'denied'});}}catch(_){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Analytics publicPaths={analyticsPublicPaths} />
        <GoogleMeasurement />
        <MetaPixel />
        <ConsentBanner locale={locale} />
        {children}
      </body>
    </html>
  );
}
