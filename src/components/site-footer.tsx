import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { PrivacySettingsButton } from "@/components/privacy-settings-button";
import { cornerstonePages, getCornerstoneHref } from "@/lib/cornerstones";
import { getSupportEmail, getSupportPhone } from "@/lib/env";

type FooterLocale = "sr" | "en";
type LogoBalance = "default" | "optical" | "compact" | "badge";
export type FooterContactVariant =
  | "default"
  | "panel"
  | "rows-neutral"
  | "rows-brand"
  | "rows-brand-flat"
  | "phone-first";

type BrandIconProps = {
  className?: string;
};

// Brand glyphs and colors follow the Simple Icons source set.
function ViberIcon({ className }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.003l-.004 2.416s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302.407-.44.972-1.084 1.397-1.58 3.85.326 6.812-.416 7.15-.525.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.596-.55-3.006-2.3-8.375-2.323 0 0-.395-.025-1.037-.017zm.058 1.693c.545-.004.88.017.88.017 4.542.02 6.717 1.388 7.222 1.846 1.675 1.435 2.53 4.868 1.906 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395-.28.09-2.882.737-6.153.524 0 0-2.436 2.94-3.197 3.704-.12.12-.26.167-.352.144-.13-.033-.166-.188-.165-.414l.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895.054-2.604.543-4.738 1.996-6.173 1.96-1.773 5.474-2.018 7.11-2.03zm.38 2.602c-.167 0-.303.135-.304.302 0 .167.133.303.3.305 1.624.01 2.946.537 4.028 1.592 1.073 1.046 1.62 2.468 1.633 4.334.002.167.14.3.307.3.166-.002.3-.138.3-.304-.014-1.984-.618-3.596-1.816-4.764-1.19-1.16-2.692-1.753-4.447-1.765zm-3.96.695c-.19-.032-.4.005-.616.117l-.01.002c-.43.247-.816.562-1.146.932-.002.004-.006.004-.008.008-.267.323-.42.638-.46.948-.008.046-.01.093-.007.14 0 .136.022.27.065.4l.013.01c.135.48.473 1.276 1.205 2.604.42.768.903 1.5 1.446 2.186.27.344.56.673.87.984l.132.132c.31.308.64.6.984.87.686.543 1.418 1.027 2.186 1.447 1.328.733 2.126 1.07 2.604 1.206l.01.014c.13.042.265.064.402.063.046.002.092 0 .138-.008.31-.036.627-.19.948-.46.004 0 .003-.002.008-.005.37-.33.683-.72.93-1.148l.003-.01c.225-.432.15-.842-.18-1.12-.004 0-.698-.58-1.037-.83-.36-.255-.73-.492-1.113-.71-.51-.285-1.032-.106-1.248.174l-.447.564c-.23.283-.657.246-.657.246-3.12-.796-3.955-3.955-3.955-3.955s-.037-.426.248-.656l.563-.448c.277-.215.456-.737.17-1.248-.217-.383-.454-.756-.71-1.115-.25-.34-.826-1.033-.83-1.035-.137-.165-.31-.265-.502-.297zm4.49.88c-.158.002-.29.124-.3.282-.01.167.115.312.282.324 1.16.085 2.017.466 2.645 1.15.63.688.93 1.524.906 2.57-.002.168.13.306.3.31.166.003.305-.13.31-.297.025-1.175-.334-2.193-1.067-2.994-.74-.81-1.777-1.253-3.05-1.346h-.024zm.463 1.63c-.16.002-.29.127-.3.287-.008.167.12.31.288.32.523.028.875.175 1.113.422.24.245.388.62.416 1.164.01.167.15.295.318.287.167-.008.295-.15.287-.317-.03-.644-.215-1.178-.58-1.557-.367-.378-.893-.574-1.52-.607h-.018z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function TelegramIcon({ className }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const footerCopy = {
  sr: {
    homeHref: "/",
    footerBody:
      "Specijalizovana lokalna usluga za zaštitu prava putnika u avio-saobraćaju i naplatu zakonom propisane odštete.",
    rightsTitle: "Prava putnika",
    companyTitle: "Kompanija",
    navHow: "Kako radi",
    terms: "Uslovi korišćenja",
    privacy: "Politika privatnosti",
    privacySettings: "Podešavanja privatnosti",
    contactTitle: "Kontakt",
    emailLabel: "E-mail",
    phoneLabel: "Telefon",
    supportLabel: "Direktna podrška",
    copyright: "© 2026 letkasni.rs. Sva prava zadržana.",
  },
  en: {
    homeHref: "/en",
    footerBody:
      "Local, English-speaking support for passenger compensation claims involving flights to and from Serbia.",
    rightsTitle: "Know your rights",
    companyTitle: "Our company",
    navHow: "How it works",
    terms: "Terms of use",
    privacy: "Privacy policy",
    privacySettings: "Privacy settings",
    contactTitle: "Contact",
    emailLabel: "Email",
    phoneLabel: "Phone",
    supportLabel: "Direct support",
    copyright: "© 2026 letkasni.rs. All rights reserved.",
  },
} as const;

function footerRightsLinks(locale: FooterLocale) {
  return cornerstonePages.map((page) => ({
    href: getCornerstoneHref(page, locale),
    label: page[locale].title,
  }));
}

function ContactBlock({
  locale,
  supportEmail,
  supportPhone,
  variant,
}: {
  locale: FooterLocale;
  supportEmail: string;
  supportPhone: string;
  variant: FooterContactVariant;
}) {
  const t = footerCopy[locale];
  const displayEmail =
    locale === "sr" ? supportEmail.replace("podrska@", "podrška@") : supportEmail;
  const phoneDigits = supportPhone.replace(/[^0-9]/g, "");
  const channels = [
    {
      label: "Viber",
      href: `viber://chat?number=${encodeURIComponent(supportPhone)}`,
      icon: ViberIcon,
      brandColor: "#7360F2",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/${phoneDigits}`,
      icon: WhatsAppIcon,
      brandColor: "#25D366",
    },
    {
      label: "Telegram",
      href: `https://t.me/+${phoneDigits}`,
      icon: TelegramIcon,
      brandColor: "#26A5E4",
    },
  ];

  if (variant === "panel") {
    return (
      <div className="mt-7 rounded-[8px] border border-white/8 bg-white/[0.035] p-4">
        <div className="mb-4 text-[11px] font-black uppercase tracking-[0.14em] text-white">
          {t.contactTitle}
        </div>
        <div className="space-y-3">
          <a
            href={`mailto:${supportEmail}`}
            className="group flex min-h-11 items-center gap-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-white/8 bg-[#2470EB]/10 text-[#76A9FF] transition group-hover:border-[#2470EB]/50 group-hover:bg-[#2470EB]/18 group-hover:text-white">
              <Mail className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#69758B]">
                {t.emailLabel}
              </span>
              <span className="block break-all text-[13px] leading-[1.45] text-[#C7D0DE] transition group-hover:text-white">
                {displayEmail}
              </span>
            </span>
          </a>
          <a
            href={`tel:${supportPhone}`}
            className="group flex min-h-11 items-center gap-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-white/8 bg-[#2470EB]/10 text-[#76A9FF] transition group-hover:border-[#2470EB]/50 group-hover:bg-[#2470EB]/18 group-hover:text-white">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#69758B]">
                {t.phoneLabel}
              </span>
              <span className="block text-[13px] leading-[1.45] text-[#C7D0DE] transition group-hover:text-white">
                {supportPhone}
              </span>
            </span>
          </a>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/8 pt-3">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              className="inline-flex min-h-11 items-center text-[11px] font-semibold text-[#8E9BB0] transition hover:text-white"
            >
              {channel.label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (
    variant === "rows-neutral" ||
    variant === "rows-brand" ||
    variant === "rows-brand-flat"
  ) {
    const useBrandColors = variant !== "rows-neutral";
    const removeRowFrames = variant === "rows-brand-flat";

    return (
      <div className="mt-7 border-t border-white/8 pt-5">
        <div className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-white">
          {t.contactTitle}
        </div>
        <div className={removeRowFrames ? "space-y-1" : "space-y-2"}>
          <a
            href={`mailto:${supportEmail}`}
            className={`group flex min-h-14 items-center gap-3 py-2 transition ${
              removeRowFrames
                ? "px-1"
                : "rounded-[8px] border border-white/8 px-3 hover:border-white/16 hover:bg-white/[0.035]"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center text-[#AAB4C5] transition group-hover:text-[#76A9FF] ${
                removeRowFrames
                  ? ""
                  : "rounded-[8px] bg-white/[0.055] group-hover:bg-[#2470EB]/15"
              }`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#69758B]">
                {t.emailLabel}
              </span>
              <span className="block break-all text-[13px] leading-[1.45] text-[#C7D0DE] transition group-hover:text-white">
                {displayEmail}
              </span>
            </span>
          </a>

          <div
            className={`grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-2 transition ${
              removeRowFrames
                ? "px-1"
                : "rounded-[8px] border border-white/8 pl-3 pr-2 hover:border-white/16 hover:bg-white/[0.025]"
            }`}
          >
            <a
              href={`tel:${supportPhone}`}
              className="group flex min-w-0 items-center gap-2.5"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center text-[#AAB4C5] transition group-hover:text-[#76A9FF] ${
                  removeRowFrames
                    ? ""
                    : "rounded-[8px] bg-white/[0.055] group-hover:bg-[#2470EB]/15"
                }`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#69758B]">
                  {t.phoneLabel}
                </span>
                <span className="block whitespace-nowrap text-[13px] leading-[1.45] text-[#C7D0DE] transition group-hover:text-white">
                  {supportPhone}
                </span>
              </span>
            </a>

            <div className="flex shrink-0 items-center gap-0.5">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  aria-label={`${channel.label} ${supportPhone}`}
                  title={channel.label}
                  style={
                    useBrandColors ? { color: channel.brandColor } : undefined
                  }
                  className={`inline-flex h-10 w-9 items-center justify-center transition-colors ${
                    useBrandColors
                      ? "hover:opacity-80"
                      : "text-[#8E9BB0] hover:text-[#C7D0DE]"
                  }`}
                >
                  <channel.icon className="h-[19px] w-[19px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "phone-first") {
    return (
      <div className="mt-7 border-l-2 border-[#2470EB] pl-4">
        <div className="text-[10px] font-black uppercase tracking-[0.14em] text-[#76A9FF]">
          {t.supportLabel}
        </div>
        <a
          href={`tel:${supportPhone}`}
          className="mt-2 block w-fit font-display text-[19px] font-bold leading-tight text-white transition hover:text-[#76A9FF]"
        >
          {supportPhone}
        </a>
        <a
          href={`mailto:${supportEmail}`}
          className="mt-2 block w-fit break-all text-[13px] leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
        >
          {displayEmail}
        </a>
        <div className="mt-4 flex flex-wrap gap-2">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-white/[0.045] px-3 text-[11px] font-semibold text-[#AAB4C5] transition hover:bg-white/[0.08] hover:text-white"
            >
              <channel.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {channel.label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-7 border-t border-white/8 pt-5">
      <div className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-white">
        {t.contactTitle}
      </div>
      <a
        href={`mailto:${supportEmail}`}
        className="block w-fit text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
      >
        Email: {displayEmail}
      </a>
      <div className="mt-3 flex items-center gap-2">
        <a
          href={`tel:${supportPhone}`}
          aria-label={`${t.phoneLabel} ${supportPhone}`}
          title={t.phoneLabel}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 text-[#C7D0DE] transition hover:border-[#2470EB] hover:bg-[#2470EB]/15 hover:text-white"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
        </a>
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            aria-label={`${channel.label} ${supportPhone}`}
            title={channel.label}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 text-[#C7D0DE] transition hover:border-[#2470EB] hover:bg-[#2470EB]/15 hover:text-white"
          >
            <channel.icon className="h-4 w-4" aria-hidden="true" />
          </a>
        ))}
        <a
          href={`tel:${supportPhone}`}
          className="ml-1 text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
        >
          {supportPhone}
        </a>
      </div>
    </div>
  );
}

export function SiteFooter({
  locale,
  supportEmail: supportEmailOverride,
  logoBalance = "compact",
  contactVariant = "rows-brand-flat",
}: {
  locale: FooterLocale;
  supportEmail?: string;
  logoBalance?: LogoBalance;
  contactVariant?: FooterContactVariant;
}) {
  const t = footerCopy[locale];
  const rightsLinks = footerRightsLinks(locale);
  const supportEmail = supportEmailOverride ?? getSupportEmail();
  const supportPhone = getSupportPhone();

  return (
    <footer className="bg-[#0A0F1E] px-6 pb-8 pt-14 text-[#8E9BB0]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 grid gap-10 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.7fr)]">
          <div>
            <BrandLogo href={t.homeHref} tone="light" balance={logoBalance} />
            <p className="mt-[14px] max-w-[300px] text-[13px] leading-[1.7] text-[#8E9BB0]">
              {t.footerBody}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <div className="mb-5 text-[11px] font-black uppercase tracking-[0.14em] text-white">
                {t.rightsTitle}
              </div>
              <nav className="flex flex-col gap-[10px]" aria-label={t.rightsTitle}>
                {rightsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <div className="mb-5 text-[11px] font-black uppercase tracking-[0.14em] text-white">
                {t.companyTitle}
              </div>
              <nav className="flex flex-col gap-[10px]" aria-label={t.companyTitle}>
                <Link
                  href="/privacy"
                  className="w-fit text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
                >
                  {t.privacy}
                </Link>
                <Link
                  href="/terms"
                  className="w-fit text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
                >
                  {t.terms}
                </Link>
                <PrivacySettingsButton label={t.privacySettings} />
                <Link
                  href={`${t.homeHref}#kako-radi`}
                  className="w-fit text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
                >
                  {t.navHow}
                </Link>
              </nav>

              <ContactBlock
                locale={locale}
                supportEmail={supportEmail}
                supportPhone={supportPhone}
                variant={contactVariant}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-5 text-xs text-[#8E9BB0]">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
