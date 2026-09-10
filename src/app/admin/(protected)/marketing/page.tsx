import { getAdminSession } from "@/lib/auth";
import { isValidEmail } from "@/lib/email-validation";
import { withdrawMarketingByEmail } from "@/lib/marketing-consent-store";

export default function MarketingAdminPage() {
  async function recordMailboxUnsubscribe(formData: FormData) {
    "use server";
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");
    const email = String(formData.get("email") ?? "");
    const locale = formData.get("locale") === "en" ? "en" : "sr";
    if (!isValidEmail(email)) throw new Error("Invalid email");
    await withdrawMarketingByEmail({ email, locale });
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">E-mail ponude</h1>
      <p className="text-sm text-slate-600">Kontrolisana interna radnja za odjavu primljenu na postojeći mailbox. Ne prikazuje niti izvozi listu pretplatnika.</p>
      <form action={recordMailboxUnsubscribe} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
        <label className="block space-y-2"><span className="font-semibold">E-mail za odjavu</span><input required name="email" type="email" className="w-full rounded-xl border border-slate-300 px-3 py-3" /></label>
        <label className="block space-y-2"><span className="font-semibold">Jezik evidencije</span><select name="locale" className="w-full rounded-xl border border-slate-300 px-3 py-3"><option value="sr">SR</option><option value="en">EN</option></select></label>
        <button className="rounded-xl bg-slate-900 px-4 py-3 font-bold text-white" type="submit">Evidentiraj odjavu</button>
      </form>
    </main>
  );
}
