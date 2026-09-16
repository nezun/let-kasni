import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";

// Manual, isolated real-SDK QA. Start ga4-sdk-isolated-fixture.mjs first.
// Uses the existing gstack browser, never installs a browser or imports cookies.
// No claim/email/Meta/Ads endpoint. All SDK collector transport stays blocked.
const browse = process.env.LETKASNI_QA_BROWSE_BINARY;
assert.ok(browse, "Set LETKASNI_QA_BROWSE_BINARY to the existing gstack browse binary");
const run = (...args) => execFileSync(browse, args, { encoding: "utf8", timeout: 60000 }).trim();
const evaluate = (code) => JSON.parse(run("js", `JSON.stringify(${code})`));
// GA4 batches noninitial events; wait longer than the observed SDK flush delay.
const settle = () => run("js", "new Promise(resolve=>setTimeout(()=>resolve('settled'),10000))");
const capture = `(()=>({sdkLoaded:__qa.sdkLoaded===true,consent:__qa.consent,optOut:window['ga-disable-G-RVJ906DKVF'],leadCommands:__qa.commands.filter(v=>v[0]==='event'&&v[1]==='lead_submit').length,consentCommands:__qa.commands.filter(v=>v[0]==='consent'),hits:__qa.captures.filter(h=>new URL(h.url,location.href).pathname==='/g/collect').flatMap(h=>{const c=new URL(h.url,location.href).searchParams;return(h.body?h.body.split(String.fromCharCode(10)):['']).map(l=>{const p=new URLSearchParams(l);return{event:p.get('en')||c.get('en'),privateMarkerPresent:(h.url+l).includes('TEST_PRIVATE_MARKER_20260916'),params:Object.fromEntries([...c,...p].filter(([k])=>k.startsWith('ep.')||['dl','dr','dt','gcs','gcd'].includes(k)))}})})}))()`;
const scenarios = [];
for (const mode of ["none", "marketing", "analytics", "both"]) {
  run("goto", `http://127.0.0.1:3016/?qa_consent=${mode}&utm_source=google&utm_medium=cpc&utm_campaign=SEARCH_RS_CORE&q=TEST_PRIVATE_MARKER_20260916&email=TEST_PRIVATE_MARKER_20260916%40example.com`);
  run("js", "new Promise((resolve,reject)=>{let n=0;const check=()=>{if(__qa.sdkLoaded)return resolve('SDK loaded');if(++n>150)return reject(new Error('SDK load timeout'));setTimeout(check,100)};check()})");
  run("js", "sessionStorage.clear();__qa.navigate();__qa.lead();'navigated'");
  settle();
  const result = evaluate(capture);
  assert.equal(result.sdkLoaded, true);
  const analytics = ["analytics", "both"].includes(mode);
  const marketing = ["marketing", "both"].includes(mode);
  assert.equal(result.optOut, !analytics);
  assert.equal(result.leadCommands, analytics || marketing ? 1 : 0);
  assert.equal(result.hits.filter(h => h.event === "lead_submit").length, analytics ? 1 : 0);
  assert.equal(result.hits.filter(h => h.event === "page_view").length, analytics ? 2 : 0);
  assert.equal(result.hits.some(h => h.event === "view_search_results"), false);
  assert.equal(result.hits.some(h => h.privateMarkerPresent), false);
  scenarios.push({ mode, status: "PASS", ...result });
  console.log(`Consent ${mode}: PASS`);
}
run("js", "__qa.setConsent({analytics:false,marketing:false});__qa.move('/proveri-let?token=TEST_PRIVATE_MARKER_20260916');'revoked'");
settle();
const revoked = evaluate(capture);
assert.equal(revoked.optOut, true);
const previous = revoked.hits.length;
run("js", "__qa.move('/admin/claims/TEST_PRIVATE_MARKER_20260916?token=TEST_PRIVATE_MARKER_20260916');'private'");
settle();
const privateState = evaluate(capture);
assert.equal(privateState.hits.length, previous);
assert.equal(privateState.optOut, true);
run("js", "__qa.move('/en?email=TEST_PRIVATE_MARKER_20260916%40example.com');__qa.setConsent({analytics:true,marketing:false});'returned'");
settle();
const returned = evaluate(capture);
assert.equal(returned.optOut, false);
assert.equal(returned.hits.filter(h => h.event === "page_view").length, 3);
assert.equal(returned.hits.some(h => h.privateMarkerPresent), false);
scenarios.push({ mode: "revoke-private-return", status: "PASS", revoked, privateState, returned });

// Positive automatic events use a LOCAL form and reserved .invalid destinations.
// Private-marker link payloads are reported as FAIL, never asserted away or sent.
run("fill", "#qa-name", "TEST_PRIVATE_MARKER_20260916");
run("click", "#qa-submit");
run("click", "#qa-outbound");
run("click", "#qa-download");
settle();
const automatic = evaluate(capture);
const eventFamilies = ["form_start", "form_submit", "click", "file_download"].map(event => {
  const hits = automatic.hits.filter(h => h.event === event);
  return { event, status: !hits.length ? "NOT_OBSERVED" : hits.some(h => h.privateMarkerPresent) ? "FAIL" : "PASS", hits };
});
scenarios.push({ mode: "automatic-families", eventFamilies });
const report = { testedAt: new Date().toISOString(), scope: "localhost real Google SDK; collector blocked; no backend/platform acceptance", scenarios };
const output = path.resolve(process.argv[2] ?? "docs/GA4-SDK-SCENARIOS-QA-2026-09-16.json");
run("js", `JSON.stringify(${JSON.stringify(report)},null,2)`, "--out", output, "--raw");
console.log(JSON.stringify({ output, consentScenarios: "4 PASS", revokePrivateReturn: "PASS", automatic: eventFamilies.map(({ event, status }) => ({ event, status })) }));
