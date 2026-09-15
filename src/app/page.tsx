import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";
import { SiteIdentitySchema } from "@/components/site-identity-schema";

export const metadata: Metadata = {
  title: "letkasni.rs",
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
    <>
      <SiteIdentitySchema />
      <LandingPage
        locale="sr"
        variant="hero-compact"
        testimonialsVariant="a"
        formFieldTone="muted"
        heroFlightPath
        heroFlightPathVariant="with-visual"
        ctaFlightPath
        heroTextColorVariant="body-and-proof-white"
      />
    </>
  );
}
