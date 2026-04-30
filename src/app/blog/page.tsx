import type { Metadata } from "next";

import { BlogIndexPage } from "@/components/blog-index-page";

export const metadata: Metadata = {
  title: "Blog | letkasni.rs",
  description:
    "Vodiči o pravima putnika, kašnjenju leta, otkazivanju, propuštenim konekcijama i avio-odšteti za putnike iz Srbije.",
  alternates: {
    canonical: "/blog",
    languages: {
      sr: "/blog",
      en: "/en/blog",
    },
  },
  openGraph: {
    title: "Blog | letkasni.rs",
    description:
      "Praktični vodiči o avio-odšteti, pravima putnika i proveri slučaja posle kašnjenja ili otkazivanja leta.",
    type: "website",
    locale: "sr_RS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | letkasni.rs",
    description:
      "Praktični vodiči o avio-odšteti, pravima putnika i proveri slučaja posle kašnjenja ili otkazivanja leta.",
  },
};

export default function BlogPage() {
  return <BlogIndexPage locale="sr" variant="a" />;
}
