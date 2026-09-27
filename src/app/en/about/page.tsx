import type { Metadata } from "next";

import { LkFrame } from "@/components/lk-v2/lk-page";
import { LkAboutContent } from "@/components/lk-v2/lk-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// Strana iz nove verzije sajta (v2 iz transport-local), SR i EN u paru.
export const metadata: Metadata = {
  title: "About us | Letkasni.rs",
  description: "Letkasni.rs helps passengers flying to and from Serbia check whether they can claim compensation and prepare their case.",
  alternates: {
    canonical: "/en/about",
    languages: { sr: "/o-nama", en: "/en/about", "x-default": "/o-nama" },
  },
};

export default function Page() {
  return (
    <LkFrame locale="en" kind="lk-content-page">
      <SiteHeader locale="en" alternateHref="/o-nama" />
      <main id="main">
        <LkAboutContent locale="en" />
      </main>
      <SiteFooter locale="en" />
    </LkFrame>
  );
}
