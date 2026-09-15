/* eslint-disable @typescript-eslint/no-explicit-any -- test radi nad JSON zapisima */
// node --test src/lib/sistem/test/prolaz.test.ts
// Ceo serverski tok nad izmišljenim predmetima, sa lažnim servisima (baza, Drive, Gmail, signNow, portal).
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

import { ucitajKonfig } from "../konfig.ts";
import { pokreniProlaz } from "../prolaz.ts";
import type { Baza, Drive, Gmail, Posao, PorukaGmail, Potpis, Portal, RedPredmeta, Sabloni, Servisi } from "../servisi.ts";

const FOLDER = "application/vnd.google-apps.folder";
const sat = { v: new Date("2026-09-15T10:00:00Z") }; // 12:00 u Beogradu
const md5 = (b: Uint8Array) => createHash("md5").update(b).digest("hex");

// ── lažna baza ────────────────────────────────────────────────────────────
const predmeti = new Map<string, RedPredmeta>();
const sistem = new Map<string, any>();
const dogadjaji: Array<{ ref: string; poruka: string }> = [];
const letovi: Record<string, any> = {};
const poslovi = new Map<string, Posao>();

const baza: Baza = {
  predmeti: async () => [...predmeti.values()].map((r) => structuredClone(r)),
  predmet: async (ref) => (predmeti.has(ref) ? structuredClone(predmeti.get(ref)!) : null),
  ubaci: async (red) => {
    if (predmeti.has(red.ref)) return false;
    predmeti.set(red.ref, { ref: red.ref, verzija: red.verzija, status: red.status, izvor_izmene: red.izvor_izmene, podaci: red.podaci, pregled: red.pregled });
    return true;
  },
  izmeni: async (ref, verzija, polja) => {
    const r = predmeti.get(ref);
    if (!r || r.verzija !== verzija) return false;
    const n = { ...r };
    for (const k of ["verzija", "status", "izvor_izmene", "podaci", "pregled"] as const) if (polja[k] !== undefined) (n as any)[k] = structuredClone(polja[k]);
    predmeti.set(ref, n);
    return true;
  },
  dogadjaji: async (redovi) => { dogadjaji.push(...redovi); },
  sistem: async (k) => (sistem.has(k) ? structuredClone(sistem.get(k)) : null),
  upisiSistem: async (k, v) => { sistem.set(k, structuredClone(v)); },
  zakljucaj: async (k, doIso) => {
    const x = sistem.get(`brava:${k}`);
    if (x && new Date(x.do) > sat.v) return false;
    sistem.set(`brava:${k}`, { do: doIso });
    return true;
  },
  otkljucaj: async (k) => { sistem.delete(`brava:${k}`); },
  letovi: async () => structuredClone(letovi),
  poslovi: async () => [...poslovi.values()].map((p) => structuredClone(p)),
  dodajPosao: async (p) => {
    if (!poslovi.has(p.id)) poslovi.set(p.id, { ...p, stanje: "ceka", pokusaja: 0, radnik: null, preuzeto: null, rezultat: null, izlaz: null, trosak_usd: null, poslednja_greska: null, kreirano: sat.v.toISOString() } as Posao);
    return structuredClone(poslovi.get(p.id)!);
  },
  izmeniPosao: async (id, polja, ako) => {
    const p = poslovi.get(id);
    if (!p || (ako && p.stanje !== ako)) return false;
    Object.assign(p, polja);
    return true;
  },
};

// ── lažni Drive ───────────────────────────────────────────────────────────
let brojac = 0;
const fajlovi = new Map<string, { id: string; name: string; mimeType: string; parent: string; sadrzaj: Uint8Array }>();
const upisi = async (parent: string, name: string, s: Uint8Array | string, mimeType: string) => {
  const id = `f${++brojac}`;
  fajlovi.set(id, { id, name, mimeType, parent, sadrzaj: typeof s === "string" ? new TextEncoder().encode(s) : s });
  return id;
};
const drive: Drive = {
  folder: async (ime, parent) => [...fajlovi.values()].find((f) => f.parent === parent && f.name === ime && f.mimeType === FOLDER)?.id ?? upisi(parent, ime, "", FOLDER),
  lista: async (id) => [...fajlovi.values()].filter((f) => f.parent === id).map((f) => ({ id: f.id, name: f.name, mimeType: f.mimeType, md5Checksum: f.mimeType === FOLDER ? undefined : md5(f.sadrzaj), createdTime: sat.v.toISOString() })),
  citaj: async (id) => fajlovi.get(id)!.sadrzaj,
  nadji: async (parent, ime) => [...fajlovi.values()].find((f) => f.parent === parent && f.name === ime)?.id ?? null,
  upisi,
  zameni: async (id, s) => { fajlovi.get(id)!.sadrzaj = typeof s === "string" ? new TextEncoder().encode(s) : s; },
  kopiraj: async (id, parent, ime) => upisi(parent, ime, fajlovi.get(id)!.sadrzaj, fajlovi.get(id)!.mimeType),
  premesti: async (id, _od, doId) => { fajlovi.get(id)!.parent = doId; },
};
const putanja = async (...imena: string[]) => {
  let id = "koren";
  for (const i of imena) id = await drive.folder(i, id);
  return id;
};
const uFolderu = (parent: string) => [...fajlovi.values()].filter((f) => f.parent === parent);

// ── lažni Gmail ───────────────────────────────────────────────────────────
const draftovi = new Map<string, any>();
const poslato: any[] = [];   // automatski poslati mejlovi (samo interna pošta)
const threadovi = new Map<string, PorukaGmail[]>();
const gmail: Gmail = {
  ima: () => true,
  aliasi: async () => ["kontakt@letkasni.rs"],
  napraviDraft: async (d) => {
    const id = `draft${++brojac}`;
    const threadId = d.threadId ?? `thread${brojac}`;
    draftovi.set(id, { ...d, threadId });
    return { draftId: id, messageId: `m${brojac}`, threadId };
  },
  posalji: async (m) => { poslato.push(m); return { messageId: `poslato${poslato.length}` }; },
  postojiDraft: async (id) => draftovi.has(id),
  thread: async (t) => threadovi.get(t) ?? [],
  pretrazi: async (q) => [...threadovi.entries()].filter(([, ms]) => ms.some((m) => q.includes(m.od))).map(([t]) => t),
};
/** Niko pošalje draft iz Gmaila. */
function nikoSalje(draftId: string) {
  const d = draftovi.get(draftId);
  draftovi.delete(draftId);
  threadovi.set(d.threadId, [...(threadovi.get(d.threadId) ?? []), { id: `poslato-${draftId}`, threadId: d.threadId, vreme: sat.v.toISOString(), od: "kontakt@letkasni.rs", za: d.to, naslov: d.subject, prilozi: false, draft: false }]);
}

// ── lažni signNow, portal, šabloni ────────────────────────────────────────
const potpisi = new Map<string, "poslato" | "potpisano" | "odbijeno">();
const potpis: Potpis = {
  podesen: () => true,
  status: async (id) => ({ stanje: potpisi.get(id) ?? "poslato", potpisano: potpisi.get(id) === "potpisano" ? sat.v.toISOString() : null }),
  preuzmiPotpisan: async (id) => new TextEncoder().encode(`%PDF potpisan ${id}`),
  preuzmiAudit: async (id) => new TextEncoder().encode(`{"audit":"${id}"}`),
  pdfIzDocx: async () => new TextEncoder().encode("%PDF ugovor"),
};
const link = (ref: string) => `https://staging.letkasni.rs/predmet/v2.${Buffer.from(ref).toString("base64url")}.1799999999.xyz`;
/** Isto što sajt radi posle „Sačuvaj podatke“ (src/lib/ugovor/priprema.ts). */
function sajtPripremaUgovor(ref: string) {
  const r = predmeti.get(ref)!;
  const imena = [r.podaci.putnik, ...(r.podaci.saputnici ?? [])].map((p: any) => p.ime_prezime);
  const podaci = {
    ...r.podaci,
    status: "POA_SENT",
    portal: { ...(r.podaci.portal ?? {}), ugovor_pripremljen: sat.v.toISOString(), potpis_kanal: "portal", pripremio: "sajt" },
    potpisivanje: imena.map((ime: string, i: number) => ({ putnik: ime, stanje: "poslato", provajder: "signnow", kanal: "portal", dokument_id: `doc-${ref}-${i}`, zahtev_id: `z${i}` })),
  };
  predmeti.set(ref, { ...r, status: "POA_SENT", podaci, verzija: r.verzija + 1, izvor_izmene: "portal" });
}
const portal: Portal = {
  pripremi: async (ref) => { sajtPripremaUgovor(ref); return { ok: true }; },
  pozivi: async (ref, predmet) =>
    [predmet.putnik, ...(predmet.saputnici ?? [])].map((p: any, i: number) => ({
      putnik: p.ime_prezime, stanje: "poslato", provajder: "letkasni", kanal: "portal", zahtev_id: `z-${ref}-${i}`, dokument_id: `pdf-${ref}-${i}`, pdf_id: `pdf-${ref}-${i}`, pdf_sha256: "a".repeat(64), podaci_sha256: "b".repeat(64), potpisnik: p.ime_prezime, poslato: null,
    })),
  link,
};

const SABLONI: Record<string, string> = {
  "A-portal": "<!-- test -->\nSubject: AVIO-NAKNADA ZA {{vrsta}} LET {{let}} {{od}} - {{do}}\n\n{{oslovljavanje}} {{vokativ}},\n\nVaš {{let_opis}}:\n\n{{nalaz_tacke}}\n\nPostoji osnov{{iznos_blok}}.\n\n{{link}}\n\nPodrška letkasni.rs\n",
  "A-delay": "Subject: AVIO-NAKNADA ZA POMEREN LET {{let}} {{od}} - {{do}}\n\n{{oslovljavanje}} {{vokativ}},\n\nKasnio {{kasnjenje}}. Pošaljite nam pasoš i boarding kartu.\n\nPodrška letkasni.rs\n",
  "D-dokumenta": "Subject: AVIO-NAKNADA ZA LET {{od}} - {{do}}\n\n{{oslovljavanje}} {{vokativ}},\n\nZa let {{prevozilac_opis}}{{od}} - {{do}} pošaljite nam boarding kartu i ličnu kartu.\n\nPodrška letkasni.rs\n",
  "G-potpis": "Subject: Re: {{postojeci_naslov}}\n\n{{oslovljavanje}} {{vokativ}},\n\nUgovor{{za_koga}} za potpis:\n\n{{link}}\n\nPodrška letkasni.rs\n",
  "B-nema-osnova": "Subject: AVIO-NAKNADA ZA LET {{od}} - {{do}}\n\n{{oslovljavanje}} {{vokativ}},\n\nNema osnova, jer {{razlog}}.\n\n{{nega_pasus}}\n\nPodrška letkasni.rs\n",
  "B-nega-pasus": "Pravo na brigu na aerodromu.\n",
  "E-followup": "Subject: Re: {{postojeci_naslov}}\n\nDobar dan {{vokativ}},\n\n{{sledeci_korak}}\n\nTim letkasni.rs\n",
  "C-other": "Subject: AVIO-NAKNADA ZA LET {{od}} - {{do}}\n\n{{oslovljavanje}} {{vokativ}},\n\nOpišite šta se desilo.\n\nPodrška letkasni.rs\n",
  "G-ugovor": "Subject: Re: {{postojeci_naslov}}\n\n{{oslovljavanje}} {{vokativ}},\n\nU prilogu ugovor{{za_koga}}.{{maloletni_pasus}}\n\nPodrška letkasni.rs\n",
};
const sabloni: Sabloni = { mejl: async (ime) => SABLONI[ime] ?? assert.fail(`nema šablona ${ime}`), ugovor: async () => new TextEncoder().encode("docx") };

const servisi: Servisi = { baza, drive, gmail, internaPosta: gmail, potpis, portal, sabloni, sada: () => sat.v, provere: async () => ({ google_drive: { ok: true, poruka: "test" } }) };
const priloziGmail = await drive.folder("LetKasni prilozi", "moj-drive");   // Apps Script spušta priloge iz Gmaila ovde
const konfig = ucitajKonfig({ SISTEM_OKRUZENJE: "staging", PIPELINE_DRIVE_FOLDER_ID: "koren", SISTEM_PRILOZI_GMAIL_DRIVE_FOLDER_ID: priloziGmail, SISTEM_ADVOKATI_ZA: "advokat@example.com", NEXT_PUBLIC_SITE_URL: "https://staging.letkasni.rs" });
const prolaz = async () => {
  const r = await pokreniProlaz(konfig, servisi, { izvor: "test" });
  assert.ok(r.ok, "prolaz mora da krene");
  assert.equal(r.greske, 0, `prolaz bez grešaka koraka:\n${JSON.stringify(sistem.get("digest")?.tekst ?? "", null, 1)}`);
  return r;
};
const c = (ref: string) => predmeti.get(ref)!;
const posloviZa = (vrsta: string) => [...poslovi.values()].filter((p) => p.vrsta === vrsta);
/** Nikov Mac: agent je završio posao. */
function agentZavrsi(vrsta: string, izlaz: (p: Posao) => void) {
  for (const p of posloviZa(vrsta).filter((x) => x.stanje === "ceka")) {
    izlaz(p);
    Object.assign(p, { stanje: "gotovo", pokusaja: 1 });
  }
}

// ── polazno stanje: dva claim-a sa forme i jedan predmet koji čeka potpis ──
const saForme = (ref: string, ime: string, email: string, let_: any) => predmeti.set(ref, {
  ref, verzija: 1, status: "NEW", izvor_izmene: "sajt", pregled: null,
  podaci: { ref, status: "NEW", putnik: { ime_prezime: ime, email, telefon: "+381600000000" }, let: let_, tip: "delay", prijem: { izvor: "sajt", claim_id: "00000000-0000-0000-0000-000000000001" } },
});
saForme("E2E-A", "Marko Marković", "marko@example.com", { broj: "JU 9138", datum: "2026-08-23", od: "BEG", do: "DLM" });
saForme("E2E-G", "Ana Anić", "ana@example.com", { broj: "W6 4115", datum: "2026-08-21", od: "BCN", do: "BEG" });
predmeti.set("E2E-S", {
  ref: "E2E-S", verzija: 3, status: "POA_SENT", izvor_izmene: "pipeline", pregled: null,
  podaci: {
    ref: "E2E-S", status: "POA_SENT", sistem: { primljeno: "2026-09-01 10:00" }, nalaz: "ELIGIBLE", revizija: "SLAZEM_SE",
    putnik: { ime_prezime: "Jovan Jović", email: "jovan@example.com", pasos: "123456789" }, let: { broj: "JU 1", datum: "2026-08-01", od: "BEG", do: "TIV" },
    potpisivanje: [{ putnik: "Jovan Jović", stanje: "poslato", provajder: "signnow", kanal: "portal", dokument_id: "doc-S" }],
  },
});

const cinjenice = (od: string, doo: string, prevozilac: string, sta: string, vrata: string) => ({
  let: "?", izvori: { a: "https://airportinfo.live/x — vreme", b: "https://trip.com/y — vreme" },
  cinjenice: { tip: "delay", od, do: doo, prevozilac, uzrok: "nepoznat", okidaci: [], kasnjenje: { sta: [sta], vrata: [vrata], izvori_stvarno: 2 } },
});

test("1. prvi prolaz: prijem sa forme, poslovi za agente, potpis sa signNow-a", async () => {
  potpisi.set("doc-S", "potpisano");
  await prolaz();
  assert.ok(c("E2E-A").podaci.sistem.primljeno && c("E2E-A").podaci.dokumenta, "predmet sa forme dopunjen do punog zapisa");
  assert.deepEqual(posloviZa("provera-leta").map((p) => [p.ref, p.stanje]).sort(), [["JU9138_2026-08-23", "ceka"], ["W64115_2026-08-21", "ceka"]]);
  assert.equal(c("E2E-A").status, "NEW");
  assert.equal(c("E2E-S").status, "POA_SIGNED");
  assert.equal(c("E2E-S").podaci.dokumenta_fajlovi.length, 2, "potpisan PDF i audit trail u dokumentima predmeta");
  const advokati = await putanja("dokumenta klijenata (test)");
  assert.equal(uFolderu(advokati).length, 1, "mesec");
  assert.ok(c("E2E-S").podaci.drive_folder.startsWith("2026-09 septembar/01 Jovan Jović"));
  assert.equal(c("E2E-S").podaci.pasos, undefined);
  assert.equal(c("E2E-S").podaci.putnik.pasos, undefined, "broj pasoša ne ide u bazu");
});

test("2. Mac ugašen: poslovi čekaju, predmeti se preskaču, ništa se ne duplira", async () => {
  const pre = poslovi.size;
  await prolaz();
  assert.equal(poslovi.size, pre);
  assert.equal(c("E2E-A").status, "NEW");
  assert.equal(draftovi.size, 0);
});

test("3. agent sakupio činjenice → nalaz iz koda, posao za Revizora", async () => {
  agentZavrsi("provera-leta", (p) => {
    letovi[p.ref] = p.ref.startsWith("JU")
      ? cinjenice("BEG", "DLM", "JU", "2026-08-23T09:50+03:00", "2026-08-23T14:10+03:00")   // 260 min
      : cinjenice("BCN", "BEG", "W6", "2026-08-21T12:00+02:00", "2026-08-21T14:25+02:00");  // 145 min
  });
  await prolaz();
  assert.equal(c("E2E-A").status, "VERIFIED");
  assert.equal(c("E2E-A").podaci.nalaz, "ELIGIBLE");
  assert.equal(c("E2E-A").podaci.iznos_eur, 250);
  assert.equal(c("E2E-G").podaci.nalaz, "NOT_ELIGIBLE");
  assert.equal(posloviZa("revizija").filter((p) => p.stanje === "ceka").length, 2);
});

test("4. Revizor se slaže → prvi mejl traži dokumenta (bez linka), B za let bez osnova", async () => {
  agentZavrsi("revizija", (p) => { letovi[`${p.ulaz.let_kljuc}-revizija`] = { zakljucak: "SLAZEM_SE", razlog: "izvori potvrđuju", hes_cinjenica: p.ulaz.hes, stavke: [] }; });
  await prolaz();
  assert.equal(c("E2E-A").status, "DRAFTED");
  assert.equal(c("E2E-G").status, "NOT_ELIGIBLE");
  const a = [...draftovi.values()].find((d) => d.to.includes("marko@example.com"));
  const b = [...draftovi.values()].find((d) => d.to.includes("ana@example.com"));
  assert.equal(draftovi.size, 2);
  assert.match(a.subject, /^\[STAGING\] AVIO-NAKNADA ZA POMEREN LET JU 9138 BEG - DLM$/, "staging draft nosi oznaku u naslovu");
  assert.ok(a.body.includes("pasoš") && !a.body.includes("/predmet/"), "traži dokumenta, bez linka za potpis");
  assert.ok(!/EUR|€/.test(a.body), "iznos nije odobren — nema EUR");
  assert.ok(!/otkaz/i.test(a.body));
  assert.match(b.body, /^Poštovana Ana,/);
  assert.ok(b.body.includes("tri sata"));
});

test("5. Niko poslao draft → SENT → AWAITING_DOCS, follow-up zakazan", async () => {
  nikoSalje(c("E2E-A").podaci.sistem.draftovi[0].draft_id);
  await prolaz();
  assert.equal(c("E2E-A").status, "AWAITING_DOCS");
  assert.equal(c("E2E-A").podaci.poslednji_kontakt_ko, "mi");
  assert.ok(c("E2E-A").podaci.followup > "2026-09-15");
});

test("6. klijent odgovorio sa dokumentima → prilozi sa Drive-a u predmet, posao za agenta; zaglavljen posao se vraća", async () => {
  sat.v = new Date("2026-09-15T11:00:00Z");
  const thread = c("E2E-A").podaci.sistem.draftovi[0].thread_id;
  threadovi.set(thread, [...(threadovi.get(thread) ?? []), { id: "odgovor-1", threadId: thread, vreme: sat.v.toISOString(), od: "marko@example.com", za: ["kontakt@letkasni.rs"], naslov: "Re: AVIO-NAKNADA", prilozi: true, draft: false }]);
  const folder = await drive.folder(thread, priloziGmail);
  await upisi(folder, "a1b2c3_pasos.jpg", "slika pasosa", "image/jpeg");
  await upisi(folder, "a1b2c3_boarding.pdf", "%PDF karta", "application/pdf");
  await upisi(folder, "a1b2c3_META.txt", "od: marko@example.com", "text/plain");
  await prolaz();
  assert.equal(c("E2E-A").status, "CLIENT_REPLIED");
  assert.deepEqual(c("E2E-A").podaci.dokumenta_fajlovi.map((f: any) => f.ime).sort(), ["a1b2c3_boarding.pdf", "a1b2c3_pasos.jpg"]);
  assert.ok(c("E2E-A").podaci.drive_folder?.includes("Marko Marković"), "folder za advokate napravljen čim su stigla dokumenta");
  const p = posloviZa("dokumenta").find((x) => x.ref === "E2E-A") ?? assert.fail("posao za agenta Dokumenta");
  assert.equal(p.stanje, "ceka");
  Object.assign(p, { stanje: "radi", pokusaja: 1, preuzeto: new Date(sat.v.getTime() - 2 * 3600_000).toISOString() });
  await prolaz();
  assert.equal(p.stanje, "ceka");
  assert.equal(p.pokusaja, 0);
});

test("7. agent pročitao dokumenta sigurno → ugovor i poziv za potpis → draft sa linkom za potpis", async () => {
  agentZavrsi("dokumenta", (p) => {
    p.izlaz = {
      fajlovi: [{ fajl: "pasos.jpg", vrsta: "pasos", putnik: "Marko Marković" }, { fajl: "boarding.pdf", vrsta: "boarding", putnik: "Marko Marković" }],
      putnici: [{ ime_prezime: "Marko Marković", ime_sigurno: true, rodjena: "1985-04-12", rodjena_sigurno: true, adresa: "Bulevar 1, Beograd", adresa_sigurno: true, maloletan: false }],
      let_sa_karte: { broj: "JU 9138", datum: "2026-08-23", od: "BEG", do: "DLM" }, neslaganja: [], sta_fali: [],
    };
  });
  await prolaz();
  const x = c("E2E-A");
  assert.equal(x.status, "POA_DRAFTED");
  assert.equal(x.podaci.putnik.rodjena, "1985-04-12", "datum rođenja sa dokumenta");
  assert.deepEqual(x.podaci.potpisivanje.map((z: any) => [z.putnik, z.stanje, z.kanal, z.provajder]), [["Marko Marković", "poslato", "portal", "letkasni"]]);
  const g = [...draftovi.values()].find((d) => d.to.includes("marko@example.com") && d.subject.includes("Re: "));
  assert.equal(g?.subject.match(/\[STAGING\]/g)?.length, 1, "oznaka se ne ponavlja u odgovoru");
  assert.ok(g, "drugi mejl je odgovor u istom threadu");
  assert.ok(g.body.includes("https://staging.letkasni.rs/predmet/v2."), "link za potpis u mejlu");
  assert.equal((g.prilozi ?? []).length, 0, "bez PDF-a u prilogu — potpis je na linku");
  assert.deepEqual([x.pregled.korak.broj, x.pregled.korak.ko], [12, "ti"], "CRM: korak 12 od 14, na tebi");
});

test("8. Niko poslao link → POA_SENT; klijent potpisao → POA_SIGNED i jedan dnevni pregled za advokate", async () => {
  const g = c("E2E-A").podaci.sistem.draftovi.find((d: any) => d.sablon === "G-potpis");
  nikoSalje(g.draft_id);
  await prolaz();
  assert.equal(c("E2E-A").status, "POA_SENT");
  assert.equal(c("E2E-A").podaci.potpisivanje[0].poslato, "2026-09-15");
  // klijent potpiše na portalu: sajt (src/lib/ugovor/potpis-letkasni.ts) upiše potpis, dokument i POA_SIGNED
  const r = c("E2E-A");
  const pdfId = await upisi(await putanja("ugovori", "E2E-A"), "Marković Marko — Ugovor potpisan elektronski.pdf", "%PDF potpisan", "application/pdf");
  predmeti.set("E2E-A", {
    ...r, status: "POA_SIGNED", verzija: r.verzija + 1, izvor_izmene: "portal",
    podaci: {
      ...r.podaci, status: "POA_SIGNED",
      potpisivanje: r.podaci.potpisivanje.map((z: any) => ({ ...z, stanje: "potpisano", potpisano: "2026-09-15", potpisan_pdf: pdfId })),
      dokumenta_fajlovi: [...r.podaci.dokumenta_fajlovi, { id: pdfId, ime: "Marković Marko — Ugovor potpisan elektronski.pdf", md5: null, izvor: "potpis", dodato: "2026-09-15" }],
    },
  });
  await prolaz();
  assert.equal(c("E2E-A").status, "POA_SIGNED");
  assert.ok(c("E2E-A").podaci.potpisivanje[0].u_folderu, "potpisan ugovor predat u folder za advokate");
  assert.ok(Object.values(c("E2E-A").podaci.drive_prilozi).includes("Marković Marko — Ugovor potpisan elektronski.pdf"));
  const zaAdvokate = poslato.filter((d) => d.to.includes("advokat@example.com"));
  assert.equal(zaAdvokate.length, 1, "jedan automatski poslat mejl");
  assert.ok(![...draftovi.values()].some((d) => d.to.includes("advokat@example.com")), "advokatima ne ide draft");
  assert.match(zaAdvokate[0].body, /potpisan ugovor o ustupanju: Marko Marković/);
  assert.match(zaAdvokate[0].body, /Marko Marković[\s\S]*Folder: https:\/\/drive\.google\.com\/drive\/folders\/f\d+/, "link ka folderu predmeta");
  assert.ok(!/@example\.com/.test(zaAdvokate[0].body), "pregled za advokate bez email adresa klijenata");
});

test("9. dnevni pregled: isti dan ništa, sutra jedan mejl sa novim, prekosutra ništa", async () => {
  const zaAdvokate = () => poslato.filter((d) => d.to.includes("advokat@example.com"));
  const s = c("E2E-S");
  predmeti.set("E2E-S", { ...s, status: "LAWYER", podaci: { ...s.podaci, status: "LAWYER", prosledjeno_advokatu: "2026-09-15" }, verzija: s.verzija + 1, izvor_izmene: "rucno" });
  await prolaz();
  assert.equal(zaAdvokate().length, 1, "danas je pregled već otišao");
  sat.v = new Date("2026-09-16T10:00:00Z");
  await prolaz();
  assert.equal(zaAdvokate().length, 2);
  assert.match(zaAdvokate()[1].body, /IZMENE OD POSLEDNJEG PREGLEDA \(1\)[\s\S]*predmet je predat advokatu/);
  sat.v = new Date("2026-09-17T10:00:00Z");
  await prolaz();
  assert.equal(zaAdvokate().length, 2, "nema ništa novo → ne šalje");
});

test("10. dva prolaza u isto vreme: drugi odustaje", async () => {
  sistem.set("brava:prolaz", { do: new Date(sat.v.getTime() + 60_000).toISOString() });
  const r = await pokreniProlaz(konfig, servisi, {});
  assert.equal(r.ok, false);
  sistem.delete("brava:prolaz");
});

test("11. suvi prolaz ništa ne menja", async () => {
  const snimak = JSON.stringify([...predmeti.values()]);
  const r = await pokreniProlaz(konfig, servisi, { suvo: true });
  assert.ok(r.ok);
  assert.equal(JSON.stringify([...predmeti.values()]), snimak);
});

test("12. CRM pregled: svaki predmet ima red, bez mejlova i ličnih brojeva", () => {
  for (const r of predmeti.values()) {
    assert.ok(r.pregled, `${r.ref} ima red za pregled`);
    assert.ok(!/@|pasos|rodjena|adresa/.test(JSON.stringify(r.pregled)), `${r.ref}: pregled bez ličnih podataka`);
  }
  assert.ok(Array.isArray(sistem.get("zadaci")));
  assert.equal(sistem.get("sistem").okruzenje, "staging");
  assert.equal(sistem.get("sistem").provere.google_drive.ok, true, "provere pristupa upisane za CRM");
});

test("13. forma bez broja leta: agent pronađe jedini let tog dana; kad ih je više, mejl traži dokumenta", async () => {
  const bezBroja = (datum: string) => ({ broj: null, datum, od: "BCN", do: "BEG", ruta_opis: "Barcelona (BCN) → Belgrade (BEG); Wizz Air; direct" });
  saForme("E2E-R", "Marko Marković", "r@example.com", bezBroja("2026-08-21"));
  saForme("E2E-M", "Ana Anić", "m@example.com", bezBroja("2026-08-22"));
  await prolaz();
  const posao = posloviZa("provera-leta").find((p) => p.ref === "RUTA_BCN-BEG_2026-08-21");
  assert.equal(posao?.ulaz.pronadji_broj, true, "posao za agenta traži broj leta");
  assert.equal(posao?.ulaz.let.prevozilac, "Wizz Air", "prevozilac iz teksta rute");
  assert.equal(c("E2E-R").pregled.korak.naziv, "Agent traži broj leta i proverava let");

  agentZavrsi("provera-leta", (p) => {
    if (p.ref === "RUTA_BCN-BEG_2026-08-21") letovi[p.ref] = { ...cinjenice("BCN", "BEG", "W6", "2026-08-21T12:00+02:00", "2026-08-21T16:30+02:00"), let: "W6 4115", pronalazenje: { jednoznacno: true } };
    if (p.ref === "RUTA_BCN-BEG_2026-08-22") letovi[p.ref] = { pronalazenje: { jednoznacno: false, kandidati: [{ broj: "W64115", polazak: "06:10" }, { broj: "W6 4117", polazak: "18:40" }] } };
  });
  await prolaz();
  assert.equal(c("E2E-R").podaci.let.broj, "W6 4115");
  assert.equal(c("E2E-R").status, "VERIFIED", "pronađen let ide dalje u proveru");
  assert.equal(c("E2E-M").status, "DRAFTED");
  const d = [...draftovi.values()].find((x) => x.to.includes("m@example.com"));
  assert.ok(d?.body.includes("boarding kartu") && d.body.includes("Wizz Air BCN - BEG"), "mejl traži dokumenta za taj let");
  assert.ok(!/W6 41|broj leta/i.test(d.body), "mejl ne pita za tačan let i ne nabraja letove");
  assert.ok(!/postoji osnov|EUR/i.test(d.body), "bez tvrdnje o osnovu i bez iznosa");
});

test("14. let bez stvarnog vremena (star let): bez revizora, mejl traži dokumenta", async () => {
  saForme("E2E-V", "Marko Marković", "v@example.com", { broj: "W6 4124", datum: "2026-03-08", od: "BGY", do: "BEG" });
  await prolaz();
  agentZavrsi("provera-leta", (p) => {
    if (p.ref === "W64124_2026-03-08") letovi[p.ref] = { izvori: {}, cinjenice: { tip: "delay", od: "BGY", do: "BEG", prevozilac: "W6", uzrok: "nepoznat", okidaci: [], kasnjenje: { izvori_stvarno: 0 } } };
  });
  await prolaz();
  assert.equal(c("E2E-V").podaci.nalaz, "POTENTIALLY_ELIGIBLE");
  assert.ok(!posloviZa("revizija").some((p) => p.ref === "W64124_2026-03-08"), "revizor se ne pokreće");
  assert.equal(c("E2E-V").status, "DRAFTED");
  const d = [...draftovi.values()].find((x) => x.to.includes("v@example.com"));
  assert.ok(d?.body.includes("boarding kartu") && !/postoji osnov|EUR/i.test(d.body), "traži dokumenta, bez tvrdnje o osnovu");
});
