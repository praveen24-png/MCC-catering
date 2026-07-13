/**
 * Shared content data for the home page (desktop index.tsx + MobileAppHome.tsx).
 * Imported by both so content can never drift.
 */

import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner 2.jpg";
import banner3 from "@/assets/banner 3.jpg";
import brassLamps from "@/assets/IMG-20260601-WA0053.jpg.jpeg";
import gulabJamun from "@/assets/IMG-20260327-WA0010.jpg.jpeg";
import bananaLeafFeastBlended from "@/assets/banana-leaf-feast-blended.png";
import liveCounter from "@/assets/images-31.jpeg";
import weddingHall from "@/assets/IMG_4558.webp";
import realFeastMeal from "@/assets/2_20260624_020643_0001.png";
import buffetCounter from "@/assets/images-32.jpeg";
import corporateCatering from "@/assets/corporate-catering.jpg";
import aiWeddingFeast from "@/assets/ai-wedding-feast.png";
import aiTiffinFeast from "@/assets/ai-tiffin-feast.png";
import aiSweetsFeast from "@/assets/ai-sweets-feast.png";

/* ── Hero slides ─────────────────────────────────────────────────────────── */

export interface HeroSlide {
  t: string;
  bg: string;
  title: string;
  sub: string;
  d: string;
  cta: string;
  link: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    t: "Authentic Flavours",
    bg: banner2,
    title: "Premium Catering Services in Chennai",
    sub: "Authentic flavours, exceptional service, and memorable celebrations.",
    d: "Experience the authentic flavor of Chennai with our hygienic, delicious and memorable catering services.",
    cta: "Get a Free Quote",
    link: "#book",
  },
  {
    t: "Memorable Events",
    bg: banner3,
    title: "Weddings ❖ Corporate Events ❖ Celebrations",
    sub: "Customized menus crafted with tradition, taste, and care.",
    d: "Modern reception spreads, premium buffet counters, and traditional sit-down services styled to perfection.",
    cta: "Explore Services",
    link: "/services",
  },
  {
    t: "20+ Years Legacy",
    bg: banner1,
    title: "Trusted Catering Partner in Chennai",
    sub: "Over 20 years of delivering quality food and professional hospitality.",
    d: "Premium veg and non-veg taste prepared with strict hygiene by experienced traditional chefs.",
    cta: "Book Your Event",
    link: "#book",
  },
  {
    t: "Traditional Menu",
    bg: bananaLeafFeastBlended,
    title: "Authentic Banana Leaf Menu",
    sub: "Traditional sit-down virundhu saapadu served with pure ghee and love.",
    d: "Experience a royal South Indian wedding menu with 20+ traditional delicacies cooked by traditional chefs.",
    cta: "Explore Our Menu",
    link: "/menu",
  },
  {
    t: "Divine Desserts",
    bg: gulabJamun,
    title: "Traditional Sweets & Divine Payasam",
    sub: "Indulge in pure ghee sweets and creamy tender coconut payasam.",
    d: "Stone-ground ingredients and rich desserts cooked to round off your auspicious meal perfectly.",
    cta: "View Sweets",
    link: "/menu",
  },
  {
    t: "Corporate Catering",
    bg: buffetCounter,
    title: "Professional Corporate Catering",
    sub: "Hygienic packed meals and premium buffets delivered punctually.",
    d: "Hygienic corporate lunch packs, buffet stations, and tea-break catering for offices.",
    cta: "Get a Custom Quote",
    link: "#book",
  },
];

/* ── Portrait carousel (philosophy section) ───────────────────────────────── */

export const PORTRAIT_SLIDES = [
  { img: aiWeddingFeast, title: "Royal Banana Leaf Virundhu", desc: "Grand South Indian wedding menu with 20+ traditional delicacies on fresh banana leaf." },
  { img: bananaLeafFeastBlended, title: "Thala Vazhai Saapadu", desc: "Authentic course-by-course menu served with pure ghee and hand-pounded spices." },
  { img: aiTiffinFeast, title: "Mangala Udhayam Tiffin", desc: "Piping hot Idlis, ghee Dosa, Medu Vada, chutneys and authentic Filter Coffee." },
  { img: realFeastMeal, title: "Traditional Indian Menu", desc: "Traditional recipes slow-cooked over open flames for rich, authentic taste." },
  { img: aiSweetsFeast, title: "Elaneer Payasam & Sweets", desc: "Creamy tender coconut payasam and traditional pure ghee South Indian sweets." },
  { img: gulabJamun, title: "Traditional Desserts", desc: "Stone-ground ingredients and rich desserts cooked to round off your meal." },
];

/* ── Tamil philosophy carousel ────────────────────────────────────────────── */

export const TAMIL_MESSAGES = [
  { heading: "My Chennai Catering Services-க்கு வரவேற்கிறோம்", body: "எங்கள் பாரம்பரிய உணவுகள் உங்கள் வீட்டில் நடைபெறும் புனித நிகழ்வுகளை மேலும் சிறப்படையச் செய்கின்றன.", badge: "வரவேற்புச் செய்தி" },
  { heading: "அனைத்து சிறப்பு நிகழ்வுகளுக்கும்", body: "திருமணம், நிச்சயதார்த்தம், பிறந்தநாள் விழா, நிறுவன நிகழ்ச்சிகள், வீட்டுவிழாக்கள் என அனைத்து சிறப்பு நிகழ்வுகளுக்கும் தரமான சைவ மற்றும் அசைவ கேட்டரிங் சேவையை வழங்கி வருகிறோம்.", badge: "எங்கள் சேவைகள்" },
  { heading: "எங்கள் அடையாளம்", body: "பாரம்பரிய சுவை, தரமான பொருட்கள், சுத்தமான சமையல் மற்றும் அன்பான பரிமாறுதல் ஆகியவை எங்கள் அடையாளம். ஒவ்வொரு விருந்தினரும் திருப்தியுடன் உணவருந்த வேண்டும் என்பதே எங்கள் நோக்கம்.", badge: "எங்கள் நோக்கம்" },
  { heading: "மறக்க முடியாத அனுபவம்", body: "உங்கள் நிகழ்வை சுவையான உணவுகளாலும் சிறந்த சேவையாலும் மறக்க முடியாத அனுபவமாக மாற்றுவதே எங்கள் உறுதி.", badge: "எங்கள் உறுதி" },
];

/* ── Services we offer (icon names mapped to components at consume site) ──── */

export interface ServiceItem {
  title: string;
  desc: string;
  img: string;
  iconName: string;
}

export const SERVICES_OFFERED: ServiceItem[] = [
  { title: "Wedding Catering", desc: "Complete wedding catering with traditional taste and exceptional service", img: weddingHall, iconName: "UtensilsCrossed" },
  { title: "Engagement & Reception Catering", desc: "Customized menus to make your engagement and reception memorable", img: aiWeddingFeast, iconName: "Heart" },
  { title: "Corporate Event Catering", desc: "Professional catering and custom food menus for corporate events", img: corporateCatering, iconName: "Briefcase" },
  { title: "Housewarming Catering", desc: "Traditional menus and catering for your auspicious new home celebrations", img: brassLamps, iconName: "Home" },
  { title: "Traditional Banana Leaf Meal Service", desc: "Authentic South Indian banana leaf meals served for traditional events and gatherings", img: realFeastMeal, iconName: "Utensils" },
  { title: "Festival & Special Occasion Catering", desc: "Special menus and catering services for traditional festivals and family functions", img: buffetCounter, iconName: "Sparkles" },
];

/* ── Menu categories ─────────────────────────────────────────────────────── */

export interface MenuItem {
  title: string;
  img: string;
  iconName: string;
}

export const MENU_CATEGORIES: MenuItem[] = [
  { title: "Traditional Banana Leaf Meals", img: realFeastMeal, iconName: "Utensils" },
  { title: "Breakfast Specials", img: aiTiffinFeast, iconName: "Coffee" },
  { title: "Lunch & Dinner Menus", img: buffetCounter, iconName: "ChefHat" },
  { title: "Signature Sweets & Desserts", img: gulabJamun, iconName: "IceCream" },
  { title: "Live Food Counters", img: liveCounter, iconName: "Soup" },
  { title: "Seasonal Special Menus", img: aiSweetsFeast, iconName: "Sparkles" },
];

/* ── FAQs ────────────────────────────────────────────────────────────────── */

export const FAQS = [
  { q: "Do you provide catering across Chennai?", a: "Yes, we offer catering services throughout Chennai and nearby locations." },
  { q: "Can the menu be customized?", a: "Yes, every menu is tailored to your event, preferences, and budget." },
  { q: "Do you provide both vegetarian and non-vegetarian catering?", a: "Yes, we offer premium quality vegetarian and non-vegetarian catering options tailored to your preferences." },
  { q: "How early should I book?", a: "We recommend booking in advance, especially during the wedding season." },
];

/* ── Testimonials ────────────────────────────────────────────────────────── */

export const TESTIMONIALS = [
  { n: "Lakshmi · Avadi", q: "Every dish tasted like my paati's kitchen. Our wedding guests are still talking about the Arachuvitta Sambar." },
  { n: "Ravi & Priya · Poonamallee", q: "From the silk-saree hosts to the rose-petal newlywed table, MCC made our reception feel royal." },
  { n: "Mr. Subramanian · Ambattur", q: "Punctual, pure, and absolutely delicious. We have booked them for three family functions already." },
];

/* ── Gallery items ────────────────────────────────────────────────────────── */

export const GALLERY_ITEMS = [
  { img: realFeastMeal, title: "Traditional Virundhu Saapadu" },
  { img: liveCounter, title: "Live Chaat & Counter Stations" },
  { img: weddingHall, title: "Grand Mandapam Setup" },
  { img: gulabJamun, title: "Traditional Sweet Payasam" },
];

/* ── Stats ────────────────────────────────────────────────────────────────── */

export const STATS = [
  { target: 15, label: "YEARS OF\nEXPERIENCE", icon: "Target" },
  { target: 3000, label: "HAPPY\nCLIENTS", icon: "Users" },
  { target: 4500, label: "EVENTS\nCATERED", icon: "Sparkles" },
  { target: 120, label: "VARIETIES\nIN MENUS", icon: "Crown" },
];

/* ── Image re-exports for consumers that need them directly ──────────────── */

export {
  banner1, banner2, banner3, brassLamps, gulabJamun, bananaLeafFeastBlended,
  liveCounter, weddingHall, realFeastMeal, buffetCounter, corporateCatering,
  aiWeddingFeast, aiTiffinFeast, aiSweetsFeast,
};
