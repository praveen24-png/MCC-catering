import { useRef, useEffect } from "react";
import "./ScrollCutouts.css";

interface CutoutDef {
  src: string;
  side: "left" | "right";
  top: string;
  size: number;
  rotate: number;
}

interface ScrollCutoutsProps {
  cutouts: CutoutDef[];
  /** "background" = subtle watermark (12%), "prominent" = visible feature image (85%) */
  variant?: "background" | "prominent";
  className?: string;
}

export function ScrollCutouts({
  cutouts,
  variant = "background",
  className = "",
}: ScrollCutoutsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = container.querySelectorAll<HTMLElement>(".scroll-cutout");
    if (!els.length) return;

    if (prefersReduced) {
      els.forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    let ticking = false;
    const inViewSet = new Set<Element>();
    const maxO = variant === "prominent" ? 0.85 : 0.12;

    const update = () => {
      const vh = window.innerHeight;
      inViewSet.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const raw = 1 - (rect.top + rect.height / 2) / (vh + rect.height / 2);
        const p = Math.min(1, Math.max(0, raw));
        const html = el as HTMLElement;
        const side = html.dataset.side === "left" ? 1 : -1;
        const isPhone = window.innerWidth < 768;
        const peek = isPhone ? 30 : 60;
        const speed = isPhone ? 0.08 : 0.12;
        const spin = parseFloat(html.dataset.spin ?? "6");
        const baseRot = parseFloat(html.dataset.rot ?? "0");
        const peekOffset = side * p * peek;
        const y = -(p - 0.5) * 2 * (vh * speed);
        const r = baseRot + (p - 0.5) * 2 * spin;
        const o = variant === "prominent" ? 1 : Math.min(maxO, p * 2.5);
        html.style.transform = `translate3d(${peekOffset}px, ${y}px, 0) rotate(${r}deg)`;
        html.style.opacity = String(o);
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            inViewSet.add(entry.target);
          } else {
            inViewSet.delete(entry.target);
          }
        });
        onScroll();
      },
      { rootMargin: "200px 0px" },
    );

    els.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [cutouts, variant]);

  return (
    <div
      ref={containerRef}
      className={`scroll-cutouts-layer scroll-cutouts-layer--${variant} ${className}`}
      aria-hidden="true"
    >
      {cutouts.map((c, i) => (
        <div
          key={i}
          className="scroll-cutout"
          data-side={c.side}
          data-rot={c.rotate}
          data-spin="6"
          style={
            {
              top: c.top,
              "--sc-size": `${c.size}px`,
              opacity: variant === "prominent" ? 1 : 0,
              transform: `rotate(${c.rotate}deg)`,
            } as React.CSSProperties
          }
        >
          <img src={c.src} alt="" loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}

export default ScrollCutouts;
