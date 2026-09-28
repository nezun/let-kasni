import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { getSiteVerzija } from "@/lib/site-version";

// Dinamična apple-touch ikonica (do sada statičan apple-icon.png), isti mehanizam kao icon.tsx.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const verzija = await getSiteVerzija();
  const putanja = join(process.cwd(), "public/lk/assets", verzija === "b" ? "brand-b/apple-icon-180.png" : "brand-a/apple-icon-180.png");
  const sadrzaj = await readFile(putanja);
  // Next.js generiše isti URL (/apple-icon?<hash>) bez obzira na kolačić, pa bez no-store CDN keš meša A i B.
  return new Response(new Uint8Array(sadrzaj), {
    headers: { "content-type": contentType, "cache-control": "private, no-store" },
  });
}
