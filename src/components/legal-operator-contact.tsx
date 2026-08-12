type LegalOperatorContactProps = {
  supportEmail: string;
  supportPhone: string;
  locale?: "sr" | "en";
};

export function LegalOperatorContact({
  supportEmail,
  supportPhone,
  locale = "sr",
}: LegalOperatorContactProps) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--border)] pt-3 text-sm">
      <a
        className="font-semibold text-[#2470EB] transition hover:text-[#1D5FC9]"
        href={`mailto:${supportEmail}`}
      >
        Email: {supportEmail}
      </a>
      <a
        className="font-semibold text-[#2470EB] transition hover:text-[#1D5FC9]"
        href={`tel:${supportPhone}`}
      >
        {locale === "en" ? "Phone" : "Telefon"}: {supportPhone}
      </a>
    </div>
  );
}
