import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X, MapPin, Clock, Sparkles, MessageCircle } from "lucide-react";
import headerLogo from "@/assets/mcc-logo.png";
import lotusIcon from "@/assets/lotus icon.png";

const NAV = [
  { to: "/", label: "Home", hash: undefined },
  { to: "/about", label: "About Us", hash: undefined },
  { to: "/services", label: "Services", hash: undefined },
  { to: "/menu", label: "Menu", hash: undefined },
  { to: "/builder", label: "Customize your own menu ✦", hash: undefined },
  { to: "/gallery", label: "Gallery", hash: undefined },
  { to: "/", hash: "testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact Us", hash: undefined },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const leftLinks = NAV.slice(0, 4);
  const rightLinks = NAV.slice(4);

  const renderNavLink = (n: (typeof NAV)[number]) => {
    if (n.label === "Customize your own menu ✦") {
      return (
        <Link
          key={n.label}
          to="/builder"
          className="px-3 py-1.5 rounded-full bg-[#3E2E23] hover:bg-[#2A1E16] text-[#FFD700] hover:text-white text-[10px] 2xl:text-[11px] uppercase tracking-[0.08em] 2xl:tracking-[0.12em] font-extrabold transition-all duration-300 shadow-lg flex items-center gap-1.5 border-2 border-[#FFD700] active:scale-95 shrink-0 whitespace-nowrap"
        >
          <span className="2xl:hidden">BUILD YOUR MENU</span>
          <span className="hidden 2xl:inline">CUSTOMIZE YOUR OWN MENU</span>
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700] animate-pulse shrink-0" />
        </Link>
      );
    }
    if (n.label === "Services") {
      return (
        <div key={n.label} className="relative group/menu py-1">
          <button className="text-[11px] uppercase tracking-[0.2em] font-bold text-plum-dark hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
            {n.label}
            <span className="text-[8px] transition-transform group-hover/menu:rotate-180">▼</span>
          </button>
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-48 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto transition-all duration-200 transform scale-95 origin-top group-hover/menu:scale-100 z-50">
            <div className="bg-white rounded-xl shadow-xl border border-zinc-100 py-2.5 overflow-hidden">
              <Link
                to="/wedding-catering-services-in-chennai"
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold"
              >
                Weddings
              </Link>
              <Link
                to="/engagement-catering-services-in-chennai"
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold"
              >
                Engagements
              </Link>
              <Link
                to="/corporate-catering-services-in-chennai"
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold"
              >
                Corporate Events
              </Link>
              <Link
                to="/services"
                className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold border-t border-zinc-100"
              >
                All Services Showcase →
              </Link>
            </div>
          </div>
        </div>
      );
    }
    if (n.hash) {
      return (
        <Link
          key={n.label}
          to="/"
          hash="testimonials"
          resetScroll={false}
          className="text-[10px] xl:text-[11px] uppercase tracking-[0.12em] xl:tracking-[0.18em] font-bold text-plum-dark hover:text-white transition-colors relative py-1 whitespace-nowrap shrink-0"
        >
          {n.label}
        </Link>
      );
    }
    return (
      <Link
        key={n.label}
        to={n.to}
        className="text-[10px] xl:text-[11px] uppercase tracking-[0.12em] xl:tracking-[0.18em] font-bold text-plum-dark hover:text-white transition-colors relative py-1 whitespace-nowrap shrink-0"
        activeProps={{ className: "text-white border-b-2 border-white" }}
        activeOptions={{ exact: true }}
      >
        {n.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* ═══════════════════════════════════════════════════════════════
          MOBILE HEADER — 148px total
          ═══════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden">
        {/* Row 1: Announcement Bar — 20px */}
        <div className="bg-[#2d130c] h-5 flex items-center px-3 text-center overflow-hidden">
          <p className="text-[#E9B949] text-[9px] font-bold uppercase tracking-[2px] whitespace-nowrap animate-marquee w-full">
            ✨ FREE SAMPLE TASTING FOR WEDDINGS &amp; ENGAGEMENTS ✨
          </p>
        </div>

        {/* Row 2: Logo Row — 56px */}
        <div className="bg-white h-14 px-3 flex items-center justify-between">
          {/* Left: Hamburger + Lotus 46px */}
          <div className="flex items-center gap-1.5 w-[85px]">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="w-9 h-9 rounded-full border border-[#D4AF37]/60 flex items-center justify-center text-[#541539] bg-amber-50/50 active:scale-90 transition-all shrink-0"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            {isHome && (
              <Link to="/" className="flex items-center justify-center w-14 h-14 shrink-0 hover:scale-105 active:scale-95 transition-all">
                <img src={lotusIcon} alt="Temple Symbol" className="w-full h-full object-contain" />
              </Link>
            )}
          </div>

          {/* Center: Brand Logo — 72×72 */}
          <div className="flex-1 flex justify-center">
            <Link to="/">
              <img
                src={headerLogo}
                alt="My Chennai Catering"
                className="h-[84px] w-[84px] object-contain"
              />
            </Link>
          </div>

          {/* Right: Phone Number — ~85px */}
          <div className="text-right flex flex-col items-end justify-center w-[85px]">
            <span className="text-[8px] text-slate-400 font-medium uppercase tracking-[1.5px] leading-none">
              CALL US
            </span>
            <a href="tel:+919940396005" className="leading-[18px] whitespace-nowrap">
              <span className="text-[#541539] font-bold text-[13px]">99403 96005</span>
            </a>
          </div>
        </div>

        {/* Row 3: Service Location — 20px */}
        <div className="bg-white h-5 flex items-center justify-center">
          <button className="flex items-center gap-1 text-[10px] font-semibold text-[#541539] tracking-wide">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span>Chennai &amp; Suburbs</span>
            <span className="text-[8px] ml-0.5">▾</span>
          </button>
        </div>

        {/* Row 4: CTA Buttons — 40px */}
        <div className="bg-[#FFFDF8] h-10 px-3 flex items-center justify-center gap-2">
          <a
            href="tel:+919940396005"
            className="flex items-center justify-center gap-1 h-8 px-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-[9px] font-bold uppercase tracking-wider active:scale-95 transition-all shadow-md"
          >
            <Phone className="w-3 h-3" />
            <span>Call Now</span>
          </a>
          <a
            href="https://wa.me/919940396005"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1 h-8 px-3 rounded-full bg-[#12A65B] hover:bg-[#0f9050] text-white text-[9px] font-bold uppercase tracking-wider active:scale-95 transition-all shadow-md"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp</span>
          </a>
          <Link
            to="/builder"
            className="flex items-center justify-center gap-1 h-8 px-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white text-[9px] font-bold uppercase tracking-wider active:scale-95 transition-all shadow-md"
          >
            <Sparkles className="w-3 h-3" />
            <span>Customize Menu</span>
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE SLIDING MENU DRAWER
          ═══════════════════════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-[120px] bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed top-[120px] left-0 right-0 z-50 bg-white/98 backdrop-blur-xl border-t border-zinc-100 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-5 flex flex-col gap-2">
              {NAV.map((n) => {
                const isCustomizer = n.label === "Customize your own menu ✦";
                return (
                  <Link
                    key={n.label}
                    to={n.to}
                    hash={n.hash}
                    resetScroll={!n.hash}
                    onClick={() => setMobileMenuOpen(false)}
                    className={isCustomizer
                      ? "my-1 text-center px-4 py-3 rounded-xl bg-plum text-cream text-xs uppercase tracking-[0.2em] font-bold shadow-md flex items-center justify-center gap-2 border border-gold/40"
                      : "text-zinc-800 text-xs font-bold uppercase tracking-[0.2em] py-2.5 border-b border-zinc-100 hover:text-gold-dark transition-colors flex items-center justify-between"
                    }
                    activeProps={{ className: isCustomizer ? "" : "text-gold-dark font-bold border-gold" }}
                  >
                    <span>{n.label}</span>
                    {!isCustomizer && <span className="text-zinc-300 text-xs">→</span>}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 mt-3 w-full">
                <a href="tel:+919940396005" className="text-center px-5 py-3 rounded-full bg-[#E5B742] text-[#2A170E] text-[10px] font-bold uppercase tracking-[0.18em] shadow-md hover:bg-[#d4a635] transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: +91 99403 96005</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP HEADER
          ═══════════════════════════════════════════════════════════════ */}
      {/* Top White Row — Collapses on scroll */}
      <div className={`hidden lg:block border-b border-zinc-100/80 transition-all duration-300 overflow-hidden ${
        scrolled ? "max-h-0 py-0 opacity-0 border-none pointer-events-none" : "max-h-24 py-2 opacity-100"
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-full">
          <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-medium tracking-wide uppercase">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>No 49, South Bazaar, Thandurai, Pattabiram, Chennai – 600 072</span>
            </div>
            <div className="w-px h-3 bg-zinc-200" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>Office Hours: 8:00 AM - 9:00 PM</span>
            </div>
          </div>

          <div className="w-28 md:w-36" />

          <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-medium tracking-wide uppercase">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold-dark shrink-0" />
              <span>
                Support:{" "}
                <a href="tel:+919940396005" className="hover:text-gold-dark font-bold text-zinc-700">+91 99403 96005</a>
              </span>
            </div>
            <div className="w-px h-3 bg-zinc-200" />
            <Link to="/menu" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gold-dark text-gold-dark hover:bg-gold-dark hover:text-white transition-all duration-300 text-[9px] font-bold tracking-widest uppercase shadow-sm">
              Request a Quote
            </Link>
            <div className="relative group/lotus cursor-pointer pl-2 shrink-0">
              <div className="w-14 h-14 md:w-16 md:h-16 hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <img src={lotusIcon} alt="Lotus Auspicious Symbol" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Split Peach Navbar */}
      <div className="hidden lg:block relative h-12 select-none">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-b-[24px] md:rounded-b-[40px]">
          <svg viewBox="0 0 1000 48" preserveAspectRatio="none" className="w-full h-full text-party-peach fill-current filter drop-shadow-sm">
            <path d="M 0,0 L 410,0 C 455,0 455,28 500,28 C 545,28 545,0 590,0 L 1000,0 L 1000,48 L 0,48 Z" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 h-full flex items-center z-10">
          <nav className="flex min-w-0 flex-1 items-center justify-end gap-3 xl:gap-4 pr-2">
            {leftLinks.map(renderNavLink)}
          </nav>
          <div className="w-[140px] xl:w-[170px] 2xl:w-[190px] shrink-0" />
          <nav className="flex min-w-0 flex-1 items-center justify-start gap-3 xl:gap-4 pl-2">
            {rightLinks.map(renderNavLink)}
          </nav>
        </div>
      </div>

      {/* Desktop Absolutely Positioned Logo Overlay */}
      <div className={`hidden lg:block absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ${scrolled ? "top-[-15px]" : "top-[10px] md:top-[12px]"}`}>
        <Link to="/" className="group block pointer-events-auto">
          <div className={`flex items-center justify-center transition-all duration-300 ${scrolled ? "w-20 h-20 md:w-24 md:h-24" : "w-[200px] h-[200px]"}`}>
            <img src={headerLogo} alt="My Chennai Catering" className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
          </div>
        </Link>
      </div>
    </header>
  );
}
