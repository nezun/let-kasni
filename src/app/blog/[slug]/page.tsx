import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BrandLogo } from "@/components/brand-logo";
import {
  blogArticles,
  getAlternateArticleHref,
  getBlogArticleBySlug,
  getRelatedBlogArticles,
} from "@/lib/blog";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.sr.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug("sr", slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.sr.title} | letkasni.rs`,
    description: article.sr.description,
    alternates: {
      canonical: `/blog/${article.sr.slug}`,
      languages: {
        sr: `/blog/${article.sr.slug}`,
        en: `/en/blog/${article.en.slug}`,
      },
    },
    openGraph: {
      title: article.sr.title,
      description: article.sr.description,
      type: "article",
      locale: "sr_RS",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.sr.title,
      description: article.sr.description,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticleBySlug("sr", slug);

  if (!article) {
    notFound();
  }

  const alternateHref = getAlternateArticleHref(article, "sr");
  const relatedArticles = getRelatedBlogArticles(article, "sr");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.sr.title,
    description: article.sr.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "sr-RS",
    isPartOf: {
      "@type": "Blog",
      name: "letkasni.rs Blog",
      url: "/blog",
    },
    publisher: {
      "@type": "Organization",
      name: "letkasni.rs",
    },
  };

  return (
    <main className="min-h-screen bg-white text-[#0A0F1E]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-[#E2E6EF] bg-white">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6">
          <BrandLogo href="/" balance="compact" />
          <div className="ml-auto flex items-center gap-3 text-sm font-semibold">
            <Link href={alternateHref} className="text-[#6B7585] transition hover:text-[#0A0F1E]">
              EN
            </Link>
            <Link href="/blog" className="text-[#2470EB] transition hover:text-[#1A52C8]">
              Blog
            </Link>
          </div>
        </div>
      </header>

      <article>
        <section className="border-b border-[#E2E6EF] bg-[#F4F6FA] px-6 py-14">
          <div className="mx-auto max-w-[860px]">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.08em] text-[#6B7585]">
              <span className="rounded-full bg-white px-3 py-1 text-[#0B2E6F]">
                {article.sr.category}
              </span>
              <span>{article.sr.readTime}</span>
              <span>{new Date(article.publishedAt).toLocaleDateString("sr-RS")}</span>
            </div>
            <h1 className="font-display text-[36px] font-bold leading-[1.08] text-[#0A0F1E] md:text-[60px]">
              {article.sr.title}
            </h1>
            <p className="mt-6 text-[19px] leading-[1.72] text-[#4F5B75]">
              {article.sr.excerpt}
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[minmax(0,720px)_280px]">
            <div className="space-y-10">
              {article.sr.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-[30px] font-bold leading-[1.18] text-[#0A0F1E]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[17px] leading-[1.82] text-[#4F5B75]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-5 space-y-3 rounded-lg border border-[#E2E6EF] bg-[#F8FAFC] p-5 text-[15px] leading-[1.7] text-[#334155]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2470EB]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="border-t border-[#E2E6EF] pt-10">
                <h2 className="font-display text-[28px] font-bold leading-[1.18] text-[#0A0F1E]">
                  Još vodiča za ovaj slučaj
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.localized.slug}`}
                      className="rounded-lg border border-[#E2E6EF] bg-[#F8FAFC] p-4 transition hover:border-[#B4BECF]"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#2470EB]">
                        {related.localized.category}
                      </p>
                      <h3 className="mt-2 text-sm font-bold leading-[1.35] text-[#0A0F1E]">
                        {related.localized.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-[#E2E6EF] bg-[#F8FAFC] p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8E9BB0]">
                  Sledeći korak
                </p>
                <h2 className="mt-3 font-display text-[22px] font-bold leading-[1.2]">
                  Proverite svoj let
                </h2>
                <p className="mt-3 text-sm leading-[1.7] text-[#6B7585]">
                  Unesite broj leta i datum, a slučaj ide na konzervativnu proveru pre
                  bilo kakvog obećanja.
                </p>
                <Link
                  href="/#proveri-let"
                  className="mt-5 inline-flex rounded-lg bg-[#2470EB] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1A52C8]"
                >
                  Proveri let
                </Link>
                <p className="mt-4 border-t border-[#E2E6EF] pt-4 text-xs leading-[1.6] text-[#8E9BB0]">
                  Vodič je informativan. Ishod zavisi od rute, prevoznika,
                  razloga poremećaja i dokaza u konkretnom slučaju.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}
