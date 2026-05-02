#!/usr/bin/env node

import { createSign } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const WEBMASTERS_SCOPE = "https://www.googleapis.com/auth/webmasters";

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

async function getAccessToken() {
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

function filterEntries(entries, flags) {
  if (!flags.has("blog-only")) {
    return entries;
  }

  return entries.filter((entry) => {
    const path = new URL(entry.loc).pathname;

    return path === "/blog" || path === "/en/blog" || path.startsWith("/blog/") || path.startsWith("/en/blog/");
  });
}

function summarizeSitemap(entries) {
  const blogCount = entries.filter((entry) => {
    const path = new URL(entry.loc).pathname;

    return path.startsWith("/blog/") || path.startsWith("/en/blog/");
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

Commands:
  submit-sitemap              Fetch and submit the production sitemap to Google Search Console.
  index-status                Inspect sitemap URLs through the URL Inspection API.

Useful flags:
  --dry-run                   Fetch and validate sitemap without submitting it.
  --blog-only                 Monitor only /blog and /en/blog URLs.
  --limit=10                  Inspect only the first N URLs.
  --delay-ms=250              Delay between inspection calls.
  --json                      Print full compact JSON result.
  --fail-on-unindexed         Exit with code 2 if any inspected URL is not PASS.
  --site=https://letkasni.rs  Override public site URL.
  --property=https://letkasni.rs/ or --property=sc-domain:letkasni.rs
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
