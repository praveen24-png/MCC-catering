import { SelfDrawingSVG } from "./SelfDrawingSVG";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export function AnimatedLogo({ size = 200, className = "" }: AnimatedLogoProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <SelfDrawingSVG duration={1800} stagger={80} fillOnComplete>
        <svg
          width={size}
          height={size * 0.6}
          viewBox="0 0 200 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label="My Chennai Catering banana leaf logo"
        >
          {/* Banana leaf shape */}
          <path
            data-sd="1"
            d="M100,15 Q160,20 180,60 Q160,100 100,105 Q40,100 20,60 Q40,20 100,15 Z"
          />
          {/* Center vein */}
          <path data-sd="1" d="M100,15 L100,105" strokeWidth="1.5" />
          {/* Side veins */}
          <path data-sd="1" d="M100,35 Q130,30 155,45" strokeWidth="1" />
          <path data-sd="1" d="M100,35 Q70,30 45,45" strokeWidth="1" />
          <path data-sd="1" d="M100,55 Q135,50 165,60" strokeWidth="1" />
          <path data-sd="1" d="M100,55 Q65,50 35,60" strokeWidth="1" />
          <path data-sd="1" d="M100,75 Q130,72 150,80" strokeWidth="1" />
          <path data-sd="1" d="M100,75 Q70,72 50,80" strokeWidth="1" />
          {/* Small food items on leaf */}
          <circle data-sd="1" cx="80" cy="55" r="8" strokeWidth="1.5" />
          <circle data-sd="1" cx="120" cy="55" r="6" strokeWidth="1.5" />
          <circle data-sd="1" cx="100" cy="70" r="5" strokeWidth="1.5" />
        </svg>
      </SelfDrawingSVG>

      {/* Wordmark — real text, fades in after draw completes */}
      <div
        className="text-center opacity-0 animate-[fadeIn_0.8s_ease_forwards]"
        style={{ animationDelay: "2s" }}
      >
        <div className="font-serif text-2xl font-bold text-plum tracking-tight">
          My Chennai Catering
        </div>
        <div className="text-xs text-gold-dark tracking-[0.2em] uppercase mt-1">
          Services
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.8s_ease_forwards\\] {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
