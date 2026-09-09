import { LegalOperatorContact } from "@/components/legal-operator-contact";
import Link from "next/link";
import { PrivacyServiceOverview } from "@/components/privacy-service-overview";
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
const controllerName = "VGA EU CONSULTING DOO";

export default function PrivacyPage() {
  const supportEmail = siteOperator.email.en;
  const supportPhone = siteOperator.phone;

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32">
      <SiteHeader locale="en" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 pb-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">Privacy Policy</h1>
          <p className="max-w-3xl text-sm font-semibold leading-7 text-[var(--ink)]">letkasni.rs / {controllerName}</p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">PP 1.2 | Effective from 9 September 2026</p>
        </div>

        <Section title="At a glance">
          <p>The controller is {controllerName}. We do not sell your data.</p>
          <p>We use data to assess, acquire, recover and pay out your specific Claim, keep records and protect rights in proceedings.</p>
          <p>We may share relevant data with the airline, lawyer, court or regulator, bank, and necessary IT and signature services.</p>
          <p>We send offers about our current and future passenger and consumer rights products only with your separate consent. Consent is not a condition for handling your case and you may withdraw it at any time.</p>
          <p>For all questions, support, complaints and exercise of privacy rights, write to <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. For communication in Serbian, use <a className="font-medium text-[var(--ink)]" href={`mailto:${siteOperator.email.sr}`}>{siteOperator.email.sr}</a>.</p>
        </Section>

        <Section title="1. Who is the controller">
          <p>The personal data controller is {controllerName}, Bulevar Nemanjića 1, 18000 Niš, Republic of Serbia, Tax ID (PIB) {siteOperator.pib}, Registration number {siteOperator.mb}, which provides the letkasni.rs service. Register: APR / Serbian Business Registers Agency. Contact for privacy and general questions: <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>; for communication in Serbian: <a className="font-medium text-[var(--ink)]" href={`mailto:${siteOperator.email.sr}`}>{siteOperator.email.sr}</a>. Phone: <a className="font-medium text-[var(--ink)]" href={`tel:${supportPhone}`}>{supportPhone}</a>.</p>
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
            <li>Marketing preferences and evidence of consent: the contact you subscribe, the selected channel and scope of offers, the wording and version of your consent, the time and method of subscription and contact confirmation, and any withdrawal or unsubscribe request. Marketing records are kept separate from your case documentation.</li>
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
            <li>Consent: sending promotional messages about VGA products and services within the scope you accepted, and separately selected optional analytics and advertising. We send direct marketing only with prior consent for the relevant channel and purpose. You may withdraw consent at any time.</li>
            <li>Special-category data: only when processing is permitted by a specific rule, for example when necessary for the establishment, exercise or defence of a legal claim, or with explicit consent when that is the appropriate basis.</li>
          </ul>
          <p>Data needed to assess, enter into and perform a contract or make a payment is used on the appropriate contractual or other lawful basis, not on the basis of marketing consent. If you do not provide information necessary for a particular step, we may be unable to assess or pursue a claim, enter into a contract or make a payment; we will explain what information is missing and why it is needed. Refusing marketing has no such consequences. Limited records of consent and unsubscribe requests are retained to demonstrate lawful processing, protect legal claims and respect your choice not to receive further offers.</p>
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
          <p>A messaging service provider may process your contact and subscription preferences on our instructions. Consent to VGA offers does not authorise other companies, affiliated entities or partners to use your contact for their own direct marketing. Such new processing would require separate information and prior consent where required, clearly identifying the other controller. Two brands having the same owner does not make consent transferable between their operators.</p>
        </Section>

        <Section title="6. Transfers of data to other countries">
          <p>To pursue claims and use necessary technical services, relevant data may be accessible to carriers, lawyers or service providers in other countries. An international transfer may include remote access to data, not only the location of the server.</p>
          <p>For each transfer, we assess whether an adequate level of protection is recognised under the applicable law. Where that basis is unavailable, transfers are made subject to legally valid safeguards, such as applicable contractual clauses and necessary supplementary measures, or a statutory exception whose conditions are met in the particular case. We do not use exceptions as a general substitute for safeguards for routine cloud or marketing services.</p>
          <p>Where the GDPR applies, we assess its international transfer requirements separately from those of the Serbian Personal Data Protection Act. Marketing or cookie consent is not, by itself, general permission for every international transfer.</p>
          <p>You may obtain information about actual recipients or categories of recipients, countries, the specific transfer basis and how to obtain a copy of the applicable safeguards at <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. Copies are provided subject to necessary protection of confidential information and other persons&apos; rights.</p>
          <PrivacyServiceOverview locale="en" />
        </Section>

        <Section title="7. How long we keep data">
          <p>Retention periods are linked to the purpose, legal obligations and the need to prove the contract and legal proceedings. If a case is active or there is a dispute, we keep data longer only for as long as necessary for that dispute.</p>
          <ul className={listClassName}>
            <li>Claim, agreement, evidence package and key communication: during the case and for up to 5 years after closure, unless the law or a specific dispute requires a longer/shorter period.</li>
            <li>Financial/accounting documentation: up to 10 years where such a period is required under accounting/tax rules.</li>
            <li>Incomplete intake without a concluded agreement: no more than 12 months from the last activity, unless you request earlier deletion and there is no other legal basis.</li>
            <li>Security and technical logs: typically up to 12 months, unless required for an incident investigation or legal claim.</li>
            <li>Cookies: for the period stated in Privacy Settings.</li>
          </ul>
          <p>We use a marketing contact until consent is withdrawn, and for no longer than two years after subscription or your latest express confirmation that you wish to continue receiving offers. Merely sending, delivering or automatically recording the opening of a message does not extend that period. When the period expires, we stop marketing messages unless you have meanwhile confirmed the relevant consent again.</p>
          <p>Limited evidence of previous consent and its withdrawal, kept separate from the active marketing list, is retained only as necessary to demonstrate lawful processing and protect legal claims, for up to five years after messages stop, except during a specific dispute or where another legal obligation applies. We may retain a minimal suppression record for as long as necessary to prevent your contact being added to offers again, reviewing necessity at least annually. These records are not used for advertising.</p>
          <p>Unsubscribing from marketing does not automatically require erasure of case documents that we must or may retain on another basis. Equally, retaining a case does not authorise further offers.</p>
        </Section>

        <Section title="8. Security">
          <p>We use appropriate technical and organisational measures, including need-to-know access controls, encryption in transit, account protection, logging of relevant security events, backups and contractual confidentiality obligations for service providers. No system is completely secure, but we adapt the measures to the risk and type of data.</p>
        </Section>

        <Section title="9. Your rights">
          <p>Under applicable law, you may request access to and a copy of your data, rectification, erasure, restriction of processing and portability where the statutory conditions are met. You may object to processing based on legitimate interests on grounds relating to your particular situation.</p>
          <p>At any time, without giving reasons, you may require direct marketing to stop, including related profiling. After withdrawal of consent or such an objection, we no longer use your data for that purpose. Withdrawal does not affect the lawfulness of earlier processing.</p>
          <p>An unsubscribe option is available in marketing messages, and you may exercise your rights at <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. We do not require an account or additional identity documents to unsubscribe. We may request proportionate identity verification where necessary to protect personal data, particularly before disclosing or erasing it.</p>
          <p>Under the Serbian Personal Data Protection Act, we act without undue delay and within 30 days of receiving a request. Where the statutory conditions are met, this may be extended by a further 60 days; we inform you within the first 30 days and explain why. Where the GDPR applies, the corresponding period is one month, with a possible extension of two further months under its conditions. These periods do not postpone stopping marketing after an unsubscribe request. Requests are generally handled free of charge.</p>
          <p>If we cannot comply with a request, we will explain the reasons and inform you of available remedies.</p>
        </Section>

        <Section title="10. Automation and claim assessment">
          <p>We use automated tools to assist with flight data, calculations of times, distances, possible amounts and deadlines, and preparation of preliminary assessments. We do not make solely automated final decisions that produce legal effects or similarly significantly affect you. Such decisions are first genuinely considered by an authorised person who can review the information and change the proposed outcome. You may challenge a disputed or negative result and request human review through our contact address.</p>
          <p>We select marketing recipients using subscription preferences, language and the scope of consent, not health data, a child&apos;s documents, the substance of a dispute or payment information.</p>
        </Section>

        <Section title="11. Children and representation of another person">
          <p>A minor does not independently conclude an Assignment Agreement through letkasni.rs. For a minor&apos;s claim, data is submitted and contractual steps are taken by a parent, guardian or another person with appropriate authority. We may request proof of authority where necessary. We limit the child&apos;s data to what is necessary for the case.</p>
          <p>We do not include minor passengers&apos; data in direct marketing. A parent or another adult legal representative may separately subscribe to offers in their own name using their own contact. Signing an agreement for a child, providing a child&apos;s information or representing another passenger does not constitute that person&apos;s marketing consent.</p>
        </Section>

        <Section title="12. Offers for other products, marketing, cookies and similar technologies">
          <h3 id="article-12" className="scroll-mt-28 font-bold text-[var(--ink)]">12.1. VGA offers and future products</h3>
          <p>With your separate consent, we may send news and offers about current and future products and services of VGA EU CONSULTING DOO concerning the exercise and protection of passenger and consumer rights, including digital tools for those purposes and services under other brands operated by the same company. At subscription, we clearly identify the controller, the scope of offers and the communication channel.</p>
          <p>Consent to that scope does not authorise offers in unrelated fields or another company&apos;s independent marketing. Before such an extension, we will seek appropriate new consent. A new product within the accepted scope does not by itself change the purpose. Messages clearly identify VGA as the sender or the company on whose behalf an offer is sent.</p>
          <h3 className="font-bold text-[var(--ink)]">12.2. Your choice and unsubscribing</h3>
          <p>Subscription is voluntary and is not preselected. We currently offer subscription to email offers. Any future SMS, WhatsApp messages or promotional calls would require a separate choice of the relevant channel before such messages or calls. Providing a phone number for a case is not that choice.</p>
          <p>Consent is not inferred from acceptance of the Terms, this Policy, signing an agreement, previous use of the service or silence. Refusal or withdrawal does not affect handling or payment of your case. You do not have to receive offers to use the service.</p>
          <p>Every marketing email provides an easy, free way to unsubscribe without logging in. Unsubscribing from VGA email offers covers all its brands included in that subscription. You may also write to <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. Service messages necessary for your case continue on the appropriate basis after you unsubscribe; we do not use them to disguise advertising offers.</p>
          <p><Link className="font-semibold text-[var(--ink)] underline" href="/en/email-offers">Manage email offers</Link></p>
          <h3 className="font-bold text-[var(--ink)]">12.3. Cookies and advertising measurement</h3>
          <p>We use necessary technologies to operate the website, provide security and remember your choices. You select optional analytics and advertising separately in Privacy Settings; refusing them does not prevent claim submission.</p>
          <p>Where these features are enabled and you consent to the relevant category, Google Analytics may be used for analytics and Meta Pixel for advertising measurement. They are not activated before that choice. With advertising consent, Meta Conversions API may receive permitted technical event data server-side, and hashed contact values where that processing is covered by your choice. Hashing does not make this data anonymous: it may be used to match events to a platform user. Bank details, identity documents, health data, the content of legal submissions and minor passengers&apos; data are not sent to these tools.</p>
          <p>Choosing advertising is not consent to email offers, and subscribing to offers does not activate analytics or advertising. You may change or withdraw your choices through Privacy Settings in the footer. After withdrawal, we stop the relevant new transmissions and remove or disable optional cookies under our technical control. A click cannot retroactively erase data already lawfully received by a third party; you may exercise the rights described in Article 9.</p>
          <h3 className="font-bold text-[var(--ink)]">12.4. Evidence of your choice</h3>
          <p>We keep separate records of direct marketing subscriptions and withdrawals and of choices concerning optional technologies. Updating this Policy does not automatically enrol previous users in a new marketing purpose.</p>
        </Section>

        <Section title="13. Complaint to the Commissioner">
          <p>If you believe the processing is unlawful, you may first contact us at <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>, and you also have the right to lodge a complaint with the Commissioner for Information of Public Importance and Personal Data Protection: Bulevar kralja Aleksandra 15, 11120 Belgrade, <a className="font-medium text-[var(--ink)]" href="mailto:office@poverenik.rs">office@poverenik.rs</a>, <a className="font-medium text-[var(--ink)]" href="tel:+381113408900">+381 11 3408 900</a>, <a className="font-medium text-[var(--ink)]" href="https://www.poverenik.rs">poverenik.rs</a>.</p>
          <p>You do not have to contact us first in order to lodge a complaint with a competent supervisory authority.</p>
        </Section>

        <Section title="14. Changes to this Policy">
          <p>We may update the Policy because of changes in law, technology or how we process data. We publish the version date on the website. If a change materially affects your right or introduces new processing that requires consent, we will inform you and obtain new consent where required.</p>
          <p>Publishing a new version does not replace consent to a new purpose, channel or another controller. We do not retroactively expand previous consents. We inform affected individuals of material changes, before new processing where required.</p>
        </Section>
      </div>
      <SiteFooter locale="en" supportEmail={supportEmail} />
    </main>
  );
}
