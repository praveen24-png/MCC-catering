/**
 * GrainOverlay — subtle SVG noise/grain texture over the page background.
 * 8% opacity, pointer-events: none, fixed position.
 */
export function GrainOverlay() {
  return (
    <div className="grain-overlay" aria-hidden="true">
      <svg width="100%" height="100%">
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" opacity="0.08" />
      </svg>
    </div>
  );
}

/**
 * BananaLeafDivider — wavy leaf-vein SVG section divider
 * replacing straight horizontal rules.
 */
export function BananaLeafDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`banana-leaf-divider ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 40"
        fill="none"
        strokeLinecap="round"
        preserveAspectRatio="none"
        className="banana-leaf-divider__svg"
      >
        <path
          d="M0,20 C120,8 240,32 360,20 C480,8 600,32 720,20 C840,8 960,32 1080,20 C1200,8 1320,32 1440,20"
          stroke="var(--gold, #c9a84c)"
          strokeWidth="1.5"
          opacity="0.35"
        />
        <path
          d="M0,22 C120,10 240,34 360,22 C480,10 600,34 720,22 C840,10 960,34 1080,22 C1200,10 1320,34 1440,22"
          stroke="var(--gold, #c9a84c)"
          strokeWidth="0.8"
          opacity="0.2"
        />
        {/* Leaf vein accents */}
        <path d="M180,20 L190,12" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.15" />
        <path d="M360,20 L350,12" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.15" />
        <path d="M540,20 L550,12" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.15" />
        <path d="M720,20 L710,12" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.15" />
        <path d="M900,20 L910,12" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.15" />
        <path d="M1080,20 L1070,12" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.15" />
        <path d="M1260,20 L1270,12" stroke="var(--gold, #c9a84c)" strokeWidth="0.8" opacity="0.15" />
      </svg>
    </div>
  );
}
