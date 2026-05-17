#!/usr/bin/env node

import { createSign } from "node:crypto";
import { execFile } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "node:http";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const WEBMASTERS_SCOPE = "https://www.googleapis.com/auth/webmasters";
const LOOPBACK_HOST = "127.0.0.1";
const LOOPBACK_PORT = 53682;
const LOOPBACK_REDIRECT_URI = `http://${LOOPBACK_HOST}:${LOOPBACK_PORT}/oauth2callback`;

function loadEnvFile(file) {
  if (!existsSync(file)) {
    return;
  }

  for (const rawLine of readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value.replaceAll("\\n", "\n");
    }
  }
}

function loadLocalEnv() {
  loadEnvFile(".env");
  loadEnvFile(".env.local");
}

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function parseArgs(argv) {
  const flags = new Map();
  const positional = [];

  for (const arg of argv) {
    if (!arg.startsWith("--")) {
      positional.push(arg);
      continue;
    }

    const [key, value] = arg.slice(2).split("=", 2);
    flags.set(key, value ?? "true");
  }

  return { flags, positional };
}

function getCredential() {
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (credentialsPath) {
    const credentials = JSON.parse(readFileSync(credentialsPath, "utf8"));

    return {
      clientEmail: credentials.client_email,
      privateKey: credentials.private_key,
    };
  }

  const privateKey =
    process.env.GOOGLE_PRIVATE_KEY ??
    (process.env.GOOGLE_PRIVATE_KEY_BASE64
      ? Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64, "base64").toString("utf8")
      : undefined);

  return {
    clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey,
  };
}

function getOAuthClient() {
  const credentialsPath = process.env.GOOGLE_OAUTH_CLIENT_CREDENTIALS;

  if (credentialsPath) {
    const credentials = JSON.parse(readFileSync(credentialsPath, "utf8"));
    const client = credentials.installed ?? credentials.web ?? credentials;

    return {
      clientId: client.client_id,
      clientSecret: client.client_secret,
    };
  }

  return {
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  };
}

function requireOAuthClient() {
  const client = getOAuthClient();

  if (!client.clientId || !client.clientSecret) {
    throw new Error(
      [
        "Missing Google OAuth client credentials.",
        "Set GOOGLE_OAUTH_CLIENT_CREDENTIALS to a Desktop OAuth client JSON file,",
        "or set GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET.",
      ].join(" ")
    );
  }

  return client;
}

function requireCredential() {
  const credential = getCredential();

  if (!credential.clientEmail || !credential.privateKey) {
    throw new Error(
      [
        "Missing Google service account credentials.",
        "Set GOOGLE_APPLICATION_CREDENTIALS to a service-account JSON file,",
        "or set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY.",
      ].join(" ")
    );
  }

  return credential;
}

function hasServiceAccountCredential() {
  const credential = getCredential();

  return Boolean(credential.clientEmail && credential.privateKey);
}

function createJwt({ clientEmail, privateKey }) {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: "RS256",
    typ: "JWT",
  };
  const claim = {
    iss: clientEmail,
    scope: WEBMASTERS_SCOPE,
    aud: TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };
  const unsigned = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(claim))}`;
  const signer = createSign("RSA-SHA256");

  signer.update(unsigned);
  signer.end();

  return `${unsigned}.${signer.sign(privateKey, "base64url")}`;
}

async function getServiceAccountAccessToken() {
  const assertion = createJwt(requireCredential());
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`Google auth failed (${response.status}): ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

async function getOAuthAccessToken() {
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!refreshToken) {
    throw new Error(
      "Missing GOOGLE_OAUTH_REFRESH_TOKEN. Run `npm run seo:oauth-login` first."
    );
  }

  const client = requireOAuthClient();
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: client.clientId,
      client_secret: client.clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`Google OAuth refresh failed (${response.status}): ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

async function getAccessToken() {
  if (process.env.GOOGLE_OAUTH_REFRESH_TOKEN) {
    try {
      return await getOAuthAccessToken();
    } catch (error) {
      if (!hasServiceAccountCredential()) {
        throw error;
      }

      console.warn(
        `Google OAuth failed; falling back to service account auth. ${error.message}`,
      );
    }
  }

  return getServiceAccountAccessToken();
}

async function googleRequest(url, options = {}) {
  const accessToken = await getAccessToken();
  const response = await fetch(url, {
    ...options,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(options.body ? { "content-type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`Google API failed (${response.status}): ${text}`);
  }

  return data;
}

function openBrowser(url) {
  const command = process.platform === "darwin" ? "open" : process.platform === "win32" ? "cmd" : "xdg-open";
  const args = process.platform === "win32" ? ["/c", "start", "", url] : [url];

  execFile(command, args, () => {});
}

function waitForOAuthCode() {
  return new Promise((resolve, reject) => {
    const server = createServer((request, response) => {
      const url = new URL(request.url ?? "/", LOOPBACK_REDIRECT_URI);

      if (url.pathname !== "/oauth2callback") {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      const error = url.searchParams.get("error");
      const code = url.searchParams.get("code");

      if (error) {
        response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
        response.end(`Google OAuth failed: ${error}`);
        server.close();
        reject(new Error(`Google OAuth failed: ${error}`));
        return;
      }

      if (!code) {
        response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
        response.end("Missing OAuth code.");
        return;
      }

      response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
      response.end("OAuth connected. You can close this tab and return to Codex.");
      server.close();
      resolve(code);
    });

    server.once("error", reject);
    server.listen(LOOPBACK_PORT, LOOPBACK_HOST);
  });
}

async function oauthLogin(flags) {
  const client = requireOAuthClient();
  const authUrl = new URL(AUTH_URL);

  authUrl.searchParams.set("client_id", client.clientId);
  authUrl.searchParams.set("redirect_uri", LOOPBACK_REDIRECT_URI);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", WEBMASTERS_SCOPE);
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  console.log("Opening Google OAuth login.");
  console.log(String(authUrl));

  const codePromise = waitForOAuthCode();

  if (!flags.has("no-open")) {
    openBrowser(String(authUrl));
  }

  const code = await codePromise;
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: client.clientId,
      client_secret: client.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: LOOPBACK_REDIRECT_URI,
    }),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`Google OAuth token exchange failed (${response.status}): ${JSON.stringify(data)}`);
  }

  if (!data.refresh_token) {
    throw new Error("Google did not return a refresh token. Re-run with consent prompt or create a new OAuth client.");
  }

  console.log("");
  console.log("OAuth connected. Add this to .env.local:");
  console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${data.refresh_token}`);
}

function normalizeBaseUrl(url) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function normalizeSiteProperty(siteUrl) {
  if (siteUrl.startsWith("sc-domain:")) {
    return siteUrl;
  }

  return siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
}

function getConfig(flags) {
  const publicSiteUrl =
    flags.get("site") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://letkasni.rs";
  const baseUrl = normalizeBaseUrl(publicSiteUrl);

  return {
    baseUrl,
    sitemapUrl: flags.get("sitemap") ?? `${baseUrl}/sitemap.xml`,
    siteProperty: normalizeSiteProperty(
      flags.get("property") ?? process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL ?? baseUrl
    ),
  };
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function extractTag(block, tagName) {
  const match = block.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, "i"));

  return match ? decodeXml(match[1].trim()) : undefined;
}

async function fetchXml(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/xml,text/xml,*/*",
    },
  });
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url} (${response.status})`);
  }

  return text;
}

async function loadSitemapEntries(sitemapUrl) {
  const xml = await fetchXml(sitemapUrl);
  const sitemapBlocks = [...xml.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/gi)];

  if (sitemapBlocks.length > 0) {
    const nestedEntries = await Promise.all(
      sitemapBlocks.map((match) => loadSitemapEntries(extractTag(match[1], "loc")))
    );

    return nestedEntries.flat();
  }

  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)]
    .map((match) => ({
      loc: extractTag(match[1], "loc"),
      lastmod: extractTag(match[1], "lastmod"),
    }))
    .filter((entry) => Boolean(entry.loc));
}

function isNestedArticlePath(path) {
  const parts = path.split("/").filter(Boolean);
  const localizedParts = parts[0] === "en" ? parts.slice(1) : parts;

  return localizedParts.length === 2;
}

function isBlogIndexPath(path) {
  return path === "/blog" || path === "/en/blog";
}

function isBlogArticlePath(path) {
  return isNestedArticlePath(path);
}

function filterEntries(entries, flags) {
  if (!flags.has("blog-only")) {
    return entries;
  }

  return entries.filter((entry) => {
    const path = new URL(entry.loc).pathname;

    return isBlogIndexPath(path) || isBlogArticlePath(path);
  });
}

function summarizeSitemap(entries) {
  const blogCount = entries.filter((entry) => {
    const path = new URL(entry.loc).pathname;

    return isBlogArticlePath(path);
  }).length;

  return {
    total: entries.length,
    blogArticles: blogCount,
  };
}

async function submitSitemap(flags) {
  const config = getConfig(flags);
  const entries = await loadSitemapEntries(config.sitemapUrl);
  const summary = summarizeSitemap(entries);

  console.log(`Sitemap: ${config.sitemapUrl}`);
  console.log(`Search Console property: ${config.siteProperty}`);
  console.log(`URLs found: ${summary.total}`);
  console.log(`Blog article URLs found: ${summary.blogArticles}`);

  if (flags.has("dry-run")) {
    console.log("Dry run: sitemap was not submitted.");
    return;
  }

  const submitUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    config.siteProperty
  )}/sitemaps/${encodeURIComponent(config.sitemapUrl)}`;

  await googleRequest(submitUrl, {
    method: "PUT",
  });

  console.log("Submitted sitemap to Google Search Console.");
}

async function inspectUrl(siteProperty, inspectionUrl) {
  return googleRequest("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    body: JSON.stringify({
      inspectionUrl,
      siteUrl: siteProperty,
    }),
  });
}

function compactInspection(entry, inspection) {
  const status = inspection?.inspectionResult?.indexStatusResult ?? {};

  return {
    url: entry.loc,
    lastmod: entry.lastmod,
    verdict: status.verdict ?? "UNKNOWN",
    coverageState: status.coverageState ?? "UNKNOWN",
    indexingState: status.indexingState ?? "UNKNOWN",
    pageFetchState: status.pageFetchState ?? "UNKNOWN",
    robotsTxtState: status.robotsTxtState ?? "UNKNOWN",
    lastCrawlTime: status.lastCrawlTime ?? "",
    googleCanonical: status.googleCanonical ?? "",
    userCanonical: status.userCanonical ?? "",
  };
}

function isIndexedStatus(result) {
  return result.verdict === "PASS";
}

async function sleep(ms) {
  if (ms <= 0) {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function indexStatus(flags) {
  const config = getConfig(flags);
  const delayMs = Number(flags.get("delay-ms") ?? 250);
  const limit = flags.has("limit") ? Number(flags.get("limit")) : undefined;
  const entries = filterEntries(await loadSitemapEntries(config.sitemapUrl), flags).slice(0, limit);
  const results = [];

  console.log(`Inspecting ${entries.length} URLs for property ${config.siteProperty}`);

  for (const [index, entry] of entries.entries()) {
    const inspection = await inspectUrl(config.siteProperty, entry.loc);
    const compact = compactInspection(entry, inspection);

    results.push(compact);
    console.log(
      `${String(index + 1).padStart(3, "0")}/${entries.length} ${compact.verdict.padEnd(8)} ${compact.coverageState} ${compact.url}`
    );
    await sleep(delayMs);
  }

  const indexed = results.filter(isIndexedStatus).length;
  const unindexed = results.length - indexed;

  if (flags.has("json")) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    console.log("");
    console.table(
      results.map((result) => ({
        verdict: result.verdict,
        coverageState: result.coverageState,
        lastCrawlTime: result.lastCrawlTime,
        url: result.url,
      }))
    );
  }

  console.log(`Indexed/pass: ${indexed}`);
  console.log(`Needs attention: ${unindexed}`);

  if (flags.has("fail-on-unindexed") && unindexed > 0) {
    process.exitCode = 2;
  }
}

function printUsage() {
  console.log(`Usage:
  npm run seo:submit-sitemap
  npm run seo:index-status
  npm run seo:oauth-login

Commands:
  oauth-login                 Connect your own Google account and print a refresh token.
  submit-sitemap              Fetch and submit the production sitemap to Google Search Console.
  index-status                Inspect sitemap URLs through the URL Inspection API.

Useful flags:
  --dry-run                   Fetch and validate sitemap without submitting it.
  --blog-only                 Monitor blog indexes and canonical article URLs.
  --limit=10                  Inspect only the first N URLs.
  --delay-ms=250              Delay between inspection calls.
  --json                      Print full compact JSON result.
  --fail-on-unindexed         Exit with code 2 if any inspected URL is not PASS.
  --site=https://letkasni.rs  Override public site URL.
  --property=https://letkasni.rs/ or --property=sc-domain:letkasni.rs
  --no-open                   Print OAuth URL without opening the browser.
`);
}

async function main() {
  loadLocalEnv();

  const [command, ...rest] = process.argv.slice(2);
  const { flags } = parseArgs(rest);

  if (!command || command === "--help" || command === "-h" || flags.has("help")) {
    printUsage();
    return;
  }

  if (command === "submit-sitemap") {
    await submitSitemap(flags);
    return;
  }

  if (command === "oauth-login") {
    await oauthLogin(flags);
    return;
  }

  if (command === "index-status") {
    await indexStatus(flags);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
