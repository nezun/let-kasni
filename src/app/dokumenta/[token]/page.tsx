import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

import { OtpremanjeDokumenata } from "@/components/dokumenta/otpremanje-dokumenata";
import { proveriTokenDokumenata } from "@/lib/pipeline/token";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Slanje dokumenata | letkasni.rs",
  robots: { index: false, follow: false, nocache: true },
};

export default async function DokumentaPage(props: { params: Promise<{ token: string }> }) {
  noStore();
  const { token } = await props.params;

  if (!proveriTokenDokumenata(token)) {
    notFound();
  }

  return <OtpremanjeDokumenata token={token} />;
}
