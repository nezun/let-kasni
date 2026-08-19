const defaultRetryDelaysMs = [250, 1_000];
const defaultTimeoutMs = 6_000;

export class ResendHttpError extends Error {
  constructor(status, body, attempts) {
    super(
      `Resend email failed: HTTP ${status}${body ? ` - ${body.slice(0, 1_000)}` : ""}`,
    );
    this.name = "ResendHttpError";
    this.status = status;
    this.attempts = attempts;
    this.code = parseResendErrorCode(body);
    this.retryable =
      status === 408 ||
      status === 429 ||
      status >= 500 ||
      (status === 409 && this.code === "concurrent_idempotent_requests");
  }
}

function parseResendErrorCode(body) {
  try {
    const parsed = JSON.parse(body);
    return typeof parsed.name === "string" ? parsed.name : undefined;
  } catch {
    return undefined;
  }
}

function isRetryableError(error) {
  if (error instanceof ResendHttpError) {
    return error.retryable;
  }

  return true;
}

function withAttempts(error, attempts) {
  if (error && typeof error === "object") {
    error.attempts = attempts;
  }

  return error;
}

export async function sendResendRequest({
  apiKey,
  payload,
  idempotencyKey,
  fetchImpl = fetch,
  retryDelaysMs = defaultRetryDelaysMs,
  timeoutMs = defaultTimeoutMs,
  sleep = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs)),
  onRetry,
}) {
  const maxAttempts = retryDelaysMs.length + 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(payload),
        signal: timeoutMs > 0 ? AbortSignal.timeout(timeoutMs) : undefined,
      });

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new ResendHttpError(response.status, body, attempt);
      }

      const result = await response.json().catch(() => ({}));
      return {
        ok: true,
        skipped: false,
        id: typeof result.id === "string" ? result.id : undefined,
        attempts: attempt,
      };
    } catch (error) {
      const finalAttempt = attempt === maxAttempts;
      if (finalAttempt || !isRetryableError(error)) {
        throw withAttempts(error, attempt);
      }

      const delayMs = retryDelaysMs[attempt - 1];
      onRetry?.({ attempt, delayMs, error });
      await sleep(delayMs);
    }
  }

  throw new Error("Resend retry loop exited unexpectedly.");
}
