"use client";

import { useId, useMemo, useState } from "react";

type Locale = "sr" | "en";

const copy = {
  sr: {
    title: "Brza procena iznosa",
    body:
      "Ovo nije konačna odluka, ali pomaže da odmah razdvojite slučajeve koji očigledno nisu za fiksnu naknadu od onih koje vredi proveriti.",
    route: "Dužina rute",
    delay: "Kašnjenje na dolasku",
    result: "Procena",
    notLikely: "Fiksna naknada nije očigledna",
    check: "Slučaj vredi proveriti",
    care:
      "Bez obzira na iznos, kod dužeg čekanja proverite hranu, hotel, transfer i račune.",
    amounts: {
      short: "do 1.500 km",
      medium: "1.500-3.500 km",
      long: "preko 3.500 km",
      under3: "manje od 3 sata",
      three: "3-4 sata",
      four: "4+ sata",
    },
  },
  en: {
    title: "Quick amount estimate",
    body:
      "This is not a final decision, but it helps separate cases that clearly do not fit fixed compensation from those worth checking.",
    route: "Route distance",
    delay: "Arrival delay",
    result: "Estimate",
    notLikely: "Fixed compensation is not obvious",
    check: "The case is worth checking",
    care:
      "Whatever the amount, check meals, hotel, transfer and receipts during longer waits.",
    amounts: {
      short: "up to 1,500 km",
      medium: "1,500-3,500 km",
      long: "over 3,500 km",
      under3: "under 3 hours",
      three: "3-4 hours",
      four: "4+ hours",
    },
  },
};

export function DelayCompensationCalculator({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const id = useId();
  const [distance, setDistance] = useState<"short" | "medium" | "long">("medium");
  const [delay, setDelay] = useState<"under3" | "three" | "four">("four");

  const amount = useMemo(() => {
    if (delay === "under3") {
      return null;
    }

    if (distance === "short") {
      return "250 EUR";
    }

    if (distance === "medium") {
      return "400 EUR";
    }

    return delay === "three" ? "300-600 EUR" : "600 EUR";
  }, [delay, distance]);

  // Izgled iz v2 dizajna (ew-field, ew-label, ew-select u kartici modula); logika procene je ista kao ranije.
  return (
    <div className="lk-module lk-module-card lk-module-calc">
      <span className="ew-badge">{t.result}</span>
      <h3>{t.title}</h3>
      <p>{t.body}</p>

      <div className="lk-module-fields">
        <div className="ew-field">
          <label className="ew-label" htmlFor={`${id}-route`}>
            {t.route}
          </label>
          <select
            id={`${id}-route`}
            className="ew-select"
            value={distance}
            onChange={(event) => setDistance(event.target.value as typeof distance)}
          >
            <option value="short">{t.amounts.short}</option>
            <option value="medium">{t.amounts.medium}</option>
            <option value="long">{t.amounts.long}</option>
          </select>
        </div>

        <div className="ew-field">
          <label className="ew-label" htmlFor={`${id}-delay`}>
            {t.delay}
          </label>
          <select
            id={`${id}-delay`}
            className="ew-select"
            value={delay}
            onChange={(event) => setDelay(event.target.value as typeof delay)}
          >
            <option value="under3">{t.amounts.under3}</option>
            <option value="three">{t.amounts.three}</option>
            <option value="four">{t.amounts.four}</option>
          </select>
        </div>
      </div>

      <div className="lk-module-result" role="status">
        <span className="lk-module-label">{t.result}</span>
        <strong>{amount ? `${t.check}: ${amount}` : t.notLikely}</strong>
        <p>{t.care}</p>
      </div>
    </div>
  );
}
