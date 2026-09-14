import { readFile } from "node:fs/promises";

import { getEnv } from "@/lib/env";
import { jeIndeksV1, type IndeksV1 } from "@/lib/pregled/types";

export type RezultatIndeksa =
  | { ok: true; indeks: IndeksV1; izvor: "drive" | "lokalno" }
  | { ok: false; razlog: string };

const kesTrajanjeMs = 60_000;
let kes: { rezultat: Extract<RezultatIndeksa, { ok: true }>; istice: number } | null = null;

async function driveAccessToken() {
  const clientId = getEnv("GOOGLE_DRIVE_CLIENT_ID");
  const clientSecret = getEnv("GOOGLE_DRIVE_CLIENT_SECRET");
  const refreshToken = getEnv("GOOGLE_DRIVE_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Drive pristup nije podešen.");
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  const body = (await response.json().catch(() => ({}))) as { access_token?: string };

  if (!response.ok || !body.access_token) {
    throw new Error(`Google OAuth osvežavanje nije uspelo (${response.status}).`);
  }

  return body.access_token;
}

async function citajSaDrivea(fileId: string) {
  const token = await driveAccessToken();
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`,
    { headers: { authorization: `Bearer ${token}` }, cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Drive je vratio ${response.status} za indeks.`);
  }

  return response.json() as Promise<unknown>;
}

/**
 * Učitava indeks predmeta. Redosled izvora:
 * 1. Google Drive (PREGLED_INDEKS_DRIVE_FILE_ID + GOOGLE_DRIVE_* promenljive) — produkcija.
 * 2. Lokalni fajl (PREGLED_INDEKS_PATH) — samo za razvoj.
 */
export async function ucitajIndeks(): Promise<RezultatIndeksa> {
  if (kes && kes.istice > Date.now()) {
    return kes.rezultat;
  }

  const driveFileId = getEnv("PREGLED_INDEKS_DRIVE_FILE_ID");
  const lokalnaPutanja = getEnv("PREGLED_INDEKS_PATH");

  try {
    let sirovo: unknown;
    let izvor: "drive" | "lokalno";

    if (driveFileId) {
      sirovo = await citajSaDrivea(driveFileId);
      izvor = "drive";
    } else if (lokalnaPutanja && process.env.NODE_ENV !== "production") {
      sirovo = JSON.parse(await readFile(lokalnaPutanja, "utf8"));
      izvor = "lokalno";
    } else {
      return { ok: false, razlog: "Izvor indeksa nije podešen." };
    }

    if (!jeIndeksV1(sirovo)) {
      return { ok: false, razlog: "Indeks nije u očekivanom formatu (šema 1)." };
    }

    const rezultat = { ok: true as const, indeks: sirovo, izvor };
    kes = { rezultat, istice: Date.now() + kesTrajanjeMs };
    return rezultat;
  } catch (error) {
    console.error(
      "Pregled predmeta: učitavanje indeksa nije uspelo.",
      error instanceof Error ? error.message : String(error),
    );
    return { ok: false, razlog: "Indeks trenutno nije dostupan." };
  }
}
