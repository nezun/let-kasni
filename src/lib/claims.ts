import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { lookupFlight } from "@/lib/flight-provider";
import { isSupabaseConfigured, createSupabaseAdminClient } from "@/lib/supabase";
import { getConservativeVerdict } from "@/lib/verdict";
import type { ClaimInput, ClaimRecord } from "@/lib/types";

const dataDirectory =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "letkasni")
    : path.join(process.cwd(), ".data");
const claimsFile = path.join(dataDirectory, "claims.json");

async function readClaimsStore() {
  try {
    const content = await readFile(claimsFile, "utf8");
    const parsed = JSON.parse(content) as ClaimRecord[];
    return new Map(parsed.map((claim) => [claim.idempotencyKey, claim]));
  } catch {
    return new Map<string, ClaimRecord>();
  }
}

async function writeClaimsStore(claims: Map<string, ClaimRecord>) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(
    claimsFile,
    JSON.stringify([...claims.values()], null, 2),
    "utf8",
  );
}

async function buildClaimRecord(input: ClaimInput, idempotencyKey: string) {
  const providerSnapshot = await lookupFlight(input);
  const verdict = getConservativeVerdict(input, providerSnapshot);
  const now = new Date().toISOString();
  const normalizedInputSnapshot = {
    ...input,
    flightNumber:
      providerSnapshot.normalized?.flightNumber ??
      input.flightNumber.trim().toUpperCase(),
    flightDate:
      providerSnapshot.normalized?.flightDate ?? input.flightDate,
    route: providerSnapshot.normalized?.route ?? input.route.trim(),
  };

  const claim: ClaimRecord = {
    ...input,
    id: randomUUID(),
    idempotencyKey,
    verdict: verdict.bucket,
    verdictTitle: verdict.title,
    verdictBody: verdict.body,
    operatorStatus:
      verdict.bucket === "likely_eligible" ? "new" : "manual_review",
    createdAt: now,
    updatedAt: now,
    operatorNotes: "",
    nextAction:
      verdict.bucket === "likely_eligible"
        ? "Pregledati claim i potvrditi sledeći kontakt sa putnikom."
        : "Ručno proveriti okolnosti leta i validnost slučaja.",
    providerSnapshot,
  };

  return {
    claim: {
      ...claim,
      originalInputSnapshot: { ...input },
      normalizedInputSnapshot,
      verdictSnapshot: {
        bucket: verdict.bucket,
        title: verdict.title,
        body: verdict.body,
      },
    },
    verdict,
  };
}

function getDefaultNextAction(verdict: ClaimRecord["verdict"]) {
  return verdict === "likely_eligible"
    ? "Pregledati claim i potvrditi sledeći kontakt sa putnikom."
    : "Ručno proveriti okolnosti leta i validnost slučaja.";
}

function withOperatorDefaults(claim: ClaimRecord): ClaimRecord {
  return {
    ...claim,
    operatorNotes: claim.operatorNotes ?? "",
    nextAction: claim.nextAction ?? getDefaultNextAction(claim.verdict),
  };
}

function isMissingOperatorWorkflowColumns(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const code =
    "code" in error && typeof error.code === "string" ? error.code : "";
  const message =
    "message" in error && typeof error.message === "string" ? error.message : "";

  return (
    code === "PGRST204" &&
    (message.includes("next_action") || message.includes("operator_notes"))
  );
}

function mapSupabaseRow(row: Record<string, unknown>): ClaimRecord {
  return withOperatorDefaults({
    id: String(row.id),
    idempotencyKey: String(row.idempotency_key),
    flightNumber: String(row.flight_number),
    flightDate: String(row.flight_date),
    route: String(row.route),
    issueType: String(row.issue_type) as ClaimInput["issueType"],
    email: String(row.email),
    phone: typeof row.phone === "string" ? row.phone : undefined,
    verdict: String(row.verdict) as ClaimRecord["verdict"],
    verdictTitle: String(row.verdict_title),
    verdictBody: String(row.verdict_body),
    operatorStatus: String(row.operator_status) as ClaimRecord["operatorStatus"],
    operatorNotes:
      typeof row.operator_notes === "string" ? row.operator_notes : undefined,
    nextAction:
      typeof row.next_action === "string" ? row.next_action : undefined,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    providerSnapshot: row.provider_snapshot as ClaimRecord["providerSnapshot"],
    originalInputSnapshot: row.original_input_snapshot as Record<string, unknown>,
    normalizedInputSnapshot:
      row.normalized_input_snapshot as Record<string, unknown>,
    verdictSnapshot: row.verdict_snapshot as Record<string, unknown>,
  });
}

async function createOrReuseSupabaseClaim(input: ClaimInput) {
  const supabase = createSupabaseAdminClient();
  const idempotencyKey = createIdempotencyKey(input);

  const { data: existing, error: existingError } = await supabase
    .from("claims")
    .select("*")
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    return { claim: mapSupabaseRow(existing), reused: true };
  }

  const { claim } = await buildClaimRecord(input, idempotencyKey);
  const baseInsertPayload = {
    id: claim.id,
    idempotency_key: claim.idempotencyKey,
    flight_number: claim.flightNumber,
    flight_date: claim.flightDate,
    route: claim.route,
    issue_type: claim.issueType,
    email: claim.email,
    phone: claim.phone ?? null,
    verdict: claim.verdict,
    verdict_title: claim.verdictTitle,
    verdict_body: claim.verdictBody,
    operator_status: claim.operatorStatus,
    original_input_snapshot: claim.originalInputSnapshot,
    normalized_input_snapshot: claim.normalizedInputSnapshot,
    provider_snapshot: claim.providerSnapshot,
    verdict_snapshot: claim.verdictSnapshot,
  };

  let { data: inserted, error: insertError } = await supabase
    .from("claims")
    .insert({
      ...baseInsertPayload,
      operator_notes: claim.operatorNotes ?? null,
      next_action: claim.nextAction ?? null,
    })
    .select("*")
    .single();

  if (insertError && isMissingOperatorWorkflowColumns(insertError)) {
    const fallbackInsert = await supabase
      .from("claims")
      .insert(baseInsertPayload)
      .select("*")
      .single();

    inserted = fallbackInsert.data;
    insertError = fallbackInsert.error;
  }

  if (insertError && insertError.code === "23505") {
    const { data: racedExisting, error: racedExistingError } = await supabase
      .from("claims")
      .select("*")
      .eq("idempotency_key", idempotencyKey)
      .maybeSingle();

    if (racedExistingError) {
      throw racedExistingError;
    }

    if (racedExisting) {
      return { claim: mapSupabaseRow(racedExisting), reused: true };
    }
  }

  if (insertError || !inserted) {
    throw insertError ?? new Error("Failed to insert claim.");
  }

  return { claim: mapSupabaseRow(inserted), reused: false };
}

async function createOrReuseLocalClaim(input: ClaimInput) {
  const claimsStore = await readClaimsStore();
  const idempotencyKey = createIdempotencyKey(input);
  const existing = claimsStore.get(idempotencyKey);

  if (existing) {
    return { claim: existing, reused: true };
  }

  const { claim } = await buildClaimRecord(input, idempotencyKey);

  claimsStore.set(idempotencyKey, claim);
  await writeClaimsStore(claimsStore);

  return { claim, reused: false };
}

async function listSupabaseClaims() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("claims")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapSupabaseRow(row));
}

async function getSupabaseClaimById(id: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("claims")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapSupabaseRow(data) : null;
}

async function listLocalClaims() {
  const claimsStore = await readClaimsStore();
  return [...claimsStore.values()].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1,
  );
}

async function getLocalClaimById(id: string) {
  const claims = await listLocalClaims();
  return claims.find((claim) => claim.id === id) ?? null;
}

export async function getClaimById(id: string) {
  if (isSupabaseConfigured()) {
    return getSupabaseClaimById(id);
  }

  return getLocalClaimById(id);
}

async function updateSupabaseClaim(
  id: string,
  updates: Pick<ClaimRecord, "operatorStatus" | "operatorNotes" | "nextAction">,
) {
  const supabase = createSupabaseAdminClient();
  let { data, error } = await supabase
    .from("claims")
    .update({
      operator_status: updates.operatorStatus,
      operator_notes: updates.operatorNotes ?? "",
      next_action: updates.nextAction ?? "",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error && isMissingOperatorWorkflowColumns(error)) {
    const fallbackUpdate = await supabase
      .from("claims")
      .update({
        operator_status: updates.operatorStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    data = fallbackUpdate.data;
    error = fallbackUpdate.error;
  }

  if (error) {
    throw error;
  }

  return mapSupabaseRow(data);
}

async function updateLocalClaim(
  id: string,
  updates: Pick<ClaimRecord, "operatorStatus" | "operatorNotes" | "nextAction">,
) {
  const claimsStore = await readClaimsStore();
  const existingEntry = [...claimsStore.entries()].find(
    ([, claim]) => claim.id === id,
  );

  if (!existingEntry) {
    return null;
  }

  const [key, claim] = existingEntry;
  const updatedClaim: ClaimRecord = {
    ...claim,
    operatorStatus: updates.operatorStatus,
    operatorNotes: updates.operatorNotes ?? "",
    nextAction: updates.nextAction ?? "",
    updatedAt: new Date().toISOString(),
  };

  claimsStore.set(key, updatedClaim);
  await writeClaimsStore(claimsStore);
  return updatedClaim;
}

export async function updateClaimOperatorFields(
  id: string,
  updates: Pick<ClaimRecord, "operatorStatus" | "operatorNotes" | "nextAction">,
) {
  if (isSupabaseConfigured()) {
    return updateSupabaseClaim(id, updates);
  }

  return updateLocalClaim(id, updates);
}

export function createIdempotencyKey(input: ClaimInput) {
  return createHash("sha256")
    .update(
      [
        input.flightNumber.trim().toUpperCase(),
        input.flightDate.trim(),
        input.route.trim().toUpperCase(),
        input.issueType,
        input.email.trim().toLowerCase(),
      ].join("|"),
    )
    .digest("hex");
}

export async function createOrReuseClaim(input: ClaimInput) {
  if (isSupabaseConfigured()) {
    try {
      return await createOrReuseSupabaseClaim(input);
    } catch (error) {
      console.error("Supabase claim write failed; using local fallback.", error);
    }
  }

  return createOrReuseLocalClaim(input);
}

export async function listClaims() {
  if (isSupabaseConfigured()) {
    return listSupabaseClaims();
  }

  return listLocalClaims();
}
