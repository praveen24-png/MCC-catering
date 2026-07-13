import { useRef, useEffect } from "react";

interface FoodPeekEdgeProps {
  /** Cut-out PNG with a TRANSPARENT background. A rectangular photo will look like a slab. */
  src: string;
  /** Which edge it hangs off. */
  side: "left" | "right";
  /** Width in px at desktop. Default 320. */
  size?: number;
  /** Vertical position within the section, as a %. Default "50%". */
  top?: string;
  /**
   * How much of the dish hangs OUTSIDE the viewport, 0–1.
   * 0.4 = 40% cropped off the edge. Default 0.35.
   */
  peek?: number;
  /** Parallax strength. 0 = pinned, 0.25 = lively. Default 0.12. */
  speed?: number;
  /** Static tilt in degrees. Default 0. */
  rotate?: number;
  /** Extra rotation applied across the scroll range. Default 6. */
  spin?: number;
  /**
   * Opacity ceiling, 0–1. Food should land at 1 (it's the point).
   * Architecture / ambience should sit further back — try 0.5.
   * Default 1.
   */
  maxOpacity?: number;
  /** Drop it behind the section content instead of in front. Default false. */
  behind?: boolean;
  /** Hide below this breakpoint. Default true (hidden under 1024px). */
  desktopOnly?: boolean;
  className?: string;
}

/**
 * FoodPeekEdge — a cut-out dish that pokes in from the edge of a section
 * and drifts as you scroll past. Ambient, not content: it is aria-hidden
 * and never intercepts clicks.
 *
 * REQUIREMENTS
 *  - The parent <section> must be `position: relative` and `overflow: hidden`.
 *  - `src` must be a cut-out PNG (transparent background).
 *
 * RESTRAINT
 *  Use this 3–4 times across the WHOLE site. It is a moment, not a texture.
 *  For ambience on every section, use <DoodleLayer /> instead.
 *
 *   <FoodPeekEdge src={leafPlatter} side="right" top="40%" size={380} />
 */
export function FoodPeekEdge({
  src,
  side,
  size = 320,
  top = "50%",
  peek = 0.35,
  speed = 0.12,
  rotate = 0,
  spin = 6,
  maxOpacity = 1,
  behind = false,
  desktopOnly = true,
  className = "",
}: FoodPeekEdgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.opacity = String(maxOpacity);
      return;
    }

    /* Set a minimal initial opacity so the element isn't invisible during observer setup */
    el.style.opacity = "0.01";

    let ticking = false;
    let inView = false;

    const update = () => {
      ticking = false;
      if (!inView) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress: 0 when the element first touches the bottom of the screen,
      // 1 when it has fully passed the top.
      const raw = 1 - (rect.top + rect.height / 2) / (vh + rect.height / 2);
      const p = Math.min(1, Math.max(0, raw));

      // drift up, and slide slightly further into the page as it rises
      const y = -(p - 0.5) * 2 * (vh * speed);
      const x = (side === "left" ? 1 : -1) * p * (size * 0.08);
      const r = rotate + (p - 0.5) * 2 * spin;

      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`;
      el.style.opacity = String(Math.min(maxOpacity, p * 3 * maxOpacity));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId.current = requestAnimationFrame(update);
      }
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) update();
      },
      { rootMargin: "200px 0px" }
    );
    obs.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [side, size, speed, rotate, spin, maxOpacity]);

  // How far off the edge it sits.
  const offset = -Math.round(size * peek);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`food-peek-edge ${desktopOnly ? "food-peek-edge--desktop" : ""} ${className}`}
      style={{
        top,
        width: size,
        zIndex: behind ? 0 : 1,
        [side]: `${offset}px`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <img src={src} alt="" loading="lazy" decoding="async" />
    </div>
  );
}

export default FoodPeekEdge;
