import { crmKlijent } from "@/lib/crm/baza";

/** Podaci o putniku koje klijent vidi i menja u portalu — ništa više od toga ne izlazi iz baze. */
export interface PutnikPortala {
  ime_prezime: string;
  rodjena: string | null;
  adresa: string | null;
  maloletan: boolean;
  zakonski_zastupnik: string | null;
}

export interface PotpisPortala {
  putnik: string;
  stanje: "poslato" | "potpisano" | "odbijeno" | string;
  mozePotpis: boolean;
  /** "letkasni" = naš potpis na portalu; "signnow" = spoljni potpis */
  provajder: string;
  potpisnik: string | null;
  potpisano: string | null;
}

export type FazaPortala = "podaci" | "ceka_ugovor" | "potpis" | "potpis_mejlom" | "potpisano" | "kod_tima";

export interface PredmetPortala {
  ref: string;
  let: { broj: string | null; datum: string | null; od: string | null; do: string | null };
  putnici: PutnikPortala[];
  faza: FazaPortala;
  potpisi: PotpisPortala[];
  podaciPoslati: boolean;
}

type Podaci = Record<string, unknown> & {
  status?: string;
  putnik?: Record<string, unknown>;
  saputnici?: Array<Record<string, unknown>>;
  let?: Record<string, unknown>;
  portal?: Record<string, unknown>;
  potpisivanje?: Array<Record<string, unknown>>;
};

const MOZE_PODACI = ["DRAFTED", "SENT", "AWAITING_DOCS", "CLIENT_REPLIED"];
const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : null);

function putnikIz(p: Record<string, unknown> | undefined): PutnikPortala | null {
  const ime = str(p?.ime_prezime);
  if (!ime) return null;
  return {
    ime_prezime: ime,
    rodjena: str(p?.rodjena),
    adresa: str(p?.adresa),
    maloletan: p?.maloletan === true,
    zakonski_zastupnik: str(p?.zakonski_zastupnik),
  };
}

function fazaIz(status: string, podaci: Podaci): FazaPortala {
  const portal = podaci.portal ?? {};
  const potpisi = (podaci.potpisivanje ?? []).filter((z) => z.kanal === "portal");

  if (status === "POA_SIGNED" || status === "LAWYER" || status === "CLOSED") return "potpisano";
  if (portal.potpis_kanal === "email") return "potpis_mejlom";
  if (status === "POA_SENT" && potpisi.length) return potpisi.every((z) => z.stanje === "potpisano") ? "potpisano" : "potpis";
  if (portal.podaci_poslati && (status === "CLIENT_REPLIED" || status === "POA_GENERATED" || MOZE_PODACI.includes(status))) return "ceka_ugovor";
  if (MOZE_PODACI.includes(status)) return "podaci";
  return "kod_tima";
}

export async function ucitajPredmetPortala(ref: string): Promise<PredmetPortala | null> {
  const { data, error } = await crmKlijent().from("crm_predmeti").select("ref,status,podaci").eq("ref", ref).maybeSingle();

  if (error) throw new Error(`CRM: ${error.message}`);
  if (!data) return null;

  const podaci = (data.podaci ?? {}) as Podaci;
  const putnici = [putnikIz(podaci.putnik), ...(podaci.saputnici ?? []).map(putnikIz)].filter((p): p is PutnikPortala => !!p);

  return {
    ref: data.ref,
    let: {
      broj: str(podaci.let?.broj),
      datum: str(podaci.let?.datum),
      od: str(podaci.let?.od),
      do: str(podaci.let?.do),
    },
    putnici,
    faza: fazaIz(String(data.status), podaci),
    podaciPoslati: Boolean(podaci.portal?.podaci_poslati),
    potpisi: (podaci.potpisivanje ?? [])
      .filter((z) => z.kanal === "portal")
      .map((z) => ({
        putnik: String(z.putnik),
        stanje: String(z.stanje),
        provajder: String(z.provajder ?? ""),
        potpisnik: typeof z.potpisnik === "string" ? z.potpisnik : null,
        potpisano: typeof z.potpisano === "string" ? z.potpisano : null,
        mozePotpis:
          z.stanje === "poslato" &&
          ((z.provajder === "signnow" && !!z.dokument_id && !!z.zahtev_id) || (z.provajder === "letkasni" && !!z.pdf_id && data.status === "POA_SENT")),
      })),
  };
}

export type RezultatCuvanja = { ok: true } | { ok: false; razlog: "nema" | "zakljucano" | "konflikt" | "greska"; poruka?: string };

/** Upis podataka iz portala uz proveru verzije; orkestrator ih preuzima u roku od 5 minuta. */
export async function sacuvajPodatkePortala(
  ref: string,
  putnici: PutnikPortala[],
  saglasnost: { ip: string; userAgent: string },
): Promise<RezultatCuvanja> {
  const k = crmKlijent();

  for (let pokusaj = 0; pokusaj < 3; pokusaj++) {
    const { data, error } = await k.from("crm_predmeti").select("status,verzija,podaci,pregled").eq("ref", ref).maybeSingle();
    if (error) return { ok: false, razlog: "greska", poruka: error.message };
    if (!data) return { ok: false, razlog: "nema" };

    const podaci = (data.podaci ?? {}) as Podaci;
    if (!MOZE_PODACI.includes(String(data.status)) || podaci.portal?.ugovor_pripremljen) return { ok: false, razlog: "zakljucano" };

    const sada = new Date().toISOString();
    const [glavni, ...ostali] = putnici;
    const postojeci = podaci.saputnici ?? [];
    const novi: Podaci = {
      ...podaci,
      putnik: { ...(podaci.putnik ?? {}), ...glavni },
      saputnici: ostali.map((p, i) => ({ ...(postojeci[i] ?? {}), ...p })),
      portal: {
        ...(podaci.portal ?? {}),
        podaci_poslati: sada,
        saglasnost: { vreme: sada, ip: saglasnost.ip, user_agent: saglasnost.userAgent.slice(0, 160) },
      },
    };
    const pregled = data.pregled && typeof data.pregled === "object"
      ? { ...(data.pregled as Record<string, unknown>), putnici: putnici.map((p) => ({ ime: p.ime_prezime, maloletan: p.maloletan })), sledeci_korak: "Pripremamo ugovor za potpis" }
      : data.pregled;

    const { data: izmenjeno, error: greska } = await k
      .from("crm_predmeti")
      .update({ podaci: novi, pregled, verzija: data.verzija + 1, izvor_izmene: "portal" })
      .eq("ref", ref)
      .eq("verzija", data.verzija)
      .select("ref");

    if (greska) return { ok: false, razlog: "greska", poruka: greska.message };
    if (izmenjeno && izmenjeno.length === 1) return { ok: true };
  }

  return { ok: false, razlog: "konflikt" };
}

/** Podaci za pravljenje linka za potpis (samo serverski). */
export async function potpisZaPutnika(ref: string, putnik: string) {
  const { data, error } = await crmKlijent().from("crm_predmeti").select("status,podaci").eq("ref", ref).maybeSingle();
  if (error || !data) return null;
  const z = ((data.podaci as Podaci).potpisivanje ?? []).find((x) => x.kanal === "portal" && x.putnik === putnik);
  if (!z || z.stanje !== "poslato" || z.provajder !== "signnow" || typeof z.dokument_id !== "string" || typeof z.zahtev_id !== "string") return null;
  return { dokumentId: z.dokument_id, zahtevId: z.zahtev_id };
}

/** signNow webhook: označi predmet sa tim dokumentom kao izmenjen, da orkestrator odmah proveri potpis. */
export async function oznaciDogadjajPotpisa(dokumentId: string, dogadjaj: string | null) {
  const k = crmKlijent();
  const { data } = await k
    .from("crm_predmeti")
    .select("ref,verzija,podaci")
    .contains("podaci", { potpisivanje: [{ dokument_id: dokumentId }] })
    .limit(1);
  const red = data?.[0];
  if (!red) return false;
  const podaci = red.podaci as Podaci;
  const { data: izmenjeno } = await k
    .from("crm_predmeti")
    .update({
      podaci: { ...podaci, portal: { ...(podaci.portal ?? {}), poslednji_dogadjaj_potpisa: { vreme: new Date().toISOString(), dogadjaj } } },
      verzija: red.verzija + 1,
      izvor_izmene: "portal",
    })
    .eq("ref", red.ref)
    .eq("verzija", red.verzija)
    .select("ref");
  return Boolean(izmenjeno?.length);
}

/** PDF ugovora za portal: nepotpisan (za pregled) ili potpisan (za preuzimanje). Samo naš potpis. */
export async function ugovorZaPutnika(ref: string, putnik: string) {
  const { data, error } = await crmKlijent().from("crm_predmeti").select("podaci").eq("ref", ref).maybeSingle();
  if (error || !data) return null;
  const z = ((data.podaci as Podaci).potpisivanje ?? []).find((x) => x.kanal === "portal" && x.provajder === "letkasni" && x.putnik === putnik);
  if (!z) return null;
  const potpisan = z.stanje === "potpisano" && typeof z.potpisan_pdf === "string";
  const id = potpisan ? (z.potpisan_pdf as string) : typeof z.pdf_id === "string" ? z.pdf_id : null;
  return id ? { id, potpisan } : null;
}
