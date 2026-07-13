import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { DoodleLayer } from "@/components/DoodleLayer";
import cutLeafPlatter from "@/assets/cutout-leaf-platter.png";
import cutBiryani from "@/assets/cutout-biryani.png";
import cutSweets from "@/assets/cutout-sweets.png";
import cutSpices from "@/assets/cutout-spices.png";
import cutWeddingFeast from "@/assets/cutout-wedding-feast.png";
import feastFood2 from "@/assets/feast-food-2.png";
import weddingHallImg from "@/assets/IMG_4558.webp";

/* ── parallax wrapper for individual cut-outs ──────────────────────── */
function ParallaxCutout({
  src,
  alt,
  className,
  speed = 0.15,
  rotate = 0,
}: {
  src: string;
  alt: string;
  className: string;
  speed?: number;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 60, -speed * 60]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate }}
      className={`absolute pointer-events-none z-10 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain drop-shadow-[0_14px_28px_rgba(58,16,41,0.22)]"
        loading="lazy"
      />
    </motion.div>
  );
}

/* ── main section ──────────────────────────────────────────────────── */
export default function OurStorySection() {
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-20 pb-20">
      {/* ── background doodles (parallax via DoodleLayer) ──────────── */}
      <DoodleLayer section="about" blendOverride="soft-light" />

      <div className="px-6 lg:px-12 max-w-7xl mx-auto relative z-20">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* ================================================================ */}
          {/* LEFT COLUMN — text + collage stacked                             */}
          {/* ================================================================ */}
          <div className="lg:col-span-6 space-y-6">
            {/* ── heading ──────────────────────────────────────────── */}
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
                Our Journey &amp; Roots
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1029] mt-1">
                Our Story: A Legacy of Flavor
              </h2>
            </Reveal>

            {/* ── body text ────────────────────────────────────────── */}
            <Reveal delay={0.1}>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                From our humble beginnings in Pattabiram, we have grown into
                one of the most trusted wedding caterers in Chennai. Our
                journey has been defined by a deep commitment to traditional
                recipes, the use of fresh, locally sourced ingredients, and a
                passion for customer satisfaction.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-3">
                Under the leadership of <strong>D. Venkat</strong>, our team
                has served thousands of happy clients, earning a reputation
                for reliability, hygiene, and the true essence of South Indian
                culinary traditions.
              </p>
            </Reveal>

            {/* ── stat pills ───────────────────────────────────────── */}
            <Reveal delay={0.2}>
              <div className="pt-2 grid sm:grid-cols-2 gap-4">
                <div className="bg-amber-100/60 p-4 rounded-2xl border border-amber-300/60">
                  <div className="font-serif text-2xl font-bold text-[#3A1029]">
                    20+ Years
                  </div>
                  <div className="text-xs text-slate-600 font-semibold mt-0.5">
                    Culinary Heritage
                  </div>
                </div>
                <div className="bg-emerald-100/60 p-4 rounded-2xl border border-emerald-300/60">
                  <div className="font-serif text-2xl font-bold text-emerald-900">
                    2000+ Events
                  </div>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                    Successful Functions
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── layered collage ──────────────────────────────────── */}
            <Reveal delay={0.25}>
              <motion.div
                className="relative mt-4"
                whileHover={
                  prefersReduced
                    ? undefined
                    : { scale: 1.01, rotate: 0.5, transition: { duration: 0.4 } }
                }
              >
                {/* Primary image — banana-leaf sadhya, rotated -3deg */}
                <div
                  className="relative rounded-2xl overflow-hidden border-4 border-[#FAF7F0] shadow-[0_20px_50px_rgba(58,16,41,0.18)]"
                  style={{ transform: "rotate(-3deg)" }}
                >
                  <img
                    src={feastFood2}
                    alt="Traditional South Indian banana leaf feast"
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                  {/* cream mat / border tint */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-amber-900/5 rounded-2xl pointer-events-none" />
                </div>

                {/* Secondary image — live counter, offset behind, rotated +4deg */}
                <div
                  className="absolute -bottom-5 -right-3 sm:-right-5 w-[42%] rounded-xl overflow-hidden border-4 border-[#FAF7F0] shadow-[0_14px_35px_rgba(58,16,41,0.15)] z-10"
                  style={{ transform: "rotate(4deg)" }}
                >
                  <img
                    src={weddingHallImg}
                    alt="Catering serving setup"
                    className="w-full h-28 sm:h-36 object-cover"
                  />
                </div>

                {/* Cut-out — banana leaf platter breaking top-right edge */}
                <div
                  className="absolute -top-6 -right-5 sm:-right-8 w-20 sm:w-24 z-20 pointer-events-none"
                  style={{ transform: "rotate(-8deg)" }}
                >
                  <img
                    src={cutLeafPlatter}
                    alt=""
                    className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(58,16,41,0.25)]"
                    loading="lazy"
                  />
                </div>

                {/* Cut-out — biryani breaking bottom-left edge */}
                <div
                  className="absolute -bottom-7 -left-4 sm:-left-6 w-16 sm:w-20 z-20 pointer-events-none"
                  style={{ transform: "rotate(10deg)" }}
                >
                  <img
                    src={cutBiryani}
                    alt=""
                    className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(58,16,41,0.22)]"
                    loading="lazy"
                  />
                </div>

                {/* Cut-out — sweets floating above right */}
                <div
                  className="absolute -top-8 right-[30%] w-14 sm:w-16 z-20 pointer-events-none"
                  style={{ transform: "rotate(6deg)" }}
                >
                  <img
                    src={cutSweets}
                    alt=""
                    className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(58,16,41,0.2)]"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* ================================================================ */}
          {/* RIGHT COLUMN — Milestones & Journey card                        */}
          {/* ================================================================ */}
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-lg sticky top-28">
                <h3 className="font-serif text-2xl font-bold text-[#3A1029] mb-6 border-b border-slate-100 pb-3">
                  Milestones &amp; Journey
                </h3>
                <div className="relative pl-6 border-l-2 border-amber-400/40 space-y-6">
                  {TIMELINE.map((item) => (
                    <div key={item.y} className="relative">
                      <div className="absolute -left-[1.85rem] top-0 w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-xs" />
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                        {item.y}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#3A1029]">
                        {item.t}
                      </h4>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        {item.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── scattered cut-out food images with parallax ──────────────── */}
      <ParallaxCutout
        src={cutSpices}
        alt=""
        className="top-16 right-4 sm:right-12 w-16 sm:w-24 rotate-[6deg] opacity-75"
        speed={0.12}
      />
      <ParallaxCutout
        src={cutWeddingFeast}
        alt=""
        className="bottom-24 left-4 sm:left-10 w-14 sm:w-20 rotate-[-10deg] opacity-65"
        speed={-0.1}
      />

      {/* ── mobile: reduced doodles & cut-outs handled by DoodleLayer ─ */}
    </section>
  );
}

/* ── timeline data (same as original) ─────────────────────────────── */
const TIMELINE = [
  {
    y: "2003",
    t: "Humble Beginnings in Pattabiram",
    d: "Founded by D. Venkat to serve pure, traditional South Indian vegetarian recipes to local families.",
  },
  {
    y: "2008",
    t: "Expansion Across West Chennai",
    d: "Became the most trusted catering partner for weddings, poojas & functions across Avadi, Ambattur, and Thiruverkadu.",
  },
  {
    y: "2014",
    t: "Live Counters & Modern Buffets",
    d: "Introduced hot Dosa counters, Chaat stations, and grand sweet stalls for traditional saapadu experiences.",
  },
  {
    y: "2019",
    t: "Grand Kalyana Virundhu",
    d: "Luxury mandapam dining arrangements, madisar-style servers, and high-capacity event setups.",
  },
  {
    y: "Today",
    t: "Two Decades of Excellence",
    d: "2000+ memorable celebrations served across Chennai with 100% pure veg taste, hygiene, and perfection.",
  },
];
