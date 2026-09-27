// Ikonice nove verzije sajta iz dva SVG spritea (public/lk, npm run lk:sync): „lk“ su Letkasni ikonice
// (clock, cancel, more, shield, pin, chat, plane, check-filled, logo-airplane), „ds“ su ikonice dizajn sistema
// (arrow-right, arrow-left, menu, check-circle).
const sprites = {
  lk: "/lk/assets/icons.svg",
  ds: "/lk/ds/icons.svg",
} as const;

export function LkIcon({
  name,
  set = "lk",
  className,
}: {
  name: string;
  set?: keyof typeof sprites;
  className?: string;
}) {
  return (
    <svg className={className ? `ew-icon ${className}` : "ew-icon"} aria-hidden="true">
      <use href={`${sprites[set]}#${name}`} />
    </svg>
  );
}

export function LkArrow() {
  return <LkIcon set="ds" name="arrow-right" />;
}
