const baseUrl = (process.env.PRODUCTION_URL || "https://letkasni.rs").replace(/\/$/, "");
const requireSupabase = process.env.REQUIRE_SUPABASE === "1";
const expectedGitSha = process.env.EXPECTED_GIT_SHA?.trim();
const allowUnverifiedDeployment = process.env.ALLOW_UNVERIFIED_DEPLOYMENT === "1";

if (baseUrl === "https://letkasni.rs" && !expectedGitSha && !allowUnverifiedDeployment) {
  throw new Error(
    "EXPECTED_GIT_SHA is required for production. Run npm run release:gate -- --production instead, or set ALLOW_UNVERIFIED_DEPLOYMENT=1 for a non-release diagnostic.",
  );
}

async function request(path, init) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    signal: AbortSignal.timeout(15_000),
    headers: {
      "user-agent": "letkasni-production-check/1.0",
      ...(init?.headers || {}),
    },
  });
  return response;
}

async function expectPage(path, markers) {
  const response = await request(path);
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`${path} returned HTTP ${response.status}.`);
  }

  for (const marker of markers) {
    if (!body.includes(marker)) {
      throw new Error(`${path} is missing expected marker: ${marker}`);
    }
  }

  console.log(`PASS ${path} (${response.status})`);
}

await expectPage("/", ["Let je kasnio 3+ sata", "Šta se dogodilo sa Vašim letom?"]);
await expectPage("/en", ["<title>letkasni.rs</title>", "Flight delayed 3+ hours", "What happened to your flight?"]);
await expectPage("/proveri-let?step=2&issue=delay", ["Detalji Vašeg leta"]);
await expectPage("/en/check-flight?step=2&issue=delay", ["Your flight details"]);

const healthResponse = await request("/api/health");
const health = await healthResponse.json();

if (!healthResponse.ok || health.ok !== true) {
  throw new Error(`/api/health failed with HTTP ${healthResponse.status}.`);
}

console.log(`PASS /api/health (${healthResponse.status})`);

if (expectedGitSha && health.deployment?.gitCommitSha !== expectedGitSha) {
  throw new Error(
    `Production is serving git commit '${health.deployment?.gitCommitSha || "unknown"}', expected '${expectedGitSha}'.`,
  );
}

if (expectedGitSha) {
  console.log(`PASS production deployment matches GitHub main (${expectedGitSha})`);
}

if (health.checks?.supabaseConfigured !== true) {
  const message = "Production Supabase persistence is not configured; claim storage can fall back to ephemeral server storage.";
  if (requireSupabase) {
    throw new Error(message);
  }
  console.warn(`WARNING ${message}`);
}

const invalidSubmitResponse = await request("/claim/submit", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: "{}",
});
const invalidSubmit = await invalidSubmitResponse.json();

if (invalidSubmitResponse.status !== 400 || invalidSubmit.error !== "invalid_input") {
  throw new Error("The claim submit validation endpoint did not reject an empty request safely.");
}

console.log("PASS /claim/submit rejects invalid input without creating a claim (400)");
console.log(`Production check passed for ${baseUrl}.`);
