/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci) */
import type { PredmetV1 } from "../pregled/types.ts";

/**
 * Red za CRM pregled (/pregled/<ključ>) iz jednog predmeta — prepis pipeline scripts/indeks.mjs.
 * Pregled vide i advokati, zato NAMERNO bez pasoša, JMBG, adrese, datuma rođenja, telefona i mejla.
 */
const FAZA: Record<string, [PredmetV1["faza"], string]> = {
  NEW: ["prijem", "Nov upit"], VERIFIED: ["provera", "Let proveren"], REVIEWED: ["provera", "Nalaz revidiran"],
  DRAFTED: ["odgovor", "Odgovor spreman"], SENT: ["odgovor", "Odgovoreno, čeka se klijent"],
  AWAITING_DOCS: ["dokumenta", "Čekaju se dokumenta"], CLIENT_REPLIED: ["odgovor", "Klijent odgovorio"],
  DOCS_RECEIVED: ["dokumenta", "Dokumenta primljena"], POA_GENERATED: ["potpis", "Ugovor napravljen"],
  POA_DRAFTED: ["potpis", "Ugovor spreman za slanje"], POA_SENT: ["potpis", "Čeka se potpis"],
  POA_SIGNED: ["advokat", "Potpisano"], LAWYER: ["advokat", "Kod advokata"],
  HUMAN_REVIEW: ["provera", "Ručna provera"], CLOSED: ["zatvoreno", "Zatvoreno"],
  NOT_ELIGIBLE: ["zatvoreno", "Nema osnova"], LOST: ["zatvoreno", "Izgubljen"],
};

const naPotezu = (s: string): PredmetV1["na_potezu"] =>
  ["SENT", "AWAITING_DOCS", "POA_SENT"].includes(s) ? "klijent"
  : ["LAWYER", "POA_SIGNED"].includes(s) ? "advokat"
  : ["CLOSED", "NOT_ELIGIBLE", "LOST"].includes(s) ? "niko"
  : "mi";

const danaOd = (d: string | null, sada: Date) => (d ? Math.floor((sada.getTime() - new Date(d.replace(" ", "T")).getTime()) / 86400000) : null);

function sledeciKorak(c: any, potpisi: PredmetV1["potpisi"]) {
  const nepotpisano = potpisi.filter((p) => p.stanje !== "potpisano").length;
  if (c.portal?.link_napravljen && ["SENT", "AWAITING_DOCS"].includes(c.status)) return "Klijent popunjava portal (podaci, dokumenta, potpis)";
  if (c.portal?.potpis_kanal === "portal" && c.status === "POA_SENT") return `Čeka se potpis u portalu (${nepotpisano} od ${potpisi.length})`;
  switch (c.status) {
    case "NEW": case "VERIFIED": case "REVIEWED": return "Proveriti let i pripremiti prvi odgovor";
    case "DRAFTED": case "POA_DRAFTED": return "Poslati pripremljeni mejl";
    case "SENT": case "AWAITING_DOCS": return "Čekamo pasoš i boarding kartu";
    case "CLIENT_REPLIED": return "Odgovoriti klijentu";
    case "DOCS_RECEIVED": case "POA_GENERATED": return "Pripremiti i poslati ugovor";
    case "POA_SENT": return `Čekamo potpis (${nepotpisano} od ${potpisi.length})`;
    case "POA_SIGNED": return "Proslediti advokatu";
    case "LAWYER": return "Advokat vodi postupak";
    case "HUMAN_REVIEW": return "Ručna provera nalaza";
    default: return null;
  }
}

const UKUPNO = 14;
const k = (broj: number | null, naziv: string, ko: NonNullable<PredmetV1["korak"]>["ko"]) => ({ broj, ukupno: UKUPNO, naziv, ko });

/** Korak u toku predmeta (isti koraci kao dijagram u STAGING.md) i ko je sada na potezu. */
export function korakPredmeta(c: any): NonNullable<PredmetV1["korak"]> {
  const fajlova = (c.dokumenta_fajlovi ?? []).length;
  switch (c.status) {
    case "NEW":
      if (c.tip === "other") return k(null, "Nije kašnjenje ni otkazivanje — pitati klijenta (C)", "ti");
      if (!c.sistem?.primljeno) return k(2, "Prijem predmeta", "sistem");
      if (!c.let?.datum || !c.let?.od || !c.let?.do) return k(3, "Fali datum ili ruta leta — tražiti boarding kartu", "ti");
      if (!c.let?.broj) return c.let?.pronalazenje?.stanje === "ceka_klijenta" ? k(6, "Let nije jednoznačan — mejl traži dokumenta (let se čita sa karte)", "sistem") : k(3, "Agent traži broj leta i proverava let", "agent");
      if (!c.provera_kod) return k(3, "Agent proverava let", "agent");
      return k(4, "Pravila EU261 računaju nalaz", "sistem");
    case "VERIFIED":
      return k(5, "Revizor proverava izvore", "agent");
    case "REVIEWED":
      return c.nalaz === "ELIGIBLE" ? k(6, "Pravi se mejl koji traži dokumenta", "sistem") : k(null, "Moguć osnov — odluka pre mejla", "ti");
    case "DRAFTED":
      return k(7, "Pošalji mejl iz draftova", "ti");
    case "SENT":
    case "AWAITING_DOCS":
      return fajlova ? k(10, "Agent čita dokumenta", "agent") : k(8, "Čekamo dokumenta od klijenta", "klijent");
    case "CLIENT_REPLIED":
      if (c.let?.pronalazenje?.stanje === "ceka_klijenta" && !c.provera_kod) {
        if (c.let?.broj) return k(3, "Broj leta dobijen — agent proverava let", "agent");
        if (fajlova && !c.dokumenta_pregled) return k(10, "Agent čita kartu i dokumenta", "agent");
        return k(9, "Klijent pisao — broj leta i dalje fali", "ti");
      }
      if (fajlova && !c.dokumenta_pregled) return k(10, "Agent čita dokumenta", "agent");
      return k(9, fajlova ? "Klijent pisao — pročitaj odgovor" : "Klijent pisao bez priloga — pročitaj", "ti");
    case "DOCS_RECEIVED":
    case "POA_GENERATED":
      return k(11, "Ugovor i link za potpis se prave", "sistem");
    case "POA_DRAFTED":
      return k(12, "Pošalji mejl sa linkom za potpis", "ti");
    case "POA_SENT":
      return k(13, "Klijent potpisuje ugovor", "klijent");
    case "POA_SIGNED":
      return k(14, "Potpisano — ide u dnevni mejl advokatima", "sistem");
    case "LAWYER":
      return k(14, "Kod advokata", "advokat");
    case "HUMAN_REVIEW":
      return k(null, "Ručna provera — odluka je tvoja", "ti");
    case "NOT_ELIGIBLE":
      return k(null, "Nema osnova", c.poslednji_kontakt ? "niko" : "ti");
    default:
      return k(null, c.status === "LOST" ? "Klijent se nije javio" : "Zatvoreno", "niko");
  }
}

/** Detalji za tab „Informacije“ u CRM-u — ono što advokatu treba, bez ličnih podataka. */
function detalji(c: any): NonNullable<PredmetV1["detalji"]> {
  const pk = c.provera_kod ?? null;
  const kas = pk?.kasnjenje ?? null;
  const dok = c.dokumenta ?? {};
  return {
    tip: c.tip ?? null,
    ruta_opis: c.let?.ruta_opis ?? null,
    konekcija: typeof c.let?.konekcija === "boolean" ? c.let.konekcija : null,
    udaljenost_km: c.udaljenost_km ?? null,
    kasnjenje: kas
      ? { min: kas.minimalno ?? null, max: kas.maksimalno ?? null, mera: kas.mera ?? null }
      : c.kasnjenje_dolazak_min != null ? { min: c.kasnjenje_dolazak_min, max: c.kasnjenje_dolazak_min, mera: null } : null,
    polazak_kasnjenje_min: pk?.polazak_kasnjenje_min ?? null,
    sigurnost: pk?.sigurnost ?? null,
    granicno: !!pk?.granicno,
    koraci: (pk?.koraci ?? []).map((x: any) => ({ korak: String(x.korak ?? ""), ishod: String(x.ishod ?? ""), obrazlozenje: String(x.obrazlozenje ?? "") })),
    sta_fali: pk?.sta_fali ?? [],
    razlozi_provere: pk?.human_review ?? [],
    revizija: c.revizija ?? null,
    let_utvrdjen: c.let?.pronalazenje?.stanje ?? null,
    dokumenta: { licna_isprava: !!dok.pasos, boarding: !!dok.boarding, rezervacija: !!dok.rezervacija, obavestenje: !!dok.obavestenje, punomocje_potpisano: !!dok.punomocje_potpisano },
    fajlova: (c.dokumenta_fajlovi ?? []).filter((f: any) => f?.izvor !== "potpis").length,
    drive_folder_url: c.drive_folder_id ? `https://drive.google.com/drive/folders/${c.drive_folder_id}` : null,
    provereno: pk?.izracunato ?? null,
  };
}

export function izracunajPregled(c: any, sada: Date): PredmetV1 {
  const t: Record<string, string> = c.istorija_statusa ?? {};
  const putnici = [c.putnik, ...(c.saputnici ?? [])].filter((p: any) => p?.ime_prezime);
  const potpisi: PredmetV1["potpisi"] = putnici.map((p: any) => {
    const e = (c.potpisivanje ?? []).find((x: any) => x.putnik === p.ime_prezime);
    const izStatusa = ["POA_SIGNED", "LAWYER", "CLOSED"].includes(c.status) ? "potpisano"
      : c.status === "POA_SENT" ? "poslato"
      : ["POA_DRAFTED", "POA_GENERATED"].includes(c.status) ? "pripremljeno" : "nije_pripremljeno";
    const stanje = e?.stanje === "odbijeno" ? "poslato" : (e?.stanje ?? izStatusa);
    const poslato = e?.poslato ?? t.POA_SENT ?? null;
    const ePotpis = !!e && e.provajder !== "email";
    return {
      putnik: p.ime_prezime,
      maloletan: !!p.maloletan,
      dokument: e || ["POA_GENERATED", "POA_DRAFTED", "POA_SENT", "POA_SIGNED", "LAWYER"].includes(c.status) ? "ugovor_o_ustupanju" : null,
      stanje,
      kanal: ePotpis ? "e_potpis" : "email",
      poslato,
      potpisano: stanje === "potpisano" ? (e?.potpisano ?? t.POA_SIGNED ?? t.LAWYER ?? null) : null,
      ceka_dana: stanje === "poslato" ? danaOd(poslato, sada) : null,
      provajder: ePotpis ? { naziv: e.provajder, status: e.stanje === "odbijeno" ? "odbijeno" : e.stanje, audit_trail: !!e.audit_trail } : null,
    };
  });
  const [faza, faza_opis] = FAZA[c.status] ?? ["ostalo", c.status];
  const pregled: PredmetV1 = {
    ref: c.ref,
    status: c.status,
    faza,
    faza_opis,
    na_potezu: naPotezu(c.status),
    putnici: putnici.map((p: any) => ({ ime: p.ime_prezime, maloletan: !!p.maloletan })),
    let: { broj: c.let?.broj ?? null, datum: c.let?.datum ?? null, od: c.let?.od ?? null, do: c.let?.do ?? null, prevozilac: c.let?.prevozilac ?? null, uzrok_izvestaj: null },
    nalaz: c.nalaz ?? null,
    kasnjenje_min: c.kasnjenje_dolazak_min ?? null,
    iznos_po_putniku_eur: c.iznos_eur ?? null,
    iznos_odobren: !!c.iznos_odobren,
    procena_ukupno_eur: c.iznos_eur ? c.iznos_eur * putnici.length : null,
    poslednji_kontakt: c.poslednji_kontakt ?? null,
    poslednji_kontakt_ko: c.poslednji_kontakt_ko ?? null,
    podsetnik: c.followup ?? null,
    prosledjeno_advokatu: c.prosledjeno_advokatu ?? (t.LAWYER ? t.LAWYER.slice(0, 10) : null),
    sledeci_korak: sledeciKorak(c, potpisi),
    potpisi,
    drive_folder: c.drive_folder ?? null,
    detalji: detalji(c),
    korak: korakPredmeta(c),
    kreirano: c.kreirano ?? null,
    azurirano: c.azurirano ?? null,
  };
  const s = JSON.stringify(pregled);
  if (/"(pasos|jmbg|adresa|rodjena|telefon|email)":/.test(s) || /\b\d{13}\b/.test(s) || /[\w.+-]+@[\w-]+\.[\w.]+/.test(s)) {
    throw new Error(`${c.ref}: red za pregled sadrži lične podatke`);
  }
  return pregled;
}
