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

export default function PrivacyPage() {
  const supportEmail = siteOperator.email.en;
  const supportPhone = siteOperator.phone;

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32">
      <SiteHeader locale="en" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 pb-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">Privacy Policy</h1>
          <p className="max-w-3xl text-sm font-semibold leading-7 text-[var(--ink)]">LETKASNI / {siteOperator.name}</p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">Version 1.1 | Effective from 8 September 2026</p>
        </div>

        <Section title="At a glance">
          <p>The controller is {siteOperator.name}. We do not sell your data.</p>
          <p>We use data to assess, acquire, recover and pay out your specific Claim, keep records and protect rights in proceedings.</p>
          <p>We may share relevant data with the airline, lawyer, court or regulator, bank, and necessary IT and signature services.</p>
          <p>Marketing and optional analytics and advertising are not a condition for processing your claim.</p>
          <p>For all questions, support, complaints and exercise of privacy rights, write to <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. For communication in Serbian, use <a className="font-medium text-[var(--ink)]" href={`mailto:${siteOperator.email.sr}`}>{siteOperator.email.sr}</a>.</p>
        </Section>

        <Section title="1. Who is the controller">
          <p>The personal data controller is {siteOperator.name}, {siteOperator.address}, {siteOperator.country.en}, Tax ID (PIB) {siteOperator.pib}, Registration number {siteOperator.mb}, which provides the LETKASNI service at letkasni.rs. Register: {siteOperator.registry.en}. Contact for privacy and general questions: <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>; for communication in Serbian: <a className="font-medium text-[var(--ink)]" href={`mailto:${siteOperator.email.sr}`}>{siteOperator.email.sr}</a>. Phone: <a className="font-medium text-[var(--ink)]" href={`tel:${supportPhone}`}>{supportPhone}</a>.</p>
          <p>We primarily act in accordance with the Personal Data Protection Act of the Republic of Serbia. Where other mandatory rules, including the GDPR, also apply to specific processing, we comply with those rules within their scope.</p>
          <LegalOperatorContact supportEmail={supportEmail} supportPhone={supportPhone} locale="en" />
        </Section>

        <Section title="2. What data we process">
          <p>We do not collect every type of data in every case. We collect what is necessary for the specific purpose.</p>
          <ul className={listClassName}>
            <li>Identity and contact: first and last name, date of birth when needed to distinguish between passengers, address, email and phone.</li>
            <li>Travel and claim: PNR, flight number/date, route, carrier, disruption details, booking/boarding documentation and communication with the carrier.</li>
            <li>Evidence and expenses: receipts, confirmations, photographs and other documents you provide.</li>
            <li>Payment: account holder&apos;s name, IBAN/account number, currency and transaction record.</li>
            <li>Electronic conclusion: signature drawing, event time and identifiers, authentication data, IP address, basic session/device technical data, and document hashes and versions.</li>
            <li>Communication with us and complaints.</li>
            <li>Technical/cookie data to the extent described in Privacy Settings.</li>
            <li>Special categories of data (for example health or disability data) only when truly necessary for the specific claim and where an appropriate legal basis exists.</li>
          </ul>
        </Section>

        <Section title="3. Where we obtain data">
          <p>We obtain most data directly from you. Where necessary for the claim, we may also obtain data from a parent/guardian or another duly authorised person, airline, travel agency/organiser, airport, lawyer, court, regulator, reliable flight-data provider or publicly available source.</p>
        </Section>

        <Section title="4. Why we process data and on what basis">
          <p>The legal basis depends on the purpose. We do not ask for “consent to everything”.</p>
          <ul className={listClassName}>
            <li>Conclusion and performance of a contract: assessing the case, generating and proving the Assignment Agreement, communication, recovery and payment.</li>
            <li>Legal obligation: accounting, tax, compliance with binding orders of a court or authority and other obligations applying to us.</li>
            <li>Legitimate interests: platform security, prevention of fraud and double recovery, process improvement without overriding users&apos; rights, and the establishment, exercise and defence of legal claims.</li>
            <li>Consent: direct marketing and optional analytics/advertising cookies when consent is required; you may withdraw consent at any time.</li>
            <li>Special-category data: only when processing is permitted by a specific rule, for example when necessary for the establishment, exercise or defence of a legal claim, or with explicit consent when that is the appropriate basis.</li>
          </ul>
        </Section>

        <Section title="5. Who we share data with">
          <p>We do not sell or rent data. We share only what is necessary.</p>
          <ul className={listClassName}>
            <li>Airlines, travel organisers and other persons against whom the identified Claim is enforced.</li>
            <li>Lawyers and law firms engaged for the case; their privacy status may be processor or independent controller, depending on their role and applicable law.</li>
            <li>Courts, the Civil Aviation Directorate, other regulators, enforcement officers and competent authorities where necessary or required.</li>
            <li>Banks and payment services for payment.</li>
            <li>Hosting/cloud, email, e-signature/authentication, flight-data, security and other IT providers that act on our instructions when they are processors.</li>
            <li>Accountants, auditors and other professional advisers where reasonably necessary.</li>
            <li>Analytics/advertising partners only in accordance with Privacy Settings and your choice where consent is required.</li>
          </ul>
        </Section>

        <Section title="6. Transfers of data to other countries">
          <p>A Claim may require communication with a foreign airline, lawyer or service, so data may be transferred outside Serbia. We carry out such a transfer only where there is a permitted legal mechanism and appropriate safeguards under the Serbian Personal Data Protection Act and, where the GDPR applies, under its rules. We limit the transfer to data necessary for the specific purpose.</p>
        </Section>

        <Section title="7. How long we keep data">
          <p>Retention periods are linked to the purpose, legal obligations and the need to prove the contract and legal proceedings. If a case is active or there is a dispute, we keep data longer only for as long as necessary for that dispute.</p>
          <ul className={listClassName}>
            <li>Claim, agreement, evidence package and key communication: during the case and for up to 5 years after closure, unless the law or a specific dispute requires a longer/shorter period.</li>
            <li>Financial/accounting documentation: up to 10 years where such a period is required under accounting/tax rules.</li>
            <li>Incomplete intake without a concluded agreement: no more than 12 months from the last activity, unless you request earlier deletion and there is no other legal basis.</li>
            <li>Marketing: until consent is withdrawn, and no more than 2 years after the last relevant interaction if you do not renew the relationship before then.</li>
            <li>Security and technical logs: typically up to 12 months, unless required for an incident investigation or legal claim.</li>
            <li>Cookies: for the period stated in Privacy Settings.</li>
          </ul>
        </Section>

        <Section title="8. Security">
          <p>We use appropriate technical and organisational measures, including need-to-know access controls, encryption in transit, account protection, logging of relevant security events, backups and contractual confidentiality obligations for service providers. No system is completely secure, but we adapt the measures to the risk and type of data.</p>
        </Section>

        <Section title="9. Your rights">
          <p>Under applicable law, you may request access to data, correction, erasure, restriction of processing and portability where the conditions are met, and object to processing based on legitimate interests. Where processing is based on consent, you may withdraw it at any time without affecting earlier lawful processing.</p>
          <p>Send your request to <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. We may request reasonable identity verification to avoid disclosing data to the wrong person. We respond within the time limits prescribed by applicable law.</p>
        </Section>

        <Section title="10. Automation and claim assessment">
          <p>We use automated tools to calculate times, distances, amounts and deadlines and to make a preliminary assessment of possible legal branches. In the version of the service covered by this Policy, we do not make a solely automated decision that by itself produces legal effects or similarly significantly affects you without the possibility of appropriate human review. You may ask a person to review a disputed or negative result.</p>
        </Section>

        <Section title="11. Children and representation of another person">
          <p>A minor does not independently conclude an Assignment Agreement through LETKASNI. For a minor&apos;s claim, data is submitted and contractual steps are taken by a parent, guardian or another person with appropriate authority. We may request proof of authority where necessary. We limit the child&apos;s data to what is necessary for the case.</p>
        </Section>

        <Section title="12. Marketing, cookies and similar technologies">
          <p>Status messages about your case, requests for documents and service notices are not marketing. We send direct marketing only where there is an appropriate legal basis and always provide an easy way to unsubscribe.</p>
          <p>Necessary cookies and similar technologies are used for website operation, session security and basic functionality. Optional analytics and advertising are activated according to your choice in Privacy Settings.</p>
          <p>When the relevant features are enabled and you select the appropriate category, the website may use Google Analytics for analytics and Meta Pixel to measure advertising performance. These tools are not loaded before you make your choice.</p>
          <p>If you select the marketing category, Meta Conversions API may receive technical data about a successfully received claim, as well as one-way hashed values of the email address and phone number when you provide them. The access token for this service is not exposed to the browser.</p>
          <p>You choose analytics and marketing separately. You may change or withdraw your choice through “Privacy settings” in the website footer. Stopping new events after withdrawal does not automatically delete all cookies previously set in the browser.</p>
        </Section>

        <Section title="13. Complaint to the Commissioner">
          <p>If you believe the processing is unlawful, you may first contact us at <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>, and you also have the right to lodge a complaint with the Commissioner for Information of Public Importance and Personal Data Protection: Bulevar kralja Aleksandra 15, 11120 Belgrade, <a className="font-medium text-[var(--ink)]" href="mailto:office@poverenik.rs">office@poverenik.rs</a>, <a className="font-medium text-[var(--ink)]" href="tel:+381113408900">+381 11 3408 900</a>, <a className="font-medium text-[var(--ink)]" href="https://www.poverenik.rs">poverenik.rs</a>.</p>
        </Section>

        <Section title="14. Changes to this Policy">
          <p>We may update the Policy because of changes in law, technology or how we process data. We publish the version date on the website. If a change materially affects your right or introduces new processing that requires consent, we will inform you and obtain new consent where required.</p>
        </Section>
      </div>
      <SiteFooter locale="en" supportEmail={supportEmail} />
    </main>
  );
}
