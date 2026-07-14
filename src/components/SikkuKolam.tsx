import { useEffect, useRef } from "react";
import "./SikkuKolam.css";

interface SikkuKolamProps {
  grid?: 3 | 4 | 5;
  size?: number;
  side?: "left" | "right";
  top?: string;
  rotate?: number;
  mirrored?: boolean;
  opacity?: number;
  color?: string;
  className?: string;
}

const SPACING = 56;
const RADIUS_RATIO = 0.7;
const SQUIRCLE = 0.62;

function loopPath(cx: number, cy: number, r: number): string {
  const k = r * SQUIRCLE;
  return [
    `M${cx} ${cy - r}`,
    `C${cx + k} ${cy - r} ${cx + r} ${cy - k} ${cx + r} ${cy}`,
    `C${cx + r} ${cy + k} ${cx + k} ${cy + r} ${cx} ${cy + r}`,
    `C${cx - k} ${cy + r} ${cx - r} ${cy + k} ${cx - r} ${cy}`,
    `C${cx - r} ${cy - k} ${cx - k} ${cy - r} ${cx} ${cy - r}`,
    "Z",
  ].join(" ");
}

export function SikkuKolam({
  grid = 4,
  size = 230,
  side = "left",
  top = "50%",
  rotate = -14,
  mirrored = false,
  opacity = 0.15,
  color = "#FBF3E4",
  className = "",
}: SikkuKolamProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-drawn");
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-drawn");
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const r = SPACING * RADIUS_RATIO;
  const pad = r + 8;
  const box = (grid - 1) * SPACING + pad * 2;

  const dots: Array<{ cx: number; cy: number }> = [];
  for (let j = 0; j < grid; j++) {
    for (let i = 0; i < grid; i++) {
      dots.push({ cx: pad + i * SPACING, cy: pad + j * SPACING });
    }
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`sikku-kolam ${className}`}
      style={
        {
          top,
          [side]: "0",
          "--sk-size": `${size}px`,
          "--sk-opacity": opacity,
          transform: `translateY(-50%) rotate(${rotate}deg)${mirrored ? " scaleX(-1)" : ""}`,
        } as React.CSSProperties
      }
    >
      <svg viewBox={`0 0 ${box} ${box}`} width="100%" height="100%">
        {dots.map((d, i) => (
          <circle
            key={`p${i}`}
            className="sk-pulli"
            cx={d.cx}
            cy={d.cy}
            r={2.6}
            fill={color}
            style={{ animationDelay: `${i * 0.03}s` }}
          />
        ))}
        {dots.map((d, i) => (
          <path
            key={`l${i}`}
            className="sk-line"
            pathLength={1}
            d={loopPath(d.cx, d.cy, r)}
            fill="none"
            stroke={color}
            strokeWidth={4.5}
            strokeLinecap="round"
            style={{ animationDelay: `${0.45 + i * 0.07}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

export default SikkuKolam;
