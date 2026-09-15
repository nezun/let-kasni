import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  // staging.letkasni.rs je javno dostupan, ali ne sme u pretragu (isti sadržaj kao produkcija)
  if (/^https?:\/\/staging\./.test(siteUrl)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/*",
        "/design",
        "/design/*",
        "/design-lab",
        "/design-lab/*",
        "/pregled",
        "/pregled/*",
        "/dokumenta",
        "/dokumenta/*",
        "/predmet",
        "/predmet/*",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
