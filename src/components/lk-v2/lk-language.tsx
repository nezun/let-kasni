"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import type { LkLocale } from "@/components/lk-v2/lk-paths";

// Izbor jezika po obrascu nav-lang-selector iz dizajn sistema (zastavica + naziv), zastavice iz lk:sync.
const languages = [
  { locale: "sr", code: "SR", name: "Srpski", flag: "/lk/assets/flags/rs.png" },
  { locale: "en", code: "EN", name: "English", flag: "/lk/assets/flags/gb.png" },
] as const;

/** Linkovi su pun prelaz (ne next/link): layout postavlja jezik strane (html lang) po adresi. */
function LanguageOptions({ locale, alternateHref }: { locale: LkLocale; alternateHref: string }) {
  const pathname = usePathname();
  return languages.map((language) => {
    const current = language.locale === locale;
    return (
      <li key={language.locale}>
        <a
          className="lk-lang-option"
          href={current ? pathname : alternateHref}
          lang={language.locale}
          hrefLang={language.locale}
          aria-current={current ? "true" : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- mala zastavica iz dizajn sistema */}
          <img className="lk-lang-flag" src={language.flag} alt="" width={28} height={22} />
          <span>{language.name}</span>
        </a>
      </li>
    );
  });
}

/** Računar: mali padajući meni u zaglavlju. Zatvara se na Escape (fokus se vraća na dugme), klik ili fokus van njega. */
export function LkLanguageMenu({ locale, alternateHref, label }: { locale: LkLocale; alternateHref: string; label: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const current = languages.find((language) => language.locale === locale) ?? languages[0];

  useEffect(() => {
    if (!open) return;
    const outside = (event: Event) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lk-language lk-lang" ref={root}>
      <button
        ref={button}
        type="button"
        className="lk-lang-toggle"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${current.name}`}
        onClick={() => setOpen((value) => !value)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- mala zastavica iz dizajn sistema */}
        <img className="lk-lang-flag" src={current.flag} alt="" width={28} height={22} />
        <span aria-hidden="true">{current.code}</span>
        <svg className="lk-lang-chevron" viewBox="0 0 12 12" aria-hidden="true">
          <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul id={listId} className="lk-lang-list" hidden={!open}>
        <LanguageOptions locale={locale} alternateHref={alternateHref} />
      </ul>
    </div>
  );
}

/** Telefon: oba jezika odmah vidljiva u meniju, jedan dodir. */
export function LkLanguageRow({ locale, alternateHref, label }: { locale: LkLocale; alternateHref: string; label: string }) {
  return (
    <ul className="lk-lang-row" aria-label={label}>
      <LanguageOptions locale={locale} alternateHref={alternateHref} />
    </ul>
  );
}
