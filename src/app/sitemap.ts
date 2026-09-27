import type { MetadataRoute } from "next";

import { blogArticles } from "@/lib/blog";
import {
  cornerstonePages,
  getArticleCornerstoneHref,
  getCornerstoneHref,
} from "@/lib/cornerstones";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const blogUrls = blogArticles.flatMap((article) => [
    {
      url: `${siteUrl}${getArticleCornerstoneHref(article, "sr")}`,
      lastModified: article.updatedAt,
      priority: 0.7,
    },
    {
      url: `${siteUrl}${getArticleCornerstoneHref(article, "en")}`,
      lastModified: article.updatedAt,
      priority: 0.7,
    },
  ]);
  const cornerstoneUrls = cornerstonePages.flatMap((page) => [
    {
      url: `${siteUrl}${getCornerstoneHref(page, "sr")}`,
      lastModified: page.updatedAt,
      priority: 0.9,
    },
    {
      url: `${siteUrl}${getCornerstoneHref(page, "en")}`,
      lastModified: page.updatedAt,
      priority: 0.9,
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
    ...cornerstoneUrls,
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
