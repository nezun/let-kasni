import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { getSiteVerzija } from "@/lib/site-version";

// Dinamična ikonica (do sada statičan icon.svg): verzija B čita nov znak iz public/lk/assets/brand-b, A ostaje
// nepromenjen originalni fajl (sada u public/lk/assets/brand-a). favicon.ico se ne može ovako menjati (Next.js
// pravilo), pa on uvek ostaje A — noviji pretraživači ipak prednost daju ovoj <link rel="icon"> ikonici.
export const contentType = "image/svg+xml";

export default async function Icon() {
  const verzija = await getSiteVerzija();
  const putanja = join(process.cwd(), "public/lk/assets", verzija === "b" ? "brand-b/icon.svg" : "brand-a/icon.svg");
  const sadrzaj = await readFile(putanja);
  // Next.js generiše isti URL (/icon?<hash>) bez obzira na kolačić, pa bez no-store CDN keš meša A i B ikonicu.
  return new Response(new Uint8Array(sadrzaj), {
    headers: { "content-type": contentType, "cache-control": "private, no-store" },
  });
}
