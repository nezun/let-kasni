import { createHmac, timingSafeEqual } from "node:crypto";

import { getEnv } from "@/lib/env";

const refOblik = /^[A-Z0-9-]{4,16}$/;

function potpis(tajna: string, poruka: string) {
  return createHmac("sha256", tajna).update(poruka).digest("base64url").slice(0, 32);
}

/**
 * Lični link klijenta: /predmet/<token> (portal) i /dokumenta/<token>.
 * v2.<ref base64url>.<ističe unix>.<potpis> — pravi ga pipeline (scripts/sistem/lib/link.mjs);
 * v1.<REF>.<ističe>.<potpis> — stariji format, i dalje važi.
 * Ista tajna na obe strane (DOKUMENTA_TAJNA, ≥ 32 znaka). Link ne otkriva ništa o klijentu.
 */
export function proveriTokenDokumenata(token: string): { ref: string; istice: Date } | null {
  const tajna = getEnv("DOKUMENTA_TAJNA");

  if (!tajna || tajna.length < 32) {
    return null;
  }

  const delovi = decodeURIComponent(token).split(".");

  if (delovi.length !== 4 || (delovi[0] !== "v1" && delovi[0] !== "v2")) {
    return null;
  }

  const [verzija, refDeo, istice, dobijeno] = delovi;
  const ref = verzija === "v2" ? Buffer.from(refDeo, "base64url").toString("utf8") : refDeo;

  if (!refOblik.test(ref) || !/^\d{10}$/.test(istice)) {
    return null;
  }

  const a = Buffer.from(dobijeno);
  const b = Buffer.from(potpis(tajna, `${verzija}.${refDeo}.${istice}`));

  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return null;
  }

  const datum = new Date(Number(istice) * 1000);
  return datum.getTime() > Date.now() ? { ref, istice: datum } : null;
}
