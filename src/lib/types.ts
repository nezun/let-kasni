export type IssueType =
  | "delay_3h_plus"
  | "missed_connection_same_booking"
  | "denied_boarding"
  | "other";

export type VerdictBucket =
  | "likely_eligible"
  | "needs_manual_review"
  | "not_supported_yet";

export interface ClaimInput {
  flightNumber: string;
  flightDate: string;
  route: string;
  issueType: IssueType;
  email: string;
  phone?: string;
  website?: string;
}

export interface ClaimRecord extends ClaimInput {
  id: string;
  idempotencyKey: string;
  verdict: VerdictBucket;
  verdictTitle: string;
  verdictBody: string;
  operatorStatus:
    | "new"
    | "manual_review"
    | "awaiting_customer"
    | "ready_for_review"
    | "closed";
  operatorNotes?: string;
  nextAction?: string;
  createdAt: string;
  updatedAt: string;
  providerSnapshot: {
    provider: "aerodatabox";
    status:
      | "live_match"
      | "no_match"
      | "provider_unconfigured"
      | "timeout"
      | "error";
    checkedAt: string;
    timeoutMs: number;
    message?: string;
    normalized?: {
      flightNumber: string;
      flightDate: string;
      route: string;
    };
  };
  originalInputSnapshot?: Record<string, unknown>;
  normalizedInputSnapshot?: Record<string, unknown>;
  verdictSnapshot?: Record<string, unknown>;
}
