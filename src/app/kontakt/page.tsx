import type { Metadata } from "next";

import { LkFrame } from "@/components/lk-v2/lk-page";
import { LkContactContent } from "@/components/lk-v2/lk-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { lkPageMetadata } from "@/lib/lk-page-metadata";

// Strana iz nove verzije sajta (v2 iz transport-local), SR i EN u paru.
export const metadata: Metadata = lkPageMetadata({
  locale: "sr",
  title: "Kontakt | Letkasni.rs",
  description: "Kontakt Letkasni.rs: e-mail, telefon i podaci o kompaniji. Za proveru konkretnog leta možete odmah započeti prijavu.",
  path: "/kontakt",
  alternatePath: "/en/contact",
});

export default function Page() {
  return (
    <LkFrame locale="sr" kind="lk-content-page">
      <SiteHeader locale="sr" alternateHref="/en/contact" />
      <main id="main">
        <LkContactContent locale="sr" />
      </main>
      <SiteFooter locale="sr" />
    </LkFrame>
  );
}
