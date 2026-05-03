import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { getBlogArticleImage, type BlogLocale } from "@/lib/blog";
import {
  cornerstonePages,
  getAlternateCornerstoneHref,
  getCornerstoneChildren,
  getCornerstoneHref,
  type CornerstonePage,
} from "@/lib/cornerstones";

const copy = {
  sr: {
    allGuides: "Glavni vodiči",
    childTitle: "Detaljni vodiči u ovoj temi",
    childIntro:
      "Ovi tekstovi su child vodiči. Ulaze u konkretne izgovore, dokaze i procedure, a vraćaju autoritet na glavni vodič.",
    faqTitle: "Česta pitanja",
    nextStep: "Sledeći korak",
    checkText:
      "Unesite let i datum da se slučaj prvo konzervativno proveri prema ruti, razlogu i dostupnim dokazima.",
    blogLabel: "Blog",
    readMore: "Pročitaj detaljno",
  },
  en: {
    allGuides: "Main guides",
    childTitle: "Detailed guides in this topic",
    childIntro:
      "These are child guides. They go deeper into specific excuses, evidence and procedures, and link authority back to the main guide.",
    faqTitle: "FAQ",
    nextStep: "Next step",
    checkText:
      "Enter the flight and date so the case can first be checked conservatively by route, reason and available evidence.",
    blogLabel: "Blog",
    readMore: "Read more",
  },
};

function localizedBlogHref(locale: BlogLocale, slug: string) {
  return locale === "sr" ? `/blog/${slug}` : `/en/blog/${slug}`;
}

export function CornerstonePageView({
  page,
  locale,
}: {
  page: CornerstonePage;
  locale: BlogLocale;
}) {
  const t = copy[locale];
  const localized = page[locale];
  const alternateHref = getAlternateCornerstoneHref(page, locale);
  const childArticles = getCornerstoneChildren(page, locale);
  const checkHref = locale === "sr" ? "/#proveri-let" : "/en#proveri-let";

  return (
    <main className="min-h-screen bg-white pt-16 text-[#0A0F1E]">
      <SiteHeader locale={locale} alternateHref={alternateHref} />

      <article>
        <section className="relative isolate overflow-hidden bg-[#07142B] px-6 py-14 text-white md:py-20">
          <div className="absolute inset-0 -z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={page.image.src}
              alt={page.image.alt}
              className="h-full w-full object-cover opacity-34"
              style={{ objectPosition: page.image.position ?? "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07142B] via-[#07142B]/82 to-[#07142B]/30" />
          </div>

          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[minmax(0,760px)_300px] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-white/72">
                <span className="rounded-full bg-white/14 px-3 py-1 text-white">
                  {localized.eyebrow}
                </span>
                <Link href={locale === "sr" ? "/blog" : "/en/blog"} className="hover:text-white">
                  {t.blogLabel}
                </Link>
              </div>
              <h1 className="font-display text-[42px] font-black leading-[1.02] tracking-[-0.045em] md:text-[72px]">
                {localized.title}
              </h1>
              <p className="mt-6 max-w-[760px] text-[18px] leading-[1.75] text-white/82 md:text-[21px]">
                {localized.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={checkHref}
                  className="rounded-lg bg-[#2470EB] px-5 py-3 text-sm font-black text-white transition hover:bg-[#1A52C8]"
                >
                  {localized.ctaLabel}
                </Link>
                <Link
                  href={alternateHref}
                  className="rounded-lg border border-white/24 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/18"
                >
                  {localized.languageLabel}
                </Link>
              </div>
            </div>

            <nav className="rounded-[14px] border border-white/14 bg-white/10 p-4 backdrop-blur">
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-white/62">
                {t.allGuides}
              </p>
              <div className="space-y-1">
                {cornerstonePages.map((guide) => (
                  <Link
                    key={guide.id}
                    href={getCornerstoneHref(guide, locale)}
                    className={`block rounded-lg px-3 py-2 text-sm font-bold transition ${
                      guide.id === page.id
                        ? "bg-white text-[#0B2E6F]"
                        : "text-white/82 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {guide[locale].title}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[minmax(0,760px)_300px]">
            <div className="space-y-11">
              {localized.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-[30px] font-black leading-[1.15] tracking-[-0.025em] text-[#0A0F1E] md:text-[38px]">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-[17px] leading-[1.82] text-[#4F5B75]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-6 grid gap-3 rounded-xl border border-[#DDE4EF] bg-[#F8FAFC] p-5 text-[15px] leading-[1.7] text-[#334155] md:grid-cols-2">
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
                <h2 className="font-display text-[32px] font-black leading-[1.15] tracking-[-0.025em]">
                  {t.childTitle}
                </h2>
                <p className="mt-3 max-w-[720px] text-[16px] leading-[1.72] text-[#66758B]">
                  {t.childIntro}
                </p>
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  {childArticles.map((article) => {
                    const image = getBlogArticleImage(article.id);

                    return (
                      <Link
                        key={article.id}
                        href={localizedBlogHref(locale, article.localized.slug)}
                        className="group overflow-hidden rounded-[14px] border border-[#E2E6EF] bg-white shadow-[0_16px_42px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_58px_rgba(15,23,42,0.12)]"
                      >
                        <div className="aspect-[16/8.8] overflow-hidden bg-[#E7EEF8]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                            style={{ objectPosition: image.position ?? "center" }}
                          />
                        </div>
                        <div className="p-5">
                          <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[#2470EB]">
                            {article.localized.category}
                          </p>
                          <h3 className="mt-2 text-[18px] font-black leading-[1.25] tracking-[-0.015em] text-[#0A0F1E]">
                            {article.localized.title}
                          </h3>
                          <p className="mt-3 text-sm leading-[1.65] text-[#66758B]">
                            {article.localized.excerpt}
                          </p>
                          <span className="mt-4 inline-flex text-sm font-black text-[#2470EB]">
                            {t.readMore}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>

              <section className="border-t border-[#E2E6EF] pt-10">
                <h2 className="font-display text-[32px] font-black leading-[1.15] tracking-[-0.025em]">
                  {t.faqTitle}
                </h2>
                <div className="mt-6 space-y-4">
                  {localized.faqs.map((faq) => (
                    <div key={faq.question} className="rounded-xl border border-[#E2E6EF] bg-[#F8FAFC] p-5">
                      <h3 className="text-[17px] font-black leading-[1.3]">{faq.question}</h3>
                      <p className="mt-3 text-[15px] leading-[1.75] text-[#4F5B75]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[14px] border border-[#DDE4EF] bg-[#F8FAFC] p-5">
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8E9BB0]">
                  {t.nextStep}
                </p>
                <h2 className="mt-3 font-display text-[24px] font-black leading-[1.18]">
                  {localized.ctaLabel}
                </h2>
                <p className="mt-3 text-sm leading-[1.7] text-[#66758B]">
                  {t.checkText}
                </p>
                <Link
                  href={checkHref}
                  className="mt-5 inline-flex rounded-lg bg-[#2470EB] px-4 py-3 text-sm font-black text-white transition hover:bg-[#1A52C8]"
                >
                  {localized.ctaLabel}
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}
