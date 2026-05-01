import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";

type FooterLocale = "sr" | "en";
type LogoBalance = "default" | "optical" | "compact" | "badge";

const footerCopy = {
  sr: {
    homeHref: "/",
    footerBody:
      "Specijalizovani servis za zaštitu prava putnika u avio-saobraćaju i naplatu zakonom propisane odštete.",
    footerLinks: "Linkovi",
    footerLegal: "Pravne informacije",
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
    footerLinks: "Links",
    footerLegal: "Legal",
    navHow: "How it works",
    terms: "Terms of use",
    privacy: "Privacy policy",
    support: "Contact",
    copyright: "© 2026 letkasni.rs. All rights reserved.",
  },
} as const;

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

  return (
    <footer className="bg-[#0A0F1E] px-6 pb-8 pt-12 text-white">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <BrandLogo href={t.homeHref} tone="light" balance={logoBalance} />
            <p className="mt-[14px] max-w-[300px] text-[13px] leading-[1.7] text-white/65">
              {t.footerBody}
            </p>
          </div>

          <div>
            <div className="mb-[14px] text-[11px] font-bold uppercase tracking-[0.08em] text-white/60">
              {t.footerLinks}
            </div>
            <div className="flex flex-col gap-[10px]">
              <Link href={`${t.homeHref}#kako-radi`} className="text-sm text-white/60 transition hover:text-white">
                {t.navHow}
              </Link>
              <a
                href={`mailto:${supportEmail}`}
                className="text-sm text-white/60 transition hover:text-white"
              >
                {t.support}
              </a>
            </div>
          </div>

          <div>
            <div className="mb-[14px] text-[11px] font-bold uppercase tracking-[0.08em] text-white/60">
              {t.footerLegal}
            </div>
            <div className="flex flex-col gap-[10px]">
              <Link href="/terms" className="text-sm text-white/60 transition hover:text-white">
                {t.terms}
              </Link>
              <Link href="/privacy" className="text-sm text-white/60 transition hover:text-white">
                {t.privacy}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-5 text-xs text-white/60">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
