import { timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

import { getEnv } from "@/lib/env";
import { ugovorHtml } from "@/lib/ugovor/docx";
import { htmlUPdf } from "@/lib/ugovor/pdf";
import { ucitajSablone } from "@/lib/ugovor/sabloni";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Provera da server sam pravi PDF ugovora (Chromium u funkciji, šabloni sa Drive-a), za izmišljenog putnika.
 * Ništa ne upisuje. Pristup: Authorization: Bearer <SISTEM_KLJUC>.
 */
export async function POST(request: Request) {
  const kljuc = getEnv("SISTEM_KLJUC");
  const dobijeno = (request.headers.get("authorization") ?? "").replace(
    /^Bearer\s+/i,
    "",
  );
  if (
    !kljuc ||
    kljuc.length < 32 ||
    dobijeno.length !== kljuc.length ||
    !timingSafeEqual(Buffer.from(dobijeno), Buffer.from(kljuc))
  ) {
    return NextResponse.json(
      { ok: false, error: "zabranjeno" },
      { status: 401 },
    );
  }
  const t0 = Date.now();
  try {
    const sabloni = await ucitajSablone();
    const pdf = await htmlUPdf(
      await ugovorHtml(
        {
          ime_prezime: "Petar Probić",
          rodjena: "1985-04-12",
          adresa: "Bulevar kralja Aleksandra 73, 11000 Beograd",
          maloletan: false,
          zakonski_zastupnik: null,
          claim_id: "PROBA-01",
        },
        {
          broj: "JU 557",
          datum: "2026-08-31",
          prevozilac: "Air Serbia",
          od: "BEG",
          do: "HER",
        },
        sabloni,
      ),
    );
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "content-type": "application/pdf",
        "x-trajanje-ms": String(Date.now() - t0),
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    // zaštićena adresa (SISTEM_KLJUC): poruka greške je za dijagnostiku
    const poruka =
      error instanceof Error
        ? `${error.message}\n${error.stack ?? ""}`
        : String(error);
    console.error("Proba PDF pala.", poruka);
    return NextResponse.json(
      { ok: false, error: poruka.slice(0, 2000), trajanje_ms: Date.now() - t0 },
      { status: 500 },
    );
  }
}
