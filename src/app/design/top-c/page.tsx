import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Compact Hero Review | letkasni.rs",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TopCompactDesignPage() {
  return <LandingPage locale="sr" />;
}
