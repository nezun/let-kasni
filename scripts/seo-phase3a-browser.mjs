import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";

const base = process.env.SEO_AUDIT_BASE || "http://127.0.0.1:3003";
const browse = process.env.GSTACK_BROWSE_BIN || path.join(os.homedir(), ".codex/skills/gstack/browse/dist/browse");
const out = path.resolve(process.env.SEO_BROWSER_OUTPUT || "seo-audit-output/phase3a/browser");
fs.mkdirSync(out, { recursive: true });
const mapping = JSON.parse(fs.readFileSync("src/content/seo-consolidations.json", "utf8"));
const onlyGroup = process.argv.find(arg => arg.startsWith("--group="))?.slice(8);
if (onlyGroup && !mapping.some(group => group.group === onlyGroup)) throw new Error("Unknown approved group");
const resultsFile = onlyGroup ? `results-${onlyGroup}.json` : "results.json";
const checks = [];

function run(name, commands) {
  const env = { ...process.env, BROWSE_PARENT_PID: "0", BROWSE_STATE_FILE: `/tmp/letkasni-phase3a-browser/${process.pid}-${name}/browse.json` };
  const result = spawnSync(browse, ["chain"], {
    input: JSON.stringify(commands), encoding: "utf8", timeout: 120000,
    maxBuffer: 8 * 1024 * 1024,
    env,
  });
  spawnSync(browse, ["stop"], { env, encoding: "utf8", timeout: 10000 });
  fs.writeFileSync(path.join(out, `${name}.txt`), result.stdout + result.stderr);
  const match = result.stdout.match(/QA_RESULT=(\{[^\n]+\})/);
  const data = match ? JSON.parse(match[1]) : null;
  const passed = result.status === 0 && !result.stdout.includes("] ERROR:") && data?.passed === true;
  checks.push({ name, passed, ...data, exit: result.status, error: result.error?.message });
  fs.writeFileSync(path.join(out, resultsFile), JSON.stringify({ passed: checks.every(c => c.passed), checks }, null, 2));
  console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
}

for (const width of [1440, 390]) {
  for (const group of mapping) {
    if (onlyGroup && group.group !== onlyGroup) continue;
    for (const locale of ["sr", "en"]) {
      const name = `${group.group}-${locale}-${width}`;
      const expression = `(() => {
        const images = [...document.images].map(i => ({src:i.currentSrc,loaded:i.complete && i.naturalWidth>0}));
        const data = {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
          h1:document.querySelector('h1')?.textContent,images,
          headingCount:document.querySelectorAll('article h2').length,
          canonical:document.querySelector('link[rel="canonical"]')?.href};
        data.passed = innerWidth === ${width} && data.scrollWidth <= innerWidth + 1 && !!data.h1
          && data.canonical === ${JSON.stringify("https://letkasni.rs" + group[locale].target)}
          && images.length > 0 && images.every(i=>i.loaded);
        return 'QA_RESULT=' + JSON.stringify(data);
      })()`;
      const commands = [
        ["viewport", `${width}x900`], ["goto", base + group[locale].target],
        ["wait", "--networkidle"],
        ["click", locale === "sr" ? 'button:has-text("Odbij neobavezne")' : 'button:has-text("Reject optional")'],
        ["js", expression],
      ];
      if (["A", "E"].includes(group.group)) {
        commands.push(["screenshot", "--viewport", path.join(out, `${name}.png`)]);
      }
      run(name, commands);
    }
  }
}

// Exercise validation and the next step only. Never submit contact details or a claim.
for (const width of [1440, 390]) {
  if (onlyGroup) break;
  for (const locale of ["sr", "en"]) {
    const pair = mapping.find(g => g.group === "E")[locale];
    const cta = locale === "sr" ? "Proveri naknadu" : "Check compensation";
    const next = locale === "sr" ? "Nastavi" : "Continue";
    const heading = locale === "sr" ? "Gde da pošaljemo rezultate?" : "Where should we send the results?";
    const name = `form-${locale}-${width}`;
    run(name, [
      ["viewport", `${width}x900`], ["goto", base + pair.target], ["wait", "--networkidle"],
      ["click", locale === "sr" ? 'button:has-text("Odbij neobavezne")' : 'button:has-text("Reject optional")'],
      ["click", `button:has-text("${cta}")`], ["wait", "input[name=flightDate]"],
      ["fill", "input[name=flightNumber]", "JU101"], ["fill", "input[name=flightDate]", "2026-09-01"],
      ["fill", "input[name=route]", "BEG - FRA"], ["click", `button:has-text("${next}")`],
      ["wait", `h2:has-text("${heading}")`], ["snapshot", "-i"],
      ["js", `(() => {const d={width:innerWidth,scrollWidth:document.documentElement.scrollWidth,contactStep:[...document.querySelectorAll('h2')].some(e=>e.textContent===${JSON.stringify(heading)}),submitted:false};d.passed=d.width===${width}&&d.scrollWidth<=innerWidth+1&&d.contactStep;return 'QA_RESULT='+JSON.stringify(d)})()`],
      ["screenshot", "--viewport", path.join(out, `${name}.png`)],
    ]);
  }
}

process.exitCode = checks.every(c => c.passed) ? 0 : 1;
