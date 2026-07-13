import React from "react";

type ArtProps = { size?: number; className?: string; color?: string };

const BASE = {
  width: 80,
  height: 80,
  viewBox: "0 0 120 120",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 2,
};

function wrap(svgProps: ArtProps, children: React.ReactNode) {
  const { size = 80, className = "", color = "currentColor" } = svgProps;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className={className}
    >
      {children}
    </svg>
  );
}

export function DosaArt({ size, className, color }: ArtProps) {
  return wrap({ size, className, color }, <>
    <ellipse data-sd="1" cx="60" cy="68" rx="50" ry="22" />
    <path data-sd="1" d="M10 68 Q60 30 110 68" />
    <path data-sd="1" d="M10 68 Q60 34 110 68" />
    <circle data-sd="1" cx="30" cy="44" r="6" />
    <circle data-sd="1" cx="30" cy="44" r="2" />
    <circle data-sd="1" cx="90" cy="46" r="6" />
    <circle data-sd="1" cx="90" cy="46" r="2" />
    <circle data-sd="1" cx="56" cy="38" r="5" />
    <path data-sd="1" d="M35 52 L28 60" />
  </>);
}

export function IdliVadaArt({ size, className, color }: ArtProps) {
  return wrap({ size, className, color }, <>
    <ellipse data-sd="1" cx="50" cy="90" rx="38" ry="6" />
    <ellipse data-sd="1" cx="42" cy="78" rx="22" ry="10" />
    <ellipse data-sd="1" cx="42" cy="62" rx="22" ry="10" />
    <ellipse data-sd="1" cx="82" cy="74" rx="14" ry="14" />
    <circle data-sd="1" cx="82" cy="74" r="5" />
    <path data-sd="1" d="M38 50 Q36 42 40 34" />
    <path data-sd="1" d="M46 50 Q44 42 48 34" />
    <path data-sd="1" d="M54 50 Q52 42 56 34" />
  </>);
}

export function FilterCoffeeArt({ size, className, color }: ArtProps) {
  return wrap({ size, className, color }, <>
    <path data-sd="1" d="M48 20 L48 64 Q48 68 52 68 L68 68 Q72 68 72 64 L72 20" />
    <ellipse data-sd="1" cx="60" cy="20" rx="12" ry="4" />
    <path data-sd="1" d="M38 74 Q34 74 34 80 L34 90 Q34 96 40 96 L80 96 Q86 96 86 90 L86 80 Q86 74 82 74" />
    <ellipse data-sd="1" cx="60" cy="74" rx="24" ry="5" />
    <path data-sd="1" d="M52 10 Q50 2 54 -2" />
    <path data-sd="1" d="M60 10 Q58 2 62 -2" />
    <path data-sd="1" d="M68 10 Q66 2 70 -2" />
    <path data-sd="1" d="M72 56 L78 52 Q82 50 82 54 L82 62 Q82 66 78 64 L72 60" />
  </>);
}

export function BananaLeafMealArt({ size, className, color }: ArtProps) {
  return wrap({ size, className, color }, <>
    <path data-sd="1" d="M60 12 Q10 30 10 65 Q10 100 60 108 Q110 100 110 65 Q110 30 60 12 Z" />
    <path data-sd="1" d="M60 12 L60 108" />
    <ellipse data-sd="1" cx="60" cy="56" rx="16" ry="14" />
    <circle data-sd="1" cx="34" cy="52" r="7" />
    <circle data-sd="1" cx="86" cy="52" r="7" />
    <circle data-sd="1" cx="40" cy="78" r="6" />
    <circle data-sd="1" cx="80" cy="78" r="6" />
    <path data-sd="1" d="M20 40 Q14 40 12 44 Q10 48 14 50" />
  </>);
}

export function AppamArt({ size, className, color }: ArtProps) {
  return wrap({ size, className, color }, <>
    <path data-sd="1" d="M20 80 Q20 50 60 42 Q100 50 100 80" />
    <ellipse data-sd="1" cx="60" cy="80" rx="40" ry="12" />
    <path data-sd="1" d="M30 74 Q60 66 90 74" />
    <path data-sd="1" d="M36 70 Q60 64 84 70" />
    <path data-sd="1" d="M42 66 Q60 60 78 66" />
    <circle data-sd="1" cx="98" cy="50" r="10" />
    <circle data-sd="1" cx="98" cy="50" r="4" />
    <path data-sd="1" d="M40 52 L38 46" />
    <path data-sd="1" d="M80 52 L82 46" />
  </>);
}

export const DISH_NAMES = ['dosa', 'idliVada', 'filterCoffee', 'bananaLeafMeal', 'appam'] as const;
export type DishName = (typeof DISH_NAMES)[number];

const DISH_MAP = {
  dosa: DosaArt,
  idliVada: IdliVadaArt,
  filterCoffee: FilterCoffeeArt,
  bananaLeafMeal: BananaLeafMealArt,
  appam: AppamArt,
} as const;

export function DishArt({
  name,
  size = 80,
  className = "",
  color = "currentColor",
}: {
  name: DishName;
  size?: number;
  className?: string;
  color?: string;
}) {
  const Component = DISH_MAP[name];
  return <Component size={size} className={className} color={color} />;
}
