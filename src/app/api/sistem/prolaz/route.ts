import { timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

import { jeCrmPodesen } from "@/lib/crm/baza";
import { getEnv } from "@/lib/env";
import { ucitajKonfig } from "@/lib/sistem/konfig";
import { napraviServise } from "@/lib/sistem/pravi";
import { pokreniProlaz } from "@/lib/sistem/prolaz";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * Serverski prolaz LetKasni sistema. Zovu ga Supabase raspored (pg_cron, na sat) i Nikov Mac posle agenta.
 * Pristup: Authorization: Bearer <SISTEM_KLJUC>. `?suvo=1` samo prikaže šta bi uradio, ništa ne menja.
 */
function dozvoljen(request: Request) {
  const kljuc = getEnv("SISTEM_KLJUC");
  const dobijeno = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!kljuc || kljuc.length < 32 || dobijeno.length !== kljuc.length) return false;
  return timingSafeEqual(Buffer.from(dobijeno), Buffer.from(kljuc));
}

export async function POST(request: Request) {
  if (!dozvoljen(request)) {
    return NextResponse.json({ ok: false, error: "zabranjeno" }, { status: 401 });
  }
  if (!jeCrmPodesen()) {
    return NextResponse.json({ ok: false, error: "crm_nije_podesen" }, { status: 503 });
  }
  const telo = (await request.json().catch(() => ({}))) as { izvor?: unknown };
  const suvo = new URL(request.url).searchParams.get("suvo") === "1";
  const konfig = ucitajKonfig();

  try {
    const rez = await pokreniProlaz(konfig, napraviServise(konfig), { suvo, izvor: typeof telo.izvor === "string" ? telo.izvor.slice(0, 20) : "rucno" });
    if (!rez.ok) return NextResponse.json(rez, { status: 409 });
    console.info("Sistem: prolaz završen.", JSON.stringify({ okruzenje: rez.okruzenje, trajanje_ms: rez.trajanje_ms, predmeta: rez.predmeta, greske: rez.greske, agenti_cekaju: rez.agenti_cekaju }));
    return NextResponse.json(rez);
  } catch (error) {
    console.error("Sistem: prolaz pao.", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ ok: false, error: "prolaz_pao" }, { status: 500 });
  }
}
