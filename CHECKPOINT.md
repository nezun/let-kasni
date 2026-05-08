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

- Production repo: `air-help-next`.
- GitHub remote: `https://github.com/nezun/let-kasni.git`.
- Production URL: `https://letkasni.rs`.
- Deploy target: Vercel.
- Existing dated handoff: `CHECKPOINT-LANDING-2026-04-30.md`.
- The worktree may contain unrelated local design/content exploration. Inspect before staging.

## Guardrails

- Follow `AGENTS.md` first.
- Do not stage unrelated dirty files.
- Do not commit or deploy unless the task requires it or the user has approved the final selected version.
- Treat landing design experiments, generated design routes, and imported assets as local exploration until explicitly selected.
- Keep public Serbian content in Latin script.
- For blog/content work, run `npm run verify` before deploy.

## Next Work

- Confirm whether current local landing/blog/favicon changes are still wanted.
- Decide which local design exploration files should be kept, committed, or removed.
- If continuing content work, run `npm run content:qa`, `npm run content:links`, and `npm run content:benchmark` before final handoff.

## Locked / Do Not Change Without Approval

- Do not change production credentials or external integrations.
- Do not alter deploy target away from Vercel.
- Do not rewrite approved public content architecture without checking `AGENTS.md` content rules.

## Manual Work Still Needed

- User approval for visual/design choices before shipping exploratory landing changes.
- Business/legal review for claim, fee, eligibility, payout, and regulator workflow assumptions.
- Browser authorization for any external Codex Cloud or GitHub Connector setup.

## Verification Log

- `npm run checkpoint`: refreshes the generated status block in this file.
- Add latest successful `npm run lint`, `npm run build`, `npm run verify`, deploy URL, and known failures here after each substantial session.

## Paste-Ready Prompt

Continue in `/Users/nemanjazunic/Documents/CODEX_LET KASNI/air-help-next`.

Read `AGENTS.md` and `CHECKPOINT.md` first. Run `git status --short` and `npm run checkpoint`, then continue autonomously from "Next Work". Preserve guardrails and update `CHECKPOINT.md` before finishing.
