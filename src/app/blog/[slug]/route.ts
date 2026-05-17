import { NextRequest, NextResponse } from "next/server";

import { blogArticles } from "@/lib/blog";
import { getArticleCornerstoneHref } from "@/lib/cornerstones";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, context: Context) {
  const { slug } = await context.params;
  const article = blogArticles.find((candidate) => candidate.sr.slug === slug);

  if (article) {
    return NextResponse.redirect(
      new URL(getArticleCornerstoneHref(article, "sr"), request.url),
      { status: 301 },
    );
  }

  const translatedArticle = blogArticles.find(
    (candidate) => candidate.en.slug === slug,
  );

  if (!translatedArticle) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.redirect(
    new URL(getArticleCornerstoneHref(translatedArticle, "en"), request.url),
    { status: 301 },
  );
}
