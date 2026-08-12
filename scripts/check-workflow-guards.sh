#!/usr/bin/env bash

set -euo pipefail

scripts=(
  scripts/start-canonical-session.sh
  scripts/release-gate.sh
)

bash -n "${scripts[@]}"
node --check scripts/check-production.mjs
node --test scripts/workflow-guards.test.mjs

for script in "${scripts[@]}"; do
  [[ -x "$script" ]] || {
    printf 'Workflow check failed: %s is not executable.\n' "$script" >&2
    exit 1
  }
done

node - <<'NODE'
const { readFileSync } = require("node:fs");

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const required = ["session:start", "release:gate", "production:check", "workflow:check"];

for (const name of required) {
  if (!pkg.scripts?.[name]) {
    throw new Error(`Missing required package script: ${name}`);
  }
}
NODE

for file in AGENTS.md CHECKPOINT.md docs/OPERATIONS-RUNBOOK.md; do
  [[ -s "$file" ]] || {
    printf 'Workflow check failed: %s is missing or empty.\n' "$file" >&2
    exit 1
  }
done

printf 'Canonical workflow guard checks passed.\n'
