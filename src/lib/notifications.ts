import { getResendAdminToEmail, getResendApiKey, getResendFromEmail, getSiteUrl, getSupportEmail } from "@/lib/env";
import type { ClaimRecord } from "@/lib/types";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildClaimNotificationHtml(claim: ClaimRecord) {
  const name = [claim.firstName, claim.lastName].filter(Boolean).join(" ").trim() || "Nije uneto";
  const phone = claim.phone?.trim() || "Nije uneto";
  const adminUrl = `${getSiteUrl()}/admin/claims/${claim.id}`;

  return `
    <div style="background:#f4f6fa;padding:32px 16px;font-family:Arial,sans-serif;color:#0A0F1E;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e6ef;border-radius:20px;overflow:hidden;">
        <div style="padding:24px 28px;background:#0B1326;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.58);font-weight:700;">Novi zahtev</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.15;">Stigao je novi claim na letkasni</h1>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.55;">
            <tr><td style="padding:8px 0;color:#6B7585;">Broj predmeta</td><td style="padding:8px 0;font-weight:700;text-align:right;">${escapeHtml(claim.id.slice(0, 8).toUpperCase())}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7585;">Ime i prezime</td><td style="padding:8px 0;font-weight:700;text-align:right;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7585;">Email</td><td style="padding:8px 0;font-weight:700;text-align:right;">${escapeHtml(claim.email)}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7585;">Telefon</td><td style="padding:8px 0;font-weight:700;text-align:right;">${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7585;">Broj leta</td><td style="padding:8px 0;font-weight:700;text-align:right;">${escapeHtml(claim.flightNumber)}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7585;">Datum leta</td><td style="padding:8px 0;font-weight:700;text-align:right;">${escapeHtml(claim.flightDate)}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7585;">Ruta</td><td style="padding:8px 0;font-weight:700;text-align:right;">${escapeHtml(claim.route)}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7585;">Tip problema</td><td style="padding:8px 0;font-weight:700;text-align:right;">${escapeHtml(claim.issueType)}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7585;">Status providera</td><td style="padding:8px 0;font-weight:700;text-align:right;">${escapeHtml(claim.providerSnapshot.status)}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7585;">Operator status</td><td style="padding:8px 0;font-weight:700;text-align:right;">${escapeHtml(claim.operatorStatus)}</td></tr>
          </table>
          <div style="margin-top:28px;">
            <a href="${adminUrl}" style="display:inline-block;background:#2470EB;color:#ffffff;text-decoration:none;font-weight:700;padding:14px 18px;border-radius:12px;">Otvori claim u adminu</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function sendResendEmail(payload: {
  to: string[];
  subject: string;
  html: string;
  text: string;
}) {
  const apiKey = getResendApiKey();

  if (!apiKey) {
    return { ok: false, skipped: true as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getResendFromEmail(),
      reply_to: getSupportEmail(),
      ...payload,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend email failed: HTTP ${response.status}${body ? ` - ${body}` : ""}`);
  }

  return { ok: true as const, skipped: false as const };
}

function buildAdminClaimNotificationText(claim: ClaimRecord) {
  return [
    "Stigao je novi claim na letkasni.",
    `Ref: ${claim.id.slice(0, 8).toUpperCase()}`,
    `Putnik: ${[claim.firstName, claim.lastName].filter(Boolean).join(" ") || "Nije uneto"}`,
    `Email: ${claim.email}`,
    `Telefon: ${claim.phone?.trim() || "Nije uneto"}`,
    `Let: ${claim.flightNumber}`,
    `Datum: ${claim.flightDate}`,
    `Ruta: ${claim.route}`,
    `Problem: ${claim.issueType}`,
    `Provider status: ${claim.providerSnapshot.status}`,
    `Admin: ${getSiteUrl()}/admin/claims/${claim.id}`,
  ].join("\n");
}

function buildUserConfirmationHtml(claim: ClaimRecord) {
  const name = claim.firstName?.trim() || "Poštovani";
  const reference = claim.id.slice(0, 8).toUpperCase();

  return `
    <div style="background:#f4f6fa;padding:32px 16px;font-family:Arial,sans-serif;color:#0A0F1E;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e6ef;border-radius:20px;overflow:hidden;">
        <div style="padding:24px 28px;background:#0B1326;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.58);font-weight:700;">Potvrda prijema</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.15;">Vaš zahtev je uspešno primljen</h1>
        </div>
        <div style="padding:28px;font-size:15px;line-height:1.7;color:#334155;">
          <p style="margin:0 0 14px;">${escapeHtml(name)},</p>
          <p style="margin:0 0 14px;">hvala vam. Primili smo vaš zahtev za proveru avio-odštete i prosledili ga našem timu na obradu.</p>
          <p style="margin:0 0 14px;">Javljamo vam se u roku od 24h sa sledećim korakom. Nema troškova unapred.</p>
          <div style="margin:22px 0;padding:14px 16px;background:#EEF5FF;border-radius:14px;color:#0B2E6F;font-weight:700;">
            Referenca zahteva: ${escapeHtml(reference)}
          </div>
          <p style="margin:0;">Ako budete imali dodatna pitanja, možete odgovoriti direktno na ovaj email.</p>
        </div>
      </div>
    </div>
  `;
}

function buildUserConfirmationText(claim: ClaimRecord) {
  return [
    `${claim.firstName?.trim() || "Poštovani"},`,
    "",
    "Primili smo vaš zahtev za proveru avio-odštete i prosledili ga našem timu na obradu.",
    "Javljamo vam se u roku od 24h sa sledećim korakom.",
    "Nema troškova unapred.",
    "",
    `Referenca zahteva: ${claim.id.slice(0, 8).toUpperCase()}`,
    "",
    "Ako imate dodatna pitanja, možete odgovoriti direktno na ovaj email.",
  ].join("\n");
}

export async function sendAdminClaimNotification(claim: ClaimRecord) {
  const to = getResendAdminToEmail();

  if (!to) {
    return { ok: false, skipped: true as const };
  }

  return sendResendEmail({
    to: [to],
    subject: `Novi claim: ${claim.flightNumber} / ${claim.flightDate}`,
    html: buildClaimNotificationHtml(claim),
    text: buildAdminClaimNotificationText(claim),
  });
}

export async function sendUserClaimConfirmation(claim: ClaimRecord) {
  return sendResendEmail({
    to: [claim.email],
    subject: `Primili smo vaš zahtev - ${claim.id.slice(0, 8).toUpperCase()}`,
    html: buildUserConfirmationHtml(claim),
    text: buildUserConfirmationText(claim),
  });
}
