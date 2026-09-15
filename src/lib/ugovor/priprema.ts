import { crmKlijent } from "@/lib/crm/baza";
import { driveFolder, driveUpisiFajl, jeDrivePodesen } from "@/lib/drive";
import { getEnv } from "@/lib/env";
import { jeSignNowPodesen, napraviEmbeddedPoziv, otpremiUgovor } from "@/lib/potpis/signnow";

import { napraviUgovor, nazivUgovora, type LetUgovora, type PutnikUgovora } from "./docx";
import { jeUgovorPodesen, ucitajSablone } from "./sabloni";

/**
 * Ugovor + poziv za potpis odmah po upisu podataka u portalu — jedan prolaz za klijenta:
 * „Sačuvaj podatke“ ga vodi pravo na „Pregledaj i potpiši“.
 *
 * Isti posao ume i pipeline na Macu (scripts/sistem/koraci/portal.mjs); ako ovde bilo šta
 * ne uspe, predmet ostaje u fazi „ceka_ugovor“ i pipeline ga pokupi u sledećem prolazu.
 * Zato ovo nikad ne ruši čuvanje podataka.
 */
const MIME_DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

type Podaci = Record<string, unknown> & {
  status?: string;
  nalaz?: string;
  revizija?: string;
  putnik?: Record<string, unknown>;
  saputnici?: Array<Record<string, unknown>>;
  let?: Record<string, unknown>;
  portal?: Record<string, unknown>;
  potpisivanje?: Array<Record<string, unknown>>;
};

export type RezultatPripreme =
  | { ok: true; potpisa: number }
  | { ok: false; razlog: "nije_podeseno" | "vec_pripremljen" | "nije_eligible" | "nepotpuno" | "signnow" | "baza" | "konflikt"; poruka?: string };

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);

function putnikIz(p: Record<string, unknown> | undefined, ref: string, i: number, adresaPodnosioca: string | null = null): PutnikUgovora | null {
  const ime = str(p?.ime_prezime);
  if (!ime) return null;
  return {
    ime_prezime: ime,
    rodjena: str(p?.rodjena),
    adresa: str(p?.adresa) ?? adresaPodnosioca,
    maloletan: p?.maloletan === true,
    zakonski_zastupnik: str(p?.zakonski_zastupnik),
    claim_id: `${ref}-${String(i + 1).padStart(2, "0")}`,
  };
}

export function jePripremaMoguca() {
  return jeUgovorPodesen() && jeSignNowPodesen() && jeDrivePodesen();
}

/** Ugovor na Drive („<sistem>/ugovori/<REF>/“) — trag šta je tačno poslato na potpis. Nije obavezno. */
async function sacuvajNaDrive(ref: string, naziv: string, docx: Uint8Array) {
  const koren = getEnv("PIPELINE_DRIVE_FOLDER_ID");
  if (!koren) return null;
  const folder = await driveFolder(ref, await driveFolder("ugovori", koren));
  return driveUpisiFajl(folder, naziv, docx, MIME_DOCX);
}

export type ZahtevZaPotpis = { putnik: string; dokument_id: string; zahtev_id: string; drive_id: string | null };

/**
 * Ugovor za svakog putnika + poziv za potpis u signNow-u, iz podataka predmeta. Ne piše u bazu:
 * poziva ga i serverski prolaz, posle dokumenata (src/lib/sistem/koraci/dokumenta.ts). Baca grešku.
 */
export async function napraviPoziveZaPotpis(ref: string, podaci: Podaci, sajtUrl: string | null): Promise<ZahtevZaPotpis[]> {
  const email = str(podaci.putnik?.email);
  const adresa = str(podaci.putnik?.adresa);
  const putnici = [putnikIz(podaci.putnik, ref, 0), ...(podaci.saputnici ?? []).map((p, i) => putnikIz(p, ref, i + 1, adresa))].filter(
    (p): p is PutnikUgovora => !!p,
  );
  if (!email || !putnici.length) throw new Error("nepotpuno: nema email klijenta ili putnika");
  const let_: LetUgovora = {
    broj: str(podaci.let?.broj),
    datum: str(podaci.let?.datum),
    prevozilac: str(podaci.let?.prevozilac),
    od: str(podaci.let?.od),
    do: str(podaci.let?.do),
    ruta_opis: str(podaci.let?.ruta_opis),
  };
  const redirectUri = sajtUrl ? `${sajtUrl.replace(/\/$/, "")}/predmet/hvala` : undefined;
  const sabloni = await ucitajSablone();
  const zahtevi: ZahtevZaPotpis[] = [];
  for (const p of putnici) {
    const naziv = nazivUgovora(p.ime_prezime);
    const docx = await napraviUgovor(p, let_, sabloni);
    const dokumentId = await otpremiUgovor(docx, naziv);
    const { zahtevId } = await napraviEmbeddedPoziv({ ref, putnik: p.ime_prezime, email, dokumentId, redirectUri });
    const driveId = await sacuvajNaDrive(ref, naziv, docx).catch(() => null);
    zahtevi.push({ putnik: p.ime_prezime, dokument_id: dokumentId, zahtev_id: zahtevId, drive_id: driveId });
  }
  return zahtevi;
}

export async function pripremiUgovorZaPotpis(ref: string, sajtUrl: string | null): Promise<RezultatPripreme> {
  if (!jePripremaMoguca()) return { ok: false, razlog: "nije_podeseno" };

  const k = crmKlijent();
  const { data, error } = await k.from("crm_predmeti").select("status,verzija,podaci,pregled").eq("ref", ref).maybeSingle();
  if (error || !data) return { ok: false, razlog: "baza", poruka: error?.message };

  const podaci = (data.podaci ?? {}) as Podaci;
  if (podaci.portal?.ugovor_pripremljen) return { ok: false, razlog: "vec_pripremljen" };

  // Ista provera kao u pipeline-u: ugovor se pravi samo kad je nalaz potvrđen revizijom.
  if (podaci.nalaz !== "ELIGIBLE" || podaci.revizija !== "SLAZEM_SE") return { ok: false, razlog: "nije_eligible" };

  let zahtevi: ZahtevZaPotpis[];
  try {
    zahtevi = await napraviPoziveZaPotpis(ref, podaci, sajtUrl);
  } catch (greska) {
    const poruka = greska instanceof Error ? greska.message : String(greska);
    return { ok: false, razlog: /nepotpun|placeholder|maloletan|grada/.test(poruka) ? "nepotpuno" : "signnow", poruka };
  }

  const sada = new Date().toISOString();
  const novi: Podaci = {
    ...podaci,
    status: "POA_SENT",
    portal: { ...(podaci.portal ?? {}), ugovor_pripremljen: sada, potpis_kanal: "portal", pripremio: "sajt" },
    potpisivanje: [
      ...(podaci.potpisivanje ?? []).filter((z) => !zahtevi.some((n) => n.putnik === z.putnik)),
      ...zahtevi.map((z) => ({
        putnik: z.putnik,
        stanje: "poslato",
        provajder: "signnow",
        kanal: "portal",
        dokument_id: z.dokument_id,
        zahtev_id: z.zahtev_id,
        ...(z.drive_id ? { drive_id: z.drive_id } : {}),
        poslato: sada.slice(0, 10),
      })),
    ],
  };
  const pregled =
    data.pregled && typeof data.pregled === "object"
      ? { ...(data.pregled as Record<string, unknown>), status: "POA_SENT", sledeci_korak: "Klijent potpisuje ugovor u portalu" }
      : data.pregled;

  const { data: izmenjeno, error: greska } = await k
    .from("crm_predmeti")
    .update({ status: "POA_SENT", podaci: novi, pregled, verzija: data.verzija + 1, izvor_izmene: "portal" })
    .eq("ref", ref)
    .eq("verzija", data.verzija)
    .select("ref");

  if (greska) return { ok: false, razlog: "baza", poruka: greska.message };
  if (!izmenjeno?.length) return { ok: false, razlog: "konflikt" };
  return { ok: true, potpisa: zahtevi.length };
}
