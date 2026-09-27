import type { Metadata } from "next";

import { LkFrame } from "@/components/lk-v2/lk-page";
import { LkContactContent } from "@/components/lk-v2/lk-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { lkPageMetadata } from "@/lib/lk-page-metadata";

// Strana iz nove verzije sajta (v2 iz transport-local), SR i EN u paru.
export const metadata: Metadata = lkPageMetadata({
  locale: "en",
  title: "Contact | Letkasni.rs",
  description: "Contact Letkasni.rs: email, phone and company details. To check a specific flight, you can start your claim right away.",
  path: "/en/contact",
  alternatePath: "/kontakt",
});

export default function Page() {
  return (
    <LkFrame locale="en" kind="lk-content-page">
      <SiteHeader locale="en" alternateHref="/kontakt" />
      <main id="main">
        <LkContactContent locale="en" />
      </main>
      <SiteFooter locale="en" />
    </LkFrame>
  );
}
