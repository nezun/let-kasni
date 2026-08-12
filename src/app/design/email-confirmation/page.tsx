import { buildUserConfirmationHtml } from "@/lib/notifications";
import type { ClaimRecord } from "@/lib/types";

const previewClaim = {
  id: "a5e39466-0000-4000-8000-000000000000",
  idempotencyKey: "email-preview",
  flightNumber: "JU123",
  flightDate: "2026-08-12",
  route: "BEG - CDG",
  issueType: "delay_3h_plus",
  firstName: "Nemanja",
  lastName: "Zunic",
  email: "client@example.com",
  phone: "+381 60 000 0000",
  verdict: "needs_manual_review",
  verdictTitle: "Potrebna je dodatna provera",
  verdictBody: "Tim će proveriti detalje slučaja.",
  operatorStatus: "new",
  createdAt: "2026-08-12T12:00:00.000Z",
  updatedAt: "2026-08-12T12:00:00.000Z",
  providerSnapshot: {
    provider: "aerodatabox",
    status: "provider_unconfigured",
    checkedAt: "2026-08-12T12:00:00.000Z",
    timeoutMs: 5000,
  },
} satisfies ClaimRecord;

export default function EmailConfirmationDesign() {
  const html = buildUserConfirmationHtml(previewClaim, "sr");

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
