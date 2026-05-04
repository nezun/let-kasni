import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { cornerstonePages, getCornerstoneHref } from "@/lib/cornerstones";

type FooterLocale = "sr" | "en";
type LogoBalance = "default" | "optical" | "compact" | "badge";

const footerCopy = {
  sr: {
    homeHref: "/",
    footerBody:
      "Specijalizovani servis za zaštitu prava putnika u avio-saobraćaju i naplatu zakonom propisane odštete.",
    rightsTitle: "Prava putnika",
    companyTitle: "Kompanija",
    navHow: "Kako radi",
    terms: "Uslovi korišćenja",
    privacy: "Politika privatnosti",
    support: "Kontakt",
    copyright: "© 2026 letkasni.rs. Sva prava zadržana.",
  },
  en: {
    homeHref: "/en",
    footerBody:
      "A focused service for passenger-rights claims and compensation recovery support connected to Serbia.",
    rightsTitle: "Know your rights",
    companyTitle: "Our company",
    navHow: "How it works",
    terms: "Terms of use",
    privacy: "Privacy policy",
    support: "Contact",
    copyright: "© 2026 letkasni.rs. All rights reserved.",
  },
} as const;

function footerRightsLinks(locale: FooterLocale) {
  return cornerstonePages.map((page) => ({
    href: getCornerstoneHref(page, locale),
    label: page[locale].title,
  }));
}

export function SiteFooter({
  locale,
  supportEmail,
  logoBalance = "compact",
}: {
  locale: FooterLocale;
  supportEmail: string;
  logoBalance?: LogoBalance;
}) {
  const t = footerCopy[locale];
  const rightsLinks = footerRightsLinks(locale);

  return (
    <footer className="bg-[#0A0F1E] px-6 pb-8 pt-14 text-[#8E9BB0]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 grid gap-10 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.7fr)]">
          <div>
            <BrandLogo href={t.homeHref} tone="light" balance={logoBalance} />
            <p className="mt-[14px] max-w-[300px] text-[13px] leading-[1.7] text-[#8E9BB0]">
              {t.footerBody}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <div className="mb-5 text-[11px] font-black uppercase tracking-[0.14em] text-white">
                {t.rightsTitle}
              </div>
              <nav className="flex flex-col gap-[10px]" aria-label={t.rightsTitle}>
                {rightsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <div className="mb-5 text-[11px] font-black uppercase tracking-[0.14em] text-white">
                {t.companyTitle}
              </div>
              <nav className="flex flex-col gap-[10px]" aria-label={t.companyTitle}>
                <Link
                  href="/privacy"
                  className="w-fit text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
                >
                  {t.privacy}
                </Link>
                <Link
                  href="/terms"
                  className="w-fit text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
                >
                  {t.terms}
                </Link>
                <Link
                  href={`${t.homeHref}#kako-radi`}
                  className="w-fit text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
                >
                  {t.navHow}
                </Link>
                <a
                  href={`mailto:${supportEmail}`}
                  className="w-fit text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
                >
                  {t.support}
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-5 text-xs text-[#8E9BB0]">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
