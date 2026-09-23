import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";

const base = process.env.SEO_AUDIT_BASE || "http://127.0.0.1:3003";
const browse = process.env.GSTACK_BROWSE_BIN || path.join(os.homedir(), ".codex/skills/gstack/browse/dist/browse");
const out = path.resolve(process.env.SEO_BROWSER_OUTPUT || "seo-audit-output/retirement-final/browser");
const retired = JSON.parse(fs.readFileSync("src/content/seo-retired-programmatic.json", "utf8"));
const groups = JSON.parse(fs.readFileSync("src/content/seo-consolidations.json", "utf8"));
fs.mkdirSync(out, { recursive: true });
const checks = [];

for (const width of [1440, 390]) {
  for (const locale of ["sr", "en"]) {
    const name = `${locale}-${width}`;
    const english = locale === "en";
    const env = { ...process.env, BROWSE_PARENT_PID: "0", BROWSE_STATE_FILE: `/tmp/letkasni-retirement/${process.pid}-${name}/browse.json` };
    const title = english ? "Page not found" : "Stranica nije pronađena";
    const contact = english ? "Where should we send the results?" : "Gde da pošaljemo rezultate?";
    const commands = [
      ["viewport", `${width}x900`], ["goto", base + retired.articles[0][locale]],
      ["wait", "h1"], ["click", english ? 'button:has-text("Reject optional")' : 'button:has-text("Odbij neobavezne")'],
      ["js", `(() => {const d={kind:'404',width:innerWidth,scrollWidth:document.documentElement.scrollWidth,title:document.querySelector('h1')?.textContent,locale:document.documentElement.lang,footer:!!document.querySelector('footer'),navigation:!!document.querySelector('nav'),noindex:document.querySelector('meta[name=robots]')?.content};d.passed=d.width===${width}&&d.scrollWidth<=innerWidth+1&&d.title===${JSON.stringify(title)}&&d.locale===${JSON.stringify(locale)}&&d.footer&&d.navigation&&d.noindex?.includes('noindex');return 'QA_RESULT='+JSON.stringify(d)})()`],
      ["screenshot", "--viewport", path.join(out, `404-${name}.png`)],
      ["goto", base + groups.find(g => g.group === "E")[locale].target], ["wait", "--networkidle"],
      ["js", `(() => {const d={kind:'restored-article',width:innerWidth,scrollWidth:document.documentElement.scrollWidth,title:document.querySelector('h1')?.textContent,footer:!!document.querySelector('footer'),navigation:!!document.querySelector('nav'),indexable:!document.querySelector('meta[name=robots]')?.content.includes('noindex'),images:[...document.querySelectorAll('img')].filter(e=>e.getBoundingClientRect().top<innerHeight).every(e=>e.complete&&e.naturalWidth>0)};d.passed=d.width===${width}&&d.scrollWidth<=innerWidth+1&&!!d.title&&d.footer&&d.navigation&&d.indexable&&d.images;return 'QA_RESULT='+JSON.stringify(d)})()`],
      ["screenshot", "--viewport", path.join(out, `restored-${name}.png`)],
      ["click", `button:has-text("${english ? "Check compensation" : "Proveri naknadu"}")`],
      ["wait", "input[name=flightDate]"], ["fill", "input[name=flightNumber]", "JU101"],
      ["fill", "input[name=flightDate]", "2026-09-01"], ["fill", "input[name=route]", "BEG - FRA"],
      ["click", `button:has-text("${english ? "Continue" : "Nastavi"}")`], ["wait", `h2:has-text("${contact}")`],
      ["js", `(() => {const d={kind:'form',width:innerWidth,scrollWidth:document.documentElement.scrollWidth,contactStep:[...document.querySelectorAll('h2')].some(e=>e.textContent===${JSON.stringify(contact)}),submitted:false};d.passed=d.width===${width}&&d.scrollWidth<=innerWidth+1&&d.contactStep;return 'QA_RESULT='+JSON.stringify(d)})()`],
      ["screenshot", "--viewport", path.join(out, `form-${name}.png`)],
    ];
    const result = spawnSync(browse, ["chain"], { env, input: JSON.stringify(commands), encoding: "utf8", timeout: 120000, maxBuffer: 8 * 1024 * 1024 });
    spawnSync(browse, ["stop"], { env, encoding: "utf8", timeout: 10000 });
    fs.writeFileSync(path.join(out, `${name}.txt`), (result.stdout || "") + (result.stderr || ""));
    const results = [...(result.stdout || "").matchAll(/QA_RESULT=(\{[^\n]+\})/g)].map(m => JSON.parse(m[1]));
    const passed = result.status === 0 && results.length === 3 && results.every(r => r.passed) && !result.stdout.includes("] ERROR:");
    checks.push({ name, passed, results, exit: result.status, error: result.error?.message });
    fs.writeFileSync(path.join(out, "results.json"), JSON.stringify({ passed: checks.every(c => c.passed), checks }, null, 2));
    console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
  }
}
process.exitCode = checks.every(c => c.passed) ? 0 : 1;
