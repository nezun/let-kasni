import assert from "node:assert/strict";
import test from "node:test";

import { cssFiles, rewriteCss } from "./lk-v2-sync.mjs";

test("fontovi iz tokens.css idu na /lk/fonts/, ostali CSS ostaje isti", () => {
  const tokens = rewriteCss("tokens.css", '@font-face{src:url("../assets/fonts/Gilroy-SemiBold.woff2")}');
  assert.ok(tokens.includes('url("/lk/fonts/Gilroy-SemiBold.woff2")'));
  const other = rewriteCss("letkasni.css", ".lk-hero{color:red}");
  assert.ok(other.endsWith(".lk-hero{color:red}"));
  assert.ok(other.startsWith("/* GENERISANO"));
});

test("components.css ostaje uz primitives.css, jer ga uvozi relativno", () => {
  const names = cssFiles.map(([, to]) => to);
  assert.ok(names.includes("components.css") && names.includes("primitives.css"));
});
