import { createHmac, timingSafeEqual } from "node:crypto";

import { getEnv } from "@/lib/env";

const refOblik = /^[A-Z0-9-]{4,16}$/;

function potpis(tajna: string, poruka: string) {
  return createHmac("sha256", tajna).update(poruka).digest("base64url").slice(0, 32);
}

/**
 * Link za slanje dokumenata: /dokumenta/v1.<REF>.<ističe unix>.<potpis>.
 * Pravi ga pipeline (scripts/sistem/alati/link-dokumenta.mjs) istom tajnom (DOKUMENTA_TAJNA, ≥ 32 znaka).
 * Link ne otkriva ništa o klijentu osim broja predmeta i ne daje pristup postojećim dokumentima.
 */
export function proveriTokenDokumenata(token: string): { ref: string; istice: Date } | null {
  const tajna = getEnv("DOKUMENTA_TAJNA");

  if (!tajna || tajna.length < 32) {
    return null;
  }

  const delovi = decodeURIComponent(token).split(".");

  if (delovi.length !== 4 || delovi[0] !== "v1") {
    return null;
  }

  const [, ref, istice, dobijeno] = delovi;

  if (!refOblik.test(ref) || !/^\d{10}$/.test(istice)) {
    return null;
  }

  const a = Buffer.from(dobijeno);
  const b = Buffer.from(potpis(tajna, `v1.${ref}.${istice}`));

  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return null;
  }

  const datum = new Date(Number(istice) * 1000);
  return datum.getTime() > Date.now() ? { ref, istice: datum } : null;
}
