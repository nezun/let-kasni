/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci) */
import { folderZaAdvokate } from "../folder-advokata.ts";
import type { Kontekst } from "../kontekst.ts";

/**
 * E-potpis: za svaki zahtev preko provajdera (potpisivanje[] sa dokument_id) proverava stanje kod signNow-a.
 * Potpisan PDF i audit trail idu u „<sistem>/ugovori/<REF>/“, u dokumenta predmeta i u folder za advokate;
 * kad svi potpišu, POA_SENT → POA_SIGNED. Stanje se uvek čita od provajdera, ne iz webhook-a.
 */
export default async function potpis(ctx: Kontekst) {
  const r = ctx.korak("potpis");
  if (r.rezim === "iskljuceno") return;
  const p = ctx.servisi.potpis;
  const d = ctx.servisi.drive;
  const novaDokumenta = new Set<string>();

  for (const c of ctx.predmeti.svi()) {
    // naš potpis: sajt ga upisuje u trenutku potpisa; ovde samo potpisan ugovor ide u folder za advokate
    const nasiPotpisani = (c.potpisivanje ?? []).filter((z: any) => z.provajder === "letkasni" && z.stanje === "potpisano" && !z.u_folderu);
    if (nasiPotpisani.length && r.auto) {
      ctx.predmeti.azuriraj(c.ref, (x) => {
        for (const z of x.potpisivanje) if (z.provajder === "letkasni" && z.stanje === "potpisano") z.u_folderu = ctx.danas;
      });
      ctx.predmeti.log(c.ref, `potpis: potpisano (letkasni) — ${nasiPotpisani.map((z: any) => z.putnik).join(", ")}`);
      novaDokumenta.add(c.ref);
      r.uradjeno(`${c.ref}: potpisan ugovor (naš potpis) → folder za advokate`);
    }
    const otvoreni = (c.potpisivanje ?? []).filter((z: any) => z.provajder && !["email", "letkasni"].includes(z.provajder) && ["poslato", "otvoreno"].includes(z.stanje) && z.dokument_id);
    for (const z of otvoreni) {
      if (!r.auto) {
        r.predlog(`${c.ref}: proverio bih ${z.provajder} potpis za ${z.putnik}`);
        continue;
      }
      if (!p.podesen()) {
        ctx.zadatak({ ko: "sistem", vrsta: "esign_nije_podesen", opis: `${z.provajder}: pristup nije podešen — statusi e-potpisa se ne proveravaju` });
        break;
      }
      let st;
      try {
        st = await p.status(z.dokument_id);
      } catch (e) {
        r.greska(`${c.ref}/${z.putnik}: ${String(e instanceof Error ? e.message : e).slice(0, 160)}`);
        continue;
      }
      if (st.stanje === "potpisano") {
        const koren = ctx.konfig.drive.sistem;
        if (!koren) {
          r.greska("Drive folder sistema nije podešen — potpisan ugovor nema gde da se sačuva");
          break;
        }
        const folder = await d.folder(c.ref, await d.folder("ugovori", koren));
        const [prvo, ...prezime] = String(z.putnik).split(" ");
        const osnova = `${prezime.join(" ")} ${prvo}`;
        const datum = (st.potpisano ?? ctx.sadDatum.toISOString()).slice(0, 10);
        const pdfIme = `${osnova} — Ugovor potpisan elektronski.pdf`;
        const auditIme = `${osnova} — Audit trail potpisa.json`;
        const pdfId = await d.upisi(folder, pdfIme, await p.preuzmiPotpisan(z.dokument_id), "application/pdf");
        const auditId = await d.upisi(folder, auditIme, await p.preuzmiAudit(z.dokument_id), "application/json");
        ctx.predmeti.azuriraj(c.ref, (x) => {
          const y = x.potpisivanje.find((q: any) => q.dokument_id === z.dokument_id);
          Object.assign(y, { stanje: "potpisano", potpisano: datum, potpisan_pdf: pdfId, audit_trail: auditId });
          x.dokumenta_fajlovi = [
            ...(x.dokumenta_fajlovi ?? []),
            { id: pdfId, ime: pdfIme, md5: null, mime: "application/pdf", izvor: "potpis", dodato: ctx.danas },
            { id: auditId, ime: auditIme, md5: null, mime: "application/json", izvor: "potpis", dodato: ctx.danas },
          ];
        });
        ctx.predmeti.log(c.ref, `potpis: potpisano (${z.provajder}) — ${z.putnik}, ${datum}`);
        novaDokumenta.add(c.ref);
        r.uradjeno(`${c.ref}: ${z.putnik} potpisao (${z.provajder})`);
      } else if (st.stanje === "odbijeno" || st.stanje === "isteklo") {
        ctx.predmeti.azuriraj(c.ref, (x) => {
          Object.assign(x.potpisivanje.find((q: any) => q.dokument_id === z.dokument_id), { stanje: "odbijeno", napomena: st.stanje });
        });
        ctx.predmeti.log(c.ref, `potpis: odbijeno (${z.provajder}) — ${z.putnik}, ${st.stanje}`);
        ctx.zadatak({ ref: c.ref, vrsta: "potpis_odbijen", opis: `${z.putnik}: zahtev za potpis ${st.stanje}` });
      }
    }
    if (!r.auto) continue;
    const s = ctx.predmeti.ucitaj(c.ref);
    const imena = [s.putnik, ...(s.saputnici ?? [])].filter((x: any) => x?.ime_prezime).map((x: any) => x.ime_prezime);
    if (s.status === "POA_SENT" && imena.length && imena.every((i: string) => (s.potpisivanje ?? []).some((z: any) => z.putnik === i && z.stanje === "potpisano"))) {
      ctx.predmeti.status(c.ref, "POA_SIGNED");
      r.uradjeno(`${c.ref}: svi potpisali → POA_SIGNED`);
    }
  }

  for (const ref of novaDokumenta) {
    try {
      await folderZaAdvokate(ctx, ref);
    } catch (e) {
      r.greska(`folder za advokate ${ref}: ${e instanceof Error ? e.message : e}`);
    }
  }
}
