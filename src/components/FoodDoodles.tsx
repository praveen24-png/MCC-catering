interface DoodleProps {
  size?: number;
  className?: string;
  color?: string;
}

export function BananaLeaf({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="50" cy="52" rx="42" ry="28" />
      <line x1="50" y1="24" x2="50" y2="80" />
      <path d="M50 35 Q35 30 25 38" />
      <path d="M50 35 Q65 30 75 38" />
      <path d="M50 50 Q30 44 18 52" />
      <path d="M50 50 Q70 44 82 52" />
      <path d="M50 65 Q38 60 28 66" />
      <path d="M50 65 Q62 60 72 66" />
      <circle cx="35" cy="48" r="4" />
      <circle cx="50" cy="45" r="3" />
      <circle cx="65" cy="50" r="3.5" />
      <path d="M42 62 Q50 58 58 62" />
    </svg>
  );
}

export function Dosa({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="50" cy="55" rx="40" ry="22" />
      <ellipse cx="50" cy="55" rx="32" ry="17" />
      <path d="M50 38 Q30 42 22 55" />
      <path d="M50 38 Q70 42 78 55" />
      <path d="M35 52 Q42 48 50 50" />
      <path d="M50 50 Q58 48 65 52" />
      <path d="M40 58 Q50 55 60 58" />
      <path d="M30 54 L32 50" />
      <path d="M45 46 L47 43" />
      <path d="M60 47 L62 44" />
      <path d="M70 53 L72 50" />
    </svg>
  );
}

export function Idli({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="38" cy="68" rx="20" ry="10" />
      <ellipse cx="38" cy="62" rx="20" ry="10" />
      <ellipse cx="38" cy="56" rx="18" ry="9" />
      <path d="M68 55 Q75 50 82 55 Q85 62 78 67 Q72 72 65 67 Q62 60 68 55Z" />
      <path d="M73 58 Q76 56 78 58" />
      <path d="M72 62 Q75 60 77 62" />
      <path d="M38 48 Q38 44 40 40" />
      <path d="M40 40 Q39 37 41 34" />
      <path d="M43 48 Q43 44 45 40" />
      <path d="M45 40 Q44 37 46 34" />
    </svg>
  );
}

export function Biryani({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M25 65 Q25 45 30 40 Q35 35 50 35 Q65 35 70 40 Q75 45 75 65" />
      <ellipse cx="50" cy="65" rx="25" ry="8" />
      <path d="M28 65 Q50 72 72 65" />
      <line x1="50" y1="35" x2="50" y2="28" />
      <path d="M50 28 Q48 24 50 20" />
      <path d="M44 30 Q42 25 44 20" />
      <path d="M56 30 Q58 25 56 20" />
      <path d="M38 42 L40 38" />
      <path d="M60 40 L62 36" />
      <path d="M48 44 L48 40" />
      <path d="M20 68 L15 72" />
      <path d="M80 68 L85 72" />
    </svg>
  );
}

export function Samosa({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M50 20 L25 75 L75 75 Z" />
      <path d="M35 48 Q50 42 65 48" />
      <path d="M30 62 Q50 56 70 62" />
      <path d="M42 35 Q44 32 46 35" />
      <path d="M52 33 Q54 30 56 33" />
      <path d="M48 25 Q49 22 50 25" />
      <path d="M38 55 Q40 52 42 55" />
      <path d="M55 53 Q57 50 59 53" />
      <path d="M45 65 Q47 62 49 65" />
    </svg>
  );
}

export function Chai({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M30 35 L35 80 L65 80 L70 35" />
      <ellipse cx="50" cy="35" rx="20" ry="6" />
      <ellipse cx="50" cy="80" rx="15" ry="4" />
      <path d="M40 42 Q50 45 60 42" />
      <path d="M70 50 Q82 48 85 55 Q85 65 72 65" />
      <path d="M45 26 Q44 20 46 16" />
      <path d="M50 24 Q50 18 52 14" />
      <path d="M55 26 Q56 20 58 16" />
    </svg>
  );
}

export function Laddu({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="50" cy="50" r="28" />
      <circle cx="50" cy="50" r="22" />
      <path d="M38 40 Q50 35 62 40" />
      <path d="M35 50 Q50 45 65 50" />
      <path d="M38 60 Q50 55 62 60" />
      <circle cx="50" cy="22" r="3" />
      <path d="M50 22 L50 16" />
      <path d="M47 18 Q50 14 53 18" />
      <path d="M44 38 Q46 36 48 38" />
      <path d="M55 36 Q57 34 59 36" />
    </svg>
  );
}

export function Tumbler({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M32 30 L36 82 L64 82 L68 30" />
      <ellipse cx="50" cy="30" rx="18" ry="5" />
      <ellipse cx="50" cy="82" rx="14" ry="4" />
      <path d="M34 42 L66 42" />
      <path d="M35 55 L65 55" />
      <path d="M36 68 L64 68" />
      <ellipse cx="50" cy="52" rx="22" ry="16" />
      <ellipse cx="50" cy="52" rx="18" ry="12" />
      <path d="M32 52 L25 52" />
      <path d="M68 52 L75 52" />
      <path d="M72 44 Q78 44 78 50" />
    </svg>
  );
}

export function CurryLeaf({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M50 85 Q50 50 50 20" />
      <path d="M50 70 Q38 62 32 55 Q30 48 38 45 Q45 42 50 50" />
      <path d="M50 70 Q62 62 68 55 Q70 48 62 45 Q55 42 50 50" />
      <path d="M50 55 Q40 47 35 40 Q33 33 40 30 Q46 28 50 35" />
      <path d="M50 55 Q60 47 65 40 Q67 33 60 30 Q54 28 50 35" />
      <path d="M50 40 Q42 33 38 26 Q36 20 42 18 Q47 16 50 22" />
      <path d="M50 40 Q58 33 62 26 Q64 20 58 18 Q53 16 50 22" />
    </svg>
  );
}

export function Spice({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M50 15 L58 38 L82 38 L63 53 L70 78 L50 63 L30 78 L37 53 L18 38 L42 38 Z" />
      <circle cx="50" cy="46" r="8" />
      <circle cx="50" cy="46" r="4" />
      <path d="M50 38 L50 34" />
      <path d="M50 58 L50 62" />
      <path d="M42 46 L38 46" />
      <path d="M58 46 L62 46" />
    </svg>
  );
}

export function OilLamp({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M40 78 L35 85 L65 85 L60 78" />
      <path d="M35 85 Q50 90 65 85" />
      <ellipse cx="50" cy="78" rx="18" ry="5" />
      <path d="M32 70 Q32 65 35 62 L35 55 Q35 50 40 48 L42 46" />
      <path d="M68 70 Q68 65 65 62 L65 55 Q65 50 60 48 L58 46" />
      <path d="M42 46 Q46 42 50 44 Q54 42 58 46" />
      <path d="M50 44 Q50 38 52 34 Q54 30 50 26 Q46 30 48 34 Q50 38 50 44" />
      <path d="M47 30 Q44 26 46 22 Q48 18 50 16" />
      <path d="M53 30 Q56 26 54 22 Q52 18 50 16" />
      <circle cx="50" cy="26" r="2" />
    </svg>
  );
}

export function Rangoli({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="50" cy="50" r="8" />
      <circle cx="50" cy="50" r="4" />
      <path d="M50 42 Q60 30 50 18 Q40 30 50 42" />
      <path d="M50 58 Q60 70 50 82 Q40 70 50 58" />
      <path d="M42 50 Q30 40 18 50 Q30 60 42 50" />
      <path d="M58 50 Q70 40 82 50 Q70 60 58 50" />
      <path d="M44 44 Q34 34 24 28 Q34 24 44 34" />
      <path d="M56 44 Q66 34 76 28 Q66 24 56 34" />
      <path d="M44 56 Q34 66 24 72 Q34 76 44 66" />
      <path d="M56 56 Q66 66 76 72 Q66 76 56 66" />
      <circle cx="50" cy="18" r="2" />
      <circle cx="50" cy="82" r="2" />
      <circle cx="18" cy="50" r="2" />
      <circle cx="82" cy="50" r="2" />
    </svg>
  );
}

export function Garland({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 25 Q30 15 50 20 Q70 15 85 25" />
      <path d="M10 30 Q25 60 20 85" />
      <path d="M90 30 Q75 60 80 85" />
      <circle cx="20" cy="35" r="5" />
      <circle cx="30" cy="28" r="5" />
      <circle cx="42" cy="24" r="5" />
      <circle cx="55" cy="22" r="5" />
      <circle cx="68" cy="24" r="5" />
      <circle cx="80" cy="28" r="5" />
      <circle cx="15" cy="50" r="5" />
      <circle cx="85" cy="50" r="5" />
      <circle cx="14" cy="65" r="5" />
      <circle cx="86" cy="65" r="5" />
      <circle cx="16" cy="80" r="4" />
      <circle cx="84" cy="80" r="4" />
      <path d="M18 35 L16 30" />
      <path d="M32 28 L30 23" />
    </svg>
  );
}

export function Pot({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M30 35 Q28 55 30 70 Q32 80 50 82 Q68 80 70 70 Q72 55 70 35" />
      <ellipse cx="50" cy="35" rx="20" ry="7" />
      <ellipse cx="50" cy="82" rx="18" ry="5" />
      <path d="M30 50 Q50 55 70 50" />
      <path d="M30 65 Q50 70 70 65" />
      <path d="M38 35 L38 28 Q38 25 42 25" />
      <path d="M62 35 L62 28 Q62 25 58 25" />
      <path d="M42 25 Q50 22 58 25" />
    </svg>
  );
}

export function Banana({
  size = 40,
  className = "",
  color = "currentColor",
}: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M45 20 Q30 30 25 55 Q22 70 30 80" />
      <path d="M45 20 Q32 32 28 55 Q26 68 33 78" />
      <path d="M55 20 Q70 30 75 55 Q78 70 70 80" />
      <path d="M55 20 Q68 32 72 55 Q74 68 67 78" />
      <path d="M45 20 Q50 16 55 20" />
      <path d="M50 16 L50 10" />
      <path d="M50 10 Q45 8 42 10" />
      <path d="M45 22 Q44 30 42 40" />
      <path d="M55 22 Q56 30 58 40" />
    </svg>
  );
}

const DOODLE_MAP: Record<string, React.FC<DoodleProps>> = {
  BananaLeaf,
  Dosa,
  Idli,
  Biryani,
  Samosa,
  Chai,
  Laddu,
  Tumbler,
  CurryLeaf,
  Spice,
  OilLamp,
  Rangoli,
  Garland,
  Pot,
  Banana,
};

export const FOOD_DOODLE_NAMES = Object.keys(DOODLE_MAP) as (keyof typeof DOODLE_MAP)[];

interface FoodDoodleProps extends DoodleProps {
  name: string;
}

export function FoodDoodle({ name, ...props }: FoodDoodleProps) {
  const Component = DOODLE_MAP[name];
  if (!Component) {
    return null;
  }
  return <Component {...props} />;
}
