// Snimci ekrana nove verzije sajta (v2) i originala iz transport-local, za vizuelno poređenje 1:1.
// Pokretanje (lokalni sajt i original moraju da rade):
//   npm run dev -- --port 3107
//   python3 -m http.server 8880 --bind 127.0.0.1 --directory "<LetKasni/sistem>/outputs/transport-local/site"
//   node scripts/lk-v2-shots.mjs [izlazni-folder] [ime-strane …]
// Snimci idu u izlazni folder (podrazumevano reports/lk-v2-shots, nije u gitu) kao <strana>-<širina>-{nas,original}.png.
// Koristi headless Chromium: CHROME_BIN ili Playwright keš (~/Library/Caches/ms-playwright).
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const local = process.env.LK_LOCAL ?? "http://localhost:3107";
const original = process.env.LK_ORIGINAL ?? "http://127.0.0.1:8880/letkasni/v2";

export const pages = {
  pocetna: ["/", "/"],
  kasnjenje: ["/naknada-za-kasnjenje-leta", "/naknada-za-kasnjenje-leta/"],
  vodic: ["/naknada-za-otkazan-let", "/naknada-za-otkazan-let/"],
  clanak: [
    "/naknada-za-otkazan-let/otkazan-let-manje-od-14-dana-prava",
    "/naknada-za-otkazan-let/otkazan-let-manje-od-14-dana-prava/",
  ],
  blog: ["/blog", "/blog/"],
  uslovi: ["/terms", "/terms/"],
  privatnost: ["/privacy", "/privacy/"],
  kontakt: ["/kontakt", "/kontakt/"],
  "o-nama": ["/o-nama", "/o-nama/"],
  faq: ["/faq", "/faq/"],
  "email-ponude": ["/email-offers", "/email-offers/"],
};

const sizes = [
  [1440, 3200],
  [375, 3600],
];

function chromeBinary() {
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  const cache = join(homedir(), "Library/Caches/ms-playwright");
  if (!existsSync(cache)) throw new Error("Nema Chromium-a: podesite CHROME_BIN");
  const shell = readdirSync(cache).find((name) => name.startsWith("chromium_headless_shell-"));
  if (!shell) throw new Error("Nema chromium_headless_shell u Playwright kešu: podesite CHROME_BIN");
  const dir = join(cache, shell);
  const platformDir = readdirSync(dir).find((name) => name.startsWith("chrome-headless-shell"));
  return join(dir, platformDir, "chrome-headless-shell");
}

function shoot(chrome, url, file, [width, height]) {
  execFileSync(
    chrome,
    [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      `--window-size=${width},${height}`,
      "--virtual-time-budget=5000",
      `--screenshot=${file}`,
      url,
    ],
    { stdio: "ignore", timeout: 60000 },
  );
}

function main() {
  const [outArg, ...names] = process.argv.slice(2);
  const out = resolve(outArg ?? "reports/lk-v2-shots");
  mkdirSync(out, { recursive: true });
  const chrome = chromeBinary();
  const selected = names.length > 0 ? names : Object.keys(pages);
  for (const name of selected) {
    const entry = pages[name];
    if (!entry) throw new Error(`Nepoznata strana: ${name} (moguće: ${Object.keys(pages).join(", ")})`);
    for (const size of sizes) {
      shoot(chrome, `${local}${entry[0]}`, join(out, `${name}-${size[0]}-nas.png`), size);
      shoot(chrome, `${original}${entry[1]}`, join(out, `${name}-${size[0]}-original.png`), size);
    }
    console.log(`snimljeno: ${name}`);
  }
  console.log(`Snimci su u ${out}`);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main();
}
