import { createHash, timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

import { jeCrmPodesen } from "@/lib/crm/baza";
import { oznaciDogadjajPotpisa } from "@/lib/crm/portal";
import { driveFolder, driveUpisiFajl, jeDrivePodesen } from "@/lib/drive";
import { getEnv } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jednako(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

/**
 * Webhook signNow-a (callback URL: /api/potpis/signnow?kljuc=<SIGNNOW_WEBHOOK_KLJUC>).
 * Upisuje samo ID dokumenta i vrstu događaja u Drive „<PIPELINE_DRIVE_FOLDER_ID>/dogadjaji/“ —
 * bez imena i mejlova potpisnika. Pipeline (scripts/sistem/koraci/potpis.mjs) stanje uvek čita
 * direktno od signNow-a, pa lažan poziv ne može da označi dokument kao potpisan.
 */
export async function POST(request: Request) {
  const kljuc = getEnv("SIGNNOW_WEBHOOK_KLJUC");
  const dobijeno = new URL(request.url).searchParams.get("kljuc") ?? "";

  if (!kljuc || kljuc.length < 24 || !jednako(dobijeno, kljuc)) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const folderId = getEnv("PIPELINE_DRIVE_FOLDER_ID");

  if ((!folderId || !jeDrivePodesen()) && !jeCrmPodesen()) {
    return NextResponse.json({ ok: false, error: "nije_podeseno" }, { status: 503 });
  }

  const telo = (await request.json().catch(() => null)) as {
    meta?: { event?: unknown };
    content?: { document_id?: unknown };
  } | null;
  const dokumentId = typeof telo?.content?.document_id === "string" ? telo.content.document_id : null;

  if (!dokumentId || !/^[A-Za-z0-9]{8,64}$/.test(dokumentId)) {
    return NextResponse.json({ ok: true, ignorisano: true }, { status: 202 });
  }

  const dogadjaj = {
    primljeno: new Date().toISOString(),
    provajder: "signnow",
    dogadjaj: typeof telo?.meta?.event === "string" ? telo.meta.event.slice(0, 64) : null,
    dokument_id: dokumentId,
  };

  if (jeCrmPodesen()) {
    // predmet dobija novu verziju → raspored (na 5 min) odmah pokreće prolaz koji čita stanje od signNow-a
    const oznaceno = await oznaciDogadjajPotpisa(dokumentId, dogadjaj.dogadjaj).catch(() => false);
    if (!folderId || !jeDrivePodesen()) {
      return NextResponse.json({ ok: true, crm: oznaceno });
    }
  }

  try {
    const dogadjajiId = await driveFolder("dogadjaji", folderId!);
    await driveUpisiFajl(dogadjajiId, `signnow-${Date.now()}-${dokumentId.slice(0, 12)}.json`, JSON.stringify(dogadjaj), "application/json");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("signNow webhook: upis na Drive nije uspeo.", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
