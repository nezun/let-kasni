import { getEnv } from "@/lib/env";

/**
 * Minimalan Google Drive v3 klijent (REST) za pregled predmeta i predaju podataka LetKasni pipeline-u.
 * Pristup: OAuth refresh token ličnog naloga (GOOGLE_DRIVE_CLIENT_ID / _SECRET / _REFRESH_TOKEN).
 */
const api = "https://www.googleapis.com/drive/v3";
const upload = "https://www.googleapis.com/upload/drive/v3";
const folderMime = "application/vnd.google-apps.folder";

let kes: { token: string; istice: number } | null = null;

export function jeDrivePodesen() {
  return Boolean(getEnv("GOOGLE_DRIVE_CLIENT_ID") && getEnv("GOOGLE_DRIVE_CLIENT_SECRET") && getEnv("GOOGLE_DRIVE_REFRESH_TOKEN"));
}

export async function driveAccessToken() {
  if (kes && kes.istice > Date.now() + 60_000) {
    return kes.token;
  }

  const clientId = getEnv("GOOGLE_DRIVE_CLIENT_ID");
  const clientSecret = getEnv("GOOGLE_DRIVE_CLIENT_SECRET");
  const refreshToken = getEnv("GOOGLE_DRIVE_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Drive pristup nije podešen.");
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  const body = (await response.json().catch(() => ({}))) as { access_token?: string; expires_in?: number };

  if (!response.ok || !body.access_token) {
    throw new Error(`Google OAuth osvežavanje nije uspelo (${response.status}).`);
  }

  kes = { token: body.access_token, istice: Date.now() + (body.expires_in ?? 3600) * 1000 };
  return body.access_token;
}

async function zahtev(url: string, init: RequestInit = {}) {
  const token = await driveAccessToken();
  const response = await fetch(url, {
    ...init,
    headers: { authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Drive ${init.method ?? "GET"} je vratio ${response.status}.`);
  }

  return response;
}

const navodnici = (s: string) => s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");

export async function citajDriveJson(fileId: string) {
  const response = await zahtev(`${api}/files/${encodeURIComponent(fileId)}?alt=media`);
  return response.json() as Promise<unknown>;
}

/** ID foldera sa datim imenom ispod roditelja; pravi ga ako ne postoji. */
export async function driveFolder(ime: string, roditeljId: string) {
  const q = [
    `name = '${navodnici(ime)}'`,
    `'${navodnici(roditeljId)}' in parents`,
    `mimeType = '${folderMime}'`,
    "trashed = false",
  ].join(" and ");
  const lista = (await (
    await zahtev(`${api}/files?${new URLSearchParams({ q, fields: "files(id)", pageSize: "2" })}`)
  ).json()) as { files: Array<{ id: string }> };

  if (lista.files[0]) {
    return lista.files[0].id;
  }

  const nov = (await (
    await zahtev(`${api}/files?fields=id`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: ime, mimeType: folderMime, parents: [roditeljId] }),
    })
  ).json()) as { id: string };
  return nov.id;
}

/** Nov fajl u folderu (multipart upload). */
export async function driveUpisiFajl(roditeljId: string, ime: string, sadrzaj: Uint8Array | string, mime: string) {
  const granica = `lk${crypto.randomUUID().replace(/-/g, "")}`;
  const meta = JSON.stringify({ name: ime, parents: [roditeljId] });
  const telo = new Blob([
    `--${granica}\r\ncontent-type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${granica}\r\ncontent-type: ${mime}\r\n\r\n`,
    sadrzaj as BlobPart,
    `\r\n--${granica}--`,
  ]);
  const response = await zahtev(`${upload}/files?uploadType=multipart&fields=id`, {
    method: "POST",
    headers: { "content-type": `multipart/related; boundary=${granica}` },
    body: telo,
  });
  return ((await response.json()) as { id: string }).id;
}

/** ID fajla sa datim imenom u folderu; null ako ga nema. */
export async function driveNadjiFajl(roditeljId: string, ime: string) {
  const q = [`name = '${navodnici(ime)}'`, `'${navodnici(roditeljId)}' in parents`, "trashed = false"].join(" and ");
  const lista = (await (
    await zahtev(`${api}/files?${new URLSearchParams({ q, fields: "files(id)", pageSize: "2" })}`)
  ).json()) as { files: Array<{ id: string }> };
  return lista.files[0]?.id ?? null;
}

/** Sadržaj fajla sa Drive-a (binarno). */
export async function citajDriveBin(fileId: string) {
  const response = await zahtev(`${api}/files/${encodeURIComponent(fileId)}?alt=media`);
  return new Uint8Array(await response.arrayBuffer());
}
