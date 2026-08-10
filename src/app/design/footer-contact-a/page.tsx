import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Footer kontakt — sa pravougaonicima | letkasni.rs",
  robots: { index: false, follow: false },
};

export default function FooterContactAPage() {
  return (
    <LandingPage
      locale="sr"
      variant="hero-compact"
      testimonialsVariant="a"
      formFieldTone="muted"
      footerContactVariant="rows-brand"
    />
  );
}
