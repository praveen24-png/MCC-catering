import React, { useRef, useState, useEffect } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export function ScrollRevealImage({ src, alt, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimKey((k) => k + 1);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <img key={animKey} src={src} alt={alt} className="w-full h-auto" />
    </div>
  );
}
