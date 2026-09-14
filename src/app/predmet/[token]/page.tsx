import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

import { PortalPredmeta } from "@/components/predmet/portal-predmeta";
import { jeCrmPodesen } from "@/lib/crm/baza";
import { ucitajPredmetPortala } from "@/lib/crm/portal";
import { proveriTokenDokumenata } from "@/lib/pipeline/token";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vaš predmet | letkasni.rs",
  robots: { index: false, follow: false, nocache: true },
};

export default async function PredmetPage(props: { params: Promise<{ token: string }> }) {
  noStore();
  const { token } = await props.params;
  const pristup = proveriTokenDokumenata(token);

  if (!pristup || !jeCrmPodesen()) {
    notFound();
  }

  const predmet = await ucitajPredmetPortala(pristup.ref).catch((error) => {
    console.error("Portal: učitavanje predmeta nije uspelo.", error instanceof Error ? error.message : String(error));
    return null;
  });

  if (!predmet) {
    notFound();
  }

  return <PortalPredmeta token={token} predmet={predmet} />;
}
