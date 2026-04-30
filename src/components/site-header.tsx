"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand-logo";

type HeaderLocale = "sr" | "en";
type LogoBalance = "default" | "optical" | "compact" | "badge";

const headerCopy = {
  sr: {
    homeHref: "/",
    blogHref: "/blog",
    claimHref: "/#proveri-let",
    localeHref: "/en",
    localeSwitchFlag: "🇬🇧",
    localeSwitchLabel: "EN",
    localeSwitchAria: "English version",
    navHow: "Kako radi",
    navBenefits: "Prednosti",
    navFaq: "Česta pitanja",
    navBlog: "Blog",
    navCta: "Proveri let",
  },
  en: {
    homeHref: "/en",
    blogHref: "/en/blog",
    claimHref: "/en#proveri-let",
    localeHref: "/",
    localeSwitchFlag: "🇷🇸",
    localeSwitchLabel: "SR",
    localeSwitchAria: "Srpska verzija",
    navHow: "How it works",
    navBenefits: "Benefits",
    navFaq: "FAQ",
    navBlog: "Blog",
    navCta: "Check flight",
  },
};

export function SiteHeader({
  locale,
  alternateHref,
  logoBalance = "compact",
  onCtaClick,
}: {
  locale: HeaderLocale;
  alternateHref?: string;
  logoBalance?: LogoBalance;
  onCtaClick?: (source: "nav_cta" | "mobile_nav_cta") => void;
}) {
  const t = headerCopy[locale];
  const localeHref = alternateHref ?? t.localeHref;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaClass =
    "ml-[6px] rounded-lg bg-[#2470EB] px-5 py-[9px] text-sm font-semibold !text-white transition hover:bg-[#1A52C8]";
  const mobileCtaClass =
    "rounded-2xl bg-[#2470EB] px-5 py-4 text-base font-semibold !text-white";

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "border-b border-[#E2E6EF] bg-white/95 backdrop-blur-[12px]"
            : "bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <BrandLogo href={t.homeHref} balance={logoBalance} />

          <div className="hidden items-center gap-[2px] md:flex">
            <Link
              href={`${t.homeHref}#kako-radi`}
              className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
            >
              {t.navHow}
            </Link>
            <Link
              href={`${t.homeHref}#prednosti`}
              className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
            >
              {t.navBenefits}
            </Link>
            <Link
              href={`${t.homeHref}#faq`}
              className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
            >
              {t.navFaq}
            </Link>
            <Link
              href={t.blogHref}
              className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
            >
              {t.navBlog}
            </Link>
            <div className="mx-[6px] h-[18px] w-px bg-[#E2E6EF]" />
            <Link
              href={localeHref}
              aria-label={t.localeSwitchAria}
              className="inline-flex items-center gap-1.5 rounded-lg px-[10px] py-2 text-[13px] font-semibold text-[#6B7585] transition hover:bg-[#F4F6FA] hover:text-[#0A0F1E]"
            >
              <span aria-hidden="true" className="text-base leading-none">
                {t.localeSwitchFlag}
              </span>
              <span>{t.localeSwitchLabel}</span>
            </Link>
            {onCtaClick ? (
              <button
                onClick={() => onCtaClick("nav_cta")}
                className={ctaClass}
              >
                {t.navCta}
              </button>
            ) : (
              <Link href={t.claimHref} className={ctaClass}>
                {t.navCta}
              </Link>
            )}
          </div>

          <button
            className="rounded-xl p-2 transition hover:bg-[#F4F6FA] md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-40 bg-white px-6 pb-8 pt-24 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href={`${t.homeHref}#kako-radi`}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl border border-[#E2E6EF] px-5 py-4 text-base font-medium"
            >
              {t.navHow}
            </Link>
            <Link
              href={`${t.homeHref}#prednosti`}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl border border-[#E2E6EF] px-5 py-4 text-base font-medium"
            >
              {t.navBenefits}
            </Link>
            <Link
              href={`${t.homeHref}#faq`}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl border border-[#E2E6EF] px-5 py-4 text-base font-medium"
            >
              {t.navFaq}
            </Link>
            <Link
              href={t.blogHref}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl border border-[#E2E6EF] px-5 py-4 text-base font-medium"
            >
              {t.navBlog}
            </Link>
            {onCtaClick ? (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onCtaClick("mobile_nav_cta");
                }}
                className={mobileCtaClass}
              >
                {t.navCta}
              </button>
            ) : (
              <Link
                href={t.claimHref}
                onClick={() => setIsMenuOpen(false)}
                className={mobileCtaClass}
              >
                {t.navCta}
              </Link>
            )}
            <Link
              href={localeHref}
              onClick={() => setIsMenuOpen(false)}
              aria-label={t.localeSwitchAria}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#E2E6EF] px-5 py-4 text-base font-medium text-[#6B7585]"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {t.localeSwitchFlag}
              </span>
              <span>{t.localeSwitchLabel}</span>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
