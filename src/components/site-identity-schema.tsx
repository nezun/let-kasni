import { siteOperator } from "@/lib/site-operator";
import { getSiteUrl } from "@/lib/site-url";

export function SiteIdentitySchema() {
  const url = `${getSiteUrl()}/`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        name: "letkasni.rs",
        alternateName: "Let Kasni",
        url,
        inLanguage: ["sr", "en"],
        publisher: { "@id": `${url}#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${url}#organization`,
        name: "letkasni.rs",
        legalName: siteOperator.name,
        url,
        email: siteOperator.email.sr,
        telephone: siteOperator.phone,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
