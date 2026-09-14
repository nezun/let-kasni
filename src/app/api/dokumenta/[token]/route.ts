import { NextResponse } from "next/server";

import { driveFolder, driveUpisiFajl, jeDrivePodesen } from "@/lib/drive";
import { getEnv } from "@/lib/env";
import { proveriTokenDokumenata } from "@/lib/pipeline/token";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Vercel funkcija prima najviše ~4,5 MB; veće slike klijent smanjuje pre slanja.
const maxBajtova = 4 * 1024 * 1024;

/** Tip se određuje po sadržaju fajla, ne po imenu ni po onome što browser prijavi. */
function vrstaPoSadrzaju(b: Uint8Array): { mime: string; ekstenzija: string } | null {
  const ascii = (od: number, doIndeksa: number) => String.fromCharCode(...b.subarray(od, doIndeksa));

  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { mime: "image/jpeg", ekstenzija: "jpg" };
  if (b[0] === 0x89 && ascii(1, 4) === "PNG") return { mime: "image/png", ekstenzija: "png" };
  if (ascii(0, 5) === "%PDF-") return { mime: "application/pdf", ekstenzija: "pdf" };
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return { mime: "image/webp", ekstenzija: "webp" };
  if (ascii(4, 8) === "ftyp" && /^(heic|heix|hevc|mif1|msf1)$/.test(ascii(8, 12))) return { mime: "image/heic", ekstenzija: "heic" };
  return null;
}

function bezbednoIme(ime: string) {
  return ime
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .replace(/[^\w\- ]+/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 60);
}

export async function POST(request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const pristup = proveriTokenDokumenata(token);

  if (!pristup) {
    return NextResponse.json({ ok: false, error: "link_nevazeci" }, { status: 404 });
  }

  const folderId = getEnv("PIPELINE_DRIVE_FOLDER_ID");

  if (!folderId || !jeDrivePodesen()) {
    return NextResponse.json({ ok: false, error: "nije_podeseno" }, { status: 503 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0]?.trim() || "unknown";

  if (
    isRateLimited(`dokumenta-ip:${ip}`, { windowMs: 10 * 60_000, maxHits: 30 }) ||
    isRateLimited(`dokumenta-ref:${pristup.ref}`, { windowMs: 60 * 60_000, maxHits: 40 })
  ) {
    return NextResponse.json({ ok: false, error: "previse_zahteva" }, { status: 429 });
  }

  const forma = await request.formData().catch(() => null);
  const fajl = forma?.get("fajl");

  if (!(fajl instanceof File)) {
    return NextResponse.json({ ok: false, error: "nema_fajla" }, { status: 400 });
  }

  if (fajl.size === 0 || fajl.size > maxBajtova) {
    return NextResponse.json({ ok: false, error: "prevelik" }, { status: 413 });
  }

  const bajtovi = new Uint8Array(await fajl.arrayBuffer());
  const vrsta = vrstaPoSadrzaju(bajtovi);

  if (!vrsta) {
    return NextResponse.json({ ok: false, error: "tip" }, { status: 415 });
  }

  try {
    const uploadsId = await driveFolder("uploads", folderId);
    const predmetId = await driveFolder(pristup.ref, uploadsId);
    const ime = `${new Date().toISOString().replace(/[:.]/g, "-")}_${bezbednoIme(fajl.name) || "dokument"}.${vrsta.ekstenzija}`;
    await driveUpisiFajl(predmetId, ime, bajtovi, vrsta.mime);
    console.info("Dokumenta: fajl primljen.", JSON.stringify({ ref: pristup.ref, mime: vrsta.mime, bajtova: fajl.size }));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Dokumenta: upis na Drive nije uspeo.", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ ok: false, error: "drive" }, { status: 502 });
  }
}
