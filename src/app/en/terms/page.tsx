import { LegalOperatorContact } from "@/components/legal-operator-contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteOperator } from "@/lib/site-operator";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-bold tracking-[-0.02em] text-[var(--ink)]">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </section>
  );
}

const listClassName = "list-disc space-y-2 pl-5";

export default function TermsPage() {
  const supportEmail = siteOperator.email.en;
  const supportPhone = siteOperator.phone;

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32">
      <SiteHeader locale="en" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 pb-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">Terms of Use</h1>
          <p className="max-w-3xl text-sm font-semibold leading-7 text-[var(--ink)]">LETKASNI / {siteOperator.name}</p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">Version 1.1 | Effective from 8 September 2026</p>
        </div>

        <Section title="At a glance">
          <p>0% commission. We do not reduce the amount recovered for you.</p>
          <p>You assign a specific Claim to LETKASNI, which enforces it in its own name as creditor and bears the ordinary cost risk of those proceedings.</p>
          <p>If you need to be the claimant, this is not activated automatically: we first reassign the Claim and ask for a new, separate document.</p>
          <p>We do not accept a voucher or a reduction of your principal monetary amount without your consent.</p>
          <p>You have a contractual 14-day right to withdraw without a fee.</p>
        </Section>

        <Section title="1. Who we are and when these Terms apply">
          <p>LETKASNI is a service provided by {siteOperator.name}, {siteOperator.address}, {siteOperator.country.en}, Tax ID (PIB) {siteOperator.pib}, Registration number {siteOperator.mb} (“LETKASNI”, “we”, “us”). Register: {siteOperator.registry.en}. Contact for users, complaints and withdrawal: <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>; for communication in Serbian: <a className="font-medium text-[var(--ink)]" href={`mailto:${siteOperator.email.sr}`}>{siteOperator.email.sr}</a>; phone: <a className="font-medium text-[var(--ink)]" href={`tel:${supportPhone}`}>{supportPhone}</a>.</p>
          <p>These Terms of Use (“Terms”) govern the relationship between LETKASNI and an individual using the service (“Passenger”) when the Passenger signs an Assignment Agreement or another expressly offered document. For each specific Claim ID, the version of the Terms accepted when the agreement was concluded applies; a later website update does not change an agreement already concluded.</p>
          <LegalOperatorContact supportEmail={supportEmail} supportPhone={supportPhone} locale="en" />
        </Section>

        <Section title="2. Terms we use">
          <p>“Claim” means the specific transferable monetary right described in the Assignment Agreement.</p>
          <p>“Passenger Recovery” means money that economically belongs to the Passenger: standardised compensation, a refund, reimbursement of the Passenger&apos;s costs/damage and default interest, to the extent included in the specific Agreement.</p>
          <p>“Proceeding Costs” means court fees, lawyers&apos; fees, enforcement and translation costs and other costs incurred to enforce the Claim.</p>
          <p>“Legal Proceedings” include proceedings before a court, competent authority or other body, as well as engaging a lawyer when necessary.</p>
        </Section>

        <Section title="3. How our relationship begins">
          <p>You may first use the free flight check or submit information for an assessment. That assessment is not a guarantee of success and does not by itself mean that LETKASNI has accepted the Claim.</p>
          <p>When we generate an Assignment Agreement for a specific case, that document contains the Claim ID and a description of the Claim we accept. The Agreement and assignment take effect when we receive your electronic signature, unless the document expressly states otherwise.</p>
          <p>Before signing, we allow you to review and correct your information, read the Agreement and this version of the Terms, and save the documents. After signature, we send confirmation and the documents on a durable medium without delay.</p>
        </Section>

        <Section title="4. What LETKASNI does">
          <p>Once the Claim has been assigned, LETKASNI enforces it in its own name and chooses a reasonable recovery method. This may include submitting a complaint to the carrier, communication and negotiations, applying to a regulator or another body, engaging a lawyer, bringing a claim, pursuing a legal remedy, enforcement and settlement.</p>
          <ul className={listClassName}>
            <li>We do not guarantee that a claim will succeed or be recovered.</li>
            <li>We may use reliable flight data and other sources to verify the facts.</li>
            <li>If an additional authorisation, proof of identity or a separate document is needed, we will request only what is reasonably necessary for the specific case.</li>
            <li>We will not accept a voucher or another non-cash settlement without your specific consent.</li>
            <li>Without your specific consent, we will not accept a cash settlement that gives you less than the principal amount shown in the Assignment Agreement.</li>
          </ul>
        </Section>

        <Section title="5. Lawyer, court and cost risk">
          <p>If legal action is required, LETKASNI may engage a lawyer or law firm. Under the assignment model, the lawyer represents LETKASNI as owner of the Claim, not the Passenger. LETKASNI is not a law firm.</p>
          <p>LETKASNI bears the ordinary Proceeding Costs of the steps it decides to take as creditor, including the risk that certain costs are not awarded or recovered. The Passenger does not pay LETKASNI those costs if the claim is unsuccessful.</p>
          <p>If a particular jurisdiction or procedural situation requires the Passenger to become the right holder or a party again, LETKASNI will not treat this as an automatic “fallback”. We will first document the reassignment of the Claim and give the Passenger a clear new document explaining who the party is, who the lawyer&apos;s client is and who bears any cost risk. The model does not change without that new document.</p>
        </Section>

        <Section title="6. Your obligations">
          <p>To enable us to work, you must provide accurate and complete information and, when available, relevant documents.</p>
          <ul className={listClassName}>
            <li>Do not assign the same Claim to another person or enter into a parallel settlement for the same part of the Claim.</li>
            <li>Forward relevant communication, an offer or a payment from the carrier within 5 business days after becoming aware of it.</li>
            <li>You do not have to stop all communication with the carrier about other matters (for example baggage, booking, safety or privacy) that are not covered by the assigned Claim.</li>
            <li>If information changes or you learn that part of the claim has already been paid, notify us without delay.</li>
            <li>Do not submit forged or intentionally misleading information or documents.</li>
          </ul>
        </Section>

        <Section title="7. Direct payment, settlement and prevention of double recovery">
          <p>If the carrier pays money directly to you after the Claim has been assigned, notify us and provide evidence. To the extent actually paid, that payment counts as a recovery for you; LETKASNI will not attempt to recover the same principal twice.</p>
          <p>If a payment cannot be reliably linked to the assigned Claim, the case remains under manual review until its basis and amount are clarified. Accepting a refund, voucher or settlement on another basis does not automatically waive every other right.</p>
        </Section>

        <Section title="8. Service price, ownership of recovered amounts and payment">
          <p>The fee payable by the Passenger to LETKASNI is RSD 0 and 0% of the Passenger Recovery. We do not deduct commission from your standardised compensation, refund, reimbursement of costs/damage or default interest recovered on those amounts.</p>
          <p>Proceeding Costs awarded or paid by a court or another party because of steps taken by LETKASNI/the engaged lawyer are not part of the Passenger Recovery and may belong to LETKASNI and/or the lawyer. They are not deducted from the Passenger Recovery.</p>
          <p>Once we receive and reliably identify the Passenger Recovery and have complete payment details, we will pay you the amount due no later than 10 business days afterwards. If the account details are incorrect or incomplete, we will contact you; your right to the money does not end merely because you did not immediately provide correct account details.</p>
          <p>We may deduct bank or conversion costs resulting from the Passenger&apos;s express request for an unusual payment method only if we clearly disclosed them in advance and the Passenger accepted them.</p>
        </Section>

        <Section title="9. Withdrawal during the first 14 days">
          <p>Regardless of how the specific relationship is classified under mandatory consumer law, LETKASNI contractually gives you 14 days from conclusion of the Agreement to withdraw without giving a reason and without paying LETKASNI a fee.</p>
          <p>You may send your withdrawal to <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a> or through the user interface. If we make an electronic form available, we will confirm receipt on a durable medium without delay.</p>
          <p>At your specific request, which is not preselected, we may begin out-of-court steps immediately. Starting work does not mean that you lose the contractual right under this section. If a court claim must be filed before the 14 days expire to preserve a time limit or for another serious reason, we will request separate express approval for that step.</p>
          <p>If, by the time we receive the withdrawal, the Claim has already been irrevocably recovered in full or a settlement has been concluded that can no longer be revoked, we will calculate and make payment instead of reassigning a Claim that has already been extinguished.</p>
        </Section>

        <Section title="10. Termination after 14 days and reassignment of the Claim">
          <p>After 14 days, you may request an end to the cooperation. If there are no active court proceedings, accepted settlement or another step whose immediate termination would create unreasonable cost or procedural harm, LETKASNI will document the reassignment of the remaining Claim within a reasonable period, with a target of 10 business days.</p>
          <p>If court proceedings are already under way, LETKASNI will determine the safest way to terminate or reassign together with the engaged lawyer and inform you of the status. We will not pass our ordinary costs on to you merely because you requested termination.</p>
          <p>LETKASNI may close a case if it determines that the claim has no reasonable prospect, if the debtor is insolvent or recovery is not reasonably possible, if key information remains missing despite reasonable reminders, or if there are serious signs of fraud. If an unrecovered case is closed, the remaining Claim is reassigned to the Passenger and we provide the available documents and information about known time limits.</p>
          <p>If LETKASNI has suffered proven direct loss due to intentional fraud or intentionally inaccurate information supplied by the Passenger, it may claim compensation for that actual loss within the limits of mandatory law. We do not apply an automatic penalty or forfeiture of the entire Passenger Recovery.</p>
        </Section>

        <Section title="11. Electronic conclusion and evidence package">
          <p>Agreements with LETKASNI may be concluded electronically. Before the signature/message is submitted, we allow information to be reviewed and corrected. We store the text of the Agreement and the Terms in a form that allows their reuse and reproduction, and we confirm receipt of electronic acceptance without delay.</p>
          <p>The evidence package may include the original final PDF, signature drawing, date and time, Claim/Agreement ID, authentication method, IP address, technical session/device data, document hash, versions of the Terms and consent records. We use this information to prove conclusion, maintain security and protect legal claims.</p>
          <p>The visual appearance of a signature does not by itself prove a particular statutory level of electronic signature. If we use an advanced or qualified product, we will describe that level only when it can be verified technically and legally.</p>
        </Section>

        <Section title="12. Complaints about LETKASNI and out-of-court resolution of consumer disputes">
          <p>If you have a complaint about our service, send it to <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. We will confirm receipt and respond within the time limits and in the manner required by applicable consumer law. A complaint about LETKASNI is not the same as a complaint to the airline concerning your flight.</p>
          <p>If we reject the complaint, we will inform you about the possibility of out-of-court resolution of the consumer dispute and the relevant bodies. LETKASNI participates in out-of-court consumer dispute resolution when legally required. Information and the list of bodies are available through the competent consumer-protection ministry.</p>
        </Section>

        <Section title="13. Privacy">
          <p>We process personal data in accordance with the Privacy Policy applicable to the specific case. The Privacy Policy is not blanket consent: the legal basis depends on the purpose of processing. Marketing and optional cookies are used only where there is appropriate consent or another permitted basis.</p>
        </Section>

        <Section title="14. Limitations and liability">
          <p>We do not guarantee that the carrier will accept the claim, that a court or regulator will decide in our favour, or that recovery will be possible within a particular time. Assessments of the flight, amount and legal basis rely on available information and may change when we receive new evidence.</p>
          <p>We do not exclude liability that cannot be excluded or limited under mandatory law. For problems caused by third-party systems, force majeure or events outside our reasonable control, we are liable only to the extent required by applicable law.</p>
        </Section>

        <Section title="15. Governing law, courts and changes to these Terms">
          <p>The contractual relationship between the Passenger and LETKASNI is governed by the law of the Republic of Serbia, without excluding mandatory protection that would apply to the consumer independently of this clause. This clause does not by itself determine the law governing the Claim against the airline or automatically establish a court&apos;s jurisdiction over that external dispute.</p>
          <p>Jurisdiction over consumer disputes with LETKASNI is determined by mandatory rules. We do not restrict consumers&apos; statutory rights through a choice-of-court clause.</p>
          <p>We may change the Terms for future agreements. A Claim ID already concluded is governed by the version accepted at conclusion, unless the law requires otherwise or you expressly accept a later change relating to the existing relationship.</p>
        </Section>
      </div>
      <SiteFooter locale="en" supportEmail={supportEmail} />
    </main>
  );
}
