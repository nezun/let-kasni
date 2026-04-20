import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Scale,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { ClaimIntakeForm } from "@/components/claim-intake-form";

type Pair = {
  title: string;
  body: string;
};

type HeroMetric = {
  label: string;
  value: string;
};

export type VariantLandingConfig = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  chips: string[];
  heroNote: string;
  formLabel: string;
  metrics: HeroMetric[];
  trustCards: Pair[];
  stepIntro: string;
  steps: Pair[];
  valueTitle: string;
  valueLead: string;
  valuePrimary: Pair;
  valueSecondary: Pair[];
  faq: Pair[];
  closingTitle: string;
  closingBody: string;
};

function HeroIcon({ index }: { index: number }) {
  if (index === 0) {
    return <Zap className="h-7 w-7 text-brand-accent" />;
  }
  if (index === 1) {
    return <Scale className="h-7 w-7 text-brand-primary" />;
  }
  return <Banknote className="h-7 w-7 text-[var(--accent-success)]" />;
}

export function LandingVariantPage({
  config,
}: {
  config: VariantLandingConfig;
}) {
  return (
    <main className="min-h-screen bg-brand-canvas font-sans text-brand-text selection:bg-brand-primary/10 selection:text-brand-primary">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-brand-primary/6 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] h-[30%] w-[30%] rounded-full bg-brand-accent/6 blur-[100px]" />
      </div>

      <section className="bg-mesh relative overflow-hidden pb-20 pt-28 md:pb-36 md:pt-40">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mb-10 flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-lg bg-brand-primary p-1.5 shadow-lg shadow-brand-primary/15">
                <span className="font-black text-white">✈</span>
              </div>
              <span className="font-display text-2xl font-extrabold tracking-tight text-brand-primary">
                letkasni<span className="text-brand-accent">.rs</span>
              </span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="/design/top"
                className="text-sm font-medium text-brand-text transition-colors hover:text-brand-primary"
              >
                Top
              </Link>
              <Link
                href="/design/top-a"
                className="text-sm font-medium text-brand-text transition-colors hover:text-brand-primary"
              >
                Option A
              </Link>
              <Link
                href="/design/top-b"
                className="text-sm font-medium text-brand-text transition-colors hover:text-brand-primary"
              >
                Option B
              </Link>
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-6 inline-block rounded-full border border-brand-accent/20 bg-brand-accent/12 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-accent">
                {config.eyebrow}
              </span>
              <h1 className="font-display text-balance mb-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-brand-text md:text-7xl">
                {config.title}
                <br />
                <span className="text-brand-primary">{config.highlight}</span>
              </h1>
              <p className="mb-5 max-w-xl text-xl leading-relaxed text-brand-muted">
                {config.description}
              </p>
              <div className="mb-8 flex flex-wrap gap-3">
                {config.chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-sm font-semibold text-brand-text"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {config.metrics.map((metric) => (
                  <div key={metric.label} className="surface-card rounded-[1.5rem] p-5">
                    <div className="font-mono-ui mb-2 text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                      {metric.label}
                    </div>
                    <div className="font-display text-lg font-bold text-brand-text">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand-primary/10 blur-3xl" />
              <div className="surface-card rounded-[2.5rem] p-8 md:p-10">
                <div className="font-mono-ui mb-3 text-[11px] uppercase tracking-[0.22em] text-brand-muted">
                  Claim form
                </div>
                <h3 className="font-display mb-2 text-2xl font-bold text-brand-text">
                  {config.formLabel}
                </h3>
                <p className="mb-6 text-sm text-brand-muted">{config.heroNote}</p>
                <ClaimIntakeForm locale="sr" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border bg-brand-surface-alt py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {config.trustCards.map((card) => (
              <div key={card.title} className="surface-card rounded-[1.5rem] p-6">
                <div className="font-mono-ui mb-2 text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                  {card.title}
                </div>
                <p className="text-sm leading-relaxed text-brand-muted">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kako-radi" className="section-dark relative overflow-hidden py-32 text-white">
        <div className="absolute left-0 top-0 h-full w-full opacity-20 pointer-events-none">
          <div className="absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-brand-primary/20 blur-[120px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <h2 className="font-display mb-6 text-4xl font-black tracking-tight md:text-5xl">
              Kako izgleda prvi prolaz kroz slučaj
            </h2>
            <p className="text-lg text-white/68">{config.stepIntro}</p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {config.steps.map((step, index) => (
              <div key={step.title} className="relative group">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 transition-colors group-hover:bg-white/10">
                  <HeroIcon index={index} />
                </div>
                <h3 className="font-display mb-4 flex items-center gap-4 text-2xl font-bold">
                  <span className="text-4xl font-black text-brand-primary/50">
                    0{index + 1}
                  </span>
                  {step.title}
                </h3>
                <p className="text-lg leading-relaxed text-white/68">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prednosti" className="bg-brand-surface relative overflow-hidden py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="font-display mb-6 text-4xl font-black tracking-tight text-brand-text md:text-5xl">
              {config.valueTitle}
            </h2>
            <p className="text-lg text-brand-muted">{config.valueLead}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div
              className="group relative overflow-hidden rounded-[2.5rem] p-10 text-white shadow-2xl shadow-brand-primary/20 lg:col-span-2 md:p-12"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
              }}
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-colors group-hover:bg-white/20" />
              <div className="relative z-10 h-full flex-col justify-between">
                <div>
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display mb-4 text-3xl font-bold">
                    {config.valuePrimary.title}
                  </h3>
                  <p className="max-w-xl text-lg leading-relaxed text-white/80">
                    {config.valuePrimary.body}
                  </p>
                </div>
                <div className="mt-12 flex flex-wrap items-center gap-6 text-sm font-medium text-white/75">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-accent" />
                    Konzervativan preliminarni signal
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-accent" />
                    Jasan sledeći korak
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {config.valueSecondary.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[2.5rem] p-10 surface-card"
                >
                  <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-brand-accent/10 transition-transform group-hover:scale-110" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/14 transition-transform group-hover:rotate-12">
                      {index === 0 ? (
                        <Clock3 className="h-7 w-7 text-brand-accent" />
                      ) : (
                        <Scale className="h-7 w-7 text-[var(--accent-success)]" />
                      )}
                    </div>
                    <h4 className="font-display mb-3 text-xl font-bold text-brand-text">
                      {item.title}
                    </h4>
                    <p className="leading-relaxed text-brand-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-brand-border bg-brand-canvas py-32">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold text-brand-text md:text-4xl">
              Česta pitanja
            </h2>
            <p className="text-brand-muted">
              Finalni ton i trust model najbolje se vide baš ovde.
            </p>
          </div>

          <div className="space-y-4">
            {config.faq.map((faq) => (
              <details
                key={faq.title}
                className="group overflow-hidden rounded-2xl surface-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 text-lg font-bold text-brand-text">
                  {faq.title}
                  <ChevronRight className="h-5 w-5 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6 leading-relaxed text-brand-muted">
                  {faq.body}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="relative overflow-hidden rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-brand-primary/20 md:p-20"
            style={{
              background:
                "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
            }}
          >
            <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-[3rem] bg-brand-accent opacity-35" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="font-display mb-8 text-4xl font-extrabold md:text-6xl">
                {config.closingTitle}
              </h2>
              <p className="mb-12 text-xl text-white/80">{config.closingBody}</p>
              <a
                href="#claim-form"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-10 py-5 text-xl font-bold text-brand-primary shadow-xl transition-all hover:bg-[#f7f7fb]"
              >
                Pošalji slučaj sada
                <ArrowRight className="h-5 w-5 text-brand-accent" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
