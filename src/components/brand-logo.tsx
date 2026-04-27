import Link from "next/link";

export type BrandLogoVariant =
  | "classic"
  | "jet"
  | "swift"
  | "contrail"
  | "badge-classic"
  | "badge-soft"
  | "badge-motion";

type BrandLogoProps = {
  href?: string;
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showDotRs?: boolean;
  variant?: BrandLogoVariant;
  balance?: "default" | "optical" | "compact" | "badge";
  className?: string;
};

function LogoMark({
  tone,
  size,
  variant,
}: {
  tone: "light" | "dark";
  size: "sm" | "md" | "lg";
  variant: BrandLogoVariant;
}) {
  const isLight = tone === "light";
  const iconSize = size === "sm" ? 24 : size === "lg" ? 34 : 26;
  const navy = isLight ? "#FFFFFF" : "#0B2E6F";
  const blue = "#2470EB";
  const blueSoft = "#2E8EFF";

  if (
    variant === "badge-classic" ||
    variant === "badge-soft" ||
    variant === "badge-motion"
  ) {
    const radius =
      variant === "badge-soft" ? 11.5 : variant === "badge-motion" ? 10 : 9.5;
    const bg =
      variant === "badge-soft"
        ? "url(#badge-soft-fill)"
        : variant === "badge-motion"
          ? "url(#badge-motion-fill)"
          : blue;
    const strokeWidth = variant === "badge-soft" ? 2.45 : 2.3;

    return (
      <svg
        width={iconSize + 10}
        height={iconSize + 10}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="badge-soft-fill" x1="6" y1="4" x2="33" y2="36">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1A52C8" />
          </linearGradient>
          <linearGradient id="badge-motion-fill" x1="4" y1="6" x2="35" y2="34">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="34" height="34" rx={radius} fill={bg} />

        <g transform="translate(8 8) rotate(-8 12 12)">
          {variant === "badge-motion" ? (
            <>
              <path
                d="M3 13.5H6.2"
                stroke="rgba(255,255,255,0.66)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M2.2 17H5.6"
                stroke="rgba(255,255,255,0.48)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </>
          ) : null}
          <path
            d="M17.8 19.2L16 11L19.5 7.5C21 6 21.5 4 21 3C20 2.5 18 3 16.5 4.5L13 8L4.8 6.2C4.3 6.1 3.9 6.3 3.7 6.7L3.4 7.2C3.2 7.7 3.3 8.2 3.7 8.5L9 12L7 15H4L3 16L6 18L8 21L9 20V17L12 15L15.5 20.3C15.8 20.7 16.3 20.8 16.8 20.6L17.3 20.4C17.7 20.1 17.9 19.7 17.8 19.2Z"
            stroke="#FFFFFF"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
  }

  if (variant === "classic") {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M8 22L24 14L31 22L24 24L19 34L16 34L20 25L11 27Z"
          fill={navy}
        />
        <circle cx="31" cy="22" r="3" fill={blueSoft} />
      </svg>
    );
  }

  if (variant === "swift") {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M7 23.6L25.8 14.1L30.4 15.8L22.8 20.3L29.4 22.3L27.6 25L20.1 23.7L16.2 31.7H12.8L14.7 23.4L8.2 25.4L7 23.6Z"
          fill={navy}
        />
        <path d="M29.7 15.5L33.6 14.7L31.7 18.2L29.7 15.5Z" fill={blue} />
        <circle cx="33.2" cy="14.9" r="1.9" fill={blueSoft} />
      </svg>
    );
  }

  if (variant === "contrail") {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M8.5 25.5C11.8 25.5 14 24.6 17 22.1"
          stroke={blue}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M12.4 29.4C16.1 29.4 18.7 28 22.4 24.6"
          stroke={blueSoft}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M14.9 20.8L28.1 14.2L31.6 19.2L25.8 20.6L21.3 29L18.4 28.9L20.4 21.9L15.8 22.9L14.9 20.8Z"
          fill={navy}
        />
        <circle cx="31.4" cy="19.1" r="2.3" fill={blue} />
      </svg>
    );
  }

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M7.6 22.1L25.4 13.7L31.7 17.3L25.8 19.7L18.7 31.8H15.4L18.6 20.8L10 23L7.6 22.1Z"
        fill={navy}
      />
      <path d="M25.3 19.7L31.7 17.3L33.7 18.8L28.6 22.3L25.3 19.7Z" fill={blue} />
      <circle cx="33.1" cy="18.9" r="2.5" fill={blueSoft} />
    </svg>
  );
}

export function BrandLogo({
  href,
  tone = "dark",
  size = "md",
  showDotRs = false,
  variant = "badge-motion",
  balance = "default",
  className = "",
}: BrandLogoProps) {
  const isLight = tone === "light";
  const gapClass = balance === "compact" ? "gap-2.5" : "gap-3";
  const wrapperClass = ["inline-flex items-center", gapClass, className]
    .filter(Boolean)
    .join(" ");
  const textClass =
    size === "sm"
      ? balance === "compact"
        ? "text-[1.04rem] font-bold tracking-[-0.04em]"
        : "text-[1.08rem] font-bold tracking-[-0.04em]"
      : size === "lg"
        ? balance === "compact"
          ? "text-[1.48rem] font-bold tracking-[-0.055em]"
          : "text-[1.55rem] font-bold tracking-[-0.055em]"
        : balance === "compact"
          ? "text-[1.25rem] font-bold tracking-[-0.05em]"
          : "text-[1.32rem] font-bold tracking-[-0.05em]";
  const subClass =
    size === "sm"
      ? "text-[0.7rem] font-medium"
      : size === "lg"
        ? "text-[0.85rem] font-medium"
        : "text-[0.76rem] font-medium";
  const primary = isLight ? "#FFFFFF" : "#0B2E6F";
  const action = "#2470EB";
  const suffix = isLight ? "rgba(248,250,252,0.34)" : "#8E9BB0";
  const markClass =
    balance === "optical"
      ? "flex translate-y-[1px] items-center"
      : balance === "compact"
        ? "flex translate-y-[2px] scale-[0.94] items-center"
        : balance === "badge"
          ? "flex translate-y-[2.5px] scale-[1.04] items-center"
          : "flex items-center";
  const wordmarkClass =
    balance === "optical"
      ? "inline-flex translate-y-[0.5px] items-end gap-0.5"
      : balance === "compact"
        ? "inline-flex translate-y-[2px] items-end gap-0.5"
        : balance === "badge"
          ? "inline-flex translate-y-[2.5px] items-end gap-0.5"
          : "inline-flex items-end gap-0.5";

  const content = (
    <span className={wrapperClass}>
      <span className={markClass}>
        <LogoMark tone={tone} size={size} variant={variant} />
      </span>

      <span className={wordmarkClass}>
        <span className={`font-display ${textClass}`} style={{ color: primary }}>
          let
          <span style={{ color: action }}>kasni</span>
        </span>
        {showDotRs ? (
          <span className={subClass} style={{ color: suffix }}>
            .rs
          </span>
        ) : null}
      </span>
    </span>
  );

  if (!href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}
