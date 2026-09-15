#!/usr/bin/env node
// Search Analytics only. No site mutations, sitemap submissions or indexing requests.
import { createSign } from "node:crypto";
import { existsSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const scope = "https://www.googleapis.com/auth/webmasters.readonly";
const flags = new Map(process.argv.slice(2).map(a => {
  const i = a.indexOf("=");
  return i < 0 ? [a, true] : [a.slice(0, i), a.slice(i + 1)];
}));
for (const file of [".env", ".env.local"]) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z_][A-Z_0-9]*)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^(["'])(.*)\1$/, "$2").replaceAll("\\n", "\n");
  }
}
const end = new Date(`${flags.get("--end") || "2026-09-12"}T00:00:00Z`);
if (Number.isNaN(end.getTime())) throw new Error("Invalid --end=YYYY-MM-DD");
const iso = d => d.toISOString().slice(0, 10);
function ago(days, months = 0) {
  const d = new Date(end);
  if (months) {
    const day = d.getUTCDate();
    d.setUTCDate(1);
    d.setUTCMonth(d.getUTCMonth() - months);
    const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
    d.setUTCDate(Math.min(day, last) + 1);
  } else d.setUTCDate(d.getUTCDate() - days + 1);
  return iso(d);
}
const windows = { "28d": ago(28), "90d": ago(90), "6m": ago(0, 6), max: ago(0, 16) };
const property = flags.get("--property") || "sc-domain:letkasni.rs";
const output = flags.get("--output") || "seo-audit-output/performance-api";
const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`;
if (flags.has("--plan")) {
  console.log(JSON.stringify({ property, endpoint, scope, windows, end: iso(end), dataState: "final", dimensions: [["page"], ["page", "query"], ["page", "date"]], output }, null, 2));
  process.exit(0);
}

async function token() {
  let body;
  if (process.env.GOOGLE_OAUTH_REFRESH_TOKEN) {
    const credential = process.env.GOOGLE_OAUTH_CLIENT_CREDENTIALS ? JSON.parse(readFileSync(process.env.GOOGLE_OAUTH_CLIENT_CREDENTIALS, "utf8")) : {};
    const client = credential.installed || credential.web || credential;
    const id = process.env.GOOGLE_OAUTH_CLIENT_ID || client.client_id;
    const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || client.client_secret;
    if (!id || !secret) throw new Error("OAuth client configuration missing. See PHASE2-SETUP.md.");
    body = { grant_type: "refresh_token", client_id: id, client_secret: secret, refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN, scope };
  } else {
    const credential = process.env.GOOGLE_APPLICATION_CREDENTIALS ? JSON.parse(readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8")) : {};
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || credential.client_email;
    const key = process.env.GOOGLE_PRIVATE_KEY || (process.env.GOOGLE_PRIVATE_KEY_BASE64 ? Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64, "base64").toString("utf8") : credential.private_key);
    if (!email || !key) throw new Error("No read-only GSC credentials configured. Native CSV export remains supported; see PHASE2-SETUP.md.");
    const now = Math.floor(Date.now() / 1000);
    const enc = o => Buffer.from(JSON.stringify(o)).toString("base64url");
    const unsigned = `${enc({ alg: "RS256", typ: "JWT" })}.${enc({ iss: email, scope, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })}`;
    const signature = createSign("RSA-SHA256").update(unsigned).sign(key, "base64url");
    body = { grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` };
  }
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", body: new URLSearchParams(body) });
  if (!response.ok) throw new Error(`Google authentication failed: HTTP ${response.status}. Credentials were not logged.`);
  const data = await response.json();
  if (!data.access_token) throw new Error("Google returned no access token.");
  return data.access_token;
}

async function query(access, startDate, dimensions) {
  const rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const request = { startDate, endDate: iso(end), type: "web", dataState: "final", dimensions, rowLimit: 25000, startRow };
    let response;
    for (let attempt = 0; attempt < 4; attempt++) {
      response = await fetch(endpoint, { method: "POST", headers: { Authorization: `Bearer ${access}`, "Content-Type": "application/json" }, body: JSON.stringify(request) });
      if (response.ok || (response.status !== 429 && response.status < 500)) break;
      await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
    }
    if (!response.ok) throw new Error(`Search Analytics failed: HTTP ${response.status}. No credentials logged.`);
    const data = await response.json();
    rows.push(...(data.rows || []));
    if ((data.rows || []).length < 25000) break;
  }
  return { startDate, endDate: iso(end), dimensions, rows, limitation: "Google omits anonymized queries and may omit long-tail rows; pagination does not recover them." };
}

try {
  const access = await token();
  mkdirSync(output, { recursive: true });
  for (const [name, start] of Object.entries(windows)) {
    const data = await query(access, start, ["page"]);
    writeFileSync(path.join(output, `pages-${name}.json`), JSON.stringify(data, null, 2));
    console.log(`${name}: ${data.rows.length} reported pages`);
  }
  for (const dimension of ["query", "date"]) {
    const data = await query(access, windows.max, ["page", dimension]);
    writeFileSync(path.join(output, `page-${dimension}-max.json`), JSON.stringify(data, null, 2));
    console.log(`page x ${dimension}: ${data.rows.length} rows`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
