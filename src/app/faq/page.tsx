import type { Metadata } from "next";

import { LkFrame } from "@/components/lk-v2/lk-page";
import { LkFaqContent } from "@/components/lk-v2/lk-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// Strana iz nove verzije sajta (v2 iz transport-local), SR i EN u paru.
export const metadata: Metadata = {
  title: "Česta pitanja | Letkasni.rs",
  description: "Odgovori na česta pitanja o kašnjenju leta, ceni usluge, odbijenim zahtevima i trajanju postupka.",
  alternates: {
    canonical: "/faq",
    languages: { sr: "/faq", en: "/en/faq", "x-default": "/faq" },
  },
};

export default function Page() {
  return (
    <LkFrame locale="sr" kind="lk-content-page">
      <SiteHeader locale="sr" alternateHref="/en/faq" />
      <main id="main">
        <LkFaqContent locale="sr" />
      </main>
      <SiteFooter locale="sr" />
    </LkFrame>
  );
}
