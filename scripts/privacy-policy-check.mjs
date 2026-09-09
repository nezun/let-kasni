import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pages = [
  ["src/app/privacy/page.tsx", "sr"],
  ["src/app/en/privacy/page.tsx", "en"],
];

for (const [path, locale] of pages) {
  const source = await readFile(path, "utf8");
  const sectionNumbers = [...source.matchAll(/<Section title="(\d+)\./g)].map((match) => Number(match[1]));
  assert.deepEqual(sectionNumbers, Array.from({ length: 14 }, (_, index) => index + 1), `${path} must contain articles 1-14 in order`);
  assert.match(source, /PP 1\.2/);
  assert.match(source, /09\.09\.2026|9 September 2026/);
  assert.match(source, /VGA EU CONSULTING DOO/);
  assert.doesNotMatch(source, /Expatwise|support@letkasni\.rs|privacy@letkasni\.rs/);
  assert.match(source, locale === "sr" ? /kontakt@letkasni\.rs|siteOperator\.email\.sr/ : /office@letkasni\.rs|siteOperator\.email\.en/);
  assert.match(source, /PrivacyServiceOverview/);
  assert.match(source, /article-12/);
}

console.log("Privacy Policy 1.2 SR/EN structure and required controls are present.");
