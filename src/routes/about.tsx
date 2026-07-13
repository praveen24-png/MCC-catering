import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollCutouts } from "@/components/ScrollCutouts";
import aboutImage from "@/assets/1.jpg";
import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";
import cutBiryani from "@/assets/cutout-biryani.png";
import cutLeafPlatter from "@/assets/cutout-leaf-platter.png";
import cutSweets from "@/assets/cutout-sweets.png";
import cutTiffin from "@/assets/cutout-tiffin.png";
import lmGopuram from "@/assets/cutout-landmark-gopuram.png";
import lmGoldDome from "@/assets/cutout-landmark-gold-dome.png";
import { Reveal } from "@/components/Reveal";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";
import {
  Award,
  Leaf,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  Utensils,
  MapPin,
  Phone,
  Calendar,
  Building2,
  Users,
  ArrowRight,
} from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { FloatingFoodDoodles, SectionDoodleDivider } from "@/components/FloatingDoodles";
import { DoodleLayer } from "@/components/DoodleLayer";
import { AnimatedFoodDoodles } from "@/components/AnimatedFoodDoodles";
import { BananaLeafDivider } from "@/components/GrainDivider";
import OurStorySection from "@/components/OurStorySection";
import feastHero from "@/assets/feast-hero.png";
import weddingHallImg from "@/assets/IMG_4558.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About My Chennai Catering | Authentic Taste, Traditional Excellence" },
      {
        name: "description",
        content:
          "Welcome to My Chennai Catering Services (MCC), your premier partner for vegetarian catering in Chennai. 20+ years of legacy under D. Venkat's leadership.",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
      },
      {
        property: "og:title",
        content: "About My Chennai Catering Services | Authentic Taste, Traditional Excellence",
      },
      {
        property: "og:description",
        content:
          "20+ years of expertise in pure vegetarian & Sattvik catering across Chennai. Founded & led by D. Venkat.",
      },
      {
        property: "og:url",
        content: "https://mychennaicateringservices.com/about-my-chennai-catering/",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://mychennaicateringservices.com/about-my-chennai-catering/",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About My Chennai Catering Services",
          url: "https://mychennaicateringservices.com/about-my-chennai-catering/",
          mainEntity: {
            "@type": "CateringService",
            name: "My Chennai Catering Services",
            founder: "D. Venkat",
            telephone: "+919940396005",
            description:
              "Premier partner for high-quality vegetarian catering services in Chennai with 20+ years of experience.",
          },
        }),
      },
    ],
  }),
  component: About,
});

const WHY_CHOOSE_US = [
  {
    title: "Two Decades of Excellence",
    desc: "20+ years of expertise in delivering premium catering solutions.",
    icon: Award,
  },
  {
    title: "Pure Vegetarian & Sattvik Cuisine",
    desc: "We specialize in 100% pure vegetarian menus, including authentic Sattvik catering services for religious functions.",
    icon: Leaf,
  },
  {
    title: "Traditional & Modern Service",
    desc: "Whether you prefer a traditional banana leaf meal service or a modern buffet, we customize our approach to suit your event style.",
    icon: Utensils,
  },
  {
    title: "Hygienic Preparation",
    desc: "We maintain the highest standards of cleanliness and food safety in every meal we prepare.",
    icon: ShieldCheck,
  },
  {
    title: "Customized Menus",
    desc: "We work closely with you to curate a menu that delights your guests and fits your budget.",
    icon: Sparkles,
  },
  {
    title: "Professional Team",
    desc: "Our experienced chefs and service staff ensure timely delivery and seamless event management from start to finish.",
    icon: HeartHandshake,
  },
];

const EXPERTISE_AREAS = [
  {
    category: "Life Milestones",
    items: [
      "Weddings & Kalyana Saapadu",
      "Post-Wedding Receptions",
      "Engagements & Betrothals",
      "Seemantham (Baby Shower) Ceremonies",
    ],
    icon: Calendar,
  },
  {
    category: "Family Functions",
    items: [
      "Griha Pravesham (Housewarming)",
      "Birthday & Anniversary Parties",
      "Religious & Temple Functions",
      "Intimate Home Gatherings",
    ],
    icon: Users,
  },
  {
    category: "Corporate Events",
    items: [
      "Professional Executive Lunches",
      "Conferences & Seminars",
      "Office Celebrations & Festivals",
      "Custom Corporate Buffets",
    ],
    icon: Building2,
  },
];

const SERVING_LOCATIONS = [
  "Pattabiram",
  "Avadi",
  "Ambattur",
  "Poonamallee",
  "Thiruverkadu",
  "Mogappair",
  "Porur",
  "Anna Nagar",
];

const HERO_STATS = [
  { value: "20+", label: "Years of Legacy" },
  { value: "2000+", label: "Events Served" },
  { value: "100%", label: "Pure Vegetarian" },
];

export function About() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-slate-800 font-sans">
      <FloatingFoodDoodles section="about" />

      {/* Hero-only styles: Ken Burns drift + warm colour grade */}
      <style>{`
        @keyframes mccHeroDrift {
          0%   { transform: scale(1.08) translate3d(0, 0, 0); }
          100% { transform: scale(1.18) translate3d(-1.5%, -1.5%, 0); }
        }
        @keyframes mccGlowPulse {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.6; }
        }
        .mcc-hero-img {
          filter: saturate(1.1) contrast(1.05) brightness(1.05);
          animation: mccHeroDrift 26s ease-in-out infinite alternate;
          will-change: transform;
        }
        .mcc-hero-glow { animation: mccGlowPulse 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .mcc-hero-img, .mcc-hero-glow { animation: none !important; }
        }
      `}</style>

      {/* 1. HERO SECTION — rich, warm, appetising */}
      <section className="relative h-[88vh] h-[88dvh] min-h-[620px] flex items-center overflow-hidden bg-[#1A0710]">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={feastHero}
            alt="Traditional South Indian banana leaf menu"
            className="mcc-hero-img w-full h-full object-cover"
            fetchPriority="high"
          />
        </div>

        {/* Layer A — warm scrim: dark at top/bottom for contrast, OPEN in the middle so the food shows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A0E1E]/55 via-[#1A0710]/12 to-[#12050A]/70" />

        {/* Layer B — soft spotlight behind the copy (keeps text legible without blanketing the photo) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_42%_at_50%_44%,rgba(12,5,9,0.72)_0%,rgba(12,5,9,0.45)_45%,transparent_72%)]" />

        {/* Layer C — amber / saffron bloom for warmth (screen blend = glow, not grey) */}
        <div
          className="mcc-hero-glow absolute inset-0 mix-blend-screen pointer-events-none
                     bg-[radial-gradient(circle_at_15%_82%,rgba(251,191,36,0.30),transparent_46%),radial-gradient(circle_at_88%_18%,rgba(217,119,6,0.26),transparent_42%),radial-gradient(circle_at_70%_95%,rgba(239,68,68,0.14),transparent_38%)]"
        />

        {/* Layer D — gentle fade into the cream page below */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#FAF7F0] to-transparent z-[2]" />

        {/* Doodles — soft-light so line art reads as light etching on the dark photo */}
        <DoodleLayer section="about" blendOverride="soft-light" />

        {/* Marigold garland at top */}
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 backdrop-blur-sm border border-amber-300/50 text-amber-200 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_24px_rgba(251,191,36,0.25)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Taste, Traditional Excellence</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_6px_40px_rgba(0,0,0,0.7)]">
              About{" "}
              <span
                className="italic font-normal"
                style={{
                  color: "#FFD024",
                  textShadow:
                    "0 0 1px #7A4A00, 1px 1px 0 #7A4A00, -1px 1px 0 #7A4A00, 1px -1px 0 #7A4A00, -1px -1px 0 #7A4A00, 0 3px 6px rgba(0,0,0,0.75), 0 0 30px rgba(255,208,36,0.5)",
                }}
              >
                My Chennai Catering
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-amber-50 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-8 [text-shadow:0_1px_6px_rgba(0,0,0,0.95),0_3px_20px_rgba(0,0,0,0.8)]">
              With over 20 years of experience, we bring the authentic flavors of South Indian
              cuisine to your most cherished occasions. From grand weddings to intimate gatherings —
              great events are built on exceptional food and impeccable hospitality.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/builder"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-[#3A1029] text-xs font-bold uppercase tracking-wider shadow-[0_8px_30px_rgba(251,191,36,0.4)] hover:brightness-110 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Utensils className="w-4 h-4" />
                <span>Build Your Custom Menu</span>
              </Link>
              <a
                href="tel:+919940396005"
                className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/25 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call: +91 99403 96005</span>
              </a>
            </div>
          </Reveal>

          {/* Trust strip */}
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-serif text-2xl sm:text-3xl font-bold bg-gradient-to-b from-amber-200 to-amber-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-amber-100/90 font-semibold mt-0.5 [text-shadow:0_1px_5px_rgba(0,0,0,0.9)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Scroll indicator */}
          <Reveal delay={0.5}>
            <div className="mt-8 animate-bounce">
              <div className="w-6 h-10 border-2 border-amber-300/60 rounded-full mx-auto flex justify-center pt-2">
                <div className="w-1 h-3 bg-amber-300 rounded-full animate-pulse" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <BananaLeafDivider />

      {/* 2. OUR STORY: A LEGACY OF FLAVOR */}
      <OurStorySection />

      <BananaLeafDivider />

      {/* 3. WHY CHOOSE US? (EXACT LIST PRESERVED WITHOUT CHANGES) */}
      <section className="py-20 bg-white border-y border-amber-900/10">
        <ScrollCutouts cutouts={[
          { src: cutSweets, side: "right", top: "12%", size: 260, rotate: -6 },
          { src: cutTiffin, side: "left", top: "58%", size: 280, rotate: 8 },
        ]} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
              Uncompromising Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1029]">
              Why Choose Us?
            </h2>
            <p className="text-slate-600 text-sm">
              We bring authenticity, purity, and exceptional hospitality to every event we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {WHY_CHOOSE_US.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={idx * 0.1}>
                  <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-amber-900/10 hover:border-amber-400/70 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-[#3A1029] flex items-center justify-center font-bold mb-4 border border-amber-300">
                        <Icon className="w-6 h-6 text-amber-800" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#3A1029]">{item.title}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <BananaLeafDivider />

      {/* 4. OUR EXPERTISE */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto relative">
        <AnimatedFoodDoodles section="services" />
        <ScrollCutouts cutouts={[
          { src: cutBiryani, side: "left", top: "10%", size: 260, rotate: -8 },
          { src: cutLeafPlatter, side: "right", top: "50%", size: 280, rotate: 6 },
        ]} />
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
              Comprehensive Catering Solutions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1029]">
              Our Expertise
            </h2>
            <p className="text-slate-600 text-sm">
              Tailored catering for every milestone, family gathering, and business event.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {EXPERTISE_AREAS.map((area, idx) => {
            const Icon = area.icon;
            return (
              <Reveal key={area.category} delay={idx * 0.08}>
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-md flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-emerald-700" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#3A1029]">
                        {area.category}
                      </h3>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      {area.items.map((subItem) => (
                        <li key={subItem} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{subItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 uppercase tracking-wider"
                    >
                      <span>View Service Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <BananaLeafDivider />

      {/* 5. PROUDLY SERVING CHENNAI */}
      <section className="relative bg-gradient-to-r from-[#2A163F] via-[#3A1029] to-[#2B1028] text-white py-16 px-6 lg:px-12 border-y-2 border-amber-400/30 overflow-hidden">
        <ScrollCutouts variant="prominent" cutouts={[
          { src: lmGopuram, side: "left", top: "10%", size: 280, rotate: -8 },
          { src: lmGoldDome, side: "right", top: "55%", size: 260, rotate: 6 },
        ]} />
        <img
          src={weddingHallImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          loading="lazy"
        />
        <div className="max-w-7xl mx-auto space-y-8 text-center">
          <Reveal>
            <div className="space-y-3 max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
                Widespread Service Reach
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Proudly Serving Chennai
              </h2>
              <p className="text-amber-100/90 text-sm leading-relaxed">
                While we are based in <strong>Pattabiram</strong>, our reach extends across the
                city. We are proud to provide South Indian catering services in{" "}
                <strong>
                  Avadi, Ambattur, Poonamallee, Thiruverkadu, Mogappair, Porur, Anna Nagar
                </strong>
                , and surrounding areas.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {SERVING_LOCATIONS.map((loc) => (
                <span
                  key={loc}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-cream text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{loc}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. CALL TO ACTION & CONSULTATION FORM */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
                Get in Touch
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1029]">
                Ready to plan your next event?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Let us help you make it unforgettable. Contact My Chennai Catering Services today to
                experience the best catering services in Chennai.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="pt-2 space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-slate-500 uppercase font-semibold">
                      Call or WhatsApp Direct
                    </div>
                    <a
                      href="tel:+919940396005"
                      className="font-bold text-slate-900 hover:text-emerald-700 text-base"
                    >
                      +91 99403 96005
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xl">
                <h3 className="font-serif text-xl font-bold text-[#3A1029] mb-4 text-center">
                  Request Your Event Quotation
                </h3>
                <BookingForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
