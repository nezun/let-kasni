import { getEnv } from "@/lib/env";

export function getSiteUrl() {
  const configured = getEnv("NEXT_PUBLIC_SITE_URL");

  if (configured) {
    return configured.endsWith("/") ? configured.slice(0, -1) : configured;
  }

  return "http://127.0.0.1:3011";
}
