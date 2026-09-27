import type { Metadata } from "next";

import { LkFrame } from "@/components/lk-v2/lk-page";
import { LkDelayedFlightsContent } from "@/components/lk-v2/lk-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getZakasneliLetovi } from "@/lib/delayed-flights";
import { lkPageMetadata } from "@/lib/lk-page-metadata";

// Strana iz nove verzije sajta (v2), SR i EN u paru. Podaci dolaze uživo sa CRM-a (ISR, revalidate 3600) —
// nijedan podatak o letu se ne čuva u repo-u (opis: ~/Documents/Letkasni/marketing/opis-letovi-koji-su-kasnili.md).
export const revalidate = 3600;

export const metadata: Metadata = lkPageMetadata({
  locale: "sr",
  title: "Letovi koji su kasnili ili su otkazani — Beograd | Letkasni.rs",
  description:
    "Spisak letova sa beogradskog aerodroma koji su kasnili 3 sata ili više, ili su otkazani, prema podacima sa zvanične table aerodroma. Proverite da li imate pravo na naknadu.",
  path: "/letovi-koji-su-kasnili",
  alternatePath: "/en/delayed-flights-belgrade",
});

export default async function Page() {
  const data = await getZakasneliLetovi();

  return (
    <LkFrame locale="sr" kind="lk-content-page">
      <SiteHeader locale="sr" alternateHref="/en/delayed-flights-belgrade" />
      <main id="main">
        <LkDelayedFlightsContent locale="sr" data={data} />
      </main>
      <SiteFooter locale="sr" />
    </LkFrame>
  );
}
