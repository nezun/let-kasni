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
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  website?: string;
}

export type FlightProviderStatus =
  | "live_match"
  | "no_match"
  | "provider_unconfigured"
  | "provider_skipped_budget"
  | "timeout"
  | "error"
  | "outside_provider_window";

export interface FlightProviderSnapshot {
  provider: "aerodatabox" | "aviation_edge";
  status: FlightProviderStatus;
  checkedAt: string;
  timeoutMs: number;
  message?: string;
  matchConfidence?: "high" | "medium" | "low";
  normalized?: {
    flightNumber: string;
    flightDate: string;
    route: string;
  };
  flight?: {
    iataNumber?: string;
    number?: string;
  };
  airline?: {
    iataCode?: string;
    name?: string;
  };
  departure?: {
    iataCode?: string;
    scheduledTime?: string;
    actualTime?: string;
    estimatedTime?: string;
    delayMinutes?: number;
  };
  arrival?: {
    iataCode?: string;
    scheduledTime?: string;
    actualTime?: string;
    estimatedTime?: string;
    delayMinutes?: number;
  };
  rawSummary?: Record<string, unknown>;
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
  providerSnapshot: FlightProviderSnapshot;
  originalInputSnapshot?: Record<string, unknown>;
  normalizedInputSnapshot?: Record<string, unknown>;
  verdictSnapshot?: Record<string, unknown>;
}
