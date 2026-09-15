import { NextResponse } from "next/server";

import { jeCrmPodesen } from "@/lib/crm/baza";
import { proveriTokenDokumenata } from "@/lib/pipeline/token";
import { isRateLimited } from "@/lib/rate-limit";
import { potpisiUgovor } from "@/lib/ugovor/potpis-letkasni";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PNG = /^data:image\/png;base64,([A-Za-z0-9+/=]+)$/;

/** Naš elektronski potpis: saglasnost + nacrtan potpis (PNG) za jednog putnika. */
export async function POST(request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const pristup = proveriTokenDokumenata(token);
  if (!pristup || !jeCrmPodesen()) return NextResponse.json({ ok: false, error: "link_nevazeci" }, { status: 404 });
  if (isRateLimited(`portal-potpisi:${pristup.ref}`, { windowMs: 10 * 60_000, maxHits: 15 })) {
    return NextResponse.json({ ok: false, error: "previse_zahteva" }, { status: 429 });
  }

  const telo = (await request.json().catch(() => null)) as { putnik?: unknown; potpis?: unknown; saglasnost?: unknown } | null;
  const putnik = typeof telo?.putnik === "string" ? telo.putnik : "";
  const potpis = typeof telo?.potpis === "string" ? telo.potpis : "";
  if (telo?.saglasnost !== true) return NextResponse.json({ ok: false, error: "saglasnost" }, { status: 400 });
  const b64 = potpis.match(PNG)?.[1];
  const bajtova = b64 ? Math.floor((b64.length * 3) / 4) : 0;
  // PNG potpis: bar malo linija (prazan kanvas je ~1 KB), najviše 600 KB
  if (!putnik || !b64 || bajtova < 1200 || bajtova > 600_000 || !Buffer.from(b64, "base64").subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return NextResponse.json({ ok: false, error: "potpis" }, { status: 400 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "nepoznata").split(",")[0]?.trim() || "nepoznata";
  const userAgent = (request.headers.get("user-agent") ?? "nepoznat").slice(0, 400);

  try {
    const rez = await potpisiUgovor({ ref: pristup.ref, putnik, potpisPng: potpis, ip, userAgent });
    if (!rez.ok) {
      console.error("Portal: potpis nije prihvaćen.", JSON.stringify({ ref: pristup.ref, razlog: rez.razlog, poruka: rez.poruka }));
      const status = rez.razlog === "nema" ? 404 : rez.razlog === "vec_potpisano" || rez.razlog === "podaci_promenjeni" ? 409 : 502;
      return NextResponse.json({ ok: false, error: rez.razlog }, { status });
    }
    console.info("Portal: ugovor potpisan.", JSON.stringify({ ref: pristup.ref, sviPotpisali: rez.sviPotpisali }));
    return NextResponse.json({ ok: true, sviPotpisali: rez.sviPotpisali });
  } catch (error) {
    console.error("Portal: potpis pao.", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ ok: false, error: "greska" }, { status: 500 });
  }
}
