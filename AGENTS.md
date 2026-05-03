## Project Instructions

Priority: These project instructions are repository-level guidance and should be applied before lower-priority workflow preferences. They are intended to align with the user's global instructions.

This project follows the user's Automation-First Paramount Principle.

Always consider how each feature, script, workflow, content process, data pipeline, and admin task can become more automated, repeatable, measurable, and agent-friendly.

For this repository, prioritize:
- reusable scripts over manual steps;
- automated data pipelines over copy-paste;
- tests/checks over manual QA;
- admin dashboards over database hand-editing;
- clear README/runbook instructions for future Codex/agent runs.

Before finishing, explain:
1. what was automated or made more repeatable;
2. what still requires manual work;
3. what the next automation improvement should be;
4. how to test or verify the change.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deploy

- Recommended deploy target for this app: `Vercel`
- Health check endpoint: `/api/health`
- Production URL: `https://letkasni.rs`
- App is allowed to ship before live flight-provider wiring is connected, as long as:
  - claim intake works
  - admin login works
  - admin queue works
  - claims safely fall back to manual review instead of overclaiming automation

## Blog localization

- Blog articles must be bilingual mirrors: Serbian and English versions should keep the same structure, section order, and substance.
- Small wording changes are allowed only when the target language requires it, but the two language versions should remain about 95% equivalent in meaning and coverage.
