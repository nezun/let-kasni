"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";

import { adresaForme, idiNaFormu } from "@/components/claim-start-card";
import type { LkCopy } from "@/components/lk-v2/copy";
import { LkArrow, LkIcon } from "@/components/lk-v2/lk-icon";
import { lkPaths, type LkLocale } from "@/components/lk-v2/lk-paths";
import { trackEvent } from "@/lib/analytics";
import { getMetaEventId, trackMetaEvent } from "@/lib/meta";

type Problem = "delay" | "cancelled" | "other";

const problems: ReadonlyArray<{ value: Problem; icon: string }> = [
  { value: "delay", icon: "clock" },
  { value: "cancelled", icon: "cancel" },
  { value: "other", icon: "more" },
];

const isProblem = (value: unknown): value is Problem => problems.some((problem) => problem.value === value);

/**
 * Kartica „Besplatna provera“ u heroju (blok letkasni-v2/hero). Kao na originalu, ovde se bira samo problem; forma u
 * koracima živi u aplikaciji za prijave, pa se sa izborom prelazi tamo (idiNaFormu), uz ista merenja kao dosadašnja
 * kartica (begin_checkout / InitiateCheckout, hero_card_cta). Bez JavaScripta forma ide na isti URL kao običan GET.
 */
export function LkIssueForm({ locale, t }: { locale: LkLocale; t: LkCopy["hero"] }) {
  const [error, setError] = useState(false);
  const first = useRef<HTMLInputElement>(null);
  const paths = lkPaths(locale);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issue = new FormData(event.currentTarget).get("issue");
    if (!isProblem(issue)) {
      setError(true);
      first.current?.focus();
      return;
    }
    trackEvent("begin_checkout", {
      event_category: "claim",
      event_label: "hero_card_cta",
      form_locale: locale,
      issue_type: issue,
    });
    trackMetaEvent(
      "InitiateCheckout",
      {
        content_name: "flight_compensation_claim",
        content_category: "claim",
        form_locale: locale,
        issue_type: issue,
      },
      getMetaEventId(),
    );
    idiNaFormu(locale, issue);
  }

  return (
    <div className="ew-card lk-claim-card" id="proveri-let">
      <div className="lk-form-intro">
        <span className="ew-badge">{t.formBadge}</span>
        <LkIcon name="shield" />
      </div>
      <section data-lk-step="issue" aria-labelledby="lk-issue-title">
        <h2 id="lk-issue-title" tabIndex={-1}>
          {t.question}
        </h2>
        <form
          id="lk-issue-form"
          action={adresaForme(locale).split("?")[0]}
          method="get"
          noValidate
          onSubmit={submit}
          onChange={() => setError(false)}
        >
          <fieldset className="ew-fieldset">
            <legend className="ew-sr-only">{t.legend}</legend>
            {problems.map((problem, index) => (
              <label key={problem.value} className="ew-choice lk-choice">
                <span className="lk-choice-icon">
                  <LkIcon name={problem.icon} />
                </span>
                <span className="lk-choice-copy">
                  {t.issues[index].label}
                  {t.issues[index].note ? (
                    <>
                      {" "}
                      <small>{t.issues[index].note}</small>
                    </>
                  ) : null}
                </span>
                <input
                  ref={index === 0 ? first : undefined}
                  id={`lk-issue-${index}`}
                  type="radio"
                  name="issue"
                  value={problem.value}
                  aria-describedby="lk-issue-error"
                />
              </label>
            ))}
          </fieldset>
          <p className="ew-error" id="lk-issue-error" role="alert" hidden={!error}>
            {t.error}
          </p>
          <button className="ew-button lk-form-action" type="submit">
            {t.button} <LkArrow />
          </button>
          <input type="hidden" name="step" value="2" />
        </form>
      </section>
      <div className="lk-v2-form-trust">
        <ul className="lk-proof">
          {t.proof.map((item) => (
            <li key={item}>
              <LkIcon name="check-filled" className="lk-check" />
              {item}
            </li>
          ))}
        </ul>
        <p className="lk-promo-note">
          {t.promoNote} <Link href={paths.terms}>{t.promoLink}</Link>
        </p>
      </div>
    </div>
  );
}
