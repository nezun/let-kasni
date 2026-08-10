import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Footer kontakt — bez pravougaonika | letkasni.rs",
  robots: { index: false, follow: false },
};

export default function FooterContactBPage() {
  return (
    <LandingPage
      locale="sr"
      variant="hero-compact"
      testimonialsVariant="a"
      formFieldTone="muted"
      footerContactVariant="rows-brand-flat"
    />
  );
}
