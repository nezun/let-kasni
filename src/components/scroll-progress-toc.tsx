"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollProgressTocProps = {
  /** Naslov sadržaja („Sadržaj stranice“). */
  label: string;
  /** aria-label navigacije („Sadržaj“). */
  navLabel?: string;
  sections: Array<{
    id: string;
    label: string;
  }>;
  /** Dugme ispod sadržaja (na originalu „Proverite let →“). */
  children?: ReactNode;
};

/**
 * Lepljivi sadržaj strane (v2 blok lk-toc: details sa listom naslova i dugmetom ispod). Naslov sekcije koja se trenutno
 * čita je istaknut, a lista se sama pomera do njega, pa sadržaj prati čitanje kroz dug tekst.
 */
export function ScrollProgressToc({ label, navLabel, sections, children }: ScrollProgressTocProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const updateActiveSection = () => {
      if (sectionElements.length === 0) {
        return;
      }

      const viewportAnchor = 150;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12;

      if (atBottom) {
        setActiveId(sectionElements[sectionElements.length - 1].id);
        return;
      }

      const current =
        [...sectionElements].reverse().find((element) => element.getBoundingClientRect().top <= viewportAnchor) ??
        sectionElements[0];

      setActiveId(current.id);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  useEffect(() => {
    const nav = navRef.current;
    const activeLink = linkRefs.current[activeId];

    if (!nav || !activeLink) {
      return;
    }

    const top = activeLink.offsetTop - nav.offsetTop - nav.clientHeight / 2 + activeLink.offsetHeight / 2;
    nav.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [activeId]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="lk-toc">
      <details open>
        <summary>{label}</summary>
        <nav ref={navRef} aria-label={navLabel ?? label}>
          {sections.map((section) => (
            <a
              key={section.id}
              ref={(element) => {
                linkRefs.current[section.id] = element;
              }}
              href={`#${section.id}`}
              aria-current={activeId === section.id ? "true" : undefined}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </details>
      {children}
    </div>
  );
}
