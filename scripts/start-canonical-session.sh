#!/usr/bin/env bash

set -euo pipefail

EXPECTED_REMOTE="${LETKASNI_EXPECTED_REMOTE:-https://github.com/nezun/let-kasni.git}"
CANONICAL_LOCAL_PATH="${LETKASNI_CANONICAL_PATH:-/Users/nemanjazunic/Documents/CODEX_LET KASNI/letkasni-production}"

fail() {
  printf 'SESSION START BLOCKED: %s\n' "$1" >&2
  exit 1
}

repo_root="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "This command must run inside the LetKasni repository."
cd "$repo_root"

remote_url="$(git remote get-url origin 2>/dev/null || true)"
if [[ "$remote_url" != "$EXPECTED_REMOTE" && "$remote_url" != "git@github.com:nezun/let-kasni.git" ]]; then
  fail "origin is '$remote_url', expected the canonical nezun/let-kasni repository."
fi

if [[ -n "$(git status --porcelain)" ]]; then
  git status --short >&2
  fail "The worktree is dirty. Preserve or checkpoint those changes before starting another task."
fi

mode="status"
task_slug=""

case "${1:-}" in
  "")
    [[ "$#" -eq 0 ]] || fail "Unknown option. Use no option, --resume, or --new <task-slug>."
    ;;
  --resume)
    [[ "$#" -eq 1 ]] || fail "--resume does not accept additional arguments."
    mode="resume"
    ;;
  --new)
    [[ "$#" -eq 2 ]] || fail "Use --new <task-slug>."
    mode="new"
    task_slug="${2:-}"
    [[ -n "$task_slug" ]] || fail "Use --new <task-slug>."
    [[ "$task_slug" =~ ^[a-z0-9][a-z0-9-]*$ ]] || fail "Task slug may contain only lowercase letters, numbers, and hyphens."
    ;;
  *)
    fail "Unknown option. Use no option, --resume, or --new <task-slug>."
    ;;
esac

printf 'Fetching canonical GitHub main...\n'
git fetch --prune origin main

current_branch="$(git branch --show-current)"

if [[ "$mode" == "new" ]]; then
  [[ "$current_branch" == "main" ]] || fail "New tasks must start from main, not '$current_branch'. Resume or finish the current feature branch first."
  branch_name="codex/$task_slug"
  git show-ref --verify --quiet "refs/heads/$branch_name" && fail "Local branch '$branch_name' already exists. Resume it explicitly instead."
  git ls-remote --exit-code --heads origin "$branch_name" >/dev/null 2>&1 && fail "Remote branch '$branch_name' already exists. Resume it explicitly instead."
  git switch main
  git merge --ff-only origin/main
  [[ "$(git rev-parse main)" == "$(git rev-parse origin/main)" ]] || fail "Local main is not identical to origin/main. GitHub main is the only valid base for new work."
  git switch -c "$branch_name"
  current_branch="$branch_name"
elif [[ "$mode" == "resume" ]]; then
  [[ "$current_branch" != "main" ]] || fail "There is no feature branch to resume. Use --new <task-slug> for new work."
  [[ "$current_branch" == codex/* ]] || fail "Only codex/* feature branches may be resumed by this workflow."

  if git ls-remote --exit-code --heads origin "$current_branch" >/dev/null 2>&1; then
    git fetch origin "refs/heads/$current_branch:refs/remotes/origin/$current_branch"
    remote_feature_sha="$(git rev-parse "origin/$current_branch")"
    local_feature_sha="$(git rev-parse HEAD)"

    if [[ "$local_feature_sha" != "$remote_feature_sha" ]]; then
      git merge-base --is-ancestor "$remote_feature_sha" "$local_feature_sha" || fail "Local '$current_branch' is behind or diverged from its remote branch. Synchronize it explicitly before continuing."
    fi
  fi
else
  [[ "$current_branch" == "main" ]] || fail "Current branch is '$current_branch'. Use --resume or start a new task explicitly."
  git merge --ff-only origin/main
fi

if [[ "$mode" != "resume" && "$(git rev-parse main)" != "$(git rev-parse origin/main)" ]]; then
  fail "Local main is not identical to origin/main. GitHub main is the only valid base for new work."
fi

ahead="$(git rev-list --count origin/main..HEAD)"
behind="$(git rev-list --count HEAD..origin/main)"

if [[ "$mode" == "resume" && "$behind" -gt 0 ]]; then
  fail "This feature branch is behind origin/main by $behind commit(s). Synchronize it with current main before continuing."
fi

printf '\nCANONICAL SESSION READY\n'
printf 'Repository: %s\n' "$repo_root"
printf 'Expected local path: %s\n' "$CANONICAL_LOCAL_PATH"
printf 'Branch: %s\n' "$current_branch"
printf 'HEAD: %s\n' "$(git rev-parse HEAD)"
printf 'origin/main: %s\n' "$(git rev-parse origin/main)"
printf 'Ahead/behind origin/main: %s/%s\n' "$ahead" "$behind"
printf 'Worktree: clean\n'

if [[ "$repo_root" != "$CANONICAL_LOCAL_PATH" ]]; then
  printf 'Note: this is a valid canonical clone by remote identity, but it is not the preferred local desktop path.\n'
fi
