import { useRef, useState, useEffect } from "react";
import "./FoodPeek.css";

interface FoodPeekProps {
  src: string;
  alt: string;
  size?: number;
}

/**
 * FoodPeek — small circular food photo that fades + scales in
 * when its section enters the viewport. Non-blocking, non-modal.
 */
export function FoodPeek({ src, alt, size = 64 }: FoodPeekProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`food-peek ${visible ? "food-peek--visible" : ""}`}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        className="food-peek__img"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FoodPeekChip — for hover-triggered menu category pop-ups           */
/* ------------------------------------------------------------------ */

interface FoodPeekChipProps {
  src: string;
  alt: string;
  className?: string;
}

export function FoodPeekChip({ src, alt, className = "" }: FoodPeekChipProps) {
  return (
    <span className={`food-peek-chip ${className}`}>
      <img src={src} alt={alt} className="food-peek-chip__img" loading="lazy" draggable={false} />
    </span>
  );
}

export default FoodPeek;
