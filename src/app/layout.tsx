import type { Metadata } from "next";
import { headers } from "next/headers";
import { DM_Sans, JetBrains_Mono, Sora } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { getSiteUrl } from "@/lib/site-url";
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
});

export const metadata: Metadata = {
  title: "letkasni.rs | Provera avio odštete",
  description:
    "Pošaljite podatke o letu i dobijte početnu procenu da li vaš slučaj vredi dalje proveravati po EU 261 / ECAA okviru.",
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: "letkasni.rs | Provera avio odštete",
    description:
      "Pošaljite osnovne podatke o letu i dobijte početnu procenu sledećeg koraka za moguću avio odštetu.",
    type: "website",
    locale: "sr_RS",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "letkasni.rs - provera avio odštete",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "letkasni.rs | Provera avio odštete",
    description:
      "Početna procena moguće avio odštete za putnike iz Srbije, uz jasan sledeći korak i bez praznih obećanja.",
    images: ["/twitter-image"],
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
        {children}
      </body>
    </html>
  );
}
