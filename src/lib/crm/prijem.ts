import { crmKlijent, jeCrmPodesen } from "@/lib/crm/baza";
import { status as aerodrom } from "@/lib/sistem/pravila/udaljenost";
import { getEnv } from "@/lib/env";
import type { PredmetV1 } from "@/lib/pregled/types";
import type { ClaimRecord } from "@/lib/types";

export type RezultatCrm = { upisano: true; ref: string } | { upisano: false; razlog: string };

const tipPoProblemu: Record<string, string> = {
  delay_3h_plus: "delay",
  missed_connection_same_booking: "delay",
  denied_boarding: "denied_boarding",
  other: "other",
};

/** Ref predmeta = prvih 8 heks znakova ID-ja claim-a (ista konvencija kao pipeline, npr. E093C1CD). */
export function refIzClaima(id: string) {
  return id.replace(/[^0-9a-f]/gi, "").slice(0, 8).toUpperCase();
}

function brojLeta(s: string) {
  const m = s.toUpperCase().replace(/\s+/g, "").match(/^([A-Z0-9]{2})(\d{1,4})[A-Z]?$/);
  return m ? `${m[1]} ${m[2]}` : null;
}

/**
 * Nov claim sa forme odmah postaje predmet u CRM bazi (status NEW). Orkestrator ga preuzima,
 * dopunjuje i pokreće proveru. Nikad ne baca grešku — forma mora da uspe i kad baza ne radi.
 */
export async function upisiClaimUCrm(claim: ClaimRecord, locale: "sr" | "en"): Promise<RezultatCrm> {
  if (!jeCrmPodesen()) {
    return { upisano: false, razlog: "CRM_SUPABASE_URL nije podešen." };
  }

  const email = claim.email.trim().toLowerCase();
  const ignorisi = (getEnv("CRM_IGNORISI_EMAILOVE") ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);

  if (ignorisi.includes(email)) {
    return { upisano: false, razlog: "test claim (CRM_IGNORISI_EMAILOVE)" };
  }

  const ref = refIzClaima(claim.id);
  // samo poznati aerodromi — „Wizz Air“ u tekstu rute ne sme da postane odredište „AIR“
  const kodovi = (claim.route.toUpperCase().match(/\b[A-Z]{3}\b/g) ?? []).filter((k) => aerodrom(k).poznat);
  const od = kodovi[0] ?? null;
  const doo = kodovi.length > 1 ? kodovi[kodovi.length - 1] : null;
  const broj = brojLeta(claim.flightNumber);
  const datum = /^\d{4}-\d{2}-\d{2}$/.test(claim.flightDate) ? claim.flightDate : null;
  const ime = [claim.firstName, claim.lastName].filter(Boolean).join(" ").trim() || null;
  const tip = tipPoProblemu[claim.issueType] ?? "other";
  const sada = new Date().toISOString();

  const podaci = {
    ref,
    status: "NEW",
    putnik: { ime_prezime: ime, email, telefon: claim.phone ?? null },
    let: { broj, datum, od, do: doo, ruta_opis: claim.route, konekcija: claim.issueType === "missed_connection_same_booking" },
    tip,
    problem_iz_forme: claim.issueType,
    provider_status: claim.providerSnapshot?.status ?? null,
    prijem: { izvor: "sajt", claim_id: claim.id, primljeno: sada, jezik: locale },
  };

  const pregled: PredmetV1 = {
    ref,
    status: "NEW",
    faza: "prijem",
    faza_opis: "Nov upit",
    na_potezu: "mi",
    putnici: [{ ime: ime ?? "(bez imena)", maloletan: false }],
    let: { broj, datum, od, do: doo, prevozilac: null, uzrok_izvestaj: null },
    nalaz: null,
    kasnjenje_min: null,
    iznos_po_putniku_eur: null,
    iznos_odobren: false,
    procena_ukupno_eur: null,
    poslednji_kontakt: null,
    poslednji_kontakt_ko: null,
    podsetnik: null,
    prosledjeno_advokatu: null,
    sledeci_korak: "Sistem proverava let",
    potpisi: [],
    drive_folder: null,
    kreirano: sada,
    azurirano: sada,
  };

  try {
    const { error } = await crmKlijent().from("crm_predmeti").insert({
      ref,
      claim_id: claim.id,
      status: "NEW",
      tip,
      let_broj: broj,
      let_datum: datum,
      let_od: od,
      let_do: doo,
      email,
      telefon: claim.phone ?? null,
      podaci,
      pregled,
      verzija: 1,
      izvor_izmene: "sajt",
    });

    if (error && error.code !== "23505") {
      return { upisano: false, razlog: `CRM upis: ${error.message}` };
    }

    return { upisano: true, ref };
  } catch (error) {
    return { upisano: false, razlog: error instanceof Error ? error.message : String(error) };
  }
}
