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
    kreirano: c.kreirano ?? null,
    azurirano: c.azurirano ?? null,
  };
  const s = JSON.stringify(pregled);
  if (/"(pasos|jmbg|adresa|rodjena|telefon|email)":/.test(s) || /\b\d{13}\b/.test(s) || /[\w.+-]+@[\w-]+\.[\w.]+/.test(s)) {
    throw new Error(`${c.ref}: red za pregled sadrži lične podatke`);
  }
  return pregled;
}
