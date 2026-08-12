# CHECKPOINT

Canonical handoff file for future local and Codex Cloud sessions.

## Start Here

1. Read `AGENTS.md`.
2. Read this `CHECKPOINT.md`.
3. Run `git status --short`.
4. Run `npm run checkpoint` to refresh the generated status block.
5. Continue from the first open item in "Next Work".

## Generated Status

<!-- BEGIN:generated-status -->
Generated at: `2026-05-08T22:49:28.985Z`

Branch: `main`

Remote: `https://github.com/nezun/let-kasni.git`

Latest local commit: `ff04840 docs: add autonomous checkpoint handoff`

Worktree status:

```text
M scripts/fetch_beg_history.py
 M src/app/favicon.ico
 M src/app/layout.tsx
 M src/app/manifest.ts
 M src/components/blog-article-page.tsx
 M src/components/claim-modal.tsx
 M src/components/landing-page.tsx
?? .design-import/
?? CHECKPOINT-LANDING-2026-04-30.md
?? public/a11y-annotations/
?? public/apple-touch-icon.png
?? public/favicon.ico
?? public/icon-192.png
?? public/icon-48.png
?? public/icon-512.png
?? public/icon-96.png
?? src/app/design/blog-structure/
?? src/app/design/cs-delay-typography/
?? src/app/design/header-logo/
?? src/app/design/logo-b/
?? src/app/design/logo-c/
?? src/app/design/logo/
?? src/components/blog-hero-route-form.tsx
?? tmp-a11y-annotations/
```

Useful commands:

- `npm run dev`: `next dev`
- `npm run lint`: `eslint`
- `npm run build`: `next build`
- `npm run verify`: `npm run content:qa && npm run content:links && npm run content:benchmark && npm run lint && npm run build`
- `npm run content:qa`: `node scripts/content-qa.mjs`
- `npm run content:links`: `node scripts/content-link-graph.mjs`
- `npm run content:benchmark`: `node scripts/content-benchmark-review.mjs`
- `npm run checkpoint`: `node scripts/update-checkpoint.mjs`
<!-- END:generated-status -->

## Current State

- Canonical local checkout: `/Users/nemanjazunic/Documents/CODEX_LET KASNI/letkasni-production`.
- GitHub remote: `https://github.com/nezun/let-kasni.git`.
- GitHub `main` is the only source of truth for deployable code.
- Production URL: `https://letkasni.rs`.
- Deploy target: Vercel.
- The final approved bilingual landing and claim flow is on GitHub `main` from production commit `41f99a1` or its descendants.
- Historical sibling folders are non-canonical and must not be used for deploys.

## Guardrails

- Follow `AGENTS.md` first.
- Run `npm run session:start` at the beginning of every new chat or resumed task.
- Do not stage unrelated dirty files.
- Keep work on a feature branch until the user explicitly requests deploy.
- Run `npm run release:gate` before merging an approved release into GitHub `main`.
- Deploy only a tree that is traceable to GitHub `main`; never deploy from a sibling folder or random local preview.
- Treat landing design experiments, generated design routes, and imported assets as local exploration until explicitly selected.
- Keep public Serbian content in Latin script.
- Always verify Serbian `/` and English `/en` together unless the user explicitly requests an exception.

## Next Work

- Commit and publish the canonical-workspace rules, scripts, and runbook after verification.
- Audit the legacy dirty folders in a separate task without resetting or deleting their local work.
- With explicit authorization, add the existing Supabase service-role credential to Vercel production and verify durable claim persistence with `REQUIRE_SUPABASE=1 npm run production:check`.

## Locked / Do Not Change Without Approval

- Do not change production credentials or external integrations.
- Do not alter deploy target away from Vercel.
- Do not rewrite approved public content architecture without checking `AGENTS.md` content rules.
- Do not use `air-help-next`, `air-help-next-live`, or another sibling folder as an implicit source for production code.

## Manual Work Still Needed

- Explicit authorization before transmitting the local Supabase service-role credential to Vercel.
- Business/legal review for claim, fee, eligibility, payout, and regulator workflow assumptions.
- A separate audit decision for preserving, committing, or archiving changes in legacy dirty folders.

## Verification Log

- `npm run checkpoint`: refreshes the generated status block in this file.
- `npm run session:start`: verifies canonical remote, branch, and clean worktree before work starts.
- `npm run release:gate`: runs the full SR/EN release gate and shows the exact proposed production diff.
- `npm run release:gate -- --production`: verifies the live deployment commit, both locales, health, Step 2 routes, and safe submit validation.
- `npm run production:check`: diagnostic primitive used by the production gate; do not use it alone for a release decision.
- Production releases still require an agent-driven SR/EN browser interaction pass; the HTTP smoke check cannot prove hydration or client-side transitions.
- Add latest successful `npm run lint`, `npm run build`, `npm run verify`, deploy URL, and known failures here after each substantial session.

## Paste-Ready Prompt

Continue in `/Users/nemanjazunic/Documents/CODEX_LET KASNI/letkasni-production`.

Read `AGENTS.md` and `CHECKPOINT.md` first. Run `npm run session:start`, then continue autonomously from "Next Work". For a new task, use `npm run session:start -- --new <task-slug>`. Never deploy from a sibling folder or a local preview. Preserve guardrails and update `CHECKPOINT.md` before finishing.
