import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-bold tracking-[-0.02em] text-[var(--ink)]">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </section>
  );
}

const listClassName = "list-disc space-y-2 pl-5";
const emailClassName = "font-medium text-[var(--ink)]";

export default function TermsPage() {
  const supportEmail = "office@letkasni.rs";

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32">
      <SiteHeader locale="en" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 pb-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">Terms and Conditions</h1>
          <p className="max-w-3xl text-sm font-semibold leading-7 text-[var(--ink)]">letkasni.rs</p>
          <p className="max-w-3xl text-sm font-semibold leading-7 text-[var(--ink)]">VGA EU CONSULTING DOO</p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">Version 1.4 | Effective from 9 September 2026</p>
        </div>

        <Section title="1. CONTRACTUAL RELATIONSHIP AND DEFINITIONS">
          <p>These Terms and Conditions (the “Terms”) govern the relationship between VGA EU CONSULTING DOO, Bulevar Nemanjića 1, 18000 Niš, Republic of Serbia, Tax ID 113473442, Registration No. 21873446 (“VGA”, the “Assignee”, “we”, “us”) and the natural person whose claim is pursued through letkasni.rs (the “Passenger”).</p>
          <p>Contact:<br /><a className={emailClassName} href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
          <p>“Claim” means the monetary claims identified in the Agreement relating to the relevant case.</p>
          <p>“Agreement” means, depending on the model selected by VGA for the particular case:</p>
          <p>(a) an Assignment Agreement under which the Passenger assigns the Claim to VGA; or</p>
          <p>(b) the relevant mandate/power of attorney arrangement where the Passenger remains or again becomes the creditor and the Claim is pursued in the Passenger’s name through an appropriately authorised person.</p>
          <p>VGA selects the appropriate model based on the circumstances of the particular case, including the applicable law, jurisdiction, identity of the Debtor and the manner in which the Claim may be pursued.</p>
          <p>The relevant Agreement is deemed concluded when it is signed by the Passenger.</p>
          <p>By signing the Agreement, the Passenger confirms having been informed of these Terms and the Privacy Policy applicable at the time the Agreement is concluded.</p>
          <p>“Debtor” means the air carrier, party commissioning the carriage, tour operator or any other natural or legal person that may have a monetary obligation relating to the Claim.</p>
          <p>“Case” means the particular Claim or group of Claims handled by VGA for the Passenger under one Claim ID.</p>
        </Section>

        <Section title="2. ASSIGNMENT AND MANDATE/POWER OF ATTORNEY MODEL">
          <p>Where an Assignment Agreement is used, the Passenger assigns the Claim to VGA to the extent specified in the Agreement, and VGA becomes the creditor and pursues the Claim in its own name.</p>
          <p>If VGA determines that assignment is not permitted, is invalid, is procedurally unsuitable or is not the optimal method of pursuing the Claim in the particular case, VGA may decide that the Case will be pursued under a mandate/power of attorney model.</p>
          <p>Under the mandate/power of attorney model, the Passenger remains or again becomes the creditor of the Claim, while VGA organises its pursuit and any representation is carried out by a lawyer or other person authorised under applicable law and the relevant power of attorney.</p>
          <p>If the Claim was previously assigned to VGA and the Passenger needs to become the creditor again in order to switch to the mandate/power of attorney model, the Claim automatically reverts to the Passenger to the necessary extent when that model is activated, without the need to enter into a separate reassignment agreement.</p>
          <p>Automatic reassignment does not in itself affect the validity of procedural acts already taken. VGA and the engaged lawyer may take any steps necessary to align the further proceedings with the change of creditor.</p>
          <p>Under the power of attorney model, VGA’s and the engaged lawyer’s powers are exercised within the scope of the relevant power of attorney and applicable law.</p>
          <p>Where the assignment model applies, the signed Assignment Agreement may also serve as notice of assignment to the Debtor when delivered to the Debtor.</p>
        </Section>

        <Section title="3. PURSUIT OF THE CLAIM">
          <p>VGA may begin verifying, pursuing and recovering the Claim immediately after conclusion of the Agreement.</p>
          <p>VGA independently assesses the legal and factual basis of the Claim and decides how it should be pursued.</p>
          <p>VGA may in particular:</p>
          <ul className={listClassName}>
            <li>contact the Debtor;</li><li>submit claims, complaints, objections and other filings;</li><li>obtain necessary information and documentation;</li><li>negotiate with the Debtor;</li><li>contact a regulator or other competent authority;</li><li>engage a lawyer;</li><li>commence judicial, enforcement or other appropriate proceedings;</li><li>pursue legal remedies; and</li><li>take other necessary steps to pursue the Claim.</li>
          </ul>
          <p>VGA does not guarantee that the Claim will be accepted or recovered or that the proceedings will be completed within any particular period.</p>
        </Section>

        <Section title="4. SETTLEMENTS AND NON-MONETARY OFFERS">
          <p>Where VGA is the creditor of the Claim, VGA has the exclusive right to decide whether to accept or reject an offer of monetary settlement.</p>
          <p>Under the mandate/power of attorney model, authority to accept or reject a settlement is exercised within the scope of the relevant power of attorney and applicable law.</p>
          <p>When deciding on a settlement, VGA may take into account the legal basis of the Claim, quality of the evidence, litigation risk, expected duration, costs, enforceability and previous experience with the particular Debtor.</p>
          <p>VGA does not accept vouchers, future travel credits, miles, points or other non-monetary forms of satisfaction instead of monetary payment of the Claim.</p>
        </Section>

        <Section title="5. COSTS AND ECONOMIC RISK">
          <p>VGA bears the economic risk of pursuing the Claim and finances the costs of the proceedings and actions it decides to undertake.</p>
          <p>This may in particular include communication and collection costs, court fees, lawyer fees, enforcement costs, translation costs and other necessary expenses.</p>
          <p>The Passenger is not liable for costs incurred after the Claim has been assigned to VGA and is not required to reimburse VGA for such costs if the Claim is not successfully recovered.</p>
          <p>The Passenger may only be liable for actual and documented costs or damage directly caused by the Passenger’s breach of the Agreement or these Terms.</p>
          <p>This includes in particular deliberately incorrect information, concealment of a previous assignment or payment, forged documentation, deliberate double recovery or other intentional conduct causing VGA expense or loss.</p>
          <p>If the mandate/power of attorney model is used, any different cost exposure that may apply to the Passenger under the applicable law must be disclosed to the Passenger before that model is activated.</p>
        </Section>

        <Section title="6. FEE AND PROMOTIONAL PERIOD">
          <p>VGA’s fee is determined according to the rules applicable when the relevant Agreement is concluded.</p>
          <p>During a promotional period in which a 0% fee is stated on letkasni.rs and in the applicable Terms, VGA’s fee is:</p>
          <p>0%.</p>
          <p>If the Passenger enters into an Agreement for a particular Case during that promotional period, the fee for that Case remains 0% until the Case is completed, regardless of whether the promotional period subsequently ends or the fee for new cases is changed.</p>
          <p>For the purposes of this Article, a Case is completed upon:</p>
          <p>(a) final recovery and settlement of accounts relating to the Claim; or</p>
          <p>(b) termination of the Agreement or completion of VGA’s involvement in that Case.</p>
          <p>VGA may change or terminate the promotional period at any time for future agreements.</p>
          <p>Any such change applies only to agreements concluded after the new fee or new rules take effect.</p>
          <p>A change to the promotional period or fee may not retroactively change the fee for a Case for which an Agreement was already concluded with a 0% fee.</p>
        </Section>

        <Section title="7. INTEREST AND OTHER VGA INCOME">
          <p>Interest recovered as an ancillary right attached to the principal Claim belongs to VGA.</p>
          <p>Such interest constitutes VGA’s fee or income and is not included in the principal Claim amount payable to the Passenger.</p>
          <p>Procedural or legal costs separately awarded or paid by the Debtor, a court or another person as a result of actions taken by VGA or the engaged lawyer belong to VGA and/or the engaged lawyer according to their mutual arrangement.</p>
          <p>Where funds received by VGA in relation to the Claim are temporarily held in VGA’s account pending payment to the Passenger, any interest or other income credited by the bank or payment service provider in respect of those funds belongs to VGA.</p>
          <p>Amounts referred to in this Article constitute VGA’s fee or income independently of any fee under Article 6.</p>
        </Section>

        <Section title="8. RECEIPT OF FUNDS AND PAYMENT TO THE PASSENGER">
          <p>Payments relating to the Claim may be made:</p>
          <p>(a) to an account held by VGA; or</p>
          <p>(b) to an account of the lawyer or law firm handling the relevant Case where VGA considers that method more appropriate.</p>
          <p>VGA selects the appropriate payment route based on the circumstances of the Case and the rules applicable to the engaged lawyer.</p>
          <p>Following receipt and identification of the funds, VGA and the Passenger settle accounts in accordance with the Agreement and these Terms.</p>
          <p>Where the Case is subject to a 0% fee, the Passenger is entitled to 100% of the recovered principal Claim that by its nature belongs to the Passenger.</p>
          <p>Interest and other amounts belonging to VGA under Article 7 are not included in the amount paid to the Passenger.</p>
          <p>VGA will make payment after it has the information required to make the payment correctly.</p>
        </Section>

        <Section title="9. PAYMENT INFORMATION, BANK CHARGES AND PASSENGER INACTIVITY">
          <p>The Passenger is responsible for providing complete and accurate information required for payment.</p>
          <p>If a payment is returned to VGA due to incorrect or incomplete information, or VGA incurs additional banking or other direct costs for that reason, VGA may deduct those actual additional costs from the part of the recovery otherwise payable to the Passenger.</p>
          <p>Where the Passenger fails to provide the information required for payment, VGA will make reasonable efforts to contact the Passenger using the contact details provided by the Passenger.</p>
          <p>If, despite reminders and reasonable efforts by VGA to contact the Passenger, the Passenger does not provide or correct the information required for payment, VGA is entitled to retain the part of the recovered Claim that would otherwise have been payable to the Passenger.</p>
          <p>In that situation, after VGA has made reasonable efforts to contact the Passenger and the Passenger still fails to provide the information required for payment, VGA is entitled to keep that amount for its own benefit.</p>
          <p>The Passenger is responsible for keeping the contact details provided to VGA up to date.</p>
        </Section>

        <Section title="10. DIRECT COMMUNICATION AND DIRECT PAYMENT TO THE PASSENGER">
          <p>After conclusion of the Agreement, the Passenger shall not independently dispose of the Claim or engage another person to pursue the same Claim without VGA’s consent.</p>
          <p>If the Debtor contacts the Passenger directly, makes an offer or makes a payment directly to the Passenger, the Passenger must notify VGA immediately.</p>
          <p>A direct payment to the Passenger is treated as recovery of the Claim in the corresponding amount.</p>
          <p>Where a VGA fee applies under the Agreement, the Passenger must pay that fee to VGA within 10 days after receiving the direct payment.</p>
          <p>If the direct payment includes interest or another amount belonging to VGA under Article 7, the Passenger must transfer that amount to VGA within 10 days after receipt.</p>
          <p>The Passenger is not entitled to double recovery of the same Claim.</p>
        </Section>

        <Section title="11. PASSENGER COOPERATION">
          <p>The Passenger confirms that the information and documentation provided to VGA are accurate, complete and truthful to the best of the Passenger’s knowledge.</p>
          <p>The Passenger shall promptly provide any additional information and documentation reasonably requested by VGA for pursuing the Claim.</p>
          <p>The Passenger confirms that the Claim has not previously been assigned to another person unless VGA was expressly informed before conclusion of the Agreement.</p>
          <p>The Passenger must immediately notify VGA of any direct payment, reimbursement, settlement, voucher or other form of satisfaction relating to the Claim.</p>
          <p>If VGA incurs actual loss or expense due to deliberately incorrect information, forged documents, a concealed prior assignment or another intentional breach of the Passenger’s obligations, VGA may seek reimbursement of that loss or expense.</p>
        </Section>

        <Section title="12. MINOR PASSENGER">
          <p>Where the Passenger is a minor, the Claim belongs to the minor Passenger and the Agreement is signed on the minor Passenger’s behalf by the minor’s Legal Representative.</p>
          <p>By signing, the Legal Representative confirms being authorised to enter into the Agreement on behalf of the minor Passenger.</p>
          <p>Where required under applicable law or requested by the Debtor, a court or another competent authority, VGA may request evidence of the Legal Representative’s status or any other necessary consent.</p>
        </Section>

        <Section title="13. RIGHT OF WITHDRAWAL">
          <p>A Passenger who qualifies as a consumer may withdraw from the Agreement within 14 days from the date on which the Agreement is concluded, without giving any reason.</p>
          <p>Notice of withdrawal may be sent to:</p>
          <p><a className={emailClassName} href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
          <p>or through another channel made available by VGA for that purpose.</p>
          <p>VGA may, in accordance with the Agreement, begin taking steps to verify, pursue and recover the Claim immediately after the Agreement is concluded.</p>
          <p>The mere commencement of such activities does not automatically result in the Passenger losing the right of withdrawal.</p>
          <p>Where mandatory law applicable to the particular contractual relationship imposes additional requirements for commencement of performance during the withdrawal period or for loss of the right of withdrawal, those requirements shall apply.</p>
          <p>If the Passenger validly withdraws from the Agreement and the Claim still exists at that time, the Claim or its unrecovered part automatically reverts to the Passenger without the need for a separate reassignment agreement.</p>
          <p>A Claim that has already been finally recovered, finally adjudicated or otherwise extinguished cannot be recreated by reassignment.</p>
        </Section>

        <Section title="14. TERMINATION AND AUTOMATIC REASSIGNMENT">
          <p>VGA may discontinue pursuing all or part of the Claim where, among other things:</p>
          <ul className={listClassName}>
            <li>following further assessment, VGA considers that the Claim has no reasonable prospect of success;</li><li>necessary information or documentation is missing;</li><li>a prior assignment or prior payment is identified;</li><li>the Debtor is insolvent or recovery is not reasonably possible;</li><li>there are serious indications of fraud or forged documentation; or</li><li>there are other legal, procedural or economic circumstances making further pursuit unjustified.</li>
          </ul>
          <p>When VGA notifies the Passenger that it is discontinuing pursuit of all or part of an unrecovered Claim, ownership of the Claim or the unrecovered part automatically reverts to the Passenger.</p>
          <p>No separate agreement or other reassignment document is required for such reassignment.</p>
          <p>The same rule applies where the Passenger needs to become the creditor again in order to switch to the mandate/power of attorney model.</p>
          <p>Automatic reassignment cannot recreate a Claim that has already been recovered, finally adjudicated, extinguished by settlement or otherwise ceased to exist.</p>
        </Section>

        <Section title="15. PERSONAL DATA">
          <p>VGA processes personal data in accordance with applicable law and the Privacy Policy available at letkasni.rs.</p>
          <p>The Privacy Policy sets out, in particular, the purposes and legal bases of processing, categories of personal data, recipients, retention periods, international transfers and data subject rights.</p>
        </Section>

        <Section title="16. CHANGES TO THESE TERMS">
          <p>As a general rule, the version of these Terms in force when the Agreement was concluded continues to apply to the Agreement and the Case throughout their duration.</p>
          <p>Merely publishing a new version of the Terms on letkasni.rs does not change the Terms applicable to an existing Case.</p>
          <p>Exceptionally, where VGA determines for justified reasons that a particular amendment should also apply to existing Cases, VGA will notify the Passenger in advance by e-mail and/or through the Passenger’s user account, where available.</p>
          <p>Such amendment may begin to apply to an existing Case no earlier than 7 calendar days after the Passenger has been notified.</p>
          <p>If the Passenger does not agree with such amendment, the Passenger may notify VGA before the date on which the amendment takes effect that the Passenger wishes to terminate the Agreement, in which case the rules on automatic reassignment in Article 14 apply to the unrecovered part of the Claim.</p>
          <p>If VGA has not notified the Passenger that the new version will apply to the Passenger’s existing Case, the version of the Terms in force when the Agreement was concluded continues to apply.</p>
          <p>An amendment to these Terms may not retroactively increase the fee for a Case for which the Agreement was concluded with a 0% fee during the promotional period.</p>
        </Section>

        <Section title="17. COMPLAINTS ABOUT THE letkasni.rs SERVICE">
          <p>If the Passenger has a complaint regarding VGA’s conduct or the letkasni.rs service, the Passenger may send it to:</p>
          <p><a className={emailClassName} href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
          <p>VGA will handle the complaint within the time limits and in the manner required by applicable consumer law.</p>
          <p>A complaint to VGA is separate from a complaint against an air carrier or another Debtor relating to the Claim.</p>
          <p>Where applicable, the Passenger may also use out-of-court consumer dispute resolution before the competent body in accordance with applicable law.</p>
        </Section>

        <Section title="18. LIABILITY AND FORCE MAJEURE">
          <p>VGA does not guarantee successful recovery of the Claim.</p>
          <p>VGA is not liable for delay or inability to perform an obligation resulting from circumstances beyond VGA’s reasonable control, including actions of a court, public authority, Debtor, bank or another relevant third party, except to the extent otherwise required by mandatory law.</p>
          <p>Nothing in these Terms excludes or limits liability that may not be excluded or limited under mandatory law.</p>
        </Section>

        <Section title="19. GOVERNING LAW AND JURISDICTION">
          <p>The Agreement and the relationship between the Passenger and VGA are governed by the laws of the Republic of Serbia.</p>
          <p>This choice of law does not exclude the application of mandatory rules that apply to the relevant relationship independently of the contractual choice of law.</p>
          <p>Any dispute between the Passenger and VGA shall be determined by the court having jurisdiction under applicable law.</p>
          <p>This provision does not by itself determine the law applicable to, or jurisdiction over, a Claim pursued by VGA against the Debtor.</p>
        </Section>

        <Section title="20. LANGUAGE VERSION">
          <p>The Serbian-language version of these Terms is the original and authoritative text.</p>
          <p>The English-language version is a translation of the Serbian version prepared for convenience and practical use.</p>
          <p>In the event of any discrepancy, ambiguity or difference in interpretation between the Serbian and English versions, the Serbian-language version shall prevail, unless mandatory law requires otherwise.</p>
        </Section>
      </div>
      <SiteFooter locale="en" supportEmail={supportEmail} />
    </main>
  );
}
