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
  /** "email" = PDF poslat mejlom; "e_potpis" = link za potpis preko provajdera (signNow, Youtrust…). */
  kanal: "email" | "e_potpis";
  poslato: string | null;
  potpisano: string | null;
  ceka_dana: number | null;
  provajder: { naziv: string; status: string; audit_trail?: boolean } | null;
}

/** Gde je predmet u toku (14 koraka, STAGING.md) i ko je na potezu. broj null = van redovnog toka (ručna provera, nema osnova). */
export interface KorakV1 {
  broj: number | null;
  ukupno: number;
  naziv: string;
  ko: "ti" | "klijent" | "sistem" | "agent" | "advokat" | "niko";
}

export interface DogadjajV1 {
  ref: string;
  vreme: string;
  poruka: string;
  vreme_prikaz?: string;
}

/** Staging pošta (draftovi i automatski mejlovi koji nikome ne idu) — samo tim. */
export interface PostaV1 {
  id: string;
  vreme: string;
  za: string[];
  naslov: string;
  stanje: "draft" | "poslat";
  automatski: boolean;
  vreme_prikaz?: string;
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
  /** Tab „Informacije“ u CRM-u: let, kašnjenje, pravni osnov, dokumenta (bez ličnih podataka). */
  detalji?: {
    tip: string | null;
    ruta_opis: string | null;
    konekcija: boolean | null;
    udaljenost_km: number | null;
    kasnjenje: { min: number | null; max: number | null; mera: string | null } | null;
    polazak_kasnjenje_min: number | null;
    sigurnost: string | null;
    granicno: boolean;
    koraci: Array<{ korak: string; ishod: string; obrazlozenje: string }>;
    sta_fali: string[];
    razlozi_provere: string[];
    revizija: string | null;
    let_utvrdjen: string | null;
    dokumenta: { licna_isprava: boolean; boarding: boolean; rezervacija: boolean; obavestenje: boolean; punomocje_potpisano: boolean };
    fajlova: number;
    drive_folder_url: string | null;
    provereno: string | null;
  } | null;
  korak?: KorakV1 | null;
  kreirano: string | null;
  azurirano: string | null;
}

/** Zadatak za čoveka iz orkestratora (scripts/sistem). ko: niko = tim LetKasni. */
export interface ZadatakV1 {
  ref: string | null;
  ko: "niko" | "advokat" | "sistem";
  vrsta: string;
  opis: string;
  od: string;
}

export interface SistemV1 {
  okruzenje: string;
  poslednji_prolaz: string;
  rezimi: Record<string, string>;
  agenti_cekaju: number;
  greske: number;
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
  /** Opciono (dodaje orkestrator): otvoreni zadaci i stanje poslednjeg prolaza. */
  zadaci?: ZadatakV1[];
  sistem?: SistemV1;
  /** Samo za tim: istorija (crm_dogadjaji) i staging pošta. */
  dogadjaji?: DogadjajV1[];
  posta?: PostaV1[];
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
