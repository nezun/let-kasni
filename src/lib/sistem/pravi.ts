import { randomUUID } from "node:crypto";

import { crmKlijent } from "@/lib/crm/baza";
import {
  citajDriveBin, driveAccessToken, driveFolder, driveKopiraj, driveLista, driveNadjiFajl, drivePremesti, driveUpisiFajl, driveZameni, jeDrivePodesen,
} from "@/lib/drive";
import { getEnv } from "@/lib/env";
import { napraviTokenDokumenata } from "@/lib/pipeline/token";
import { jeSignNowPodesen, pdfIzDocx, planSignNow, preuzmiAuditTrail, preuzmiPotpisanPdf, stanjePotpisa } from "@/lib/potpis/signnow";
import { napraviUgovor } from "@/lib/ugovor/docx";
import { napraviPoziveZaPotpis, pripremiUgovorZaPotpis } from "@/lib/ugovor/priprema";
import { pripremiPotpisLetkasni } from "@/lib/ugovor/potpis-letkasni";
import { ucitajSablone } from "@/lib/ugovor/sabloni";

import type { Konfig } from "./konfig";
import type { Baza, Drive, Gmail, Posao, PorukaGmail, Potpis, Portal, Prilog, RedPredmeta, Sabloni, Servisi } from "./servisi";

/** Prave implementacije servisa za serverski prolaz: Supabase (CRM), Google Drive i Gmail, signNow. */

function pravaBaza(): Baza {
  const k = () => crmKlijent();
  const greska = (sta: string, e: { message: string } | null) => {
    if (e) throw new Error(`CRM ${sta}: ${e.message}`);
  };
  return {
    async predmeti() {
      const out: RedPredmeta[] = [];
      for (let od = 0; ; od += 1000) {
        const { data, error } = await k().from("crm_predmeti").select("ref,verzija,status,izvor_izmene,podaci,pregled").order("ref").range(od, od + 999);
        greska("predmeti", error);
        out.push(...((data ?? []) as RedPredmeta[]));
        if ((data ?? []).length < 1000) return out;
      }
    },
    async predmet(ref) {
      const { data, error } = await k().from("crm_predmeti").select("ref,verzija,status,izvor_izmene,podaci,pregled").eq("ref", ref).maybeSingle();
      greska("predmet", error);
      return (data as RedPredmeta | null) ?? null;
    },
    async ubaci(red) {
      const { error } = await k().from("crm_predmeti").insert(red);
      if (error?.code === "23505") return false;
      greska("upis predmeta", error);
      return true;
    },
    async izmeni(ref, verzija, polja) {
      const { data, error } = await k().from("crm_predmeti").update(polja).eq("ref", ref).eq("verzija", verzija).select("ref");
      greska("izmena predmeta", error);
      return (data ?? []).length === 1;
    },
    async dogadjaji(redovi) {
      if (!redovi.length) return;
      const { error } = await k().from("crm_dogadjaji").insert(redovi);
      greska("događaji", error);
    },
    async sistem(kljuc) {
      const { data, error } = await k().from("crm_sistem").select("vrednost").eq("kljuc", kljuc).maybeSingle();
      greska("sistem", error);
      return data?.vrednost ?? null;
    },
    async upisiSistem(kljuc, vrednost) {
      const { error } = await k().from("crm_sistem").upsert({ kljuc, vrednost });
      greska("sistem upis", error);
    },
    async zakljucaj(kljuc, doIso) {
      const ime = `brava:${kljuc}`;
      const { error } = await k().from("crm_sistem").insert({ kljuc: ime, vrednost: { do: doIso } });
      if (!error) return true;
      if (error.code !== "23505") greska("brava", error);
      const { data } = await k().from("crm_sistem").select("vrednost").eq("kljuc", ime).maybeSingle();
      const staro = (data?.vrednost as { do?: string } | undefined)?.do;
      if (staro && new Date(staro).getTime() > Date.now()) return false;
      const { data: preuzeto } = await k().from("crm_sistem").update({ vrednost: { do: doIso } }).eq("kljuc", ime).eq("vrednost->>do", staro ?? "").select("kljuc");
      return (preuzeto ?? []).length === 1;
    },
    async otkljucaj(kljuc) {
      await k().from("crm_sistem").delete().eq("kljuc", `brava:${kljuc}`);
    },
    async letovi() {
      const { data, error } = await k().from("crm_letovi").select("kljuc,podaci").limit(10000);
      greska("letovi", error);
      return Object.fromEntries((data ?? []).map((r) => [r.kljuc, r.podaci]));
    },
    async poslovi() {
      const { data, error } = await k().from("crm_poslovi").select("*").order("kreirano").limit(10000);
      greska("poslovi", error);
      return (data ?? []) as Posao[];
    },
    async dodajPosao(p) {
      const { error } = await k().from("crm_poslovi").upsert({ ...p, stanje: "ceka", pokusaja: 0 }, { onConflict: "id", ignoreDuplicates: true });
      greska("nov posao", error);
      const { data, error: e2 } = await k().from("crm_poslovi").select("*").eq("id", p.id).single();
      greska("nov posao", e2);
      return data as Posao;
    },
    async izmeniPosao(id, polja, akoJeStanje) {
      let upit = k().from("crm_poslovi").update(polja).eq("id", id);
      if (akoJeStanje) upit = upit.eq("stanje", akoJeStanje);
      const { data, error } = await upit.select("id");
      greska("izmena posla", error);
      return (data ?? []).length === 1;
    },
  };
}

const praviDrive = (): Drive => ({
  folder: driveFolder,
  lista: driveLista,
  citaj: citajDriveBin,
  nadji: driveNadjiFajl,
  upisi: driveUpisiFajl,
  zameni: driveZameni,
  kopiraj: driveKopiraj,
  premesti: drivePremesti,
});

// ── Gmail (isti OAuth token kao Drive, sa gmail.readonly i gmail.compose) ──
const GMAIL = "https://gmail.googleapis.com/gmail/v1/users/me";
const kodiranaRec = (s: string) => (/^[\x20-\x7E]*$/.test(s) ? s : `=?UTF-8?B?${Buffer.from(s, "utf8").toString("base64")}?=`);
const prelomi = (b64: string) => (b64.match(/.{1,76}/g) ?? []).join("\r\n");
const adresa = (s: unknown) => (String(s ?? "").match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/) ?? [""])[0].toLowerCase();
type Zaglavlja = { payload?: { headers?: Array<{ name: string; value: string }> } };
const zaglavlje = (m: Zaglavlja, ime: string) => m.payload?.headers?.find((h) => h.name.toLowerCase() === ime.toLowerCase())?.value ?? null;

async function gmailZahtev<T>(putanja: string, init: RequestInit = {}, dozvoli: number[] = []): Promise<T | null> {
  const r = await fetch(`${GMAIL}${putanja}`, { ...init, headers: { authorization: `Bearer ${await driveAccessToken()}`, ...(init.headers ?? {}) }, cache: "no-store" });
  if (dozvoli.includes(r.status)) return null;
  if (!r.ok) throw new Error(`Gmail ${init.method ?? "GET"} ${putanja.split("?")[0]}: ${r.status}`);
  return (await r.json()) as T;
}

function mimePoruka({ from, to, cc = [], subject, body, prilozi = [], inReplyTo = null, references = null }: {
  from: string | null; to: string[]; cc?: string[]; subject: string; body: string; prilozi?: Prilog[]; inReplyTo?: string | null; references?: string | null;
}) {
  const granica = `----letkasni-${randomUUID()}`;
  const r: string[] = [];
  if (from) r.push(`From: ${from}`);
  r.push(`To: ${to.join(", ")}`);
  if (cc.length) r.push(`Cc: ${cc.join(", ")}`);
  r.push(`Subject: ${kodiranaRec(subject)}`);
  if (inReplyTo) r.push(`In-Reply-To: ${inReplyTo}`, `References: ${references ? `${references} ${inReplyTo}` : inReplyTo}`);
  r.push("MIME-Version: 1.0", `Content-Type: multipart/mixed; boundary="${granica}"`, "", `--${granica}`, 'Content-Type: text/plain; charset="UTF-8"', "Content-Transfer-Encoding: base64", "", prelomi(Buffer.from(body, "utf8").toString("base64")));
  for (const p of prilozi) {
    r.push(`--${granica}`, `Content-Type: ${p.mime}; name="${kodiranaRec(p.ime)}"`, `Content-Disposition: attachment; filename="${kodiranaRec(p.ime)}"; filename*=UTF-8''${encodeURIComponent(p.ime)}`, "Content-Transfer-Encoding: base64", "", prelomi(Buffer.from(p.bajtovi).toString("base64")));
  }
  r.push(`--${granica}--`, "");
  return Buffer.from(r.join("\r\n"), "utf8").toString("base64url");
}

/**
 * Klijentima pravi SAMO draftove (CLAUDE.md pravilo 1). `posalji` postoji isključivo za internu poštu —
 * dnevni pregled advokatima (koraci/advokati.ts).
 */
function praviGmail(): Gmail {
  return {
    ima: jeDrivePodesen,
    async aliasi() {
      const j = await gmailZahtev<{ sendAs?: Array<{ sendAsEmail: string }> }>("/settings/sendAs");
      return (j?.sendAs ?? []).map((a) => a.sendAsEmail.toLowerCase());
    },
    async napraviDraft({ from, to, cc = [], subject, body, prilozi = [], threadId = null, replyToMessageId = null }) {
      let inReplyTo: string | null = null;
      let references: string | null = null;
      if (replyToMessageId) {
        const orig = await gmailZahtev<Zaglavlja & { threadId?: string }>(`/messages/${replyToMessageId}?format=metadata&metadataHeaders=Message-ID&metadataHeaders=References`, {}, [404]);
        if (orig) {
          threadId = orig.threadId ?? threadId;
          inReplyTo = zaglavlje(orig, "Message-ID");
          references = zaglavlje(orig, "References");
        }
      }
      const message = { raw: mimePoruka({ from, to, cc, subject, body, prilozi, inReplyTo, references }), ...(threadId ? { threadId } : {}) };
      const d = await gmailZahtev<{ id: string; message?: { id?: string; threadId?: string } }>("/drafts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message }) });
      return { draftId: d!.id, messageId: d!.message?.id ?? null, threadId: d!.message?.threadId ?? null };
    },
    async posalji({ from, to, cc = [], subject, body }) {
      const m = await gmailZahtev<{ id: string }>("/messages/send", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ raw: mimePoruka({ from, to, cc, subject, body }) }) });
      return { messageId: m!.id };
    },
    async postojiDraft(draftId) {
      return (await gmailZahtev(`/drafts/${draftId}?format=minimal`, {}, [404])) !== null;
    },
    async thread(threadId) {
      const polja = "id,messages(id,threadId,internalDate,labelIds,payload(headers,parts(filename,parts(filename))))";
      type Poruka = Zaglavlja & { id: string; threadId: string; internalDate: string; labelIds?: string[]; payload?: { parts?: Array<{ filename?: string; parts?: Array<{ filename?: string }> }> } };
      const t = await gmailZahtev<{ messages?: Poruka[] }>(`/threads/${threadId}?format=full&fields=${encodeURIComponent(polja)}`, {}, [404]);
      if (!t) return null;
      return (t.messages ?? []).map((m): PorukaGmail => ({
        id: m.id,
        threadId: m.threadId,
        vreme: new Date(Number(m.internalDate)).toISOString(),
        od: adresa(zaglavlje(m, "From")),
        za: String(zaglavlje(m, "To") ?? "").split(",").map(adresa).filter(Boolean),
        naslov: zaglavlje(m, "Subject"),
        prilozi: (m.payload?.parts ?? []).flatMap((p) => [p, ...(p.parts ?? [])]).some((p) => p.filename),
        draft: (m.labelIds ?? []).includes("DRAFT"),
      }));
    },
    async pretrazi(q, max = 20) {
      const j = await gmailZahtev<{ threads?: Array<{ id: string }> }>(`/threads?${new URLSearchParams({ q, maxResults: String(max) })}`);
      return (j?.threads ?? []).map((t) => t.id);
    },
  };
}

/**
 * Staging: draftovi idu u crm_sistem[posta_staging], nikad u pravi Gmail — klijenti na stagingu su izmišljeni.
 * „Slanje“ je upis `poslat` (scripts/sistem/alati/staging-posta.mjs). Odgovori klijenata se čitaju iz pravog
 * Gmaila samo ako je uključeno čitanje (SISTEM_GMAIL_CITANJE=pravo) — samo čitanje, ništa se ne menja.
 */
function gmailUBazi(baza: Baza, citanje: Gmail | null): Gmail {
  const KLJUC = "posta_staging";
  type Zapis = { id: string; threadId: string; vreme: string; from: string | null; to: string[]; cc: string[]; subject: string; body: string; prilozi: string[]; poslat?: string; automatski?: boolean };
  const ucitaj = async () => ((await baza.sistem(KLJUC)) ?? []) as Zapis[];
  return {
    ima: () => true,
    aliasi: async () => ["kontakt@letkasni.rs"],
    async napraviDraft({ from, to, cc = [], subject, body, prilozi = [], threadId = null }) {
      const lista = await ucitaj();
      const id = `staging-${randomUUID()}`;
      const thread = threadId ?? id;
      lista.push({ id, threadId: thread, vreme: new Date().toISOString(), from, to, cc, subject, body, prilozi: prilozi.map((p) => p.ime) });
      await baza.upisiSistem(KLJUC, lista.slice(-200));
      return { draftId: id, messageId: null, threadId: thread };
    },
    async posalji({ from, to, cc = [], subject, body }) {
      const lista = await ucitaj();
      const id = `staging-${randomUUID()}`;
      const sada = new Date().toISOString();
      lista.push({ id, threadId: id, vreme: sada, from, to, cc, subject, body, prilozi: [], poslat: sada, automatski: true });
      await baza.upisiSistem(KLJUC, lista.slice(-200));
      return { messageId: id };
    },
    async postojiDraft(draftId) {
      const z = (await ucitaj()).find((x) => x.id === draftId);
      return !!z && !z.poslat;
    },
    async thread(threadId) {
      const nase = (await ucitaj()).filter((z) => z.threadId === threadId && z.poslat).map((z): PorukaGmail => ({
        id: z.id, threadId, vreme: z.poslat!, od: "kontakt@letkasni.rs", za: z.to, naslov: z.subject, prilozi: false, draft: false,
      }));
      const prave = threadId.startsWith("staging-") || !citanje ? [] : ((await citanje.thread(threadId)) ?? []);
      return [...nase, ...prave];
    },
    pretrazi: async (q, max) => (citanje ? citanje.pretrazi(q, max) : []),
  };
}

const praviPotpis = (): Potpis => ({
  podesen: jeSignNowPodesen,
  status: stanjePotpisa,
  preuzmiPotpisan: preuzmiPotpisanPdf,
  preuzmiAudit: preuzmiAuditTrail,
  pdfIzDocx,
});

const praviPortal = (konfig: Konfig): Portal => ({
  pripremi: (ref) => pripremiUgovorZaPotpis(ref, konfig.sajtUrl),
  pozivi: async (ref, predmet) =>
    konfig.potpis === "signnow"
      ? (await napraviPoziveZaPotpis(ref, predmet, konfig.sajtUrl)).map((z) => ({
          putnik: z.putnik, stanje: "poslato", provajder: "signnow", kanal: "portal", dokument_id: z.dokument_id, zahtev_id: z.zahtev_id, ...(z.drive_id ? { drive_id: z.drive_id } : {}), poslato: null,
        }))
      : pripremiPotpisLetkasni(ref, predmet),
  link: (ref) => {
    const token = napraviTokenDokumenata(ref);
    return token ? `${konfig.sajtUrl}/predmet/${token}` : null;
  },
});

function praviSabloni(): Sabloni {
  const kes = new Map<string, { tekst: string; istice: number }>();
  return {
    async mejl(ime) {
      const k = kes.get(ime);
      if (k && k.istice > Date.now()) return k.tekst;
      const folder = getEnv("UGOVOR_SABLONI_DRIVE_FOLDER_ID");
      if (!folder) throw new Error("UGOVOR_SABLONI_DRIVE_FOLDER_ID nije podešen");
      const id = await driveNadjiFajl(folder, `${ime}.md`);
      if (!id) throw new Error(`nema šablona ${ime}.md`);
      const tekst = new TextDecoder().decode(await citajDriveBin(id));
      kes.set(ime, { tekst, istice: Date.now() + 10 * 60_000 });
      return tekst;
    },
    ugovor: async (putnik, let_) => napraviUgovor(putnik, let_, await ucitajSablone()),
  };
}

export function napraviServise(konfig: Konfig): Servisi {
  const baza = pravaBaza();
  return {
    baza,
    drive: praviDrive(),
    gmail: konfig.posta.klijenti === "gmail-api" ? praviGmail() : gmailUBazi(baza, konfig.gmailCitanje ? praviGmail() : null),
    potpis: praviPotpis(),
    portal: praviPortal(konfig),
    sabloni: praviSabloni(),
    sada: () => new Date(),
    async provere() {
      const rez: Record<string, { ok: boolean; poruka: string }> = {};
      const probaj = async (ime: string, fn: () => Promise<string>) => {
        try {
          rez[ime] = { ok: true, poruka: await fn() };
        } catch (e) {
          rez[ime] = { ok: false, poruka: String(e instanceof Error ? e.message : e).slice(0, 160) };
        }
      };
      await probaj("google_drive", async () => {
        if (!konfig.drive.sistem) throw new Error("folder sistema nije podešen");
        await driveLista(konfig.drive.sistem);
        return "Drive dostupan";
      });
      await probaj("gmail", async () => {
        if (!konfig.gmailCitanje) return "ne koristi se (pošta u bazi)";
        const aliasi = await praviGmail().aliasi();
        return aliasi.includes(konfig.posta.od) ? `čitanje radi, alias ${konfig.posta.od} podešen` : `čitanje radi, alias ${konfig.posta.od} nije podešen`;
      });
      await probaj("potpis", async () => {
        if (konfig.potpis === "letkasni") {
          if (!getEnv("UGOVOR_SABLONI_DRIVE_FOLDER_ID")) throw new Error("šabloni ugovora nisu podešeni");
          return "naš potpis na portalu (PDF pravi server)";
        }
        if (!jeSignNowPodesen()) throw new Error("signNow API ključ nije podešen");
        return `signNow · ${await planSignNow()}`;
      });
      return rez;
    },
  };
}
