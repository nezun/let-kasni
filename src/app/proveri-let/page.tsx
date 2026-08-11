import type { Metadata } from "next";

import { HeroFormVariantPage } from "@/components/claim-flow";

export const metadata: Metadata = {
  title: "Proveri let | letkasni.rs",
  robots: {
    index: false,
    follow: false,
  },
};

type DisruptionValue = "delay" | "cancelled" | "other";

function parseIssue(value: string | string[] | undefined): DisruptionValue | null {
  return value === "delay" || value === "cancelled" || value === "other"
    ? value
    : null;
}

export default async function CheckFlightPage({
  searchParams,
}: {
  searchParams: Promise<{
    step?: string | string[];
    issue?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const initialIssue = parseIssue(params.issue);
  const startsAtStepTwo = params.step === "2" && initialIssue !== null;

  return (
    <HeroFormVariantPage
      variant="focused"
      locale="sr"
      initialStep={startsAtStepTwo ? 2 : 1}
      initialIssue={initialIssue}
    />
  );
}
