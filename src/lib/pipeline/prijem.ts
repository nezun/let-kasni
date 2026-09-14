import { driveFolder, driveUpisiFajl, jeDrivePodesen } from "@/lib/drive";
import { getEnv } from "@/lib/env";
import type { ClaimRecord } from "@/lib/types";

export type RezultatPredaje = { poslato: true; fileId: string } | { poslato: false; razlog: string };

/**
 * Predaja novog claim-a LetKasni pipeline-u: JSON u Drive „<PIPELINE_DRIVE_FOLDER_ID>/prijem/“.
 * Orkestrator (pipeline: scripts/sistem/koraci/prijem-sajt.mjs) od njega pravi predmet.
 *
 * Nikad ne baca grešku: forma mora da uspe i kad Drive ne radi — tada ostaje dosadašnji put,
 * mejl „Novi claim“. Bez PIPELINE_DRIVE_FOLDER_ID ne radi ništa (produkcija dok se ne uključi).
 */
export async function predajClaimPipelineu(claim: ClaimRecord, locale: "sr" | "en"): Promise<RezultatPredaje> {
  const folderId = getEnv("PIPELINE_DRIVE_FOLDER_ID");

  if (!folderId) {
    return { poslato: false, razlog: "PIPELINE_DRIVE_FOLDER_ID nije podešen." };
  }

  if (!jeDrivePodesen()) {
    return { poslato: false, razlog: "Google Drive pristup nije podešen." };
  }

  try {
    const prijemId = await driveFolder("prijem", folderId);
    const sadrzaj = {
      sema: 1,
      izvor: "letkasni.rs",
      okruzenje: process.env.VERCEL_ENV ?? "local",
      poslato: new Date().toISOString(),
      claim: {
        id: claim.id,
        createdAt: claim.createdAt,
        flightNumber: claim.flightNumber,
        flightDate: claim.flightDate,
        route: claim.route,
        email: claim.email,
        phone: claim.phone ?? null,
        firstName: claim.firstName ?? null,
        lastName: claim.lastName ?? null,
        issueType: claim.issueType,
        locale,
        providerStatus: claim.providerSnapshot?.status ?? null,
        verdict: claim.verdict,
      },
    };
    const fileId = await driveUpisiFajl(
      prijemId,
      `claim-${claim.id.slice(0, 8).toLowerCase()}.json`,
      JSON.stringify(sadrzaj, null, 2),
      "application/json",
    );
    return { poslato: true, fileId };
  } catch (error) {
    return { poslato: false, razlog: error instanceof Error ? error.message : String(error) };
  }
}
