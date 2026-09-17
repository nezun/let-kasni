import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Regression: META-001 — loaded SDK kept tracking after withdrawal; scoped cookies survived.
// Found by /qa on 2026-09-17. Report: docs/META-QA-PREVIEW-2026-09-17.md.
// External SDK behavior is mocked here; actual Preview verification is separate.
function fixture(hostname = "qa.vercel.app") {
  const writes = [];
  const commands = [];
  const jar = new Map();
  const seed = (name, domain = "") => jar.set(`${name}|${domain}`, "TEST");
  const document = {
    documentElement: { dataset: {} },
    get cookie() {
      return [...jar].map(([key, value]) => `${key.split("|")[0]}=${value}`).join("; ");
    },
    set cookie(value) {
      writes.push(value);
      const [pair, ...attributes] = value.split(";").map((part) => part.trim());
      const domain = attributes.find((part) => part.toLowerCase().startsWith("domain="))?.slice(7).replace(/^\./, "") ?? "";
      const name = pair.split("=", 1)[0];
      if (attributes.includes("Max-Age=0")) jar.delete(`${name}|${domain}`);
      else jar.set(`${name}|${domain}`, pair.slice(name.length + 1));
    },
  };
  const makeStorage = () => {
    const values = new Map();
    return { get length() { return values.size; }, key: (index) => [...values.keys()][index], getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) };
  };
  const listeners = new Map();
  const window = {
    location: new URL(`https://${hostname}/`),
    localStorage: makeStorage(), sessionStorage: makeStorage(),
    fbq: (...args) => commands.push(args),
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: (name) => listeners.delete(name),
    dispatchEvent: (event) => listeners.get(event.type)?.(),
  };
  const modules = new Map();
  function load(name) {
    if (modules.has(name)) return modules.get(name).exports;
    const loadedModule = { exports: {} };
    modules.set(name, loadedModule);
    const source = readFileSync(new URL(`../src/${name.slice(2)}.ts`, import.meta.url), "utf8");
    vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText,
      { module: loadedModule, exports: loadedModule.exports, require: load, window, document, Event, Date });
    return loadedModule.exports;
  }
  return { window, document, commands, writes, seed, jar, load, consent: load("@/lib/consent") };
}

test("withdrawal revokes the loaded SDK synchronously before deleting any cookies", () => {
  const run = fixture();
  run.seed("_fbp", "qa.vercel.app");
  run.window.fbq = (...args) => {
    assert.equal(run.writes.length, 0);
    run.commands.push(args);
  };
  run.consent.setTrackingConsent("denied");
  assert.deepEqual(run.commands, [["consent", "revoke"]]);
  assert.equal(run.consent.hasMarketingConsent(), false);
});

test("withdrawal clears only optional root cookies at host-only/current/parent domain scopes", () => {
  const run = fixture("www.letkasni.rs");
  for (const domain of ["", "www.letkasni.rs", "letkasni.rs"]) {
    for (const name of ["_fbp", "_fbc", "_ga", "_gcl_au"]) run.seed(name, domain);
    run.seed("required-session", domain);
  }
  run.consent.setTrackingConsent("denied");
  assert.equal([...run.jar.keys()].some((key) => /^_(fbp|fbc|ga|gcl)/.test(key)), false);
  assert.equal([...run.jar.keys()].filter((key) => key.startsWith("required-session|")).length, 3);
});

test("privacy-settings reset also revokes; a missing SDK is not initialized", () => {
  const run = fixture();
  run.seed("_fbp", "qa.vercel.app");
  run.consent.clearTrackingConsent();
  assert.deepEqual(run.commands, [["consent", "revoke"]]);
  assert.equal(run.jar.has("_fbp|qa.vercel.app"), false);
  delete run.window.fbq;
  assert.doesNotThrow(() => run.consent.setTrackingConsent("denied"));
  assert.equal(run.window.fbq, undefined);
});

test("analytics-only acceptance revokes advertising but retains analytics and required cookies", () => {
  const run = fixture();
  run.seed("_fbp", "qa.vercel.app"); run.seed("_ga", "qa.vercel.app"); run.seed("required-session");
  run.consent.setTrackingConsent({ analytics: true, marketing: false, ts: Date.now() });
  assert.deepEqual(run.commands, [["consent", "revoke"]]);
  assert.equal(run.jar.has("_fbp|qa.vercel.app"), false);
  assert.equal(run.jar.has("_ga|qa.vercel.app"), true);
  assert.equal(run.jar.has("required-session|"), true);
});

function pixelFixture({ marketing = true, pathname = "/", readyPath = pathname } = {}) {
  const run = fixture();
  run.consent.setTrackingConsent(marketing ? "granted" : "denied");
  run.commands.length = 0;
  let effectIndex = 0;
  const overrides = {
    react: {
      useRef: (value) => ({ current: value }),
      useState: () => [marketing, () => {}],
      useEffect: (effect) => { if (effectIndex++ === 0) effect(); },
    },
    "react/jsx-runtime": { jsx: (type, props) => ({ type, props }) },
    "next/script": "Script",
    "next/navigation": { usePathname: () => pathname, useSearchParams: () => null },
    "@/lib/env": { getMetaPixelId: () => "LOCAL_PIXEL_NOT_LIVE" },
  };
  const loadedModule = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../src/components/meta-pixel.tsx", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText, { module: loadedModule, exports: loadedModule.exports, require: (name) => name in overrides ? overrides[name] : run.load(name), window: run.window });
  const script = loadedModule.exports.MetaPixel();
  run.window.location.pathname = readyPath;
  return { ...run, script };
}

test("loaded Pixel receives revoke on admin transition without emitting a pageview", () => {
  const run = pixelFixture({ pathname: "/admin" });
  assert.equal(run.script, null);
  assert.deepEqual(run.commands, [["consent", "revoke"]]);
});

test("bootstrap starts revoked, disables automatic handlers, initializes once and grants only in guarded ready callback", () => {
  const run = pixelFixture();
  assert.ok(run.script.props.children.includes("fbq('consent', 'revoke')"));
  assert.ok(run.script.props.children.includes("fbq('set', 'autoConfig', false"));
  assert.equal(run.script.props.children.includes("fbq('track'"), false);
  run.commands.length = 0;
  run.script.props.onReady(); run.script.props.onReady();
  assert.equal(run.commands.filter(([command]) => command === "init").length, 0);
  assert.equal(run.commands.filter(([command, event]) => command === "track" && event === "PageView").length, 1);
  assert.equal(run.commands.some(([command, event]) => command === "track" && event === "Lead"), false);
});

test("a delayed ready callback cannot grant consent or queue a PageView after withdrawal or private navigation", () => {
  for (const scenario of ["withdrawn", "admin"]) {
    const run = pixelFixture({ readyPath: scenario === "admin" ? "/admin/claims/TEST" : "/" });
    if (scenario === "withdrawn") run.consent.setTrackingConsent("denied");
    run.commands.length = 0;
    run.script.props.onReady();
    assert.deepEqual(run.commands, [["consent", "revoke"]]);
  }
});
