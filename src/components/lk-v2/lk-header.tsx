"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ClaimInlineCtaButton } from "@/components/claim-inline-cta-button";
import type { LkCopy } from "@/components/lk-v2/copy";
import { LkArrow, LkIcon } from "@/components/lk-v2/lk-icon";
import { LkLanguageMenu, LkLanguageRow } from "@/components/lk-v2/lk-language";
import { lkHref, lkPaths, type LkLocale } from "@/components/lk-v2/lk-paths";
import type { SiteVerzija } from "@/lib/site-version";

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
  verzija = "a",
}: {
  locale: LkLocale;
  alternateHref: string;
  t: LkCopy["header"];
  /** Meni strane umesto zajedničkog (npr. sidra na vodiču za kašnjenje, kao na originalu). */
  nav?: ReadonlyArray<{ href: string; label: string }>;
  /** Proba dve verzije sajta (28.09.2026): B menja logo u zaglavlju. */
  verzija?: SiteVerzija;
}) {
  const logo = verzija === "b" ? "/lk/assets/brand-b/logo-horizontalno-svetla.svg" : "/lk/assets/logo.svg";
  const paths = lkPaths(locale);
  const items = nav ?? t.nav.map((item) => ({ href: lkHref(locale, item.to), label: item.label }));
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    // Meni ide preko sadržaja sa zatamnjenjem ispod; strana se ne skroluje dok je otvoren (CSS: html.lk-menu-open).
    document.documentElement.classList.add("lk-menu-open");
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
      document.documentElement.classList.remove("lk-menu-open");
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="lk-header">
        <div className="lk-ui-header lk-container">
          <Link className="lk-ui-wordmark lk-brand" href={paths.home} aria-label={t.homeAria} onClick={close}>
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo iz v2 dizajna, bez obrade slike */}
            <img
              className={verzija === "b" ? "lk-logo lk-logo-b" : "lk-logo"}
              src={logo}
              width={verzija === "b" ? 132 : 228}
              height={verzija === "b" ? 40 : 56}
              alt={t.logoAlt}
            />
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
            <LkLanguageMenu locale={locale} alternateHref={alternateHref} label={t.languageLabel} />
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
          <LkLanguageRow locale={locale} alternateHref={alternateHref} label={t.languageLabel} />
          {items.map((item) => (
            <Link key={item.href} href={item.href} onClick={close}>
              {item.label}
            </Link>
          ))}
          <Link href={paths.blog} onClick={close}>
            {t.blog}
          </Link>
        </nav>
      </header>
      {open ? <div className="lk-menu-overlay" aria-hidden="true" onClick={close} /> : null}
    </>
  );
}
