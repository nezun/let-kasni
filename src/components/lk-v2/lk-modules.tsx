/* eslint-disable @next/next/no-img-element -- slike u tekstu su sa Unsplash-a (bez next/image podešavanja), kao ranije */
import type { ReactNode } from "react";

import { LkIcon } from "@/components/lk-v2/lk-icon";

/**
 * Moduli u tekstu vodiča i članaka (brza provera, tabela, koraci, lista provere, pločice, slika). Pravila sadržaja traže
 * ove module, a original ih nema, pa su složeni od v2 elemenata; stil je u src/styles/lk-v2-extra.css.
 */

export function LkModuleCard({
  dark = false,
  badge,
  title,
  className,
  children,
}: {
  dark?: boolean;
  badge?: string;
  title: string;
  className?: string;
  children?: ReactNode;
}) {
  const classes = ["lk-module", "lk-module-card", dark ? "is-dark" : "", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {badge ? <span className={dark ? "lk-ui-badge lk-ui-badge--cyan" : "lk-ui-badge"}>{badge}</span> : null}
      <h3>{title}</h3>
      {children}
    </div>
  );
}

/** Numerisani koraci (brojevi u krugu). */
export function LkModuleSteps({ items }: { items: ReadonlyArray<string> }) {
  return (
    <ol className="lk-module-steps">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

/** Lista sa kvačicama (v2 lk-feature-checks). */
export function LkModuleChecks({ items }: { items: ReadonlyArray<string> }) {
  return (
    <ul className="lk-feature-checks">
      {items.map((item) => (
        <li key={item}>
          <LkIcon name="check-filled" className="lk-check" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Pločice u mreži: oznaka, naslov i kratak tekst. */
export function LkModuleTiles({
  items,
  four = false,
}: {
  items: ReadonlyArray<{ label?: string; title: string; body: string }>;
  four?: boolean;
}) {
  return (
    <div className={four ? "lk-module-grid is-four" : "lk-module-grid"}>
      {items.map((item) => (
        <div key={item.title} className="lk-module-tile">
          {item.label ? <span className="lk-module-label">{item.label}</span> : null}
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Tabela: prva kolona je naslov reda, poslednja je istaknuta (npr. iznos). */
export function LkModuleTable({ rows }: { rows: ReadonlyArray<ReadonlyArray<string>> }) {
  return (
    <table className="lk-module-table">
      <tbody>
        {rows.map((row) => (
          <tr key={row.join("-")}>
            <th scope="row">{row[0]}</th>
            {row.slice(1).map((cell, index) => (
              <td key={`${cell}-${index}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Slika u tekstu. */
export function LkModuleFigure({ src, alt, position }: { src: string; alt: string; position?: string }) {
  return (
    <figure className="lk-module-figure">
      <img src={src} alt={alt} loading="lazy" decoding="async" style={position ? { objectPosition: position } : undefined} />
    </figure>
  );
}

/** Brza provera u tekstu: tamni baner sa dugmetom (dugme dolazi kao children, da merenje ostane na mestu poziva). */
export function LkModuleCheck({
  badge,
  title,
  body,
  children,
}: {
  badge: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <div className="lk-module lk-module-check">
      <div>
        <span className="lk-ui-badge lk-ui-badge--cyan">{badge}</span>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      {children}
    </div>
  );
}
