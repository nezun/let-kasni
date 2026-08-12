import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const checks = [
  ["src/components/meta-pixel.tsx", "fbq('track', 'PageView')"],
  ["src/lib/meta.ts", "eventID"],
  ["src/lib/meta-conversions.ts", 'event_name: "Lead"'],
  ["src/app/claim/submit/route.ts", "sendMetaLeadEvent"],
  ["docs/META-ADS-TRACKING.md", "META_CONVERSIONS_API_ACCESS_TOKEN"],
];

const errors = [];
for (const [relativePath, expected] of checks) {
  const filePath = resolve(root, relativePath);
  if (!existsSync(filePath)) {
    errors.push(`${relativePath} is missing`);
    continue;
  }

  if (!readFileSync(filePath, "utf8").includes(expected)) {
    errors.push(`${relativePath} does not contain ${JSON.stringify(expected)}`);
  }
}

for (const relativePath of [
  "src/components/meta-pixel.tsx",
  "src/lib/meta.ts",
]) {
  const content = readFileSync(resolve(root, relativePath), "utf8");
  if (content.includes("META_CONVERSIONS_API_ACCESS_TOKEN")) {
    errors.push(`${relativePath} must not contain the server-only Meta access token`);
  }
}

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN?.trim();
if (pixelId && !/^\d+$/.test(pixelId)) {
  errors.push("NEXT_PUBLIC_META_PIXEL_ID must contain only digits");
}
if (Boolean(pixelId) !== Boolean(accessToken)) {
  errors.push("NEXT_PUBLIC_META_PIXEL_ID and META_CONVERSIONS_API_ACCESS_TOKEN must be configured together");
}

if (errors.length > 0) {
  console.error("Meta tracking check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  pixelId && accessToken
    ? "Meta tracking code is present and production env is configured."
    : "Meta tracking code is present. Meta env is not configured, so runtime tracking stays disabled.",
);
