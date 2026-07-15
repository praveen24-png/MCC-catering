/**
 * SHARED HOME CONTENT
 * -------------------
 * Single source of truth for the homepage. Imported by BOTH
 *   - src/routes/index.tsx             (desktop home)
 *   - src/components/MobileAppHome.tsx (mobile home)
 */

import {
  Award, Briefcase, ChefHat, Church, Coffee, Crown, Heart, Home, IceCream,
  Landmark, PartyPopper, Soup, Sparkles, Target, TreePine, Users, Utensils, UtensilsCrossed,
} from "lucide-react";

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
import lotusIcon from "@/assets/lotus icon.png";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner 2.jpg";
import banner3 from "@/assets/banner 3.jpg";
import feastFood2 from "@/assets/feast-food-2.png";
import corporateOffices from "@/assets/Corporate Offices.webp";
import outdoorVenues from "@/assets/Outdoor Venues.jpg";
import templesImg from "@/assets/Temples.jpg";
import conventionCenters from "@/assets/Convention Centers.webp";
import marriageHallImg from "@/assets/marriagehall.jpg";
import homesVillasImg from "@/assets/house.jpg";

/* ── shared image handles ──────────────────────────────────────────────── */
export const LOTUS_ICON = lotusIcon;
export const WELCOME_IMAGE = feastFood2;
export const PHILOSOPHY_IMAGE = feastFood2;

/* ── 1. HERO CAROUSEL ──────────────────────────────────────────────────── */
export interface HeroSlide {
  t: string; bg: string; title: string; sub: string;
  d: string; cta: string; link: string; logo?: string;
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

/* ── 2. STATS PILL BANNER ──────────────────────────────────────────────── */
/* `cls` is the hook the anime.js counter in index.tsx animates. */
export const STATS = [
  { icon: Target, value: 15, cls: "stat-val-1", l1: "YEARS", l2: "OF EXPERIENCE" },
  { icon: Crown, value: 3000, cls: "stat-val-2", l1: "HAPPY", l2: "CLIENTS" },
  { icon: UtensilsCrossed, value: 4500, cls: "stat-val-3", l1: "EVENTS", l2: "CATERED" },
  { icon: Sparkles, value: 120, cls: "stat-val-4", l1: "VARIETIES", l2: "IN MENUS" },
];

/* ── 3. FOOD PEEK STRIP ────────────────────────────────────────────────── */
export const FOOD_PEEK_ITEMS = [
  { src: aiWeddingFeast, alt: "Wedding menu", size: 56 },
  { src: aiTiffinFeast, alt: "Tiffin menu", size: 48 },
  { src: aiSweetsFeast, alt: "Sweets menu", size: 52 },
  { src: realFeastMeal, alt: "Traditional meal", size: 56 },
  { src: bananaLeafFeastBlended, alt: "Banana leaf", size: 48 },
  { src: gulabJamun, alt: "Traditional sweets", size: 52 },
];

/* ── 4. WELCOME SECTION COPY ───────────────────────────────────────────── */
export const WELCOME = {
  eyebrow: "WELCOME TO MCC",
  heading: "Welcome to My Chennai Catering",
  body: "At My Chennai Catering (MCC), we bring together authentic South Indian cuisine, premium ingredients, and professional catering services to create unforgettable celebrations. With over two decades of experience, we cater to weddings, corporate events, and special occasions across Chennai.",
  cta: "Request a Free Quote",
};

/* ── 5. SERVICES WE OFFER ──────────────────────────────────────────────── */
export const SERVICES_OFFERED = [
  {
    title: "Wedding Catering",
    desc: "Complete wedding catering with traditional taste and exceptional service",
    img: weddingHall,
    icon: UtensilsCrossed,
  },
  {
    title: "Engagement & Reception Catering",
    desc: "Customized menus to make your engagement and reception memorable",
    img: aiWeddingFeast,
    icon: Heart,
  },
  {
    title: "Corporate Event Catering",
    desc: "Professional catering and custom food menus for corporate events",
    img: corporateCatering,
    icon: Briefcase,
  },
  {
    title: "Housewarming Catering",
    desc: "Traditional menus and catering for your auspicious new home celebrations",
    img: brassLamps,
    icon: Home,
  },
  {
    title: "Traditional Banana Leaf Meal Service",
    desc: "Authentic South Indian banana leaf meals served for traditional events and gatherings",
    img: realFeastMeal,
    icon: Utensils,
  },
  {
    title: "Festival & Special Occasion Catering",
    desc: "Special menus and catering services for traditional festivals and family functions",
    img: buffetCounter,
    icon: Sparkles,
  },
];

/* ── 5b. POPULAR PACKAGES ──────────────────────────────────────────────── */
/* NOTE: pricePerHead values below are PLACEHOLDERS for layout purposes only.
   Replace with real, approved pricing before this section goes live. */
export const PACKAGES = [
  {
    name: "Silver",
    pricePerHead: 350,
    tagline: "Everyday elegance",
    includes: ["Welcome drink", "2 sweets", "3 curries", "Rice & sambar", "1 dessert"],
    highlight: false,
  },
  {
    name: "Gold",
    pricePerHead: 550,
    tagline: "Most popular",
    includes: ["Welcome drink", "3 sweets", "5 curries", "Live counter (1)", "2 desserts"],
    highlight: true,
  },
  {
    name: "Premium",
    pricePerHead: 850,
    tagline: "Full royal spread",
    includes: ["Welcome drink", "4 sweets", "7+ curries", "Live counters (2)", "Dessert bar"],
    highlight: false,
  },
];

/* ── 5c. WE CATER WHEREVER YOU CELEBRATE ──────────────────────────────── */
export const VENUES = {
  heading: "We Cater Wherever You Celebrate",
  subheading:
    "From intimate family gatherings to grand wedding receptions, our team brings authentic South Indian catering to your chosen venue across Chennai and surrounding areas.",
  ctaLabel: "Book Your Event",
  items: [
    { label: "Marriage Halls", icon: Landmark, img: marriageHallImg, venue: "Marriage Halls" },
    { label: "Homes & Villas", icon: Home, img: homesVillasImg, venue: "Homes & Villas" },
    { label: "Corporate Offices", icon: Briefcase, img: corporateOffices, venue: "Corporate Offices" },
    { label: "Outdoor Venues", icon: TreePine, img: outdoorVenues, venue: "Outdoor Venues" },
    { label: "Temples", icon: Church, img: templesImg, venue: "Temples" },
    { label: "Convention Centers", icon: PartyPopper, img: conventionCenters, venue: "Convention Centers" },
  ],
};

/* ── 6. EXPLORE OUR MENUS ──────────────────────────────────────────────── */
export const MENU_CATEGORIES = [
  { title: "Traditional Banana Leaf Meals", img: realFeastMeal, icon: Utensils },
  { title: "Breakfast Specials", img: aiTiffinFeast, icon: Coffee },
  { title: "Lunch & Dinner Menus", img: buffetCounter, icon: ChefHat },
  { title: "Signature Sweets & Desserts", img: gulabJamun, icon: IceCream },
  { title: "Live Food Counters", img: liveCounter, icon: Soup },
  { title: "Seasonal Special Menus", img: aiSweetsFeast, icon: Sparkles },
];

/* ── 7. PHILOSOPHY — PORTRAIT CAROUSEL ─────────────────────────────────── */
export const PORTRAIT_SLIDES = [
  {
    img: aiWeddingFeast,
    title: "Royal Banana Leaf Virundhu",
    desc: "Grand South Indian wedding menu with 20+ traditional delicacies on fresh banana leaf.",
  },
  {
    img: bananaLeafFeastBlended,
    title: "Thala Vazhai Saapadu",
    desc: "Authentic course-by-course menu served with pure ghee and hand-pounded spices.",
  },
  {
    img: aiTiffinFeast,
    title: "Mangala Udhayam Tiffin",
    desc: "Piping hot Idlis, ghee Dosa, Medu Vada, chutneys and authentic Filter Coffee.",
  },
  {
    img: realFeastMeal,
    title: "Traditional Indian Menu",
    desc: "Traditional recipes slow-cooked over open flames for rich, authentic taste.",
  },
  {
    img: aiSweetsFeast,
    title: "Elaneer Payasam & Sweets",
    desc: "Creamy tender coconut payasam and traditional pure ghee South Indian sweets.",
  },
  {
    img: gulabJamun,
    title: "Traditional Desserts",
    desc: "Stone-ground ingredients and rich desserts cooked to round off your meal.",
  },
];

/* ── 8. PHILOSOPHY — TIMED TAMIL TEXT CAROUSEL ─────────────────────────── */
export const TAMIL_MESSAGES = [
  {
    heading: "My Chennai Catering Services-க்கு வரவேற்கிறோம்",
    body: "எங்கள் பாரம்பரிய உணவுகள் உங்கள் வீட்டில் நடைபெறும் புனித நிகழ்வுகளை மேலும் சிறப்படையச் செய்கின்றன.",
    badge: "வரவேற்புச் செய்தி",
  },
  {
    heading: "அனைத்து சிறப்பு நிகழ்வுகளுக்கும்",
    body: "திருமணம், நிச்சயதார்த்தம், பிறந்தநாள் விழா, நிறுவன நிகழ்ச்சிகள், வீட்டுவிழாக்கள் என அனைத்து சிறப்பு நிகழ்வுகளுக்கும் தரமான சைவ மற்றும் அசைவ கேட்டரிங் சேவையை வழங்கி வருகிறோம்.",
    badge: "எங்கள் சேவைகள்",
  },
  {
    heading: "எங்கள் அடையாளம்",
    body: "பாரம்பரிய சுவை, தரமான பொருட்கள், சுத்தமான சமையல் மற்றும் அன்பான பரிமாறுதல் ஆகியவை எங்கள் அடையாளம். ஒவ்வொரு விருந்தினரும் திருப்தியுடன் உணவருந்த வேண்டும் என்பதே எங்கள் நோக்கம்.",
    badge: "எங்கள் நோக்கம்",
  },
  {
    heading: "மறக்க முடியாத அனுபவம்",
    body: "உங்கள் நிகழ்வை சுவையான உணவுகளாலும் சிறந்த சேவையாலும் மறக்க முடியாத அனுபவமாக மாற்றுவதே எங்கள் உறுதி.",
    badge: "எங்கள் உறுதி",
  },
];

export const PHILOSOPHY_BADGES = [
  { icon: ChefHat, t: "Custom Menus" },
  { icon: Award, t: "20+ Years" },
  { icon: Users, t: "Family-led" },
];

/* ── 9. TESTIMONIALS ───────────────────────────────────────────────────── */
export const TESTIMONIALS = [
  {
    n: "Lakshmi · Avadi",
    q: "Every dish tasted like my paati's kitchen. Our wedding guests are still talking about the Arachuvitta Sambar.",
  },
  {
    n: "Ravi & Priya · Poonamallee",
    q: "From the silk-saree hosts to the rose-petal newlywed table, MCC made our reception feel royal.",
  },
  {
    n: "Mr. Subramanian · Ambattur",
    q: "Punctual, pure, and absolutely delicious. We have booked them for three family functions already.",
  },
];

/* ── 10. GALLERY ───────────────────────────────────────────────────────── */
export const GALLERY_ITEMS = [
  { img: realFeastMeal, title: "Traditional Virundhu Saapadu" },
  { img: liveCounter, title: "Live Chaat & Counter Stations" },
  { img: weddingHall, title: "Grand Mandapam Setup" },
  { img: gulabJamun, title: "Traditional Sweet Payasam" },
];

/* ── 11. EVENT PLANNING RESOURCES ──────────────────────────────────────── */
export const RESOURCES = {
  eyebrow: "GUIDANCE & PLANNING",
  heading: "Event Planning Resources",
  body: "Planning an event is easier with the right guidance. Explore our expert resources for venue selection, catering checklists, guest planning, menu ideas, and practical tips to help you organize a successful celebration in Chennai.",
  cta: "Explore Resources",
};

/* ── 12. FAQ ───────────────────────────────────────────────────────────── */
export const FAQS = [
  {
    q: "Do you provide catering across Chennai?",
    a: "Yes, we offer catering services throughout Chennai and nearby locations.",
  },
  {
    q: "Can the menu be customized?",
    a: "Yes, every menu is tailored to your event, preferences, and budget.",
  },
  {
    q: "Do you provide both vegetarian and non-vegetarian catering?",
    a: "Yes, we offer premium quality vegetarian and non-vegetarian catering options tailored to your preferences.",
  },
  {
    q: "How early should I book?",
    a: "We recommend booking in advance, especially during the wedding season.",
  },
];

/* ── 13. BOOKING CTA COPY ──────────────────────────────────────────────── */
export const BOOKING = {
  eyebrow: "Begin Your Inquiry",
  headingA: "Let MCC curate ",
  headingB: "your sacred menu.",
  body: "Share a few details and our team will respond with a tailored proposal — menu cards, decor mockups and an exact quote — within one business hour.",
  bullets: [
    "Free consultation & sample tasting",
    "Custom menus across all budgets",
    "Decor, hosts & live counters included",
  ],
};
