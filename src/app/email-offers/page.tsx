import { MarketingManagePanel } from "@/components/marketing-action-panel";
import { copy } from "@/components/lk-v2/copy";
import { LkEmailPanelContent } from "@/components/lk-v2/lk-email-panel-page";
import { LkFrame } from "@/components/lk-v2/lk-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upravljanje e-mail ponudama | Letkasni.rs",
  robots: { index: false, follow: true },
};

export default async function EmailOffersPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <LkFrame locale="sr" kind="lk-content-page">
      <SiteHeader locale="sr" alternateHref="/en/email-offers" />
      <main id="main">
        <LkEmailPanelContent locale="sr" title={copy.sr.emailOffersPage.manageTitle}>
          <MarketingManagePanel locale="sr" token={token} />
        </LkEmailPanelContent>
      </main>
      <SiteFooter locale="sr" />
    </LkFrame>
  );
}
