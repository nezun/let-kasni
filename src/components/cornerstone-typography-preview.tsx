import Link from "next/link";
import { Check, ChevronRight, Clock } from "lucide-react";

import { DelayCompensationCalculator } from "@/components/delay-compensation-calculator";
import { InlineRichText } from "@/components/inline-rich-text";
import { ScrollProgressToc } from "@/components/scroll-progress-toc";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogArticleImage, type BlogLocale } from "@/lib/blog";
import {
  getArticleCornerstoneHref,
  getCornerstoneChildren,
  type CornerstonePage,
} from "@/lib/cornerstones";
import { formatDisplayDate } from "@/lib/date-format";
import { getSupportEmail } from "@/lib/env";

const copy = {
  sr: {
    breadcrumb: "Prava putnika",
    updated: "Ažurirano",
    tocTitle: "U ovom vodiču",
    keyTakeaways: "Ključne stvari",
    amountTitle: "Iznosi naknade po dužini rute",
    amountIntro:
      "Koristite tabelu kao brzu orijentaciju, a zatim proverite rutu, stvarni dolazak i razlog kašnjenja.",
    detailedGuides: "Detaljni vodiči",
    detailedIntro:
      "Kada znate konkretan razlog kašnjenja, otvorite vodič koji ulazi dublje u taj scenario.",
    readMore: "Pročitaj vodič",
    nextStep: "Proverite let",
    nextStepBody:
      "Ako imate broj leta i datum, možete odmah uraditi konzervativnu proveru pre slanja zahteva aviokompaniji.",
    checkFlight: "Proveri let",
  },
  en: {
    breadcrumb: "Passenger rights",
    updated: "Updated",
    tocTitle: "In this guide",
    keyTakeaways: "Key takeaways",
    amountTitle: "Compensation amounts by route distance",
    amountIntro:
      "Use the table as quick orientation, then check route coverage, actual arrival and the delay reason.",
    detailedGuides: "Detailed guides",
    detailedIntro:
      "Once you know the concrete delay reason, open the guide that goes deeper into that scenario.",
    readMore: "Read guide",
    nextStep: "Check your flight",
    nextStepBody:
      "If you have the flight number and date, you can run a conservative first check before filing with the airline.",
    checkFlight: "Check flight",
  },
};

const amountRows = {
  sr: [
    ["do 1.500 km", "3+ sata na dolasku", "250 EUR"],
    ["1.500-3.500 km", "3+ sata na dolasku", "400 EUR"],
    ["preko 3.500 km", "3-4 sata na dolasku", "300-600 EUR"],
    ["preko 3.500 km", "4+ sata na dolasku", "600 EUR"],
  ],
  en: [
    ["up to 1,500 km", "3+ hours at arrival", "250 EUR"],
    ["1,500-3,500 km", "3+ hours at arrival", "400 EUR"],
    ["over 3,500 km", "3-4 hours at arrival", "300-600 EUR"],
    ["over 3,500 km", "4+ hours at arrival", "600 EUR"],
  ],
};

function sectionId(index: number) {
  return `section-${index + 1}`;
}

export function CornerstoneTypographyPreview({
  page,
  locale,
}: {
  page: CornerstonePage;
  locale: BlogLocale;
}) {
  const t = copy[locale];
  const localized = page[locale];
  const supportEmail = getSupportEmail();
  const childArticles = getCornerstoneChildren(page, locale);
  const tocSections = localized.sections.slice(0, 8).map((section, index) => ({
    id: sectionId(index),
    label: section.heading,
  }));
  const takeaways = localized.sections[0]?.bullets?.slice(0, 3) ?? [];
  const alternateHref = locale === "sr" ? "/en/flight-delay-compensation" : "/naknada-za-kasnjenje-leta";

  return (
    <main className="min-h-screen bg-[#F7F8FB] text-[#172033]">
      <SiteHeader locale={locale} alternateHref={alternateHref} />

      <article className="pt-16">
        <header className="bg-white">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 pb-10 pt-10 lg:grid-cols-[minmax(0,680px)_420px] lg:pb-14 lg:pt-14">
            <div className="self-center">
              <nav className="flex items-center gap-2 text-[13px] font-bold text-[#667085]">
                <Link href={locale === "sr" ? "/blog" : "/en/blog"} className="hover:text-[#1F5FD2]">
                  Blog
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span>{t.breadcrumb}</span>
              </nav>

              <p className="mt-8 text-[12px] font-black uppercase tracking-[0.16em] text-[#2470EB]">
                {localized.eyebrow}
              </p>
              <h1 className="mt-4 max-w-[720px] font-display text-[44px] font-black leading-[1.05] tracking-[-0.035em] text-[#101828] md:text-[60px]">
                {localized.title}
              </h1>
              <p className="mt-6 max-w-[680px] text-[20px] leading-[1.65] text-[#475467]">
                {localized.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-bold text-[#667085]">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#2470EB]" />
                  {t.updated}: {formatDisplayDate(page.updatedAt, locale)}
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-[18px] bg-[#E7EEF8] shadow-[0_24px_70px_rgba(16,24,40,0.12)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.image.src}
                alt={page.image.alt}
                className="h-full min-h-[300px] w-full object-cover"
                style={{ objectPosition: page.image.position ?? "center" }}
              />
            </div>
          </div>
        </header>

        <ScrollProgressToc label={t.tocTitle} sections={tocSections} />

        <section className="px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-[1040px]">
            <div className="mx-auto max-w-[980px]">
              {takeaways.length > 0 ? (
                <section className="mb-12 rounded-[18px] border border-[#D0E0FF] bg-[#F3F8FF] p-6 md:p-7">
                  <h2 className="font-display text-[28px] font-black leading-[1.18] tracking-[-0.02em] text-[#101828]">
                    {t.keyTakeaways}
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {takeaways.map((item) => (
                      <li key={item} className="flex gap-3 text-[17px] leading-[1.68] text-[#344054]">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2470EB] text-white">
                          <Check className="h-4 w-4" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <div className="space-y-14">
                {localized.sections.map((section, index) => (
                  <section key={section.heading} id={sectionId(index)} className="scroll-mt-36">
                    <h2 className="font-display text-[34px] font-black leading-[1.16] tracking-[-0.025em] text-[#101828] md:text-[42px]">
                      {section.heading}
                    </h2>
                    <div className="mt-6 space-y-6 text-[19px] leading-[1.78] text-[#344054]">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>
                          <InlineRichText text={paragraph} locale={locale} />
                        </p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-7 space-y-3 border-l-4 border-[#2470EB] bg-white py-2 pl-5 text-[17px] leading-[1.68] text-[#344054]">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2470EB]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>

              <section className="mt-16 rounded-[18px] border border-[#E4E7EC] bg-white p-6 shadow-[0_18px_46px_rgba(16,24,40,0.06)] md:p-8">
                <h2 className="font-display text-[34px] font-black leading-[1.16] tracking-[-0.025em] text-[#101828] md:text-[42px]">
                  {t.amountTitle}
                </h2>
                <p className="mt-4 max-w-[680px] text-[18px] leading-[1.7] text-[#475467]">
                  {t.amountIntro}
                </p>
                <div className="mt-7 overflow-hidden rounded-[14px] border border-[#E4E7EC]">
                  <table className="w-full border-collapse text-left text-[15px]">
                    <tbody>
                      {amountRows[locale].map((row) => (
                        <tr key={row.join("-")} className="border-b border-[#EAECF0] last:border-b-0">
                          <th className="bg-[#F9FAFB] px-5 py-4 font-black text-[#101828]">
                            {row[0]}
                          </th>
                          <td className="px-5 py-4 font-bold text-[#475467]">{row[1]}</td>
                          <td className="px-5 py-4 font-black text-[#1F5FD2]">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8">
                  <DelayCompensationCalculator locale={locale} />
                </div>
              </section>

              {childArticles.length > 0 ? (
                <section className="mt-16">
                  <h2 className="font-display text-[34px] font-black leading-[1.16] tracking-[-0.025em] text-[#101828] md:text-[42px]">
                    {t.detailedGuides}
                  </h2>
                  <p className="mt-4 max-w-[680px] text-[18px] leading-[1.7] text-[#475467]">
                    {t.detailedIntro}
                  </p>
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {childArticles.slice(0, 8).map((article) => {
                      const image = getBlogArticleImage(article.id);

                      return (
                        <Link
                          key={article.id}
                          href={getArticleCornerstoneHref(article, locale)}
                          className="group overflow-hidden rounded-[16px] border border-[#E4E7EC] bg-white shadow-[0_16px_42px_rgba(16,24,40,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_58px_rgba(16,24,40,0.12)]"
                        >
                          <div className="aspect-[16/9] overflow-hidden bg-[#E7EEF8]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                              style={{ objectPosition: image.position ?? "center" }}
                            />
                          </div>
                          <div className="p-5">
                            <p className="text-[12px] font-black uppercase tracking-[0.12em] text-[#2470EB]">
                              {article.localized.category}
                            </p>
                            <h3 className="mt-3 text-[21px] font-black leading-[1.22] tracking-[-0.018em] text-[#101828]">
                              {article.localized.title}
                            </h3>
                            <p className="mt-3 text-[15px] leading-[1.65] text-[#667085]">
                              {article.localized.excerpt}
                            </p>
                            <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-black text-[#1F5FD2]">
                              {t.readMore}
                              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </section>
      </article>

      <SiteFooter locale={locale} supportEmail={supportEmail} />
    </main>
  );
}
