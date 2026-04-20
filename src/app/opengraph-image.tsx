import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #f9f7f4 0%, #efe7db 50%, #dfeeed 100%)",
          color: "#1a1a1a",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            border: "1px solid rgba(26,26,26,0.1)",
            borderRadius: 32,
            background: "rgba(255,255,255,0.9)",
            padding: 44,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#0d6b6b",
              }}
            >
              letkasni.rs
            </div>
            <div
              style={{
                fontSize: 68,
                lineHeight: 1.05,
                fontWeight: 800,
                maxWidth: 860,
              }}
            >
              Provera avio odštete za putnike iz Srbije
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: "#4b5563",
                maxWidth: 900,
              }}
            >
              Pošaljite osnovne podatke o letu i dobijte konzervativnu procenu
              sledećeg koraka za EU 261 / ECAA claim.
            </div>
          </div>

          <div style={{ display: "flex", gap: 18 }}>
            {["250–600 EUR potencijalno", "Odgovor do 24h", "Konzervativna procena"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    borderRadius: 999,
                    border: "1px solid rgba(26,26,26,0.08)",
                    background: "#f3f0ea",
                    padding: "14px 20px",
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
