import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import ts from "typescript";

// Match the existing content-check runtime so the inventory uses actual generators.
const root = process.cwd();
const require = createRequire(import.meta.url);
const originalResolve = Module._resolveFilename;
Module._extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText, filename);
};
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(root, "src", request.slice(2));
  return originalResolve.call(this, request, parent, isMain, options);
};
const { blogArticles } = require("../src/lib/blog.ts");
const { cornerstonePages, getArticleCornerstoneHref, getCornerstoneHref } = require("../src/lib/cornerstones.ts");
const directory = path.join(root, "src/content/blog");
const sources = fs.readdirSync(directory).filter(f => f !== "index.ts").map(f => {
  const contents = require(path.join(directory, f));
  return { filename: `src/content/blog/${f}`, articles: contents.articles ?? (contents.article ? [contents.article] : []) };
});
const rows = blogArticles.flatMap(article => ["sr", "en"].map(locale => {
  const source = sources.find(s => s.articles.some(a => a.id === article.id));
  const raw = source?.articles.find(a => a.id === article.id);
  return {
    url: `https://letkasni.rs${getArticleCornerstoneHref(article, locale)}`,
    id: article.id, locale, content_source: source?.filename,
    template: "BlogArticlePageView", generated: (source?.articles.length ?? 0) > 1,
    title: article[locale].title, sections: article[locale].sections,
    original_sections: raw?.[locale].sections,
    enhancement_sections: article[locale].sections.slice(raw?.[locale].sections.length ?? 0),
  };
}));
rows.push(...cornerstonePages.flatMap(page => ["sr", "en"].map(locale => ({
  url: `https://letkasni.rs${getCornerstoneHref(page, locale)}`,
  id: page.id, locale, content_source: "src/lib/cornerstones.ts",
  template: "CornerstoneTypographyPreview", generated: false,
  title: page[locale].title, sections: page[locale].sections,
}))));
fs.mkdirSync("seo-audit-output", { recursive: true });
const output = process.argv.find(arg => arg.startsWith("--output="))?.slice(9) || "seo-audit-output/source-map.json";
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(rows, null, 2));
console.log(`Mapped ${rows.length} localized articles and guides from repository data.`);
