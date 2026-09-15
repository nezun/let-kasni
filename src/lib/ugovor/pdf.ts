import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * HTML → PDF na serveru, bez spoljnog servisa: Chromium u Vercel funkciji (@sparticuz/chromium),
 * lokalno Google Chrome sa Maca. Font Arimo (metrički isti kao Arial, sa našim slovima) se ugrađuje u HTML,
 * jer serverski Chromium nema sistemske fontove.
 */
const CHROME_MAC = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const FONTOVI = ["latin-400", "latin-700", "latin-ext-400", "latin-ext-700"];

let fontCss: string | null = null;

async function fontovi() {
  if (fontCss) return fontCss;
  const dir = path.join(process.cwd(), "node_modules/@fontsource/arimo/files");
  const delovi = await Promise.all(
    FONTOVI.map(async (f) => {
      const [skup, tezina] = [f.slice(0, f.lastIndexOf("-")), f.slice(f.lastIndexOf("-") + 1)];
      const b64 = (await readFile(path.join(dir, `arimo-${skup}-${tezina}-normal.woff2`))).toString("base64");
      const opseg = skup === "latin" ? "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215" : "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF";
      return `@font-face{font-family:Arimo;font-style:normal;font-weight:${tezina};font-display:block;src:url(data:font/woff2;base64,${b64}) format("woff2");unicode-range:${opseg};}`;
    }),
  );
  fontCss = delovi.join("\n");
  return fontCss;
}

export async function htmlUPdf(html: string): Promise<Uint8Array> {
  const puppeteer = await import("puppeteer-core");
  let executablePath: string;
  let args: string[];
  if (process.platform === "linux") {
    const chromium = (await import("@sparticuz/chromium")).default;
    executablePath = await chromium.executablePath();
    args = chromium.args;
  } else {
    executablePath = process.env.CHROME_PATH ?? CHROME_MAC;
    args = ["--no-first-run", "--no-default-browser-check"];
  }
  const browser = await puppeteer.launch({ executablePath, args, headless: true });
  try {
    const page = await browser.newPage();
    const dokument = `<!doctype html><html lang="sr"><head><meta charset="utf-8"><style>${await fontovi()}</style></head><body>${html}</body></html>`;
    await page.setContent(dokument, { waitUntil: "load" });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
    return new Uint8Array(pdf);
  } finally {
    await browser.close();
  }
}
