import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.letkasni.rs",
          },
        ],
        destination: "https://letkasni.rs/:path*",
        permanent: true,
      },
      {
        source: "/prava-putnika-u-aviosaobracaju/preusmeren-let-drugi-aerodrom-prava-putnika",
        destination: "/naknada-za-kasnjenje-leta/preusmeren-let-drugi-aerodrom-prava-putnika",
        permanent: true,
      },
      {
        source: "/en/air-passenger-rights/flight-diverted-different-airport-passenger-rights",
        destination: "/en/flight-delay-compensation/flight-diverted-different-airport-passenger-rights",
        permanent: true,
      },
      {
        source: "/prava-putnika-u-aviosaobracaju/let-pomeren-ranije-prava-putnika",
        destination: "/naknada-za-otkazan-let/let-pomeren-ranije-prava-putnika",
        permanent: true,
      },
      {
        source: "/en/air-passenger-rights/flight-moved-earlier-passenger-rights",
        destination: "/en/flight-cancellation-compensation/flight-moved-earlier-passenger-rights",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/en",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
