// node --test src/lib/sistem/pravila/eu261.test.ts
import test from "node:test";
import assert from "node:assert/strict";

import EVAL from "./eval/slucajevi.json" with { type: "json" };
import { proceni, rasponKasnjenja } from "./eu261.ts";

const { slucajevi } = EVAL as unknown as { slucajevi: Array<{ id: string; cinjenice: unknown; ocekivano: Record<string, unknown> }> };

for (const s of slucajevi) {
  test(`${s.id}: ${s.ocekivano.nalaz}`, () => {
    const r = proceni(s.cinjenice);
    const kontekst = `\n${JSON.stringify({ nalaz: r.nalaz, koraci: r.koraci, fali: r.sta_fali, hr: r.human_review }, null, 1)}`;
    assert.equal(r.nalaz, s.ocekivano.nalaz, kontekst);
    if ("iznos_eur" in s.ocekivano) assert.equal(r.iznos_eur, s.ocekivano.iznos_eur, kontekst);
    if ("granicno" in s.ocekivano) assert.equal(r.granicno, s.ocekivano.granicno, kontekst);
    if ("kasnjenje_min_od" in s.ocekivano) assert.equal(r.kasnjenje?.minimalno, s.ocekivano.kasnjenje_min_od, kontekst);
  });
}

test("zone: isti trenutak u različitim zonama daje 0 min", () => {
  assert.equal(rasponKasnjenja({ sta: ["2026-08-23T09:00+03:00"], vrata: ["2026-08-23T08:00+02:00"] })?.minimalno, 0);
});

test("noćni let preko ponoći", () => {
  assert.equal(rasponKasnjenja({ sta: ["2026-08-24T23:30+02:00"], vrata: ["2026-08-25T02:45+02:00"] })?.minimalno, 195);
});

test("vreme bez zone je greška, ne pretpostavka", () => {
  assert.throws(() => rasponKasnjenja({ sta: ["2026-08-25T00:30"], vrata: ["2026-08-25T02:45+02:00"] }));
});
