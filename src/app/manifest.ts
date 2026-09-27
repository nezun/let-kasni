import type { MetadataRoute } from "next";

// Nova verzija sajta (v2): ime brenda „Letkasni.rs“, boje iz v2 tokena (tamnoplava #011f4c, bela pozadina) i znak LK
// (src/app/icon.svg, isti kao logo-mark.svg iz transport-local).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Letkasni.rs",
    short_name: "Letkasni.rs",
    description:
      "Claims handoff servis za proveru potencijalne avio odštete za putnike iz Srbije.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#011f4c",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
