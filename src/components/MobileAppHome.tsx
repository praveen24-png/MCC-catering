import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Leaf, Sparkles, Star } from "lucide-react";

import {
  BOOKING, FAQS, GALLERY_ITEMS, HERO_SLIDES,
  PACKAGES, SERVICES_OFFERED, STATS, TESTIMONIALS,
  VENUES,
} from "@/data/homeContent";

import BookingForm from "./BookingForm";
import CateringMenusSection from "./CateringMenusSection";
import HowItWorks from "./HowItWorks";
import WhyChooseUsSection from "./WhyChooseUsSection";
import { BananaLeafDivider } from "./GrainDivider";
import { CenterKolam, KolamDivider } from "./Kolam";
import { KolamLineArt } from "./KolamLineArt";
import { Reveal } from "./Reveal";
import { SectionDoodleDivider } from "./FloatingDoodles";
import { ScrollCutouts } from "./ScrollCutouts";
import { VenueLineArt } from "./VenueLineArt";
import VideoTestimonials from "./VideoTestimonials";
import MobileCategoryShortcuts from "./MobileCategoryShortcuts";
import cutLeafPlatter from "@/assets/cutout-leaf-platter.png";
import cutBiryani from "@/assets/cutout-biryani.png";
import cutSweets from "@/assets/cutout-sweets.png";
import cutTiffin from "@/assets/cutout-tiffin.png";
import cutWeddingFeast from "@/assets/cutout-wedding-feast.png";
import cutSpices from "@/assets/cutout-spices.png";
import lmGopuram from "@/assets/cutout-landmark-gopuram.png";
import lmGoldDome from "@/assets/cutout-landmark-gold-dome.png";
import aiWeddingFeast from "@/assets/ai-wedding-feast.png";
import aiTiffinFeast from "@/assets/ai-tiffin-feast.png";
import aiSweetsFeast from "@/assets/ai-sweets-feast.png";

const PACKAGE_IMAGES: Record<string, string> = {
  Silver: aiTiffinFeast,
  Gold: aiWeddingFeast,
  Premium: aiSweetsFeast,
};

/* Mobile header is ~158px tall (promo strip + main row + quick actions).
   Anchored sections must clear it or the heading hides underneath. */
const SCROLL_MT = "scroll-mt-[170px]";

function GoldRule() {
  return (
    <div className="flex items-center justify-center gap-2 mt-3 text-amber-500/80">
      <div className="w-6 h-px bg-amber-400/40" />
      <span className="text-xs">❖</span>
      <div className="w-6 h-px bg-amber-400/40" />
    </div>
  );
}

export default function MobileAppHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const bookRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);

  const scrollToBook = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bookRef.current?.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  };

  /* Auto-play: hero 7s — same as desktop */
  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      setCurrentSlide((p) =>
        dx < 0 ? (p + 1) % HERO_SLIDES.length : (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
      );
    }
    touchStartX.current = null;
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="w-full overflow-x-hidden bg-[#FFFDF8] pb-[88px]">
      {/* ═══ 1. HERO CAROUSEL ═══════════════════════════════════════════ */}
      <section
        className="relative h-[55vh] overflow-hidden select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
              <div className="absolute top-8 right-4 opacity-[0.20] pointer-events-none z-10">
                <KolamLineArt type="sikku" size={180} color="#C8951E" />
              </div>
              <div className="absolute bottom-8 left-4 opacity-[0.20] pointer-events-none z-10">
                <KolamLineArt type="neli" size={160} color="#C8951E" />
              </div>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img src={slide.bg} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/35" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 w-full px-5 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
              className="flex flex-col items-center"
            >
              <span className="font-script text-white text-4xl sm:text-5xl tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                {slide.t}
              </span>

              <h1 className="font-serif text-2xl sm:text-3xl text-[#e0bb9b] leading-tight tracking-wide font-medium mt-3 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                {slide.title}
              </h1>

              <div className="w-20 h-[2px] bg-[#e0bb9b] my-4 opacity-75" />

              <p className="text-cream/90 text-xs leading-relaxed tracking-widest uppercase mb-6 max-w-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {slide.sub}
              </p>

              {slide.link.startsWith("#") ? (
                <button
                  onClick={scrollToBook}
                  className="px-8 py-3 bg-party-peach active:scale-95 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-[0_4px_15px_rgba(224,187,155,0.3)] transition-all"
                >
                  {slide.cta}
                </button>
              ) : (
                <Link
                  to={slide.link}
                  className="px-8 py-3 bg-party-peach active:scale-95 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-[0_4px_15px_rgba(224,187,155,0.3)] transition-all"
                >
                  {slide.cta}
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-14 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === i ? "w-6 bg-party-peach" : "w-2 bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-10 w-full pointer-events-none overflow-hidden z-20">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full text-[#FAF6F0] fill-current"
          >
            <path d="M0,40 C360,95 1080,95 1440,40 L1440,100 L0,100 Z" />
          </svg>
        </div>

        {/* Scroll down arrow */}
        <button
          onClick={() => {
            const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            document.getElementById("about-mcc")?.scrollIntoView({
              behavior: prefersReduced ? "auto" : "smooth",
              block: "start",
            });
          }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white animate-bounce active:scale-90 transition-all pointer-events-auto"
          aria-label="Scroll to next section"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </section>

      <MobileCategoryShortcuts />

      {/* ═══ 2. ABOUT MCC ═══════════════════════════════════════════════ */}
      <section id="about-mcc" className="py-10 px-4 bg-[#FAF7F2] border-t border-amber-900/5 relative overflow-hidden">
        <ScrollCutouts cutouts={[
          { src: cutLeafPlatter, side: "right", top: "10%", size: 180, rotate: -6 },
          { src: cutSpices, side: "left", top: "60%", size: 160, rotate: 10 },
        ]} />
        <div className="text-center space-y-4">
          <Reveal>
            <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
              Welcome to MCC
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#3A1029] font-bold mt-2 leading-snug">
              Traditional South Indian Catering for Every Celebration
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
              20+ years of crafting unforgettable wedding feasts with authentic Tamil hospitality.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#541539] active:scale-95 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all"
            >
              Learn More
            </Link>
          </Reveal>
        </div>
      </section>

      <SectionDoodleDivider variant="lamp" />

      {/* ═══ 3. STATS PILL BANNER ═══════════════════════════════════════ */}
      <section id="stats-banner" className={`bg-[#FAF6F0] pt-6 pb-10 px-4 relative overflow-hidden ${SCROLL_MT}`}>
        <ScrollCutouts cutouts={[{ src: cutSpices, side: "right", top: "5%", size: 150, rotate: -10 }]} />
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.25em] text-slate-500 font-bold mb-4">
            Trusted by Families Across Chennai
          </p>
        </Reveal>
        <div className="bg-gradient-to-r from-[#4d1234] via-[#541539] to-[#3f0e2b] rounded-2xl shadow-xl text-white py-6 px-5 border border-amber-400/30">
          <div className="grid grid-cols-2 gap-6 text-center">
            {STATS.map(({ icon: Icon, cls, l1, l2 }) => (
              <div key={cls} className="flex flex-col items-center justify-center py-2">
                <Icon className="w-5 h-5 text-amber-300 mb-1.5 opacity-90" />
                <span className={`${cls} font-serif text-3xl font-bold tracking-tight text-white`}>
                  0+
                </span>
                <span className="text-xs font-semibold tracking-wider text-amber-200/90 uppercase mt-1 leading-tight">
                  {l1}
                  <br />
                  {l2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDoodleDivider variant="garland" />

      {/* CTA: Request Quote */}
      <div className="px-4 py-6 bg-[#FAF6F0] text-center">
        <Link
          to="/"
          hash="book"
          className="inline-flex items-center gap-2 px-8 py-3 bg-party-peach active:scale-95 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all"
        >
          Request a Quote
        </Link>
      </div>

      {/* ═══ 4. WEDDING MENU BUILDER TEASER ═════════════════════════════ */}
      <section className="py-12 px-4 bg-gradient-to-br from-[#541539] to-[#3A1029] relative overflow-hidden text-center">
        <ScrollCutouts variant="prominent" cutouts={[
          { src: cutWeddingFeast, side: "right", top: "15%", size: 200, rotate: -8 },
          { src: cutTiffin, side: "left", top: "55%", size: 160, rotate: 6 },
        ]} />
        <div className="absolute right-[-40px] top-[-20px] opacity-[0.06] text-gold pointer-events-none">
          <CenterKolam size={180} />
        </div>
        <Reveal>
          <span className="text-gold text-xs uppercase tracking-[0.25em] font-bold block">
            Core Feature
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-cream font-bold mt-2">
            Customize Your Own Saapadu Menu
          </h2>

          <div className="mt-5 space-y-2 max-w-xs mx-auto">
            {["Breakfast", "Lunch", "Dinner", "Desserts"].map((meal) => (
              <div key={meal} className="flex items-center gap-3 text-left bg-white/5 border border-gold/15 rounded-xl px-4 py-2.5">
                <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-gold" />
                </div>
                <span className="text-cream/90 text-sm font-medium">{meal}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 py-3 px-4 bg-black/20 rounded-xl border border-gold/15 inline-block">
            <span className="text-cream/60 text-xs uppercase tracking-wider">Estimated Cost</span>
            <p className="text-gold font-serif text-2xl font-bold mt-0.5">Instant Preview</p>
          </div>

          <Link
            to="/builder"
            className="inline-flex items-center gap-2 mt-5 px-8 py-3.5 bg-gold text-plum-dark text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Launch Saapadu Customizer</span>
          </Link>
        </Reveal>
      </section>

      {/* ═══ 5. POPULAR PACKAGES ═════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-[#FAF7F2] border-t border-amber-900/5 relative overflow-hidden">
        <div className="text-center mb-8 relative z-10">
          <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
            POPULAR PACKAGES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] font-bold mt-2">
            Choose Your Package
          </h2>
          <GoldRule />
        </div>

        <div className="flex flex-col gap-5 relative z-10">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.08}>
              <div
                className={`rounded-3xl overflow-hidden border shadow-lg ${
                  pkg.highlight
                    ? "border-gold/50 shadow-xl"
                    : "border-amber-900/10"
                }`}
              >
                {/* Image header */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={PACKAGE_IMAGES[pkg.name]}
                    alt={`${pkg.name} feast package`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {pkg.highlight && (
                      <span className="text-[9px] uppercase tracking-wider font-bold bg-gold text-plum-dark px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                        <Sparkles className="w-2.5 h-2.5" /> Most Popular
                      </span>
                    )}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-serif text-xl font-bold text-white drop-shadow">
                      {pkg.name} Feast
                    </h3>
                    <p className="text-[11px] text-white/70 mt-0.5">{pkg.tagline}</p>
                  </div>
                </div>

                {/* Content body */}
                <div className={`p-4 ${pkg.highlight ? "bg-[#3A1029]" : "bg-white"}`}>
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className={`flex items-center gap-1.5 text-[11px] ${
                          pkg.highlight ? "text-cream/80" : "text-slate-600"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 shrink-0 ${pkg.highlight ? "text-gold" : "text-emerald-600"}`}
                        />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/builder"
                    search={{ package: pkg.name.toLowerCase().replace(/\s+/g, "-") }}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold uppercase tracking-[0.15em] active:scale-[0.97] transition-all shadow-md ${
                      pkg.highlight
                        ? "bg-gold text-plum-dark"
                        : "bg-[#541539] text-white"
                    }`}
                  >
                    Customize {pkg.name}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center text-[10px] text-slate-400 mt-5 italic relative z-10">
          Indicative pricing per person. Final quote depends on menu, guest count & season.
        </p>
      </section>

      <SectionDoodleDivider variant="leaf" />

      {/* ═══ 6. OUR CATERING SERVICES ═══════════════════════════════════ */}
      <section className="py-12 px-4 bg-[#FAF7F2] relative overflow-hidden">
        <ScrollCutouts cutouts={[
          { src: cutSpices, side: "right", top: "3%", size: 130, rotate: -8 },
          { src: cutSweets, side: "left", top: "70%", size: 120, rotate: 10 },
        ]} />
        <div className="text-center mb-8">
          <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
            OUR SERVICES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] font-bold mt-2">
            Our Catering Services
          </h2>
          <GoldRule />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {SERVICES_OFFERED.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.05}>
                <Link
                  to="/services"
                  className="bg-white rounded-2xl p-3 border border-amber-900/10 shadow-sm active:scale-[0.98] transition-all flex flex-col items-center text-center h-full"
                >
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Icon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800 tracking-wide uppercase font-sans leading-tight">
                      {service.title}
                    </span>
                  </div>

                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-slate-100">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <p className="text-xs text-slate-500 leading-snug mt-auto">{service.desc}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#541539] active:scale-95 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all"
          >
            <span>VIEW ALL SERVICES</span>
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Leaf className="w-3 h-3 text-emerald-400 fill-current" />
            </div>
          </Link>
        </div>
      </section>

      {/* CTA: Book Event */}
      <div className="px-4 py-6 bg-[#FAF7F2] text-center border-t border-amber-900/5">
        <Link
          to="/"
          hash="book"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#541539] active:scale-95 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all"
        >
          Book Your Event
        </Link>
      </div>

      <SectionDoodleDivider variant="kolam" />

      {/* ═══ 7. WE CATER WHEREVER YOU CELEBRATE ═════════════════════════ */}
      <section className="py-12 px-4 bg-[#FAF7F2] border-t border-amber-900/5 relative overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] font-bold">
            {VENUES.heading}
          </h2>
          <GoldRule />
          <p className="text-sm text-slate-500 leading-relaxed mt-3 max-w-sm mx-auto">
            {VENUES.subheading}
          </p>
        </div>

        <div className="mt-10 mx-auto w-full max-w-4xl px-4 relative z-10">
          <VenueLineArt />
        </div>

        <div className="text-center mt-8">
          <Link
            to="/"
            hash="book"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#541539] active:scale-95 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all"
          >
            <span>{VENUES.ctaLabel}</span>
          </Link>
        </div>
      </section>

      <SectionDoodleDivider variant="leaf" />

      {/* ═══ 8. GALLERY ════════════════════════════════════════════════ */}
      <section id="gallery" className={`py-12 px-4 bg-cream relative overflow-hidden ${SCROLL_MT}`}>
        <div className="absolute right-[-40px] top-6 opacity-[0.02] text-plum pointer-events-none">
          <CenterKolam size={160} />
        </div>

        <div className="relative z-10">
          <Reveal>
            <div className="text-center mb-8">
              <span className="text-xs tracking-[0.3em] uppercase text-gold font-bold">
                CAPTURED MOMENTS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-plum-dark mt-3 leading-tight">
                Our Menu Gallery
              </h2>
              <p className="text-slate-600 text-sm mt-3">
                Browse our collection of beautifully arranged wedding menus, buffet setups,
                traditional banana leaf meals, live counters, and memorable celebrations.
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 select-none pointer-events-none">
                <div className="w-12 h-px bg-gold/50" />
                <span className="text-gold text-sm">✦</span>
                <div className="w-12 h-px bg-gold/50" />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {GALLERY_ITEMS.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-gold/15">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A163F]/90 via-transparent to-transparent flex items-end p-3">
                    <div className="text-left">
                      <span className="text-gold text-xs uppercase tracking-widest font-bold">
                        MCC Premium
                      </span>
                      <h4 className="font-serif text-white text-sm mt-0.5 leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/gallery"
              search={{ venue: "" }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#541539] active:scale-95 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all"
            >
              <span>View Gallery</span>
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Leaf className="w-3 h-3 text-emerald-400 fill-current" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <SectionDoodleDivider variant="garland" />

      {/* ═══ 9. WHY CHOOSE US ═══════════════════════════════════════════ */}
      <WhyChooseUsSection />

      <BananaLeafDivider />

      {/* ═══ 10. HOW IT WORKS ════════════════════════════════════════════ */}
      <HowItWorks />

      <SectionDoodleDivider variant="leaf" />

      {/* ═══ 11. TESTIMONIALS ═══════════════════════════════════════════ */}
      <section id="testimonials" className={`py-12 px-4 bg-plum text-cream relative overflow-hidden ${SCROLL_MT}`}>
        <ScrollCutouts variant="prominent" cutouts={[{ src: cutBiryani, side: "right", top: "55%", size: 190, rotate: 8 }]} />
        <Reveal>
          <div className="text-center mb-8">
            <span className="text-xs tracking-[0.3em] uppercase text-gold">
              Voices from our table
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl mt-3">Loved across Chennai</h2>
          </div>
        </Reveal>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 no-scrollbar">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.n}
              className="snap-center shrink-0 w-[85%] bg-plum-dark/60 backdrop-blur rounded-3xl p-6 border border-gold/20"
            >
              <div className="flex gap-1 text-gold mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-[18px] h-[18px] fill-gold text-gold" />
                ))}
              </div>
              <p className="text-cream/85 leading-relaxed italic font-serif text-base">"{t.q}"</p>
              <div className="mt-5 pt-5 border-t border-gold/15 text-xs uppercase tracking-[0.2em] text-gold">
                {t.n}
              </div>
            </div>
          ))}
        </div>

        <div className="my-6">
          <KolamDivider className="text-gold/40" />
        </div>

        <VideoTestimonials />
      </section>

      {/* CTA: Contact Us */}
      <div className="px-4 py-6 bg-plum text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold active:scale-95 text-plum-dark text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all"
        >
          Contact Us
        </Link>
      </div>

      {/* ═══ 12. MENUS ══════════════════════════════════════════════════ */}
      <CateringMenusSection />

      <SectionDoodleDivider variant="kolam" />

      {/* ═══ 13. FAQ ════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-[#FAF7F2] border-t border-amber-900/5 relative overflow-hidden">
        <ScrollCutouts cutouts={[{ src: cutSweets, side: "right", top: "8%", size: 140, rotate: -6 }]} />
        <Reveal>
          <div className="text-center mb-8">
            <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
              HAVE QUESTIONS?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] font-bold mt-2">
              Frequently Asked Questions
            </h2>
            <GoldRule />
          </div>
        </Reveal>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <Reveal key={faq.q} delay={idx * 0.05}>
                <div className="bg-white rounded-2xl border border-amber-900/10 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full py-4 px-5 flex items-center justify-between gap-3 text-left"
                  >
                    <span className="font-sans font-bold text-slate-800 text-sm">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 text-sm text-slate-600 border-t border-slate-50 pt-3 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.25}>
          <div className="text-center mt-8">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#541539] active:scale-95 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all"
            >
              <span>View All FAQs</span>
            </Link>
          </div>
        </Reveal>
      </section>

      <SectionDoodleDivider variant="kolam" />

      {/* ═══ 14. CONTACT ═══════════════════════════════════════════════ */}
      <section
        id="book"
        ref={bookRef}
        tabIndex={-1}
        className={`py-12 px-4 bg-cream outline-none relative overflow-hidden ${SCROLL_MT}`}
      >
        <ScrollCutouts cutouts={[
          { src: cutBiryani, side: "left", top: "10%", size: 160, rotate: 8 },
          { src: lmGopuram, side: "right", top: "55%", size: 130, rotate: -5 },
        ]} />
        <Reveal>
          <span className="text-xs tracking-[0.3em] uppercase text-gold">{BOOKING.eyebrow}</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-plum mt-3 leading-tight">
            {BOOKING.headingA}
            <em className="text-gold-gradient not-italic">{BOOKING.headingB}</em>
          </h2>
          <p className="mt-4 text-sm text-foreground/70 leading-relaxed">{BOOKING.body}</p>
          <div className="mt-6 mb-8 flex flex-col gap-2 text-sm text-foreground/70">
            {BOOKING.bullets.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <BookingForm />
        </Reveal>
      </section>
    </div>
  );
}
