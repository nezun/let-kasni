import { ocisti, type Kontekst, napraviKontekst } from "./kontekst.ts";
import type { ImeKoraka, Konfig } from "./konfig.ts";
import { vratiZaglavljene } from "./red.ts";
import type { Servisi } from "./servisi.ts";
import advokati from "./koraci/advokati.ts";
import dokumenta from "./koraci/dokumenta.ts";
import gmail from "./koraci/gmail.ts";
import pisac from "./koraci/pisac.ts";
import portal from "./koraci/portal.ts";
import potpis from "./koraci/potpis.ts";
import prijem from "./koraci/prijem.ts";
import prilozi from "./koraci/prilozi.ts";
import provera from "./koraci/provera.ts";

/**
 * Jedan serverski prolaz (letkasni.rs/api/sistem/prolaz): Supabase ga zove na sat vremena, a Nikov Mac
 * odmah posle završenog agenta. Sve osim agenata radi ovde, kodom, direktno nad CRM bazom.
 * Posle svakog koraka izmene idu u bazu — pad jednog koraka ne briše posao prethodnih.
 */
const KORACI: Array<[ImeKoraka, (ctx: Kontekst) => Promise<void>]> = [
  ["prijem", prijem],
  ["gmail", gmail],
  ["prilozi", prilozi],
  ["provera", provera],
  ["dokumenta", dokumenta],
  ["portal", portal],
  ["potpis", potpis],
  ["pisac", pisac],
  ["advokati", advokati],
];

const OPIS_DOGADJAJA: Record<string, (e: Record<string, unknown>) => string> = {
  nov_predmet: (e) => `nov predmet (${e.do})`,
  status: (e) => `status ${e.od} → ${e.do}`,
  nova_dokumenta: (e) => `+${e.broj} dokument(a)`,
  potpis: (e) => `potpis ${e.putnik}: ${e.od ?? "—"} → ${e.do}`,
};

function digest(ctx: Kontekst) {
  const L = [`# LetKasni sistem — ${ctx.konfig.ime} — ${ctx.sad}`, ""];
  const sekcija = (naslov: string, stavke: string[]) => L.push(`## ${naslov} (${stavke.length})`, "", ...(stavke.length ? stavke : ["- ništa"]), "");
  const zadaci = (ko: string) => ctx.zadaci.filter((z) => z.ko === ko).map((z) => `- **${z.ref ?? "sistem"}** · ${z.opis}`);
  sekcija("Za Nika", zadaci("niko"));
  sekcija("Za advokate", zadaci("advokat"));
  sekcija("Sistem", zadaci("sistem"));
  sekcija("Događaji od prošlog prolaza", ctx.dogadjaji.map((e) => `- ${e.ref}: ${OPIS_DOGADJAJA[e.tip]?.(e) ?? e.tip}`));
  sekcija("Agenti (nije završeno)", ctx.red.svi().filter((p) => p.stanje !== "gotovo").map((p) => `- ${p.vrsta} ${p.ref}: ${p.stanje}, pokušaja ${p.pokusaja}${p.poslednja_greska ? ` — ${p.poslednja_greska.slice(0, 140)}` : ""}`));
  L.push("## Koraci", "");
  for (const [korak, s] of Object.entries(ctx.izvestaj)) {
    const stavke = [...s.uradjeno.map((x) => `  - ✓ ${x}`), ...s.predlog.map((x) => `  - → ${x}`), ...s.napomene.map((x) => `  - · ${x}`), ...s.greske.map((x) => `  - ✗ ${x}`)];
    L.push(`- **${korak}** (${s.rezim})${stavke.length ? "" : " — ništa"}`, ...stavke);
  }
  L.push("", "Legenda: ✓ urađeno · → predlog (korak nije na auto) · · napomena · ✗ greška", "");
  return L.join("\n");
}

export async function pokreniProlaz(konfig: Konfig, servisi: Servisi, { suvo = false, izvor = "rucno" } = {}) {
  const pocetak = servisi.sada();
  const baza = servisi.baza;
  if (!suvo && !(await baza.zakljucaj("prolaz", new Date(pocetak.getTime() + 10 * 60_000).toISOString()))) {
    return { ok: false as const, razlog: "prolaz_vec_radi" };
  }
  try {
    const [redovi, poslovi, letovi] = await Promise.all([baza.predmeti(), baza.poslovi(), baza.letovi()]);
    const vraceno = suvo ? 0 : await vratiZaglavljene(baza, poslovi, konfig.agenti.rokMin, pocetak);
    const ctx = napraviKontekst(konfig, servisi, redovi, { suvo, poslovi, letovi });

    for (const [ime, korak] of KORACI) {
      try {
        await korak(ctx);
      } catch (e) {
        ctx.korak(ime).greska(`korak pao: ${String(e instanceof Error ? e.message : e).slice(0, 300)}`);
      }
      const neuspeli = await ctx.sacuvaj().catch((e: unknown) => {
        ctx.korak(ime).greska(`upis u bazu: ${String(e instanceof Error ? e.message : e).slice(0, 200)}`);
        return [] as string[];
      });
      if (neuspeli.length) ctx.korak(ime).napomena(`nije upisano, predmet je u međuvremenu izmenjen — ponovo u sledećem prolazu: ${neuspeli.join(", ")}`);
    }

    // pregled: zadaci, stanje sistema, digest, redovi za CRM pregled
    const greske = Object.values(ctx.izvestaj).reduce((a, s) => a + s.greske.length, 0);
    const pregled = ctx.korak("pregled");
    if (pregled.rezim !== "iskljuceno" && !suvo) {
      await baza.upisiSistem("zadaci", ocisti(ctx.zadaci));
      const prethodno = ((await baza.sistem("sistem")) ?? {}) as { poslednji_cron?: string | null };
      const provere = await servisi.provere().catch((e: unknown) => ({ provere: { ok: false, poruka: String(e instanceof Error ? e.message : e).slice(0, 160) } }));
      await baza.upisiSistem("sistem", {
        okruzenje: konfig.ime,
        poslednji_prolaz: servisi.sada().toISOString(),
        poslednji_cron: izvor === "pg_cron" ? servisi.sada().toISOString() : (prethodno.poslednji_cron ?? null),
        provere,
        agenti_greske: ctx.red.svi().filter((p) => p.stanje === "greska").length,
        izvor,
        rezimi: konfig.koraci,
        agenti_cekaju: ctx.red.cekaju().length,
        agenti_rade: ctx.red.svi().filter((p) => p.stanje === "radi").length,
        greske,
      });
      await baza.upisiSistem("digest", { vreme: ctx.sad, tekst: digest(ctx) });
      const osvezeno = await ctx.predmeti.osveziPregled();
      if (osvezeno) pregled.uradjeno(`${osvezeno} red(ova) pregleda osveženo`);
    }

    return {
      ok: true as const,
      okruzenje: konfig.ime,
      trajanje_ms: servisi.sada().getTime() - pocetak.getTime(),
      predmeta: redovi.length,
      vraceno_poslova: vraceno,
      agenti_cekaju: ctx.red.cekaju().length,
      zadaci: ctx.zadaci.length,
      greske,
      koraci: Object.fromEntries(Object.entries(ctx.izvestaj).map(([k, s]) => [k, { uradjeno: s.uradjeno.length, predlog: s.predlog.length, greske: s.greske.length }])),
      ...(suvo ? { izvestaj: ctx.izvestaj } : {}),
      digest: suvo ? digest(ctx) : undefined,
    };
  } finally {
    if (!suvo) await baza.otkljucaj("prolaz").catch(() => undefined);
  }
}
