#!/usr/bin/env bash

set -euo pipefail

fail() {
  printf 'RELEASE BLOCKED: %s\n' "$1" >&2
  exit 1
}

repo_root="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "Run this command inside the canonical LetKasni repository."
cd "$repo_root"

[[ -z "$(git status --porcelain)" ]] || {
  git status --short >&2
  fail "Commit or preserve all work before running the release gate."
}

git fetch --prune origin main

branch="$(git branch --show-current)"
head_sha="$(git rev-parse HEAD)"
main_sha="$(git rev-parse origin/main)"
production_mode="${1:-}"

case "$production_mode" in
  ""|--production)
    ;;
  *)
    fail "Unknown option '$production_mode'. Use no option or --production."
    ;;
esac

[[ "$#" -le 1 ]] || fail "Use no option or --production."

if [[ "$production_mode" == "--production" ]]; then
  [[ "$branch" == "main" ]] || fail "Production verification must run on main, not '$branch'."
  [[ "$head_sha" == "$main_sha" ]] || fail "Local main is not identical to origin/main."
elif [[ "$branch" == "main" ]]; then
  fail "There is no feature branch to review. Use --production only after the approved merge reaches main."
else
  git merge-base --is-ancestor origin/main HEAD || fail "The feature branch is not based on current origin/main. Rebase or merge main first."
  [[ "$(git rev-list --count origin/main..HEAD)" -gt 0 ]] || fail "The feature branch contains no commits beyond origin/main."
fi

printf 'Running the complete SR/EN release gate...\n'
npm run verify
git diff --check origin/main...HEAD

printf '\nLOCAL VERIFICATION PASSED\n'
printf 'Branch: %s\n' "$branch"
printf 'HEAD: %s\n' "$head_sha"
printf 'origin/main: %s\n' "$main_sha"

if [[ "$production_mode" == "--production" ]]; then
  EXPECTED_GIT_SHA="$main_sha" npm run production:check
  printf '\nPRODUCTION RELEASE GATE PASSED\n'
else
  printf '\nCommits proposed for main:\n'
  git log --oneline origin/main..HEAD
  printf '\nFiles proposed for main:\n'
  git diff --name-status origin/main...HEAD
  printf '\nNext: review this exact diff, merge it into GitHub main, wait for Vercel, then run npm run release:gate -- --production.\n'
fi
