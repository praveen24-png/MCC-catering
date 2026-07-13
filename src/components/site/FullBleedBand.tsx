import type { ReactNode } from "react";

interface FullBleedBandProps {
  image: string;
  alt: string;
  title?: string;
  subtitle?: string;
  tone?: "warm" | "leaf" | "ink";
  height?: "sm" | "md" | "lg";
  children?: ReactNode;
}

const HEIGHT_MAP = {
  sm: "min-h-[280px]",
  md: "min-h-[360px]",
  lg: "min-h-[480px]",
};

export function FullBleedBand({
  image,
  alt,
  title,
  subtitle,
  tone = "warm",
  height = "md",
  children,
}: FullBleedBandProps) {
  return (
    <div className={`page-banner page-banner--${tone} full-bleed ${HEIGHT_MAP[height]}`}>
      <img
        src={image}
        alt={alt}
        className="page-banner-bg"
        loading="eager"
        fetchPriority="high"
      />
      <div className="page-banner-scrim" />
      {(title || subtitle || children) && (
        <>
          <div className="gold-hairline absolute top-0 left-0 right-0 z-10" />
          <div className="page-banner-content">
            {title && (
              <h1 className="page-banner-title text-3xl sm:text-4xl lg:text-5xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="page-banner-subtitle text-sm sm:text-base max-w-2xl mx-auto mt-3">
                {subtitle}
              </p>
            )}
            {children}
          </div>
          <div className="gold-hairline absolute bottom-0 left-0 right-0 z-10" />
        </>
      )}
    </div>
  );
}
