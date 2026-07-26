import {
  socialPreview,
  type SocialPreviewLocale,
} from "@/lib/social-preview";

function LogoMark() {
  return (
    <svg width="66" height="66" viewBox="0 0 40 40" fill="none">
      <rect x="2" y="2" width="36" height="36" rx="10" fill="#2470EB" />
      <g transform="translate(8 8) rotate(-8 12 12)">
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
        <path
          d="M17.8 19.2L16 11L19.5 7.5C21 6 21.5 4 21 3C20 2.5 18 3 16.5 4.5L13 8L4.8 6.2C4.3 6.1 3.9 6.3 3.7 6.7L3.4 7.2C3.2 7.7 3.3 8.2 3.7 8.5L9 12L7 15H4L3 16L6 18L8 21L9 20V17L12 15L15.5 20.3C15.8 20.7 16.3 20.8 16.8 20.6L17.3 20.4C17.7 20.1 17.9 19.7 17.8 19.2Z"
          stroke="#FFFFFF"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function SocialPreviewCard({
  locale,
}: {
  locale: SocialPreviewLocale;
}) {
  const copy = socialPreview[locale];

  return (
    <div
      style={{
        display: "flex",
        width: "1200px",
        height: "630px",
        padding: "52px 58px",
        background: "#071126",
        color: "#FFFFFF",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "-110px",
          top: "-180px",
          width: "540px",
          height: "540px",
          border: "1px solid rgba(36,112,235,0.22)",
          borderRadius: "270px",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "44px",
          bottom: "-215px",
          width: "470px",
          height: "470px",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "235px",
        }}
      />

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "17px",
          }}
        >
          <LogoMark />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: "36px",
              fontWeight: 800,
            }}
          >
            <span style={{ color: "#2470EB" }}>let</span>
            <span style={{ color: "#FFFFFF" }}>kasni.rs</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "57px",
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            {copy.question}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "57px",
              lineHeight: 1.04,
              fontWeight: 800,
              color: "#2470EB",
              letterSpacing: "-1px",
            }}
          >
            {copy.amount}
          </div>
          <div
            style={{
              display: "flex",
              width: "fit-content",
              paddingBottom: "7px",
              borderBottom: "6px solid #2470EB",
              fontSize: "57px",
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            {copy.emphasis}
          </div>
        </div>

        <div style={{ display: "flex", gap: "18px" }}>
          {[copy.proofA, copy.proofB].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 22px",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.06)",
                color: "#DCE6F7",
                fontSize: "26px",
                fontWeight: 650,
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: "12px",
                  height: "12px",
                  borderRadius: "6px",
                  background: "#22C7A5",
                }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
