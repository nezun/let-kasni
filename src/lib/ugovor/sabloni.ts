import { citajDriveBin, driveNadjiFajl, jeDrivePodesen } from "@/lib/drive";
import { getEnv } from "@/lib/env";

import type { SabloniUgovora } from "./docx";

/**
 * Šabloni ugovora i potpis direktorke sa Drive-a („LetKasni — sistem/sabloni“).
 * Repo je javan, pa ne smeju u njega; u memoriji se drže do sat vremena, da svaki
 * klijent ne povlači isto sa Drive-a.
 */
const FAJLOVI = { odrasli: "ugovor-odrasli.docx", maloletni: "ugovor-maloletni.docx", potpis: "vedrana-zunic.png" } as const;
const TRAJANJE_MS = 60 * 60_000;

let kes: { sabloni: SabloniUgovora; istice: number } | null = null;

export function jeUgovorPodesen() {
  return Boolean(jeDrivePodesen() && getEnv("UGOVOR_SABLONI_DRIVE_FOLDER_ID"));
}

export async function ucitajSablone(): Promise<SabloniUgovora> {
  if (kes && kes.istice > Date.now()) return kes.sabloni;

  const folder = getEnv("UGOVOR_SABLONI_DRIVE_FOLDER_ID");
  if (!folder) throw new Error("UGOVOR_SABLONI_DRIVE_FOLDER_ID nije podešen.");

  const delovi = await Promise.all(
    (Object.entries(FAJLOVI) as Array<[keyof typeof FAJLOVI, string]>).map(async ([kljuc, ime]) => {
      const id = await driveNadjiFajl(folder, ime);
      if (!id) throw new Error(`nema ${ime} u folderu šablona`);
      return [kljuc, await citajDriveBin(id)] as const;
    }),
  );

  const sabloni = Object.fromEntries(delovi) as unknown as SabloniUgovora;
  kes = { sabloni, istice: Date.now() + TRAJANJE_MS };
  return sabloni;
}
