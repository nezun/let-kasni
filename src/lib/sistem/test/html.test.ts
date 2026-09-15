// node --test src/lib/sistem/test/html.test.ts
import test from "node:test";
import assert from "node:assert/strict";

import { tekstUHtml } from "../html.ts";

test("numerisane stavke postaju prava lista, podebljano i linkovi", () => {
  const html = tekstUHtml("Poštovani Marko,\n\nPošaljite:\n\n1. boarding kartu\n2. ličnu kartu\n\n*postoji osnov* https://letkasni.rs/x\n\nSrdačno,\n\nPodrška Letkasni.rs");
  assert.match(html, /<ol[^>]*><li[^>]*>boarding kartu<\/li><li[^>]*>ličnu kartu<\/li><\/ol>/);
  assert.match(html, /<strong>postoji osnov<\/strong>/);
  assert.match(html, /<a href="https:\/\/letkasni\.rs\/x">/);
  assert.match(html, /<p[^>]*>Podrška Letkasni\.rs<\/p>/);
});

test("HTML iz teksta je bezbedan (tekst klijenta se ne izvršava)", () => {
  assert.ok(!tekstUHtml("Poštovani <script>x</script>,").includes("<script>"));
});
