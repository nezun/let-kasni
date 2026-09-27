import { CornerstoneTypographyPreview } from "@/components/cornerstone-typography-preview";
import { InlineRichText, InterlinkingScope } from "@/components/inline-rich-text";
import { copy as lkCopy } from "@/components/lk-v2/copy";
import { LkFaqSection, LkFinalCta, LkInnerHero } from "@/components/lk-v2/lk-inner";
import { LkFrame } from "@/components/lk-v2/lk-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { type BlogLocale } from "@/lib/blog";
import {
  cornerstonePages,
  getAlternateCornerstoneHref,
  getCornerstoneHref,
  type CornerstonePage,
} from "@/lib/cornerstones";

/**
 * Glavni vodič. Svi vodiči iz cornerstonePages idu kroz zajednički šablon (CornerstoneTypographyPreview: lepljivi
 * sadržaj, brza provera posle prvog H2, vizuali kroz tekst). Rezervni prikaz ispod služi samo stranama van te liste.
 */
export function CornerstonePageView({
  page,
  locale,
}: {
  page: CornerstonePage;
  locale: BlogLocale;
}) {
  if (cornerstonePages.some((guide) => guide.id === page.id)) {
    return <CornerstoneTypographyPreview page={page} locale={locale} />;
  }

  const inner = lkCopy[locale].inner;
  const localized = page[locale];

  return (
    <LkFrame locale={locale} kind="lk-content-page">
      <SiteHeader locale={locale} alternateHref={getAlternateCornerstoneHref(page, locale)} />
      <main id="main">
        <LkInnerHero
          locale={locale}
          crumbs={[{ label: localized.title }]}
          badge={inner.guideBadge}
          title={localized.title}
          lead={localized.excerpt}
        />
        <div className="lk-container">
          <article className="lk-reading">
            <InterlinkingScope currentHref={getCornerstoneHref(page, locale)}>
              {localized.sections.map((section) => (
                <section key={section.heading} className="lk-reading-section">
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>
                      <InlineRichText text={paragraph} locale={locale} />
                    </p>
                  ))}
                </section>
              ))}
            </InterlinkingScope>
          </article>
        </div>
        {localized.faqs.length > 0 ? (
          <LkFaqSection
            title={inner.faqTitle}
            items={localized.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))}
          />
        ) : null}
        <LkFinalCta locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </LkFrame>
  );
}
