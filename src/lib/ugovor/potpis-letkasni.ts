/* eslint-disable @typescript-eslint/no-explicit-any -- podaci predmeta su JSON zapis (crm_predmeti.podaci) */
import { createHash, randomUUID } from "node:crypto";

import { crmKlijent } from "@/lib/crm/baza";
import { citajDriveBin, driveFolder, driveUpisiFajl } from "@/lib/drive";
import { getEnv } from "@/lib/env";

import { dmY, nazivUgovora, ugovorHtml, type LetUgovora, type PutnikUgovora } from "./docx";
import { htmlUPdf } from "./pdf";
import { ucitajSablone } from "./sabloni";
import { SAGLASNOST_POTPISA } from "./saglasnost";

/**
 * Naš elektronski potpis (bez signNow-a).
 *
 * Priprema: za svakog putnika PDF ugovora iz šablona (bez potpisa putnika) na Drive „<sistem>/ugovori/<REF>/“,
 * otisak PDF-a i otisak podataka u ugovoru → zapis u predmetu i u crm_potpisi.
 * Potpis: klijent na portalu (lični link iz mejla = identifikacija) potvrdi saglasnost i nacrta potpis → isti ugovor
 * sa potpisom + strana „Dokaz o elektronskom potpisu“ (vreme, IP, uređaj, otisci) → Drive, predmet, crm_potpisi.
 * Kad su svi putnici potpisali: POA_SENT → POA_SIGNED.
 */
const sha256 = (b: Uint8Array | string) => createHash("sha256").update(b).digest("hex");
const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
const MIME_PDF = "application/pdf";

export type ZapisPotpisa = {
  putnik: string;
  stanje: "poslato";
  provajder: "letkasni";
  kanal: "portal";
  zahtev_id: string;
  dokument_id: string;
  pdf_id: string;
  pdf_sha256: string;
  podaci_sha256: string;
  potpisnik: string;
  poslato: null;
};

function putniciUgovora(ref: string, podaci: any): PutnikUgovora[] {
  const svi = [podaci.putnik, ...(podaci.saputnici ?? [])].filter((p: any) => str(p?.ime_prezime));
  const odrasli = svi.filter((p: any) => !p.maloletan);
  return svi.map((p: any, i: number) => ({
    ime_prezime: str(p.ime_prezime)!,
    rodjena: str(p.rodjena),
    adresa: str(p.adresa) ?? str(podaci.putnik?.adresa),
    maloletan: p.maloletan === true,
    zakonski_zastupnik: str(p.zakonski_zastupnik) ?? (p.maloletan ? (str(odrasli[0]?.ime_prezime) ?? null) : null),
    claim_id: `${ref}-${String(i + 1).padStart(2, "0")}`,
  }));
}

const letUgovora = (podaci: any): LetUgovora => ({
  broj: str(podaci.let?.broj),
  datum: str(podaci.let?.datum),
  prevozilac: str(podaci.let?.prevozilac),
  od: str(podaci.let?.od),
  do: str(podaci.let?.do),
  ruta_opis: str(podaci.let?.ruta_opis),
});

/** Otisak tačno onih podataka koji ulaze u ugovor — ako se promene posle pripreme, potpis se ne prihvata. */
const otisakPodataka = (p: PutnikUgovora, l: LetUgovora) =>
  sha256(JSON.stringify([p.ime_prezime, p.rodjena, p.adresa, p.maloletan, p.zakonski_zastupnik, p.claim_id, l.broj, l.datum, l.prevozilac, l.od, l.do]));

async function folderUgovora(ref: string) {
  const koren = getEnv("PIPELINE_DRIVE_FOLDER_ID");
  if (!koren) throw new Error("PIPELINE_DRIVE_FOLDER_ID nije podešen");
  return driveFolder(ref, await driveFolder("ugovori", koren));
}

async function zabelezi(red: Record<string, unknown>) {
  const { error } = await crmKlijent().from("crm_potpisi").insert(red);
  if (error) throw new Error(`crm_potpisi: ${error.message}`);
}

const osnovaImena = (ime: string) => {
  const d = ime.trim().split(/\s+/);
  return `${d.slice(1).join(" ")} ${d[0]}`;
};

export async function pripremiPotpisLetkasni(ref: string, podaci: any): Promise<ZapisPotpisa[]> {
  if (!str(podaci.putnik?.email)) throw new Error("nepotpuno: nema email klijenta");
  const sabloni = await ucitajSablone();
  const l = letUgovora(podaci);
  const folder = await folderUgovora(ref);
  const zapisi: ZapisPotpisa[] = [];
  for (const p of putniciUgovora(ref, podaci)) {
    const pdf = await htmlUPdf(await ugovorHtml(p, l, sabloni));
    const pdfId = await driveUpisiFajl(folder, nazivUgovora(p.ime_prezime).replace(/\.docx$/, " (za potpis).pdf"), pdf, MIME_PDF);
    const zahtev = randomUUID();
    const zapis: ZapisPotpisa = {
      putnik: p.ime_prezime, stanje: "poslato", provajder: "letkasni", kanal: "portal", zahtev_id: zahtev, dokument_id: pdfId,
      pdf_id: pdfId, pdf_sha256: sha256(pdf), podaci_sha256: otisakPodataka(p, l),
      potpisnik: p.maloletan ? (p.zakonski_zastupnik ?? p.ime_prezime) : p.ime_prezime, poslato: null,
    };
    await zabelezi({ ref, putnik: p.ime_prezime, zahtev_id: zahtev, dogadjaj: "pripremljeno", sha256_dokumenta: zapis.pdf_sha256, sha256_podataka: zapis.podaci_sha256, detalji: { pdf_id: pdfId } });
    zapisi.push(zapis);
  }
  return zapisi;
}

const esc = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function dokazHtml(d: { ref: string; p: PutnikUgovora; l: LetUgovora; potpisnik: string; email: string | null; poslato: string | null; vreme: Date; ip: string; ua: string; z: any; slikaSha: string; potpis: string }) {
  const beograd = new Intl.DateTimeFormat("sr-Latn-RS", { timeZone: "Europe/Belgrade", dateStyle: "long", timeStyle: "medium" }).format(d.vreme);
  const red = (sr: string, en: string, v: string, mono = false) =>
    `<tr><td style="padding:5px 8px;border:0.5pt solid #d3d8e2;width:34%;color:#374151"><b>${sr}</b><br><span style="font-size:7.5pt">${en}</span></td><td style="padding:5px 8px;border:0.5pt solid #d3d8e2;${mono ? "font-family:monospace;font-size:7.5pt;word-break:break-all" : ""}">${v}</td></tr>`;
  return `<section style="page-break-before:always;font-size:9pt">
  <h2 style="font-size:13pt;margin:0 0 2px">DOKAZ O ELEKTRONSKOM POTPISU</h2>
  <div style="color:#374151;margin:0 0 10px">ELECTRONIC SIGNATURE CERTIFICATE · letkasni.rs</div>
  <table style="width:100%;border-collapse:collapse">
    ${red("Dokument", "Document", `Ugovor o ustupanju potraživanja · ${esc(d.p.claim_id)}`)}
    ${red("Putnik", "Passenger", esc(d.p.ime_prezime))}
    ${red("Potpisnik", "Signatory", `${esc(d.potpisnik)}${d.p.maloletan ? " (zakonski zastupnik / legal representative)" : ""}`)}
    ${red("Let", "Flight", `${esc(d.l.broj)} · ${esc(d.l.od)} – ${esc(d.l.do)} · ${esc(dmY(d.l.datum))}`)}
    ${red("Način identifikacije", "Identification", `Lični link za potpis poslat na ${esc(d.email ?? "email klijenta")}${d.poslato ? ` (${esc(dmY(d.poslato))})` : ""}`)}
    ${red("Saglasnost", "Consent", esc(SAGLASNOST_POTPISA))}
    ${red("Vreme potpisa", "Signed at", `${esc(beograd)} (Beograd) · ${d.vreme.toISOString()} UTC`)}
    ${red("IP adresa", "IP address", esc(d.ip))}
    ${red("Uređaj i pregledač", "Device / browser", esc(d.ua), true)}
    ${red("Otisak ugovora pre potpisa (SHA-256)", "Document hash before signing", esc(d.z.pdf_sha256), true)}
    ${red("Otisak podataka u ugovoru (SHA-256)", "Contract data hash", esc(d.z.podaci_sha256), true)}
    ${red("Otisak slike potpisa (SHA-256)", "Signature image hash", esc(d.slikaSha), true)}
    ${red("ID zahteva", "Request ID", esc(d.z.zahtev_id), true)}
  </table>
  <div style="margin-top:12px;color:#374151">Potpis / Signature</div>
  <img src="${d.potpis}" alt="" style="height:0.8in;width:auto;border-bottom:0.5pt solid #9ca3af;padding-bottom:4px">
  <p style="margin-top:12px;font-size:7.5pt;color:#6b7280">Otisak celog potpisanog dokumenta čuva se u bazi letkasni.rs (zapisi o potpisu se ne mogu menjati) i može se proveriti ponovnim računanjem SHA-256 nad ovim PDF-om.</p>
</section>`;
}

export type RezultatPotpisa =
  | { ok: true; pdfId: string; sviPotpisali: boolean }
  | { ok: false; razlog: "nema" | "vec_potpisano" | "podaci_promenjeni" | "konflikt" | "greska"; poruka?: string };

export async function potpisiUgovor(u: { ref: string; putnik: string; potpisPng: string; ip: string; userAgent: string }): Promise<RezultatPotpisa> {
  const k = crmKlijent();
  const { data, error } = await k.from("crm_predmeti").select("status,verzija,podaci,pregled").eq("ref", u.ref).maybeSingle();
  if (error || !data) return { ok: false, razlog: error ? "greska" : "nema", poruka: error?.message };
  const podaci = data.podaci as any;
  const z = (podaci.potpisivanje ?? []).find((x: any) => x.putnik === u.putnik && x.provajder === "letkasni");
  if (!z) return { ok: false, razlog: "nema" };
  if (z.stanje === "potpisano") return { ok: false, razlog: "vec_potpisano" };
  if (z.stanje !== "poslato" || data.status !== "POA_SENT") return { ok: false, razlog: "nema" };

  const p = putniciUgovora(u.ref, podaci).find((x) => x.ime_prezime === u.putnik);
  const l = letUgovora(podaci);
  if (!p || otisakPodataka(p, l) !== z.podaci_sha256) return { ok: false, razlog: "podaci_promenjeni" };
  if (sha256(await citajDriveBin(z.pdf_id)) !== z.pdf_sha256) return { ok: false, razlog: "greska", poruka: "PDF za potpis ne odgovara otisku" };

  const vreme = new Date();
  const slikaSha = sha256(Buffer.from(u.potpisPng.split(",")[1] ?? "", "base64"));
  const sabloni = await ucitajSablone();
  const html = (await ugovorHtml(p, l, sabloni, u.potpisPng)) + dokazHtml({ ref: u.ref, p, l, potpisnik: z.potpisnik ?? p.ime_prezime, email: str(podaci.putnik?.email), poslato: z.poslato ?? null, vreme, ip: u.ip, ua: u.userAgent, z, slikaSha, potpis: u.potpisPng });
  const pdf = await htmlUPdf(html);
  const potpisanSha = sha256(pdf);
  const folder = await folderUgovora(u.ref);
  const osnova = osnovaImena(p.ime_prezime);
  const pdfIme = `${osnova} — Ugovor potpisan elektronski.pdf`;
  const dokazIme = `${osnova} — Dokaz o potpisu.json`;
  const pdfId = await driveUpisiFajl(folder, pdfIme, pdf, MIME_PDF);
  const dokaz = { ref: u.ref, putnik: p.ime_prezime, potpisnik: z.potpisnik, zahtev_id: z.zahtev_id, vreme: vreme.toISOString(), ip: u.ip, user_agent: u.userAgent, saglasnost: SAGLASNOST_POTPISA, sha256_pre: z.pdf_sha256, sha256_podataka: z.podaci_sha256, sha256_slike: slikaSha, sha256_potpisanog: potpisanSha, pdf_id: pdfId };
  const dokazId = await driveUpisiFajl(folder, dokazIme, JSON.stringify(dokaz, null, 2), "application/json");
  await zabelezi({ ref: u.ref, putnik: p.ime_prezime, zahtev_id: z.zahtev_id, dogadjaj: "potpisano", sha256_dokumenta: z.pdf_sha256, sha256_podataka: z.podaci_sha256, sha256_potpisanog: potpisanSha, ip: u.ip, user_agent: u.userAgent.slice(0, 400), detalji: { pdf_id: pdfId, dokaz_id: dokazId, sha256_slike: slikaSha } });

  // upis u predmet (optimistično zaključavanje; potpis je već sačuvan i zabeležen, ovo ne sme da ga izgubi)
  for (let pokusaj = 0; pokusaj < 4; pokusaj++) {
    const { data: r } = await k.from("crm_predmeti").select("status,verzija,podaci,pregled").eq("ref", u.ref).maybeSingle();
    if (!r) break;
    const pod = r.podaci as any;
    const datum = vreme.toISOString().slice(0, 10);
    const potpisivanje = (pod.potpisivanje ?? []).map((x: any) =>
      x.zahtev_id === z.zahtev_id ? { ...x, stanje: "potpisano", potpisano: datum, potpisan_pdf: pdfId, audit_trail: dokazId, potpis_sha256: potpisanSha } : x,
    );
    const imena = [pod.putnik, ...(pod.saputnici ?? [])].filter((x: any) => x?.ime_prezime).map((x: any) => x.ime_prezime);
    const sviPotpisali = imena.every((ime: string) => potpisivanje.some((x: any) => x.putnik === ime && x.stanje === "potpisano"));
    const status = sviPotpisali && r.status === "POA_SENT" ? "POA_SIGNED" : r.status;
    const sad = vreme.toISOString();
    const novi = {
      ...pod,
      status,
      potpisivanje,
      dokumenta_fajlovi: [
        ...(pod.dokumenta_fajlovi ?? []),
        { id: pdfId, ime: pdfIme, md5: null, mime: MIME_PDF, izvor: "potpis", dodato: datum },
        { id: dokazId, ime: dokazIme, md5: null, mime: "application/json", izvor: "potpis", dodato: datum },
      ],
      ...(status !== r.status ? { istorija_statusa: { ...(pod.istorija_statusa ?? {}), POA_SIGNED: sad.slice(0, 16).replace("T", " ") }, poslednji_kontakt: datum, poslednji_kontakt_ko: "klijent" } : {}),
    };
    const pregled = r.pregled && typeof r.pregled === "object" && status !== r.status ? { ...(r.pregled as object), status } : r.pregled;
    const { data: izmenjeno } = await k
      .from("crm_predmeti")
      .update({ status, podaci: novi, pregled, verzija: r.verzija + 1, izvor_izmene: "portal" })
      .eq("ref", u.ref)
      .eq("verzija", r.verzija)
      .select("ref");
    if (izmenjeno?.length) return { ok: true, pdfId, sviPotpisali };
  }
  return { ok: false, razlog: "konflikt", poruka: `potpis sačuvan (${pdfId}), upis u predmet nije uspeo` };
}
