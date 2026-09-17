const submissionAttemptIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function sanitizeSubmissionAttemptId(value: unknown) {
  return typeof value === "string" && submissionAttemptIdPattern.test(value)
    ? value.toLowerCase()
    : undefined;
}

export function isConversionRecoveryEligible(
  reused: boolean,
  incomingAttemptId: string | undefined,
  originalInputSnapshot: Record<string, unknown> | undefined,
) {
  return (
    reused &&
    Boolean(incomingAttemptId) &&
    originalInputSnapshot?.submissionAttemptId === incomingAttemptId
  );
}
