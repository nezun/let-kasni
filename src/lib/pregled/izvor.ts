import { readFile } from "node:fs/promises";

import { citajDriveJson } from "@/lib/drive";
import { getEnv } from "@/lib/env";
import { jeIndeksV1, type IndeksV1 } from "@/lib/pregled/types";

export type RezultatIndeksa =
  | { ok: true; indeks: IndeksV1; izvor: "drive" | "lokalno" }
  | { ok: false; razlog: string };

const kesTrajanjeMs = 60_000;
let kes: { rezultat: Extract<RezultatIndeksa, { ok: true }>; istice: number } | null = null;

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
      sirovo = await citajDriveJson(driveFileId);
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
