import { useRef, useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ScrollCutouts } from "@/components/ScrollCutouts";
import { CenterKolam } from "@/components/Kolam";
import cutLeafPlatter from "@/assets/cutout-leaf-platter.png";
import cutBiryani from "@/assets/cutout-biryani.png";
import cutWeddingFeast from "@/assets/cutout-wedding-feast.png";
import cutSweets from "@/assets/cutout-sweets.png";

const STEPS = [
  {
    num: "01",
    title: "Choose Your Menu",
    desc: "Browse our curated selection of authentic South Indian dishes and hand-pick favourites for your custom feast menu.",
    img: cutLeafPlatter,
    rotate: -3,
  },
  {
    num: "02",
    title: "We Craft & Prepare",
    desc: "Our expert chefs source fresh ingredients and prepare every dish with traditional recipes and meticulous care.",
    img: cutBiryani,
    rotate: 2,
  },
  {
    num: "03",
    title: "Served With Love",
    desc: "From grand banana leaf spreads to elegant buffet counters, we deliver a flawless dining experience for your guests.",
    img: cutWeddingFeast,
    rotate: -2,
  },
];

/* ── curved dashed arcs connecting step centres (desktop only) ───────── */
function ArcConnectors({ visible }: { visible: boolean }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!visible) return;
    const svg = ref.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const paths = svg.querySelectorAll<SVGPathElement>("path.arc-path");

    if (prefersReduced) {
      paths.forEach((p) => {
        p.style.strokeDashoffset = "0";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            paths.forEach((p, i) => {
              const len = p.getTotalLength();
              p.style.strokeDasharray = `${len}`;
              p.style.strokeDashoffset = `${len}`;
              p.style.transition = `stroke-dashoffset ${1.2 + i * 0.3}s cubic-bezier(.4,0,.2,1) ${0.4 + i * 0.25}s`;
              requestAnimationFrame(() => {
                p.style.strokeDashoffset = "0";
              });
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, [visible]);

  if (!visible) return null;

  return (
    <svg
      ref={ref}
      className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 520"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="arc-arrow"
          viewBox="0 0 10 8"
          refX="9"
          refY="4"
          markerWidth="8"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,4 L0,8 Z" fill="#c4a87c" opacity="0.7" />
        </marker>
      </defs>

      {/* Arc 1 → 2 — dips down */}
      <path
        className="arc-path"
        d="M 180,130 C 340,130 340,310 500,310"
        stroke="#c4a87c"
        strokeWidth="2"
        strokeOpacity="0.45"
        strokeLinecap="round"
        markerEnd="url(#arc-arrow)"
      />

      {/* Arc 2 → 3 — rises back up */}
      <path
        className="arc-path"
        d="M 500,310 C 660,310 660,130 820,130"
        stroke="#c4a87c"
        strokeWidth="2"
        strokeOpacity="0.45"
        strokeLinecap="round"
        markerEnd="url(#arc-arrow)"
      />
    </svg>
  );
}

/* ── single step card ───────────────────────────────────────────────── */
function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.12} className="flex flex-col items-center text-center">
      {/* Number badge */}
      <div className="relative z-10 -mb-5 ml-[-40%] sm:ml-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C8A35F] to-[#9e7d3a] text-white text-xs font-bold flex items-center justify-center shadow-md ring-2 ring-white">
          {step.num}
        </div>
      </div>

      {/* Cut-out visual inside soft backdrop */}
      <div className="relative mb-5">
        <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-amber-50 to-amber-100/60 flex items-center justify-center shadow-inner">
          <img
            src={step.img}
            alt={step.title}
            className="w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-[0_18px_30px_rgba(58,16,41,0.22)]"
            style={{ transform: `rotate(${step.rotate}deg)` }}
            loading="lazy"
          />
        </div>
      </div>

      {/* Text */}
      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3A1029] mb-2">
        {step.title}
      </h3>
      <p className="text-slate-500 text-sm leading-[1.7] max-w-[280px]">
        {step.desc}
      </p>
    </Reveal>
  );
}

/* ── travelling motif along the SVG arc ─────────────────────────────── */
function TravellingMotif({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      el.style.offsetDistance = "100%";
      return;
    }

    let ticking = false;
    const section = el.closest<HTMLElement>("[data-how-it-works]");
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh + rect.height)),
      );
      el.style.offsetDistance = `${progress * 100}%`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  return (
    <div
      ref={ref}
      className="hidden lg:block absolute pointer-events-none z-0"
      style={{
        offsetPath:
          'path("M 180,130 C 340,130 340,310 500,310 C 660,310 660,130 820,130")',
        offsetRotate: "0deg",
        offsetDistance: "0%",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
      }}
      aria-hidden="true"
    >
      <img
        src={cutLeafPlatter}
        alt=""
        className="w-10 h-10 object-contain opacity-70 drop-shadow-lg"
        style={{ transform: "translate(-50%, -50%) rotate(12deg)" }}
      />
    </div>
  );
}

/* ── main section ───────────────────────────────────────────────────── */
export default function HowItWorks() {
  const [arcsVisible, setArcsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setArcsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-how-it-works
      className="relative py-24 sm:py-32 bg-[#FAF7F2] overflow-hidden"
    >
      <ScrollCutouts cutouts={[
        { src: cutSweets, side: "right", top: "8%", size: 180, rotate: -8 },
        { src: cutLeafPlatter, side: "left", top: "55%", size: 160, rotate: 10 },
      ]} />
      <div className="absolute left-[-30px] top-[40%] opacity-[0.03] text-plum pointer-events-none">
        <CenterKolam size={140} />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── heading ─────────────────────────────────────────── */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
              Simple Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3A1029] font-bold mt-2">
              How It Works
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-lg mx-auto font-normal leading-relaxed">
              From first enquiry to the final course — here's how we bring
              your dream menu to life in three effortless steps.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-amber-500/80">
              <div className="w-6 h-px bg-amber-400/40" />
              <span className="text-xs">❖</span>
              <div className="w-6 h-px bg-amber-400/40" />
            </div>
          </div>
        </Reveal>

        {/* ── steps grid (responsive) ─────────────────────────── */}
        <div className="relative">
          {/* Arc connectors — desktop only, behind steps */}
          <ArcConnectors visible={arcsVisible} />
          <TravellingMotif visible={arcsVisible} />

          {/* Desktop: staggered 3-col layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 relative z-10">
            {/* Step 1 — sits higher */}
            <div className="pt-0">
              <StepCard step={STEPS[0]} index={0} />
            </div>

            {/* Step 2 — sits lower */}
            <div className="pt-28">
              <StepCard step={STEPS[1]} index={1} />
            </div>

            {/* Step 3 — sits higher again */}
            <div className="pt-0">
              <StepCard step={STEPS[2]} index={2} />
            </div>
          </div>

          {/* Tablet: 2-col then 1 (no stagger) */}
          <div className="hidden sm:grid lg:hidden sm:grid-cols-2 sm:gap-10 relative z-10">
            <StepCard step={STEPS[0]} index={0} />
            <StepCard step={STEPS[1]} index={1} />
            <div className="sm:col-span-2 flex justify-center">
              <div className="w-full max-w-xs">
                <StepCard step={STEPS[2]} index={2} />
              </div>
            </div>
          </div>

          {/* Mobile: single column */}
          <div className="flex flex-col items-center gap-10 sm:hidden relative z-10">
            {STEPS.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
