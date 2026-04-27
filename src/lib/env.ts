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

export function getSupportEmail() {
  return getEnv("NEXT_PUBLIC_SUPPORT_EMAIL") ?? "podrska@letkasni.rs";
}

export function getOperatorName() {
  return getEnv("NEXT_PUBLIC_OPERATOR_NAME") ?? "VGA EU CONSULTING DOO NIŠ";
}

export function getOperatorAddress() {
  return getEnv("NEXT_PUBLIC_OPERATOR_ADDRESS") ?? "Bulevar Nemanjića 1, 18000, Niš (Medijana), Srbija";
}

export function getOperatorRegistry() {
  return getEnv("NEXT_PUBLIC_OPERATOR_REGISTRY") ?? "APR / Registar privrednih subjekata";
}

export function getOperatorPib() {
  return getEnv("NEXT_PUBLIC_OPERATOR_PIB") ?? "113473442";
}

export function getOperatorMb() {
  return getEnv("NEXT_PUBLIC_OPERATOR_MB") ?? "21873446";
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
