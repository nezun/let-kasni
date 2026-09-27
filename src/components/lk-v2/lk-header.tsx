"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ClaimInlineCtaButton } from "@/components/claim-inline-cta-button";
import type { LkCopy } from "@/components/lk-v2/copy";
import { LkArrow, LkIcon } from "@/components/lk-v2/lk-icon";
import { lkHref, lkPaths, type LkLocale } from "@/components/lk-v2/lk-paths";

/**
 * Header nove verzije (blok letkasni-v2/header). Dugme „Proverite let“ vodi na formu u aplikaciji za prijave, sa istim
 * merenjem kao do sada (nav_cta). Meni za telefon radi kao letkasni.js na originalu: Escape ga zatvara i vraća fokus na
 * dugme, a zatvara se i klikom na link i kada ekran postane širi od 900px.
 */
export function LkHeader({
  locale,
  alternateHref,
  t,
  nav,
}: {
  locale: LkLocale;
  alternateHref: string;
  t: LkCopy["header"];
  /** Meni strane umesto zajedničkog (npr. sidra na vodiču za kašnjenje, kao na originalu). */
  nav?: ReadonlyArray<{ href: string; label: string }>;
}) {
  const paths = lkPaths(locale);
  const items = nav ?? t.nav.map((item) => ({ href: lkHref(locale, item.to), label: item.label }));
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const otherLang = locale === "sr" ? "en" : "sr";

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    const wide = window.matchMedia("(min-width: 901px)");
    const onWide = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="lk-header">
      <div className="lk-ui-header lk-container">
        <Link className="lk-ui-wordmark lk-brand" href={paths.home} aria-label={t.homeAria} onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo iz v2 dizajna, bez obrade slike */}
          <img className="lk-logo" src="/lk/assets/logo.svg" width={228} height={56} alt={t.logoAlt} />
        </Link>
        <nav className="lk-desktop-nav" aria-label={t.navAria}>
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href={paths.blog}>{t.blog}</Link>
        </nav>
        <div className="lk-header-actions">
          {/* Pun prelaz na drugi jezik: layout postavlja jezik strane (html lang) po adresi. */}
          <a className="lk-language" href={alternateHref} lang={otherLang} aria-label={t.localeAria}>
            {t.localeLabel}
          </a>
          <ClaimInlineCtaButton locale={locale} eventLabel="nav_cta" className="lk-ui-button lk-header-cta">
            {t.cta} <LkArrow />
          </ClaimInlineCtaButton>
          <button
            ref={toggle}
            type="button"
            className="lk-ui-button lk-ui-button--ghost lk-ui-icon-button lk-menu-toggle"
            aria-expanded={open}
            aria-controls="lk-mobile-nav"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen((value) => !value)}
          >
            <LkIcon set="ds" name="menu" />
          </button>
        </div>
      </div>
      <nav className="lk-mobile-nav" id="lk-mobile-nav" aria-label={t.mobileNavAria} hidden={!open}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} onClick={close}>
            {item.label}
          </Link>
        ))}
        <Link href={paths.blog} onClick={close}>
          {t.blog}
        </Link>
        <a href={alternateHref} lang={otherLang}>
          {t.mobileLocale}
        </a>
      </nav>
    </header>
  );
}
