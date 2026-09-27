// Slike za deljenje linkova (Open Graph, 1200×630) u izgledu nove verzije sajta (v2): beli header sa logom i tamnoplavi
// hero kao na početnoj, sa pravim fontovima (Gilroy, Inter). next/og (Satori) ne čita woff2, pa se slike prave ovde,
// headless Chromium-om iz HTML šablona, i čuvaju u public/lk/og/social-{sr,en}.png.
// Pokretanje: npm run lk:og  (tekst je u src/lib/social-preview.ts; posle izmene povećati SOCIAL_PREVIEW_VERSION)
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const root = resolve(import.meta.dirname, "..");

function loadSocialPreview() {
  const source = readFileSync(join(root, "src/lib/social-preview.ts"), "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const compiled = { exports: {} };
  new Function("module", "exports", output)(compiled, compiled.exports);
  return compiled.exports.socialPreview;
}

function chromeBinary() {
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  const cache = join(homedir(), "Library/Caches/ms-playwright");
  const shell = existsSync(cache) && readdirSync(cache).find((name) => name.startsWith("chromium_headless_shell-"));
  if (!shell) throw new Error("Nema headless Chromium-a: podesite CHROME_BIN");
  const dir = join(cache, shell);
  const platformDir = readdirSync(dir).find((name) => name.startsWith("chrome-headless-shell"));
  return join(dir, platformDir, "chrome-headless-shell");
}

const escape = (value) =>
  String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export function ogHtml(t, assetUrl) {
  const check = `<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#00e1ff"/><path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="#00004b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Gilroy;src:url("${assetUrl("fonts/Gilroy-SemiBold.woff2")}") format("woff2");font-weight:600}
@font-face{font-family:Inter;src:url("${assetUrl("fonts/Inter-Regular.woff2")}") format("woff2");font-weight:400}
@font-face{font-family:Inter;src:url("${assetUrl("fonts/Inter-SemiBold.woff2")}") format("woff2");font-weight:600}
*{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{font-family:Inter,Arial,sans-serif;background:#fff;color:#011f4c}
.top{height:112px;display:flex;align-items:center;padding:0 72px;border-bottom:1px solid #00004b29}
.top img{width:260px;height:auto;display:block}
.hero{height:518px;padding:64px 72px 60px;color:#fff;background:linear-gradient(45deg,#011f4c 40%,#004599);display:flex;flex-direction:column;justify-content:space-between}
.badge{align-self:flex-start;background:#00e1ff;color:#00004b;font:600 20px/1 Inter;letter-spacing:.02em;padding:10px 18px;border-radius:999px}
h1{margin:0;font:600 84px/1.04 Gilroy,Inter;letter-spacing:-.025em}
h1 span{color:#00e1ff}
.promise{margin:18px 0 0;font:600 38px/1.2 Gilroy,Inter;letter-spacing:-.01em}
.proof{display:flex;gap:40px;font:600 26px/1 Inter;color:#fff}
.proof div{display:flex;align-items:center;gap:14px}
</style></head><body>
<div class="top"><img src="${assetUrl("assets/logo.svg")}" alt=""></div>
<div class="hero">
<span class="badge">${escape(t.badge)}</span>
<div><h1>${escape(t.questionA)}<span>${escape(t.questionB)}</span></h1><p class="promise">${escape(t.promise)}</p></div>
<div class="proof"><div>${check}${escape(t.proofA)}</div><div>${check}${escape(t.proofB)}</div></div>
</div></body></html>`;
}

function main() {
  const socialPreview = loadSocialPreview();
  const chrome = chromeBinary();
  const out = join(root, "public/lk/og");
  mkdirSync(out, { recursive: true });
  const work = join(tmpdir(), `lk-og-${process.pid}`);
  mkdirSync(work, { recursive: true });
  const assetUrl = (path) => pathToFileURL(join(root, "public/lk", path)).href;
  for (const locale of ["sr", "en"]) {
    const html = join(work, `og-${locale}.html`);
    writeFileSync(html, ogHtml(socialPreview[locale], assetUrl));
    const file = join(out, `social-${locale}.png`);
    execFileSync(
      chrome,
      [
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        "--allow-file-access-from-files",
        "--window-size=1200,630",
        "--virtual-time-budget=4000",
        `--screenshot=${file}`,
        pathToFileURL(html).href,
      ],
      { stdio: "ignore", timeout: 60000 },
    );
    console.log(`lk:og → ${file}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
