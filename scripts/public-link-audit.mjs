const baseUrl = process.env.LINK_AUDIT_BASE_URL ?? "https://letkasni.rs";
const origin = new URL(baseUrl).origin;
const legacyBlogArticlePattern = /^\/(?:en\/)?blog\/[^/?#]+/;
const ignoredPathPrefixes = ["/admin", "/api", "/claim", "/auth", "/design"];
const ignoredSchemes = ["mailto:", "tel:", "javascript:"];

const failures = [];
const checked = new Map();

function fail(type, details) {
  failures.push({ type, ...details });
}

function normalizeInternalUrl(href, fromUrl) {
  if (!href || href.startsWith("#")) {
    return null;
  }

  if (ignoredSchemes.some((scheme) => href.startsWith(scheme))) {
    return null;
  }

  let parsed;

  try {
    parsed = new URL(href, fromUrl);
  } catch {
    fail("invalid_href", { from: fromUrl, href });
    return null;
  }

  if (parsed.origin !== origin) {
    return null;
  }

  if (ignoredPathPrefixes.some((prefix) => parsed.pathname.startsWith(prefix))) {
    return null;
  }

  parsed.hash = "";
  return parsed.toString();
}

function extractUrlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const parsed = new URL(match[1]);

    if (legacyBlogArticlePattern.test(parsed.pathname)) {
      fail("legacy_blog_article_url_in_sitemap", { url: match[1] });
    }

    return new URL(`${parsed.pathname}${parsed.search}`, origin).toString();
  });
}

function extractHrefs(html) {
  return [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)].map((match) =>
    match[1].replace(/&amp;/g, "&"),
  );
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: "manual" });
  const text = await response.text().catch(() => "");
  return { response, text };
}

async function checkUrl(url, from) {
  if (checked.has(url)) {
    return checked.get(url);
  }

  const path = new URL(url).pathname;

  if (legacyBlogArticlePattern.test(path)) {
    fail("legacy_blog_article_url", { from, url });
    checked.set(url, false);
    return false;
  }

  const { response } = await fetchText(url);
  const ok = response.status >= 200 && response.status < 300;

  if (!ok) {
    fail("broken_internal_url", {
      from,
      url,
      status: response.status,
      location: response.headers.get("location") ?? undefined,
    });
  }

  checked.set(url, ok);
  return ok;
}

async function main() {
  const sitemapUrl = new URL("/sitemap.xml", origin).toString();
  const { response: sitemapResponse, text: sitemap } = await fetchText(sitemapUrl);

  if (sitemapResponse.status !== 200) {
    fail("sitemap_fetch_failed", { url: sitemapUrl, status: sitemapResponse.status });
  }

  const pageUrls = extractUrlsFromSitemap(sitemap);

  for (const pageUrl of pageUrls) {
    const page = await fetchText(pageUrl);

    if (page.response.status < 200 || page.response.status >= 300) {
      fail("sitemap_url_broken", { url: pageUrl, status: page.response.status });
      continue;
    }

    for (const href of extractHrefs(page.text)) {
      const internalUrl = normalizeInternalUrl(href, pageUrl);

      if (!internalUrl) {
        continue;
      }

      await checkUrl(internalUrl, pageUrl);
    }
  }

  if (failures.length > 0) {
    console.error("Public link audit failed.");
    console.error(JSON.stringify({ baseUrl: origin, failures }, null, 2));
    process.exit(1);
  }

  console.log(`Public link audit passed for ${origin}.`);
  console.log(`Checked ${pageUrls.length} sitemap pages and ${checked.size} linked public URLs.`);
}

await main();
