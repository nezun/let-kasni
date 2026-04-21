import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Design Review | letkasni.rs",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TopDesignPage() {
  return <LandingPage locale="sr" />;
}
