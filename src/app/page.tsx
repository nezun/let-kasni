import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";

export const runtime = "edge";
export const preferredRegion = "global";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      sr: "/",
      en: "/en",
      "x-default": "/",
    },
  },
};

export default function Page() {
  return (
    <LandingPage
      locale="sr"
      variant="hero-compact"
      testimonialsVariant="a"
      formFieldTone="muted"
    />
  );
}
