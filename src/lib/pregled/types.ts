/**
 * Indeks predmeta (šema 1). Generiše ga LetKasni pipeline (`scripts/indeks.mjs`) i objavljuje
 * na Google Drive („Letkasni.rs / LetKasni — sistem / indeks.json“).
 *
 * Indeks namerno ne nosi broj pasoša, JMBG, adresu, datum rođenja, telefon ni email —
 * pregled vide i advokati preko linka.
 */
export type Faza = "prijem" | "provera" | "odgovor" | "dokumenta" | "potpis" | "advokat" | "zatvoreno" | "ostalo";
export type NaPotezu = "mi" | "klijent" | "advokat" | "niko";
export type StanjePotpisa = "nije_pripremljeno" | "pripremljeno" | "poslato" | "potpisano";
export type VrstaDokumenta = "ugovor_o_ustupanju" | "punomocje";

export interface PotpisV1 {
  putnik: string;
  maloletan: boolean;
  dokument: VrstaDokumenta | null;
  stanje: StanjePotpisa;
  kanal: "email" | "yousign";
  poslato: string | null;
  potpisano: string | null;
  ceka_dana: number | null;
  provajder: { naziv: string; status: string; link?: string } | null;
}

export interface PredmetV1 {
  ref: string;
  status: string;
  faza: Faza;
  faza_opis: string;
  na_potezu: NaPotezu;
  putnici: Array<{ ime: string; maloletan: boolean }>;
  let: {
    broj: string | null;
    datum: string | null;
    od: string | null;
    do: string | null;
    prevozilac: string | null;
    uzrok_izvestaj: string | null;
  };
  nalaz: string | null;
  kasnjenje_min: number | null;
  iznos_po_putniku_eur: number | null;
  iznos_odobren: boolean;
  procena_ukupno_eur: number | null;
  poslednji_kontakt: string | null;
  poslednji_kontakt_ko: string | null;
  podsetnik: string | null;
  prosledjeno_advokatu: string | null;
  sledeci_korak: string | null;
  potpisi: PotpisV1[];
  drive_folder: string | null;
  kreirano: string | null;
  azurirano: string | null;
}

export interface IndeksV1 {
  sema: 1;
  generisano: string;
  izvor: string;
  ukupno: {
    predmeta: number;
    putnika: number;
    otvorenih: number;
    ceka_potpis: number;
    kod_advokata: number;
    procena_eur: number;
  };
  predmeti: PredmetV1[];
}

export function jeIndeksV1(value: unknown): value is IndeksV1 {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<IndeksV1>;
  return (
    v.sema === 1 &&
    typeof v.generisano === "string" &&
    Array.isArray(v.predmeti) &&
    !!v.ukupno &&
    v.predmeti.every((p) => typeof p?.ref === "string" && Array.isArray(p?.potpisi) && Array.isArray(p?.putnici))
  );
}
