/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci) */
import type { Kontekst } from "../kontekst.ts";
import { napraviUgovore, putniciPredmeta } from "./dokumenta.ts";

/**
 * Portal (letkasni.rs/predmet/<token>). Klijent upiše podatke → sajt ODMAH pravi ugovor i poziv za potpis
 * (src/lib/ugovor/priprema.ts). Ovaj korak je rezerva i trag:
 *  - sajt je pripremio: jednom upiše trag u log;
 *  - sajtu nije uspelo (signNow nije odgovorio…): isti posao ponovo, ovde; posle 3 neuspeha zadatak;
 *  - e-potpis nije podešen: ugovor ide mejlom (PDF, šablon G).
 */
const potpun = (p: any) => p?.ime_prezime && p?.rodjena && p?.adresa && (!p.maloletan || p.zakonski_zastupnik);

export default async function portal(ctx: Kontekst) {
  const r = ctx.korak("portal");
  if (r.rezim === "iskljuceno") return;

  for (const c0 of ctx.predmeti.svi()) {
    if (!c0.portal?.podaci_poslati) continue;
    const ref = c0.ref;

    if (c0.portal.ugovor_pripremljen) {
      if (c0.portal.pripremio === "sajt" && !c0.portal.zabelezeno) {
        const imena = (c0.potpisivanje ?? []).filter((z: any) => z.kanal === "portal").map((z: any) => z.putnik);
        if (!r.auto) {
          r.predlog(`${ref}: sajt je pripremio ugovor za potpis (${imena.length})`);
          continue;
        }
        ctx.predmeti.azuriraj(ref, (x) => { x.portal.zabelezeno = ctx.sad; });
        ctx.predmeti.log(ref, `portal (sajt): ugovor o ustupanju i poziv za potpis u portalu — ${imena.join(", ") || "bez putnika"}`);
        r.uradjeno(`${ref}: sajt pripremio ugovor za potpis (${imena.length})`);
      }
      continue;
    }

    if (["DRAFTED", "SENT", "AWAITING_DOCS"].includes(c0.status)) {
      if (!r.auto) {
        r.predlog(`${ref}: klijent popunio portal → CLIENT_REPLIED`);
        continue;
      }
      ctx.predmeti.status(ref, "CLIENT_REPLIED");
      ctx.predmeti.log(ref, "portal (kod): klijent upisao podatke putnika");
    }
    const c = ctx.predmeti.ucitaj(ref);
    if (c.status !== "CLIENT_REPLIED") continue;

    const putnici = putniciPredmeta(c);
    const nepotpuni = putnici.filter((p: any) => !potpun(p));
    if (!putnici.length || nepotpuni.length) {
      ctx.zadatak({ ref, vrsta: "portal_nepotpun", opis: `Portal: nepotpuni podaci za ${nepotpuni.map((p: any) => p.ime_prezime).join(", ") || "putnike"}` });
      continue;
    }
    if (c.nalaz !== "ELIGIBLE" || c.revizija !== "SLAZEM_SE") {
      ctx.zadatak({ ref, vrsta: "portal_bez_nalaza", opis: `Klijent je popunio portal, a nalaz (${c.nalaz ?? "nema"}) nije ELIGIBLE sa revizijom — ugovor se ne pravi` });
      continue;
    }
    if (!r.auto) {
      r.predlog(`${ref}: napravio bih ugovor (${putnici.length}) i poziv za potpis u portalu`);
      continue;
    }

    if (!ctx.servisi.potpis.podesen()) {
      try {
        await napraviUgovore(ctx, ref);
      } catch (e) {
        r.greska(`${ref}: ugovor — ${e instanceof Error ? e.message : e}`);
        ctx.zadatak({ ref, ko: "sistem", vrsta: "ugovor_greska", opis: "Portal: generisanje ugovora nije uspelo" });
        continue;
      }
      ctx.predmeti.azuriraj(ref, (x) => { Object.assign(x.portal, { potpis_kanal: "email", ugovor_pripremljen: ctx.sadDatum.toISOString() }); });
      ctx.predmeti.status(ref, "POA_GENERATED");
      ctx.zadatak({ ref, ko: "sistem", vrsta: "portal_potpis_mejlom", opis: "E-potpis nije podešen — ugovor ide mejlom kao draft G" });
      r.napomena(`${ref}: potpis u portalu nije moguć, ugovor ide mejlom`);
      continue;
    }

    // isti posao kao sajt posle „Sačuvaj podatke“; sajt piše u bazu sam, pa se predmet posle toga učitava ponovo
    await ctx.sacuvaj(ref);
    const rez = await ctx.servisi.portal.pripremi(ref).catch((e: unknown) => ({ ok: false, razlog: "signnow", poruka: e instanceof Error ? e.message : String(e) }));
    await ctx.predmeti.osvezi(ref);
    if (rez.ok || rez.razlog === "vec_pripremljen") {
      ctx.predmeti.azuriraj(ref, (x) => { x.portal.zabelezeno = ctx.sad; });
      ctx.predmeti.log(ref, "portal (server): ugovor o ustupanju i poziv za potpis u portalu (sajt nije uspeo pri upisu podataka)");
      r.uradjeno(`${ref}: ugovor spreman za potpis u portalu → POA_SENT`);
      continue;
    }
    const pokusaji = (ctx.predmeti.ucitaj(ref).portal?.pokusaji_pripreme ?? 0) + 1;
    ctx.predmeti.azuriraj(ref, (x) => { x.portal.pokusaji_pripreme = pokusaji; });
    if (rez.razlog === "nepotpuno") ctx.zadatak({ ref, vrsta: "portal_nepotpun", opis: `Portal: ugovor ne može da se napravi — ${String(rez.poruka ?? "nepotpuni podaci").slice(0, 140)}` });
    else if (pokusaji >= 3) ctx.zadatak({ ref, ko: "sistem", vrsta: "portal_priprema_neuspesna", opis: `Ugovor za potpis u portalu nije napravljen ${pokusaji} puta: ${String(rez.poruka ?? rez.razlog).slice(0, 140)}` });
    else r.napomena(`${ref}: priprema ugovora nije uspela (${rez.razlog}) — ponovo u sledećem prolazu`);
  }
}
