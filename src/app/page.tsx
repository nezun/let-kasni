import type { Metadata } from "next";

import { copy } from "@/components/lk-v2/copy";
import { LkHome } from "@/components/lk-v2/lk-home";
import { LkStickyCheck } from "@/components/lk-v2/lk-motion";
import { LkFrame } from "@/components/lk-v2/lk-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteIdentitySchema } from "@/components/site-identity-schema";

export const metadata: Metadata = {
  title: "Letkasni.rs",
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
      {/* Nova verzija sajta (v2 iz transport-local), 26.09.2026: novi brend i UX, isti URL-ovi. */}
      <LkFrame locale="sr">
        <SiteHeader locale="sr" alternateHref="/en" />
        <main id="main">
          <LkHome locale="sr" />
        </main>
        <SiteFooter locale="sr" />
        <LkStickyCheck t={copy.sr.sticky} />
      </LkFrame>
    </>
  );
}
