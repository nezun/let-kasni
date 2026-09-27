"use client";

import { useState } from "react";

import { isValidEmail } from "@/lib/email-validation";

// Izgled iz v2 dizajna (ew-field, ew-input, ew-button u kartici lk-email-panel na strani); logika je ista kao ranije.
export function MarketingConfirmPanel({ locale, token }: { locale: "sr" | "en"; token: string }) {
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const english = locale === "en";
  async function confirm() {
    setStatus("working");
    const response = await fetch("/api/marketing/confirm", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token }) }).catch(() => null);
    setStatus(response?.ok ? "done" : "error");
  }
  return (
    <>
      <p>{english ? "Confirm only if you requested email offers from VGA EU CONSULTING DOO. This does not affect your case, analytics or advertising choices." : "Potvrdite samo ako ste vi zatražili e-mail ponude VGA EU CONSULTING DOO. Ovo ne utiče na vaš predmet niti na izbor analitike i oglašavanja."}</p>
      <button type="button" onClick={confirm} disabled={status === "working" || status === "done" || !token} className="ew-button">
        {status === "working" ? (english ? "Confirming..." : "Potvrđujemo...") : (english ? "Confirm subscription" : "Potvrdi prijavu")}
      </button>
      {status === "done" ? <p role="status" className="ew-help lk-panel-ok">{english ? "Subscription confirmed." : "Prijava je potvrđena."}</p> : null}
      {status === "error" || !token ? <p role="alert" className="ew-error">{english ? "The link is invalid, expired or the service is unavailable." : "Link nije važeći, istekao je ili usluga trenutno nije dostupna."}</p> : null}
    </>
  );
}

export function MarketingManagePanel({ locale, token }: { locale: "sr" | "en"; token?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const english = locale === "en";
  async function submit() {
    setStatus("working");
    const response = await fetch(token ? "/api/marketing/unsubscribe" : "/api/marketing/manage", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(token ? { token } : { email, locale, sourcePath: window.location.pathname }),
    }).catch(() => null);
    setStatus(response?.ok ? "done" : "error");
  }
  return (
    <>
      <p>{token
        ? (english ? "Unsubscribing stops all VGA email offers covered by this subscription. Service messages and cookie choices do not change." : "Odjava zaustavlja sve e-mail ponude VGA obuhvaćene ovom prijavom. Servisne poruke i izbor kolačića se ne menjaju.")
        : (english ? "Enter your email and we will send a neutral management link if a matching record exists. We do not reveal subscription status on this page." : "Unesite e-mail i poslaćemo neutralan link za upravljanje ako odgovarajući zapis postoji. Na ovoj stranici ne otkrivamo status prijave.")}</p>
      {!token ? <div className="ew-field"><label className="ew-label" htmlFor="offer-email">{english ? "Email address" : "E-mail adresa"}</label><input id="offer-email" type="email" autoComplete="email" placeholder={english ? "name@domain.com" : "ime@domen.rs"} value={email} onChange={(event) => setEmail(event.target.value)} className="ew-input" /></div> : null}
      <button type="button" onClick={submit} disabled={status === "working" || status === "done" || (!token && !isValidEmail(email))} className="ew-button">
        {status === "working" ? (english ? "Working..." : "Obrađujemo...") : token ? (english ? "Unsubscribe from VGA email offers" : "Odjavi me sa VGA e-mail ponuda") : (english ? "Send management link" : "Pošalji link za upravljanje")}
      </button>
      {status === "done" ? <p role="status" className="ew-help lk-panel-ok">{token ? (english ? "You are unsubscribed." : "Odjava je evidentirana.") : (english ? "If a matching record exists, the link has been sent." : "Ako postoji odgovarajući zapis, link je poslat.")}</p> : null}
      {status === "error" ? <p role="alert" className="ew-error">{english ? "The request could not be completed." : "Zahtev trenutno nije moguće završiti."}</p> : null}
    </>
  );
}
