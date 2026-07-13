import { useEffect, useRef } from "react";

/**
 * KolamVine — A long kolam/vine SVG fixed to the left edge of the page.
 * Its stroke-dashoffset is bound to overall scroll progress so it draws
 * itself as the user scrolls the page.
 */
export function KolamVine() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      svg.style.strokeDashoffset = "0";
      return;
    }

    const path = svg.querySelector<SVGGeometryElement>("path");
    if (!path) return;

    const totalLength = path.getTotalLength();
    svg.style.strokeDasharray = String(totalLength);
    svg.style.strokeDashoffset = String(totalLength);

    let raf = 0;
    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      path.style.strokeDashoffset = String(totalLength * (1 - progress));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="kolam-vine" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 40 1200"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        preserveAspectRatio="none"
      >
        {/* Main vine stem */}
        <path
          d="M20,0 Q30,60 20,120 Q10,180 20,240 Q30,300 20,360 Q10,420 20,480 Q30,540 20,600 Q10,660 20,720 Q30,780 20,840 Q10,900 20,960 Q30,1020 20,1080 Q10,1140 20,1200"
          stroke="var(--gold, #c9a84c)"
          strokeWidth="1.5"
          opacity="0.25"
        />
        {/* Left leaves */}
        <path d="M20,80 Q5,70 8,55 Q12,45 20,60" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,200 Q5,190 8,175 Q12,165 20,180" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,340 Q5,330 8,315 Q12,305 20,320" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,480 Q5,470 8,455 Q12,445 20,460" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,620 Q5,610 8,595 Q12,585 20,600" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,760 Q5,750 8,735 Q12,725 20,740" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,900 Q5,890 8,875 Q12,865 20,880" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,1040 Q5,1030 8,1015 Q12,1005 20,1020" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        {/* Right leaves */}
        <path d="M20,140 Q35,130 32,115 Q28,105 20,120" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,280 Q35,270 32,255 Q28,245 20,260" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,420 Q35,410 32,395 Q28,385 20,400" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,560 Q35,550 32,535 Q28,525 20,540" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,700 Q35,690 32,675 Q28,665 20,680" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,840 Q35,830 32,815 Q28,805 20,820" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        <path d="M20,980 Q35,970 32,955 Q28,945 20,960" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.2"/>
        {/* Kolam circles at intervals */}
        <circle cx="20" cy="120" r="6" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.18"/>
        <circle cx="20" cy="360" r="8" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.18"/>
        <circle cx="20" cy="600" r="6" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.18"/>
        <circle cx="20" cy="840" r="8" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.18"/>
        <circle cx="20" cy="1080" r="6" stroke="var(--gold, #c9a84c)" strokeWidth="1" opacity="0.18"/>
      </svg>
    </div>
  );
}

export default KolamVine;
