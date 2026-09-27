import Link from "next/link";

/** Kartica teksta (v2 lk-content-card): oznaka, naslov sa linkom, uvod, datum i vreme čitanja, link. */
export function LkContentCard({
  badge,
  title,
  href,
  excerpt,
  date,
  dateTime,
  readTime,
  readLabel,
  data,
}: {
  badge: string;
  title: string;
  href: string;
  excerpt: string;
  date?: string;
  dateTime?: string;
  readTime?: string;
  readLabel: string;
  /** data-* atributi za filtriranje na blogu (kao na originalu: data-article, data-group, data-search). */
  data?: Record<`data-${string}`, string>;
}) {
  return (
    <article className="lk-ui-card lk-content-card" {...data}>
      <div className="lk-ui-card-body">
        <span className="lk-ui-badge">{badge}</span>
        <h2>
          <Link href={href}>{title}</Link>
        </h2>
        <p>{excerpt}</p>
        {date || readTime ? (
          <div className="lk-card-meta">
            {date ? <time dateTime={dateTime}>{date}</time> : null}
            {readTime ? <span>{readTime}</span> : null}
          </div>
        ) : null}
        <Link className="lk-ui-link" href={href}>
          {readLabel}
        </Link>
      </div>
    </article>
  );
}
