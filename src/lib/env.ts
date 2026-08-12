const requiredSupabaseKeys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

export function getEnv(name: string) {
  const value = process.env[name];
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

export function getFlightProviderMode() {
  return getEnv("FLIGHT_PROVIDER_MODE");
}

export function getFlightLookupTimeoutMs() {
  const raw = getEnv("FLIGHT_LOOKUP_TIMEOUT_MS");
  const parsed = raw ? Number(raw) : NaN;

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 2500;
  }

  return parsed;
}

export function getFlightProviderDailyLimit() {
  const raw = getEnv("FLIGHT_PROVIDER_DAILY_LIMIT");
  const parsed = raw ? Number(raw) : NaN;

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 50;
  }

  return Math.floor(parsed);
}

export function getAviationEdgeApiKey() {
  return getEnv("AVIATION_EDGE_API_KEY");
}

export function getAeroDataBoxApiKey() {
  return getEnv("AERODATABOX_API_KEY");
}

export function getAeroDataBoxApiHost() {
  return getEnv("AERODATABOX_API_HOST") ?? "aerodatabox.p.rapidapi.com";
}

export function getAnalyticsMode() {
  return getEnv("NEXT_PUBLIC_ANALYTICS_MODE") ?? getEnv("ANALYTICS_MODE") ?? "ga4";
}

export function getPlausibleDomain() {
  return getEnv("PLAUSIBLE_DOMAIN");
}

export function getGoogleAnalyticsId() {
  return getEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID") ?? "G-RVJ906DKVF";
}

export function getMetaPixelId() {
  const value = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

export function getMetaConversionsApiToken() {
  return getEnv("META_CONVERSIONS_API_ACCESS_TOKEN");
}

export function getMetaGraphApiVersion() {
  return getEnv("META_GRAPH_API_VERSION") ?? "v23.0";
}

export function getMetaTestEventCode() {
  return getEnv("META_TEST_EVENT_CODE");
}

export function getSupportEmail() {
  return getEnv("NEXT_PUBLIC_SUPPORT_EMAIL") ?? "kontakt@letkasni.rs";
}

export function getSupportPhone() {
  return getEnv("NEXT_PUBLIC_SUPPORT_PHONE") ?? "+381637003779";
}

export function getSiteUrl() {
  return getEnv("NEXT_PUBLIC_SITE_URL") ?? "https://letkasni.rs";
}

export function getOperatorName() {
  return getEnv("NEXT_PUBLIC_OPERATOR_NAME") ?? "Expatwise LLC";
}

export function getOperatorAddress() {
  return (
    getEnv("NEXT_PUBLIC_OPERATOR_ADDRESS") ??
    "30 N Gould St, Ste R, Sheridan, WY 82801, USA"
  );
}

export function getOperatorCountry() {
  return getEnv("NEXT_PUBLIC_OPERATOR_COUNTRY") ?? "Sjedinjene Američke Države";
}

export function getOperatorRegistry() {
  return getEnv("NEXT_PUBLIC_OPERATOR_REGISTRY");
}

export function getOperatorPib() {
  return getEnv("NEXT_PUBLIC_OPERATOR_PIB");
}

export function getOperatorMb() {
  return getEnv("NEXT_PUBLIC_OPERATOR_MB");
}

export function isSupabaseConfigured() {
  return requiredSupabaseKeys.every((key) => Boolean(getEnv(key)));
}

export function isAdminPasswordConfigured() {
  return Boolean(getEnv("ADMIN_EMAIL") && getEnv("ADMIN_PASSWORD"));
}

export function getAdminSessionSecret() {
  return getEnv("ADMIN_SESSION_SECRET") ?? "phase1-local-admin-secret";
}

export function getAdminEmail() {
  return getEnv("ADMIN_EMAIL");
}

export function getAdminPassword() {
  return getEnv("ADMIN_PASSWORD");
}

export function getSupabaseUrl() {
  return getEnv("NEXT_PUBLIC_SUPABASE_URL");
}

export function getSupabaseAnonKey() {
  return getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export function getSupabaseServiceRoleKey() {
  return getEnv("SUPABASE_SERVICE_ROLE_KEY");
}

export function getResendApiKey() {
  return getEnv("RESEND_API_KEY");
}

export function getResendFromEmail() {
  return getEnv("RESEND_FROM_EMAIL") ?? "Letkasni <onboarding@resend.dev>";
}

export function getResendAdminToEmail() {
  return getEnv("RESEND_ADMIN_TO_EMAIL");
}
