import { NextResponse } from "next/server";

import { jeCrmPodesen } from "@/lib/crm/baza";
import { ugovorZaPutnika } from "@/lib/crm/portal";
import { citajDriveBin } from "@/lib/drive";
import { proveriTokenDokumenata } from "@/lib/pipeline/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** PDF ugovora za putnika (lični link): pre potpisa za čitanje, posle potpisa potpisan primerak. */
export async function GET(request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const pristup = proveriTokenDokumenata(token);
  if (!pristup || !jeCrmPodesen()) return NextResponse.json({ ok: false, error: "link_nevazeci" }, { status: 404 });

  const putnik = new URL(request.url).searchParams.get("putnik") ?? "";
  const ugovor = putnik ? await ugovorZaPutnika(pristup.ref, putnik) : null;
  if (!ugovor) return NextResponse.json({ ok: false, error: "nema_ugovora" }, { status: 404 });

  const pdf = await citajDriveBin(ugovor.id);
  const ime = `Ugovor o ustupanju - ${putnik}${ugovor.potpisan ? " (potpisan)" : ""}.pdf`;
  const ascii = ime.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "dj").replace(/Đ/g, "Dj").replace(/[^\x20-\x7E]/g, "");
  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `inline; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(ime)}`,
      "cache-control": "private, no-store",
    },
  });
}
