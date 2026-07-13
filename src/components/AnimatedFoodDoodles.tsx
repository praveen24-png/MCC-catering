import { useRef, useEffect, useMemo } from "react";
import {
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
  Pot,
  Banana,
} from "@/components/FoodDoodles";
import "./AnimatedFoodDoodles.css";

type FoodComponent = React.FC<{
  className?: string;
  size?: number;
  color?: string;
}>;
type MotionType = "float" | "sway" | "breathe" | "drift";

type SectionKey =
  | "hero"
  | "about"
  | "menu"
  | "services"
  | "gallery"
  | "contact"
  | "builder"
  | "service-sub"
  | "default";

interface FoodDoodleDef {
  id: string;
  component: FoodComponent;
  hasSteam?: boolean;
}

interface PlacementZone {
  y: string;
  x: string;
  rot: number;
  motion: MotionType;
  duration: number;
}

interface PlacedDoodle {
  def: FoodDoodleDef;
  zone: PlacementZone;
  size: number;
  animDelay: string;
}

/* 8 corner & edge zones — center stays clear */
const ZONES: PlacementZone[] = [
  { y: "5%",  x: "3%",  rot: -15, motion: "sway",   duration: 26 },
  { y: "3%",  x: "80%", rot: 10,  motion: "float",  duration: 22 },
  { y: "75%", x: "3%",  rot: 18,  motion: "drift",  duration: 30 },
  { y: "80%", x: "82%", rot: -12, motion: "breathe", duration: 20 },
  { y: "35%", x: "1%",  rot: -8,  motion: "float",  duration: 24 },
  { y: "55%", x: "85%", rot: 12,  motion: "sway",   duration: 28 },
  { y: "2%",  x: "35%", rot: 8,   motion: "drift",  duration: 22 },
  { y: "85%", x: "40%", rot: -14, motion: "float",  duration: 26 },
];

const PAGE_DOODLES: Record<SectionKey, FoodDoodleDef[]> = {
  hero: [
    { id: "banana-leaf", component: BananaLeaf },
    { id: "dosa", component: Dosa, hasSteam: true },
    { id: "curry-leaf", component: CurryLeaf },
    { id: "spice", component: Spice },
    { id: "chai", component: Chai, hasSteam: true },
    { id: "tumbler", component: Tumbler },
    { id: "oil-lamp", component: OilLamp },
    { id: "laddu", component: Laddu },
  ],
  about: [
    { id: "banana-leaf", component: BananaLeaf },
    { id: "curry-leaf", component: CurryLeaf },
    { id: "spice", component: Spice },
    { id: "oil-lamp", component: OilLamp },
    { id: "dosa", component: Dosa, hasSteam: true },
    { id: "chai", component: Chai, hasSteam: true },
    { id: "tumbler", component: Tumbler },
    { id: "laddu", component: Laddu },
  ],
  menu: [
    { id: "dosa", component: Dosa, hasSteam: true },
    { id: "idli", component: Idli, hasSteam: true },
    { id: "biryani", component: Biryani, hasSteam: true },
    { id: "samosa", component: Samosa },
    { id: "chai", component: Chai, hasSteam: true },
    { id: "pot", component: Pot, hasSteam: true },
    { id: "laddu", component: Laddu },
    { id: "banana-leaf", component: BananaLeaf },
  ],
  services: [
    { id: "biryani", component: Biryani, hasSteam: true },
    { id: "pot", component: Pot, hasSteam: true },
    { id: "tumbler", component: Tumbler },
    { id: "banana-leaf", component: BananaLeaf },
    { id: "spice", component: Spice },
    { id: "oil-lamp", component: OilLamp },
    { id: "samosa", component: Samosa },
    { id: "chai", component: Chai, hasSteam: true },
  ],
  gallery: [
    { id: "banana-leaf", component: BananaLeaf },
    { id: "laddu", component: Laddu },
    { id: "oil-lamp", component: OilLamp },
    { id: "dosa", component: Dosa, hasSteam: true },
    { id: "biryani", component: Biryani, hasSteam: true },
    { id: "pot", component: Pot, hasSteam: true },
    { id: "chai", component: Chai, hasSteam: true },
    { id: "curry-leaf", component: CurryLeaf },
  ],
  contact: [
    { id: "chai", component: Chai, hasSteam: true },
    { id: "tumbler", component: Tumbler },
    { id: "curry-leaf", component: CurryLeaf },
    { id: "spice", component: Spice },
    { id: "banana-leaf", component: BananaLeaf },
    { id: "dosa", component: Dosa, hasSteam: true },
    { id: "oil-lamp", component: OilLamp },
    { id: "laddu", component: Laddu },
  ],
  builder: [
    { id: "dosa", component: Dosa, hasSteam: true },
    { id: "idli", component: Idli, hasSteam: true },
    { id: "laddu", component: Laddu },
    { id: "banana", component: Banana },
    { id: "chai", component: Chai, hasSteam: true },
    { id: "biryani", component: Biryani, hasSteam: true },
    { id: "spice", component: Spice },
    { id: "banana-leaf", component: BananaLeaf },
  ],
  "service-sub": [
    { id: "biryani", component: Biryani, hasSteam: true },
    { id: "samosa", component: Samosa },
    { id: "dosa", component: Dosa, hasSteam: true },
    { id: "chai", component: Chai, hasSteam: true },
    { id: "pot", component: Pot, hasSteam: true },
    { id: "tumbler", component: Tumbler },
    { id: "spice", component: Spice },
    { id: "banana-leaf", component: BananaLeaf },
  ],
  default: [
    { id: "banana-leaf", component: BananaLeaf },
    { id: "dosa", component: Dosa, hasSteam: true },
    { id: "chai", component: Chai, hasSteam: true },
    { id: "spice", component: Spice },
    { id: "laddu", component: Laddu },
    { id: "oil-lamp", component: OilLamp },
    { id: "curry-leaf", component: CurryLeaf },
    { id: "tumbler", component: Tumbler },
  ],
};

function Steam({ color }: { color: string }) {
  return (
    <div className="afd-steam" style={{ color }}>
      <div className="afd-steam-wisp" />
      <div className="afd-steam-wisp" />
      <div className="afd-steam-wisp" />
    </div>
  );
}

interface AnimatedFoodDoodlesProps {
  section?: SectionKey;
  className?: string;
  opacity?: number;
}

export function AnimatedFoodDoodles({
  section = "default",
  className = "",
  opacity = 0.45,
}: AnimatedFoodDoodlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const doodles = PAGE_DOODLES[section] ?? PAGE_DOODLES.default;

  const placed = useMemo(() => {
    return doodles.map<PlacedDoodle>((def, i) => {
      const zone = ZONES[i % ZONES.length];
      return {
        def,
        zone,
        size: 80 + ((i * 17) % 50),
        animDelay: `${i * 0.3}s`,
      };
    });
  }, [doodles]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = container.querySelectorAll<HTMLElement>(".afd-item");
    if (!items.length) return;

    items.forEach((item) => {
      const els = item.querySelectorAll<SVGGeometryElement>("path, circle, ellipse, line");
      els.forEach((el) => {
        let length: number;
        try { length = el.getTotalLength(); } catch { length = 300; }
        el.style.setProperty("--sd-length", String(length));
        el.style.strokeDasharray = String(length);
        el.style.strokeDashoffset = String(length);
      });
    });

    if (prefersReduced) {
      items.forEach((el) => {
        el.classList.add("is-visible", "is-living");
        el.querySelectorAll<SVGGeometryElement>("path, circle, ellipse, line")
          .forEach((s) => { s.style.strokeDashoffset = "0"; });
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("is-visible", "is-drawn");
            setTimeout(() => el.classList.add("is-living"), 2800);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: "150px 0px" },
    );

    items.forEach((d) => observer.observe(d));
    return () => observer.disconnect();
  }, [placed]);

  return (
    <div ref={containerRef} className={`afd-layer ${className}`} aria-hidden="true">
      {placed.map((p) => (
        <span
          key={p.def.id}
          className="afd-item"
          data-motion={p.zone.motion}
          style={
            {
              top: p.zone.y,
              left: p.zone.x,
              width: p.size,
              height: p.size,
              "--afd-rot": `${p.zone.rot}deg`,
              "--afd-duration": `${p.zone.duration}s`,
              "--afd-opacity": opacity,
              transform: `rotate(${p.zone.rot}deg)`,
              animationDelay: p.animDelay,
            } as React.CSSProperties
          }
        >
          <p.def.component size={p.size} color="#B8973A" />
          {p.def.hasSteam && <Steam color="#B8973A" />}
        </span>
      ))}
    </div>
  );
}

export default AnimatedFoodDoodles;
