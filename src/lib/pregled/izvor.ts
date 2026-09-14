import { readFile } from "node:fs/promises";

import { crmKlijent, jeCrmPodesen } from "@/lib/crm/baza";
import { citajDriveJson } from "@/lib/drive";
import { getEnv } from "@/lib/env";
import { jeIndeksV1, type IndeksV1, type PredmetV1, type SistemV1, type ZadatakV1 } from "@/lib/pregled/types";

export type RezultatIndeksa =
  | { ok: true; indeks: IndeksV1; izvor: "crm" | "drive" | "lokalno" }
  | { ok: false; razlog: string };

const kesTrajanjeMs = { crm: 15_000, ostalo: 60_000 };
let kes: { rezultat: Extract<RezultatIndeksa, { ok: true }>; istice: number } | null = null;

/** Pregled uživo iz CRM baze: red `pregled` računa orkestrator, novi claim-ovi ga dobijaju sa forme. */
async function izCrmBaze(): Promise<IndeksV1> {
  const k = crmKlijent();
  const [predmetiUpit, sistemUpit] = await Promise.all([
    k.from("crm_predmeti").select("ref,status,pregled,azurirano").order("azurirano", { ascending: false }),
    k.from("crm_sistem").select("kljuc,vrednost").in("kljuc", ["zadaci", "sistem"]),
  ]);

  if (predmetiUpit.error) throw new Error(`CRM predmeti: ${predmetiUpit.error.message}`);
  if (sistemUpit.error) throw new Error(`CRM sistem: ${sistemUpit.error.message}`);

  const predmeti = (predmetiUpit.data ?? [])
    .filter((r) => r.pregled && typeof r.pregled === "object")
    .map((r) => r.pregled as PredmetV1);
  const sistem = Object.fromEntries((sistemUpit.data ?? []).map((r) => [r.kljuc, r.vrednost]));
  const otvoreni = predmeti.filter((p) => p.faza !== "zatvoreno");
  const najnovije = (predmetiUpit.data ?? []).map((r) => String(r.azurirano)).sort().at(-1);

  return {
    sema: 1,
    generisano: najnovije ?? new Date().toISOString(),
    izvor: "crm-baza",
    ukupno: {
      predmeta: predmeti.length,
      putnika: predmeti.reduce((a, p) => a + p.putnici.length, 0),
      otvorenih: otvoreni.length,
      ceka_potpis: predmeti.flatMap((p) => p.potpisi).filter((x) => x.stanje === "poslato").length,
      kod_advokata: predmeti.filter((p) => p.faza === "advokat").length,
      procena_eur: otvoreni.reduce((a, p) => a + (p.procena_ukupno_eur ?? 0), 0),
    },
    predmeti: predmeti.sort((a, b) => a.ref.localeCompare(b.ref)),
    zadaci: Array.isArray(sistem.zadaci) ? (sistem.zadaci as ZadatakV1[]) : [],
    sistem: sistem.sistem ? (sistem.sistem as SistemV1) : undefined,
  };
}

/**
 * Učitava indeks predmeta. Redosled izvora:
 * 1. CRM baza (CRM_SUPABASE_URL + CRM_SUPABASE_SERVICE_ROLE_KEY) — uživo.
 * 2. Google Drive (PREGLED_INDEKS_DRIVE_FILE_ID + GOOGLE_DRIVE_* promenljive) — indeks fajl.
 * 3. Lokalni fajl (PREGLED_INDEKS_PATH) — samo za razvoj.
 */
export async function ucitajIndeks(): Promise<RezultatIndeksa> {
  if (kes && kes.istice > Date.now()) {
    return kes.rezultat;
  }

  const driveFileId = getEnv("PREGLED_INDEKS_DRIVE_FILE_ID");
  const lokalnaPutanja = getEnv("PREGLED_INDEKS_PATH");

  try {
    let sirovo: unknown;
    let izvor: "crm" | "drive" | "lokalno";

    if (jeCrmPodesen()) {
      sirovo = await izCrmBaze();
      izvor = "crm";
    } else if (driveFileId) {
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
    kes = { rezultat, istice: Date.now() + (izvor === "crm" ? kesTrajanjeMs.crm : kesTrajanjeMs.ostalo) };
    return rezultat;
  } catch (error) {
    console.error(
      "Pregled predmeta: učitavanje indeksa nije uspelo.",
      error instanceof Error ? error.message : String(error),
    );
    return { ok: false, razlog: "Indeks trenutno nije dostupan." };
  }
}
