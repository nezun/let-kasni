"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  PlaneLanding,
  PlaneTakeoff,
  Search,
} from "lucide-react";

import type {
  AirportCountryGroup,
  AirportOption,
} from "@/data/airports.generated";

type AirportComboboxProps = {
  locale: "sr" | "en";
  label: string;
  placeholder: string;
  destination?: boolean;
  value: string;
  onChange: (value: string) => void;
};

const copy = {
  sr: {
    aria: "izbor aerodroma",
    loading: "Učitavamo aerodrome...",
    results: "Rezultati za",
    noResults: "Nema aerodroma za ovu pretragu.",
    limit: "Prikazano je prvih 100 rezultata. Unesite grad, aerodrom ili IATA kod za uži izbor.",
    prompt: "Izaberite državu ili ukucajte grad, aerodrom ili IATA kod.",
    europe: "Evropa",
    world: "Ostali svet — veliki aerodromi",
  },
  en: {
    aria: "airport selection",
    loading: "Loading airports...",
    results: "Results for",
    noResults: "No airports match this search.",
    limit: "Showing the first 100 results. Enter a city, airport or IATA code to narrow the list.",
    prompt: "Choose a country or type a city, airport or IATA code.",
    europe: "Europe",
    world: "Rest of the world — major airports",
  },
} as const;

const inputClass =
  "w-full rounded-[10px] border border-[#DCE4EF] bg-[#FBFCFE] py-[14px] pl-12 pr-4 text-[15px] font-medium text-[#243047] outline-none placeholder:font-normal placeholder:text-[#9AA7B8] transition focus:border-[#2470EB] focus:bg-white focus:shadow-[0_0_0_3px_rgba(36,112,235,0.09)]";

function normalize(value: string, locale: "sr" | "en" = "sr") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase(locale === "en" ? "en" : "sr-Latn")
    .trim();
}

function airportLabel(airport: AirportOption) {
  return `${airport.city ? `${airport.city} — ` : ""}${airport.name} (${airport.iata})`;
}

export function AirportCombobox({
  locale,
  label,
  placeholder,
  destination = false,
  value,
  onChange,
}: AirportComboboxProps) {
  const t = copy[locale];
  const Icon = destination ? PlaneLanding : PlaneTakeoff;
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suppressOpenOnFocusRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<AirportCountryGroup[] | null>(null);
  const [query, setQuery] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
        setSelectedCountryCode(null);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, []);

  async function openPicker() {
    setOpen(true);
    if (groups || loading) {
      return;
    }

    setLoading(true);
    const airportData = await import("@/data/airports.generated");
    setGroups(airportData.airportCountries);
    setLoading(false);
  }

  const normalizedQuery = normalize(query, locale);
  const selectedCountry = groups?.find((group) => group.code === selectedCountryCode) ?? null;
  const serbiaGroup = groups?.find((group) => group.code === "RS") ?? null;
  const countryMatches = useMemo(() => {
    if (!groups || !normalizedQuery) {
      return [];
    }

    const matches: Array<{ country: AirportCountryGroup; airport: AirportOption }> = [];
    for (const country of groups) {
      const countryName = locale === "en" ? country.countryEnglish : country.country;
      const countryMatchesQuery = normalize(`${countryName} ${country.country} ${country.code}`, locale).includes(normalizedQuery);
      for (const airport of country.airports) {
        if (countryMatchesQuery || airport.search.includes(normalizedQuery)) {
          matches.push({ country, airport });
        }
      }
    }
    return matches
      .sort((left, right) => {
        const score = (match: { country: AirportCountryGroup; airport: AirportOption }) => {
          const iata = normalize(match.airport.iata, locale);
          const city = normalize(match.airport.city, locale);
          const name = normalize(match.airport.name, locale);
          if (iata === normalizedQuery) return 0;
          if (city === normalizedQuery) return 1;
          if (iata.startsWith(normalizedQuery)) return 2;
          if (city.startsWith(normalizedQuery) || name.startsWith(normalizedQuery)) return 3;
          return 4;
        };
        return score(left) - score(right);
      })
      .slice(0, 100);
  }, [groups, locale, normalizedQuery]);

  function countryLabel(country: AirportCountryGroup) {
    return locale === "en" ? country.countryEnglish : country.country;
  }

  function selectAirport(airport: AirportOption) {
    const shouldRestoreFocus = document.activeElement !== inputRef.current;
    onChange(airportLabel(airport));
    setQuery("");
    setSelectedCountryCode(null);
    setOpen(false);
    if (shouldRestoreFocus) {
      suppressOpenOnFocusRef.current = true;
      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
        suppressOpenOnFocusRef.current = false;
      });
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
      setSelectedCountryCode(null);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      listRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      return;
    }

    if (event.key === "Enter" && normalizedQuery && countryMatches[0]) {
      event.preventDefault();
      selectAirport(countryMatches[0].airport);
    }
  }

  return (
    <div ref={rootRef} className="relative block">
      <label className="block">
        <span className="mb-[6px] block text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B]">
          {label}
        </span>
        <span className="relative block">
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#2470EB]" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-controls={listId}
            aria-expanded={open}
            value={query || value}
            onFocus={(event) => {
              if (suppressOpenOnFocusRef.current) {
                suppressOpenOnFocusRef.current = false;
                return;
              }
              void openPicker();
              if (value) {
                event.currentTarget.select();
              }
            }}
            onClick={() => void openPicker()}
            onChange={(event) => {
              setQuery(event.target.value);
              onChange("");
              setSelectedCountryCode(null);
              void openPicker();
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            className={`${inputClass} cursor-pointer`}
          />
          <ChevronRight className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-[#94A3B8]" />
        </span>
      </label>

      {open ? (
        <div
          id={listId}
          ref={listRef}
          role="listbox"
          aria-label={`${label}: ${t.aria}`}
          className={`absolute top-[calc(100%+8px)] z-50 max-h-[390px] w-full max-w-[calc(100vw-2.5rem)] overflow-y-auto rounded-[14px] border border-[#D5E0EF] bg-white p-2 shadow-[0_22px_60px_rgba(20,48,91,0.2)] sm:w-[520px] ${
            destination ? "right-0" : "left-0"
          }`}
        >
          {loading || !groups ? (
            <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm font-medium text-[#64748B]">
              <LoaderCircle className="h-4 w-4 animate-spin text-[#2470EB]" />
              {t.loading}
            </div>
          ) : normalizedQuery ? (
            <div>
              <div className="flex items-center gap-2 border-b border-[#E7EDF5] px-3 py-2 text-xs font-bold text-[#64748B]">
                <Search className="h-4 w-4 text-[#2470EB]" />
                {t.results} “{query}”
              </div>
              {countryMatches.length ? (
                <div className="py-1">
                  {countryMatches.map(({ country, airport }) => (
                    <button
                      key={`${country.code}-${airport.iata}`}
                      type="button"
                      role="option"
                      aria-selected={value === airportLabel(airport)}
                      onClick={() => selectAirport(airport)}
                      className="flex w-full items-start justify-between gap-3 rounded-[9px] px-3 py-2.5 text-left transition hover:bg-[#F1F6FF] focus:bg-[#F1F6FF] focus:outline-none"
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-[#243047]">
                          {airport.city || airport.name}
                          <span className="ml-1 text-[#2470EB]">({airport.iata})</span>
                        </span>
                        <span className="block truncate text-xs text-[#718096]">{airport.name}</span>
                      </span>
                      <span className="shrink-0 pt-0.5 text-[11px] font-semibold text-[#64748B]">
                        {countryLabel(country)}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="px-4 py-8 text-center text-sm text-[#64748B]">
                  {t.noResults}
                </p>
              )}
              {countryMatches.length === 100 ? (
                <p className="border-t border-[#E7EDF5] px-3 py-2 text-xs text-[#718096]">
                  {t.limit}
                </p>
              ) : null}
            </div>
          ) : selectedCountry ? (
            <div>
              <button
                type="button"
                onClick={() => setSelectedCountryCode(null)}
                className="mb-1 flex w-full items-center gap-2 rounded-[9px] px-3 py-2 text-left text-sm font-bold text-[#173B7A] transition hover:bg-[#F1F6FF] focus:outline-none focus:ring-2 focus:ring-[#2470EB]"
              >
                <ChevronLeft className="h-4 w-4" />
                {countryLabel(selectedCountry)}
              </button>
              <div className="border-t border-[#E7EDF5] pt-1">
                {selectedCountry.airports.map((airport) => (
                  <button
                    key={airport.iata}
                    type="button"
                    role="option"
                    aria-selected={value === airportLabel(airport)}
                    onClick={() => selectAirport(airport)}
                    className="flex w-full items-start gap-3 rounded-[9px] px-3 py-2.5 text-left transition hover:bg-[#F1F6FF] focus:bg-[#F1F6FF] focus:outline-none"
                  >
                    <span className="mt-0.5 flex h-7 min-w-11 items-center justify-center rounded-md bg-[#EAF2FF] px-1.5 text-xs font-black text-[#2470EB]">
                      {airport.iata}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-[#243047]">{airport.city || airport.name}</span>
                      <span className="block text-xs text-[#718096]">{airport.name}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start gap-2 border-b border-[#E7EDF5] px-3 py-2.5">
                <Search className="mt-0.5 h-4 w-4 shrink-0 text-[#2470EB]" />
                <p className="text-xs leading-5 text-[#64748B]">
                  {t.prompt}
                </p>
              </div>
              {serbiaGroup ? (
                <div className="border-b border-[#E7EDF5] p-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCountryCode(serbiaGroup.code)}
                    className="flex w-full items-center justify-between gap-2 rounded-[9px] bg-[#F1F6FF] px-3 py-2.5 text-left transition hover:bg-[#E7F0FF] focus:outline-none focus:ring-2 focus:ring-[#2470EB]"
                  >
                    <span className="min-w-0 truncate text-sm font-bold text-[#173B7A]">
                      {countryLabel(serbiaGroup)}
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[#2470EB]">
                      {serbiaGroup.airports.length}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </div>
              ) : null}
              {(["europe", "world"] as const).map((region) => {
                const regionGroups = groups.filter(
                  (group) => group.region === region && group.code !== "RS",
                );
                return (
                  <section key={region} className="pt-2">
                    <h3 className="px-3 pb-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#2470EB]">
                      {region === "europe" ? t.europe : t.world}
                    </h3>
                    <div className="grid gap-0.5 sm:grid-cols-2">
                      {regionGroups.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => setSelectedCountryCode(country.code)}
                          className="flex items-center justify-between gap-2 rounded-[9px] px-3 py-2 text-left transition hover:bg-[#F1F6FF] focus:bg-[#F1F6FF] focus:outline-none"
                        >
                          <span className="min-w-0 truncate text-sm font-semibold text-[#243047]">
                            {countryLabel(country)}
                          </span>
                          <span className="flex shrink-0 items-center gap-1 text-[11px] text-[#7A889D]">
                            {country.airports.length}
                            <ChevronRight className="h-3.5 w-3.5" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
