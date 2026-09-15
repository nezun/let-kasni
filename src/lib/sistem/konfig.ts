/**
 * Podešavanja serverskog prolaza po okruženju (staging | prod). Režimi koraka su ovde, u kodu;
 * ID-jevi Drive foldera i adrese su u env promenljivim — repo je javan, a folder za advokate
 * je deljen linkom.
 */
export type Rezim = "auto" | "predlog" | "iskljuceno";
export const KORACI = ["prijem", "gmail", "prilozi", "provera", "dokumenta", "portal", "potpis", "pisac", "advokati", "pregled"] as const;
export type ImeKoraka = (typeof KORACI)[number];

export interface Konfig {
  ime: "staging" | "prod";
  koraci: Record<ImeKoraka, Rezim>;
  /** Staging: čita pravi Gmail (samo čitanje — odgovori klijenata za probu toka), a draftove drži u bazi. */
  gmailCitanje: boolean;
  /** letkasni = naš potpis na portalu (PDF pravi server); signnow = spoljni potpis, kao rezerva */
  potpis: "letkasni" | "signnow";
  sajtUrl: string;
  ignorisiEmailove: string[];
  naseAdrese: string[];
  posta: {
    /** gmail-api = Gmail draft na Nikovom nalogu; baza = zapis u crm_sistem (staging, izmišljeni klijenti) */
    klijenti: "gmail-api" | "baza";
    od: string;
    /** gmail = automatski poslat mejl sa kontakt@letkasni.rs; baza = zapis u crm_sistem (staging) */
    advokati: { transport: "gmail" | "baza"; za: string[]; cc: string[]; od: string; dnevnoOdSata: number };
  };
  drive: { sistem: string | null; advokati: string | null; dokumentaKlijenata: string | null; priloziGmail: string | null };
  agenti: { rokMin: number; maxPokusaja: number };
  pregledLinkAdvokati: string | null;
}

type Env = Record<string, string | undefined>;

const lista = (s: string | undefined) => (s ?? "").split(",").map((x) => x.trim().toLowerCase()).filter(Boolean);

const REZIMI: Record<Konfig["ime"], Record<ImeKoraka, Rezim>> = {
  // staging: sve na auto, ali pošta ide u bazu (izmišljeni klijenti), ne u Gmail
  staging: { prijem: "auto", gmail: "auto", prilozi: "auto", provera: "auto", dokumenta: "auto", portal: "auto", potpis: "auto", pisac: "auto", advokati: "auto", pregled: "auto" },
  // produkcija: prelazi na auto korak po korak, na Nikovu reč (env SISTEM_KORACI_AUTO)
  prod: { prijem: "predlog", gmail: "predlog", prilozi: "predlog", provera: "predlog", dokumenta: "predlog", portal: "predlog", potpis: "predlog", pisac: "predlog", advokati: "predlog", pregled: "auto" },
};

export function ucitajKonfig(env: Env = process.env): Konfig {
  const ime = env.SISTEM_OKRUZENJE === "prod" ? "prod" : "staging";
  const koraci = { ...REZIMI[ime] };
  for (const k of lista(env.SISTEM_KORACI_AUTO)) if ((KORACI as readonly string[]).includes(k)) koraci[k as ImeKoraka] = "auto";
  for (const k of lista(env.SISTEM_KORACI_ISKLJUCENI)) if ((KORACI as readonly string[]).includes(k)) koraci[k as ImeKoraka] = "iskljuceno";

  return {
    ime,
    koraci,
    gmailCitanje: ime === "prod" || env.SISTEM_GMAIL_CITANJE === "pravo",
    potpis: env.SISTEM_POTPIS === "signnow" ? "signnow" : "letkasni",
    sajtUrl: (env.NEXT_PUBLIC_SITE_URL ?? "https://letkasni.rs").replace(/\/$/, ""),
    ignorisiEmailove: lista(env.CRM_IGNORISI_EMAILOVE),
    naseAdrese: lista(env.SISTEM_NASE_ADRESE ?? "kontakt@letkasni.rs,podrska@mail.letkasni.rs,marinkovic.niko@gmail.com"),
    posta: {
      // staging: SISTEM_POSTA_KLIJENTI=gmail → pravi Gmail draftovi (naslov sa [STAGING]); inače u bazu
      klijenti: ime === "prod" || env.SISTEM_POSTA_KLIJENTI === "gmail" ? "gmail-api" : "baza",
      od: env.SISTEM_POSTA_OD ?? "kontakt@letkasni.rs",
      advokati: {
        transport: ime === "prod" ? "gmail" : "baza",
        za: lista(env.SISTEM_ADVOKATI_ZA),
        cc: lista(env.SISTEM_ADVOKATI_CC),
        od: env.SISTEM_POSTA_OD ?? "kontakt@letkasni.rs",
        dnevnoOdSata: Number(env.SISTEM_ADVOKATI_OD_SATA ?? 8),
      },
    },
    drive: {
      sistem: env.PIPELINE_DRIVE_FOLDER_ID ?? null,
      advokati: env.SISTEM_ADVOKATI_DRIVE_FOLDER_ID ?? null,
      dokumentaKlijenata: env.SISTEM_DOKUMENTA_KLIJENATA_DRIVE_FOLDER_ID ?? null,
      priloziGmail: env.SISTEM_PRILOZI_GMAIL_DRIVE_FOLDER_ID ?? null,
    },
    agenti: { rokMin: Number(env.SISTEM_AGENT_ROK_MIN ?? 30), maxPokusaja: 3 },
    pregledLinkAdvokati: env.PREGLED_LINK_ADVOKATI ?? null,
  };
}
