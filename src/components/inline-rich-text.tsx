"use client";

import Link from "next/link";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type BlogTextLocale = "sr" | "en";
type AutoLinkRule = {
  pattern: string;
  href: string;
};
type AutoLinkCandidate = {
  rule: AutoLinkRule;
  match: RegExpExecArray;
  index: number;
  anchor: string;
};
type InterlinkingState = {
  usedHrefs: Set<string>;
  usedAnchors: Set<string>;
  currentHref?: string;
};

type Props = {
  text: string;
  locale?: BlogTextLocale;
  maxAutoLinks?: number;
};

const inlineLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
const InterlinkingContext = createContext<InterlinkingState | null>(null);

const autoLinkRules = {
  sr: [
    { pattern: "tehnički kvar|tehničkog kvara|tehnički problem", href: "/naknada-za-kasnjenje-leta/tehnicki-kvar-aviona-odsteta" },
    { pattern: "loše vreme|lošeg vremena|vreme bilo problem|magla|oluja", href: "/naknada-za-kasnjenje-leta/kasnjenje-leta-zbog-loseg-vremena" },
    { pattern: "kontrola letenja|slotovi|slot", href: "/naknada-za-kasnjenje-leta/kasnjenje-leta-zbog-slotova-kontrole-letenja" },
    { pattern: "preusmeren let|preusmeren na drugi aerodrom|drugi aerodrom", href: "/naknada-za-kasnjenje-leta/preusmeren-let-drugi-aerodrom-prava-putnika" },
    { pattern: "propuštena konekcija|propuštene konekcije|konekcija", href: "/naknada-za-propustenu-konekciju" },
    { pattern: "otkazan let|otkazivanje|otkazivanja", href: "/naknada-za-otkazan-let" },
    { pattern: "kašnjenje leta|kašnjenja leta|kašnjenje", href: "/naknada-za-kasnjenje-leta" },
    { pattern: "uskraćeno ukrcavanje|overbooking", href: "/overbooking-naknada" },
    { pattern: "prtljag|prtljaga|torbe", href: "/naknada-za-kasnjenje-prtljaga" },
    { pattern: "štrajk|štrajka", href: "/naknada-za-strajk-aviokompanije" },
    { pattern: "dokumenta|dokaze|dokaz|boarding pass", href: "/prava-putnika-u-aviosaobracaju/dokumenti-za-avio-odstetu" },
    { pattern: "rokovi|rok", href: "/prava-putnika-u-aviosaobracaju/rokovi-za-avio-odstetu" },
    { pattern: "odbijen zahtev|odbije zahtev|odbijanje", href: "/prava-putnika-u-aviosaobracaju/avio-kompanija-odbila-zahtev" },
    { pattern: "vaučer|vaučera", href: "/overbooking-naknada/vaucer-ili-novac-avio-kompanija" },
  ],
  en: [
    { pattern: "technical fault|technical issue|technical problem", href: "/en/flight-delay-compensation/technical-fault-flight-compensation" },
    { pattern: "bad weather|weather issue|fog|storm", href: "/en/flight-delay-compensation/flight-delay-bad-weather-compensation" },
    { pattern: "air traffic control|atc|slot restriction|slot", href: "/en/flight-delay-compensation/air-traffic-control-slot-delay-compensation" },
    { pattern: "diverted flight|diverted to another airport|another airport", href: "/en/flight-delay-compensation/flight-diverted-different-airport-passenger-rights" },
    { pattern: "missed connection|connection", href: "/en/missed-connection-compensation" },
    { pattern: "cancelled flight|cancellation|cancelled", href: "/en/flight-cancellation-compensation" },
    { pattern: "flight delay|delay", href: "/en/flight-delay-compensation" },
    { pattern: "denied boarding|overbooking", href: "/en/overbooking-compensation" },
    { pattern: "baggage|luggage|bag", href: "/en/delayed-baggage-compensation" },
    { pattern: "strike", href: "/en/airline-strike-compensation" },
    { pattern: "documents|evidence|boarding pass", href: "/en/air-passenger-rights/documents-for-flight-compensation-claim" },
    { pattern: "deadline|deadlines", href: "/en/air-passenger-rights/flight-compensation-deadlines" },
    { pattern: "rejected claim|rejects the claim|rejection", href: "/en/air-passenger-rights/airline-rejected-compensation-claim" },
    { pattern: "voucher", href: "/en/overbooking-compensation/airline-voucher-or-cash-compensation" },
  ],
} as const;

function createInterlinkingState(currentHref?: string): InterlinkingState {
  return {
    usedHrefs: new Set<string>(),
    usedAnchors: new Set<string>(),
    currentHref: currentHref ? normalizeHref(currentHref) : undefined,
  };
}

function normalizeHref(href: string) {
  return href.trim().replace(/#.*$/, "").replace(/\/$/, "") || "/";
}

function normalizeAnchor(anchor: string) {
  return anchor.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function canUseLink(scope: InterlinkingState, href: string, anchor: string) {
  const normalizedHref = normalizeHref(href);

  return (
    normalizedHref !== scope.currentHref &&
    !scope.usedHrefs.has(normalizedHref) &&
    !scope.usedAnchors.has(normalizeAnchor(anchor))
  );
}

function markLinkUsed(scope: InterlinkingState, href: string, anchor: string) {
  scope.usedHrefs.add(normalizeHref(href));
  scope.usedAnchors.add(normalizeAnchor(anchor));
}

export function InterlinkingScope({
  children,
  currentHref,
}: {
  children: ReactNode;
  currentHref?: string;
}) {
  const state = useMemo(() => createInterlinkingState(currentHref), [currentHref]);

  return (
    <InterlinkingContext.Provider value={state}>
      {children}
    </InterlinkingContext.Provider>
  );
}

function findBestAutoLink(
  text: string,
  locale: BlogTextLocale,
  scope: InterlinkingState,
): AutoLinkCandidate | null {
  const candidates: AutoLinkCandidate[] = [];

  for (const rule of autoLinkRules[locale]) {
    const match = new RegExp(
      `(^|[^\\p{L}\\p{N}])(${rule.pattern})(?=$|[^\\p{L}\\p{N}])`,
      "iu",
    ).exec(text);

    if (match) {
      const anchor = match[2];

      if (canUseLink(scope, rule.href, anchor)) {
        candidates.push({ rule, match, index: match.index, anchor });
      }
    }
  }

  candidates.sort((a, b) => a.index - b.index);
  return candidates[0] ?? null;
}

function linkedText(
  text: string,
  locale: BlogTextLocale,
  maxAutoLinks: number,
  keyPrefix: string,
  scope: InterlinkingState,
): { nodes: ReactNode[]; used: number } {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let linkCount = 0;
  let cursor = 0;

  while (remaining && linkCount < maxAutoLinks) {
    const best = findBestAutoLink(remaining, locale, scope);

    if (!best) {
      nodes.push(remaining);
      return { nodes, used: linkCount };
    }

    const [raw, prefix, label] = best.match;
    const plainEnd = best.index + prefix.length;

    if (plainEnd > 0) {
      nodes.push(remaining.slice(0, plainEnd));
    }

    nodes.push(
      <Link
        key={`${keyPrefix}-auto-${cursor}-${best.rule.href}`}
        href={best.rule.href}
        className="lk-inline-link"
      >
        {label}
      </Link>,
    );
    markLinkUsed(scope, best.rule.href, label);

    const consumed = best.index + raw.length;
    remaining = remaining.slice(consumed);
    cursor += consumed;
    linkCount += 1;
  }

  if (remaining) {
    nodes.push(remaining);
  }

  return { nodes, used: linkCount };
}

export function InlineRichText({ text, locale = "sr", maxAutoLinks = 2 }: Props) {
  const contextScope = useContext(InterlinkingContext);
  const localScope = contextScope ?? createInterlinkingState();
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let autoLinksUsed = 0;

  const pushPlainText = (value: string, keyPrefix: string) => {
    const { nodes, used } = linkedText(
      value,
      locale,
      Math.max(maxAutoLinks - autoLinksUsed, 0),
      keyPrefix,
      localScope,
    );

    parts.push(...nodes);
    autoLinksUsed += used;
  };

  while ((match = inlineLinkPattern.exec(text))) {
    const [raw, label, href] = match;

    if (match.index > lastIndex) {
      pushPlainText(text.slice(lastIndex, match.index), `manual-${match.index}`);
    }

    if (canUseLink(localScope, href, label)) {
      parts.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          className="lk-inline-link"
        >
          {label}
        </Link>,
      );
      markLinkUsed(localScope, href, label);
    } else {
      parts.push(label);
    }

    lastIndex = match.index + raw.length;
  }

  if (lastIndex < text.length) {
    pushPlainText(text.slice(lastIndex), "tail");
  }

  return (
    <>
      <style>{`
        .lk-inline-link {
          color: #2470eb;
          font-weight: 900;
          text-decoration-line: none;
          text-decoration-color: #2470eb;
          text-decoration-thickness: 1.5px;
          text-underline-offset: 3px;
          transition: color 160ms ease, text-decoration-color 160ms ease, opacity 160ms ease;
        }

        .lk-inline-link:hover,
        .lk-inline-link:focus-visible {
          color: #1a52c8;
          text-decoration-line: underline;
          text-decoration-color: #1a52c8;
        }
      `}</style>
      {parts}
    </>
  );
}
