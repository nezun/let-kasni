"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

import type { LkCopy } from "@/components/lk-v2/copy";
import { LkArrow } from "@/components/lk-v2/lk-icon";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Trake sa iznosima (250/400/600 €) se jednom popune kada blok uđe u ekran, kao sticky-check.js na originalu.
 * Bez animacije kada sistem traži smanjene pokrete.
 */
export function LkAmountTiers({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiers = ref.current;
    if (!tiers || reducedMotion() || !("IntersectionObserver" in window)) return;
    tiers.classList.add("is-fill-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        tiers.querySelectorAll<HTMLElement>(".lk-amount-track").forEach((track) => {
          const bar = track.querySelector("span");
          if (bar) track.style.setProperty("--lk-fill-distance", `${bar.offsetWidth}px`);
        });
        tiers.classList.add("is-filled");
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(tiers);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="lk-amount-tiers">
      {children}
    </div>
  );
}

/**
 * Traka „Proverite pravo na naknadu“ na dnu ekrana: pojavi se kada forma u heroju ode iznad headera, a nestane kada
 * se vidi završni poziv (#cta). Dugme vraća na formu i stavlja fokus na njen naslov (kao sticky-check.js).
 */
export function LkStickyCheck({ t }: { t: LkCopy["sticky"] }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const form = document.getElementById("proveri-let");
    const finalCta = document.getElementById("cta");
    const main = document.getElementById("main");
    if (!form || !finalCta) return;
    let queued = false;
    const update = () => {
      queued = false;
      const headerBottom = document.querySelector(".lk-header")?.getBoundingClientRect().bottom ?? 0;
      setShown(
        form.getBoundingClientRect().bottom <= headerBottom && finalCta.getBoundingClientRect().top > window.innerHeight,
      );
    };
    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    const resize = new ResizeObserver(schedule);
    if (main) resize.observe(main);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      resize.disconnect();
    };
  }, []);

  function backToForm(event: MouseEvent<HTMLAnchorElement>) {
    const form = document.getElementById("proveri-let");
    if (!form) return;
    event.preventDefault();
    form.querySelector<HTMLElement>("[data-lk-step]:not([hidden]) h2")?.focus({ preventScroll: true });
    form.scrollIntoView({ behavior: reducedMotion() ? "instant" : "smooth", block: "start" });
  }

  return (
    <aside
      className={shown ? "lk-sticky-check is-visible" : "lk-sticky-check"}
      id="lk-sticky-check"
      aria-label={t.aria}
      aria-hidden={!shown}
      inert={!shown}
    >
      <div className="lk-container lk-sticky-check-inner">
        <div className="lk-sticky-check-copy">
          <p>{t.title}</p>
          <span>{t.body}</span>
        </div>
        <a className="ew-button" href="#proveri-let" onClick={backToForm}>
          {t.button} <LkArrow />
        </a>
      </div>
    </aside>
  );
}
