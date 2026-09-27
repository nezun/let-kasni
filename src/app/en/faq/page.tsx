import type { Metadata } from "next";

import { LkFrame } from "@/components/lk-v2/lk-page";
import { LkFaqContent } from "@/components/lk-v2/lk-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { lkPageMetadata } from "@/lib/lk-page-metadata";

// Strana iz nove verzije sajta (v2 iz transport-local), SR i EN u paru.
export const metadata: Metadata = lkPageMetadata({
  locale: "en",
  title: "Frequently asked questions | Letkasni.rs",
  description: "Answers to frequent questions about flight delays, the cost of the service, rejected claims and how long the process takes.",
  path: "/en/faq",
  alternatePath: "/faq",
});

export default function Page() {
  return (
    <LkFrame locale="en" kind="lk-content-page">
      <SiteHeader locale="en" alternateHref="/faq" />
      <main id="main">
        <LkFaqContent locale="en" />
      </main>
      <SiteFooter locale="en" />
    </LkFrame>
  );
}
