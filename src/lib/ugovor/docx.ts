import JSZip from "jszip";

import GRADOVI from "./gradovi.json";

/**
 * Ugovor o ustupanju potraživanja — isti dokument koji pravi `punomoc/ugovor.mjs` na Macu,
 * samo što ga ovde pravi sajt, čim klijent sačuva podatke u portalu (jedan prolaz do potpisa).
 *
 * Šabloni i potpis direktorke žive na Drive-u (folder „LetKasni — sistem/sabloni“, env
 * UGOVOR_SABLONI_DRIVE_FOLDER_ID) — repo je javan, pa ih ne držimo u njemu.
 *
 * Svaka izmena oblikovanja mora da ostane ista kao u punomoc/ugovor.mjs: .docx je jedini
 * izvor istine, a signNow iz njega vadi polje za potpis po nevidljivom text tagu.
 */
const SENTINEL = "{{POTPIS_PRIMALAC}}";
const DRZAVA = "Srbija / Serbia";
const TAG_POTPISA_PUTNIKA = '{{t:s;r:y;o:"Putnik";w:170;h:34;}}';
const MARKERI = /<w:color w:val="(?:2470EB|548DD4)"/;
const TELO_TEKSTA = '<w:rPr><w:bCs/><w:color w:val="000000" w:themeColor="text1"/></w:rPr>';
const EMU = 914400;
const POTPIS_VISINA_IN = 0.62;

export interface PutnikUgovora {
  ime_prezime: string;
  rodjena: string | null;
  adresa: string | null;
  maloletan: boolean;
  zakonski_zastupnik: string | null;
  claim_id: string;
}

export interface LetUgovora {
  broj: string | null;
  datum: string | null;
  prevozilac: string | null;
  od: string | null;
  do: string | null;
  ruta_opis?: string | null;
}

const gradovi = GRADOVI as Record<string, string>;

const escXml = (s: unknown) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const dmY = (iso: string | null | undefined) =>
  iso && /^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso.slice(8, 10)}.${iso.slice(5, 7)}.${iso.slice(0, 4)}.` : (iso ?? "");

/**
 * Relacija u ugovoru se uvek gradi iz IATA kodova; `ruta_opis` je interna beleška i ne ide u
 * pravni dokument. Ako za kod nemamo naziv grada, ugovor se ne pravi (dopuni scripts/gradovi.json).
 */
export function ruta(od: string | null, doo: string | null, opis?: string | null) {
  if (!od || !doo) return opis ?? "";
  const bez = [od, doo].filter((k) => !gradovi[k]);
  if (bez.length) throw new Error(`nema naziv grada za: ${bez.join(", ")}`);
  return `${gradovi[od]} (${od}) – ${gradovi[doo]} (${doo})`;
}

// ── oblikovanje (isto kao punomoc/ugovor.mjs) ─────────────────────────────
/** Šablon je obostrano poravnat; u uskim kolonama to pravi široke razmake — sve ide levo. */
const levoPoravnanje = (xml: string) => xml.replace(/<w:jc w:val="both"\/>/g, '<w:jc w:val="left"/>');

/** Labele u bloku sa podacima su podebljane i plavkasto-sive (374151) — svode se na telo teksta. */
const telesnaLabela = (xml: string) =>
  xml.replace(/<w:r(?:\s[^>]*)?>[\s\S]*?<\/w:r>/g, (run) =>
    run.includes('w:val="374151"') ? run.replace(/<w:rPr>[\s\S]*?<\/w:rPr>/, TELO_TEKSTA) : run,
  );

/**
 * Plava boja (2470EB, 548DD4) u šablonu označava mesta koja se popunjavaju — to je bila oznaka za nas,
 * ne deo dizajna. Svaki takav run preuzima oblikovanje suseda (prvo prethodnog običnog runa u istom
 * paragrafu, to je po pravilu labela; ako ga nema, prvog sledećeg).
 */
function ujednaciFont(xml: string) {
  return xml
    .replace(/<w:p\b[^>]*>[\s\S]*?<\/w:p>/g, (par) => {
      const runovi = [...par.matchAll(/<w:r(?:\s[^>]*)?>[\s\S]*?<\/w:r>/g)];
      if (!runovi.some((r) => MARKERI.test(r[0]))) return par;

      const rPrOd = (run: string) => run.match(/<w:rPr>[\s\S]*?<\/w:rPr>/)?.[0] ?? null;
      const oznacen = (run: string) => MARKERI.test(run);

      let novi = par;
      for (let i = runovi.length - 1; i >= 0; i--) {
        const run = runovi[i][0];
        if (!oznacen(run)) continue;

        let uzor: string | null = null;
        for (let j = i - 1; j >= 0 && !uzor; j--) if (!oznacen(runovi[j][0])) uzor = rPrOd(runovi[j][0]);
        for (let j = i + 1; j < runovi.length && !uzor; j++) if (!oznacen(runovi[j][0])) uzor = rPrOd(runovi[j][0]);
        const zamena = uzor ?? "<w:rPr><w:b/></w:rPr>";

        const preradjen = run.replace(/<w:rPr>[\s\S]*?<\/w:rPr>/, zamena);
        const index = runovi[i].index ?? 0;
        novi = novi.slice(0, index) + preradjen + novi.slice(index + run.length);
      }
      return novi;
    })
    .replace(/<w:color w:val="(?:2470EB|548DD4)"[^/]*\/>/g, "");
}

/**
 * Blok sa podacima (prva tabela) mešao je tri veličine i dve debljine — sve ide na telo teksta.
 * Redovi VELIKIM SLOVIMA su naslovi i ostaju istaknuti; njima se ispravlja samo veličina.
 */
function ujednaciBlokPodataka(xml: string) {
  const pocetak = xml.indexOf("<w:tbl>");
  if (pocetak === -1) return xml;
  const kraj = xml.indexOf("</w:tbl>", pocetak) + "</w:tbl>".length;

  const blok = xml.slice(pocetak, kraj).replace(/<w:p\b[^>]*>[\s\S]*?<\/w:p>/g, (par) => {
    const tekst = [...par.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)].map((m) => m[1]).join("");
    if (!tekst.trim()) return par;

    const novi = par.replace(/<w:sz w:val="17"\/>/g, "");
    if (tekst === tekst.toLocaleUpperCase("sr") && /\p{L}/u.test(tekst)) return novi;

    return novi.replace(/<w:r(?:\s[^>]*)?>[\s\S]*?<\/w:r>/g, (run) =>
      /<w:t/.test(run)
        ? /<w:rPr>[\s\S]*?<\/w:rPr>/.test(run)
          ? run.replace(/<w:rPr>[\s\S]*?<\/w:rPr>/, TELO_TEKSTA)
          : run.replace(/^(<w:r(?:\s[^>]*)?>)/, `$1${TELO_TEKSTA}`)
        : run,
    );
  });

  return (xml.slice(0, pocetak) + blok + xml.slice(kraj)).replace(/<w:rPr>\s*<\/w:rPr>/g, "");
}

/** Tabela sa potpisima ima sivkastu podlogu, a PNG potpisa belu — podloga te tabele ide na belo. */
function belaPodlogaPotpisa(xml: string) {
  const pocetak = xml.lastIndexOf("<w:tbl>");
  if (pocetak === -1) return xml;
  const kraj = xml.indexOf("</w:tbl>", pocetak);
  if (kraj === -1) return xml;
  const tabela = xml
    .slice(pocetak, kraj)
    .replace(/<w:shd w:val="clear" w:color="auto" w:fill="[0-9A-Fa-f]{6}"\/>/g, '<w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>')
    .replace(/<w:r(?:\s[^>]*)?>[\s\S]*?<\/w:r>/g, (run) => (run.includes('w:val="6B7280"') ? run : run.replace(/<w:sz w:val="17"\/>/g, "")));
  return (xml.slice(0, pocetak) + tabela + xml.slice(kraj)).replace(/<w:rPr>\s*<\/w:rPr>/g, "");
}

/** Sentinel za potpis direktorke u ćeliji PRIMALAC / ASSIGNEE, iznad linije. */
function ubaciSentinel(xml: string) {
  const i = xml.indexOf("PRIMALAC / ASSIGNEE");
  if (i === -1) throw new Error("ne nalazim ćeliju PRIMALAC / ASSIGNEE u šablonu");
  const linija = xml.indexOf("__________________________________", i);
  if (linija === -1) throw new Error("ne nalazim liniju za potpis Primaoca");
  const pocetakP = xml.lastIndexOf("<w:p ", linija);
  const par = `<w:p><w:pPr><w:spacing w:before="200" w:after="0"/></w:pPr><w:r><w:t>${SENTINEL}</w:t></w:r></w:p>`;
  return xml.slice(0, pocetakP) + par + xml.slice(pocetakP);
}

/**
 * signNow text tag u ćeliji PUTNIK / ASSIGNOR, iznad linije: kad dokument prođe kroz
 * /document/fieldextract, signNow tu pravi polje za potpis (uloga „Putnik“). Tekst je beo i sitan,
 * pa se ne vidi, a polje prati stvarni položaj linije i kad duži podaci pomere tekst.
 */
function ubaciTagPotpisaPutnika(xml: string) {
  const i = xml.indexOf("PUTNIK / ASSIGNOR");
  if (i === -1) throw new Error("ne nalazim ćeliju PUTNIK / ASSIGNOR u šablonu");
  const linija = xml.indexOf("__________________________________", i);
  if (linija === -1) throw new Error("ne nalazim liniju za potpis putnika");
  const pocetakP = xml.lastIndexOf("<w:p ", linija);
  const par =
    `<w:p><w:pPr><w:spacing w:before="260" w:after="0"/></w:pPr><w:r><w:rPr><w:color w:val="FFFFFF"/>` +
    `<w:sz w:val="4"/></w:rPr><w:t xml:space="preserve">${TAG_POTPISA_PUTNIKA}</w:t></w:r></w:p>`;
  return xml.slice(0, pocetakP) + par + xml.slice(pocetakP);
}

function drawingXml(sirinaPx: number, visinaPx: number) {
  const odnos = sirinaPx && visinaPx ? sirinaPx / visinaPx : 2.4;
  const cy = Math.round(POTPIS_VISINA_IN * EMU);
  const cx = Math.round(cy * odnos);
  return (
    `<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0">` +
    `<wp:extent cx="${cx}" cy="${cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/>` +
    `<wp:docPr id="1001" name="Potpis"/><wp:cNvGraphicFramePr/>` +
    `<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">` +
    `<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">` +
    `<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">` +
    `<pic:nvPicPr><pic:cNvPr id="0" name="vedrana-zunic.png"/><pic:cNvPicPr/></pic:nvPicPr>` +
    `<pic:blipFill><a:blip r:embed="rIdPotpis"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>` +
    `<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm>` +
    `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>` +
    `</pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`
  );
}

/** Dimenzije PNG-a iz IHDR zaglavlja. */
function pngDim(buf: Uint8Array) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  if (buf.length < 24 || dv.getUint32(12) !== 0x49484452) return { w: 0, h: 0 };
  return { w: dv.getUint32(16), h: dv.getUint32(20) };
}

// ── generisanje ───────────────────────────────────────────────────────────
export interface SabloniUgovora {
  odrasli: Uint8Array;
  maloletni: Uint8Array;
  potpis: Uint8Array;
}

function polja(p: PutnikUgovora, let_: LetUgovora, relacija: string) {
  return {
    CLIENT_FULL_NAME: p.ime_prezime,
    CLIENT_DATE_OF_BIRTH: dmY(p.rodjena),
    CLIENT_ADDRESS: p.adresa,
    CLIENT_COUNTRY: DRZAVA,
    LEGAL_REP_FULL_NAME: p.zakonski_zastupnik ?? "",
    ROUTE: relacija,
    FLIGHT_NUMBER: let_.broj,
    AIR_CARRIER: let_.prevozilac,
    FLIGHT_DATE: dmY(let_.datum),
    CLAIM_ID: p.claim_id,
  };
}

/** Naziv fajla isti kao na Macu: „<Prezime> <Ime> - Ugovor o ustupanju.docx“. */
export function nazivUgovora(ime: string) {
  const delovi = ime.trim().split(/\s+/);
  return `${delovi.slice(1).join(" ")} ${delovi[0]} - Ugovor o ustupanju.docx`;
}

/** Popunjen .docx ugovora za jednog putnika, sa potpisom direktorke i signNow tagom. */
export async function napraviUgovor(p: PutnikUgovora, let_: LetUgovora, sabloni: SabloniUgovora): Promise<Uint8Array> {
  const relacija = ruta(let_.od, let_.do, let_.ruta_opis);
  if (!let_.broj || !let_.datum || !let_.prevozilac || !relacija) throw new Error("nepotpuni podaci o letu");
  if (!p.ime_prezime || !p.rodjena || !p.adresa) throw new Error(`${p.ime_prezime || "putnik"}: nepotpuni podaci`);
  if (p.maloletan && !p.zakonski_zastupnik) throw new Error(`${p.ime_prezime}: maloletan, a nema zakonskog zastupnika`);

  const zip = await JSZip.loadAsync(p.maloletan ? sabloni.maloletni : sabloni.odrasli);
  let doc = ujednaciBlokPodataka(ujednaciFont(telesnaLabela(levoPoravnanje(await zip.file("word/document.xml")!.async("string")))));
  for (const [k, v] of Object.entries(polja(p, let_, relacija))) doc = doc.replaceAll(`{{${k}}}`, escXml(v));

  // signNow tag ({{t:…}}) ovde ne upada: nije VELIKIM_SLOVIMA
  const ostali = [...doc.matchAll(/\{\{([A-Z_]+)\}\}/g)].map((m) => m[1]);
  if (ostali.length) throw new Error(`nepopunjeni placeholderi: ${[...new Set(ostali)].join(", ")}`);

  doc = belaPodlogaPotpisa(ubaciSentinel(ubaciTagPotpisaPutnika(doc)));

  const { w, h } = pngDim(sabloni.potpis);
  zip.file("word/media/vedrana-zunic.png", sabloni.potpis);
  const rels = await zip.file("word/_rels/document.xml.rels")!.async("string");
  zip.file(
    "word/_rels/document.xml.rels",
    rels.replace(
      "</Relationships>",
      `<Relationship Id="rIdPotpis" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/vedrana-zunic.png"/></Relationships>`,
    ),
  );
  const ct = await zip.file("[Content_Types].xml")!.async("string");
  if (!ct.includes('Extension="png"')) {
    zip.file("[Content_Types].xml", ct.replace(/(<Types[^>]*>)/, `$1<Default Extension="png" ContentType="image/png"/>`));
  }
  zip.file("word/document.xml", doc.replace(`<w:r><w:t>${SENTINEL}</w:t></w:r>`, drawingXml(w, h)));

  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}
