import type { Metadata } from "next";

import { LkFrame } from "@/components/lk-v2/lk-page";
import { LkAboutContent } from "@/components/lk-v2/lk-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// Strana iz nove verzije sajta (v2 iz transport-local), SR i EN u paru.
export const metadata: Metadata = {
  title: "O nama | Letkasni.rs",
  description: "Letkasni.rs pomaže putnicima sa letovima do i iz Srbije da provere mogućnost naknade i pripreme svoj predmet.",
  alternates: {
    canonical: "/o-nama",
    languages: { sr: "/o-nama", en: "/en/about", "x-default": "/o-nama" },
  },
};

export default function Page() {
  return (
    <LkFrame locale="sr" kind="lk-content-page">
      <SiteHeader locale="sr" alternateHref="/en/about" />
      <main id="main">
        <LkAboutContent locale="sr" />
      </main>
      <SiteFooter locale="sr" />
    </LkFrame>
  );
}
