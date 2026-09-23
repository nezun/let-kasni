import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const checks = [
  ["src/components/meta-pixel.tsx", "fbq('track', 'PageView')"],
  ["src/components/meta-pixel.tsx", "hasMarketingConsent"],
  ["src/lib/meta.ts", "eventID"],
  ["src/lib/meta.ts", "hasMarketingConsent"],
  ["src/lib/consent-cookie.ts", "trackingConsentCookieName"],
  ["src/lib/consent-cookie.ts", "trackingConsentCookieMaxAge"],
  ["src/lib/consent-cookie.ts", "parseTrackingConsentValue"],
  ["src/lib/consent.ts", "serializeTrackingConsentCookie"],
  ["src/app/layout.tsx", "lk-consent-bootstrap"],
  ["src/app/layout.tsx", "suppressHydrationWarning"],
  ["src/components/consent-banner.tsx", "data-consent-banner"],
  ["src/app/globals.css", "data-consent=\"1\""],
  ["src/lib/consent-cookie.ts", "privacy-1.2-2026-09-10"],
  ["src/components/consent-banner.tsx", "setTrackingConsent"],
  ["src/components/consent-banner.tsx", "marketing"],
  ["src/components/privacy-settings-button.tsx", "clearTrackingConsent"],
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

const layout = readFileSync(resolve(root, "src/app/layout.tsx"), "utf8");
if (layout.includes("cookies()")) {
  errors.push("src/app/layout.tsx must not read consent cookies; use the blocking head bootstrap instead");
}

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
if (pixelId && !/^\d+$/.test(pixelId)) {
  errors.push("NEXT_PUBLIC_META_PIXEL_ID must contain only digits");
}
// Conversions API (Lead) šalje aplikacija za klijente (letkasni-crm, apps/prijava); sajt ima samo pixel.

if (errors.length > 0) {
  console.error("Meta tracking check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  pixelId
    ? "Meta pixel code is present and NEXT_PUBLIC_META_PIXEL_ID is configured."
    : "Meta pixel code is present. NEXT_PUBLIC_META_PIXEL_ID is not configured, so runtime tracking stays disabled.",
);
