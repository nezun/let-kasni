/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci) */
import { vokativ, lintDraft } from "../draft.ts";
import { plusRadnihDana, radnihDanaOd, type Kontekst } from "../kontekst.ts";
import type { Prilog } from "../servisi.ts";

/**
 * Pisac (kod): draftovi iz šablona gde tekst ne traži procenu — A-delay/A-cancel (traži dokumenta), B, C, E,
 * G-potpis (link za potpis, posle dokumenata) i G-ugovor (PDF, kad e-potpis nije podešen)
 * (prepis pipeline koraci/pisac.mjs). Sve ostalo postaje zadatak za čoveka.
 * NIŠTA SE NE ŠALJE (CLAUDE.md pravilo 1): Gmail draft na Nikovom nalogu, Niko šalje.
 * Iznos samo ako je iznos_odobren (pravilo 3, lint).
 */
const dmy = (iso: string) => `${iso.slice(8, 10)}.${iso.slice(5, 7)}.${iso.slice(0, 4)}`;
const hm = (min: number) => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}h`;
const popuni = (s: string, v: Record<string, any>) => s.replace(/\{\{(\w+)\}\}/g, (m, k) => (v[k] ?? m));
const sredi = (s: string) => s.replace(/\n{3,}/g, "\n\n").trim();
/** Naslov postojećeg threada bez „Re:“ i bez staging oznake. */
const osnovaNaslova = (s: string) => s.replace(/^(\s*(Re:|\[STAGING\])\s*)+/i, "");

async function sablon(ctx: Kontekst, ime: string) {
  const t = (await ctx.servisi.sabloni.mejl(ime)).replace(/^<!--[\s\S]*?-->\s*/, "");
  const m = t.match(/^Subject:\s*(.*)\r?\n\r?\n/);
  return m ? { subject: m[1], telo: t.slice(m[0].length) } : { subject: "", telo: t };
}

const KORAK_E = {
  AWAITING_DOCS: "Naredni korak bio bi da nam dostavite kopiju pasoša ili lične karte, kao i boarding kartu. Ova dokumentacija nam je potrebna da bismo pripremili i poslali Vam na potpisivanje adekvatnu dokumentaciju koja nam je potrebna da bismo ostvarili Vaše pravo.",
  POA_SENT: "Naredni korak bio bi da nam vratite potpisan ugovor o ustupanju potraživanja (skeniran ili uslikan telefonom), kako bismo mogli da pokrenemo postupak prema avio-kompaniji.",
  C_SENT: "Da bismo mogli da proverimo Vaš slučaj, potrebno nam je da nam ukratko opišete šta se dogodilo sa letom.",
};

function osnovno(c: any) {
  const v = vokativ(c.putnik?.ime_prezime ?? "");
  const pol = c.putnik?.pol ?? v.pol;
  return {
    vokativ: c.putnik?.vokativ ?? v.vokativ,
    oslovljavanje: pol === "ž" ? "Poštovana" : "Poštovani",
    sigurno: v.sigurno || !!c.putnik?.vokativ,
    let: c.let?.broj ?? "", od: c.let?.od ?? "", do: c.let?.do ?? "",
    let_opis: c.let?.broj ? `let ${c.let.broj}` : `let ${c.let?.od ?? ""} - ${c.let?.do ?? ""}`,
    datum_leta: c.let?.datum ? dmy(c.let.datum) : "",
    prevozilac: c.let?.prevozilac ?? "",
    iznos_blok: c.iznos_odobren && c.iznos_eur ? ` *u iznosu od ${c.iznos_eur} EUR po putniku*` : "",
    advokat: "Igor Besermenji",
  };
}

function razlogB(c: any) {
  const t = (c.provera_kod?.tvrdi_razlozi ?? []).join(" | ");
  if (/ispod/.test(t)) {
    const min = c.provera_kod?.kasnjenje?.maksimalno ?? c.kasnjenje_dolazak_min;
    return min == null ? null : `je kašnjenje u dolasku na krajnje odredište iznosilo oko ${hm(min)}, a pravo na novčanu naknadu postoji tek kada kašnjenje u dolasku iznosi tri sata ili više`;
  }
  if (/ruta ne ulazi/.test(t)) return "let nije obuhvaćen tim pravilima: nije poleteo iz Srbije ili EU, a prevozilac nije iz tog područja";
  if (/14\+/.test(t)) return "ste o otkazivanju leta obavešteni više od 14 dana pre planiranog polaska";
  if (/alternativni let/.test(t)) return "je ponuđeni zamenski let bio u vremenskim okvirima koje propisi dozvoljavaju";
  if (/besplatna/.test(t)) return "karta nije kupljena po javno dostupnoj tarifi";
  if (/dobrovoljno/.test(t)) return "ste se dobrovoljno odrekli mesta na letu";
  return null;
}

type Plan =
  | { zadatak: { ref: string; vrsta: string; opis: string } }
  | { zadatak?: undefined; sablon: string; subject: string; telo: string; noviStatus: string | null; followup?: string; attach?: Array<{ id: string; naziv: string }> };

async function izaberi(ctx: Kontekst, c: any): Promise<Plan | null> {
  // obrisan draft se ne pravi ponovo; E posle poslatog follow-upa sme ponovo (poslednji kontakt se pomerio)
  const vec = (s: string, od?: string) => (c.sistem?.draftovi ?? []).some((d: any) => d.sablon === s && (!od || d.datum >= od));
  const b = osnovno(c);
  const z = (vrsta: string, opis: string): Plan => ({ zadatak: { ref: c.ref, vrsta, opis } });

  // mejl koji traži dokumenta, bez tvrdnje o osnovu (let nije jednoznačan ili nije potvrđen)
  const planDokumenta = async (): Promise<Plan> => {
    const prevozilac = c.let?.prevozilac ?? (String(c.let?.ruta_opis ?? "").split(";")[1]?.trim() || "");
    const t = await sablon(ctx, "D-dokumenta");
    // kod kašnjenja se nikad ne pominje otkazivanje (lint, CLAUDE.md pravilo 4)
    const obavestenje =
      c.tip === "cancellation" ? "obaveštenje avio-kompanije o otkazivanju leta, ukoliko ste ga dobili"
      : c.tip === "denied_boarding" ? "obaveštenje avio-kompanije o uskraćenom ukrcavanju, ukoliko ste ga dobili"
      : "obaveštenje avio-kompanije o kašnjenju leta, ukoliko ste ga dobili";
    return { sablon: "D-dokumenta", subject: popuni(t.subject, b), telo: sredi(popuni(t.telo, { ...b, obavestenje, prevozilac_opis: prevozilac ? `${prevozilac} ` : "" })), noviStatus: "DRAFTED" };
  };

  // Prvi mejl traži dokumenta (pasoš, boarding karta); link za potpis ide tek posle dokumenata (G-potpis).
  if (c.status === "REVIEWED" && c.nalaz === "ELIGIBLE" && ["delay", "cancellation"].includes(c.tip)) {
    const ime = c.tip === "delay" ? "A-delay" : "A-cancel";
    if (vec(ime)) return null;
    if (!c.let?.broj || !c.let?.od || !c.let?.do) return z("draft_fale_podaci", `${ime}: fali broj leta ili ruta`);
    if (c.tip === "delay" && c.kasnjenje_dolazak_min == null) return z("draft_fale_podaci", "A-delay: nema kašnjenja u dolasku");
    if (c.tip === "cancellation" && !c.let.prevozilac) return z("draft_fale_podaci", "A-cancel: nema prevozioca");
    const t = await sablon(ctx, ime);
    return { sablon: ime, subject: popuni(t.subject, b), telo: popuni(t.telo, { ...b, kasnjenje: c.kasnjenje_dolazak_min != null ? `${hm(c.kasnjenje_dolazak_min)} u dolasku na krajnje odredište` : "" }), noviStatus: "DRAFTED" };
  }
  // moguć osnov, ali let nije potvrđen (npr. nema stvarnog vremena) → mejl traži dokumenta, bez tvrdnje o osnovu
  if (c.status === "REVIEWED" && c.nalaz === "POTENTIALLY_ELIGIBLE") {
    if (vec("D-dokumenta")) return null;
    if (!c.let?.od || !c.let?.do || !c.let?.datum) return z("odluka_potencijalno", `Nalaz POTENTIALLY_ELIGIBLE (${(c.provera_kod?.sta_fali ?? []).join("; ") || "?"}) — fali ruta ili datum`);
    return planDokumenta();
  }

  if (c.status === "NOT_ELIGIBLE" && c.revizija === "SLAZEM_SE" && c.provera_kod && !c.poslednji_kontakt) {
    if (vec("B-nema-osnova")) return null;
    const razlog = razlogB(c);
    if (!razlog || !c.let?.od || !c.let?.do || !c.let?.datum) return z("draft_b_rucno", "Nema osnova, ali razlog ili podaci o letu traže ručno pisanje (B)");
    const t = await sablon(ctx, "B-nema-osnova");
    const nega = (c.provera_kod.polazak_kasnjenje_min ?? 0) > 120 ? (await sablon(ctx, "B-nega-pasus")).telo.trim() : "";
    return { sablon: "B-nema-osnova", subject: popuni(t.subject, b), telo: sredi(popuni(t.telo, { ...b, razlog, nega_pasus: nega })), noviStatus: null };
  }


  // agent nije mogao jednoznačno da odredi let → tražimo dokumenta; tačan let se čita sa karte
  if (c.status === "NEW" && c.let?.pronalazenje?.stanje === "ceka_klijenta" && !c.let?.broj) {
    if (vec("D-dokumenta")) return null;
    if (!c.let?.od || !c.let?.do || !c.let?.datum) return z("draft_fale_podaci", "D-dokumenta: fali ruta ili datum");
    return planDokumenta();
  }

  if (c.status === "NEW" && c.tip === "other") {
    if (vec("C-other")) return null;
    if (!c.let?.od || !c.let?.do) return z("draft_fale_podaci", "C-other: forma nema rutu u IATA kodovima");
    const t = await sablon(ctx, "C-other");
    return { sablon: "C-other", subject: popuni(t.subject, b), telo: popuni(t.telo, b), noviStatus: "DRAFTED" };
  }

  if (["SENT", "AWAITING_DOCS", "POA_SENT"].includes(c.status) && c.poslednji_kontakt_ko === "mi" && c.poslednji_kontakt) {
    const rd = radnihDanaOd(c.poslednji_kontakt, ctx.danas);
    if (rd >= 14) return z("predlog_lost", `${rd} radnih dana bez odgovora — predlog: LOST`);
    if (rd < 3 || (c.followup && c.followup > ctx.danas) || vec("E-followup", c.poslednji_kontakt)) return null;
    if (!c.gmail?.subject) return z("followup_bez_threada", "Follow-up je dospeo, a predmet nema naslov Gmail threada");
    const linkP = c.status === "POA_SENT" && c.portal?.potpis_kanal === "portal" ? ctx.servisi.portal.link(c.ref) : null;
    const korak = linkP
      ? `Ugovor Vas čeka za elektronski potpis na Vašem ličnom linku:\n\n${linkP}`
      : c.status === "POA_SENT" ? KORAK_E.POA_SENT : c.tip === "other" ? KORAK_E.C_SENT : KORAK_E.AWAITING_DOCS;
    const t = await sablon(ctx, "E-followup");
    return {
      sablon: "E-followup", subject: `Re: ${osnovaNaslova(c.gmail.subject)}`,
      telo: popuni(t.telo, { ...b, sledeci_korak: korak }), noviStatus: null, followup: plusRadnihDana(ctx.danas, 3),
    };
  }

  if (c.status === "POA_GENERATED") {
    if (c.portal?.podaci_poslati && !c.portal?.potpis_kanal) return null;
    const putnici = [c.putnik, ...(c.saputnici ?? [])].filter((p: any) => p?.ime_prezime);
    if (!c.gmail?.subject) return z("draft_g_bez_threada", "Ugovor spreman, a predmet nema naslov Gmail threada");
    const za_koga = putnici.length > 1 ? " za sve putnike" : "";

    // ugovor i poziv za potpis su napravljeni posle dokumenata → mejl sa linkom za potpis
    if (c.portal?.potpis_kanal === "portal") {
      if (vec("G-potpis")) return null;
      const link = ctx.servisi.portal.link(c.ref);
      if (!link) return z("potpis_bez_tajne", "Ugovor spreman, a tajna za lične linkove (DOKUMENTA_TAJNA) nije podešena");
      const t = await sablon(ctx, "G-potpis");
      return { sablon: "G-potpis", subject: `Re: ${osnovaNaslova(c.gmail.subject)}`, telo: sredi(popuni(t.telo, { ...b, za_koga, link })), noviStatus: "POA_DRAFTED" };
    }

    // bez e-potpisa: PDF u prilogu, klijent štampa i vraća
    if (vec("G-ugovor")) return null;
    if (putnici.some((p: any) => p.maloletan)) return z("draft_g_maloletni", "Ugovor spreman, a među putnicima je maloletno lice — pasus za zastupnika piše čovek (G)");
    const ugovori = (c.ugovori ?? []).filter((u: any) => u.pdf_id);
    if (ugovori.length < putnici.length) return z("draft_g_ugovor", "Ugovor nije napravljen za sve putnike");
    const t = await sablon(ctx, "G-ugovor");
    return {
      sablon: "G-ugovor", subject: `Re: ${osnovaNaslova(c.gmail.subject)}`,
      telo: sredi(popuni(t.telo, { ...b, za_koga, maloletni_pasus: "" })),
      attach: ugovori.map((u: any) => ({ id: u.pdf_id, naziv: u.naziv })), noviStatus: "POA_DRAFTED",
    };
  }

  if (["DRAFTED", "POA_DRAFTED"].includes(c.status)) return z("posalji_draft", "Pošalji pripremljeni mejl iz Gmail draftova");
  if (c.status === "POA_SIGNED") {
    const fali = [!c.dokumenta?.pasos && "pasoš", !(c.dokumenta?.boarding || c.dokumenta?.rezervacija) && "boarding karta"].filter(Boolean);
    return z("predaj_advokatu", `Ugovor potpisan${fali.length ? ` (još fali: ${fali.join(", ")})` : ""}: potvrdi prijem klijentu i predaj predmet advokatu (status LAWYER)`);
  }
  if (c.status === "CLIENT_REPLIED") return z("odgovori_klijentu", "Klijent je odgovorio — odgovor piše čovek (sistem ne čita tekst mejla)");
  if (c.status === "HUMAN_REVIEW") return z("odluka_human_review", "Predmet čeka odluku (HUMAN_REVIEW)");
  return null;
}

async function napraviDraft(ctx: Kontekst, c: any, plan: Exclude<Plan, { zadatak: object }>) {
  const { greske } = lintDraft(c, { sablon: plan.sablon, subject: plan.subject, to: c.putnik.email, telo: plan.telo });
  if (greske.length) return { greska: greske.join(" | ") };

  const g = ctx.servisi.gmail;
  const od = ctx.konfig.posta.od;
  const odgovor = plan.subject.startsWith("Re: ");
  try {
    const prilozi: Prilog[] = [];
    for (const a of plan.attach ?? []) prilozi.push({ ime: a.naziv, mime: "application/pdf", bajtovi: await ctx.servisi.drive.citaj(a.id) });
    const from = (await g.aliasi()).includes(od) ? od : null;
    if (!from) ctx.zadatak({ ko: "sistem", vrsta: "gmail_alias", opis: `Alias ${od} nije podešen u Gmailu („Send mail as“) — draftovi idu sa glavne adrese` });
    // staging draft u pravom Gmailu nosi oznaku u naslovu, da se ne pomeša sa produkcijskim
    const subject = ctx.konfig.ime === "prod" ? plan.subject : `[STAGING] ${plan.subject}`;
    const d = await g.napraviDraft({
      from, to: [c.putnik.email], subject, body: plan.telo.trim(), prilozi,
      threadId: odgovor ? (c.gmail?.client_thread ?? null) : null,
      replyToMessageId: odgovor ? (c.gmail?.last_client_message ?? null) : null,
    });
    const zapis = { sablon: plan.sablon, datum: ctx.danas, status: c.status, napravljen: ctx.sadDatum.toISOString(), kanal: ctx.konfig.posta.klijenti, draft_id: d.draftId, thread_id: d.threadId, message_id: d.messageId };
    ctx.predmeti.azuriraj(c.ref, (x) => {
      x.sistem ??= {};
      x.sistem.draftovi = [...(x.sistem.draftovi ?? []), zapis];
      x.gmail ??= {};
      x.gmail.draft_id = zapis.draft_id;
      if (plan.followup) x.followup = plan.followup;
    });
  } catch (e) {
    return { greska: `Gmail: ${String(e instanceof Error ? e.message : e).slice(0, 300)}` };
  }
  if (plan.noviStatus) ctx.predmeti.status(c.ref, plan.noviStatus);
  ctx.predmeti.log(c.ref, `pisac (kod): draft ${plan.sablon} → ${ctx.konfig.posta.klijenti === "gmail-api" ? "Gmail draft" : "draft u bazi (staging)"}`);
  // draft postoji u Gmailu — upis odmah, da ga sledeći prolaz ne napravi ponovo ako ovaj padne
  await ctx.sacuvaj(c.ref);
  return { ok: true };
}

export default async function pisac(ctx: Kontekst) {
  const r = ctx.korak("pisac");
  if (r.rezim === "iskljuceno") return;

  for (const c of ctx.predmeti.svi()) {
    let plan: Plan | null;
    try {
      plan = await izaberi(ctx, c);
    } catch (e) {
      r.greska(`${c.ref}: šablon — ${e instanceof Error ? e.message : e}`);
      continue;
    }
    if (!plan) continue;
    if (plan.zadatak) {
      ctx.zadatak(plan.zadatak);
      continue;
    }
    if (!c.putnik?.email) {
      ctx.zadatak({ ref: c.ref, vrsta: "draft_bez_emaila", opis: `${plan.sablon}: predmet nema email klijenta` });
      continue;
    }
    if (!r.auto) {
      r.predlog(`${c.ref}: draft ${plan.sablon}${plan.noviStatus ? ` → ${plan.noviStatus}` : ""}`);
      continue;
    }
    const rez = await napraviDraft(ctx, c, plan);
    if (rez.greska) {
      r.greska(`${c.ref} ${plan.sablon}: ${rez.greska}`);
      ctx.zadatak({ ref: c.ref, ko: "sistem", vrsta: "draft_greska", opis: `Draft ${plan.sablon} nije prošao: ${rez.greska.slice(0, 140)}` });
      continue;
    }
    const o = osnovno(c);
    if (!o.sigurno) ctx.zadatak({ ref: c.ref, vrsta: "vokativ", opis: `Proveri vokativ „${o.vokativ}“ pre slanja` });
    r.uradjeno(`${c.ref}: draft ${plan.sablon}${plan.noviStatus ? ` → ${plan.noviStatus}` : ""}`);
  }
}
