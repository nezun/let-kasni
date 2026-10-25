import assert from "node:assert/strict";
import fs from "node:fs";
import Module, { createRequire } from "node:module";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

// Load the real component and next/link with the existing content-check loader
// convention. Rendering multiple paragraphs catches per-instance style output.
const require = createRequire(import.meta.url);
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
const { InlineRichText } = require("../src/components/inline-rich-text.tsx");

function renderParagraphs(locale, texts) {
  return renderToStaticMarkup(createElement("div", null,
    ...texts.map((text, index) => createElement("p", { key: index },
      createElement(InlineRichText, { text, locale }))),
  ));
}

function anchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>(.*?)<\/a>/g)].map(([, attributes, label]) => ({
    href: /\bhref="([^"]*)"/.exec(attributes)?.[1],
    className: /\bclass="([^"]*)"/.exec(attributes)?.[1],
    label,
  }));
}

function visibleText(html) {
  return html.replace(/<(style|script)\b[^>]*>[\s\S]*?<\/\1>/gi, "").replace(/<[^>]*>/g, "");
}

const examples = {
  sr: {
    paragraphs: [
      "Pročitajte [pravila](/pravila) pre slanja zahteva.",
      "Sačuvajte [dokaze](/dokazi) i potvrdu rezervacije.",
    ],
    visible: "Pročitajte pravila pre slanja zahteva.Sačuvajte dokaze i potvrdu rezervacije.",
    labels: ["pravila", "dokaze"],
    plain: "Kašnjenje leta, tehnički kvar i dokumenta proveravamo zajedno.",
    duplicates: "[pravila](/pravila), [drugi naziv](/pravila/#dokaz), [ PRAVILA ](/drugo) i [dokaze](/dokazi)",
  },
  en: {
    paragraphs: [
      "Read the [rules](/rules) before sending your claim.",
      "Keep the [evidence](/evidence) and booking confirmation.",
    ],
    visible: "Read the rules before sending your claim.Keep the evidence and booking confirmation.",
    labels: ["rules", "evidence"],
    plain: "We review the flight delay, technical fault and documents together.",
    duplicates: "[rules](/rules), [another label](/rules/#evidence), [ RULES ](/other) and [evidence](/evidence)",
  },
};

for (const [locale, example] of Object.entries(examples)) {
  test(`${locale}: multiple paragraphs preserve visible text, editorial anchors and shared link class without inline CSS`, () => {
    const html = renderParagraphs(locale, example.paragraphs);
    assert.equal(visibleText(html), example.visible);
    assert.deepEqual(anchors(html), example.labels.map((label, index) => ({
      href: locale === "sr" ? ["/pravila", "/dokazi"][index] : ["/rules", "/evidence"][index],
      className: "lk-inline-link",
      label,
    })));
    assert.doesNotMatch(html, /<style\b|\bstyle=/i, "paragraphs must use shared CSS instead of embedding it");
  });

  test(`${locale}: plain text does not acquire automatic links by default`, () => {
    const html = renderParagraphs(locale, [example.plain, example.plain]);
    assert.deepEqual(anchors(html), []);
    assert.equal(visibleText(html), example.plain.repeat(2));
  });

  test(`${locale}: duplicate targets and anchors remain plain within each paragraph, with independent paragraph scopes`, () => {
    const html = renderParagraphs(locale, [example.duplicates, example.duplicates]);
    const links = anchors(html);
    assert.equal(links.length, 4);
    assert.deepEqual(links.slice(0, 2), links.slice(2));
    assert.deepEqual(links.map(({ label }) => label), [...example.labels, ...example.labels]);
    assert.doesNotMatch(html, /href="\/(?:drugo|other)"|href="[^\"]*#/);
    assert.match(html, locale === "sr" ? /drugi naziv,  PRAVILA / : /another label,  RULES /);
  });
}

test("editorial link labels and ordinary text retain React escaping", () => {
  const html = renderParagraphs("sr", ["Tom & Ana <putnici>: [A & B <uslovi>](/uslovi)"]);
  assert.equal(html, '<div><p>Tom &amp; Ana &lt;putnici&gt;: <a class="lk-inline-link" href="/uslovi">A &amp; B &lt;uslovi&gt;</a></p></div>');
});
