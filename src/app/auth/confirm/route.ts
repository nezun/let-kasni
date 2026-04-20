import { NextRequest, NextResponse } from "next/server";

import { createSupabaseAnonClient, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/admin/login";

  if (!tokenHash || !type) {
    return NextResponse.redirect(
      new URL(
        `/admin/login?error=${encodeURIComponent("Link za potvrdu nije kompletan.")}`,
        request.url,
      ),
      { status: 303 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      new URL(
        `/admin/login?error=${encodeURIComponent("Supabase auth nije konfigurisan.")}`,
        request.url,
      ),
      { status: 303 },
    );
  }

  const supabase = createSupabaseAnonClient();
  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: type as
      | "signup"
      | "invite"
      | "recovery"
      | "email_change"
      | "email"
      | "magiclink",
  });

  if (error) {
    return NextResponse.redirect(
      new URL(
        `/admin/login?error=${encodeURIComponent("Potvrda linka nije uspela. Otvorite novi link ili se prijavite password-om.")}`,
        request.url,
      ),
      { status: 303 },
    );
  }

  return NextResponse.redirect(new URL(next, request.url), { status: 303 });
}
