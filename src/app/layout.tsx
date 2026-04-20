import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "letkasni.rs | Provera avio odštete",
  description:
    "Claims handoff servis za putnike iz Srbije. Pošaljite podatke o letu i dobijte konzervativnu procenu sledećeg koraka.",
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: "letkasni.rs | Provera avio odštete",
    description:
      "Pošaljite osnovne podatke o letu i dobijte konzervativnu procenu sledećeg koraka za EU 261 / ECAA claim.",
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
      "Claims handoff servis za putnike iz Srbije sa konzervativnom procenom i ručnim follow-up-om.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
