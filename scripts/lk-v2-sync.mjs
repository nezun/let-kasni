// Prenosi dizajn sistem nove verzije sajta (v2) iz LetKasni/sistem/outputs/transport-local u ovaj repo.
// Niko (26.09.2026): v2 postaje staging, uz iste URL-ove; menja se brend i UX. Izvor dizajna je statički projekat
// transport-local (CSS, fontovi, ikonice, logo, slike). Ovde se ništa ne menja ručno — posle izmene dizajna u
// transport-local pokrenuti: npm run lk:sync
// - CSS ide u src/styles/lk-v2/ (bez izmena, osim putanja fontova), slike i fontovi u public/lk/.
// - Fontovi se ne menjaju (Niko: „ne menjaj font“). Gilroy je komercijalni font: pre produkcije treba web licenca.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = process.env.LK_V2_SOURCE ?? join(homedir(), "LetKasni/sistem/outputs/transport-local/site");

export const cssFiles = [
  ["design-system/library/tokens.css", "tokens.css"],
  ["design-system/library/primitives.css", "primitives.css"],
  ["design-system/library/components.css", "components.css"],
  ["letkasni/catalog-bento.css", "catalog-bento.css"],
  ["letkasni/letkasni.css", "letkasni.css"],
  ["letkasni/v2/hero-v2.css", "hero-v2.css"],
  ["letkasni/v2/pages.css", "pages.css"],
  ["letkasni/v2/delay.css", "delay.css"],
];

// Fajlovi i folderi sa slikama: [izvor, odredište u public/lk]. Slike blog kartica sa originala se ne prenose:
// sajt prikazuje slike naših članaka (getBlogArticleImage).
export const assetDirs = [
  ["letkasni/assets", "assets", (name) => /\.(svg|jpe?g|png|webp)$/i.test(name)],
  ["letkasni/assets/features", "assets/features", (name) => /\.(jpe?g|png|webp)$/i.test(name)],
  ["design-system/assets/fonts", "fonts", (name) => /\.woff2$/i.test(name)],
];
export const singleAssets = [["design-system/assets/icons.svg", "ds/icons.svg"]];

// Fontovi u tokens.css se učitavaju sa /lk/fonts/ (public), da CSS ne zavisi od strukture izvornog projekta.
export function rewriteCss(name, css) {
  let out = css;
  if (name === "tokens.css") out = out.replace(/url\((["']?)\.\.\/assets\/fonts\//g, "url($1/lk/fonts/");
  return `/* GENERISANO: npm run lk:sync (scripts/lk-v2-sync.mjs) iz transport-local; ne menjati ručno. */\n${out}`;
}

function main() {
  if (!existsSync(source)) {
    console.error(`Nema izvora v2 dizajna: ${source} (podesiti LK_V2_SOURCE)`);
    process.exit(1);
  }
  const cssOut = join(root, "src/styles/lk-v2");
  const publicOut = join(root, "public/lk");
  mkdirSync(cssOut, { recursive: true });

  for (const [from, to] of cssFiles) {
    writeFileSync(join(cssOut, to), rewriteCss(to, readFileSync(join(source, from), "utf8")));
  }

  let copied = 0;
  for (const [from, to, accept] of assetDirs) {
    const dir = join(source, from);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (!accept(name)) continue;
      mkdirSync(join(publicOut, to), { recursive: true });
      copyFileSync(join(dir, name), join(publicOut, to, name));
      copied += 1;
    }
  }
  for (const [from, to] of singleAssets) {
    mkdirSync(dirname(join(publicOut, to)), { recursive: true });
    copyFileSync(join(source, from), join(publicOut, to));
    copied += 1;
  }
  console.log(`lk:sync → ${cssFiles.length} CSS fajlova u src/styles/lk-v2, ${copied} fajlova u public/lk`);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main();
}
