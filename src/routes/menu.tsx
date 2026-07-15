import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollCutouts } from "@/components/ScrollCutouts";
import { KolamLineArt } from "@/components/KolamLineArt";
import { FoodPeekEdge } from "@/components/FoodPeekEdge";
import cutTiffin from "@/assets/cutout-tiffin.png";
import cutBiryani from "@/assets/cutout-biryani.png";
import cutSpices from "@/assets/cutout-spices.png";
import cutSweets from "@/assets/cutout-sweets.png";
import cutLeafPlatter from "@/assets/cutout-leaf-platter.png";
import CateringMenusSection from "@/components/CateringMenusSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import { Reveal } from "@/components/Reveal";
import heroFeast from "@/assets/2_20260624_020643_0001.png";
import pageHeader2 from "@/assets/page-header2.png";
import bananaLeafBg from "@/assets/banana-leaf-bg.png";
import chefImg from "@/assets/chef_cooking_gourmet.png";
import MarigoldGarland from "@/components/MarigoldGarland";
import { CenterKolam } from "@/components/Kolam";
import { Sparkles, ArrowRight } from "lucide-react";
import { FloatingFoodDoodles, SectionDoodleDivider } from "@/components/FloatingDoodles";
import { DoodleLayer } from "@/components/DoodleLayer";
import { AnimatedFoodDoodles } from "@/components/AnimatedFoodDoodles";
import { BananaLeafDivider } from "@/components/GrainDivider";
import { FoodPeek } from "@/components/FoodPeek";
import { motion } from "framer-motion";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Premium South Indian Catering Menu in Chennai | My Chennai" },
      {
        name: "description",
        content:
          "Explore our premium vegetarian catering in Chennai. From traditional banana leaf meals to lavish wedding buffets, we bring authentic flavors to your event.",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
      },
      {
        property: "og:title",
        content: "Premium South Indian Catering Menu in Chennai | My Chennai",
      },
      {
        property: "og:description",
        content:
          "Explore our premium vegetarian catering in Chennai. From traditional banana leaf meals to lavish wedding buffets, we bring authentic flavors to your event.",
      },
      { property: "og:url", content: "https://mychennaicateringservices.com/menu/" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Premium South Indian Catering Menu in Chennai" },
      {
        name: "twitter:description",
        content: "Explore traditional banana leaf meals and lavish wedding buffets in Chennai.",
      },
    ],
    links: [{ rel: "canonical", href: "https://mychennaicateringservices.com/menu/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Menu",
          name: "My Chennai Catering Vegetarian Menu",
          url: "https://mychennaicateringservices.com/menu/",
          mainEntity: {
            "@type": "CateringService",
            name: "My Chennai Catering Services",
            servesCuisine: "South Indian Pure Vegetarian",
          },
        }),
      },
    ],
  }),
  component: MenuPage,
});

const SECTIONS = [
  {
    t: "Sweets & Payasam",
    items: [
      "Elaneer Payasam",
      "Rasamalai",
      "Gulab Jamun",
      "Rasagulla",
      "Ghevar",
      "Raj Bhog",
      "Malai Roll",
    ],
  },
  {
    t: "Starters",
    items: [
      "Gobi 65",
      "Veg Cutlet",
      "Veg Spring Roll",
      "Onion Pakoda",
      "Paneer Tikka",
      "Veg Fish Fry",
    ],
  },
  {
    t: "Rice & Biryani",
    items: [
      "Veg Biryani",
      "Mushroom Biryani",
      "Jackfruit Biryani",
      "Veg Pulav",
      "Onion Raitha",
      "Bisibelabath",
    ],
  },
  {
    t: "Traditional Saapadu",
    items: [
      "White Rice",
      "Arachuvitta Sambar",
      "Rasam",
      "Vathakulambu",
      "Curd Rice",
      "Poriyal",
      "Kootu",
      "Appalam",
      "Pickle",
    ],
  },
  {
    t: "Tiffin & Snacks",
    items: ["Idly", "Mini Idly", "Rava Dosa", "Uthappam", "Idiyappam", "Veg Stew", "Pongal"],
  },
  {
    t: "Breads & Curries",
    items: [
      "Chapathi",
      "Rumali Roti",
      "Butter Naan",
      "Paneer Butter Masala",
      "Mushroom Masala",
      "Channa Masala",
    ],
  },
];

function MenuPage() {
  return (
    <>
      <FloatingFoodDoodles section="menu" />
      <section className="relative py-24 overflow-hidden">
        <DoodleLayer section="menu" />
        <AnimatedFoodDoodles section="menu" />
        <div className="absolute top-12 left-12 opacity-[0.18] pointer-events-none">
          <KolamLineArt type="neli" size={200} color="#C8951E" />
        </div>
        <div className="absolute bottom-12 right-12 opacity-[0.18] pointer-events-none">
          <KolamLineArt type="kambi" size={180} color="#C8951E" />
        </div>
        <ScrollCutouts variant="prominent" cutouts={[
          { src: cutBiryani, side: "right", top: "10%", size: 280, rotate: -8 },
          { src: cutSpices, side: "left", top: "50%", size: 260, rotate: 6 },
        ]} />
        {/* Decorative marigold toran */}
        <MarigoldGarland count={8} className="absolute top-0 left-0 right-0 z-20 h-5" />

        {/* Traditional Kolam watermark */}
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none">
          <CenterKolam size={300} />
        </div>

        <img
          src={chefImg}
          alt=""
          className="absolute left-8 bottom-8 w-32 h-32 object-contain opacity-20 pointer-events-none hidden lg:block"
          loading="lazy"
        />

        <div className="absolute inset-0">
          <img src={heroFeast} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-plum-dark/85" />
        </div>
        <Reveal>
          <div className="relative text-center max-w-3xl mx-auto px-6 text-cream z-10">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">
              Feast & Menu
            </span>
            <h1 className="font-serif text-5xl md:text-6xl mt-4">
              Explore Our{" "}
              <span className="text-gold-gradient italic">Delicious Veg Catering Menu</span>
            </h1>
            <p className="mt-5 text-cream/80">
              Every dish on our menu is hand-pounded, slow-cooked and served fresh. Explore the
              traditional and contemporary offerings curated by MCC.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CATERING MENUS SECTION */}
      <CateringMenusSection />

      <section className="relative py-16 overflow-hidden bg-gradient-to-r from-amber-50 via-white to-amber-50">
        <motion.img
          src={bananaLeafBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          loading="lazy"
        />
        <motion.img
          src={bananaLeafBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          loading="lazy"
        />
        <ScrollCutouts className="relative z-10" variant="prominent" cutouts={[
          { src: cutSweets, side: "right", top: "10%", size: 340, rotate: -6 },
          { src: cutLeafPlatter, side: "left", top: "55%", size: 360, rotate: 8 },
        ]} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-bold">
            Our Signature Dishes
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mt-3">
            Every Dish Tells a <span className="text-gold-gradient italic">Story</span>
          </h2>
          <div className="flex items-center justify-center gap-6 mt-8">
            <FoodPeek src={heroFeast} alt="Traditional menu" size={72} />
            <FoodPeek src={bananaLeafBg} alt="Banana leaf" size={64} />
            <FoodPeek src={chefImg} alt="Master chef" size={68} />
            <FoodPeek src={heroFeast} alt="Grand spread" size={60} />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <WhyChooseUsSection />

      <section className="relative overflow-hidden py-24 bg-cream">
        <AnimatedFoodDoodles section="menu" />
        <FoodPeekEdge
          src={cutTiffin}
          side="left"
          top="22%"
          size={380}
          peek={0.4}
          speed={0.13}
          rotate={7}
        />
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {SECTIONS.map((s) => (
            <Reveal key={s.t}>
              <div className="p-7 rounded-3xl border border-plum/10 bg-white h-full hover:border-gold hover:shadow-glow-gold transition-all">
                <div className="text-[11px] uppercase tracking-[0.25em] text-gold-dark mb-3">
                  {s.t}
                </div>
                <ul className="space-y-2 text-foreground/80">
                  {s.items.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-gold mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INTERACTIVE FEAST PLANNER CTA BANNER */}
      <SectionDoodleDivider variant="leaf" />
      <section className="py-20 bg-gradient-to-r from-[#4d1234] via-[#541539] to-[#3f0e2b] text-white relative overflow-hidden border-t border-amber-400/30">
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* Left: Animated Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -60, rotate: -4 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.img
              src={pageHeader2}
              alt="Customize your wedding menu"
              className="w-full max-w-[520px] h-auto object-cover rounded-2xl shadow-2xl border-2 border-amber-400/30"
              loading="eager"
              fetchPriority="high"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          {/* Right: Text with staggered reveal */}
          <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="text-amber-300 text-xs uppercase tracking-[0.25em] font-bold inline-flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Interactive Customizer
              </span>
            </motion.div>
            <motion.h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              Want to Build Your Own Custom Feast?
            </motion.h2>
            <motion.p
              className="text-amber-100/90 text-sm md:text-base leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              Select your dishes, adjust guest counts, explore live counters, and get
              instant cost estimates — all in one place.
            </motion.p>
            <motion.div
              className="pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-plum-dark font-extrabold text-xs uppercase tracking-[0.2em] rounded-full shadow-xl transition-all duration-300 group"
              >
                <span>CLICK TO CUSTOMIZE YOUR MENU</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
