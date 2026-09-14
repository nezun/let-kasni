import { NextResponse } from "next/server";

import { jeCrmPodesen } from "@/lib/crm/baza";
import { sacuvajPodatkePortala, type PutnikPortala } from "@/lib/crm/portal";
import { proveriTokenDokumenata } from "@/lib/pipeline/token";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const imeOblik = /^[\p{L}][\p{L} .'-]{1,78}[\p{L}.]$/u;

function godine(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  const s = new Date();
  let g = s.getUTCFullYear() - d.getUTCFullYear();
  if (s.getUTCMonth() < d.getUTCMonth() || (s.getUTCMonth() === d.getUTCMonth() && s.getUTCDate() < d.getUTCDate())) g--;
  return g;
}

function proveri(telo: unknown): { putnici: PutnikPortala[] } | { greska: string } {
  const t = telo as { putnici?: unknown; saglasnost?: unknown } | null;
  if (!t || !Array.isArray(t.putnici) || t.putnici.length < 1 || t.putnici.length > 9) return { greska: "putnici" };
  if (t.saglasnost !== true) return { greska: "saglasnost" };

  const putnici: PutnikPortala[] = [];
  for (const [i, sirovo] of t.putnici.entries()) {
    const p = sirovo as Record<string, unknown>;
    const ime = typeof p.ime_prezime === "string" ? p.ime_prezime.trim().replace(/\s+/g, " ") : "";
    const rodjena = typeof p.rodjena === "string" ? p.rodjena.trim() : "";
    const adresa = typeof p.adresa === "string" ? p.adresa.trim().replace(/\s+/g, " ") : "";
    const zastupnik = typeof p.zakonski_zastupnik === "string" ? p.zakonski_zastupnik.trim().replace(/\s+/g, " ") : "";

    if (!imeOblik.test(ime) || ime.split(" ").length < 2) return { greska: `ime_${i}` };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(rodjena) || Number.isNaN(Date.parse(rodjena)) || rodjena < "1900-01-01" || new Date(rodjena) > new Date()) return { greska: `rodjena_${i}` };
    if (adresa.length < 5 || adresa.length > 160) return { greska: `adresa_${i}` };
    const maloletan = godine(rodjena) < 18;
    if (maloletan && (!imeOblik.test(zastupnik) || zastupnik.split(" ").length < 2)) return { greska: `zastupnik_${i}` };

    putnici.push({ ime_prezime: ime, rodjena, adresa, maloletan, zakonski_zastupnik: maloletan ? zastupnik : null });
  }
  if (putnici[0].maloletan) return { greska: "prvi_maloletan" };
  return { putnici };
}

export async function POST(request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const pristup = proveriTokenDokumenata(token);

  if (!pristup || !jeCrmPodesen()) {
    return NextResponse.json({ ok: false, error: "link_nevazeci" }, { status: 404 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`portal-podaci:${pristup.ref}`, { windowMs: 10 * 60_000, maxHits: 10 })) {
    return NextResponse.json({ ok: false, error: "previse_zahteva" }, { status: 429 });
  }

  const provera = proveri(await request.json().catch(() => null));
  if ("greska" in provera) {
    return NextResponse.json({ ok: false, error: provera.greska }, { status: 400 });
  }

  const rezultat = await sacuvajPodatkePortala(pristup.ref, provera.putnici, { ip, userAgent: request.headers.get("user-agent") ?? "" });

  if (!rezultat.ok) {
    if (rezultat.razlog === "greska") console.error("Portal: upis podataka nije uspeo.", rezultat.poruka);
    const status = rezultat.razlog === "nema" ? 404 : rezultat.razlog === "zakljucano" ? 409 : rezultat.razlog === "konflikt" ? 409 : 502;
    return NextResponse.json({ ok: false, error: rezultat.razlog }, { status });
  }

  console.info("Portal: podaci putnika primljeni.", JSON.stringify({ ref: pristup.ref, putnika: provera.putnici.length }));
  return NextResponse.json({ ok: true });
}
