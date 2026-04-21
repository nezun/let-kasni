import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "letkasni.rs | Flight compensation check",
  description:
    "Enter your flight details and get an initial check on whether your case is worth reviewing further under EU 261 / ECAA.",
};

export default function EnglishPage() {
  return <LandingPage locale="en" variant="hero-compact" />;
}
