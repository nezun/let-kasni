import { privacyServiceRegistry, privacyServiceRegistryVersion } from "@/lib/privacy-service-registry";

export function PrivacyServiceOverview({ locale }: { locale: "sr" | "en" }) {
  const sr = locale === "sr";

  return (
    <div className="space-y-3 rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-4">
      <h3 className="font-bold text-[var(--ink)]">
        {sr ? "Stalni tehnički servisi" : "Ongoing technical services"}
      </h3>
      <p>
        {sr
          ? "Pregled obuhvata servise čija je upotreba potvrđena u aplikaciji. Prevoznici i advokati zavise od konkretnog predmeta; informacije za predmet dajemo na zahtev."
          : "This overview covers services whose use is confirmed in the application. Carriers and lawyers depend on the individual case; case-specific information is available on request."}
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-[760px] border-collapse text-left text-xs leading-5">
          <thead>
            <tr className="border-b border-[var(--line)] text-[var(--ink)]">
              <th className="p-2">{sr ? "Primalac / kategorija" : "Recipient / category"}</th>
              <th className="p-2">{sr ? "Svrha" : "Purpose"}</th>
              <th className="p-2">{sr ? "Država / pristup" : "Country / access"}</th>
              <th className="p-2">{sr ? "Osnov i zaštitne mere" : "Basis and safeguards"}</th>
            </tr>
          </thead>
          <tbody>
            {privacyServiceRegistry.map((service) => (
              <tr key={service.id} className="border-b border-[var(--line)] align-top last:border-0">
                <td className="p-2 font-semibold text-[var(--ink)]">{service.recipient[locale]}</td>
                <td className="p-2">{service.purpose[locale]}</td>
                <td className="p-2">{service.accessLocation[locale]}</td>
                <td className="p-2">
                  {service.safeguards[locale]}{" "}
                  <a className="font-semibold text-[var(--ink)] underline" href={service.href} rel="noreferrer" target="_blank">
                    {sr ? "Uslovi pružaoca" : "Provider terms"}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs">{sr ? "Verzija registra" : "Registry version"}: {privacyServiceRegistryVersion}</p>
    </div>
  );
}
