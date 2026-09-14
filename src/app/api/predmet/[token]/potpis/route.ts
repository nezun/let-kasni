import { NextResponse } from "next/server";

import { jeCrmPodesen } from "@/lib/crm/baza";
import { potpisZaPutnika } from "@/lib/crm/portal";
import { proveriTokenDokumenata } from "@/lib/pipeline/token";
import { jeSignNowPodesen, linkZaPotpis } from "@/lib/potpis/signnow";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Svež link za potpis u signNow-u (važi do 45 min), pravi se tek kad klijent klikne „Potpiši“. */
export async function POST(request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const pristup = proveriTokenDokumenata(token);

  if (!pristup || !jeCrmPodesen()) {
    return NextResponse.json({ ok: false, error: "link_nevazeci" }, { status: 404 });
  }
  if (!jeSignNowPodesen()) {
    return NextResponse.json({ ok: false, error: "nije_podeseno" }, { status: 503 });
  }
  if (isRateLimited(`portal-potpis:${pristup.ref}`, { windowMs: 10 * 60_000, maxHits: 20 })) {
    return NextResponse.json({ ok: false, error: "previse_zahteva" }, { status: 429 });
  }

  const telo = (await request.json().catch(() => null)) as { putnik?: unknown } | null;
  const putnik = typeof telo?.putnik === "string" ? telo.putnik : "";
  const zahtev = putnik ? await potpisZaPutnika(pristup.ref, putnik) : null;

  if (!zahtev) {
    return NextResponse.json({ ok: false, error: "nema_potpisa" }, { status: 404 });
  }

  try {
    const url = await linkZaPotpis(zahtev.dokumentId, zahtev.zahtevId);
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    console.error("Portal: link za potpis nije napravljen.", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ ok: false, error: "signnow" }, { status: 502 });
  }
}
