import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Check, ChevronDown, ChevronRight, Users, Calendar,
  Utensils, Sparkles, Share2, FileText, Leaf, Clock,
  Phone, Mail, MapPin, Star, TrendingUp, Crown, MessageCircle,
  ShoppingCart, Minus, Plus as PlusIcon, Save, Send, Zap, Image,
} from "lucide-react";
import {
  MENU_CATEGORIES, LIVE_COUNTERS, PREMIUM_ADDONS, EVENT_TYPES,
  MEAL_TYPES, MENU_STYLES,
} from "@/data/menuData";
import type { FoodItem } from "@/data/menuData";
import { PACKAGES } from "@/data/homeContent";
import pageHeaderImg from "@/assets/page-header2.png";
import { ScrollCutouts } from "@/components/ScrollCutouts";
import cutBiryani from "@/assets/cutout-biryani.png";
import cutSweets from "@/assets/cutout-sweets.png";
import cutTiffin from "@/assets/cutout-tiffin.png";
import cutSpices from "@/assets/cutout-spices.png";
import { KolamLineArt } from "@/components/KolamLineArt";
import { useNavigate } from "@tanstack/react-router";
import { publicAPI, type EnquiryItem } from "@/services/api";

const STEPS = [
  { id: 1, label: "Event Details", icon: Calendar },
  { id: 2, label: "Menu Style", icon: Utensils },
  { id: 3, label: "Menu Selection", icon: Leaf },
  { id: 4, label: "Live Counters", icon: Sparkles },
  { id: 5, label: "Premium Add-ons", icon: Crown },
  { id: 6, label: "Review", icon: FileText },
  { id: 7, label: "Contact Details", icon: Phone },
];

type FilterType = "all" | "veg" | "nonveg" | "chef" | "trending" | "premium";

export default function MenuCustomizer() {
  const navigate = useNavigate();
  const [currentStep, goToStepRaw] = useState(1);

  /* Anchor for step navigation. Sits on the step progress rail, so changing
     step lands the user on the rail + the top of the form — NOT the page hero. */
  const stepRailRef = useRef<HTMLDivElement>(null);

  const goToStep = useCallback((step: number) => {
    goToStepRaw(step);

    /* Wait for the step to commit, then scroll the rail just under the
       fixed header. Measure the header instead of hardcoding, so this stays
       correct on mobile (shorter header) and desktop (top bar + nav). */
    requestAnimationFrame(() => {
      const rail = stepRailRef.current;
      if (!rail) return;

      const header = document.querySelector("header");
      const headerH = header instanceof HTMLElement ? header.offsetHeight : 80;

      const y = rail.getBoundingClientRect().top + window.scrollY - headerH - 8;

      window.scrollTo({
        top: Math.max(0, y),
        behavior: "smooth",
      });
    });
  }, []);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [openCategories, setOpenCategories] = useState<string[]>(["welcome-drinks"]);

  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [mealType, setMealType] = useState("");
  const [guestCount, setGuestCount] = useState(250);

  const [menuStyle, setMenuStyle] = useState("");

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});

  const [selectedLiveCounters, setSelectedLiveCounters] = useState<Record<string, boolean>>({});

  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({});

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [venue, setVenue] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /* ── Package pre-selection from URL ─────────────────────────────────── */
  const [packageName, setPackageName] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pkgSlug = params.get("package");
    if (!pkgSlug) return;

    const pkg = PACKAGES.find(
      (p) => p.name.toLowerCase().replace(/\s+/g, "-") === pkgSlug,
    );
    if (!pkg) return;
    setPackageName(pkg.name);

    /* Map package includes → menu categories and pre-select items */
    const pkgMap: Record<string, Record<string, number>> = {
      Silver: {
        "welcome-drinks": 1, soups: 0, starters: 1, breakfast: 0,
        rice: 2, gravies: 3, poriyal: 1, kootu: 1,
        "sambar-rasam": 1, "curd-extras": 1, desserts: 1, sweets: 2,
        "ice-cream": 1, fruits: 1, beverages: 1, mocktails: 0,
      },
      Gold: {
        "welcome-drinks": 1, soups: 1, starters: 2, breakfast: 0,
        rice: 2, gravies: 5, poriyal: 2, kootu: 2,
        "sambar-rasam": 1, "curd-extras": 1, desserts: 2, sweets: 3,
        "ice-cream": 2, fruits: 1, beverages: 1, mocktails: 1,
      },
      Premium: {
        "welcome-drinks": 2, soups: 2, starters: 3, breakfast: 0,
        rice: 3, gravies: 6, poriyal: 3, kootu: 2,
        "sambar-rasam": 2, "curd-extras": 2, desserts: 3, sweets: 4,
        "ice-cream": 2, fruits: 1, beverages: 2, mocktails: 2,
      },
    };
    const catCounts = pkgMap[pkg.name] || pkgMap.Gold;

    const nextSelected: Record<string, boolean> = {};
    const nextQty: Record<string, number> = {};
    MENU_CATEGORIES.forEach((cat) => {
      const n = catCounts[cat.id] || 0;
      cat.items.slice(0, Math.min(n, cat.items.length)).forEach((item) => {
        nextSelected[item.id] = true;
        nextQty[item.id] = 1;
      });
    });
    setSelectedItems(nextSelected);
    setItemQuantities(nextQty);

    /* Set menu style to match the package */
    const styleMap: Record<string, string> = {
      Silver: "Banana Leaf Virundhu",
      Gold: "Premium Buffet",
      Premium: "Royal Thali",
    };
    setMenuStyle(styleMap[pkg.name] || "Banana Leaf Virundhu");
    setGuestCount(200);
  }, []);

  const toggleCategory = useCallback((catId: string) => {
    setOpenCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  }, []);

  const toggleItem = useCallback((itemId: string) => {
    setSelectedItems((prev) => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      if (next[itemId] && !itemQuantities[itemId]) {
        setItemQuantities((q) => ({ ...q, [itemId]: 1 }));
      }
      return next;
    });
  }, [itemQuantities]);

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setItemQuantities((prev) => {
      const current = prev[itemId] || 0;
      const next = current + delta;
      if (next <= 0) {
        setSelectedItems((s) => { const { [itemId]: _, ...rest } = s; return rest; });
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: next };
    });
  }, []);

  const toggleLiveCounter = useCallback((id: string) => {
    setSelectedLiveCounters((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleAddon = useCallback((id: string) => {
    setSelectedAddons((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id] && !addonQuantities[id]) {
        setAddonQuantities((q) => ({ ...q, [id]: 1 }));
      }
      return next;
    });
  }, [addonQuantities]);

  const updateAddonQty = useCallback((id: string, delta: number) => {
    setAddonQuantities((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        setSelectedAddons((s) => { const { [id]: _, ...rest } = s; return rest; });
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  }, []);

  const filteredCategories = useMemo(() => {
    return MENU_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        const matchSearch =
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase());
        let matchFilter = true;
        if (activeFilter === "veg") matchFilter = item.isVeg;
        if (activeFilter === "chef") matchFilter = !!item.isChefRecommended;
        if (activeFilter === "trending") matchFilter = !!item.isTrending;
        if (activeFilter === "premium") matchFilter = !!item.isPremium;
        return matchSearch && matchFilter;
      }),
    })).filter((cat) => cat.items.length > 0);
  }, [search, activeFilter]);

  const selectedDishes = useMemo(() => {
    return MENU_CATEGORIES.flatMap((cat) => cat.items).filter((item) => selectedItems[item.id]);
  }, [selectedItems]);

  const totalSelectedCount = selectedDishes.length;

  const estimatedCost = useMemo(() => {
    let foodCost = 0;
    selectedDishes.forEach((item) => {
      const qty = itemQuantities[item.id] || 1;
      foodCost += (item.pricePerHead || 0) * guestCount * qty;
    });
    let counterCost = 0;
    LIVE_COUNTERS.forEach((lc) => {
      if (selectedLiveCounters[lc.id]) counterCost += lc.pricePerHead * guestCount;
    });
    let addonCost = 0;
    PREMIUM_ADDONS.forEach((pa) => {
      if (selectedAddons[pa.id]) {
        const qty = addonQuantities[pa.id] || 1;
        addonCost += pa.price * qty;
      }
    });
    return foodCost + counterCost + addonCost;
  }, [selectedDishes, itemQuantities, guestCount, selectedLiveCounters, selectedAddons, addonQuantities]);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  /** Everything the customer picked, as CRM line items. */
  const buildEnquiryItems = (): EnquiryItem[] => {
    const items: EnquiryItem[] = [];

    selectedDishes.forEach((d) => {
      const qty = itemQuantities[d.id] || 1;
      const unit = d.pricePerHead || 0;
      items.push({
        item_name: d.name,
        quantity: guestCount * qty,
        unit_price: unit,
        total_price: unit * guestCount * qty,
      });
    });

    LIVE_COUNTERS.forEach((lc) => {
      if (!selectedLiveCounters[lc.id]) return;
      items.push({
        item_name: `Live Counter — ${lc.name}`,
        quantity: guestCount,
        unit_price: lc.pricePerHead,
        total_price: lc.pricePerHead * guestCount,
      });
    });

    PREMIUM_ADDONS.forEach((pa) => {
      if (!selectedAddons[pa.id]) return;
      const qty = addonQuantities[pa.id] || 1;
      items.push({
        item_name: `Add-on — ${pa.name}`,
        quantity: qty,
        unit_price: pa.price,
        total_price: pa.price * qty,
      });
    });

    return items;
  };

  const handleWhatsApp = async () => {
    setSubmitError(null);

    /* The backend requires name, phone and event_date. Fail loudly here
       rather than showing a success screen for an enquiry we never saved. */
    if (!contactName.trim() || !contactPhone.trim() || !eventDate) {
      setSubmitError("Please fill in your name, phone number and event date.");
      return;
    }

    setSubmitting(true);

    /* 1. PERSIST FIRST. This is what puts the enquiry in the CRM. */
    try {
      await publicAPI.submitEnquiry({
        name: contactName,
        phone: contactPhone,
        email: contactEmail || null,
        event_type: eventType,
        event_date: eventDate,
        venue,
        guests: guestCount,
        package: menuStyle,
        special_requests: [
          mealType && `Meal: ${mealType}`,
          specialInstructions,
        ].filter(Boolean).join(" | "),
        items: buildEnquiryItems(),
        total_amount: estimatedCost,
      });
    } catch (err) {
      setSubmitting(false);
      setSubmitError(
        "We couldn't save your request. Please check your connection and try again, or call us on +91 99403 96005.",
      );
      return;   // do NOT show the success screen for an enquiry we lost
    }

    /* 2. Then hand off to WhatsApp exactly as before. */
    const dishNames = selectedDishes.map((d) => d.name).join(", ");
    const counters = LIVE_COUNTERS.filter((lc) => selectedLiveCounters[lc.id]).map((lc) => lc.name).join(", ");
    const addons = PREMIUM_ADDONS.filter((pa) => selectedAddons[pa.id]).map((pa) => pa.name).join(", ");
    const text =
      `Hello MCC Catering! I built a custom menu on your website:\n\n` +
      `*Event:* ${eventType}\n*Date:* ${eventDate}\n*Guests:* ${guestCount}\n*Meal:* ${mealType}\n*Style:* ${menuStyle}\n\n` +
      `*Selected Dishes (${totalSelectedCount}):*\n${dishNames}\n\n` +
      (counters ? `*Live Counters:* ${counters}\n` : "") +
      (addons ? `*Add-ons:* ${addons}\n` : "") +
      `\n*Venue:* ${venue}\n*Contact:* ${contactName} - ${contactPhone}\n` +
      `*Special Instructions:* ${specialInstructions || "None"}\n\n` +
      `Estimated Budget: ₹${estimatedCost.toLocaleString("en-IN")}\n\nPlease share a formal quotation!`;
    window.open(`https://wa.me/919940396005?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitting(false);
    setSubmitted(true);
  };

  const toggleAllInCategory = (catId: string) => {
    const cat = MENU_CATEGORIES.find((c) => c.id === catId);
    if (!cat) return;
    const allSelected = cat.items.every((item) => selectedItems[item.id]);
    const next = { ...selectedItems };
    cat.items.forEach((item) => {
      if (allSelected) {
        delete next[item.id];
      } else {
        next[item.id] = true;
        if (!itemQuantities[item.id]) {
          setItemQuantities((q) => ({ ...q, [item.id]: 1 }));
        }
      }
    });
    setSelectedItems(next);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2]">
      {/* PREMIUM HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF8F2] via-[#F5F0E6] to-[#EDE7D9] min-h-[300px] sm:min-h-[600px] lg:min-h-[680px]">
        <ScrollCutouts variant="prominent" cutouts={[
          { src: cutBiryani, side: "left", top: "70%", size: 120, rotate: 10 },
        ]} />
        {/* Floating decorative leaves — hidden on mobile */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:block absolute top-12 left-[8%] text-[#2E5D34]/15 pointer-events-none select-none"
        >
          <Leaf className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden sm:block absolute top-24 right-[12%] text-[#2E5D34]/10 pointer-events-none select-none"
        >
          <Leaf className="w-16 h-16 rotate-45" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="hidden sm:block absolute bottom-16 left-[15%] text-[#DCA46A]/15 pointer-events-none select-none"
        >
          <Leaf className="w-12 h-12 -rotate-45" />
        </motion.div>
        {/* Banana leaf outline decoration */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="hidden sm:block absolute top-8 right-[30%] pointer-events-none select-none opacity-[0.06]"
        >
          <Leaf className="w-28 h-28 -rotate-30" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 6, 0], rotate: [3, -3, 3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="hidden sm:block absolute bottom-12 right-[8%] pointer-events-none select-none opacity-[0.05]"
        >
          <Leaf className="w-24 h-24 rotate-60" />
        </motion.div>
        {/* Gold botanical line */}
        <div className="hidden sm:block absolute top-[20%] left-[5%] w-px h-32 bg-gradient-to-b from-transparent via-[#DCA46A]/20 to-transparent pointer-events-none" />
        <div className="hidden sm:block absolute top-[30%] right-[5%] w-px h-24 bg-gradient-to-b from-transparent via-[#2E5D34]/15 to-transparent pointer-events-none" />
        <div className="hidden sm:block absolute bottom-[20%] left-[20%] w-20 h-px bg-gradient-to-r from-transparent via-[#DCA46A]/15 to-transparent pointer-events-none" />
        {/* Gold sparkle dots */}
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:block absolute top-16 left-[30%] w-2 h-2 rounded-full bg-[#DCA46A]/30 pointer-events-none"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="hidden sm:block absolute top-32 right-[25%] w-1.5 h-1.5 rounded-full bg-[#2E5D34]/25 pointer-events-none"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.4, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="hidden sm:block absolute bottom-20 right-[35%] w-2.5 h-2.5 rounded-full bg-[#DCA46A]/20 pointer-events-none"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
          className="hidden sm:block absolute top-[45%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#DCA46A]/25 pointer-events-none"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden sm:block absolute bottom-[30%] right-[18%] w-2 h-2 rounded-full bg-[#2E5D34]/20 pointer-events-none"
        />
        {/* Soft blurred circles */}
        <div className="hidden sm:block absolute top-0 right-[10%] w-72 h-72 bg-[#2E5D34]/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 left-[5%] w-96 h-96 bg-[#DCA46A]/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="hidden sm:block absolute top-[40%] right-[40%] w-64 h-64 bg-[#2E5D34]/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-16 lg:py-24 relative z-10">
          {/* Animated kolam art corners */}
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
            transition={{ rotate: { duration: 80, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute top-4 left-4 sm:top-8 sm:left-8 opacity-[0.12] pointer-events-none"
          >
            <KolamLineArt type="padi" size={120} color="#C8951E" />
          </motion.div>
          <motion.div
            animate={{ rotate: [360, 0], scale: [1, 1.15, 1] }}
            transition={{ rotate: { duration: 70, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
            className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 opacity-[0.12] pointer-events-none"
          >
            <KolamLineArt type="neli" size={110} color="#C8951E" />
          </motion.div>
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-6">

            {/* Left Side: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 text-center lg:text-left"
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#2E5D34]/10 border border-[#2E5D34]/20 text-[#2E5D34] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] mb-3 sm:mb-5"
              >
                <Sparkles className="w-3 h-3" />
                Menu Customization
              </motion.span>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2A163F] leading-[1.1] tracking-tight">
                {packageName ? (
                  <>{packageName} <span className="text-[#2E5D34]">Feast Menu</span></>
                ) : (
                  <>Create Your Dream{" "}
                  <br className="hidden sm:block" />
                  <span className="text-[#2E5D34]">Wedding Menu</span></>
                )}
              </h1>

              <p className="mt-3 sm:mt-5 text-[#5C4D40]/80 text-xs sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Build your perfect Tamil wedding menu in just a few minutes. Choose your favorite dishes, live counters, sweets, beverages and more.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 justify-center lg:justify-start">
                <button
                  onClick={() => goToStep(1)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#2E5D34] to-[#3A7A42] text-white text-xs font-extrabold uppercase tracking-[0.2em] shadow-lg hover:shadow-xl hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <Leaf className="w-4 h-4" />
                  Start Customizing
                </button>
                <button
                  onClick={() => navigate({ to: "/menu" })}
                  className="px-8 py-3.5 rounded-xl border border-[#2A163F]/15 text-[#2A163F] text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#2A163F]/5 transition-all flex items-center gap-2"
                >
                  View Sample Menus
                </button>
              </div>

              {/* Feature Icons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 justify-center lg:justify-start"
              >
                {[
                  { icon: <Zap className="w-3.5 h-3.5" />, text: "100% Customizable" },
                  { icon: <FileText className="w-3.5 h-3.5" />, text: "Instant Quote" },
                  { icon: <Share2 className="w-3.5 h-3.5" />, text: "Save & Share" },
                  { icon: <Star className="w-3.5 h-3.5" />, text: "Expert Assistance" },
                ].map((feat) => (
                  <div key={feat.text} className="flex items-center gap-1.5 text-[#5C4D40]/60 text-[11px] font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#2E5D34]/10 flex items-center justify-center text-[#2E5D34]">
                      {feat.icon}
                    </div>
                    <span>{feat.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side: Image */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-1 justify-end w-full lg:max-w-none relative"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                style={{ marginTop: "-3rem", marginBottom: "-4rem" }}
                className="relative w-full max-w-[160px] sm:max-w-[400px] lg:max-w-[800px]"
              >
                <img
                  src={pageHeaderImg}
                   alt="Traditional banana leaf wedding menu"
                  className="w-full h-auto object-contain mix-blend-multiply"
                  style={{
                    filter: "drop-shadow(0 35px 60px rgba(0,0,0,0.18))",
                    objectPosition: "center center",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STEP PROGRESS BAR */}
        <div ref={stepRailRef} className="bg-white border-b border-[#E4DACB] overflow-x-auto">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-0 min-w-max py-2 sm:py-3">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => goToStep(step.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#3A1029] text-[#DCA46A] shadow-md"
                        : isCompleted
                          ? "bg-[#2E5D34]/10 text-[#2E5D34]"
                          : "text-[#7A6A5C] hover:bg-[#F2ECE1]"
                    }`}
                  >
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-extrabold ${
                      isActive
                        ? "bg-[#DCA46A] text-[#3A1029]"
                        : isCompleted
                          ? "bg-[#2E5D34] text-white"
                          : "bg-[#E4DACB] text-[#7A6A5C]"
                    }`}>
                      {isCompleted ? <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : step.id}
                    </div>
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                  {idx < STEPS.length - 1 && (
                    <div className={`w-4 sm:w-6 h-[2px] mx-0.5 sm:mx-1 ${isCompleted ? "bg-[#2E5D34]" : "bg-[#E4DACB]"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6 relative overflow-hidden">
        {/* MOBILE-ONLY QUICK SUMMARY BAR */}
        {packageName && (
          <div className="lg:hidden mb-4 bg-gradient-to-r from-[#3A1029] to-[#541539] rounded-2xl p-4 text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-cream/60 font-bold">Package</span>
              <p className="font-serif text-sm font-bold text-gold">{packageName} Feast</p>
            </div>
            <div className="text-center px-3">
              <span className="font-serif text-lg font-bold">{totalSelectedCount}</span>
              <span className="block text-[9px] text-cream/60">Items</span>
            </div>
            <div className="text-right">
              <span className="font-serif text-sm font-bold text-gold">₹{estimatedCost.toLocaleString("en-IN")}</span>
              <span className="block text-[9px] text-cream/60">estimated</span>
            </div>
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">

          {/* LEFT SIDEBAR (Steps Navigation) — desktop only */}
          <div className="hidden lg:block lg:w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-[#E4DACB] p-3 space-y-1 sticky top-24">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => goToStep(step.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#3A1029] text-[#DCA46A] shadow-sm"
                        : isCompleted
                          ? "bg-[#2E5D34]/5 text-[#2E5D34] hover:bg-[#2E5D34]/10"
                          : "text-[#7A6A5C] hover:bg-[#F2ECE1]"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-[#DCA46A]/20"
                        : isCompleted
                          ? "bg-[#2E5D34]/10"
                          : "bg-[#F2ECE1]"
                    }`}>
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 text-[#2E5D34]" />
                      ) : (
                        <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#DCA46A]" : "text-[#7A6A5C]"}`} />
                      )}
                    </div>
                    <span className="hidden lg:block">{step.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepEventDetails
                    eventType={eventType}
                    setEventType={setEventType}
                    eventDate={eventDate}
                    setEventDate={setEventDate}
                    mealType={mealType}
                    setMealType={setMealType}
                    guestCount={guestCount}
                    setGuestCount={setGuestCount}
                    onNext={() => goToStep(2)}
                  />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepMenuStyle
                    menuStyle={menuStyle}
                    setMenuStyle={setMenuStyle}
                    onNext={() => goToStep(3)}
                    onBack={() => goToStep(1)}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepMenuSelection
                    search={search}
                    setSearch={setSearch}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    filteredCategories={filteredCategories}
                    selectedItems={selectedItems}
                    itemQuantities={itemQuantities}
                    toggleItem={toggleItem}
                    updateQuantity={updateQuantity}
                    toggleAllInCategory={toggleAllInCategory}
                    openCategories={openCategories}
                    toggleCategory={toggleCategory}
                    onNext={() => goToStep(4)}
                    onBack={() => goToStep(2)}
                  />
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepLiveCounters
                    selectedLiveCounters={selectedLiveCounters}
                    toggleLiveCounter={toggleLiveCounter}
                    guestCount={guestCount}
                    onNext={() => goToStep(5)}
                    onBack={() => goToStep(3)}
                  />
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepPremiumAddons
                    selectedAddons={selectedAddons}
                    toggleAddon={toggleAddon}
                    addonQuantities={addonQuantities}
                    updateAddonQty={updateAddonQty}
                    onNext={() => goToStep(6)}
                    onBack={() => goToStep(4)}
                  />
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepReview
                    eventType={eventType}
                    eventDate={eventDate}
                    mealType={mealType}
                    guestCount={guestCount}
                    menuStyle={menuStyle}
                    selectedDishes={selectedDishes}
                    selectedLiveCounters={selectedLiveCounters}
                    selectedAddons={selectedAddons}
                    addonQuantities={addonQuantities}
                    estimatedCost={estimatedCost}
                    onNext={() => goToStep(7)}
                    onBack={() => goToStep(5)}
                  />
                </motion.div>
              )}

              {currentStep === 7 && (
                <motion.div
                  key="step7"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepContactDetails
                    contactName={contactName}
                    setContactName={setContactName}
                    contactPhone={contactPhone}
                    setContactPhone={setContactPhone}
                    contactEmail={contactEmail}
                    setContactEmail={setContactEmail}
                    venue={venue}
                    setVenue={setVenue}
                    specialInstructions={specialInstructions}
                    setSpecialInstructions={setSpecialInstructions}
                    submitted={submitted}
                    submitError={submitError}
                    submitting={submitting}
                    handleSubmit={handleWhatsApp}
                    onBack={() => goToStep(6)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDEBAR (Sticky Summary) — beside on desktop, below on mobile */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl border border-[#E4DACB] p-4 sm:p-5 lg:sticky lg:top-24 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between border-b border-[#E4DACB] pb-3">
                <h3 className="font-serif text-base font-bold text-[#3A1029]">Menu Summary</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#DCA46A]/15 text-[#B88E56] text-[10px] font-bold">
                  LIVE
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <SummaryRow label="Event" value={eventType || "Not set"} />
                <SummaryRow label="Date" value={eventDate || "Not set"} />
                <SummaryRow label="Meal" value={mealType || "Not set"} />
                <SummaryRow label="Style" value={menuStyle || "Not set"} />
                <div className="flex justify-between items-center">
                  <span className="text-[#7A6A5C]">Guests</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setGuestCount(Math.max(50, guestCount - 50))}
                      className="w-6 h-6 rounded-md bg-[#F2ECE1] flex items-center justify-center text-[#3A1029] hover:bg-[#E4DACB]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-[#3A1029] w-14 text-center">{guestCount}</span>
                    <button
                      onClick={() => setGuestCount(guestCount + 50)}
                      className="w-6 h-6 rounded-md bg-[#F2ECE1] flex items-center justify-center text-[#3A1029] hover:bg-[#E4DACB]"
                    >
                      <PlusIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E4DACB] pt-3 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#B88E56]">
                  Selected Items ({totalSelectedCount})
                </div>
                {selectedDishes.length === 0 ? (
                  <p className="text-[11px] text-[#7A6A5C] italic">No items selected yet</p>
                ) : (
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {selectedDishes.slice(0, 10).map((dish) => (
                      <div key={dish.id} className="flex items-center justify-between text-[11px] text-[#3E3127]">
                        <span className="truncate mr-2">{dish.name}</span>
                        <span className="text-[#B88E56] shrink-0">x{itemQuantities[dish.id] || 1}</span>
                      </div>
                    ))}
                    {selectedDishes.length > 10 && (
                      <p className="text-[10px] text-[#7A6A5C]">+{selectedDishes.length - 10} more items</p>
                    )}
                  </div>
                )}
              </div>

              <div className="border-t border-[#E4DACB] pt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-[#7A6A5C]">Estimated Cost</span>
                </div>
                <motion.div
                  key={estimatedCost}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-serif font-bold text-[#2E5D34]"
                >
                  ₹{estimatedCost.toLocaleString("en-IN")}
                </motion.div>
                <p className="text-[10px] text-[#7A6A5C] mt-0.5">Final pricing may vary</p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => goToStep(7)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2E5D34] to-[#3A7A42] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Get Personalized Quote
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const data = { selectedItems, itemQuantities, eventType, eventDate, mealType, guestCount, menuStyle };
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "my-menu-draft.json";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-[#E4DACB] text-[#3A1029] text-[11px] font-bold hover:bg-[#F2ECE1] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Draft
                  </button>
                  <button
                    onClick={() => {
                      const dishNames = selectedDishes.map((d) => d.name).join(", ");
                      const text = `My Chennai Catering Menu:\n${dishNames}`;
                      navigator.clipboard.writeText(text);
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-[#E4DACB] text-[#3A1029] text-[11px] font-bold hover:bg-[#F2ECE1] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[#7A6A5C]">{label}</span>
      <span className="font-medium text-[#3A1029] truncate ml-2 max-w-[160px] text-right">{value}</span>
    </div>
  );
}

/* ========================= STEP 1: EVENT DETAILS ========================= */
function StepEventDetails({
  eventType, setEventType, eventDate, setEventDate,
  mealType, setMealType, guestCount, setGuestCount, onNext,
}: {
  eventType: string; setEventType: (v: string) => void;
  eventDate: string; setEventDate: (v: string) => void;
  mealType: string; setMealType: (v: string) => void;
  guestCount: number; setGuestCount: (v: number) => void;
  onNext: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E4DACB] p-6 sm:p-8 space-y-8">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B88E56] font-bold">Step 1 of 7</span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] mt-1">Event Details</h2>
        <p className="text-xs text-[#7A6A5C] mt-1">Tell us about your event to get started</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold text-[#3A1029] uppercase tracking-wider block mb-3">Event Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EVENT_TYPES.map((et) => (
              <button
                key={et.id}
                onClick={() => setEventType(et.label)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  eventType === et.label
                    ? "border-[#DCA46A] bg-[#DCA46A]/10 shadow-sm"
                    : "border-[#E4DACB] hover:border-[#DCA46A]/50 hover:bg-[#F2ECE1]"
                }`}
              >
                <span className="text-xl block mb-1">{et.icon}</span>
                <span className={`text-[11px] font-bold ${eventType === et.label ? "text-[#3A1029]" : "text-[#7A6A5C]"}`}>
                  {et.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#3A1029] uppercase tracking-wider block mb-3">Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#E4DACB] text-sm font-medium outline-none focus:border-[#DCA46A] focus:ring-2 focus:ring-[#DCA46A]/10 transition-all"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#3A1029] uppercase tracking-wider block mb-3">Meal Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {MEAL_TYPES.map((mt) => (
              <button
                key={mt.id}
                onClick={() => setMealType(mt.label)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  mealType === mt.label
                    ? "border-[#DCA46A] bg-[#DCA46A]/10 shadow-sm"
                    : "border-[#E4DACB] hover:border-[#DCA46A]/50 hover:bg-[#F2ECE1]"
                }`}
              >
                <span className="text-xl block mb-1">{mt.icon}</span>
                <span className={`text-[11px] font-bold block ${mealType === mt.label ? "text-[#3A1029]" : "text-[#7A6A5C]"}`}>
                  {mt.label}
                </span>
                <span className="text-[9px] text-[#7A6A5C]">{mt.time}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#3A1029] uppercase tracking-wider block mb-3">
            Guest Count — <span className="text-[#DCA46A]">{guestCount} guests</span>
          </label>
          <input
            type="range"
            min={50}
            max={3000}
            step={10}
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full h-2 bg-[#E4DACB] rounded-lg appearance-none cursor-pointer accent-[#DCA46A]"
          />
          <div className="flex justify-between text-[10px] text-[#7A6A5C] mt-1">
            <span>50</span>
            <span>1000</span>
            <span>2000</span>
            <span>3000</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-[#3A1029] text-[#DCA46A] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          Next Step <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ========================= STEP 2: MENU STYLE ========================= */
function StepMenuStyle({
  menuStyle, setMenuStyle, onNext, onBack,
}: {
  menuStyle: string; setMenuStyle: (v: string) => void;
  onNext: () => void; onBack: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E4DACB] p-6 sm:p-8 space-y-8">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B88E56] font-bold">Step 2 of 7</span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] mt-1">Menu Style</h2>
        <p className="text-xs text-[#7A6A5C] mt-1">Choose your preferred service style</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MENU_STYLES.map((style) => (
          <motion.button
            key={style.id}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMenuStyle(style.label)}
            className={`p-5 rounded-2xl border text-left transition-all ${
              menuStyle === style.label
                ? "border-[#DCA46A] bg-gradient-to-br from-[#DCA46A]/10 to-[#DCA46A]/5 shadow-md ring-1 ring-[#DCA46A]/30"
                : "border-[#E4DACB] hover:border-[#DCA46A]/50 hover:shadow-sm"
            }`}
          >
            <span className="text-3xl block mb-3">{style.icon}</span>
            <h4 className="font-serif text-base font-bold text-[#3A1029]">{style.label}</h4>
            <p className="text-[11px] text-[#7A6A5C] mt-1 leading-relaxed">{style.desc}</p>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-[#E4DACB] text-[#3A1029] text-xs font-bold uppercase tracking-wider hover:bg-[#F2ECE1] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-[#3A1029] text-[#DCA46A] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          Next Step <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ========================= STEP 3: MENU SELECTION ========================= */
function StepMenuSelection({
  search, setSearch, activeFilter, setActiveFilter,
  filteredCategories, selectedItems, itemQuantities,
  toggleItem, updateQuantity, toggleAllInCategory,
  openCategories, toggleCategory, onNext, onBack,
}: {
  search: string; setSearch: (v: string) => void;
  activeFilter: FilterType; setActiveFilter: (v: FilterType) => void;
  filteredCategories: (import("@/data/menuData").MenuCategory & { items: FoodItem[] })[];
  selectedItems: Record<string, boolean>;
  itemQuantities: Record<string, number>;
  toggleItem: (id: string) => void;
  updateQuantity: (id: string, d: number) => void;
  toggleAllInCategory: (id: string) => void;
  openCategories: string[];
  toggleCategory: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "veg", label: "🟢 Veg" },
    { key: "chef", label: "👨‍🍳 Chef Special" },
    { key: "trending", label: "🔥 Trending" },
    { key: "premium", label: "👑 Premium" },
  ];

  return (
    <div className="space-y-4">
      {/* SEARCH & FILTERS */}
      <div className="bg-white rounded-2xl border border-[#E4DACB] p-4 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#7A6A5C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes... (e.g. Biryani, Payasam, Dosa)"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#FAF8F2] border border-[#E4DACB] text-xs font-medium outline-none focus:border-[#DCA46A] focus:ring-2 focus:ring-[#DCA46A]/10 transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6A5C] hover:text-[#3A1029]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                activeFilter === f.key
                  ? "bg-[#3A1029] text-[#DCA46A] shadow-sm"
                  : "bg-[#F2ECE1] text-[#7A6A5C] hover:bg-[#E4DACB]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORIES WITH ACCORDION */}
      {filteredCategories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E4DACB] p-12 text-center">
          <Utensils className="w-10 h-10 text-[#DCA46A]/50 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#3A1029]">No dishes found</h3>
          <p className="text-xs text-[#7A6A5C] mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        filteredCategories.map((cat) => {
          const isOpen = openCategories.includes(cat.id);
          const allSelected = cat.items.every((item) => selectedItems[item.id]);
          const selectedInCat = cat.items.filter((item) => selectedItems[item.id]).length;

          return (
            <motion.div
              key={cat.id}
              layout
              className="bg-white rounded-2xl border border-[#E4DACB] overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FAF8F2] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{cat.icon}</span>
                  <div className="text-left">
                    <h3 className="font-serif text-sm font-bold text-[#3A1029]">{cat.name}</h3>
                    <p className="text-[10px] text-[#7A6A5C]">
                      {cat.items.length} dishes {selectedInCat > 0 && `· ${selectedInCat} selected`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAllInCategory(cat.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      allSelected
                        ? "bg-[#2E5D34]/10 text-[#2E5D34]"
                        : "bg-[#F2ECE1] text-[#7A6A5C] hover:bg-[#E4DACB]"
                    }`}
                  >
                    {allSelected ? "Deselect All" : "Select All"}
                  </button>
                  <ChevronDown className={`w-4 h-4 text-[#7A6A5C] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {cat.items.map((item) => {
                        const isSelected = !!selectedItems[item.id];
                        const qty = itemQuantities[item.id] || 0;
                        return (
                          <motion.div
                            key={item.id}
                            layout
                            whileHover={{ scale: 1.01 }}
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                              isSelected
                                ? "border-[#DCA46A] bg-[#DCA46A]/5 shadow-sm"
                                : "border-[#F2ECE1] hover:border-[#DCA46A]/40 hover:bg-[#FAF8F2]"
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <div className={`w-4 h-4 rounded-sm border mt-0.5 shrink-0 flex items-center justify-center ${
                                isSelected ? "bg-[#2E5D34] border-[#2E5D34]" : "border-[#CCC]"
                              }`}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-xs font-bold text-[#3A1029]">{item.name}</span>
                                  {item.isChefRecommended && (
                                    <span className="px-1.5 py-0.5 rounded-full bg-[#DCA46A]/15 text-[#B88E56] text-[8px] font-bold flex items-center gap-0.5">
                                      <Star className="w-2 h-2" /> Chef
                                    </span>
                                  )}
                                  {item.isTrending && (
                                    <span className="px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-600 text-[8px] font-bold flex items-center gap-0.5">
                                      <TrendingUp className="w-2 h-2" /> Hot
                                    </span>
                                  )}
                                  {item.isPremium && (
                                    <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-600 text-[8px] font-bold flex items-center gap-0.5">
                                      <Crown className="w-2 h-2" /> Premium
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-[#7A6A5C] mt-0.5 leading-relaxed truncate">{item.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  {item.prepTime && (
                                    <span className="text-[9px] text-[#7A6A5C] flex items-center gap-0.5">
                                      <Clock className="w-2.5 h-2.5" /> {item.prepTime}
                                    </span>
                                  )}
                                  {item.pricePerHead && (
                                    <span className="text-[9px] text-[#B88E56] font-bold">₹{item.pricePerHead}/head</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="ml-2 shrink-0">
                              {isSelected ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-6 h-6 rounded-md bg-[#3A1029] text-[#DCA46A] flex items-center justify-center text-xs font-bold hover:bg-[#2A0B1E]"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-6 text-center text-[11px] font-extrabold text-[#3A1029]">{qty}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-6 h-6 rounded-md bg-[#3A1029] text-[#DCA46A] flex items-center justify-center text-xs font-bold hover:bg-[#2A0B1E]"
                                  >
                                    <PlusIcon className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => toggleItem(item.id)}
                                  className="px-3 py-1.5 rounded-lg bg-[#3A1029] text-[#DCA46A] text-[10px] font-bold uppercase tracking-wider hover:bg-[#2A0B1E] transition-all"
                                >
                                  + Add
                                </button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })
      )}
      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-[#E4DACB] text-[#3A1029] text-xs font-bold uppercase tracking-wider hover:bg-[#F2ECE1] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-[#3A1029] text-[#DCA46A] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          Next Step <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ========================= STEP 4: LIVE COUNTERS ========================= */
function StepLiveCounters({
  selectedLiveCounters, toggleLiveCounter, guestCount, onNext, onBack,
}: {
  selectedLiveCounters: Record<string, boolean>;
  toggleLiveCounter: (id: string) => void;
  guestCount: number;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E4DACB] p-6 sm:p-8 space-y-8">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B88E56] font-bold">Step 4 of 7</span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] mt-1">Live Counters</h2>
        <p className="text-xs text-[#7A6A5C] mt-1">Add interactive food stations to your event</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LIVE_COUNTERS.map((lc) => {
          const isSelected = !!selectedLiveCounters[lc.id];
          return (
            <motion.button
              key={lc.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleLiveCounter(lc.id)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "border-[#DCA46A] bg-gradient-to-br from-[#DCA46A]/10 to-[#DCA46A]/5 shadow-md ring-1 ring-[#DCA46A]/30"
                  : "border-[#E4DACB] hover:border-[#DCA46A]/50 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{lc.icon}</span>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#2E5D34] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
              <h4 className="font-serif text-base font-bold text-[#3A1029] mt-3">{lc.name}</h4>
              <p className="text-[11px] text-[#7A6A5C] mt-1 leading-relaxed">{lc.description}</p>
              <p className="text-xs font-bold text-[#B88E56] mt-2">₹{lc.pricePerHead}/head · ₹{(lc.pricePerHead * guestCount).toLocaleString("en-IN")} est.</p>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-[#E4DACB] text-[#3A1029] text-xs font-bold uppercase tracking-wider hover:bg-[#F2ECE1] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-[#3A1029] text-[#DCA46A] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          Next Step <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ========================= STEP 5: PREMIUM ADD-ONS ========================= */
function StepPremiumAddons({
  selectedAddons, toggleAddon, addonQuantities, updateAddonQty, onNext, onBack,
}: {
  selectedAddons: Record<string, boolean>;
  toggleAddon: (id: string) => void;
  addonQuantities: Record<string, number>;
  updateAddonQty: (id: string, d: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E4DACB] p-6 sm:p-8 space-y-8">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B88E56] font-bold">Step 5 of 7</span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] mt-1">Premium Add-ons</h2>
        <p className="text-xs text-[#7A6A5C] mt-1">Enhance your event with premium services</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PREMIUM_ADDONS.map((pa) => {
          const isSelected = !!selectedAddons[pa.id];
          const qty = addonQuantities[pa.id] || 1;
          return (
            <motion.div
              key={pa.id}
              whileHover={{ y: -3 }}
              className={`p-5 rounded-2xl border transition-all ${
                isSelected
                  ? "border-[#DCA46A] bg-gradient-to-br from-[#DCA46A]/10 to-[#DCA46A]/5 shadow-md ring-1 ring-[#DCA46A]/30"
                  : "border-[#E4DACB] hover:border-[#DCA46A]/50 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{pa.icon}</span>
                <button
                  onClick={() => toggleAddon(pa.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    isSelected
                      ? "bg-[#2E5D34] text-white"
                      : "bg-[#F2ECE1] text-[#7A6A5C] hover:bg-[#E4DACB]"
                  }`}
                >
                  {isSelected ? "Added ✓" : "+ Add"}
                </button>
              </div>
              <h4 className="font-serif text-base font-bold text-[#3A1029] mt-3">{pa.name}</h4>
              <p className="text-[11px] text-[#7A6A5C] mt-1 leading-relaxed">{pa.description}</p>
              <p className="text-xs font-bold text-[#B88E56] mt-2">₹{pa.price.toLocaleString("en-IN")} / {pa.unit}</p>
              {isSelected && pa.unit === "guest" && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-[#7A6A5C]">Qty:</span>
                  <div className="flex items-center bg-[#3A1029] rounded-lg p-0.5">
                    <button
                      onClick={() => updateAddonQty(pa.id, -1)}
                      className="w-6 h-6 rounded-md bg-white/20 text-[#DCA46A] flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-[11px] font-bold text-white">{qty}</span>
                    <button
                      onClick={() => updateAddonQty(pa.id, 1)}
                      className="w-6 h-6 rounded-md bg-white/20 text-[#DCA46A] flex items-center justify-center"
                    >
                      <PlusIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-[#E4DACB] text-[#3A1029] text-xs font-bold uppercase tracking-wider hover:bg-[#F2ECE1] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-[#3A1029] text-[#DCA46A] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          Review Menu <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ========================= STEP 6: REVIEW ========================= */
function StepReview({
  eventType, eventDate, mealType, guestCount, menuStyle,
  selectedDishes, selectedLiveCounters, selectedAddons, addonQuantities,
  estimatedCost, onNext, onBack,
}: {
  eventType: string; eventDate: string; mealType: string;
  guestCount: number; menuStyle: string;
  selectedDishes: FoodItem[];
  selectedLiveCounters: Record<string, boolean>;
  selectedAddons: Record<string, boolean>;
  addonQuantities: Record<string, number>;
  estimatedCost: number;
  onNext: () => void; onBack: () => void;
}) {
  const groupedDishes = useMemo(() => {
    const groups: Record<string, FoodItem[]> = {};
    selectedDishes.forEach((d) => {
      if (!groups[d.category]) groups[d.category] = [];
      groups[d.category].push(d);
    });
    return groups;
  }, [selectedDishes]);

  return (
    <div className="bg-white rounded-2xl border border-[#E4DACB] p-6 sm:p-8 space-y-8">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B88E56] font-bold">Step 6 of 7</span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] mt-1">Review Your Menu</h2>
        <p className="text-xs text-[#7A6A5C] mt-1">Review your selections before submitting</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <ReviewInfo icon="🎉" label="Event" value={eventType || "Not set"} />
        <ReviewInfo icon="📅" label="Date" value={eventDate || "Not set"} />
        <ReviewInfo icon="🍽️" label="Meal" value={mealType || "Not set"} />
        <ReviewInfo icon="👥" label="Guests" value={`${guestCount}`} />
      </div>

      <div className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#3A1029]">Selected Dishes ({selectedDishes.length})</h3>
        {Object.entries(groupedDishes).map(([catId, dishes]) => {
          const cat = MENU_CATEGORIES.find((c) => c.id === catId);
          return (
            <div key={catId} className="bg-[#FAF8F2] rounded-xl p-4 border border-[#E4DACB]">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#B88E56] mb-2">
                {cat?.icon} {cat?.name || catId}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dishes.map((d) => (
                  <span key={d.id} className="px-2.5 py-1 rounded-full bg-white border border-[#E4DACB] text-[11px] font-medium text-[#3A1029]">
                    {d.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {Object.values(selectedLiveCounters).some(Boolean) && (
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#B88E56] mb-2">Live Counters</h4>
          <div className="flex flex-wrap gap-1.5">
            {LIVE_COUNTERS.filter((lc) => selectedLiveCounters[lc.id]).map((lc) => (
              <span key={lc.id} className="px-2.5 py-1 rounded-full bg-[#DCA46A]/10 border border-[#DCA46A]/30 text-[11px] font-medium text-[#3A1029]">
                {lc.icon} {lc.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {Object.values(selectedAddons).some(Boolean) && (
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#B88E56] mb-2">Premium Add-ons</h4>
          <div className="flex flex-wrap gap-1.5">
            {PREMIUM_ADDONS.filter((pa) => selectedAddons[pa.id]).map((pa) => (
              <span key={pa.id} className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-[11px] font-medium text-[#3A1029]">
                {pa.icon} {pa.name} {pa.unit === "guest" && `(x${addonQuantities[pa.id] || 1})`}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-[#2E5D34] to-[#3A7A42] rounded-2xl p-5 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[11px] text-white/70 uppercase tracking-wider font-bold">Estimated Total</p>
            <p className="text-[10px] text-white/50 mt-0.5">For {guestCount} guests · Final pricing may vary</p>
          </div>
          <motion.p
            key={estimatedCost}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-3xl font-serif font-bold"
          >
            ₹{estimatedCost.toLocaleString("en-IN")}
          </motion.p>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-[#E4DACB] text-[#3A1029] text-xs font-bold uppercase tracking-wider hover:bg-[#F2ECE1] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-[#3A1029] text-[#DCA46A] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          Continue to Contact <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ReviewInfo({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-[#FAF8F2] rounded-xl p-3 border border-[#E4DACB] text-center">
      <span className="text-lg">{icon}</span>
      <p className="text-[10px] text-[#7A6A5C] mt-1">{label}</p>
      <p className="text-xs font-bold text-[#3A1029] mt-0.5">{value}</p>
    </div>
  );
}

/* ========================= STEP 7: CONTACT DETAILS ========================= */
function StepContactDetails({
  contactName, setContactName, contactPhone, setContactPhone,
  contactEmail, setContactEmail, venue, setVenue,
  specialInstructions, setSpecialInstructions, submitted,
  submitError, submitting, handleSubmit, onBack,
}: {
  contactName: string; setContactName: (v: string) => void;
  contactPhone: string; setContactPhone: (v: string) => void;
  contactEmail: string; setContactEmail: (v: string) => void;
  venue: string; setVenue: (v: string) => void;
  specialInstructions: string; setSpecialInstructions: (v: string) => void;
  submitted: boolean; submitError: string | null; submitting: boolean;
  handleSubmit: () => void;
  onBack: () => void;
}) {
  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-[#E4DACB] p-8 sm:p-12 text-center space-y-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-full bg-[#2E5D34]/10 flex items-center justify-center mx-auto"
        >
          <Check className="w-8 h-8 text-[#2E5D34]" />
        </motion.div>
        <h3 className="font-serif text-2xl font-bold text-[#3A1029]">Request Sent!</h3>
        <p className="text-sm text-[#7A6A5C] max-w-md mx-auto leading-relaxed">
          Thank you! Our MCC Catering Manager will review your menu and contact you within 1 hour with a formal PDF quotation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href="https://wa.me/919940396005?text=Hello%20MCC%20Catering!"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#1DA851]"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
          <a
            href="tel:+919940396005"
            className="px-6 py-3 rounded-xl bg-[#3A1029] text-[#DCA46A] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E4DACB] p-6 sm:p-8 space-y-8">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B88E56] font-bold">Step 7 of 7</span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#3A1029] mt-1">Contact Details</h2>
        <p className="text-xs text-[#7A6A5C] mt-1">Share your details to receive a personalized quote</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-bold text-[#3A1029] uppercase tracking-wider block mb-1.5">
              <UserIcon /> Full Name
            </label>
            <input
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. S. Sundararajan"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF8F2] border border-[#E4DACB] text-sm font-medium outline-none focus:border-[#DCA46A] focus:ring-2 focus:ring-[#DCA46A]/10 transition-all"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#3A1029] uppercase tracking-wider block mb-1.5">
              <PhoneIcon /> Phone / WhatsApp
            </label>
            <input
              required
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+91 99403 96005"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF8F2] border border-[#E4DACB] text-sm font-medium outline-none focus:border-[#DCA46A] focus:ring-2 focus:ring-[#DCA46A]/10 transition-all"
            />
          </div>
        </div>
        <div>
          <label className="text-[11px] font-bold text-[#3A1029] uppercase tracking-wider block mb-1.5">
            <MailIcon /> Email (Optional)
          </label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8F2] border border-[#E4DACB] text-sm font-medium outline-none focus:border-[#DCA46A] focus:ring-2 focus:ring-[#DCA46A]/10 transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-[#3A1029] uppercase tracking-wider block mb-1.5">
            <MapPinIcon /> Venue
          </label>
          <input
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="e.g. Mayor Ramanathan Hall, Chetpet, Chennai"
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8F2] border border-[#E4DACB] text-sm font-medium outline-none focus:border-[#DCA46A] focus:ring-2 focus:ring-[#DCA46A]/10 transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-[#3A1029] uppercase tracking-wider block mb-1.5">
            Special Instructions
          </label>
          <textarea
            rows={3}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Any dietary restrictions, special requests, or notes..."
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8F2] border border-[#E4DACB] text-sm font-medium outline-none focus:border-[#DCA46A] focus:ring-2 focus:ring-[#DCA46A]/10 transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
        <button
          onClick={onBack}
          disabled={submitting}
          className="px-6 py-3 rounded-xl border border-[#E4DACB] text-[#3A1029] text-xs font-bold uppercase tracking-wider hover:bg-[#F2ECE1] transition-all disabled:opacity-50"
        >
          Back
        </button>
        <div className="space-y-2">
          {submitError && (
            <div role="alert" className="px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              {submitError}
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={!contactName || !contactPhone || submitting}
              className="px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#1DA851] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageCircle className="w-4 h-4" /> {submitting ? "Saving..." : "WhatsApp Quote"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!contactName || !contactPhone || submitting}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2E5D34] to-[#3A7A42] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" /> {submitting ? "Saving..." : "Get My Quote"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserIcon() {
  return <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
}
function PhoneIcon() {
  return <Phone className="w-3 h-3 inline mr-1" />;
}
function MailIcon() {
  return <Mail className="w-3 h-3 inline mr-1" />;
}
function MapPinIcon() {
  return <MapPin className="w-3 h-3 inline mr-1" />;
}
