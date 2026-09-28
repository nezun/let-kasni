import Link from "next/link";

import { ClaimInlineCtaButton } from "@/components/claim-inline-cta-button";
import { copy } from "@/components/lk-v2/copy";
import { LkArrow, LkIcon } from "@/components/lk-v2/lk-icon";
import { lkContact, lkHref, lkPaths, type LkLocale } from "@/components/lk-v2/lk-paths";
import { PrivacySettingsButton } from "@/components/privacy-settings-button";
import { cornerstonePages, getCornerstoneHref } from "@/lib/cornerstones";
import { getSiteVerzija } from "@/lib/site-version";

function guideHref(id: string, locale: LkLocale) {
  const page = cornerstonePages.find((candidate) => candidate.id === id);
  if (!page) throw new Error(`site-footer: nema glavnog vodiča ${id}`);
  return getCornerstoneHref(page, locale);
}

/**
 * Zajednički footer svih javnih strana (nova verzija sajta, v2 iz transport-local; blok letkasni-v2/footer), sa našim
 * linkovima: O nama, sidra na početnoj, Česta pitanja, blog, Kontakt, glavni vodiči i pravne strane, uz „Podešavanja
 * privatnosti“ (ponovni izbor kolačića). Ikonice društvenih mreža su iz dizajna, bez linka dok profili ne budu uneti.
 */
export async function SiteFooter({ locale }: { locale: LkLocale }) {
  const t = copy[locale].footer;
  const header = copy[locale].header;
  const paths = lkPaths(locale);
  const contact = lkContact(locale);
  const verzija = await getSiteVerzija();
  const logo = verzija === "b" ? "/lk/assets/brand-b/logo-horizontalno-tamna.svg" : "/lk/assets/logo.svg";

  return (
    <footer id="footer" className="lk-ui-footer lk-footer lk-footer-v2">
      <div className="lk-container">
        <div className="ft-top-2">
          <Link className="lk-ui-wordmark lk-brand" href={paths.home} aria-label={header.homeAria}>
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo iz v2 dizajna */}
            <img
              className="lk-logo"
              src={logo}
              width={verzija === "b" ? 185 : 228}
              height={56}
              alt={header.logoAlt}
            />
          </Link>
          <div className="ft-social-2" aria-label={t.socialAria}>
            <span className="ft-social-link" role="img" aria-label="Facebook" title="Facebook">
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <circle cx="16" cy="16" r="16" fill="currentColor" />
                <path
                  d="M18.4 29V18h3.7l.6-4.3h-4.3V11c0-1.2.3-2.1 2.1-2.1h2.3V5.1c-.4-.1-1.8-.2-3.3-.2-3.3 0-5.5 2-5.5 5.7v3.1h-3.7V18H14v11Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className="ft-social-link" role="img" aria-label="Instagram" title="Instagram">
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <circle cx="16" cy="16" r="16" fill="currentColor" />
                <rect x="8" y="8" width="16" height="16" rx="5" fill="none" stroke="white" strokeWidth="2" />
                <circle cx="16" cy="16" r="4" fill="none" stroke="white" strokeWidth="2" />
                <circle cx="21" cy="11" r="1.3" fill="white" />
              </svg>
            </span>
          </div>
        </div>
        <div className="ft-divider" />
        <div className="ft-body">
          <div className="ft-rail">
            <div className="ft-office">
              <LkIcon name="logo-airplane" />
              <h3 className="ft-office-title">{t.officeTitle}</h3>
              <p className="ft-office-body">{t.officeBody}</p>
              <ClaimInlineCtaButton locale={locale} eventLabel="footer_cta" className="lk-ui-button ft-office-cta-inline">
                {t.officeButton} <LkArrow />
              </ClaimInlineCtaButton>
            </div>
            <div className="ft-support-card">
              <span className="ft-support-eyebrow">{t.supportEyebrow}</span>
              <a className="ft-support-phone" href={`tel:${contact.phone}`}>
                {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <div className="lk-messengers">
                {contact.messengers.map((messenger) => (
                  <a key={messenger.label} href={messenger.href}>
                    {messenger.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="ft-columns">
            <div className="ft-col">
              <h3>{t.brandColumn}</h3>
              <nav aria-label={t.brandColumn}>
                {t.brandLinks.map((link) => (
                  <Link key={link.to} href={lkHref(locale, link.to)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="ft-col">
              <h3>{t.rightsColumn}</h3>
              <nav aria-label={t.rightsColumn}>
                {t.rightsLinks.map((link) => (
                  <Link key={link.guide} href={guideHref(link.guide, locale)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="ft-col">
              <h3>{t.otherColumn}</h3>
              <nav aria-label={t.otherColumn}>
                {t.otherLinks.map((link) => (
                  <Link key={link.guide} href={guideHref(link.guide, locale)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="lk-footer-bottom">
          <small>{t.copyright}</small>
          <div>
            <Link href={paths.terms}>{t.terms}</Link>
            <Link href={paths.privacy}>{t.privacy}</Link>
            <Link href={paths.emailOffers}>{t.emailOffers}</Link>
            <PrivacySettingsButton label={t.privacySettings} className="lk-privacy-button" />
          </div>
        </div>
      </div>
    </footer>
  );
}
