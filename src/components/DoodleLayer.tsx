import { useRef, useEffect, useMemo } from "react";
import { useParallax } from "@/hooks/useParallax";
import { useDrawOnScroll } from "@/hooks/useDrawOnScroll";
import "./DoodleLayer.css";

/* ------------------------------------------------------------------ */
/*  14 hand-drawn inline SVG doodles — stroke-only, round caps        */
/* ------------------------------------------------------------------ */

const BananaLeaf = () => (
  <svg viewBox="0 0 120 60" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,30 Q30,8 60,5 Q90,8 110,30 Q90,52 60,55 Q30,52 10,30Z" strokeWidth="1.5" />
    <path d="M10,30 L110,30" strokeWidth="1" />
    <path d="M35,30 Q38,18 50,12" strokeWidth="1" />
    <path d="M35,30 Q38,42 50,48" strokeWidth="1" />
    <path d="M60,30 Q62,16 72,10" strokeWidth="1" />
    <path d="M60,30 Q62,44 72,50" strokeWidth="1" />
    <path d="M85,30 Q87,20 95,15" strokeWidth="1" />
    <path d="M85,30 Q87,40 95,45" strokeWidth="1" />
  </svg>
);

const IdliPlate = () => (
  <svg viewBox="0 0 80 80" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="40" cy="42" rx="35" ry="28" strokeWidth="1.5" />
    <circle cx="28" cy="36" r="10" strokeWidth="1.2" />
    <circle cx="52" cy="36" r="10" strokeWidth="1.2" />
    <circle cx="40" cy="52" r="9" strokeWidth="1.2" />
  </svg>
);

const Dosa = () => (
  <svg viewBox="0 0 100 60" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="50" cy="35" rx="40" ry="20" strokeWidth="1.5" />
    <path d="M50,15 Q55,5 65,8 Q75,12 72,22 Q68,30 50,15Z" strokeWidth="1.2" />
    <circle cx="80" cy="42" r="6" strokeWidth="1.2" />
  </svg>
);

const Vada = () => (
  <svg viewBox="0 0 70 70" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="35" cy="35" r="22" strokeWidth="1.5" />
    <circle cx="35" cy="35" r="8" strokeWidth="1.2" />
  </svg>
);

const FilterCoffee = () => (
  <svg viewBox="0 0 60 80" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="25" cy="65" rx="20" ry="5" strokeWidth="1.2" />
    <path d="M10,65 L10,30 Q10,20 20,18 L30,16 Q40,14 40,24 L40,65" strokeWidth="1.5" />
    <path d="M40,40 Q55,38 55,50 Q55,58 40,55" strokeWidth="1.2" />
    <path d="M18,10 Q20,4 22,10" strokeWidth="1" />
    <path d="M25,8 Q27,2 29,8" strokeWidth="1" />
  </svg>
);

const PayasamBowl = () => (
  <svg viewBox="0 0 80 60" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,25 Q10,55 40,55 Q70,55 70,25" strokeWidth="1.5" />
    <line x1="10" y1="25" x2="70" y2="25" strokeWidth="1.5" />
    <path d="M25,20 Q27,12 30,20" strokeWidth="1" />
    <path d="M38,18 Q40,10 42,18" strokeWidth="1" />
    <path d="M52,20 Q54,12 56,20" strokeWidth="1" />
  </svg>
);

const BiryaniPot = () => (
  <svg viewBox="0 0 70 90" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15,35 Q15,80 35,80 Q55,80 55,35" strokeWidth="1.5" />
    <path d="M15,35 L55,35" strokeWidth="1.5" />
    <path d="M20,35 Q20,10 35,5 Q50,10 50,35" strokeWidth="1.2" />
    <ellipse cx="35" cy="5" rx="5" ry="3" strokeWidth="1" />
    <path d="M28,5 L28,0 Q35,-2 42,0 L42,5" strokeWidth="1" />
  </svg>
);

const Murukku = () => (
  <svg viewBox="0 0 60 60" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M30,5 Q50,15 45,30 Q40,45 30,55 Q20,45 15,30 Q10,15 30,5Z" strokeWidth="1.5" />
    <path d="M30,12 Q40,18 38,28 Q36,38 30,45 Q24,38 22,28 Q20,18 30,12Z" strokeWidth="1" />
  </svg>
);

const SambarLadle = () => (
  <svg viewBox="0 0 50 90" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M25,10 L25,55" strokeWidth="1.5" />
    <ellipse cx="25" cy="68" rx="15" ry="12" strokeWidth="1.5" />
    <path d="M25,62 L25,68" strokeWidth="1" />
  </svg>
);

const Jackfruit = () => (
  <svg viewBox="0 0 50 80" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M25,10 Q10,25 8,45 Q6,65 25,75 Q44,65 42,45 Q40,25 25,10Z" strokeWidth="1.5" />
    <path d="M25,10 L25,5" strokeWidth="1.5" />
    <path d="M18,30 Q25,35 32,30" strokeWidth="1" />
    <path d="M14,45 Q25,50 36,45" strokeWidth="1" />
    <path d="M18,58 Q25,63 32,58" strokeWidth="1" />
  </svg>
);

const Gopuram = () => (
  <svg viewBox="0 0 60 100" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15,95 L15,40 L20,35 L25,30 L30,5 L35,30 L40,35 L45,40 L45,95" strokeWidth="1.5" />
    <line x1="15" y1="55" x2="45" y2="55" strokeWidth="1" />
    <line x1="15" y1="70" x2="45" y2="70" strokeWidth="1" />
    <line x1="15" y1="85" x2="45" y2="85" strokeWidth="1" />
    <path d="M25,55 L25,70" strokeWidth="1" />
    <path d="M35,55 L35,70" strokeWidth="1" />
    <circle cx="30" cy="5" r="2" strokeWidth="1" />
  </svg>
);

const Lighthouse = () => (
  <svg viewBox="0 0 50 100" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20,95 L22,35 L28,35 L30,95" strokeWidth="1.5" />
    <path d="M18,35 L25,15 L32,35" strokeWidth="1.5" />
    <circle cx="25" cy="15" r="3" strokeWidth="1" />
    <line x1="20" y1="45" x2="30" y2="45" strokeWidth="1" />
    <line x1="20" y1="55" x2="30" y2="55" strokeWidth="1" />
    <line x1="20" y1="65" x2="30" y2="65" strokeWidth="1" />
    <line x1="20" y1="75" x2="30" y2="75" strokeWidth="1" />
    <path d="M23,8 L25,2 L27,8" strokeWidth="1" />
  </svg>
);

const AutoRickshaw = () => (
  <svg viewBox="0 0 100 60" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15,45 L15,25 Q15,15 25,12 L55,10 Q60,10 60,15 L60,45" strokeWidth="1.5" />
    <path d="M60,20 L85,20 L90,35 L90,45" strokeWidth="1.5" />
    <circle cx="22" cy="50" r="7" strokeWidth="1.5" />
    <circle cx="78" cy="50" r="7" strokeWidth="1.5" />
    <line x1="15" y1="25" x2="55" y2="25" strokeWidth="1" />
    <path d="M35,25 L35,10" strokeWidth="1" />
  </svg>
);

const KolamPattern = () => (
  <svg viewBox="0 0 70 70" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="35" cy="35" r="28" strokeWidth="1" />
    <path d="M35,7 Q55,20 55,35 Q55,50 35,63 Q15,50 15,35 Q15,20 35,7Z" strokeWidth="1.5" />
    <path d="M35,15 Q45,25 45,35 Q45,45 35,55 Q25,45 25,35 Q25,25 35,15Z" strokeWidth="1" />
    <circle cx="35" cy="35" r="5" strokeWidth="1" />
    <circle cx="35" cy="7" r="2" strokeWidth="1" />
    <circle cx="35" cy="63" r="2" strokeWidth="1" />
    <circle cx="7" cy="35" r="2" strokeWidth="1" />
    <circle cx="63" cy="35" r="2" strokeWidth="1" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  LINE-MAN DOODLES — stick-figure humans, stroke-only               */
/* ------------------------------------------------------------------ */

const LineManChef = () => (
  <svg viewBox="0 0 60 100" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="30" cy="12" r="8" strokeWidth="1.5" />
    <path d="M22,8 Q30,2 38,8" strokeWidth="1.2" />
    <path d="M20,6 Q30,-1 40,6" strokeWidth="1" />
    <path d="M30,20 L30,58" strokeWidth="1.5" />
    <path d="M30,30 L15,48" strokeWidth="1.3" />
    <path d="M30,30 L48,42" strokeWidth="1.3" />
    <path d="M48,42 L52,38" strokeWidth="1" />
    <path d="M15,48 L10,52" strokeWidth="1" />
    <path d="M30,58 L18,82" strokeWidth="1.3" />
    <path d="M30,58 L42,82" strokeWidth="1.3" />
    <path d="M18,82 L14,88" strokeWidth="1" />
    <path d="M42,82 L46,88" strokeWidth="1" />
  </svg>
);

const LineManServer = () => (
  <svg viewBox="0 0 60 100" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="28" cy="12" r="8" strokeWidth="1.5" />
    <path d="M28,20 L28,56" strokeWidth="1.5" />
    <path d="M28,30 L12,22" strokeWidth="1.3" />
    <path d="M28,30 L44,20" strokeWidth="1.3" />
    <path d="M44,20 L56,14" strokeWidth="1.3" />
    <path d="M56,14 L56,10 L44,10 L44,14" strokeWidth="1" />
    <path d="M12,22 L6,26" strokeWidth="1" />
    <path d="M28,56 L16,82" strokeWidth="1.3" />
    <path d="M28,56 L40,82" strokeWidth="1.3" />
    <path d="M16,82 L14,88" strokeWidth="1" />
    <path d="M40,82 L42,88" strokeWidth="1" />
  </svg>
);

const LineManCarrying = () => (
  <svg viewBox="0 0 70 100" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="35" cy="12" r="8" strokeWidth="1.5" />
    <path d="M35,20 L35,58" strokeWidth="1.5" />
    <path d="M35,30 L18,20" strokeWidth="1.3" />
    <path d="M35,30 L52,20" strokeWidth="1.3" />
    <path d="M18,20 L10,18" strokeWidth="1.3" />
    <path d="M52,20 L60,18" strokeWidth="1.3" />
    <path d="M6,14 Q10,12 14,14 Q18,16 22,14 L22,18 L6,18 Z" strokeWidth="1.2" />
    <path d="M48,14 Q52,12 56,14 Q60,16 64,14 L64,18 L48,18 Z" strokeWidth="1.2" />
    <path d="M35,58 L22,82" strokeWidth="1.3" />
    <path d="M35,58 L48,82" strokeWidth="1.3" />
    <path d="M22,82 L20,88" strokeWidth="1" />
    <path d="M48,82 L50,88" strokeWidth="1" />
  </svg>
);

const LineManDancer = () => (
  <svg viewBox="0 0 60 100" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="30" cy="12" r="8" strokeWidth="1.5" />
    <path d="M30,20 L30,56" strokeWidth="1.5" />
    <path d="M30,30 L10,18" strokeWidth="1.3" />
    <path d="M10,18 L6,12" strokeWidth="1" />
    <path d="M30,30 L52,42" strokeWidth="1.3" />
    <path d="M52,42 L56,48" strokeWidth="1" />
    <path d="M30,56 L14,80" strokeWidth="1.3" />
    <path d="M14,80 L10,88" strokeWidth="1" />
    <path d="M30,56 L48,72" strokeWidth="1.3" />
    <path d="M48,72 L52,80" strokeWidth="1.3" />
    <path d="M52,80 L54,88" strokeWidth="1" />
    <path d="M24,8 Q30,4 36,8" strokeWidth="1" />
  </svg>
);

const LineManAutoDriver = () => (
  <svg viewBox="0 0 70 100" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="30" cy="14" r="8" strokeWidth="1.5" />
    <path d="M30,22 L30,58" strokeWidth="1.5" />
    <path d="M30,34 L48,44" strokeWidth="1.3" />
    <path d="M48,44 L52,52" strokeWidth="1" />
    <path d="M30,34 L16,26" strokeWidth="1.3" />
    <path d="M16,26 L12,30" strokeWidth="1" />
    <path d="M12,30 L12,52" strokeWidth="1.3" />
    <path d="M12,52 L8,56" strokeWidth="1" />
    <path d="M30,58 L18,82" strokeWidth="1.3" />
    <path d="M30,58 L42,82" strokeWidth="1.3" />
    <path d="M18,82 L16,88" strokeWidth="1" />
    <path d="M42,82 L44,88" strokeWidth="1" />
  </svg>
);

const LineManGuest = () => (
  <svg viewBox="0 0 50 100" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="25" cy="12" r="8" strokeWidth="1.5" />
    <path d="M25,20 L25,56" strokeWidth="1.5" />
    <path d="M25,32 L10,46" strokeWidth="1.3" />
    <path d="M25,32 L40,46" strokeWidth="1.3" />
    <path d="M10,46 L8,50" strokeWidth="1" />
    <path d="M40,46 L42,50" strokeWidth="1" />
    <path d="M25,56 L14,82" strokeWidth="1.3" />
    <path d="M25,56 L36,82" strokeWidth="1.3" />
    <path d="M14,82 L12,88" strokeWidth="1" />
    <path d="M36,82 L38,88" strokeWidth="1" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Doodle registry with category + parallax speed                    */
/* ------------------------------------------------------------------ */

interface DoodleDef {
  id: string;
  component: React.FC;
  category: "food" | "chennai" | "people";
  speed: number;
}

const DOODLE_REGISTRY: DoodleDef[] = [
  { id: "banana-leaf", component: BananaLeaf, category: "food", speed: 0.15 },
  { id: "idli-plate", component: IdliPlate, category: "food", speed: 0.25 },
  { id: "dosa", component: Dosa, category: "food", speed: 0.12 },
  { id: "vada", component: Vada, category: "food", speed: 0.3 },
  { id: "filter-coffee", component: FilterCoffee, category: "food", speed: 0.2 },
  { id: "payasam", component: PayasamBowl, category: "food", speed: 0.35 },
  { id: "biryani-pot", component: BiryaniPot, category: "food", speed: 0.18 },
  { id: "murukku", component: Murukku, category: "food", speed: 0.28 },
  { id: "sambar-ladle", component: SambarLadle, category: "food", speed: 0.22 },
  { id: "jackfruit", component: Jackfruit, category: "food", speed: 0.4 },
  { id: "gopuram", component: Gopuram, category: "chennai", speed: 0.1 },
  { id: "lighthouse", component: Lighthouse, category: "chennai", speed: 0.14 },
  { id: "auto", component: AutoRickshaw, category: "chennai", speed: 0.32 },
  { id: "kolam", component: KolamPattern, category: "chennai", speed: 0.08 },
  { id: "man-chef", component: LineManChef, category: "people", speed: 0.2 },
  { id: "man-server", component: LineManServer, category: "people", speed: 0.26 },
  { id: "man-carrying", component: LineManCarrying, category: "people", speed: 0.18 },
  { id: "man-dancer", component: LineManDancer, category: "people", speed: 0.34 },
  { id: "man-auto", component: LineManAutoDriver, category: "people", speed: 0.22 },
  { id: "man-guest", component: LineManGuest, category: "people", speed: 0.3 },
];

/* ------------------------------------------------------------------ */
/*  Section → category mapping for section-specific doodles            */
/* ------------------------------------------------------------------ */

type SectionKey = "hero" | "about" | "menu" | "services" | "gallery" | "contact" | "default";

const SECTION_CATEGORIES: Record<SectionKey, { food: number; chennai: number; people: number }> = {
  hero: { food: 2, chennai: 3, people: 2 },
  about: { food: 2, chennai: 3, people: 2 },
  menu: { food: 5, chennai: 0, people: 3 },
  services: { food: 3, chennai: 2, people: 3 },
  gallery: { food: 3, chennai: 2, people: 2 },
  contact: { food: 2, chennai: 2, people: 2 },
  default: { food: 3, chennai: 2, people: 2 },
};

/* ------------------------------------------------------------------ */
/*  Seeded random for consistent doodle placement                      */
/* ------------------------------------------------------------------ */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface DoodleLayerProps {
  section?: SectionKey;
  blendOverride?: "multiply" | "soft-light";
  className?: string;
}

interface PlacedDoodle {
  def: DoodleDef;
  top: string;
  left: string;
  rotation: string;
  scale: string;
  opacity: string;
  blend: string;
  width: string;
}

export function DoodleLayer({
  section = "default",
  blendOverride,
  className = "",
}: DoodleLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counts = SECTION_CATEGORIES[section] ?? SECTION_CATEGORIES.default;

  const placed = useMemo(() => {
    const pool: DoodleDef[] = [];
    const foods = DOODLE_REGISTRY.filter((d) => d.category === "food");
    const chennais = DOODLE_REGISTRY.filter((d) => d.category === "chennai");
    const peoples = DOODLE_REGISTRY.filter((d) => d.category === "people");

    for (let i = 0; i < counts.food; i++) pool.push(foods[i % foods.length]);
    for (let i = 0; i < counts.chennai; i++) pool.push(chennais[i % chennais.length]);
    for (let i = 0; i < counts.people; i++) pool.push(peoples[i % peoples.length]);

    const seed = section.split("").reduce((a, c) => a + c.charCodeAt(0), 0) * 137;
    const rand = seededRandom(seed);

    return pool.map<PlacedDoodle>((def) => {
      const isPeople = def.category === "people";
      return {
        def,
        top: `${5 + rand() * 85}%`,
        left: `${2 + rand() * 92}%`,
        rotation: `${-20 + rand() * 40}deg`,
        scale: isPeople ? `${0.9 + rand() * 0.6}` : `${0.6 + rand() * 0.8}`,
        opacity: isPeople ? `${0.25 + rand() * 0.15}` : `${0.18 + rand() * 0.12}`,
        blend: blendOverride ?? (section === "hero" ? "screen" : "multiply"),
        width: isPeople ? `${80 + rand() * 60}px` : `${60 + rand() * 80}px`,
      };
    });
  }, [section, counts, blendOverride]);

  useParallax(containerRef);
  useDrawOnScroll(containerRef);

  return (
    <div ref={containerRef} className={`doodle-layer ${className}`} aria-hidden="true">
      {placed.map((d) => (
        <span
          key={d.def.id}
          className="doodle"
          data-speed={d.def.speed}
          data-rot={d.rotation}
          data-scale={d.scale}
          style={{
            top: d.top,
            left: d.left,
            transform: `rotate(${d.rotation}) scale(${d.scale})`,
            opacity: d.opacity,
            mixBlendMode: d.blend as "multiply" | "soft-light",
            color:
              d.def.category === "food"
                ? "#8B6914"
                : d.def.category === "chennai"
                  ? "#6B4E2A"
                  : "#5C4033",
            width: d.width,
          }}
        >
          <d.def.component />
        </span>
      ))}
    </div>
  );
}

export default DoodleLayer;
