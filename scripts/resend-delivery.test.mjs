import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

import {
  ResendHttpError,
  sendResendRequest,
} from "../src/lib/resend-delivery.mjs";

const repoRoot = resolve(import.meta.dirname, "..");

function successResponse(id = "email_123") {
  return new Response(JSON.stringify({ id }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

test("retries transient transport failures with one stable idempotency key", async () => {
  const requests = [];
  const delays = [];
  const retries = [];
  const responses = [
    new TypeError("fetch failed", { cause: { code: "ECONNRESET" } }),
    new TypeError("fetch failed", { cause: { code: "ETIMEDOUT" } }),
    successResponse(),
  ];

  const result = await sendResendRequest({
    apiKey: "test-key",
    payload: { to: ["passenger@example.com"] },
    idempotencyKey: "claim/claim-123/user/sr",
    timeoutMs: 0,
    fetchImpl: async (url, init) => {
      requests.push({ url, init });
      const response = responses.shift();
      if (response instanceof Error) {
        throw response;
      }
      return response;
    },
    sleep: async (delayMs) => {
      delays.push(delayMs);
    },
    onRetry: (retry) => retries.push(retry),
  });

  assert.equal(result.ok, true);
  assert.equal(result.id, "email_123");
  assert.equal(result.attempts, 3);
  assert.deepEqual(delays, [250, 1_000]);
  assert.equal(retries.length, 2);
  assert.equal(requests.length, 3);
  assert.deepEqual(
    requests.map(({ init }) => init.headers["Idempotency-Key"]),
    [
      "claim/claim-123/user/sr",
      "claim/claim-123/user/sr",
      "claim/claim-123/user/sr",
    ],
  );
});

test("does not retry a non-retryable Resend validation error", async () => {
  let attempts = 0;

  await assert.rejects(
    sendResendRequest({
      apiKey: "test-key",
      payload: { to: ["invalid"] },
      idempotencyKey: "claim/claim-123/admin",
      timeoutMs: 0,
      fetchImpl: async () => {
        attempts += 1;
        return new Response("invalid recipient", { status: 422 });
      },
      sleep: async () => {
        assert.fail("A validation error must not be retried.");
      },
    }),
    (error) => {
      assert.equal(error instanceof ResendHttpError, true);
      assert.equal(error.status, 422);
      assert.equal(error.attempts, 1);
      return true;
    },
  );

  assert.equal(attempts, 1);
});

test("retries temporary Resend server errors", async () => {
  let attempts = 0;

  const result = await sendResendRequest({
    apiKey: "test-key",
    payload: { to: ["passenger@example.com"] },
    idempotencyKey: "claim/claim-456/user/en",
    timeoutMs: 0,
    retryDelaysMs: [0],
    sleep: async () => {},
    fetchImpl: async () => {
      attempts += 1;
      return attempts === 1
        ? new Response("temporary failure", { status: 503 })
        : successResponse("email_456");
    },
  });

  assert.equal(result.id, "email_456");
  assert.equal(result.attempts, 2);
});

test("retries only the safe concurrent idempotency conflict", async () => {
  let attempts = 0;

  const result = await sendResendRequest({
    apiKey: "test-key",
    payload: { to: ["passenger@example.com"] },
    idempotencyKey: "claim/claim-789/user/sr",
    timeoutMs: 0,
    retryDelaysMs: [0],
    sleep: async () => {},
    fetchImpl: async () => {
      attempts += 1;
      return attempts === 1
        ? new Response(
            JSON.stringify({ name: "concurrent_idempotent_requests" }),
            { status: 409 },
          )
        : successResponse("email_789");
    },
  });

  assert.equal(result.id, "email_789");
  assert.equal(attempts, 2);

  await assert.rejects(
    sendResendRequest({
      apiKey: "test-key",
      payload: { to: ["passenger@example.com"] },
      idempotencyKey: "claim/claim-789/user/sr",
      timeoutMs: 0,
      fetchImpl: async () =>
        new Response(
          JSON.stringify({ name: "invalid_idempotent_request" }),
          { status: 409 },
        ),
      sleep: async () => {
        assert.fail("A conflicting idempotent payload must not be retried.");
      },
    }),
    (error) => {
      assert.equal(error.code, "invalid_idempotent_request");
      assert.equal(error.attempts, 1);
      return true;
    },
  );
});

test("claim submit waits for both notification deliveries", () => {
  const route = readFileSync(
    resolve(repoRoot, "src/app/claim/submit/route.ts"),
    "utf8",
  );

  assert.match(route, /await Promise\.allSettled\(\[/);
  assert.doesNotMatch(route, /sendAdminClaimNotification\(claim\)\.catch/);
  assert.doesNotMatch(route, /sendUserClaimConfirmation\([^)]*\)\.catch/);
});
