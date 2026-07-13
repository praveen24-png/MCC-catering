'use client';

import { useRef, useEffect, useCallback, type ReactNode } from 'react';

interface SelfDrawingSVGProps {
  children: ReactNode;
  duration?: number;
  stagger?: number;
  delay?: number;
  fillOnComplete?: boolean;
  repeat?: boolean;
  className?: string;
}

const STROKE_SELECTORS = 'path, circle, ellipse, line, polyline, polygon, rect';

export function SelfDrawingSVG({
  children,
  duration = 1400,
  stagger = 120,
  delay = 0,
  fillOnComplete = false,
  repeat = false,
  className,
}: SelfDrawingSVGProps) {
  const ref = useRef<HTMLDivElement>(null);

  const prime = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.querySelectorAll(STROKE_SELECTORS).forEach((p) => {
      try {
        const len = (p as SVGGeometryElement).getTotalLength();
        (p as HTMLElement).style.setProperty('--sd-length', String(len));
        (p as HTMLElement).style.setProperty('--sd-duration', `${duration}ms`);
        (p as HTMLElement).style.strokeDasharray = String(len);
        (p as HTMLElement).style.strokeDashoffset = String(len);
        (p as HTMLElement).style.transition = 'none';
        (p as HTMLElement).classList.remove('sd-drawn', 'sd-filled');
      } catch {
        // Elements without getTotalLength (e.g. <rect>) are skipped
      }
    });
  }, [duration]);

  const draw = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.querySelectorAll(STROKE_SELECTORS).forEach((p, i) => {
      setTimeout(() => {
        (p as HTMLElement).classList.add('sd-drawn');
        if (fillOnComplete) {
          setTimeout(
            () => (p as HTMLElement).classList.add('sd-filled'),
            duration,
          );
        }
      }, delay + i * stagger);
    });
  }, [delay, stagger, duration, fillOnComplete]);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    if (prefersReduced) {
      prime();
      ref.current
        ?.querySelectorAll(STROKE_SELECTORS)
        .forEach((p) => (p as HTMLElement).classList.add('sd-drawn'));
      return;
    }

    prime();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          draw();
          if (!repeat) observer.disconnect();
        } else if (repeat) {
          prime();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [prime, draw, repeat]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
