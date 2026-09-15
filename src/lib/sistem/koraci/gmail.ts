/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci) */
import { danasIz, plusRadnihDana, type Kontekst } from "../kontekst.ts";
import type { PorukaGmail } from "../servisi.ts";

/**
 * Gmail → predmet, bez čitanja sadržaja mejla (prepis pipeline koraci/gmail.mjs):
 *  1. draft koji je sistem napravio a Niko ga poslao → status, poslednji kontakt, thread, follow-up;
 *  2. nova poruka klijenta → CLIENT_REPLIED (kad predmet čeka klijenta) + zadatak „odgovori“.
 * Tekst poruke se ne upisuje nigde.
 */
const dmy = (iso: string) => `${iso.slice(8, 10)}.${iso.slice(5, 7)}.`;
const CEKA_KLIJENTA = ["SENT", "AWAITING_DOCS", "POA_SENT"];
const PRVI_MEJL = ["A-delay", "A-cancel", "A-portal"];

const emailoviKlijenta = (c: any) =>
  [c.putnik?.email, c.kontakt_email, ...(c.saputnici ?? []).map((s: any) => s?.email)].filter(Boolean).map((e: string) => e.toLowerCase());

export default async function gmail(ctx: Kontekst) {
  const r = ctx.korak("gmail");
  if (r.rezim === "iskljuceno") return;
  const g = ctx.servisi.gmail;
  if (!g.ima()) {
    r.napomena("Gmail pristup nije podešen");
    ctx.zadatak({ ko: "sistem", vrsta: "gmail_prijava", opis: "Gmail pristup nije podešen (treba gmail.readonly + gmail.compose)" });
    return;
  }
  const nase = ctx.konfig.naseAdrese;

  for (const c0 of ctx.predmeti.svi()) {
    let c = c0;
    const emailovi = emailoviKlijenta(c);
    if (!emailovi.length || ["CLOSED", "LOST"].includes(c.status)) continue;

    // ── 1. poslati draftovi ──
    for (const [i, d] of (c.sistem?.draftovi ?? []).entries()) {
      if (!d.draft_id || d.poslat || d.obrisan) continue;
      try {
        if (await g.postojiDraft(d.draft_id)) continue;
      } catch (e) {
        r.greska(`${c.ref}: ${e instanceof Error ? e.message : e}`);
        continue;
      }
      const poruke = d.thread_id ? ((await g.thread(d.thread_id)) ?? []) : [];
      const poslata = poruke.find((m) => !m.draft && nase.includes(m.od) && m.za.some((z) => emailovi.includes(z)) && m.vreme >= d.napravljen);
      if (!r.auto) {
        r.predlog(`${c.ref}: draft ${d.sablon} ${poslata ? "poslat" : "obrisan"}`);
        continue;
      }
      if (!poslata) {
        ctx.predmeti.azuriraj(c.ref, (x) => { x.sistem.draftovi[i].obrisan = ctx.danas; });
        ctx.zadatak({ ref: c.ref, vrsta: "draft_obrisan", opis: `Draft ${d.sablon} je obrisan bez slanja — sistem ga ne pravi ponovo; napiši ručno ako treba` });
        ctx.predmeti.log(c.ref, `gmail (kod): draft ${d.sablon} obrisan bez slanja`);
        continue;
      }
      const datum = danasIz(new Date(poslata.vreme));
      ctx.predmeti.azuriraj(c.ref, (x) => {
        Object.assign(x.sistem.draftovi[i], { poslat: poslata.vreme });
        x.gmail ??= {};
        x.gmail.client_thread ??= poslata.threadId;
        x.gmail.subject ??= (poslata.naslov ?? "").replace(/^(Re:\s*)+/i, "") || null;
        x.gmail.draft_id = null;
      });
      if (PRVI_MEJL.includes(d.sablon)) {
        if (c.status === "DRAFTED") {
          ctx.predmeti.status(c.ref, "SENT");
          ctx.predmeti.status(c.ref, "AWAITING_DOCS");
        }
      } else if (d.sablon === "C-other") {
        if (c.status === "DRAFTED") ctx.predmeti.status(c.ref, "SENT");
      } else if (d.sablon === "G-potpis") {
        if (c.status === "POA_DRAFTED") ctx.predmeti.status(c.ref, "POA_SENT");
        ctx.predmeti.azuriraj(c.ref, (x) => {
          for (const z of x.potpisivanje ?? []) if (z.kanal === "portal" && z.stanje === "poslato") z.poslato = datum;
        });
      } else if (d.sablon === "G-ugovor") {
        if (c.status === "POA_DRAFTED") ctx.predmeti.status(c.ref, "POA_SENT");
        const imena = [c.putnik, ...(c.saputnici ?? [])].filter((p: any) => p?.ime_prezime).map((p: any) => p.ime_prezime);
        ctx.predmeti.azuriraj(c.ref, (x) => {
          x.potpisivanje = [
            ...(x.potpisivanje ?? []).filter((z: any) => !imena.includes(z.putnik)),
            ...imena.map((ime: string) => ({ putnik: ime, stanje: "poslato", provajder: "email", kanal: "email", poslato: datum })),
          ];
        });
      }
      ctx.predmeti.azuriraj(c.ref, (x) => {
        x.poslednji_kontakt = datum;
        x.poslednji_kontakt_ko = "mi";
        if (d.sablon === "E-followup") x.followupi = (x.followupi ?? 0) + 1;
        if ([...PRVI_MEJL, "C-other", "G-ugovor", "G-potpis"].includes(d.sablon)) x.followup = plusRadnihDana(datum, 3);
      });
      ctx.predmeti.log(c.ref, `gmail (kod): Niko poslao ${d.sablon} ${dmy(datum)}`);
      r.uradjeno(`${c.ref}: poslat ${d.sablon}`);
      c = ctx.predmeti.ucitaj(c.ref);
    }

    // ── 2. odgovori klijenta ──
    const threadovi = new Set<string>([c.gmail?.client_thread, ...(c.sistem?.draftovi ?? []).map((d: any) => d.thread_id)].filter(Boolean));
    try {
      for (const e of emailovi) for (const t of await g.pretrazi(`from:${e} newer_than:30d`)) threadovi.add(t);
    } catch (e) {
      r.greska(`${c.ref}: pretraga — ${e instanceof Error ? e.message : e}`);
      continue;
    }
    const od = c.sistem?.gmail_od;
    if (!od) {
      // prvi prolaz: sve do sada viđeno je već obrađeno ručno
      if (r.auto) ctx.predmeti.azuriraj(c.ref, (x) => { x.sistem = { ...(x.sistem ?? {}), gmail_od: ctx.sadDatum.toISOString() }; });
      continue;
    }
    const nove: PorukaGmail[] = [];
    for (const t of threadovi) for (const m of (await g.thread(t)) ?? []) if (!m.draft && emailovi.includes(m.od) && m.vreme > od) nove.push(m);
    if (!nove.length) continue;
    nove.sort((a, b) => (a.vreme < b.vreme ? -1 : 1));
    const poslednja = nove[nove.length - 1];
    if (!r.auto) {
      r.predlog(`${c.ref}: ${nove.length} nova poruka klijenta`);
      continue;
    }
    ctx.predmeti.azuriraj(c.ref, (x) => {
      x.sistem.gmail_od = poslednja.vreme;
      x.gmail ??= {};
      x.gmail.last_client_message = poslednja.id;
      x.gmail.client_thread ??= poslednja.threadId;
      x.gmail.threadovi = [...new Set([...(x.gmail.threadovi ?? []), ...nove.map((m) => m.threadId)])];
      x.poslednji_kontakt = danasIz(new Date(poslednja.vreme));
      x.poslednji_kontakt_ko = "klijent";
    });
    const prilozi = nove.some((m) => m.prilozi);
    if (CEKA_KLIJENTA.includes(c.status)) ctx.predmeti.status(c.ref, "CLIENT_REPLIED");
    ctx.zadatak({ ref: c.ref, vrsta: "odgovori_klijentu", opis: `Klijent je pisao ${dmy(danasIz(new Date(poslednja.vreme)))}${prilozi ? " (sa prilozima — sistem ih obrađuje)" : ""} — pročitaj i odgovori ako treba` });
    ctx.predmeti.log(c.ref, `gmail (kod): ${nove.length} nova poruka klijenta${prilozi ? ", sa prilozima" : ""}`);
    r.uradjeno(`${c.ref}: klijent pisao${prilozi ? " (prilozi)" : ""}`);
  }
}
