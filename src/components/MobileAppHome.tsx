import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Leaf, Sparkles, Star } from "lucide-react";

import {
  BOOKING, FAQS, FOOD_PEEK_ITEMS, GALLERY_ITEMS, HERO_SLIDES, LOTUS_ICON,
  MENU_CATEGORIES, PHILOSOPHY_BADGES, PHILOSOPHY_IMAGE, PORTRAIT_SLIDES,
  RESOURCES, SERVICES_OFFERED, STATS, TAMIL_MESSAGES, TESTIMONIALS,
  WELCOME, WELCOME_IMAGE,
} from "@/data/homeContent";

import BookingForm from "./BookingForm";
import CateringMenusSection from "./CateringMenusSection";
import HowItWorks from "./HowItWorks";
import WhyChooseUsSection from "./WhyChooseUsSection";
import MarigoldGarland from "./MarigoldGarland";
import { BananaLeafDivider } from "./GrainDivider";
import { CenterKolam } from "./Kolam";
import { FoodPeek } from "./FoodPeek";
import { Reveal } from "./Reveal";
import { SectionDoodleDivider } from "./FloatingDoodles";

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
  const [portraitSlide, setPortraitSlide] = useState(0);
  const [tamilSlide, setTamilSlide] = useState(0);
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

  /* Auto-play: hero 7s, portrait 5.5s, Tamil 4.5s — same as desktop */
  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPortraitSlide((p) => (p + 1) % PORTRAIT_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTamilSlide((p) => (p + 1) % TAMIL_MESSAGES.length), 4500);
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
    <div className="w-full overflow-x-hidden bg-[#FAF7F2]">
      {/* ═══ 1. HERO CAROUSEL ═══════════════════════════════════════════ */}
      <section
        className="relative min-h-[78vh] flex items-center justify-center text-cream bg-black overflow-hidden select-none pt-10 pb-20"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
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

        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

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
      </section>

      {/* ═══ 2. STATS PILL BANNER ═══════════════════════════════════════ */}
      <section id="stats-banner" className={`bg-[#FAF6F0] pt-6 pb-10 px-4 ${SCROLL_MT}`}>
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

      {/* ═══ 3. FOOD PEEK STRIP ═════════════════════════════════════════ */}
      <section className="py-5 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 relative z-10">
        <div className="flex items-center gap-4 px-4 overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {FOOD_PEEK_ITEMS.map((item) => (
            <div key={item.alt} className="snap-center shrink-0">
              <FoodPeek src={item.src} alt={item.alt} size={Math.round(item.size * 0.8)} />
            </div>
          ))}
        </div>
      </section>

      <BananaLeafDivider />

      {/* ═══ 4. WELCOME ═════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-[#FAF7F2] border-t border-amber-900/5">
        <div className="space-y-5 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-300/40 p-0.5 shrink-0">
                <img src={LOTUS_ICON} alt="Lotus" className="w-full h-full object-contain" />
              </div>
              <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em]">
                {WELCOME.eyebrow}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] font-bold mt-2">
              {WELCOME.heading}
            </h2>

            <GoldRule />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-slate-600 text-sm leading-relaxed">{WELCOME.body}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-2xl shadow-glow-gold">
              <img
                src={WELCOME_IMAGE}
                alt="Authentic South Indian cuisine"
                className="w-full h-56 object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <button
              onClick={scrollToBook}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#541539] active:scale-95 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all"
            >
              <span>{WELCOME.cta}</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Reveal>
        </div>
      </section>

      {/* ═══ 5. OUR CATERING SERVICES ═══════════════════════════════════ */}
      <section className="py-12 px-4 bg-[#FAF7F2]">
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

      {/* ═══ 6. OUR SIGNATURE MENU ══════════════════════════════════════ */}
      <section className="py-12 px-4 bg-[#FAF7F2] border-t border-amber-900/5">
        <div className="text-center mb-8">
          <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
            OUR MENU
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] font-bold mt-2">
            Our Signature Menu
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Explore a variety of authentic South Indian delicacies prepared with fresh ingredients
            and traditional recipes.
          </p>
          <GoldRule />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {MENU_CATEGORIES.map((menu, i) => (
            <Reveal key={menu.title} delay={i * 0.05}>
              <Link
                to="/menu"
                className="bg-white rounded-2xl p-3 border border-amber-900/10 shadow-sm active:scale-[0.98] transition-all flex flex-col items-center text-center h-full"
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img
                    src={menu.img}
                    alt={menu.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-wide uppercase font-sans mt-auto leading-tight">
                  {menu.title}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#541539] active:scale-95 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all"
          >
            <span>EXPLORE MENU</span>
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Leaf className="w-3 h-3 text-emerald-400 fill-current" />
            </div>
          </Link>
        </div>
      </section>

      {/* ═══ 7. HOW IT WORKS ════════════════════════════════════════════ */}
      <HowItWorks />

      {/* ═══ 8. WHY CHOOSE US ═══════════════════════════════════════════ */}
      <WhyChooseUsSection />

      <BananaLeafDivider />

      {/* ═══ 9. PHILOSOPHY + PORTRAIT + TAMIL CAROUSEL ══════════════════ */}
      <section className="relative py-14 px-4 bg-plum-dark text-cream overflow-hidden">
        <MarigoldGarland count={6} className="absolute top-0 left-0 right-0 z-20 h-5" />

        <div className="absolute right-[-70px] top-1/3 opacity-[0.03] text-gold pointer-events-none z-0">
          <CenterKolam size={240} />
        </div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_30%,rgba(212,175,55,0.25),transparent_60%)]" />

        <div className="relative z-10 space-y-8">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-black/40">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={portraitSlide}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={PORTRAIT_SLIDES[portraitSlide].img}
                      alt={PORTRAIT_SLIDES[portraitSlide].title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-5 left-5 right-5 z-20">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 backdrop-blur-md border border-gold/40 text-gold text-xs uppercase font-bold tracking-widest mb-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{PORTRAIT_SLIDES[portraitSlide].title}</span>
                  </div>
                  <p className="text-cream/90 text-xs font-serif italic">
                    {PORTRAIT_SLIDES[portraitSlide].desc}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setPortraitSlide((p) => (p - 1 + PORTRAIT_SLIDES.length) % PORTRAIT_SLIDES.length)
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 border border-white/20 text-white flex items-center justify-center active:scale-90 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPortraitSlide((p) => (p + 1) % PORTRAIT_SLIDES.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 border border-white/20 text-white flex items-center justify-center active:scale-90 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="absolute top-4 right-4 z-30 flex gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  {PORTRAIT_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPortraitSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        portraitSlide === i ? "w-5 bg-gold" : "w-1.5 bg-white/40"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-300/40 p-0.5 shrink-0">
                  <img src={LOTUS_ICON} alt="Lotus" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold">
                  MCC's PHILOSOPHY
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-serif text-2xl sm:text-3xl mt-2 leading-[1.15]">
                The <span className="text-gold-gradient italic">Trusted Choice</span> for Premium
                Catering Services in Chennai.
              </h2>
            </Reveal>

            <div className="w-28 h-[1.5px] bg-gradient-to-r from-gold via-gold/60 to-transparent" />

            <div className="bg-black/30 backdrop-blur-md p-5 rounded-2xl border border-gold/25 relative min-h-[190px] flex flex-col justify-between overflow-hidden shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tamilSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-3"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs uppercase font-bold tracking-widest">
                    <span>{TAMIL_MESSAGES[tamilSlide].badge}</span>
                  </div>

                  <h3 className="font-serif text-lg text-amber-200 font-bold leading-tight">
                    {TAMIL_MESSAGES[tamilSlide].heading}
                  </h3>

                  <p className="text-cream/90 text-sm leading-relaxed font-sans">
                    {TAMIL_MESSAGES[tamilSlide].body}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-2 pt-4 mt-2 border-t border-gold/15">
                {TAMIL_MESSAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTamilSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      tamilSlide === idx ? "w-6 bg-gold" : "w-2 bg-white/30"
                    }`}
                    aria-label={`Tamil slide ${idx + 1}`}
                  />
                ))}
                <span className="text-xs text-cream/50 ml-auto font-mono">
                  {tamilSlide + 1} / {TAMIL_MESSAGES.length}
                </span>
              </div>
            </div>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl shadow-glow-gold">
                <img
                  src={PHILOSOPHY_IMAGE}
                  alt="Traditional South Indian spread"
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex items-center gap-4 py-2 border-y border-gold/15">
                <svg width="72" height="28" viewBox="0 0 120 40" fill="none" className="text-gold shrink-0">
                  <path
                    d="M10,25 C10,38 110,38 110,25 C104,22 16,22 10,25 Z"
                    fill="currentColor"
                    opacity="0.6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M45,35 Q60,39 75,35 L68,39 L52,39 Z" fill="currentColor" opacity="0.9" />
                  <circle cx="6" cy="24" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="114" cy="24" r="5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="text-xs text-gold/80 italic font-serif">
                  A symbol of traditional South Indian hospitality &amp; purity.
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-3 gap-2">
                {PHILOSOPHY_BADGES.map(({ icon: Icon, t }) => (
                  <div key={t} className="text-center p-2.5 rounded-xl border border-gold/20 bg-plum/30">
                    <Icon className="w-4 h-4 text-gold mx-auto mb-1.5" />
                    <div className="text-xs uppercase tracking-wider text-cream/80 leading-tight">
                      {t}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 10. CATERING MENUS ═════════════════════════════════════════ */}
      <CateringMenusSection />

      <SectionDoodleDivider variant="kolam" />

      {/* ═══ 11. TESTIMONIALS ═══════════════════════════════════════════ */}
      <section id="testimonials" className={`py-12 px-4 bg-plum text-cream ${SCROLL_MT}`}>
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
                  <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                ))}
              </div>
              <p className="text-cream/85 leading-relaxed italic font-serif text-base">"{t.q}"</p>
              <div className="mt-5 pt-5 border-t border-gold/15 text-xs uppercase tracking-[0.2em] text-gold">
                {t.n}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 12. GALLERY ════════════════════════════════════════════════ */}
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

      {/* ═══ 13. EVENT PLANNING RESOURCES ═══════════════════════════════ */}
      <section className="relative py-14 px-4 bg-plum-dark text-cream overflow-hidden border-t border-gold/15">
        <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none">
          <CenterKolam size={220} />
        </div>

        <div className="relative z-10 text-center space-y-5">
          <Reveal>
            <span className="text-gold font-bold text-xs uppercase tracking-[0.25em] block">
              {RESOURCES.eyebrow}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-amber-200 font-bold mt-2">
              {RESOURCES.heading}
            </h2>
            <div className="w-20 h-px bg-gold/50 mx-auto mt-3" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-cream/90 text-sm leading-relaxed">{RESOURCES.body}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-party-peach active:scale-95 text-white font-bold text-xs uppercase tracking-[0.22em] rounded-full shadow-[0_4px_15px_rgba(224,187,155,0.3)] transition-all"
            >
              <span>{RESOURCES.cta}</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══ 14. FAQ ════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-[#FAF7F2] border-t border-amber-900/5">
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

      {/* ═══ 15. BOOKING CTA ════════════════════════════════════════════ */}
      <section
        id="book"
        ref={bookRef}
        tabIndex={-1}
        className={`py-12 px-4 bg-cream outline-none ${SCROLL_MT}`}
      >
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
