/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci) */

/** Vokativ i rod za srpska imena (prvo ime) — prepis pipeline scripts/vokativ.mjs. Nesigurno → Niko proverava. */
const IZUZECI: Record<string, string> = {
  Petar: "Petre", Aleksandar: "Aleksandre", Lazar: "Lazare", Nikola: "Nikola", Aleksa: "Aleksa", Nemanja: "Nemanja",
  Luka: "Luka", Saša: "Saša", Sasa: "Sasa", Kosta: "Kosta", Ilija: "Ilija", Andrija: "Andrija", Đorđe: "Đorđe",
  Pavle: "Pavle", Rade: "Rade", Radivoje: "Radivoje", Miloje: "Miloje", Dimitrije: "Dimitrije", Marko: "Marko",
  Mihajlo: "Mihajlo", Danilo: "Danilo", Vanja: "Vanja", Miloš: "Miloše", Uroš: "Uroše", Andrej: "Andreju",
  Predrag: "Predraže", Vuk: "Vuče", Dragutin: "Dragutine", Milica: "Milice", Danica: "Danice", Dragica: "Dragice",
  Ljubica: "Ljubice", Jovica: "Jovice", Ivica: "Ivice", Tomica: "Tomice",
};
const MUSKA_NA_A = new Set(["Nikola", "Aleksa", "Nemanja", "Luka", "Saša", "Sasa", "Kosta", "Ilija", "Andrija", "Vanja", "Jovica", "Ivica", "Tomica", "Đura", "Toma", "Pera", "Mika", "Miša", "Boža", "Sava", "Đoka"]);

export function vokativ(puno: string) {
  const ime = String(puno).trim().split(/\s+/)[0];
  const Ime = ime.charAt(0).toUpperCase() + ime.slice(1);
  let vok: string;
  let sigurno = true;
  const naA = /a$/i.test(Ime);
  const pol = naA && !MUSKA_NA_A.has(Ime) ? "ž" : "m";
  if (IZUZECI[Ime]) vok = IZUZECI[Ime];
  else if (naA) vok = pol === "ž" && /ica$/i.test(Ime) ? Ime.replace(/a$/, "e") : Ime;
  else if (/[eiou]$/i.test(Ime)) vok = Ime;
  else if (/(j|lj|nj|ć|đ)$/i.test(Ime)) vok = Ime + "u";
  else if (/(č|š|ž)$/i.test(Ime)) vok = Ime + "e";
  else if (/k$/i.test(Ime)) { vok = Ime.slice(0, -1) + "če"; sigurno = false; }
  else if (/g$/i.test(Ime)) { vok = Ime.slice(0, -1) + "že"; sigurno = false; }
  else if (/h$/i.test(Ime)) { vok = Ime.slice(0, -1) + "še"; sigurno = false; }
  else if (/[^aeiou]ar$/i.test(Ime)) { vok = Ime + "e"; sigurno = false; }
  else vok = Ime + "e";
  return { ime: Ime, vokativ: vok, pol, oslovljavanje: pol === "ž" ? "Poštovana" : "Poštovani", sigurno };
}

export interface Draft {
  sablon: string;
  subject: string;
  to: string;
  cc?: string[];
  telo: string;
  prilozi?: string[];
}

/**
 * Provera drafta pre Gmail-a — prepis pipeline scripts/lint-draft.mjs. Greška = draft ne ide.
 * (CLAUDE.md: kod kašnjenja nikad „otkaz“, iznos samo ako je odobren, vokativ, potpis, bez Ref-a.)
 */
export function lintDraft(c: any, d: Draft) {
  const greske: string[] = [];
  const upozorenja: string[] = [];
  const telo = d.telo.trim();
  const sve = `${d.subject}\n${telo}`;

  const ph = sve.match(/\{\{[^}]+\}\}/g);
  if (ph) greske.push(`Neispunjeni placeholderi: ${[...new Set(ph)].join(", ")}`);
  if (c.tip === "delay" && /otkaz/i.test(telo)) greske.push("Draft za KAŠNJENJE sadrži „otkaz…“.");
  if (c.tip === "cancellation" && /kasnio|kašnjenj/i.test(telo) && !/dolaz|zamensk|alternativ/i.test(telo)) upozorenja.push("Draft za OTKAZIVANJE pominje kašnjenje bez konteksta zamenskog leta.");
  if (/\b(EUR|€|evra)\b/i.test(telo) && !c.iznos_odobren) greske.push("Iznos u EUR u tekstu, a iznos nije odobren.");

  const prvi = telo.split("\n")[0].trim();
  const m = prvi.match(/^(Poštovani|Poštovana|Dobar dan|Draga|Dragi)\s+(.+?),$/);
  if (!m) greske.push(`Prvi red nije oslovljavanje: „${prvi}“`);
  else {
    const v = vokativ(c.putnik?.ime_prezime ?? "");
    const ocekivano = c.putnik?.vokativ ?? v.vokativ;
    const imena = m[2].split(/,\s*|\s+i\s+|\s+poštovana\s+|\s+poštovani\s+/i).map((s) => s.trim()).filter(Boolean);
    if (!imena.includes(ocekivano)) greske.push(`Vokativ: očekujem „${ocekivano}“, u draftu „${m[2]}“.`);
    const pol = c.putnik?.pol ?? v.pol;
    if (m[1] === "Poštovani" && pol === "ž" && imena.length === 1) greske.push("„Poštovani“ za žensko ime.");
    if (m[1] === "Poštovana" && pol === "m") greske.push("„Poštovana“ za muško ime.");
  }
  if (!/(Podrška letkasni\.rs|Tim letkasni\.rs)\s*$/.test(telo)) greske.push("Potpis mora biti „Podrška letkasni.rs“ ili „Tim letkasni.rs“ na kraju.");
  if (c.ref && telo.includes(c.ref)) greske.push("Ref/broj predmeta u tekstu ka klijentu.");

  const konv = /^(Re: )?AVIO-NAKNADA ZA (POMEREN LET [A-Z0-9]{2} ?\d{1,4} [A-Z]{3} - [A-Z]{3}|OTKAZAN LET [A-Z0-9]{2} ?\d{1,4} [A-Z]{3} - [A-Z]{3}|LET [A-Z]{3} - [A-Z]{3})/;
  if (!d.subject) greske.push("Nema Subject.");
  else if (!d.subject.startsWith("Re: ") && !konv.test(d.subject)) greske.push(`Naslov nije po konvenciji: „${d.subject}“`);
  if (d.subject.startsWith("Re: ") && !c.gmail?.client_thread && !c.gmail?.claim_thread) upozorenja.push("Re: naslov, a predmet nema thread.");

  const dozvoljeni = [c.putnik?.email, ...(c.saputnici ?? []).map((x: any) => x?.email), c.kontakt_email].filter(Boolean).map((e: string) => e.toLowerCase());
  if (!d.to) greske.push("Nema To.");
  else if (dozvoljeni.length && !dozvoljeni.includes(d.to.toLowerCase())) greske.push(`To (${d.to}) nije ni putnik ni saputnik na ovom predmetu.`);
  if (c.test) greske.push("Ovo je TEST predmet — ne pravi draft.");
  if (/\b(vas|vam|vaš|vaša|vaše|vašu)\b/.test(telo)) upozorenja.push("Malo „vi/vas/vaš“ — klijentu se piše sa velikim V.");
  return { greske, upozorenja };
}
