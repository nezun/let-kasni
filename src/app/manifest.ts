import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "letkasni.rs",
    short_name: "Let Kasni",
    description:
      "Claims handoff servis za proveru potencijalne avio odštete za putnike iz Srbije.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f7f4",
    theme_color: "#0d6b6b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
