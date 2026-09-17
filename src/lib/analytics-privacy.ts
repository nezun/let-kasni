// Only public, application-owned routes may be used as analytics URL/title data.
// Campaign values are explicit metadata, not arbitrary user-provided strings.
const campaignValues: Record<string, readonly string[]> = {
  utm_source: ["google", "facebook", "instagram", "newsletter"],
  utm_medium: ["cpc", "paid_social", "email", "organic", "referral"],
  utm_campaign: ["SEARCH_RS_CORE"],
};

export function analyticsPageContext(
  location: string,
  referrer: string,
  publicPaths: readonly string[],
) {
  const page = new URL(location);
  if (!publicPaths.includes(page.pathname)) return null;
  const safePage = new URL(page.origin + page.pathname);
  for (const [key, values] of Object.entries(campaignValues)) {
    const value = page.searchParams.get(key);
    if (value && values.includes(value)) safePage.searchParams.set(key, value);
  }

  let safeReferrer = "";
  try {
    const previous = new URL(referrer);
    if (["https:", "http:"].includes(previous.protocol)) {
      // External/private paths are not ours to classify. Preserve the origin.
      safeReferrer = previous.origin;
      if (previous.origin === page.origin && publicPaths.includes(previous.pathname)) {
        safeReferrer = previous.origin + previous.pathname;
      }
    }
  } catch {
    // A missing/invalid referrer is not a reason to use the raw value.
  }
  return {
    page_location: safePage.toString(),
    page_referrer: safeReferrer,
    page_path: page.pathname,
    // Do not read dynamic document titles (which may contain user input).
    page_title: `LetKasni | ${page.pathname}`,
  };
}

export function analyticsEventParams(params?: Record<string, unknown>) {
  const allowed: Record<string, readonly string[]> = {
    event_category: ["claim", "contact"],
    event_label: ["nav_cta", "mobile_nav_cta", "cta_section", "inline_form", "modal_form", "focused_claim_flow", "hero_card_cta", "guide_quick_check_cta", "blog_quick_check_cta"],
    form_locale: ["sr", "en"],
    provider_status: ["live_match", "no_match", "provider_unconfigured", "provider_skipped_budget", "timeout", "error", "outside_provider_window"],
    issue_type: ["delay", "cancelled", "delay_3h_plus", "missed_connection_same_booking", "denied_boarding", "other"],
  };
  const values: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params ?? {})) {
    if (key === "reused" && typeof value === "boolean") values[key] = value;
    // Existing call sites supply fixed event metadata, never free-form answers.
    else if (typeof value === "string" && allowed[key]?.includes(value)) values[key] = value;
  }
  return values;
}
