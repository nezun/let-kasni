import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    {
      url: `${siteUrl}/`,
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy`,
      priority: 0.4,
    },
    {
      url: `${siteUrl}/terms`,
      priority: 0.4,
    },
  ];
}
