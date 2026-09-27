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
  locale: "en",
  title: "Delayed or Cancelled Flights — Belgrade | Letkasni.rs",
  description:
    "Flights at Belgrade Airport that were delayed 3 hours or more, or cancelled, based on the airport's official board. Check whether you're entitled to compensation.",
  path: "/en/delayed-flights-belgrade",
  alternatePath: "/letovi-koji-su-kasnili",
});

export default async function Page() {
  const data = await getZakasneliLetovi();

  return (
    <LkFrame locale="en" kind="lk-content-page">
      <SiteHeader locale="en" alternateHref="/letovi-koji-su-kasnili" />
      <main id="main">
        <LkDelayedFlightsContent locale="en" data={data} />
      </main>
      <SiteFooter locale="en" />
    </LkFrame>
  );
}
