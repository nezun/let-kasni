import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const repoRoot = resolve(import.meta.dirname, "..");
const sessionScript = join(repoRoot, "scripts/start-canonical-session.sh");
const releaseScript = join(repoRoot, "scripts/release-gate.sh");
const productionScript = join(repoRoot, "scripts/check-production.mjs");
const productionFetchMock = join(repoRoot, "scripts/production-fetch-mock.mjs");

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: options.cwd || repoRoot,
    encoding: "utf8",
    env: { ...process.env, ...options.env },
  });
}

function git(cwd, ...args) {
  const result = run("git", args, { cwd });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout.trim();
}

function createGitFixture() {
  const root = mkdtempSync(join(tmpdir(), "letkasni-workflow-"));
  const remote = join(root, "origin.git");
  const seed = join(root, "seed");
  const work = join(root, "work");

  git(root, "init", "--bare", "--initial-branch=main", remote);
  git(root, "clone", remote, seed);
  git(seed, "config", "user.email", "workflow-test@letkasni.rs");
  git(seed, "config", "user.name", "LetKasni Workflow Test");
  writeFileSync(join(seed, "README.md"), "fixture\n");
  git(seed, "add", "README.md");
  git(seed, "commit", "-m", "fixture: initial main");
  git(seed, "push", "origin", "main");
  git(root, "clone", remote, work);
  git(work, "config", "user.email", "workflow-test@letkasni.rs");
  git(work, "config", "user.name", "LetKasni Workflow Test");

  return { root, remote, seed, work };
}

function session(work, remote, ...args) {
  return run("bash", [sessionScript, ...args], {
    cwd: work,
    env: {
      LETKASNI_EXPECTED_REMOTE: remote,
      LETKASNI_CANONICAL_PATH: work,
    },
  });
}

function installFakeNpm(root) {
  const bin = join(root, "bin");
  const log = join(root, "npm.log");
  mkdirSync(bin);
  const executable = join(bin, "npm");
  writeFileSync(executable, "#!/usr/bin/env bash\nprintf '%s|%s\\n' \"${EXPECTED_GIT_SHA:-}\" \"$*\" >> \"$FAKE_NPM_LOG\"\n");
  chmodSync(executable, 0o755);
  return { bin, log };
}

test("session start creates new work only from synchronized main", () => {
  const { remote, work } = createGitFixture();
  const result = session(work, remote, "--new", "safe-change");

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(git(work, "branch", "--show-current"), "codex/safe-change");
  assert.equal(git(work, "rev-parse", "HEAD"), git(work, "rev-parse", "origin/main"));

  const secondTask = session(work, remote, "--new", "unsafe-overlap");
  assert.notEqual(secondTask.status, 0);
  assert.match(secondTask.stderr, /New tasks must start from main/);
});

test("session start blocks a dirty worktree", () => {
  const { remote, work } = createGitFixture();
  writeFileSync(join(work, "README.md"), "dirty\n");

  const result = session(work, remote);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /worktree is dirty/i);
});

test("session start rejects an unpushed commit on local main", () => {
  const { remote, work } = createGitFixture();
  writeFileSync(join(work, "LOCAL.md"), "local only\n");
  git(work, "add", "LOCAL.md");
  git(work, "commit", "-m", "fixture: local-only main");

  const result = session(work, remote, "--new", "must-not-inherit-local-main");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /main is not identical to origin\/main/);
  assert.equal(git(work, "branch", "--show-current"), "main");
});

test("resume blocks a feature branch that fell behind main", () => {
  const { remote, seed, work } = createGitFixture();
  assert.equal(session(work, remote, "--new", "long-running").status, 0);

  writeFileSync(join(seed, "MAIN.md"), "new main\n");
  git(seed, "add", "MAIN.md");
  git(seed, "commit", "-m", "fixture: advance main");
  git(seed, "push", "origin", "main");

  const result = session(work, remote, "--resume");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /behind origin\/main/);
});

test("resume blocks a local feature branch behind its remote counterpart", () => {
  const { root, remote, work } = createGitFixture();
  assert.equal(session(work, remote, "--new", "shared-work").status, 0);
  git(work, "push", "-u", "origin", "codex/shared-work");

  const second = join(root, "second");
  git(root, "clone", remote, second);
  git(second, "config", "user.email", "workflow-test@letkasni.rs");
  git(second, "config", "user.name", "LetKasni Workflow Test");
  git(second, "switch", "codex/shared-work");
  writeFileSync(join(second, "REMOTE.md"), "new remote work\n");
  git(second, "add", "REMOTE.md");
  git(second, "commit", "-m", "fixture: advance feature remotely");
  git(second, "push", "origin", "codex/shared-work");

  const result = session(work, remote, "--resume");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /behind or diverged from its remote branch/);
});

test("release gate runs verification only for a clean feature commit", () => {
  const { root, work } = createGitFixture();
  git(work, "switch", "-c", "codex/release-test");
  writeFileSync(join(work, "CHANGE.md"), "approved\n");
  git(work, "add", "CHANGE.md");
  git(work, "commit", "-m", "fixture: releasable change");
  const { bin, log } = installFakeNpm(root);

  const result = run("bash", [releaseScript], {
    cwd: work,
    env: { PATH: `${bin}:${process.env.PATH}`, FAKE_NPM_LOG: log },
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(readFileSync(log, "utf8"), "|run verify\n");
  assert.match(result.stdout, /LOCAL VERIFICATION PASSED/);
});

test("production release gate requires main equal to origin and runs smoke check", () => {
  const { root, work } = createGitFixture();
  const { bin, log } = installFakeNpm(root);

  const result = run("bash", [releaseScript, "--production"], {
    cwd: work,
    env: { PATH: `${bin}:${process.env.PATH}`, FAKE_NPM_LOG: log },
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  const mainSha = git(work, "rev-parse", "origin/main");
  assert.equal(readFileSync(log, "utf8"), `|run verify\n${mainSha}|run production:check\n`);
  assert.match(result.stdout, /PRODUCTION RELEASE GATE PASSED/);
});

function runProductionMock(scenario, env = {}) {
  return run(process.execPath, ["--import", productionFetchMock, productionScript], {
    env: {
      PRODUCTION_URL: "https://mock.letkasni.test",
      MOCK_PRODUCTION_SCENARIO: scenario,
      ...env,
    },
  });
}

test("production checker passes healthy routes and verifies the deployed commit", () => {
  const result = runProductionMock("healthy", { EXPECTED_GIT_SHA: "fixture-production-sha" });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Production check passed/);
  assert.match(result.stdout, /deployment matches GitHub main/);
});

test("production checker rejects a deployment from the wrong Git commit", () => {
  const result = runProductionMock("wrong-sha", { EXPECTED_GIT_SHA: "approved-main-sha" });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /expected 'approved-main-sha'/);
});

test("production checker fails when required configuration or locale content is missing", () => {
  const persistenceResult = runProductionMock("missing-supabase", { REQUIRE_SUPABASE: "1" });
  assert.notEqual(persistenceResult.status, 0);
  assert.match(persistenceResult.stderr, /Supabase persistence is not configured/);

  const localeResult = runProductionMock("missing-locale");
  assert.notEqual(localeResult.status, 0);
  assert.match(localeResult.stderr, /missing expected marker/);
});

test("production checker rejects unhealthy transport and response shapes", () => {
  for (const scenario of [
    "page-500",
    "malformed-health",
    "health-not-ok",
    "network-error",
    "unexpected-submit",
  ]) {
    const result = runProductionMock(scenario);
    assert.notEqual(result.status, 0, `${scenario} unexpectedly passed`);
  }
});
