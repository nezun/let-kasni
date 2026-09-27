import { MarketingManagePanel } from "@/components/marketing-action-panel";
import { copy } from "@/components/lk-v2/copy";
import { LkEmailPanelContent } from "@/components/lk-v2/lk-email-panel-page";
import { LkFrame } from "@/components/lk-v2/lk-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage email offers | Letkasni.rs",
  robots: { index: false, follow: true },
};

export default async function EmailOffersPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <LkFrame locale="en" kind="lk-content-page">
      <SiteHeader locale="en" alternateHref="/email-offers" />
      <main id="main">
        <LkEmailPanelContent locale="en" title={copy.en.emailOffersPage.manageTitle}>
          <MarketingManagePanel locale="en" token={token} />
        </LkEmailPanelContent>
      </main>
      <SiteFooter locale="en" />
    </LkFrame>
  );
}
