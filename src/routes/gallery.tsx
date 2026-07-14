import { useState, useMemo, useEffect } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { ScrollCutouts } from "@/components/ScrollCutouts";
import { FoodPeekEdge } from "@/components/FoodPeekEdge";
import lmChurch from "@/assets/cutout-landmark-gothic-church.png";
import cutBiryani from "@/assets/cutout-biryani.png";
import cutSweets from "@/assets/cutout-sweets.png";
import cutTiffin from "@/assets/cutout-tiffin.png";
import cutSpices from "@/assets/cutout-spices.png";
import { Reveal } from "@/components/Reveal";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";
import weddingHall from "@/assets/IMG_4558.webp";
import realFeastMeal from "@/assets/2_20260624_020643_0001.png";
import bananaLeafFeastBlended from "@/assets/banana-leaf-feast-blended.png";
import liveCounter from "@/assets/images-31.jpeg";
import buffetCounter from "@/assets/images-32.jpeg";
import gulabJamun from "@/assets/IMG-20260327-WA0010.jpg.jpeg";
import founder from "@/assets/IMG-20260331-WA0002.jpg.jpeg";
import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";
import { FloatingFoodDoodles } from "@/components/FloatingDoodles";
import { DoodleLayer } from "@/components/DoodleLayer";
import { AnimatedFoodDoodles } from "@/components/AnimatedFoodDoodles";
import { BananaLeafDivider } from "@/components/GrainDivider";
import { FoodPeek } from "@/components/FoodPeek";
import { Camera } from "lucide-react";

const VENUE_TABS = [
  "All",
  "Marriage Halls",
  "Homes & Villas",
  "Corporate Offices",
  "Outdoor Venues",
  "Temples",
] as const;

const GALLERY_ITEMS = [
  {
    title: "VIP Wedding Couple Catering Setup",
    category: "Wedding Dinners",
    venue: "Marriage Halls",
    img: weddingHall,
    desc: "Luxury flower & silk curtain dining table arrangement for newlyweds.",
  },
  {
    title: "Authentic Thala Vazhai Saapadu",
    category: "Traditional Menu",
    venue: "Marriage Halls",
    img: realFeastMeal,
    desc: "Traditional course-by-course South Indian banana leaf wedding meal.",
  },
  {
    title: "Grand Wedding Banquet Menu",
    category: "Traditional Menu",
    venue: "Marriage Halls",
    img: bananaLeafFeastBlended,
    desc: "20+ item Sattvik Brahmin menu served with pure ghee.",
  },
  {
    title: "Live Dosa & Chaat Counter",
    category: "Live Counters",
    venue: "Marriage Halls",
    img: liveCounter,
    desc: "Hot chef stations with piping hot mini dosas and tiffins.",
  },
  {
    title: "Chandelier Buffet Setup",
    category: "Reception Buffets",
    venue: "Marriage Halls",
    img: buffetCounter,
    desc: "Modern luxury buffet line with gold-chafing dishes and floral decor.",
  },
  {
    title: "Pure Ghee Traditional Sweets",
    category: "Desserts & Sweets",
    venue: "Marriage Halls",
    img: gulabJamun,
    desc: "Stone-ground Gulab Jamun, Elaneer Payasam & traditional sweets.",
  },
  {
    title: "Founder D. Venkat & Team",
    category: "Our Legacy",
    venue: "",
    img: founder,
    desc: "Master caterer D. Venkat supervising pure Sattvik cooking.",
  },
  {
    title: "Traditional Brass Lamps & Decor",
    category: "Event Styling",
    venue: "Outdoor Venues",
    img: brassLamps,
    desc: "Sacred brass lamps, marigold garlands and traditional mandapam styling.",
  },
];

export const Route = createFileRoute("/gallery")({
  validateSearch: (search: Record<string, unknown>) => ({
    venue: (search.venue as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "Gallery | Wedding Catering & South Indian Food Setup in Chennai" },
      {
        name: "description",
        content:
          "Explore photo gallery of wedding catering setups, traditional banana leaf menus, live food counters, and event decor by My Chennai Catering Services.",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
      },
      {
        property: "og:title",
        content: "Gallery | Wedding Catering & South Indian Food Setup in Chennai",
      },
      {
        property: "og:description",
        content:
          "View catering setups, banana leaf menus, and live counters.",
      },
      { property: "og:url", content: "https://mychennaicateringservices.com/gallery/" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gallery | My Chennai Catering Services" },
      { name: "twitter:description", content: "Wedding catering setups in Chennai." },
    ],
    links: [{ rel: "canonical", href: "https://mychennaicateringservices.com/gallery/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "My Chennai Catering Event Gallery",
          url: "https://mychennaicateringservices.com/gallery/",
          description:
            "Photo gallery showcasing wedding catering setups, traditional South Indian banana leaf menus, live counters, and dessert stalls in Chennai.",
        }),
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { venue: urlVenue } = useSearch({ from: "/gallery" });
  const [activeVenue, setActiveVenue] = useState("All");

  useEffect(() => {
    if (urlVenue) {
      const match = VENUE_TABS.find(
        (v) => v.toLowerCase().replace(/[^a-z]/g, "") === urlVenue.toLowerCase().replace(/[^a-z]/g, "")
      );
      if (match) setActiveVenue(match);
    }
  }, [urlVenue]);

  const availableVenues = useMemo(() => {
    const venueSet = new Set(GALLERY_ITEMS.map((i) => i.venue).filter(Boolean));
    return VENUE_TABS.filter((v) => v === "All" || venueSet.has(v));
  }, []);

  const filteredItems = useMemo(() => {
    if (activeVenue === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.venue === activeVenue);
  }, [activeVenue]);

  return (
    <>
      <FloatingFoodDoodles section="gallery" />
      <section className="relative py-24 bg-plum-dark text-cream overflow-hidden">
        <DoodleLayer section="gallery" blendOverride="soft-light" />
        <ScrollCutouts cutouts={[
          { src: cutBiryani, side: "left", top: "10%", size: 260, rotate: -8 },
          { src: cutSweets, side: "right", top: "50%", size: 280, rotate: 6 },
        ]} />
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none">
          <CenterKolam size={320} />
        </div>

        <Reveal>
          <div className="relative text-center max-w-3xl mx-auto px-6 z-10">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">
              Visual Showcase
            </span>
            <h1 className="font-serif text-5xl md:text-6xl mt-4">
              Catering & Event Setup <span className="text-gold-gradient italic">Gallery</span>
            </h1>
            <p className="mt-5 text-cream/75 text-lg">
              Explore our VIP wedding couple dining setups, traditional banana leaf saapadu, live
              food stalls, and event decor in Chennai.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="py-8 bg-gradient-to-r from-amber-50 via-white to-amber-50 overflow-hidden">
        <ScrollCutouts variant="prominent" cutouts={[
          { src: cutTiffin, side: "left", top: "10%", size: 240, rotate: -7 },
          { src: cutSpices, side: "right", top: "55%", size: 250, rotate: 5 },
        ]} />
        <div className="flex items-center justify-center gap-5 max-w-4xl mx-auto px-6">
          <FoodPeek src={realFeastMeal} alt="Traditional menu" size={56} />
          <FoodPeek src={bananaLeafFeastBlended} alt="Banana leaf menu" size={48} />
          <FoodPeek src={gulabJamun} alt="Traditional sweets" size={52} />
          <FoodPeek src={liveCounter} alt="Live counter" size={56} />
          <FoodPeek src={buffetCounter} alt="Buffet setup" size={48} />
          <FoodPeek src={brassLamps} alt="Traditional decor" size={52} />
        </div>
      </section>

      <section className="relative overflow-hidden py-20 bg-cream">
        <AnimatedFoodDoodles section="gallery" />
        <FoodPeekEdge
          src={lmChurch}
          side="left"
          top="8%"
          size={280}
          peek={0.44}
          speed={0.09}
          rotate={5}
          maxOpacity={0.45}
          behind
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          {/* Venue filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {availableVenues.map((venue) => (
              <button
                key={venue}
                onClick={() => setActiveVenue(venue)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeVenue === venue
                    ? "bg-plum text-gold shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-amber-400 hover:text-plum"
                }`}
              >
                {venue}
              </button>
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <Reveal>
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-[#3A1029] font-bold mb-2">
                  No photos yet
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                  We don't have gallery photos for this venue type yet — but we cater them.
                  Call us to discuss your event.
                </p>
                <a
                  href="tel:+919940396005"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-plum text-gold rounded-full text-xs font-bold uppercase tracking-wider hover:bg-plum-dark transition-all"
                >
                  Call: +91 99403 96005
                </a>
              </div>
            </Reveal>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <Reveal key={`${activeVenue}-${index}`} delay={index * 0.05}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-gold/20 shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 bg-plum/90 text-gold text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-md">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-plum font-semibold group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <BananaLeafDivider />
    </>
  );
}
