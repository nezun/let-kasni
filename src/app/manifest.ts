import type { MetadataRoute } from "next";

import { getSiteVerzija } from "@/lib/site-version";

// Nova verzija sajta (v2): ime brenda „Letkasni.rs“, boje iz v2 tokena (tamnoplava #011f4c, bela pozadina) i znak LK.
// Proba dve verzije (Niko, 28.09.2026): verzija B ima nov znak (public/lk/assets/brand-b); A je nepromenjen original,
// sada u public/lk/assets/brand-a. favicon.ico ostaje A (Next.js ne dozvoljava da se generiše dinamički).
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const verzija = await getSiteVerzija();

  const osnova = {
    name: "Letkasni.rs",
    short_name: "Letkasni.rs",
    description:
      "Claims handoff servis za proveru potencijalne avio odštete za putnike iz Srbije.",
    start_url: "/",
    display: "standalone" as const,
    background_color: "#ffffff",
    theme_color: "#011f4c",
  };

  if (verzija === "b") {
    return {
      ...osnova,
      icons: [
        { src: "/lk/assets/brand-b/icon-32.png", sizes: "32x32", type: "image/png" },
        { src: "/lk/assets/brand-b/icon-48.png", sizes: "48x48", type: "image/png" },
        { src: "/lk/assets/brand-b/apple-icon-180.png", sizes: "180x180", type: "image/png" },
        { src: "/lk/assets/brand-b/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/lk/assets/brand-b/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    };
  }

  return {
    ...osnova,
    icons: [
      { src: "/lk/assets/brand-a/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/lk/assets/brand-a/apple-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
