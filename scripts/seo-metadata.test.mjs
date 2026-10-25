import assert from "node:assert/strict";
import fs from "node:fs";
import Module, { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

// Execute the real metadata functions, using the content QA loader convention.
// Only large visual page views are replaced: content, routing, React and the
// shared claim card remain real. A Next server/browser is not needed here.
const require = createRequire(import.meta.url);
const resolve = Module._resolveFilename;
const load = Module._load;
const BlogIndexPage = () => null;
const BlogArticlePageView = () => null;

for (const extension of [".ts", ".tsx"]) {
  Module._extensions[extension] = (module, filename) => {
    module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText, filename);
  };
}

Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(process.cwd(), "src", request.slice(2));
  return resolve.call(this, request, parent, isMain, options);
};
Module._load = function (request, parent, isMain) {
  if (request === "@/components/blog-index-page") return { BlogIndexPage };
  if (request === "@/components/blog-article-page") return { BlogArticlePageView };
  return load.call(this, request, parent, isMain);
};

// Approved editorial values are independent of runtime content. They also lock
// the old visible article headings, so shortening SEO titles cannot rewrite H1s.
const approvedTitles = require("./fixtures/seo-metadata-titles.json");
const approvedById = new Map(approvedTitles.map((entry) => [entry.id, entry]));
const { blogArticles } = require("../src/lib/blog.ts");
const { getArticleCornerstoneHref, getCornerstoneForArticle } = require("../src/lib/cornerstones.ts");
const blogRoutes = {
  sr: require("../src/app/blog/page.tsx"),
  en: require("../src/app/en/blog/page.tsx"),
};
const articleRoutes = {
  sr: require("../src/app/[cornerstone]/[slug]/page.tsx"),
  en: require("../src/app/en/[cornerstone]/[slug]/page.tsx"),
};
const { ClaimStartCard } = require("../src/components/claim-start-card.tsx");
const languages = { sr: "/blog", en: "/en/blog", "x-default": "/blog" };

test("the approved title set has 23 bilingual articles and unique canonical paths", () => {
  assert.equal(approvedTitles.length, 23);
  assert.equal(approvedById.size, 23);
  const paths = approvedTitles.flatMap((entry) => [entry.sr.path, entry.en.path]);
  assert.equal(new Set(paths).size, 46);
  for (const entry of approvedTitles) {
    assert.ok(blogArticles.some((article) => article.id === entry.id), entry.id);
  }
});

for (const locale of ["sr", "en"]) {
  const blogRoute = blogRoutes[locale];
  const canonical = locale === "sr" ? "/blog" : "/en/blog";

  test(`${locale}: bare blog and unrelated query parameters retain reciprocal language alternates`, async () => {
    for (const props of [
      {},
      { searchParams: Promise.resolve({}) },
      { searchParams: Promise.resolve({ tema: undefined }) },
      { searchParams: Promise.resolve({ utm_source: "audit", utm_campaign: "blog" }) },
    ]) {
      const metadata = await blogRoute.generateMetadata(props);
      assert.equal(metadata.alternates.canonical, canonical);
      assert.deepEqual(metadata.alternates.languages, languages);
      assert.equal(metadata.title, "Blog | letkasni.rs");
    }
  });

  test(`${locale}: every filter URL keeps the bare canonical and omits hreflang`, async () => {
    const baseline = await blogRoute.generateMetadata({});
    for (const tema of [
      "delays", "cancellations", "connections", "documents", "procedure",
      "all", "", "unknown-category", ["delays", "cancellations"], [], [""],
    ]) {
      const metadata = await blogRoute.generateMetadata({ searchParams: Promise.resolve({ tema }) });
      const label = `${locale}: tema=${JSON.stringify(tema)}`;
      assert.equal(metadata.alternates.canonical, canonical, label);
      assert.ok(metadata.alternates.languages == null, `${label} must not emit language alternates`);
      assert.deepEqual({
        ...metadata,
        alternates: { ...metadata.alternates, languages: baseline.alternates.languages },
      }, baseline, `${label} must not change other metadata`);
    }
  });

  test(`${locale}: all article routes use approved SEO titles or the existing title fallback`, async () => {
    const customTitles = [];
    for (const article of blogArticles) {
      const content = article[locale];
      const approved = approvedById.get(article.id)?.[locale];
      const routePath = getArticleCornerstoneHref(article, locale);
      const props = {
        params: Promise.resolve({
          cornerstone: getCornerstoneForArticle(article)[locale].slug,
          slug: content.slug,
        }),
      };
      const metadata = await articleRoutes[locale].generateMetadata(props);
      if (approved) {
        customTitles.push(article.id);
        assert.equal(routePath, approved.path, article.id);
        assert.equal(content.title, approved.heading, `${article.id}: visible heading changed`);
        assert.equal(content.seoTitle, approved.seoTitle, article.id);
        assert.equal(metadata.title, `${approved.seoTitle} | letkasni.rs`, article.id);
        assert.ok(metadata.title.length <= 60, `${article.id}: approved title exceeds 60 characters`);
      } else {
        assert.equal(content.seoTitle, undefined, `${article.id}: unapproved SEO title override`);
        assert.equal(metadata.title, `${content.title} | letkasni.rs`, article.id);
      }
      assert.equal(metadata.alternates.canonical, routePath, article.id);
      assert.equal(metadata.description, content.description, article.id);
      assert.equal(metadata.openGraph.title, content.title, `${article.id}: social title changed`);
      assert.equal(metadata.twitter.title, content.title, `${article.id}: Twitter title changed`);

      // The actual route must still pass the same article to its page view.
      const page = await articleRoutes[locale].default(props);
      assert.equal(page.type, BlogArticlePageView);
      assert.equal(page.props.article, article);
      assert.equal(page.props.locale, locale);
    }
    assert.equal(customTitles.length, 23);
  });

  test(`${locale}: the shared claim card renders one unchanged question as H2 and no H1`, () => {
    const html = renderToStaticMarkup(createElement(ClaimStartCard, { locale }));
    const question = locale === "sr" ? "Šta se dogodilo sa Vašim letom?" : "What happened to your flight?";
    const heading = [...html.matchAll(/<h([1-6])\b([^>]*)>(.*?)<\/h\1>/g)];
    assert.equal(heading.length, 1);
    assert.equal(heading[0][1], "2");
    assert.equal(heading[0][3], question);
    assert.equal(heading[0][2], ' class="font-display text-[21px] font-bold leading-[1.22]"');
    assert.equal((html.match(/type="radio"/g) ?? []).length, 3);
    assert.equal((html.match(/<button\b/g) ?? []).length, 1);
  });
}
