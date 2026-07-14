import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";
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
  Rangoli,
  Garland,
  Pot,
  Banana,
} from "@/components/FoodDoodles";

type DoodleComponent = React.ComponentType<{ className?: string; size?: number }>;

type SectionName = "hero" | "about" | "services" | "menu" | "gallery" | "contact" | "builder";

interface DoodlePlacement {
  Component: DoodleComponent;
  top: string;
  left: string;
  size: number;
  opacity: number;
  rotate: number;
  delay: number;
}

const sectionDoodles: Record<SectionName, DoodleComponent[]> = {
  hero: [BananaLeaf, Tumbler, CurryLeaf, Spice, OilLamp],
  about: [Dosa, Idli, BananaLeaf, CurryLeaf],
  services: [Biryani, Samosa, Chai, Pot],
  menu: [Laddu, Dosa, Idli, Biryani, Chai],
  gallery: [BananaLeaf, Garland, Rangoli, OilLamp],
  contact: [Chai, Samosa, CurryLeaf, Spice],
  builder: [Dosa, Idli, Laddu, Banana],
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function buildPlacements(section: SectionName): DoodlePlacement[] {
  const doodles = sectionDoodles[section];
  return doodles.map((Component, i) => {
    const r1 = seededRandom(i * 7 + doodles.length);
    const r2 = seededRandom(i * 13 + doodles.length);
    const r3 = seededRandom(i * 23 + doodles.length);
    return {
      Component,
      top: `${+(5 + r1 * 80).toFixed(3)}%`,
      left: `${+(r2 * 85 + 2).toFixed(3)}%`,
      size: 30 + Math.round(r3 * 50),
      opacity: +(0.06 + seededRandom(i * 31 + doodles.length) * 0.09).toFixed(3),
      rotate: Math.round(seededRandom(i * 41 + doodles.length) * 360 - 180),
      delay: i * 0.12,
    };
  });
}

export function FloatingFoodDoodles({
  section,
  className = "",
}: {
  section: SectionName;
  className?: string;
}) {
  const placements = buildPlacements(section);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {placements.map(({ Component, top, left, size, opacity, rotate, delay }, i) => (
        <motion.div
          key={`${section}-${i}`}
          className="absolute"
          style={{ top, left, width: `${size}px`, height: `${size}px` }}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            delay,
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <Component
            className="w-full h-full"
            size={size}
          />
        </motion.div>
      ))}
    </div>
  );
}

type DividerVariant = "kolam" | "lamp" | "garland" | "leaf";

const dividerDoodles: Record<DividerVariant, DoodleComponent> = {
  kolam: Rangoli,
  lamp: OilLamp,
  garland: Garland,
  leaf: BananaLeaf,
};

export function SectionDoodleDivider({
  variant = "kolam",
  className = "",
}: {
  variant?: DividerVariant;
  className?: string;
}) {
  const CenterDoodle = dividerDoodles[variant];

  return (
    <motion.div
      className={`flex items-center justify-center gap-3 w-full py-4 ${className}`}
      initial={{ opacity: 0, scaleX: 0.3 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -30 }}
        whileInView={{ opacity: 0.6, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 100 }}
        className="flex-shrink-0"
      >
        <CenterDoodle size={36} className="text-brand-gold" />
      </motion.div>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
    </motion.div>
  );
}

export function ScrollFoodReveal({
  children,
  doodles = [],
  className = "",
}: {
  children: ReactNode;
  doodles?: (keyof typeof allDoodles)[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
      {doodles.map((name, i) => {
        const Doodle = allDoodles[name];
        const fromLeft = i % 2 === 0;
        return (
          <motion.div
            key={`${name}-${i}`}
            className="absolute pointer-events-none"
            style={{
              top: `${20 + i * 25}%`,
              [fromLeft ? "left" : "right"]: "-20px",
              width: `${40 + i * 10}px`,
              height: `${40 + i * 10}px`,
            }}
            initial={{ opacity: 0, x: fromLeft ? -40 : 40, scale: 0.6 }}
            animate={
              isInView
                ? { opacity: 0.12, x: 0, scale: 1 }
                : { opacity: 0, x: fromLeft ? -40 : 40, scale: 0.6 }
            }
            transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: "easeOut" }}
          >
            <Doodle size={40 + i * 10} className="w-full h-full" />
          </motion.div>
        );
      })}
    </div>
  );
}

const allDoodles = {
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
} as const;
