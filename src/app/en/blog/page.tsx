import type { Metadata } from "next";

import { BlogIndexPage } from "@/components/blog-index-page";

export const metadata: Metadata = {
  title: "Blog | letkasni.rs",
  description:
    "Guides on flight compensation, delayed flights, cancelled flights, missed connections, overbooking, and passenger rights.",
  alternates: {
    canonical: "/en/blog",
    languages: {
      sr: "/blog",
      en: "/en/blog",
    },
  },
  openGraph: {
    title: "Blog | letkasni.rs",
    description:
      "Practical guides on flight compensation and passenger rights for travelers connected with Serbia.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | letkasni.rs",
    description:
      "Practical guides on flight compensation and passenger rights for travelers connected with Serbia.",
  },
};

export default function EnglishBlogPage() {
  return <BlogIndexPage locale="en" variant="a" />;
}
