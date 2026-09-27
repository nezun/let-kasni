import assert from "node:assert/strict";
import test from "node:test";

import { findCopyRuleViolations } from "./check-home-copy-rules.mjs";

const rules = (text, locale = "sr") =>
  findCopyRuleViolations([{ locale, path: "test", text }]).map((violation) => violation.rule);

test("brand is written as Letkasni.rs with a capital L", () => {
  assert.deepEqual(rules("Pišite nam na letkasni.rs"), ["brand"]);
  assert.deepEqual(rules("Why LetKasni.rs", "en"), ["brand"]);
  assert.deepEqual(rules("Zašto Letkasni.rs"), []);
  assert.deepEqual(rules("kontakt@letkasni.rs"), []);
  assert.deepEqual(rules("https://letkasni.rs/blog"), []);
});

test("copy does not promise payout timelines", () => {
  assert.deepEqual(rules("Isplata stiže za 1-2 meseca."), ["payout-timeline"]);
  assert.deepEqual(rules("Novac je na računu za nekoliko nedelja."), ["payout-timeline"]);
  assert.deepEqual(rules("Paid within two months.", "en"), ["payout-timeline"]);
  assert.deepEqual(rules("Provera traje manje od 2 minuta."), []);
  assert.deepEqual(rules("Zavisi od slučaja, pa rok isplate ne obećavamo."), []);
});

test("delay copy does not mention cancellation", () => {
  assert.deepEqual(rules("Kašnjenje ili otkazivanje leta"), ["delay-without-cancellation"]);
  assert.deepEqual(rules("Delayed or cancelled flight?", "en"), ["delay-without-cancellation"]);
  assert.deepEqual(rules("Let je otkazan"), []);
  assert.deepEqual(rules("Letkasni.rs pomaže i kada je let otkazan"), []);
});
