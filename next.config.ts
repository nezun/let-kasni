import type { NextConfig } from "next";
import consolidations from "./src/content/seo-consolidations.json";

const consolidationRedirects = consolidations.flatMap(group =>
  ([group.sr, group.en]).flatMap(({ source, target }) => {
    const slug = source.split("/").at(-1);
    // Both historical handlers accepted either language's slug.
    return [source, `/blog/${slug}`, `/en/blog/${slug}`].map(path => ({
      source: path, destination: target, permanent: true as const,
    }));
  }),
);

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      ...consolidationRedirects.map(redirect => ({
        ...redirect,
        has: [{ type: "host" as const, value: "www.letkasni.rs" }],
        destination: `https://letkasni.rs${redirect.destination}`,
      })),
      ...consolidationRedirects,
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
      {
        source: "/_next/static/media/70bc3e132a0a741e-s.p.1409xf.ylxg8g.woff2",
        destination: "/_next/static/media/70bc3e132a0a741e-s.1409xf.ylxg8g.woff2",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
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
