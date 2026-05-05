import fs from "node:fs";
import Module from "node:module";
import { createRequire } from "node:module";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const require = createRequire(import.meta.url);
const reportPath = path.join(root, "reports/content-link-graph.json");
const siteRootPaths = new Set(["/", "/en", "/blog", "/en/blog", "/privacy", "/terms"]);

function installTsRuntime() {
  const originalResolve = Module._resolveFilename;

  if (!Module._extensions[".ts"]?.__letkasniLinkGraph) {
    Module._extensions[".ts"] = (module, filename) => {
      const source = fs.readFileSync(filename, "utf8");
      const output = ts.transpileModule(source, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.React,
          esModuleInterop: true,
        },
      }).outputText;

      module._compile(output, filename);
    };
    Module._extensions[".ts"].__letkasniLinkGraph = true;
  }

  Module._resolveFilename = function resolveAlias(request, parent, isMain, options) {
    if (request.startsWith("@/")) {
      let resolved = path.join(root, "src", request.slice(2));

      if (fs.existsSync(`${resolved}.ts`)) {
        resolved = `${resolved}.ts`;
      } else if (fs.existsSync(`${resolved}.tsx`)) {
        resolved = `${resolved}.tsx`;
      } else if (fs.existsSync(path.join(resolved, "index.ts"))) {
        resolved = path.join(resolved, "index.ts");
      }

      return resolved;
    }

    return originalResolve.call(this, request, parent, isMain, options);
  };
}

function normalizeInternalHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }

  let parsed;

  try {
    parsed = href.startsWith("http")
      ? new URL(href)
      : new URL(href, "https://letkasni.rs");
  } catch {
    return null;
  }

  if (parsed.hostname !== "letkasni.rs") {
    return null;
  }

  const pathname = parsed.pathname.replace(/\/+$/, "") || "/";
  return pathname;
}

function collectMarkdownLinks(text) {
  const links = [];
  const pattern = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;

  while ((match = pattern.exec(text))) {
    const href = normalizeInternalHref(match[1]);
    if (href) {
      links.push(href);
    }
  }

  return links;
}

function articleText(article, locale) {
  const localized = article[locale];
  return localized.sections
    .flatMap((section) => [section.heading, ...section.body, ...(section.bullets ?? [])])
    .join("\n");
}

function cornerstoneText(page, locale) {
  const localized = page[locale];
  return [
    localized.title,
    localized.description,
    localized.excerpt,
    ...localized.sections.flatMap((section) => [
      section.heading,
      ...section.body,
      ...(section.bullets ?? []),
    ]),
    ...localized.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join("\n");
}

installTsRuntime();

const { blogArticles } = require(path.join(root, "src/lib/blog.ts"));
const {
  cornerstonePages,
  getArticleCornerstoneHref,
  getCornerstoneHref,
  getCornerstoneChildren,
} = require(path.join(root, "src/lib/cornerstones.ts"));

const publicPaths = new Set(siteRootPaths);
const inbound = new Map();
const brokenLinks = [];

function addPublicPath(pathname) {
  publicPaths.add(pathname);
  if (!inbound.has(pathname)) {
    inbound.set(pathname, new Set());
  }
}

for (const page of cornerstonePages) {
  addPublicPath(getCornerstoneHref(page, "sr"));
  addPublicPath(getCornerstoneHref(page, "en"));
}

for (const article of blogArticles) {
  addPublicPath(getArticleCornerstoneHref(article, "sr"));
  addPublicPath(getArticleCornerstoneHref(article, "en"));
}

function addInbound(from, to) {
  if (!inbound.has(to)) {
    inbound.set(to, new Set());
  }
  inbound.get(to).add(from);
}

function inspectLinks(from, text) {
  for (const to of collectMarkdownLinks(text)) {
    if (!publicPaths.has(to)) {
      brokenLinks.push({ from, to });
    } else {
      addInbound(from, to);
    }
  }
}

for (const page of cornerstonePages) {
  for (const locale of ["sr", "en"]) {
    const from = getCornerstoneHref(page, locale);
    inspectLinks(from, cornerstoneText(page, locale));

    for (const child of getCornerstoneChildren(page, locale)) {
      addInbound(from, getArticleCornerstoneHref(child, locale));
    }
  }
}

for (const article of blogArticles) {
  for (const locale of ["sr", "en"]) {
    const from = getArticleCornerstoneHref(article, locale);
    inspectLinks(from, articleText(article, locale));
  }
}

for (const article of blogArticles) {
  addInbound("/blog", getArticleCornerstoneHref(article, "sr"));
  addInbound("/en/blog", getArticleCornerstoneHref(article, "en"));
}

for (const page of cornerstonePages) {
  addInbound("/", getCornerstoneHref(page, "sr"));
  addInbound("/en", getCornerstoneHref(page, "en"));
}

const orphanPages = [...publicPaths]
  .filter((pathname) => !siteRootPaths.has(pathname))
  .filter((pathname) => (inbound.get(pathname)?.size ?? 0) === 0)
  .sort();

const report = {
  generatedAt: new Date().toISOString(),
  status: brokenLinks.length || orphanPages.length ? "fail" : "pass",
  summary: {
    publicPathCount: publicPaths.size,
    brokenLinkCount: brokenLinks.length,
    orphanPageCount: orphanPages.length,
  },
  brokenLinks,
  orphanPages,
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

if (report.status === "fail") {
  console.error("Content link graph failed.");
  console.error(`Broken links: ${brokenLinks.length}`);
  console.error(`Orphan pages: ${orphanPages.length}`);
  console.error(`Report written to ${path.relative(root, reportPath)}`);
  process.exit(1);
}

console.log("Content link graph passed.");
console.log(`Report written to ${path.relative(root, reportPath)}`);
