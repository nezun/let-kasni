import { blogArticles } from "@/lib/blog";
import { cornerstonePages, getArticleCornerstoneHref, getCornerstoneHref } from "@/lib/cornerstones";

// Built from the same content registry as the sitemap; no hand-maintained slugs.
// Send paths only to the client, not the article content or request data.
export const analyticsPublicPaths = [
  "/", "/en", "/blog", "/en/blog", "/privacy", "/en/privacy",
  "/terms", "/en/terms", "/email-offers", "/en/email-offers",
  "/proveri-let", "/en/check-flight",
  ...cornerstonePages.flatMap((page) => [getCornerstoneHref(page, "sr"), getCornerstoneHref(page, "en")]),
  ...blogArticles.flatMap((article) => [getArticleCornerstoneHref(article, "sr"), getArticleCornerstoneHref(article, "en")]),
];
