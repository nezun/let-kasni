import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LegalOperatorContact } from "@/components/legal-operator-contact";
import { getSupportEmail, getSupportPhone } from "@/lib/env";

const lastUpdated = "12 August 2026";

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

export default function PrivacyPage() {
  const supportEmail = getSupportEmail();
  const supportPhone = getSupportPhone();

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32">
      <SiteHeader locale="en" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 pb-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">
            Privacy Policy
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
            This Privacy Policy explains how letkasni.rs processes personal data in
            connection with the use of the website, the submission of an air-compensation
            request and further communication with users.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">
            Last updated: {lastUpdated}
          </p>
        </div>

        <Section title="1. Data controller">
          <p>
            The data controller is Expatwise LLC, with its business address at 30 N Gould
            St, Ste R, Sheridan, WY 82801, USA, which operates letkasni.rs and determines
            the purposes and means of processing personal data.
          </p>
          <LegalOperatorContact
            supportEmail={supportEmail}
            supportPhone={supportPhone}
            locale="en"
          />
          <p>
            For questions about data processing and exercising privacy rights, please use
            the contact email listed above.
          </p>
        </Section>

        <Section title="2. What data we process">
          <p>Depending on how you use the website, we may process the following categories of data:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>identification and contact details that you provide, such as your name, email address and telephone number;</li>
            <li>flight and incident details, such as flight number, flight date, route, type of problem and a free-text description;</li>
            <li>technical website-use data, such as IP address, basic logs, access time and device or browser information;</li>
            <li>documents and additional information that you later provide if the case is reviewed further.</li>
          </ul>
          <p>
            We do not request special categories of personal data unless they are exceptionally
            necessary for a particular request and an appropriate legal basis exists.
          </p>
        </Section>

        <Section title="3. Purposes and legal bases">
          <p>We process data only where there is an appropriate legal basis and a clear purpose.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><span className="font-semibold text-[var(--ink)]">Pre-contractual steps and service delivery:</span> when you submit a request, we process the data to receive the request, organise information and documents, respond to your enquiry and take administrative steps before any separate agreement or power of attorney is concluded.</li>
            <li><span className="font-semibold text-[var(--ink)]">Legitimate interest:</span> to protect systems, prevent misuse, keep records, improve processes and defend against legal claims, where the user&apos;s interests do not override those interests.</li>
            <li><span className="font-semibold text-[var(--ink)]">Legal obligation:</span> where processing is necessary to retain business records, respond to competent authorities or meet another legal obligation.</li>
            <li><span className="font-semibold text-[var(--ink)]">Consent:</span> only for processing that genuinely requires consent, such as optional analytics and marketing tools enabled through the privacy settings.</li>
          </ul>
          <p>
            Data is not used for solely automated decision-making that produces legal effects
            for the user. Letkasni.rs does not process data for legal advice, legal representation
            or other legal services.
          </p>
          <p>
            If a user later requests or approves the involvement of an external legal professional,
            certain data may be shared with that professional only as necessary for the next steps
            and on an appropriate legal basis.
          </p>
        </Section>

        <Section title="4. Required data">
          <p>
            Providing basic flight and contact details is not a legal obligation, but it is practically
            necessary if you want us to process a request administratively or contact you about your submission.
          </p>
          <p>
            If you do not provide the minimum necessary information, we may be unable to process the
            request or respond to your enquiry.
          </p>
        </Section>

        <Section title="5. Recipients and processors">
          <p>
            Data may be available to employees, contractors and processors involved in the technical
            maintenance of the website and request processing, only to the extent necessary for the relevant purpose.
          </p>
          <p>Typical recipients or processors may include:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>hosting, CDN and infrastructure providers;</li>
            <li>database and cloud-service providers;</li>
            <li>email and communication providers;</li>
            <li>external legal or operational partners, where necessary for a particular case;</li>
            <li>competent authorities where there is a legal obligation or valid legal request.</li>
          </ul>
          <p>
            Appropriate data-processing agreements are or will be concluded with processors where required by law.
          </p>
        </Section>

        <Section title="6. International data transfers">
          <p>
            Some technical infrastructure may involve providers that process or access data outside the Republic of Serbia.
            Where such a transfer occurs, appropriate safeguards are applied, including contractual and organisational
            mechanisms, to the extent required by applicable law.
          </p>
          <p>
            If additional providers or more complex transfers are introduced, this policy will be updated with more specific
            information about the services and transfer safeguards.
          </p>
        </Section>

        <Section title="7. Data retention">
          <p>
            We keep data for as long as necessary for the purpose for which it was collected and then for as long as required
            by legitimate interests or legal obligations.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>submissions that do not proceed to further cooperation are kept for a reasonably limited period for record-keeping and any follow-up response;</li>
            <li>data about active cases is kept during case processing and afterwards for as long as necessary for accounting, tax, contractual and other legal obligations;</li>
            <li>technical logs and security records are retained for a limited period consistent with system-protection purposes.</li>
          </ul>
          <p>
            Specific retention periods may be further defined in the controller&apos;s internal policies for each data category.
          </p>
        </Section>

        <Section title="8. Your rights">
          <p>
            Under the Serbian Personal Data Protection Act, you may request access to, correction or completion of data,
            erasure, restriction of processing and data portability where the relevant conditions are met, and you may object
            to processing.
          </p>
          <p>
            You may also withdraw consent at any time for processing based on consent. Withdrawal does not affect the lawfulness
            of processing carried out before withdrawal.
          </p>
          <p>
            Requests may be sent to{" "}
            <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
            . If you believe processing is unlawful, you may complain to the Commissioner for Information of Public Importance
            and Personal Data Protection.
          </p>
        </Section>

        <Section title="9. Data security">
          <p>
            We apply reasonable technical, organisational and personnel measures to protect data from unauthorised access,
            loss, misuse, alteration or destruction. However, no system is completely secure, so it is not possible to guarantee
            the absolute security of every transmission or storage process.
          </p>
        </Section>

        <Section title="10. Cookies, analytics and advertising">
          <p>
            The website may use necessary technical cookies and similar technologies required for website operation, session
            security and basic functionality. When the relevant environment variables are enabled and the user selects the
            appropriate category, the website may use Google Analytics for analytics and Meta Pixel to measure advertising
            performance. These tools are not loaded before the user makes a choice.
          </p>
          <p>
            When the user selects the marketing category, the Conversions API may receive technical request data for server-side
            measurement of a successfully received request, as well as one-way hashed email and telephone values when provided.
            The service access token is not exposed to the browser.
          </p>
          <p>
            Optional analytics and marketing are enabled separately according to the user&apos;s choice in the banner. The choice
            can be changed or withdrawn through “Privacy settings” in the website footer. Blocking new events after withdrawal
            does not automatically delete all previously set browser cookies.
          </p>
        </Section>

        <Section title="11. Changes to this policy">
          <p>
            This policy may be updated from time to time to reflect changes in the business model, technology or regulations.
            The current version is published on this page with the date of the latest update.
          </p>
        </Section>
      </div>
      <SiteFooter locale="en" supportEmail={supportEmail} />
    </main>
  );
}
