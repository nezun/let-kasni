import { getEnv } from "@/lib/env";

/**
 * signNow — samo ono što sajt radi: link za potpis u portalu (embedded invite link, važi najviše 45 min).
 * Dokument i poziv pravi pipeline (scripts/potpis/signnow.mjs → createEmbeddedRequest).
 * Env: SIGNNOW_ENV (sandbox | production), SIGNNOW_BASIC_TOKEN, SIGNNOW_USERNAME, SIGNNOW_PASSWORD.
 */
let kes: { token: string; istice: number } | null = null;

const baza = () => (getEnv("SIGNNOW_ENV") === "production" ? "https://api.signnow.com" : "https://api-eval.signnow.com");

export function jeSignNowPodesen() {
  return Boolean(getEnv("SIGNNOW_BASIC_TOKEN") && getEnv("SIGNNOW_USERNAME") && getEnv("SIGNNOW_PASSWORD"));
}

async function token() {
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
