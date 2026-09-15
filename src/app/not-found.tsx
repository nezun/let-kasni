import { headers } from "next/headers";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default async function NotFound() {
  const locale = (await headers()).get("x-site-locale") === "en" ? "en" : "sr";
  const english = locale === "en";

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-20 pt-36">
        <p className="mb-3 text-sm font-semibold text-[#4F5B75]">404</p>
        <h1 className="text-3xl font-bold text-[#0A0F1E]">
          {english ? "Page not found" : "Stranica nije pronađena"}
        </h1>
        <p className="mt-5 text-base leading-7 text-[#4F5B75]">
          {english
            ? "This page is no longer available, or the address is incorrect. You can read about your passenger rights or check your flight."
            : "Ova stranica više nije dostupna ili adresa nije ispravna. Možete pročitati više o pravima putnika ili proveriti svoj let."}
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-base font-semibold text-[#1A52C8]">
          <Link className="underline underline-offset-4" href={english ? "/en/air-passenger-rights" : "/prava-putnika-u-aviosaobracaju"}>
            {english ? "Passenger rights" : "Prava putnika"}
          </Link>
          <Link className="underline underline-offset-4" href={english ? "/en#proveri-let" : "/#proveri-let"}>
            {english ? "Check your flight" : "Proverite let"}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
