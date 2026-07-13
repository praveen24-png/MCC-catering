interface MorphingDishProps {
  size?: number;
  className?: string;
}

// All silhouettes built with: M, 4 cubic C commands, Z
// viewBox 0 0 120 120
const SHAPES = {
  // Idli — round flat disc
  idli: "M30,70 C30,50 40,35 60,35 C80,35 90,50 90,70 C90,85 80,95 60,95 C40,95 30,85 30,70 Z",
  // Vada — donut shape (slightly indented center)
  vada: "M25,65 C25,40 38,25 60,25 C82,25 95,40 95,65 C95,88 82,100 60,100 C38,100 25,88 25,65 Z",
  // Dosa — wide flat crescent
  dosa: "M15,75 C15,55 30,40 60,40 C90,40 105,55 105,75 C105,90 90,100 60,100 C30,100 15,90 15,75 Z",
  // Sambar bowl — deeper bowl shape
  bowl: "M20,60 C20,35 35,20 60,20 C85,20 100,35 100,60 C100,82 85,105 60,105 C35,105 20,82 20,60 Z",
};

export function MorphingDish({ size = 120, className = "" }: MorphingDishProps) {
  const shapeValues = Object.values(SHAPES).join("; ");

  return (
    <div className={className} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Morphing South Indian food silhouette"
      >
        {/* Filled body */}
        <path
          d={SHAPES.idli}
          fill="currentColor"
          opacity="0.15"
        >
          <animate
            attributeName="d"
            values={shapeValues}
            dur="8s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
          />
        </path>

        {/* Stroked outline */}
        <path
          d={SHAPES.idli}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate
            attributeName="d"
            values={shapeValues}
            dur="8s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
          />
        </path>

        {/* Steam wisps */}
        <g className="steam-path" opacity="0">
          <path d="M50,30 Q48,20 52,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M60,28 Q58,16 62,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M70,30 Q68,20 72,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
