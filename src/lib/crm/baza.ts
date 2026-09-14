import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getEnv } from "@/lib/env";

/**
 * CRM baza LetKasni predmeta (tabele crm_*, migracija supabase/migrations/202609141800_crm.sql).
 * Namerno odvojena podešavanja od baze claim forme (NEXT_PUBLIC_SUPABASE_URL): preview može da ima
 * staging CRM dok forma i dalje radi kao do sada. Samo serverski, service role ključ.
 */
let klijent: SupabaseClient | null = null;

export function jeCrmPodesen() {
  return Boolean(getEnv("CRM_SUPABASE_URL") && getEnv("CRM_SUPABASE_SERVICE_ROLE_KEY"));
}

export function crmKlijent() {
  const url = getEnv("CRM_SUPABASE_URL");
  const kljuc = getEnv("CRM_SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !kljuc) {
    throw new Error("CRM baza nije podešena.");
  }

  klijent ??= createClient(url, kljuc, { auth: { autoRefreshToken: false, persistSession: false } });
  return klijent;
}
