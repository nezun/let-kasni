/**
 * Minimalni renderer OOXML → HTML, taman koliko ugovor o ustupanju koristi (prepis pipeline punomoc/docx-html.mjs).
 *
 * PDF za klijenta mora da izgleda kao .docx šablon. Umesto da se ugovor ručno prepisuje u HTML (pa da se tiho
 * razidje čim neko izmeni .docx), HTML se generiše IZ samog .docx-a. Šablon ostaje jedini izvor istine.
 * Podržano: w:p (pStyle, spacing, jc, ind), w:r (b, color, sz), w:t, w:br, w:tab, w:tbl (tblBorders, tblGrid, tcPr shd/tcMar).
 */
const TWIP = (t: string | number) => `${(Number(t) / 1440).toFixed(3)}in`;
const HALFPT = (s: string) => `${Number(s) / 2}pt`;

const dec = (s: string) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
const enc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const atr = (frag: string, tag: string, name: string) => frag.match(new RegExp(`<w:${tag}\\b[^>]*\\sw:${name}="([^"]*)"`))?.[1] ?? null;
const ima = (frag: string, tag: string) => new RegExp(`<w:${tag}\\s*/>|<w:${tag}\\b[^>]*/>`).test(frag);

type Blok = { pocetak: number; kraj: number; unutra: string };
type Ugradi = ((tekst: string) => string | null) | null;

/** Prvi <w:xxx> … </w:xxx> blok, poštujući ugnježdavanje. */
function blok(xml: string, tag: string, od = 0): Blok | null {
  const otvori = new RegExp(`<w:${tag}(?:\\s[^>]*)?>`, "g");
  otvori.lastIndex = od;
  const prvi = otvori.exec(xml);
  if (!prvi) return null;
  const zatvori = `</w:${tag}>`;
  let dubina = 1;
  const skener = new RegExp(`<w:${tag}(?:\\s[^>]*)?>|</w:${tag}>`, "g");
  skener.lastIndex = otvori.lastIndex;
  let m: RegExpExecArray | null;
  while ((m = skener.exec(xml))) {
    dubina += m[0] === zatvori ? -1 : 1;
    if (dubina === 0) return { pocetak: prvi.index, kraj: m.index + zatvori.length, unutra: xml.slice(otvori.lastIndex, m.index) };
  }
  return null;
}

function sviBlokovi(xml: string, tag: string) {
  const out: Blok[] = [];
  let i = 0;
  for (;;) {
    const b = blok(xml, tag, i);
    if (!b) break;
    out.push(b);
    i = b.kraj;
  }
  return out;
}

function stilRuna(rPr: string) {
  const s: string[] = [];
  if (ima(rPr, "b")) s.push("font-weight:700");
  const boja = atr(rPr, "color", "val");
  if (boja && boja !== "auto") s.push(`color:#${boja}`);
  const sz = atr(rPr, "sz", "val");
  if (sz) s.push(`font-size:${HALFPT(sz)}`);
  if (ima(rPr, "i")) s.push("font-style:italic");
  if (ima(rPr, "u")) s.push("text-decoration:underline");
  return s.join(";");
}

function runovi(p: string, ugradi: Ugradi) {
  let html = "";
  for (const r of sviBlokovi(p, "r")) {
    const rPrB = blok(r.unutra, "rPr");
    let telo = "";
    let ugradjeno = false;
    for (const d of r.unutra.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|<w:br\s*\/>|<w:tab\s*\/>/g)) {
      if (d[0].startsWith("<w:br")) {
        telo += "<br>";
        continue;
      }
      if (d[0].startsWith("<w:tab")) {
        telo += "<span class='tab'></span>";
        continue;
      }
      const tekst = dec(d[1]);
      const zamenjen = ugradi ? ugradi(tekst) : null;
      if (zamenjen != null) ugradjeno = true;
      telo += zamenjen ?? enc(tekst);
    }
    if (!telo) continue;
    // ugrađen sadržaj (potpis) ne nasleđuje stil runa — tag za potpis je beo i sitan
    const st = ugradjeno ? "" : stilRuna(rPrB ? rPrB.unutra : "");
    html += st ? `<span style="${st}">${telo}</span>` : telo;
  }
  return html;
}

function paragraf(p: string, stilovi: Record<string, string>, ugradi: Ugradi) {
  const pPrB = blok(p, "pPr");
  const pPr = pPrB ? pPrB.unutra : "";
  const telo = runovi(pPrB ? p.slice(pPrB.kraj) : p, ugradi);
  const st: string[] = [];
  const pStyle = atr(pPr, "pStyle", "val");
  if (pStyle && stilovi[pStyle]) st.push(stilovi[pStyle]);
  const jc = atr(pPr, "jc", "val");
  if (jc) st.push(`text-align:${jc === "both" ? "justify" : jc}`);
  const pre = atr(pPr, "spacing", "before");
  const posle = atr(pPr, "spacing", "after");
  st.push(`margin-top:${pre ? TWIP(pre) : "0"}`);
  st.push(`margin-bottom:${posle ? TWIP(posle) : "0.042in"}`);
  const levo = atr(pPr, "ind", "left");
  const viseci = atr(pPr, "ind", "hanging");
  if (levo) st.push(`padding-left:${TWIP(levo)}`);
  if (viseci) st.push(`text-indent:-${TWIP(viseci)}`);
  return `<p style="${st.join(";")}">${telo || "&nbsp;"}</p>`;
}

function telaCelije(xml: string, stilovi: Record<string, string>, ugradi: Ugradi) {
  let html = "";
  let i = 0;
  for (;;) {
    const p = blok(xml, "p", i);
    if (!p) break;
    html += paragraf(p.unutra, stilovi, ugradi);
    i = p.kraj;
  }
  return html;
}

function tabela(t: string, stilovi: Record<string, string>, ugradi: Ugradi) {
  const tblPrB = blok(t, "tblPr");
  const tblPr = tblPrB ? tblPrB.unutra : "";
  const ivica = tblPr.match(/<w:top w:val="single"[^>]*w:color="([0-9A-Fa-f]{6})"/);
  const bojaIvice = ivica ? `#${ivica[1]}` : "#d3d8e2";
  const kolone = [...t.matchAll(/<w:gridCol w:w="(\d+)"/g)].map((m) => m[1]);
  const ukupno = kolone.reduce((a, b) => a + Number(b), 0) || 1;

  let html = `<table style="width:100%;border-collapse:collapse;margin:0.06in 0"><colgroup>`;
  for (const k of kolone) html += `<col style="width:${((Number(k) / ukupno) * 100).toFixed(2)}%">`;
  html += "</colgroup><tbody>";
  for (const tr of sviBlokovi(t, "tr")) {
    html += "<tr>";
    for (const tc of sviBlokovi(tr.unutra, "tc")) {
      const tcPrB = blok(tc.unutra, "tcPr");
      const tcPr = tcPrB ? tcPrB.unutra : "";
      const fill = atr(tcPr, "shd", "fill");
      const marB = blok(tcPr, "tcMar");
      const mar = marB ? marB.unutra : "";
      const pad = ["top", "right", "bottom", "left"]
        .map((k) => {
          const m = mar.match(new RegExp(`<w:${k} w:w="(\\d+)"`));
          return m ? TWIP(m[1]) : "0.08in";
        })
        .join(" ");
      const st = [`border:0.5pt solid ${bojaIvice}`, `padding:${pad}`, "vertical-align:top"];
      if (fill && fill !== "auto") st.push(`background:#${fill}`);
      html += `<td style="${st.join(";")}">${telaCelije(tcPrB ? tc.unutra.slice(tcPrB.kraj) : tc.unutra, stilovi, ugradi)}</td>`;
    }
    html += "</tr>";
  }
  return `${html}</tbody></table>`;
}

function procitajStilove(stylesXml: string) {
  const out: Record<string, string> = {};
  for (const m of stylesXml.matchAll(/<w:style [^>]*w:styleId="([^"]+)">([\s\S]*?)<\/w:style>/g)) {
    const [, id, telo] = m;
    const s: string[] = [];
    const rPrB = blok(telo, "rPr");
    const rPr = rPrB ? rPrB.unutra : "";
    if (ima(rPr, "b")) s.push("font-weight:700");
    const boja = atr(rPr, "color", "val");
    if (boja) s.push(`color:#${boja}`);
    const sz = atr(rPr, "sz", "val");
    if (sz) s.push(`font-size:${HALFPT(sz)}`);
    if (s.length) out[id] = s.join(";");
  }
  return out;
}

/** HTML ugovora spreman za štampu u PDF (A4 margine iz sectPr). `ugradi` menja sentinel tokene (potpisi → <img>). */
export function docxUHtml(documentXml: string, stylesXml: string, footerXml = "", ugradi: Ugradi = null) {
  const stilovi = procitajStilove(stylesXml);
  const body = blok(documentXml, "body");
  const xml = body ? body.unutra : documentXml;

  const sect = blok(xml, "sectPr");
  const s = sect ? sect.unutra : "";
  const sirina = atr(s, "pgSz", "w") ?? 12240;
  const visina = atr(s, "pgSz", "h") ?? 15840;
  const m = { top: atr(s, "pgMar", "top") ?? 709, right: atr(s, "pgMar", "right") ?? 680, bottom: atr(s, "pgMar", "bottom") ?? 709, left: atr(s, "pgMar", "left") ?? 680 };

  const delovi: string[] = [];
  let i = 0;
  for (;;) {
    const p = blok(xml, "p", i);
    const t = blok(xml, "tbl", i);
    const sledeci = [p, t].filter((x): x is Blok => !!x).sort((a, b) => a.pocetak - b.pocetak)[0];
    if (!sledeci) break;
    if (sledeci === t) delovi.push(tabela(t.unutra, stilovi, ugradi));
    else if (p && (!sect || sledeci.pocetak !== sect.pocetak)) delovi.push(paragraf(p.unutra, stilovi, ugradi));
    i = sledeci.kraj;
  }
  // Word čuva gomilu praznih paragrafa na kraju; u PDF-u to postaju prazne strane.
  while (delovi.length && /^<p[^>]*>(&nbsp;)?<\/p>$/.test(delovi[delovi.length - 1])) delovi.pop();

  const podnozje = footerXml ? telaCelije(blok(footerXml, "ftr")?.unutra ?? "", stilovi, ugradi) : "";

  return `<style>
  @page { size:${TWIP(sirina)} ${TWIP(visina)}; margin:${TWIP(m.top)} ${TWIP(m.right)} ${TWIP(m.bottom)} ${TWIP(m.left)}; }
  html,body { margin:0; padding:0; }
  body { font-family:Arimo,Arial,Helvetica,sans-serif; font-size:9pt; line-height:1.042; color:#000; }
  p { margin:0; }
  table { page-break-inside:auto; }
  tr { page-break-inside:auto; }
  main > table:last-of-type tr { page-break-inside:avoid; }
  .tab { display:inline-block; width:0.35in; }
  .potpis-slika { display:block; height:0.62in; width:auto; max-width:100%; margin:0 0 -0.06in 0; }
  .potpis-prazno { display:block; height:0.62in; }
  footer { position:fixed; bottom:0; left:0; right:0; }
</style>
<main>${delovi.join("")}</main>${podnozje ? `<footer>${podnozje}</footer>` : ""}`;
}
