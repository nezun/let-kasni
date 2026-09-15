import { getEnv } from "@/lib/env";

/**
 * signNow — samo ono što sajt radi: link za potpis u portalu (embedded invite link, važi najviše 45 min).
 * Dokument i poziv pravi pipeline (scripts/potpis/signnow.mjs → createEmbeddedRequest).
 * Env: SIGNNOW_API_KEY (API ključ iz signNow API Dashboard, ide kao Bearer) ili SIGNNOW_BASIC_TOKEN + SIGNNOW_USERNAME + SIGNNOW_PASSWORD;
 * SIGNNOW_ENV (sandbox | production) — sa API ključem podrazumevano production.
 */
let kes: { token: string; istice: number } | null = null;

const baza = () =>
  (getEnv("SIGNNOW_ENV") ?? (getEnv("SIGNNOW_API_KEY") ? "production" : "sandbox")) === "production"
    ? "https://api.signnow.com"
    : "https://api-eval.signnow.com";

export function jeSignNowPodesen() {
  return Boolean(getEnv("SIGNNOW_API_KEY") || (getEnv("SIGNNOW_BASIC_TOKEN") && getEnv("SIGNNOW_USERNAME") && getEnv("SIGNNOW_PASSWORD")));
}

async function token() {
  const apiKljuc = getEnv("SIGNNOW_API_KEY");
  if (apiKljuc) return apiKljuc;
  if (kes && kes.istice > Date.now() + 60_000) return kes.token;
  const odgovor = await fetch(`${baza()}/oauth2/token`, {
    method: "POST",
    headers: { authorization: `Basic ${getEnv("SIGNNOW_BASIC_TOKEN")}`, "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "password", username: getEnv("SIGNNOW_USERNAME") ?? "", password: getEnv("SIGNNOW_PASSWORD") ?? "", scope: "*" }),
    cache: "no-store",
  });
  const j = (await odgovor.json().catch(() => ({}))) as { access_token?: string; expires_in?: number };
  if (!odgovor.ok || !j.access_token) throw new Error(`signNow prijava nije uspela (${odgovor.status}).`);
  kes = { token: j.access_token, istice: Date.now() + (j.expires_in ?? 3600) * 1000 };
  return j.access_token;
}

export async function linkZaPotpis(dokumentId: string, zahtevId: string) {
  const odgovor = await fetch(
    `${baza()}/v2/documents/${encodeURIComponent(dokumentId)}/embedded-invites/${encodeURIComponent(zahtevId)}/link`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${await token()}`, "content-type": "application/json" },
      body: JSON.stringify({ auth_method: "other", link_expiration: 45 }),
      cache: "no-store",
    },
  );
  const j = (await odgovor.json().catch(() => ({}))) as { data?: { link?: string } };
  if (!odgovor.ok || !j.data?.link) throw new Error(`signNow link nije napravljen (${odgovor.status}).`);
  return j.data.link;
}

async function api(putanja: string, opcije: RequestInit = {}) {
  const odgovor = await fetch(`${baza()}${putanja}`, {
    ...opcije,
    headers: { authorization: `Bearer ${await token()}`, ...(opcije.headers ?? {}) },
    cache: "no-store",
  });
  if (!odgovor.ok) throw new Error(`signNow ${opcije.method ?? "GET"} ${putanja}: ${odgovor.status} ${(await odgovor.text()).slice(0, 200)}`);
  return odgovor;
}

/**
 * Otprema ugovor (.docx) kroz /document/fieldextract: signNow iz nevidljivog text taga
 * ({{t:s;…;o:"Putnik";…}}, vidi lib/ugovor/docx.ts) sam pravi polje za potpis iznad linije putnika.
 * Ako polja nema, dokument nije upotrebljiv za potpis — bolje greška nego potpis na pogrešnom mestu.
 */
export async function otpremiUgovor(docx: Uint8Array, naziv: string) {
  const forma = new FormData();
  forma.append("file", new Blob([docx as BlobPart], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }), naziv);
  const dokumentId = ((await (await api("/document/fieldextract", { method: "POST", body: forma })).json()) as { id: string }).id;

  const d = (await (await api(`/document/${encodeURIComponent(dokumentId)}`)).json()) as { fields?: Array<{ type?: string }> };
  if (!(d.fields ?? []).some((f) => f.type === "signature")) throw new Error("signNow nije prepoznao polje za potpis u ugovoru");
  return dokumentId;
}

/**
 * Poziv za potpis u portalu (embedded signing), bez mejla i bez signNow naloga za klijenta.
 * Link se pravi tek kad klijent klikne „Pregledaj i potpiši“ (linkZaPotpis, važi najviše 45 min).
 */
export async function napraviEmbeddedPoziv(opcije: { ref: string; putnik: string; email: string; dokumentId: string; redirectUri?: string }) {
  const [ime, ...prezime] = String(opcije.putnik).split(" ");
  const odgovor = (await (
    await api(`/v2/documents/${encodeURIComponent(opcije.dokumentId)}/embedded-invites`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name_formula: `Ugovor o ustupanju — ${opcije.ref} — ${opcije.putnik}`,
        invites: [
          {
            email: opcije.email,
            role: "Putnik",
            order: 1,
            auth_method: "other",
            first_name: ime,
            last_name: prezime.join(" ") || ime,
            ...(opcije.redirectUri
              ? { redirect_uri: opcije.redirectUri, decline_redirect_uri: opcije.redirectUri, close_redirect_uri: opcije.redirectUri, redirect_target: "self" }
              : {}),
          },
        ],
      }),
    })
  ).json()) as { data?: Array<{ id?: string }> };

  const zahtevId = odgovor.data?.[0]?.id;
  if (!zahtevId) throw new Error("signNow embedded invite bez ID-ja");
  return { dokumentId: opcije.dokumentId, zahtevId };
}

/** Plan signNow naloga (za CRM „Stanje sistema“). */
export async function planSignNow() {
  const j = (await (await api("/user")).json()) as { premium_access?: { subscription?: { expired_at?: number; plan?: { name?: string } } } };
  const s = j.premium_access?.subscription;
  const istice = s?.expired_at ? new Date(s.expired_at * 1000).toISOString().slice(0, 10) : null;
  return `${s?.plan?.name ?? "nepoznat plan"}${istice ? `, ističe ${istice}` : ""}`;
}

/** Stanje potpisa: potpis na dokumentu je jedini dokaz; odbijanje i istek se čitaju iz poziva. */
export async function stanjePotpisa(dokumentId: string) {
  const d = (await (await api(`/document/${encodeURIComponent(dokumentId)}`)).json()) as {
    signatures?: Array<{ created?: string | number }>;
    field_invites?: Array<{ status?: string }>;
  };
  const potpis = (d.signatures ?? [])[0];
  if (potpis) return { stanje: "potpisano" as const, potpisano: new Date(Number(potpis.created) * 1000).toISOString() };
  const status = d.field_invites?.[0]?.status;
  if (status === "declined") return { stanje: "odbijeno" as const, potpisano: null };
  if (status === "expired") return { stanje: "isteklo" as const, potpisano: null };
  return { stanje: "poslato" as const, potpisano: null };
}

export async function preuzmiPotpisanPdf(dokumentId: string) {
  return new Uint8Array(await (await api(`/document/${encodeURIComponent(dokumentId)}/download?type=collapsed`)).arrayBuffer());
}

export async function preuzmiAuditTrail(dokumentId: string) {
  return new Uint8Array(await (await api(`/document/${encodeURIComponent(dokumentId)}/historyfull`)).arrayBuffer());
}

/** PDF iz .docx: signNow ga renderuje pri otpremi; dokument se posle preuzimanja briše. */
export async function pdfIzDocx(docx: Uint8Array, naziv: string) {
  const forma = new FormData();
  forma.append("file", new Blob([docx as BlobPart], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }), naziv);
  const id = ((await (await api("/document", { method: "POST", body: forma })).json()) as { id: string }).id;
  try {
    return await preuzmiPotpisanPdf(id);
  } finally {
    await api(`/document/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => undefined);
  }
}
