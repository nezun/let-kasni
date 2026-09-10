import { MarketingManagePanel } from "@/components/marketing-action-panel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default async function EmailOffersPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return <main className="min-h-screen bg-[var(--bg)] pt-32"><SiteHeader locale="en" /><div className="mx-auto max-w-xl px-6 pb-20"><section className="space-y-5 rounded-3xl border border-[var(--line)] bg-white p-7 shadow-sm"><h1 className="text-3xl font-bold text-[var(--ink)]">Manage email offers</h1><MarketingManagePanel locale="en" token={token} /></section></div><SiteFooter locale="en" /></main>;
}
