"use client";

import { withCurrentAttributionParameters } from "@/lib/attribution";
import { getSiteVerzijaClient } from "@/lib/site-version";

type Locale = "sr" | "en";
type Problem = "delay" | "cancelled" | "other";

/**
 * Adresa forme. Formu služi aplikacija za klijente na istom domenu (multi-zone), pa se ide punim učitavanjem strane.
 * Proba dve verzije sajta (28.09.2026): verzija B dodaje forma=kratka, formu radi Prijava i čita isti kolačić.
 */
export function adresaForme(locale: Locale, problem?: Problem) {
  const putanja = locale === "en" ? "/en/check-flight" : "/proveri-let";
  const upit = new URLSearchParams();
  if (problem) {
    upit.set("step", "2");
    upit.set("issue", problem);
  }
  if (getSiteVerzijaClient() === "b") upit.set("forma", "kratka");
  const niz = upit.toString();
  return niz ? `${putanja}?${niz}` : putanja;
}

export function idiNaFormu(locale: Locale, problem?: Problem) {
  // poreklo klika iz oglasa (gclid, utm…) ide sa korisnikom u formu — samo uz pristanak za marketing (attribution.ts)
  window.location.href = withCurrentAttributionParameters(adresaForme(locale, problem));
}
