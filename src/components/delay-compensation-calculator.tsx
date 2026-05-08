"use client";

import { useMemo, useState } from "react";

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

  return (
    <div className="rounded-[16px] border border-[#BFD7FF] bg-[#EEF5FF] p-5">
      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#2470EB]">
        {t.result}
      </p>
      <h3 className="mt-2 font-display text-[26px] font-black leading-[1.12] text-[#0B2E6F]">
        {t.title}
      </h3>
      <p className="mt-3 text-sm leading-[1.7] text-[#41516B]">{t.body}</p>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font-black text-[#0A0F1E]">
          {t.route}
          <select
            value={distance}
            onChange={(event) => setDistance(event.target.value as typeof distance)}
            className="rounded-lg border border-[#B4C7E7] bg-white px-3 py-3 text-sm font-bold"
          >
            <option value="short">{t.amounts.short}</option>
            <option value="medium">{t.amounts.medium}</option>
            <option value="long">{t.amounts.long}</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-black text-[#0A0F1E]">
          {t.delay}
          <select
            value={delay}
            onChange={(event) => setDelay(event.target.value as typeof delay)}
            className="rounded-lg border border-[#B4C7E7] bg-white px-3 py-3 text-sm font-bold"
          >
            <option value="under3">{t.amounts.under3}</option>
            <option value="three">{t.amounts.three}</option>
            <option value="four">{t.amounts.four}</option>
          </select>
        </label>

      </div>

      <div className="mt-5 rounded-xl bg-white p-4">
        <p className="text-[12px] font-black uppercase tracking-[0.12em] text-[#8E9BB0]">
          {t.result}
        </p>
        <p className="mt-2 text-[24px] font-black text-[#0A0F1E]">
          {amount ? `${t.check}: ${amount}` : t.notLikely}
        </p>
        <p className="mt-2 text-sm leading-[1.65] text-[#66758B]">{t.care}</p>
      </div>
    </div>
  );
}
