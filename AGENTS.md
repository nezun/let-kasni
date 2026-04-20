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
