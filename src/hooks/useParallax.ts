import { useEffect, useRef } from "react";

/**
 * useParallax — rAF-throttled scroll parallax on doodle children.
 * Each .doodle with data-speed gets transform: translate3d(0, -offset * speed, 0).
 * Reads data-rot and data-scale to preserve original transforms.
 * Uses container-relative offset instead of global scrollY.
 * Respects prefers-reduced-motion.
 */
export function useParallax(containerRef: React.RefObject<HTMLElement | null>) {
  const rafId = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ticking = false;

    const update = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const offset = containerCenter - viewportCenter;

      const doodles = container.querySelectorAll<HTMLElement>(".doodle[data-speed]");
      doodles.forEach((d) => {
        const speed = parseFloat(d.dataset.speed ?? "0.2");
        const rot = d.dataset.rot ?? "0deg";
        const scale = d.dataset.scale ?? "1";
        const y = -(offset * speed);
        d.style.transform = `translate3d(0, ${y}px, 0) rotate(${rot}) scale(${scale})`;
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [containerRef]);
}
