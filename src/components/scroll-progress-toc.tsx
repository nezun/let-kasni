"use client";

import { useEffect, useRef, useState } from "react";

type ScrollProgressTocProps = {
  label: string;
  sections: Array<{
    id: string;
    label: string;
  }>;
};

export function ScrollProgressToc({ label, sections }: ScrollProgressTocProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const scrollRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-132px 0px -58% 0px",
        threshold: [0.12, 0.28, 0.5],
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    const activeLink = linkRefs.current[activeId];

    if (!scrollElement || !activeLink) {
      return;
    }

    const targetLeft =
      activeLink.offsetLeft - scrollElement.clientWidth + activeLink.offsetWidth + 72;

    scrollElement.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [activeId]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-16 z-30 border-y border-[#E4E7EC] bg-white/95 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center px-6 py-3">
        <nav
          ref={scrollRef}
          className="flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth pr-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label={label}
        >
          {sections.map((section) => {
            const isActive = activeId === section.id;

            return (
              <a
                key={section.id}
                ref={(element) => {
                  linkRefs.current[section.id] = element;
                }}
                href={`#${section.id}`}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-black transition ${
                  isActive
                    ? "bg-[#2470EB] !text-white shadow-[0_10px_22px_rgba(36,112,235,0.25)]"
                    : "bg-[#F2F4F7] text-[#344054] hover:bg-[#EAF2FF] hover:text-[#1F5FD2]"
                }`}
              >
                {section.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
