import React, { useRef, useState, useEffect } from "react";

interface Props {
  className?: string;
}

export function VenueLineArt({ className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimate(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <svg
        viewBox="0 0 840 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#8B5E3C"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-auto"
      >
        {/* Main path */}
        <path
          strokeDasharray="4000"
          strokeDashoffset={animate ? 0 : 4000}
          style={{ transition: "stroke-dashoffset 4s ease-in-out" }}
          d="
            M 0,85 L 10,85 L 10,40 Q 10,22 22,14 L 38,2 L 54,14 Q 66,22 66,40 L 66,85 L 78,85
            L 100,85 L 100,50 Q 100,36 112,32 L 126,30 L 138,32 Q 150,36 150,50 L 150,85
            L 155,85 L 155,62 Q 160,52 170,52 L 175,52 Q 180,52 180,62 L 180,85
            L 200,85 L 200,45 L 206,35 L 212,45 L 212,30 L 232,30 L 232,45 L 238,35 L 244,45 L 244,85
            L 250,85 L 250,70 L 262,70 L 262,85
            L 282,85 L 282,55 L 292,38 L 302,55 L 302,32 L 312,22 L 322,32 L 322,55 L 322,85
            L 328,85 L 334,72 Q 344,68 354,72 L 360,85
            L 390,85 L 390,38 L 400,15 L 410,38 L 410,85 L 416,85 L 420,72 L 424,85
            L 460,85 L 460,48 Q 460,36 472,36 L 478,36 L 478,26 L 490,26 L 490,36 L 496,36 Q 508,36 508,48 L 508,85
            L 514,85 L 520,72 Q 530,68 540,72 L 546,85
            L 575,85 L 575,50 L 580,42 L 585,32 L 590,22 L 595,16 L 600,22 L 605,32 L 610,42 L 615,50 L 615,85
            L 621,85 L 627,72 Q 637,68 647,72 L 653,85
            L 685,85 L 685,35 L 695,25 Q 705,18 715,25 L 725,35 L 725,85
            L 730,85 L 730,30 L 740,18 L 750,30 L 750,85
            L 755,85 L 755,72 Q 765,68 775,72 L 780,85
            L 790,85 L 790,62 L 795,55 L 810,55 L 810,50 L 830,50 L 835,55 L 840,55 L 840,85
          "
        />

        {/* Detail groups — fade in with staggered delay */}
        <g style={{ opacity: animate ? 1 : 0, transition: "opacity 0.6s ease-out 0.4s" }}>
          <path d="M 22,18 Q 38,32 54,18" strokeWidth="1.2" />
        </g>
        <g style={{ opacity: animate ? 1 : 0, transition: "opacity 0.6s ease-out 0.8s" }}>
          <rect x="116" y="58" width="7" height="7" rx="1" strokeWidth="1.2" />
          <line x1="119.5" y1="58" x2="119.5" y2="65" strokeWidth="0.8" />
          <line x1="116" y1="61.5" x2="123" y2="61.5" strokeWidth="0.8" />
        </g>
        <g style={{ opacity: animate ? 1 : 0, transition: "opacity 0.6s ease-out 1.2s" }}>
          <rect x="218" y="55" width="9" height="7" rx="1.5" strokeWidth="1.2" />
          <line x1="221" y1="55" x2="221" y2="52" strokeWidth="0.8" />
          <line x1="225" y1="55" x2="225" y2="52" strokeWidth="0.8" />
          <line x1="221" y1="52" x2="225" y2="52" strokeWidth="0.8" />
        </g>
        <g style={{ opacity: animate ? 1 : 0, transition: "opacity 0.6s ease-out 1.6s" }}>
          <circle cx="312" cy="26" r="5" strokeWidth="1.2" />
          <line x1="312" y1="31" x2="312" y2="42" strokeWidth="1.2" />
        </g>
        <g style={{ opacity: animate ? 1 : 0, transition: "opacity 0.6s ease-out 2.0s" }}>
          <line x1="390" y1="42" x2="410" y2="42" strokeWidth="1.2" />
          <path d="M 394,42 L 400,30 L 406,42" strokeWidth="1.2" />
          <circle cx="400" cy="27" r="2" strokeWidth="1.2" />
        </g>
        <g style={{ opacity: animate ? 1 : 0, transition: "opacity 0.6s ease-out 2.4s" }}>
          <path d="M 685,35 Q 705,12 725,35" strokeWidth="1.2" />
          <circle cx="705" cy="10" r="2.5" strokeWidth="1.2" />
          <line x1="690" y1="42" x2="690" y2="85" strokeWidth="0.8" />
          <line x1="720" y1="42" x2="720" y2="85" strokeWidth="0.8" />
          <line x1="692" y1="50" x2="718" y2="50" strokeWidth="0.6" />
          <line x1="692" y1="60" x2="718" y2="60" strokeWidth="0.6" />
          <path d="M 730,30 Q 740,16 750,30" strokeWidth="1.2" />
          <circle cx="740" cy="14" r="2" strokeWidth="1" />
          <line x1="734" y1="36" x2="734" y2="85" strokeWidth="0.8" />
          <line x1="746" y1="36" x2="746" y2="85" strokeWidth="0.8" />
        </g>
        <g style={{ opacity: animate ? 1 : 0, transition: "opacity 0.6s ease-out 2.8s" }}>
          <circle cx="798" cy="70" r="4" strokeWidth="1.2" />
          <circle cx="832" cy="70" r="4" strokeWidth="1.2" />
          <rect x="795" y="55" width="18" height="13" rx="1" strokeWidth="1" />
          <rect x="815" y="52" width="12" height="8" rx="1" strokeWidth="1" />
          <path d="M 805,48 Q 808,42 811,48" strokeWidth="0.8" />
          <path d="M 811,44 Q 814,38 817,44" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
}
