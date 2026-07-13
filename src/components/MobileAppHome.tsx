import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Users,
  UtensilsCrossed,
  Heart,
  Briefcase,
  Home,
  Utensils,
  Sparkles,
  Coffee,
  ChefHat,
  IceCream,
  Soup,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
  Target,
  Crown,
  Leaf,
} from "lucide-react";
import lotusIcon from "@/assets/lotus icon.png";
import feastFood2 from "@/assets/feast-food-2.png";
import {
  HERO_SLIDES,
  PORTRAIT_SLIDES,
  TAMIL_MESSAGES,
  SERVICES_OFFERED,
  MENU_CATEGORIES,
  FAQS,
  TESTIMONIALS,
  GALLERY_ITEMS,
} from "@/data/homeContent";
import {
  realFeastMeal,
  liveCounter,
  weddingHall,
  gulabJamun,
  aiWeddingFeast,
} from "@/data/homeContent";

import BookingForm from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";
import { BananaLeafDivider } from "@/components/GrainDivider";
import { FoodPeek } from "@/components/FoodPeek";
import { SectionDoodleDivider } from "@/components/FloatingDoodles";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CateringMenusSection from "@/components/CateringMenusSection";

const ICON_MAP: Record<string, any> = {
  UtensilsCrossed,
  Heart,
  Briefcase,
  Home,
  Utensils,
  Sparkles,
  Coffee,
  ChefHat,
  IceCream,
  Soup,
};

export default function MobileAppHome() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [portraitSlide, setPortraitSlide] = useState(0);
  const [tamilSlide, setTamilSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  const scrollToBook = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    bookRef.current?.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  };

  /* ── Hero auto-advance ─────────────────────────────────────────────────── */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  /* ── Portrait carousel auto-advance ────────────────────────────────────── */
  useEffect(() => {
    const timer = setInterval(() => {
      setPortraitSlide((prev) => (prev + 1) % PORTRAIT_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  /* ── Tamil timed text carousel ─────────────────────────────────────────── */
  useEffect(() => {
    const timer = setInterval(() => {
      setTamilSlide((prev) => (prev + 1) % TAMIL_MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  /* ── Stats counter animation ───────────────────────────────────────────── */
  useEffect(() => {
    const statsSection = document.getElementById("stats-banner");
    if (!statsSection) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = [
              { sel: ".mstat-1", val: 15 },
              { sel: ".mstat-2", val: 3000 },
              { sel: ".mstat-3", val: 4500 },
              { sel: ".mstat-4", val: 120 },
            ];
            targets.forEach(({ sel, val }) => {
              const el = document.querySelector(sel);
              if (!el) return;
              let start = 0;
              const step = Math.max(1, Math.floor(val / 40));
              const iv = setInterval(() => {
                start += step;
                if (start >= val) {
                  start = val;
                  clearInterval(iv);
                }
                el.textContent = start.toLocaleString() + "+";
              }, 40);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(statsSection);
    return () => observer.disconnect();
  }, []);

  const handleHeroPrev = () =>
    setCurrentHeroSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  const handleHeroNext = () =>
    setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24 text-[#1A1208]">

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO CAROUSEL                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-[70dvh] w-full overflow-hidden select-none bg-black">
        {/* Background crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={HERO_SLIDES[currentHeroSlide].bg}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Marigold garland at top */}
        <MarigoldGarland
          count={10}
          className="absolute top-0 left-0 right-0 z-20 h-5"
        />

        {/* Slide content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 pb-12 z-10 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroSlide}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Headline in script font */}
              <span className="font-script text-white text-[clamp(2.2rem,8vw,3.5rem)] leading-tight whitespace-pre-line drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] tracking-wide">
                {HERO_SLIDES[currentHeroSlide].t}
              </span>

              {/* Gold divider */}
              <div className="w-16 h-px bg-[#e0bb9b]/60 my-4" />

              {/* Title */}
              <h1 className="font-serif text-[clamp(1rem,4vw,1.5rem)] text-[#e0bb9b] leading-snug tracking-wide font-medium max-w-[90%] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                {HERO_SLIDES[currentHeroSlide].title}
              </h1>

              {/* Subtitle */}
              <p className="text-cream/80 text-xs sm:text-sm max-w-[280px] leading-relaxed uppercase tracking-widest mt-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {HERO_SLIDES[currentHeroSlide].sub}
              </p>

              {/* CTA */}
              <div className="mt-5">
                {HERO_SLIDES[currentHeroSlide].link.startsWith("#") ? (
                  <button
                    onClick={scrollToBook}
                    className="px-8 py-3 bg-party-peach hover:bg-[#d6af8c] active:scale-95 text-white font-bold text-xs uppercase tracking-[0.22em] rounded-full transition-all shadow-[0_4px_15px_rgba(224,187,155,0.3)] duration-300"
                  >
                    {HERO_SLIDES[currentHeroSlide].cta}
                  </button>
                ) : (
                  <Link
                    to={HERO_SLIDES[currentHeroSlide].link}
                    className="inline-block px-8 py-3 bg-party-peach hover:bg-[#d6af8c] active:scale-95 text-white font-bold text-xs uppercase tracking-[0.22em] rounded-full transition-all shadow-[0_4px_15px_rgba(224,187,155,0.3)] duration-300"
                  >
                    {HERO_SLIDES[currentHeroSlide].cta}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={handleHeroPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white bg-black/20 hover:bg-black/40 border border-white/20 rounded-sm active:scale-90 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleHeroNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-white bg-black/20 hover:bg-black/40 border border-white/20 rounded-sm active:scale-90 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-10 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentHeroSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                currentHeroSlide === i
                  ? "bg-party-peach w-6"
                  : "bg-white/40 hover:bg-white/60 w-1.5"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Curved wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 w-full pointer-events-none overflow-hidden z-20">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full text-[#FAF7F2] fill-current"
          >
            <path d="M0,40 C360,95 1080,95 1440,40 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. STATS PILL BANNER                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="stats-banner" className="bg-[#FAF7F2] pt-4 pb-8 px-4">
        <div className="bg-gradient-to-r from-[#4d1234] via-[#541539] to-[#3f0e2b] rounded-2xl shadow-xl text-white py-5 px-5 border border-amber-400/30">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <Target className="w-4 h-4 text-amber-300 mb-1 opacity-90" />
              <span className="mstat-1 font-serif text-[clamp(1.4rem,5vw,2.2rem)] font-bold tracking-tight text-white">
                0+
              </span>
              <span className="text-[clamp(0.6rem,2.5vw,0.75rem)] font-semibold tracking-wider text-amber-200/90 uppercase mt-0.5">
                Years of Experience
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Crown className="w-4 h-4 text-amber-300 mb-1 opacity-90" />
              <span className="mstat-2 font-serif text-[clamp(1.4rem,5vw,2.2rem)] font-bold tracking-tight text-white">
                0+
              </span>
              <span className="text-[clamp(0.6rem,2.5vw,0.75rem)] font-semibold tracking-wider text-amber-200/90 uppercase mt-0.5">
                Happy Clients
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <UtensilsCrossed className="w-4 h-4 text-amber-300 mb-1 opacity-90" />
              <span className="mstat-3 font-serif text-[clamp(1.4rem,5vw,2.2rem)] font-bold tracking-tight text-white">
                0+
              </span>
              <span className="text-[clamp(0.6rem,2.5vw,0.75rem)] font-semibold tracking-wider text-amber-200/90 uppercase mt-0.5">
                Events Catered
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 mb-1 opacity-90" />
              <span className="mstat-4 font-serif text-[clamp(1.4rem,5vw,2.2rem)] font-bold tracking-tight text-white">
                0+
              </span>
              <span className="text-[clamp(0.6rem,2.5vw,0.75rem)] font-semibold tracking-wider text-amber-200/90 uppercase mt-0.5">
                Varieties in Menus
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. FOOD PEEK STRIP                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-4 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 overflow-hidden relative z-10">
        <div className="flex items-center justify-center gap-4 px-4 overflow-x-auto no-scrollbar">
          <FoodPeek src={aiWeddingFeast} alt="Wedding menu" size={44} />
          <FoodPeek src={realFeastMeal} alt="Traditional meal" size={40} />
          <FoodPeek src={gulabJamun} alt="Traditional sweets" size={42} />
          <FoodPeek src={liveCounter} alt="Live counter" size={40} />
          <FoodPeek src={weddingHall} alt="Wedding hall" size={44} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. BANANA LEAF DIVIDER                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <BananaLeafDivider />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 5. WELCOME SECTION                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-[#FAF7F2] border-t border-amber-900/5 relative overflow-hidden">
        <div className="max-w-xl mx-auto relative z-10 space-y-4">
          <Reveal>
            <div className="flex items-center justify-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-300/40 p-0.5 shrink-0">
                <img
                  src={lotusIcon}
                  alt="Lotus"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em]">
                WELCOME TO MCC
              </span>
            </div>
            <h2 className="font-serif text-[clamp(1.5rem,6vw,2.5rem)] text-[#3A1029] font-bold mt-2">
              Welcome to My Chennai Catering
            </h2>
            <div className="flex items-center gap-2 text-amber-500/80">
              <div className="w-6 h-px bg-amber-400/40" />
              <span className="text-xs">❖</span>
              <div className="w-6 h-px bg-amber-400/40" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              At My Chennai Catering (MCC), we bring together authentic South
              Indian cuisine, premium ingredients, and professional catering
              services to create unforgettable celebrations. With over two
              decades of experience, we cater to weddings, corporate events, and
              special occasions across Chennai.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <button
              onClick={scrollToBook}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#541539] hover:bg-[#3f0e2b] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all duration-300"
            >
              <span>Request a Free Quote</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src={feastFood2}
                alt="Authentic South Indian cuisine"
                className="w-full h-48 object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 6. SERVICES WE OFFER                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-[#FAF7F2] relative overflow-hidden z-10">
        <div className="max-w-xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-8">
              <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
                OUR SERVICES
              </span>
              <h2 className="font-serif text-[clamp(1.5rem,6vw,2.5rem)] text-[#3A1029] font-bold mt-2">
                Our Catering Services
              </h2>
              <div className="flex items-center justify-center gap-2 mt-3 text-amber-500/80">
                <div className="w-6 h-px bg-amber-400/40" />
                <span className="text-xs">❖</span>
                <div className="w-6 h-px bg-amber-400/40" />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 relative z-10">
            {SERVICES_OFFERED.map((service, index) => {
              const Icon = ICON_MAP[service.iconName] || Sparkles;
              return (
                <Reveal key={index} delay={index * 0.05}>
                  <Link
                    to="/services"
                    className="bg-white rounded-xl p-3 border border-amber-900/10 hover:border-amber-400/50 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col items-center text-center overflow-hidden h-full"
                  >
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-2 relative bg-slate-100">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <Icon className="w-3 h-3 text-amber-600 group-hover:scale-110 transition-transform" />
                      <span className="text-[clamp(0.6rem,2.5vw,0.75rem)] font-bold text-slate-800 tracking-wider uppercase leading-tight">
                        {service.title}
                      </span>
                    </div>
                    <p className="text-[clamp(0.6rem,2.2vw,0.7rem)] text-slate-500 leading-snug font-normal">
                      {service.desc}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="text-center mt-6">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#541539] hover:bg-[#3f0e2b] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span>VIEW ALL SERVICES</span>
                <Leaf className="w-3 h-3 text-emerald-400" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 7. EXPLORE OUR MENUS                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-[#FAF7F2] border-t border-amber-900/5 relative overflow-hidden">
        <div className="max-w-xl mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
                OUR MENU
              </span>
              <h2 className="font-serif text-[clamp(1.5rem,6vw,2.5rem)] text-[#3A1029] font-bold mt-2">
                Our Signature Menu
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-sm mx-auto font-normal">
                Explore a variety of authentic South Indian delicacies prepared
                with fresh ingredients and traditional recipes.
              </p>
              <div className="flex items-center justify-center gap-2 mt-3 text-amber-500/80">
                <div className="w-6 h-px bg-amber-400/40" />
                <span className="text-xs">❖</span>
                <div className="w-6 h-px bg-amber-400/40" />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3">
            {MENU_CATEGORIES.map((menu, index) => {
              const Icon = ICON_MAP[menu.iconName] || Sparkles;
              return (
                <Reveal key={index} delay={index * 0.05}>
                  <Link
                    to="/menu"
                    className="bg-white rounded-xl p-3 border border-amber-900/10 hover:border-amber-400/50 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col items-center text-center overflow-hidden h-full"
                  >
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-2 relative bg-slate-100">
                      <img
                        src={menu.img}
                        alt={menu.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <Icon className="w-3 h-3 text-amber-600 mb-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-[clamp(0.6rem,2.5vw,0.75rem)] font-bold text-slate-800 tracking-wider uppercase">
                      {menu.title}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="text-center mt-6">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#541539] hover:bg-[#3f0e2b] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span>EXPLORE MENU</span>
                <Leaf className="w-3 h-3 text-emerald-400" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 8. HOW IT WORKS                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <HowItWorks />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 9. WHY CHOOSE US                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <WhyChooseUsSection />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 10. BANANA LEAF DIVIDER                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <BananaLeafDivider />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 11. PHILOSOPHY SECTION                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 bg-plum-dark text-cream overflow-hidden">
        <MarigoldGarland
          count={8}
          className="absolute top-0 left-0 right-0 z-20 h-5"
        />

        {/* Decorative kolam */}
        <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none z-0">
          <CenterKolam size={220} />
        </div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_30%,rgba(212,175,55,0.25),transparent_60%)]" />

        <div className="relative max-w-xl mx-auto px-4 z-10 space-y-8">
          {/* Philosophy header */}
          <Reveal>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-300/40 p-0.5 shrink-0">
                <img
                  src={lotusIcon}
                  alt="Lotus"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">
                MCC's PHILOSOPHY
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-serif text-[clamp(1.3rem,5vw,2rem)] mt-2 leading-[1.15]">
              The <span className="text-gold-gradient italic">Trusted Choice</span> for Premium
              Catering Services in Chennai.
            </h2>
          </Reveal>

          {/* Gold ornament stroke */}
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-gold via-gold/60 to-transparent" />

          {/* Portrait carousel */}
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-tr from-gold/30 via-plum/60 to-gold/20 rounded-3xl blur-xl opacity-50 pointer-events-none" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-gold/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)] bg-black/40">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 backdrop-blur-md border border-gold/40 text-gold text-[10px] uppercase font-bold tracking-widest mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{PORTRAIT_SLIDES[portraitSlide].title}</span>
                  </div>
                  <p className="text-cream/90 text-xs font-serif italic">
                    {PORTRAIT_SLIDES[portraitSlide].desc}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setPortraitSlide(
                      (prev) =>
                        (prev - 1 + PORTRAIT_SLIDES.length) %
                        PORTRAIT_SLIDES.length,
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-90"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setPortraitSlide(
                      (prev) => (prev + 1) % PORTRAIT_SLIDES.length,
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-90"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="absolute top-3 right-3 z-30 flex gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/15">
                  {PORTRAIT_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPortraitSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        portraitSlide === i
                          ? "w-4 bg-gold"
                          : "w-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tamil timed text carousel */}
          <div className="bg-black/30 backdrop-blur-md p-5 rounded-2xl border border-gold/25 relative min-h-[150px] flex flex-col justify-between overflow-hidden shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={tamilSlide}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-[10px] uppercase font-bold tracking-widest">
                  <span>{TAMIL_MESSAGES[tamilSlide].badge}</span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-amber-200 font-bold leading-tight">
                  {TAMIL_MESSAGES[tamilSlide].heading}
                </h3>
                <p className="text-cream/90 text-xs sm:text-sm leading-relaxed font-sans">
                  {TAMIL_MESSAGES[tamilSlide].body}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gold/15">
              {TAMIL_MESSAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTamilSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    tamilSlide === idx
                      ? "w-5 bg-gold"
                      : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Tamil slide ${idx + 1}`}
                />
              ))}
              <span className="text-[10px] text-cream/50 ml-auto font-mono">
                {tamilSlide + 1} / {TAMIL_MESSAGES.length}
              </span>
            </div>
          </div>

          {/* Feature badges */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { i: ChefHat, t: "Custom Menus" },
                { i: Award, t: "20+ Years" },
                { i: Users, t: "Family-led" },
              ].map(({ i: Icon, t }) => (
                <div
                  key={t}
                  className="text-center p-3 rounded-xl border border-gold/20 bg-plum/30"
                >
                  <Icon className="w-4 h-4 text-gold mx-auto mb-1.5" />
                  <div className="text-[10px] uppercase tracking-wider text-cream/80">
                    {t}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 12. CATERING MENUS SECTION                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <CateringMenusSection />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 13. DOODLE DIVIDER                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <SectionDoodleDivider variant="kolam" />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 14. TESTIMONIALS                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-16 bg-plum text-cream px-4">
        <div className="max-w-xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold">
                Voices from our table
              </span>
              <h2 className="font-serif text-[clamp(1.5rem,6vw,2.5rem)] mt-3">
                Loved across Chennai
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {TESTIMONIALS.map((t) => (
              <Reveal key={t.n}>
                <div className="bg-plum-dark/60 backdrop-blur rounded-2xl p-5 border border-gold/20">
                  <div className="flex gap-1 text-gold mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold" />
                    ))}
                  </div>
                  <p className="text-cream/85 leading-relaxed italic font-serif text-sm sm:text-base">
                    "{t.q}"
                  </p>
                  <div className="mt-4 pt-3 border-t border-gold/15 text-xs uppercase tracking-[0.2em] text-gold">
                    {t.n}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 15. GALLERY                                                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="gallery" className="py-16 bg-[#FAF7F2] px-4">
        <div className="max-w-xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-10">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-bold">
                CAPTURED MOMENTS
              </span>
              <h2 className="font-serif text-[clamp(1.5rem,6vw,2.5rem)] text-plum-dark mt-3 leading-tight">
                Our Menu Gallery
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-sm mx-auto font-normal">
                Browse our collection of beautifully arranged wedding menus,
                buffet setups, traditional banana leaf meals, and more.
              </p>
              <div className="flex items-center justify-center gap-3 mt-3 select-none pointer-events-none">
                <div className="w-10 h-[1px] bg-gold/50" />
                <span className="text-gold text-sm">✦</span>
                <div className="w-10 h-[1px] bg-gold/50" />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3">
            {GALLERY_ITEMS.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-gold/15 transition-all duration-500 hover:shadow-xl hover:border-gold/30">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A163F]/80 via-[#2A163F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div className="text-left">
                      <span className="text-gold text-[10px] uppercase tracking-widest font-bold">
                        MCC Premium
                      </span>
                      <h4 className="font-serif text-white text-xs mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="text-center mt-8">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#541539] hover:bg-[#3f0e2b] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all duration-300"
              >
                <span>View Gallery</span>
                <Leaf className="w-3 h-3 text-emerald-400" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 16. FAQ                                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#FAF7F2] px-4 border-t border-amber-900/5">
        <div className="max-w-xl mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <span className="text-[#541539] font-bold text-xs uppercase tracking-[0.25em] block">
                HAVE QUESTIONS?
              </span>
              <h2 className="font-serif text-[clamp(1.3rem,5vw,2.2rem)] text-[#3A1029] font-bold mt-2">
                Frequently Asked Questions
              </h2>
              <div className="flex items-center justify-center gap-2 mt-3 text-amber-500/80">
                <div className="w-6 h-px bg-amber-400/40" />
                <span className="text-xs">❖</span>
                <div className="w-6 h-px bg-amber-400/40" />
              </div>
            </div>
          </Reveal>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="bg-white rounded-2xl border border-amber-900/10 hover:border-amber-400/40 transition-colors duration-300 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full py-4 px-5 flex items-center justify-between text-left group"
                    >
                      <span className="font-sans font-bold text-slate-800 text-sm group-hover:text-[#541539] transition-colors pr-3">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 group-hover:text-[#541539] transition-transform duration-300 shrink-0 ${
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
                          <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 border-t border-slate-50 pt-3 leading-relaxed">
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 17. DOODLE DIVIDER                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <SectionDoodleDivider variant="kolam" />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 18. BOOKING CTA                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="book"
        ref={bookRef}
        tabIndex={-1}
        className="py-16 bg-[#FAF7F2] scroll-mt-24 outline-none"
      >
        <div className="max-w-xl mx-auto px-4 space-y-6">
          <Reveal>
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold">
              Begin Your Inquiry
            </span>
            <h2 className="font-serif text-[clamp(1.5rem,6vw,2.5rem)] text-[#3A1029] mt-3 leading-tight">
              Let MCC curate{" "}
              <em className="text-gold-gradient not-italic">
                your sacred menu.
              </em>
            </h2>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed">
              Share a few details and our team will respond with a tailored
              proposal — menu cards, decor mockups and an exact quote — within
              one business hour.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold shrink-0" /> Free
                consultation & sample tasting
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold shrink-0" /> Custom
                menus across all budgets
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold shrink-0" /> Decor,
                hosts & live counters included
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-5 border border-amber-900/10 shadow-sm">
              <BookingForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
