import { useEffect, useRef } from "react";

/**
 * useDrawOnScroll — IntersectionObserver-based stroke draw animation.
 * Measures each SVG path/circle/ellipse/line total length, sets
 * stroke-dasharray + stroke-dashoffset, then animates to 0 on enter.
 * Items already in viewport at mount are revealed immediately.
 */
export function useDrawOnScroll(containerRef: React.RefObject<HTMLElement | null>) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const doodles = container.querySelectorAll<HTMLElement>(".doodle");
    if (!doodles.length) return;

    /* Measure and set initial dash state */
    doodles.forEach((doodle) => {
      doodle.classList.add("is-drawn");
      const els = doodle.querySelectorAll<SVGGeometryElement>("path, circle, ellipse, line");
      els.forEach((el) => {
        let length: number;
        try {
          length = el.getTotalLength();
        } catch {
          length = 300;
        }
        el.style.setProperty("--sd-length", String(length));
        el.style.strokeDasharray = String(length);
        el.style.strokeDashoffset = String(length);
      });
    });

    if (prefersReduced) {
      doodles.forEach((d) => {
        d.classList.add("is-visible");
        const els = d.querySelectorAll<SVGGeometryElement>("path, circle, ellipse, line");
        els.forEach((s) => { s.style.strokeDashoffset = "0"; });
      });
      return;
    }

    /* Observe each doodle individually */
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "150px 0px" }
    );

    doodles.forEach((d) => {
      /* Immediately reveal items already in viewport */
      const rect = d.getBoundingClientRect();
      if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
        d.classList.add("is-visible");
      } else {
        observerRef.current!.observe(d);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [containerRef]);
}
