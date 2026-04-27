import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "letkasni.rs | Flight compensation check",
  description:
    "Enter your flight details and get an initial check on whether your case is worth reviewing further under EU 261 / ECAA.",
  alternates: {
    canonical: "/en",
    languages: {
      sr: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "letkasni.rs | Flight compensation check",
    description:
      "Enter your flight details and get an initial check on whether your case is worth reviewing further under EU 261 / ECAA.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "letkasni.rs - flight compensation check",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "letkasni.rs | Flight compensation check",
    description:
      "Initial flight-compensation review for passengers connected to Serbia, with a clear next step and no upfront fee.",
    images: ["/twitter-image"],
  },
};

export default function EnglishPage() {
  return <LandingPage locale="en" variant="hero-compact" />;
}
