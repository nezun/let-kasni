# LetKasni canonical development and release runbook

## Purpose

This runbook prevents stale local folders, browser tabs, or parallel chats from overwriting the approved production version.

## Sources of truth

- Deployable code: GitHub `nezun/let-kasni`, branch `main`
- Operating rules: `AGENTS.md`
- Current decisions and next work: `CHECKPOINT.md`
- Production: `https://letkasni.rs` and `https://letkasni.rs/en`

No local preview is authoritative. A preview exists only to review a feature branch.

## Start a new task

From the canonical checkout:

```bash
npm run session:start -- --new short-task-name
```

This command refuses to continue when:

- the remote is not the canonical GitHub repository;
- the worktree has uncommitted files;
- the requested branch already exists locally or remotely;
- local `main` cannot fast-forward to `origin/main`.

After it succeeds, work only on the created `codex/short-task-name` branch.

## Resume an unfinished task

1. Read `AGENTS.md` and `CHECKPOINT.md`.
2. Confirm that the checkpoint names the current feature branch.
3. Run:

```bash
npm run session:start -- --resume
```

If the branch or worktree does not match the checkpoint, stop. Do not guess, reset, or copy files from another folder.

## Save a handoff

Before switching chats or pausing substantial work:

1. Commit a coherent work-in-progress checkpoint when safe, or preserve uncommitted files without switching branches.
2. Run `npm run checkpoint`.
3. Update the manual sections of `CHECKPOINT.md` with decisions, remaining work, blockers, and the exact branch.

The checkpoint explains the work. Git commits preserve the work.

## Pre-deploy gate

When the user explicitly requests deploy, run:

```bash
npm run release:gate
```

The command requires a clean feature branch based on the current `origin/main`, then runs the full project verification and displays the exact commits and files proposed for production.

Review that diff. Merge only the approved tree into GitHub `main`. Do not deploy an uncommitted worktree or a local-only commit directly to Vercel.

## Production deployment

Vercel deploys GitHub `main`. After the merge:

1. Wait for Vercel production to become `READY`.
2. Confirm `letkasni.rs` resolves to that deployment.
3. In a clean local `main` checkout synchronized with `origin/main`, run:

```bash
npm run release:gate -- --production
```

The production check verifies:

- Serbian landing content;
- English landing content and tab title;
- both Step 2 routes;
- `/api/health`;
- the immutable Git commit reported by the live deployment matches GitHub `main`;
- safe rejection of an invalid `/claim/submit` request without creating a claim.

The HTTP check does not replace a real browser interaction test or a durable database write/read/delete canary. Until those isolated test facilities exist, every production release still requires an agent to complete the SR and EN Step 1 → Step 2 → Step 3 flow in a browser and confirm there are no page or console errors. A successful real claim submission is tested manually with an authorized test record; the release script never creates fake claims in the live database.

To require that Supabase production credentials are present as part of the health gate:

```bash
REQUIRE_SUPABASE=1 npm run production:check
```

This flag verifies configuration presence, not database writability. Durable write verification remains blocked until an authenticated canary can write, read, and delete an isolated test record.

## Locale rule

Serbian `/` and English `/en` are one product. Every deploy must verify both. A one-language change is allowed only when the user explicitly requests it and the exception is recorded in `CHECKPOINT.md`.

## Emergency direct deploy

A direct Vercel CLI deploy is emergency-only. If used, the identical source tree must be committed and fast-forwarded to GitHub `main` immediately, then a Git-triggered production deployment must become the deployment serving the custom domain.

## Legacy folders

Do not deploy from sibling LetKasni directories. Their contents may be audited or migrated only through a separate task that names exact files and protects unrelated changes.
