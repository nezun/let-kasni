import assert from "node:assert/strict";
import fs from "node:fs";
import Module, { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

// Use the same content loader as the source-map and existing content QA tools.
const require = createRequire(import.meta.url);
const resolve = Module._resolveFilename;
Module._extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText, filename);
};
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(process.cwd(), "src", request.slice(2));
  return resolve.call(this, request, parent, isMain, options);
};

const airlines = require("../src/content/seo-retired-airlines.json");
const programmatic = require("../src/content/seo-retired-programmatic.json");
const suggested = require("../src/content/seo-suggested-removals.json");
const retired = { status: 404, articles: [...airlines.articles, ...programmatic.articles] };
const { blogArticles: rawArticles } = require("../src/content/blog/index.ts");
const { blogArticles } = require("../src/lib/blog.ts");
const { cornerstonePages, getArticleCornerstoneHref } = require("../src/lib/cornerstones.ts");
const { default: sitemap } = require("../src/app/sitemap.ts");
const ids = new Set(retired.articles.map(a => a.id));
const paths = new Set(retired.articles.flatMap(a => [a.sr, a.en]));
const slugs = new Set([...paths].map(p => p.split("/").at(-1)));
const aliases = new Set([...slugs].flatMap(slug => [`/blog/${slug}`, `/en/blog/${slug}`]));
const allPaths = new Set([...paths, ...aliases]);

function assertAllowed(article) {
  assert.ok(!ids.has(article.id), `Retired airline article returned: ${article.id}`);
  for (const locale of ["sr", "en"]) {
    assert.ok(!slugs.has(article[locale].slug), `Retired slug returned: ${article[locale].slug}`);
    assert.ok(!["Airlines", "Aviokompanije"].includes(article[locale].category), `Airline-specific generation is retired: ${article.id}`);
  }
}

test("retirement manifests cover only approved airline and regional pages", () => {
  assert.equal(retired.status, 404);
  assert.equal(airlines.articles.length, 46);
  assert.equal(programmatic.articles.length, 16);
  assert.ok(programmatic.articles.every(a => a.family === "regional_route_airport_articles" && !a.previouslyRedirected));
  assert.equal(ids.size, 62);
  assert.equal(paths.size, 124);
  assert.equal(aliases.size, 248);
  assert.equal(allPaths.size, 372);
  for (const article of retired.articles) {
    assert.ok(article.sr.startsWith("/") && !article.sr.startsWith("/en/"));
    assert.ok(article.en.startsWith("/en/"));
  }
});

test("general articles and original guides remain; suggestions are not removals", () => {
  assert.equal(fs.readdirSync("src/content/blog").filter(f => /^daily-/.test(f)).length, 10);
  assert.equal(suggested.applyRemoval, false);
  assert.equal(suggested.approvalRequired, true);
  assert.equal(suggested.currentAction, "KEEP_PUBLISHED");
  assert.equal(suggested.articles.length, 47);
  assert.equal(new Set(suggested.articles.map(a => a.id)).size, 47);
  assert.equal(blogArticles.length, 68);
  for (const entry of suggested.articles) {
    const article = blogArticles.find(a => a.id === entry.id);
    assert.ok(article, `Suggested article must remain published: ${entry.id}`);
    for (const locale of ["sr", "en"]) assert.equal(getArticleCornerstoneHref(article, locale), entry[locale]);
  }
  for (const id of ["airport-action-plan", "missed-connection", "documents-for-claim", "eu261-ecaa-serbia"]) {
    assert.ok(blogArticles.some(a => a.id === id), `Original guide missing: ${id}`);
  }
  assert.equal(cornerstonePages.length, 8);
});

test("remaining permanent redirects never point at retired targets", () => {
  const groups = require("../src/content/seo-consolidations.json");
  assert.deepEqual(groups.map(g => g.group), ["A", "B", "C", "D", "E", "F"]);
  const live = new Set(sitemap().map(entry => new URL(entry.url).pathname));
  for (const group of groups) for (const locale of ["sr", "en"]) {
    assert.ok(!allPaths.has(group[locale].source));
    assert.ok(!allPaths.has(group[locale].target));
    assert.ok(live.has(group[locale].target));
  }
});

test("raw publication feed and enhanced articles cannot revive airline pages", () => {
  rawArticles.forEach(assertAllowed);
  blogArticles.forEach(assertAllowed);
});

test("guard also rejects an airline generator using a new ID", () => {
  const candidate = structuredClone(rawArticles[0]);
  candidate.id = "new-airline-page";
  candidate.en.category = "Airlines";
  assert.throws(() => assertAllowed(candidate), /generation is retired/);
  candidate.en.category = "Rights";
  candidate.en.slug = [...slugs][0];
  assert.throws(() => assertAllowed(candidate), /Retired slug/);
});

test("main guide child lists contain no retired airline IDs", () => {
  for (const guide of cornerstonePages) {
    for (const id of guide.childArticleIds) assert.ok(!ids.has(id), `${guide.id}: ${id}`);
  }
});

test("sitemap excludes retired URLs and keeps every active localized article", () => {
  const entries = sitemap().map(entry => new URL(entry.url).pathname);
  assert.equal(entries.length, 158);
  assert.equal(entries.length, new Set(entries).size);
  entries.forEach(p => assert.ok(!allPaths.has(p), p));
  for (const article of blogArticles) {
    for (const locale of ["sr", "en"]) assert.ok(entries.includes(getArticleCornerstoneHref(article, locale)));
  }
});

test("remaining article and guide body links cannot point at retired URLs", () => {
  for (const page of [...blogArticles, ...cornerstonePages]) {
    for (const locale of ["sr", "en"]) {
      for (const [, target] of JSON.stringify(page[locale].sections).matchAll(/\]\(([^)]+)\)/g)) {
        const url = new URL(target, "https://letkasni.rs");
        if (url.hostname === "letkasni.rs" || url.hostname === "www.letkasni.rs") {
          assert.ok(!allPaths.has(url.pathname.replace(/\/$/, "")), `${page.id}: ${target}`);
        }
      }
    }
  }
});
