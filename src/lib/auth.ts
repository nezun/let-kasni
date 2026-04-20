import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

import {
  getAdminEmail,
  getAdminPassword,
  getAdminSessionSecret,
  isAdminPasswordConfigured,
} from "@/lib/env";
import { createSupabaseAnonClient, createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";

const adminCookieName = "lk_admin_session";

type SessionMode = "supabase" | "local";

interface AdminSessionCookie {
  email: string;
  mode: SessionMode;
  accessToken?: string;
  refreshToken?: string;
  createdAt: string;
}

export interface AdminSession {
  email: string;
  mode: SessionMode;
}

function signValue(value: string) {
  return createHmac("sha256", getAdminSessionSecret()).update(value).digest("hex");
}

function encodeSession(session: AdminSessionCookie) {
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
  const signature = signValue(payload);
  return `${payload}.${signature}`;
}

function decodeSession(raw: string) {
  const [payload, signature] = raw.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = signValue(payload);
  if (signature.length !== expectedSignature.length) {
    return null;
  }
  const signatureMatches = timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );

  if (!signatureMatches) {
    return null;
  }

  try {
    return JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as AdminSessionCookie;
  } catch {
    return null;
  }
}

export function getAdminAuthMode() {
  if (isSupabaseConfigured()) {
    return "supabase";
  }

  if (isAdminPasswordConfigured()) {
    return "local";
  }

  return "unconfigured";
}

export async function createAdminSession(email: string, password: string) {
  if (isSupabaseConfigured()) {
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return { ok: false as const, error: "Neispravni pristupni podaci." };
    }

    return {
      ok: true as const,
      cookieValue: encodeSession({
        email: data.user.email ?? email,
        mode: "supabase",
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        createdAt: new Date().toISOString(),
      }),
    };
  }

  const adminEmail = getAdminEmail();
  const adminPassword = getAdminPassword();

  if (!adminEmail || !adminPassword) {
    return {
      ok: false as const,
      error: "Admin auth još nije konfigurisan. Dodaj env vrednosti ili Supabase Auth.",
    };
  }

  if (email !== adminEmail || password !== adminPassword) {
    return { ok: false as const, error: "Neispravni pristupni podaci." };
  }

  return {
    ok: true as const,
    cookieValue: encodeSession({
      email,
      mode: "local",
      createdAt: new Date().toISOString(),
    }),
  };
}

export async function setAdminSessionCookie(
  cookieValue: string,
  options?: { secure?: boolean },
) {
  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, cookieValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: options?.secure ?? process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(adminCookieName)?.value;

  if (!raw) {
    return null;
  }

  const decoded = decodeSession(raw);

  if (!decoded) {
    return null;
  }

  if (decoded.mode === "supabase") {
    if (!decoded.accessToken || !isSupabaseConfigured()) {
      return null;
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.auth.getUser(decoded.accessToken);

    if (error || !data.user?.email) {
      return null;
    }

    return {
      email: data.user.email,
      mode: "supabase" as const,
    };
  }

  const adminEmail = getAdminEmail();

  if (!adminEmail || decoded.email !== adminEmail) {
    return null;
  }

  return {
    email: decoded.email,
    mode: "local" as const,
  };
}
