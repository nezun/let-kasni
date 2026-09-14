import { createHash, timingSafeEqual } from "node:crypto";

import { getEnv } from "@/lib/env";

export type UlogaPregleda = "tim" | "advokati";

const minimalnaDuzinaKljuca = 24;

function jednako(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/**
 * Pristup pregledu je preko linka sa ključem: /pregled/<ključ>.
 * PREGLED_KLJUCEVI="tim:<ključ>,advokati:<ključ>" — posebni ključevi po ulozi, da bi se
 * pristup advokata mogao ukinuti bez menjanja linka tima. Ključ mora imati bar 24 znaka.
 */
export function proveriKljucPregleda(kljuc: string): { uloga: UlogaPregleda } | null {
  const podesavanje = getEnv("PREGLED_KLJUCEVI");

  if (!podesavanje || kljuc.length < minimalnaDuzinaKljuca) {
    return null;
  }

  let pogodak: { uloga: UlogaPregleda } | null = null;

  for (const unos of podesavanje.split(",")) {
    const [uloga, vrednost] = unos.trim().split(":");

    if ((uloga !== "tim" && uloga !== "advokati") || !vrednost || vrednost.length < minimalnaDuzinaKljuca) {
      continue;
    }

    // bez ranog izlaska, da vreme provere ne otkriva koji ključ je pogođen
    if (jednako(kljuc, vrednost) && !pogodak) {
      pogodak = { uloga };
    }
  }

  return pogodak;
}
