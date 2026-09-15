/* eslint-disable @typescript-eslint/no-explicit-any -- predmet i činjenice su JSON zapisi */
import { createHash } from "node:crypto";

import type { Kontekst } from "../kontekst.ts";
import { proveriCinjenice } from "../pravila/cinjenice.ts";
import { proceni } from "../pravila/eu261.ts";

/**
 * Provera leta: agent (na Nikovom Macu) sakuplja činjenice u crm_letovi[<LET>_<DATUM>], kod računa nalaz,
 * drugi agent (Revizor) nezavisno proverava činjenice u crm_letovi[<LET>_<DATUM>-revizija], kod primenjuje ishod.
 *
 * NEW ──(činjenice + pravila)──▶ VERIFIED ──(revizija SLAŽEM SE)──▶ REVIEWED [→ NOT_ELIGIBLE]
 * Dok agent nije gotov (Mac ugašen), predmet se u ovom prolazu preskače — nastavlja se kad rezultat stigne.
 */
const TIPOVI = ["delay", "cancellation", "denied_boarding"];

export const kljucLeta = (c: any) => (c.let?.broj && c.let?.datum ? `${String(c.let.broj).replace(/\s+/g, "").toUpperCase()}_${c.let.datum}` : null);

const sortiraj = (v: any): any =>
  Array.isArray(v) ? v.map(sortiraj) : v && typeof v === "object" ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortiraj(v[k])])) : v;
/** Heš nezavisan od redosleda ključeva (jsonb u bazi ne čuva redosled). */
export const stabilanHes = (o: unknown) => createHash("sha1").update(JSON.stringify(sortiraj(o))).digest("hex");

export default async function provera(ctx: Kontekst) {
  const r = ctx.korak("provera");
  if (r.rezim === "iskljuceno") return;
  const revizije: Record<string, { neslaganja: number; hesevi: string[] }> = (await ctx.servisi.baza.sistem("revizije")) ?? {};
  let promenjeno = false;

  for (const c of ctx.predmeti.svi()) {
    if (!((c.status === "NEW" && TIPOVI.includes(c.tip)) || c.status === "VERIFIED")) continue;
    const kljuc = kljucLeta(c);
    if (!kljuc || !c.let?.od || !c.let?.do) {
      ctx.zadatak({ ref: c.ref, vrsta: "fale_podaci_leta", opis: "Nema broja leta, datuma ili rute — tražiti boarding kartu (šablon D)" });
      continue;
    }
    const let_ = ctx.letovi[kljuc];

    if (!let_?.cinjenice) {
      if (!r.auto) {
        r.predlog(`${c.ref}: agent bi sakupio činjenice za let ${kljuc}`);
        continue;
      }
      const p = await ctx.red.dodaj({ vrsta: "provera-leta", ref: kljuc, kljuc: "prvi", ulaz: { let_kljuc: kljuc, let: c.let, tip: c.tip, predmeti: [c.ref] }, opis: `Činjenice o letu ${c.let.broj} ${c.let.datum}` });
      if (p.stanje === "greska") ctx.zadatak({ ref: c.ref, ko: "sistem", vrsta: "provera_leta_neuspesna", opis: `Agent nije uspeo da sakupi podatke o letu ${kljuc} — ručna provera` });
      else r.napomena(`${c.ref}: čeka agenta (provera leta ${kljuc})`);
      continue;
    }

    const greske = proveriCinjenice(let_.cinjenice, let_);
    if (greske.length) {
      r.greska(`${kljuc}: činjenice neispravne — ${greske.join("; ")}`);
      ctx.zadatak({ ref: c.ref, ko: "sistem", vrsta: "cinjenice_neispravne", opis: `${kljuc}: ${greske[0]}` });
      continue;
    }
    if (let_.cinjenice.tip !== c.tip) {
      ctx.zadatak({ ref: c.ref, vrsta: "tip_se_razlikuje", opis: `Forma kaže „${c.tip}“, izvori o letu „${let_.cinjenice.tip}“ — odluka pre provere` });
      continue;
    }

    const rez = proceni(let_.cinjenice);
    const h = stabilanHes(let_.cinjenice);
    if (c.provera_kod?.hes_cinjenica !== h) {
      if (!r.auto) {
        r.predlog(`${c.ref}: nalaz bi bio ${rez.nalaz} (${kljuc})`);
        continue;
      }
      ctx.predmeti.azuriraj(c.ref, (x) => {
        x.nalaz = rez.nalaz;
        if (rez.kasnjenje) x.kasnjenje_dolazak_min = rez.kasnjenje.minimalno;
        x.udaljenost_km = rez.km;
        x.iznos_eur = rez.iznos_eur;
        x.provera_kod = {
          hes_cinjenica: h, nalaz: rez.nalaz, kasnjenje: rez.kasnjenje, granicno: rez.granicno, sigurnost: rez.sigurnost,
          tvrdi_razlozi: rez.tvrdi_razlozi, human_review: rez.human_review, sta_fali: rez.sta_fali, koraci: rez.koraci,
          polazak_kasnjenje_min: let_.departure_delay_min ?? null, let: kljuc, izracunato: ctx.sad,
        };
      });
      const k = rez.kasnjenje ? `${rez.kasnjenje.minimalno}–${rez.kasnjenje.maksimalno} min u dolasku` : "bez vremena";
      ctx.predmeti.log(c.ref, `provera (kod): ${rez.nalaz}, ${kljuc}, ${k}, sigurnost ${rez.sigurnost}`);
      r.uradjeno(`${c.ref}: nalaz ${rez.nalaz} (${k})`);
    }
    if (!r.auto) continue;

    if (ctx.predmeti.ucitaj(c.ref).status === "NEW") {
      if (rez.nalaz === "HUMAN_REVIEW") {
        ctx.predmeti.status(c.ref, "HUMAN_REVIEW");
        ctx.zadatak({ ref: c.ref, vrsta: "odluka_human_review", opis: `Provera: ${rez.human_review.join("; ")}` });
        continue;
      }
      ctx.predmeti.status(c.ref, "VERIFIED");
    }

    // ── revizija ──
    const rev = ctx.letovi[`${kljuc}-revizija`];
    const stat = (revizije[kljuc] ??= { neslaganja: 0, hesevi: [] });

    if (!rev || rev.hes_cinjenica !== h) {
      const ponovo = ctx.red.nadji("provera-leta", kljuc, `ponovo-${stat.hesevi.at(-1)?.slice(0, 10)}`);
      if (stat.neslaganja >= 2 || (ponovo && ponovo.stanje !== "ceka" && stat.hesevi.includes(h))) {
        ctx.predmeti.status(c.ref, "HUMAN_REVIEW");
        ctx.zadatak({ ref: c.ref, vrsta: "revizor_osporio", opis: `Revizor ne prihvata činjenice o letu ${kljuc}: ${rev?.razlog ?? "?"}` });
        continue;
      }
      const p = await ctx.red.dodaj({ vrsta: "revizija", ref: kljuc, kljuc: h.slice(0, 10), ulaz: { let_kljuc: kljuc, hes: h, nalaz_koda: rez.nalaz }, opis: `Revizija činjenica ${kljuc}` });
      if (p.stanje === "greska") ctx.zadatak({ ref: c.ref, ko: "sistem", vrsta: "revizija_neuspesna", opis: `Revizor nije uspeo za let ${kljuc} — ručna revizija` });
      else r.napomena(`${c.ref}: čeka agenta (revizija ${kljuc})`);
      continue;
    }

    if (rev.zakljucak === "SLAZEM_SE") {
      ctx.predmeti.azuriraj(c.ref, (x) => {
        x.revizija = "SLAZEM_SE";
        x.revizija_detalji = { razlog: rev.razlog ?? null, stavke: rev.stavke ?? [], hes: h.slice(0, 10), vreme: ctx.sad };
      });
      ctx.predmeti.status(c.ref, "REVIEWED");
      ctx.predmeti.log(c.ref, `revizija (agent): SLAŽEM SE — ${rev.razlog ?? ""}`);
      if (rez.nalaz === "NOT_ELIGIBLE") ctx.predmeti.status(c.ref, "NOT_ELIGIBLE");
      r.uradjeno(`${c.ref}: revizija SLAŽEM SE → ${rez.nalaz === "NOT_ELIGIBLE" ? "NOT_ELIGIBLE" : "REVIEWED"}`);
    } else {
      if (!stat.hesevi.includes(h)) {
        stat.neslaganja++;
        stat.hesevi.push(h);
        promenjeno = true;
      }
      ctx.predmeti.azuriraj(c.ref, (x) => { x.revizija = "NE_SLAZEM_SE"; });
      ctx.predmeti.log(c.ref, `revizija (agent): NE SLAŽEM SE (${stat.neslaganja}.) — ${rev.razlog ?? ""}`);
      if (stat.neslaganja >= 2) {
        ctx.predmeti.status(c.ref, "HUMAN_REVIEW");
        ctx.zadatak({ ref: c.ref, vrsta: "revizor_osporio", opis: `Revizor dvaput osporio činjenice o letu ${kljuc}: ${rev.razlog ?? ""}` });
      } else {
        await ctx.red.dodaj({ vrsta: "provera-leta", ref: kljuc, kljuc: `ponovo-${h.slice(0, 10)}`, ulaz: { let_kljuc: kljuc, let: c.let, tip: c.tip, komentar_revizora: rev.razlog, predmeti: [c.ref] }, opis: `Ponovna provera ${kljuc} posle Revizora` });
        r.napomena(`${c.ref}: Revizor osporio (${rev.razlog}) — ponovna provera`);
      }
    }
  }
  if (promenjeno && r.auto && !ctx.suvo) await ctx.servisi.baza.upisiSistem("revizije", revizije);
}
