import { getSiteUrl } from "@/lib/env";
import { sendOperationalEmail } from "@/lib/notifications";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function operationalHtml(title: string, body: string, button: string, href: string) {
  return `<div style="background:#f4f6fa;padding:32px 16px;font-family:Arial,sans-serif;color:#0A0F1E"><div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e2e6ef;border-radius:20px;overflow:hidden"><div style="padding:24px 28px;background:#2470EB;color:#fff"><h1 style="margin:0;font-size:26px;line-height:1.2">${escapeHtml(title)}</h1></div><div style="padding:28px;font-size:15px;line-height:1.7;color:#334155"><p>${escapeHtml(body)}</p><p style="margin:24px 0"><a href="${escapeHtml(href)}" style="display:inline-block;background:#2470EB;color:#fff;text-decoration:none;font-weight:700;padding:14px 18px;border-radius:12px">${escapeHtml(button)}</a></p></div></div></div>`;
}

export async function sendMarketingConfirmation(input: {
  email: string;
  locale: "sr" | "en";
  token: string;
  subscriptionId: string;
  requestVersion: string;
}) {
  const english = input.locale === "en";
  const href = `${getSiteUrl()}${english ? "/en" : ""}/marketing/confirm?token=${encodeURIComponent(input.token)}`;
  const subject = english ? "Confirm your subscription to VGA offers" : "Potvrdite prijavu za ponude VGA";
  const body = english
    ? "A subscription was requested for this address to receive email offers from VGA EU CONSULTING DOO about products and services for exercising and protecting passenger and consumer rights, including digital tools and other brands of the same company within that scope. Confirm only if you requested this subscription. Otherwise, ignore this message; you will not receive offers. This does not affect your case."
    : "Zatražena je prijava ove adrese za e-mail ponude VGA EU CONSULTING DOO o proizvodima i uslugama za ostvarivanje i zaštitu prava putnika i potrošača, uključujući digitalne alate i druge brendove istog društva u tom obuhvatu. Potvrdite samo ako ste vi zatražili prijavu. Ako niste, zanemarite poruku; ponude vam neće biti slane. Ovo ne utiče na vaš predmet.";
  const button = english ? "Confirm subscription" : "Potvrdi prijavu";

  return sendOperationalEmail({
    to: input.email,
    subject,
    html: operationalHtml(subject, body, button, href),
    text: `${body}\n\n${button}: ${href}`,
    idempotencyKey: `marketing/${input.subscriptionId}/confirm/${input.requestVersion}`,
    reference: input.subscriptionId,
    kind: "consent_confirmation",
    locale: input.locale,
  });
}

export async function sendMarketingManagementLink(input: {
  email: string;
  locale: "sr" | "en";
  token: string;
  subscriptionId: string;
}) {
  const english = input.locale === "en";
  const href = `${getSiteUrl()}${english ? "/en" : ""}/email-offers?token=${encodeURIComponent(input.token)}`;
  const subject = english ? "Manage VGA email offers" : "Upravljanje VGA e-mail ponudama";
  const body = english
    ? "Use this link to manage or unsubscribe this address from VGA email offers. The link does not affect service messages or your case."
    : "Ovim linkom možete upravljati prijavom ove adrese na VGA e-mail ponude ili se odjaviti. Link ne utiče na servisne poruke ni na vaš predmet.";
  const button = english ? "Manage email offers" : "Upravljaj e-mail ponudama";

  return sendOperationalEmail({
    to: input.email,
    subject,
    html: operationalHtml(subject, body, button, href),
    text: `${body}\n\n${button}: ${href}`,
    idempotencyKey: `marketing/${input.subscriptionId}/manage/${new Date().toISOString().slice(0, 13)}`,
    reference: input.subscriptionId,
    kind: "consent_management",
    locale: input.locale,
  });
}
