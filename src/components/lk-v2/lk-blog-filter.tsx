"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const PER_PAGE = 9;

// Kao pages.js na originalu: bez razlike u velikim slovima i kvačicama (č, ć, š, ž, đ).
const normalize = (value: string) =>
  value.toLocaleLowerCase("sr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "dj");

// useLayoutEffect samo u pregledaču (na serveru nema DOM-a), da se straničenje primeni pre iscrtavanja.
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export type LkBlogFilterText = {
  searchLabel: string;
  searchPlaceholder: string;
  topicLabel: string;
  topicApply: string;
  count: string;
  emptyTitle: string;
  emptyBody: string;
  reset: string;
  prev: string;
  next: string;
  pagesAria: string;
};

/**
 * Pretraga, tema i straničenje bloga (v2 blok blog: lk-blog-tools, broj pronađenih, prazno stanje, lk-pagination).
 * Sve kartice dolaze sa servera (u HTML-u su svi linkovi, i bez JavaScripta); ovde se samo sakrivaju one koje ne
 * odgovaraju pretrazi i prikazuje po 9 na strani. Tema ostaje filter preko adrese (?tema=…), kao i do sada.
 */
export function LkBlogFilter({
  t,
  blogHref,
  topics,
  activeTopic,
  initialCount,
  children,
}: {
  t: LkBlogFilterText;
  blogHref: string;
  topics: ReadonlyArray<{ id: string; label: string; href: string }>;
  activeTopic: string;
  initialCount: number;
  children: ReactNode;
}) {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [stats, setStats] = useState({ matches: initialCount, total: 1, current: 0, ready: false });

  useBrowserLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = [...grid.querySelectorAll<HTMLElement>("[data-article]")];
    const q = normalize(query.trim());
    const matches = cards.filter((card) => normalize(card.dataset.search ?? "").includes(q));
    const total = Math.max(1, Math.ceil(matches.length / PER_PAGE));
    const current = Math.min(page, total - 1);
    cards.forEach((card) => {
      card.hidden = true;
    });
    matches.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE).forEach((card) => {
      card.hidden = false;
    });
    setStats({ matches: matches.length, total, current, ready: true });
  }, [query, page]);

  function goToPage(next: number) {
    setPage(next);
    searchRef.current?.scrollIntoView({ block: "center" });
  }

  function reset() {
    setQuery("");
    setPage(0);
    searchRef.current?.focus();
  }

  return (
    <>
      <div className="lk-blog-tools">
        <div className="ew-field">
          <label className="ew-label" htmlFor="blog-search">
            {t.searchLabel}
          </label>
          <input
            ref={searchRef}
            className="ew-input"
            id="blog-search"
            type="search"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(0);
            }}
          />
        </div>
        <form className="ew-field" method="get" action={blogHref}>
          <label className="ew-label" htmlFor="blog-category">
            {t.topicLabel}
          </label>
          <select
            className="ew-select"
            id="blog-category"
            name="tema"
            value={activeTopic}
            onChange={(event) => {
              const topic = topics.find((item) => item.id === event.target.value);
              if (topic) router.push(topic.href, { scroll: false });
            }}
          >
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.label}
              </option>
            ))}
          </select>
          <noscript>
            <button className="ew-button ew-button--secondary" type="submit">
              {t.topicApply}
            </button>
          </noscript>
        </form>
      </div>
      <p id="blog-count" role="status">
        {t.count} {stats.matches}
      </p>
      <div ref={gridRef}>{children}</div>
      <div id="blog-empty" className="ew-empty" hidden={stats.matches > 0}>
        <h2>{t.emptyTitle}</h2>
        <p>{t.emptyBody}</p>
        <button className="ew-button ew-button--secondary" id="blog-reset" type="button" onClick={reset}>
          {t.reset}
        </button>
      </div>
      <div className="lk-pagination" aria-label={t.pagesAria} hidden={!stats.ready || stats.matches === 0}>
        <button
          className="ew-button ew-button--secondary"
          id="blog-prev"
          type="button"
          disabled={stats.current === 0}
          onClick={() => goToPage(stats.current - 1)}
        >
          {t.prev}
        </button>
        <span id="blog-page">
          {stats.current + 1} / {stats.total}
        </span>
        <button
          className="ew-button"
          id="blog-next"
          type="button"
          disabled={stats.current >= stats.total - 1}
          onClick={() => goToPage(stats.current + 1)}
        >
          {t.next}
        </button>
      </div>
    </>
  );
}
