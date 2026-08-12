import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LegalOperatorContact } from "@/components/legal-operator-contact";
import { getSupportEmail, getSupportPhone } from "@/lib/env";

const lastUpdated = "9 August 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-bold tracking-[-0.02em] text-[var(--ink)]">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  const supportEmail = getSupportEmail();
  const supportPhone = getSupportPhone();

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32">
      <SiteHeader locale="en" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 pb-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">Terms of Use</h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
            These Terms of Use govern access to and use of letkasni.rs, as well as the basic online model for receiving and
            administratively processing requests related to air-compensation claims.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">
            Last updated: {lastUpdated}
          </p>
        </div>

        <Section title="1. Website operator">
          <p>
            Letkasni.rs is operated by Expatwise LLC, with its business address at 30 N Gould St, Ste R, Sheridan, WY 82801,
            USA, which is responsible for organising and providing the service through this website in the Republic of Serbia.
          </p>
          <LegalOperatorContact supportEmail={supportEmail} supportPhone={supportPhone} locale="en" />
        </Section>

        <Section title="2. Scope of the service">
          <p>
            Letkasni.rs is an informational and operational website intended to receive user requests related to air compensation,
            organise the submitted information and documents, and support further administrative communication about those requests.
          </p>
          <p>
            Using the website, completing a form or receiving an initial response does not by itself mean that a representation
            agreement has been concluded, that a particular case has been accepted or that payment of compensation is guaranteed.
          </p>
          <p>
            Full legal or commercial cooperation may require a separate agreement, power of attorney, additional documentation and
            a separate confirmation from the operator.
          </p>
        </Section>

        <Section title="3. Nature of the service and limitation on legal services">
          <p>
            Letkasni.rs is not a law firm and does not provide legal advice, legal representation or other legal services. Information
            shown on the website, in forms, in email communication or during request processing is for informational, technical and
            administrative purposes only and does not constitute legal advice.
          </p>
          <p>
            The letkasni.rs service provides technical and administrative support in connection with air-compensation requests,
            including receiving and organising flight information, organising documents, technically recording requests and
            communicating about request status.
          </p>
          <p>
            Letkasni.rs does not guarantee that a user is entitled to compensation, that a request will be accepted or that an airline
            or other relevant party will make a payment. The outcome depends on the specific facts, route, carrier, reason for the
            disruption, available evidence and applicable rules.
          </p>
          <p>
            If a situation requires legal advice, a legal opinion, representation or proceedings before a court or other authority,
            the user should contact a qualified lawyer or other authorised professional. An external legal professional may be involved
            only as a separate step, with appropriate notice and the user&apos;s consent; this does not mean that letkasni.rs itself
            provides legal services.
          </p>
        </Section>

        <Section title="4. Who may use the website">
          <p>
            The website is intended for adults, as well as persons acting on behalf of other passengers or legal entities where they
            have appropriate authorisation.
          </p>
          <p>
            By submitting a request, you confirm that you have the right to provide the information entered and that, to the best of
            your knowledge, it is accurate and complete.
          </p>
        </Section>

        <Section title="5. Information and limitation of liability">
          <p>
            Website content and communication during administrative request processing provide general information and an operational
            step in handling a request. They are not individual legal advice, a final legal opinion or a guarantee of success.
          </p>
          <p>
            The operator aims to keep website information accurate and up to date, but does not guarantee that every piece of information
            is complete, continuously available or applicable to every individual case without further review.
          </p>
          <p>
            To the extent permitted by applicable law, the operator is not liable for indirect or consequential loss arising from reliance
            solely on general website content, technical interruptions, delays by third-party services or information entered by the user.
          </p>
        </Section>

        <Section title="6. Submitting requests and electronic communication">
          <p>
            The website allows users to submit information needed for administrative request processing electronically. Electronic
            communication, submission confirmations and further exchanges may take place by email or other contact channels provided by the user.
          </p>
          <p>
            By submitting a request, you agree that the operator may contact you to process the submission, request additional information
            and provide information about the next steps.
          </p>
          <p>
            If the operator later offers electronic conclusion of a separate agreement, that relationship will be governed by additional
            documents and clear pre-contractual information.
          </p>
        </Section>

        <Section title="7. Fees and cooperation model">
          <p>
            Information about the charging model shown on the website is informational and reflects the basic business model at the time of publication.
          </p>
          <p>
            If the operator and user enter into a separate cooperation arrangement for a particular case, the fee, commission, calculation method, taxes and other costs will be clearly defined in a separate agreement, power of attorney or other appropriate document.
          </p>
          <p>
            Until such a document is concluded, the user should not assume that they owe any fee or that the operator has undertaken to manage the case.
          </p>
        </Section>

        <Section title="8. Prohibited use">
          <p>Users must not:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>submit inaccurate, third-party or unlawfully obtained data;</li>
            <li>use the website for unlawful activities, harassment or misuse of the infrastructure;</li>
            <li>attempt unauthorised access to the system, database, administrator area or website code;</li>
            <li>publish or transmit content that infringes third-party rights or applicable regulations.</li>
          </ul>
          <p>
            The operator may restrict or refuse to process requests that are clearly unfounded, incomplete, malicious or contrary to law.
          </p>
        </Section>

        <Section title="9. Intellectual property">
          <p>
            The website design, texts, logos, graphic elements, databases and other copyright or related rights in the website content
            belong to the operator or to third parties that have authorised the operator to use them.
          </p>
          <p>
            Without prior written permission, copying, distributing, modifying, publicly displaying or commercially using the website content
            is not permitted, except to the extent allowed by mandatory law.
          </p>
        </Section>

        <Section title="10. Third-party links and external services">
          <p>
            The website may contain links to external services or use third-party infrastructure. The operator is not responsible for the
            content, privacy rules, availability or conduct of those third parties.
          </p>
          <p>Use of those services may be subject to separate third-party terms and privacy policies.</p>
        </Section>

        <Section title="11. Privacy and data processing">
          <p>
            Processing of personal data is governed by the separate Privacy Policy, which forms part of the information available to the user when using the website.
          </p>
          <p>
            If these Terms of Use conflict with mandatory personal-data protection rules, the applicable law prevails.
          </p>
        </Section>

        <Section title="12. Governing law and disputes">
          <p>These Terms of Use are governed by the law of the Republic of Serbia.</p>
          <p>
            The parties will seek to resolve any dispute amicably. If that is not possible, disputes arising from use of the website or
            these Terms will be handled by the court with subject-matter and territorial jurisdiction in the Republic of Serbia, unless
            mandatory law provides otherwise.
          </p>
        </Section>

        <Section title="13. Changes to the Terms">
          <p>
            The operator may update these Terms of Use from time to time to reflect changes in the business model, technology or regulations.
            The current version is published on this page with the date of the latest update.
          </p>
        </Section>

        <Section title="14. Contact">
          <p>
            For questions about these Terms of Use, please contact{" "}
            <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
            .
          </p>
        </Section>
      </div>
      <SiteFooter locale="en" supportEmail={supportEmail} />
    </main>
  );
}
