/**
 * Provera oblika činjenica koje agent upisuje za let (crm_letovi → podaci.cinjenice).
 * Kod ne veruje agentu na reč: bez ispravnih činjenica nema nalaza. Isto kao pipeline pravila/cinjenice.mjs.
 */
const IATA = /^[A-Z]{3}$/;
const ZONA = /(Z|[+-]\d{2}:?\d{2})$/;
const TIPOVI = ["delay", "cancellation", "denied_boarding", "other"];
const UZROCI = ["nepoznat", "tehnicki", "posada", "rotacija", "strajk_osoblja", "vreme", "vazdusni_prostor", "atc_strajk", "bezbednost", "ptica", "drzavni_organ", "carrier_tvrdi_vanredne"];

type Obj = Record<string, unknown>;

export function proveriCinjenice(c: unknown, letJson: Obj = {}): string[] {
  const g: string[] = [];
  if (!c || typeof c !== "object") return ["nema objekta `cinjenice`"];
  const x = c as Obj;
  if (!TIPOVI.includes(String(x.tip))) g.push(`tip mora biti ${TIPOVI.join("|")}`);
  if (!IATA.test(String(x.od ?? ""))) g.push("od: IATA kod polaska");
  if (!IATA.test(String(x.do ?? ""))) g.push("do: IATA kod krajnjeg odredišta");
  if (x.prevozilac != null && !/^[A-Z0-9]{2}$/.test(String(x.prevozilac))) g.push("prevozilac: IATA kod operativnog prevozioca (2 znaka)");
  if (x.uzrok != null && !UZROCI.includes(String(x.uzrok))) g.push(`uzrok mora biti ${UZROCI.join("|")}`);

  const vremena = (niz: unknown, ime: string) => {
    if (niz == null) return;
    if (!Array.isArray(niz)) {
      g.push(`${ime} mora biti niz`);
      return;
    }
    for (const v of niz) if (typeof v !== "string" || !ZONA.test(v) || Number.isNaN(Date.parse(v))) g.push(`${ime}: „${v}“ nije ISO vreme sa zonom`);
  };

  const k = x.kasnjenje as Obj | undefined;
  if (x.tip === "delay" && k) {
    vremena(k.sta, "kasnjenje.sta");
    vremena(k.vrata, "kasnjenje.vrata");
    vremena(k.sletanje, "kasnjenje.sletanje");
    if (k.procena_min != null && !(Array.isArray(k.procena_min) && k.procena_min.length === 2 && k.procena_min.every(Number.isFinite)))
      g.push("kasnjenje.procena_min: [min, max] u minutima");
    if (!Number.isInteger(k.izvori_stvarno) || (k.izvori_stvarno as number) < 0) g.push("kasnjenje.izvori_stvarno: broj nezavisnih izvora za stvarno vreme");
  }
  const o = x.otkazivanje as Obj | undefined;
  if (x.tip === "cancellation" && o && o.izvori_stvarno != null && !Number.isInteger(o.izvori_stvarno)) g.push("otkazivanje.izvori_stvarno: ceo broj");

  // Svaki izvor mora da se može ponovo otvoriti (Revizor ga proverava).
  const izvori = (letJson.izvori ?? {}) as Obj;
  const saUrl = Object.values(izvori).filter((v) => /https?:\/\//.test(typeof v === "string" ? v : JSON.stringify(v)));
  const brojIzvora = Number(k?.izvori_stvarno ?? o?.izvori_stvarno ?? 0);
  if (brojIzvora > saUrl.length) g.push(`izvori_stvarno=${brojIzvora}, a u "izvori" ima samo ${saUrl.length} sa URL-om`);
  return g;
}
