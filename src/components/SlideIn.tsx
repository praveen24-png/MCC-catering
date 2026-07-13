import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "left" | "right" | "up" | "down";

interface SlideInProps {
  children: ReactNode;
  /** Which edge the element travels in from. Default: "left" */
  from?: Direction;
  /** How far it travels, in px. Default: 90 */
  distance?: number;
  /** Seconds to wait before animating. Default: 0 */
  delay?: number;
  /** Also fade in. Default: true */
  fade?: boolean;
  /** Also scale up slightly. Nice on images. Default: false */
  scale?: boolean;
  /**
   * How far into the viewport before it fires.
   * "-80px" = element must be 80px past the edge. Default: "-80px"
   */
  margin?: string;
  className?: string;
}

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
};

/**
 * SlideIn — scroll-triggered directional reveal.
 *
 * Fires ONCE when the element enters the viewport, then settles.
 * Use for content (food photos, cards, copy) that people need to read.
 * For ambient decoration that should keep drifting, use the parallax
 * hook instead — this deliberately does not re-animate on scroll-back.
 *
 *   <SlideIn from="left"><img src={dosa} /></SlideIn>
 *   <SlideIn from="right" delay={0.15} scale><img src={sweets} /></SlideIn>
 */
export function SlideIn({
  children,
  from = "left",
  distance = 90,
  delay = 0,
  fade = true,
  scale = false,
  margin = "-80px",
  className,
}: SlideInProps) {
  const dir = OFFSETS[from];

  return (
    <motion.div
      className={className}
      initial={{
        x: dir.x * distance,
        y: dir.y * distance,
        opacity: fade ? 0 : 1,
        scale: scale ? 0.9 : 1,
      }}
      whileInView={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true, margin }}
      transition={{
        type: "spring",
        stiffness: 55,
        damping: 16,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideInStagger — wraps a list so children slide in one after another,
 * alternating left / right. Drop your cards straight in as children.
 *
 *   <SlideInStagger>
 *     <MenuCard ... />
 *     <MenuCard ... />
 *   </SlideInStagger>
 */
export function SlideInStagger({
  children,
  step = 0.12,
  distance = 90,
  className,
}: {
  children: ReactNode[];
  /** Seconds between each child. Default: 0.12 */
  step?: number;
  distance?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <SlideIn
          key={i}
          from={i % 2 === 0 ? "left" : "right"}
          distance={distance}
          delay={i * step}
        >
          {child}
        </SlideIn>
      ))}
    </div>
  );
}

export default SlideIn;
