import type { MetadataRoute } from "next";

import { blogArticles } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const blogUrls = blogArticles.flatMap((article) => [
    {
      url: `${siteUrl}/blog/${article.sr.slug}`,
      lastModified: article.updatedAt,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/en/blog/${article.en.slug}`,
      lastModified: article.updatedAt,
      priority: 0.7,
    },
  ]);

  return [
    {
      url: `${siteUrl}/`,
      priority: 1,
    },
    {
      url: `${siteUrl}/en`,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/en/blog`,
      priority: 0.8,
    },
    ...blogUrls,
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
