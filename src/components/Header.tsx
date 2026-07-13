import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, MapPin, Clock, Sparkles } from "lucide-react";
import logoImg from "@/assets/mcc-logo.png";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leftLinks = NAV.slice(0, 4);
  const rightLinks = NAV.slice(4);

  const renderNavLink = (n: typeof NAV[number]) => {
    if (n.label === "Customize your own menu ✦") {
      return (
        <Link
          key={n.label}
          to="/builder"
          style={{
            padding: "clamp(4px, 0.6vw, 6px) clamp(8px, 1vw, 12px)",
            borderRadius: "9999px",
            backgroundColor: "#3E2E23",
            color: "#FFD700",
            fontSize: "clamp(7px, 0.7vw, 11px)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 800,
            transition: "all 0.3s",
            display: "inline-flex",
            alignItems: "center",
            gap: "clamp(4px, 0.4vw, 6px)",
            border: "2px solid #FFD700",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ display: "inline" }}>BUILD YOUR MENU</span>
          <Sparkles style={{ width: "clamp(10px, 1vw, 14px)", height: "clamp(10px, 1vw, 14px)", color: "#FFD700", animation: "pulse 2s infinite", flexShrink: 0 }} />
        </Link>
      );
    }
    if (n.label === "Services") {
      return (
        <div key={n.label} className="relative group/menu py-1">
          <button style={{ fontSize: "clamp(7px, 0.72vw, 11px)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700 }} className="text-plum-dark hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
            {n.label}
            <span style={{ fontSize: "clamp(5px, 0.5vw, 8px)" }} className="transition-transform group-hover/menu:rotate-180">▼</span>
          </button>
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-48 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto transition-all duration-200 transform scale-95 origin-top group-hover/menu:scale-100 z-50">
            <div className="bg-white rounded-xl shadow-xl border border-zinc-100 py-2.5 overflow-hidden">
              <Link to="/wedding-catering-services-in-chenna" className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold">Weddings</Link>
              <Link to="/engagement-catering-services-in-chennai" className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold">Engagements</Link>
              <Link to="/corporate-catering-services-in-chennai" className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold">Corporate Events</Link>
              <Link to="/services" className="block px-5 py-2.5 text-[10px] text-zinc-700 hover:bg-gold/10 hover:text-gold-dark transition-colors text-left uppercase tracking-wider font-semibold border-t border-zinc-100">All Services Showcase →</Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <Link
        key={n.label}
        to={n.to}
        hash={n.hash}
        style={{
          fontSize: "clamp(7px, 0.72vw, 11px)",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          fontWeight: 700,
          padding: "4px 0",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
        className="text-plum-dark hover:text-white transition-colors relative"
        activeProps={{ className: "text-white border-b-2 border-white" }}
        activeOptions={{ exact: true, includeHash: true }}
      >
        {n.label}
      </Link>
    );
  };

  /* Logo sizes — 15-20% bigger than original w-28/w-32 → w-[130px]/w-[150px] */
  const logoFullSize = "clamp(110px, 10.5vw, 150px)";
  const logoScrolledSize = "clamp(56px, 5.2vw, 72px)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md"
      style={{ overflow: "visible" }}
    >
      {/* ── Top Info Bar ── */}
      <div
        style={{
          maxHeight: scrolled ? "0px" : "80px",
          padding: scrolled ? "0" : "clamp(4px, 0.5vw, 8px) 0",
          opacity: scrolled ? 0 : 1,
          overflow: "hidden",
          transition: "all 0.3s",
          borderBottom: scrolled ? "none" : "1px solid rgba(228,225,220,0.8)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(12px, 2vw, 32px)", display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 16px)", fontSize: "clamp(7px, 0.7vw, 10px)", color: "#71717a", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MapPin style={{ width: "clamp(10px, 1vw, 14px)", height: "clamp(10px, 1vw, 14px)", color: "var(--gold-dark)", flexShrink: 0 }} />
              <span>No 49, South Bazar, Pattabiram, Chennai</span>
            </div>
            <div style={{ width: "1px", height: "12px", backgroundColor: "#e4e4e7" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Clock style={{ width: "clamp(10px, 1vw, 14px)", height: "clamp(10px, 1vw, 14px)", color: "var(--gold-dark)", flexShrink: 0 }} />
              <span>Office Hours: 8:00 AM - 9:00 PM</span>
            </div>
          </div>
          <div style={{ width: "clamp(80px, 8vw, 140px)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 16px)", fontSize: "clamp(7px, 0.7vw, 10px)", color: "#71717a", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Phone style={{ width: "clamp(10px, 1vw, 14px)", height: "clamp(10px, 1vw, 14px)", color: "var(--gold-dark)", flexShrink: 0 }} />
              <span>
                Support:{" "}
                <a href="tel:+919940396005" className="hover:text-gold-dark" style={{ fontWeight: 700, color: "#3f3f46" }}>+91 99403 96005</a>
                {" "} / {" "}
                <a href="tel:+919940832988" className="hover:text-gold-dark" style={{ fontWeight: 700, color: "#3f3f46" }}>+91 99408 32988</a>
              </span>
            </div>
            <div style={{ width: "1px", height: "12px", backgroundColor: "#e4e4e7" }} />
            <Link to="/menu" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "clamp(4px, 0.5vw, 8px) clamp(10px, 1vw, 16px)", borderRadius: "9999px", border: "1px solid var(--gold-dark)", color: "var(--gold-dark)", fontSize: "clamp(7px, 0.6vw, 9px)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Request a Quote
            </Link>
            <div style={{ position: "relative", cursor: "pointer", paddingLeft: "clamp(6px, 0.5vw, 8px)", flexShrink: 0 }}>
              <div style={{ width: "clamp(40px, 3.8vw, 56px)", height: "clamp(40px, 3.8vw, 56px)", borderRadius: "50%", backgroundColor: "rgba(255,251,235,0.8)", border: "2px solid rgba(217,119,6,0.8)", padding: "4px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src={lotusIcon} alt="Lotus" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Navbar Row ── */}
      <div style={{ position: "relative", height: "clamp(36px, 3.3vw, 48px)", userSelect: "none" }}>
        {/* SVG peach background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden", borderBottomRadius: "clamp(12px, 2.8vw, 40px)" }}>
          <svg viewBox="0 0 1000 48" preserveAspectRatio="none" style={{ width: "100%", height: "100%", color: "#e0bb9b", fill: "currentColor", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.05))" }}>
            <path d="M 0,0 L 410,0 C 455,0 455,28 500,28 C 545,28 545,0 590,0 L 1000,0 L 1000,48 L 0,48 Z" />
          </svg>
        </div>
        {/* Nav content */}
        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(12px, 2vw, 32px)", height: "100%", display: "flex", alignItems: "center", zIndex: 10 }}>
          <nav style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "clamp(8px, 1.2vw, 16px)", paddingRight: "8px" }}>
            {leftLinks.map(renderNavLink)}
          </nav>
          <div style={{ width: "clamp(130px, 14vw, 210px)", flexShrink: 0 }} />
          <nav style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "clamp(8px, 1.2vw, 16px)", paddingLeft: "8px" }}>
            {rightLinks.map(renderNavLink)}
          </nav>
        </div>
      </div>

      {/* ── Logo Overlay (absolute center) ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          transition: "all 0.3s",
          top: scrolled ? "0" : "clamp(4px, 0.8vw, 12px)",
        }}
      >
        <Link to="/" className="group block">
          <div
            style={{
              width: scrolled ? logoScrolledSize : logoFullSize,
              height: scrolled ? logoScrolledSize : logoFullSize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
            }}
          >
            <img
              src={logoImg}
              alt="My Chennai Catering"
              style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.3s" }}
              className="group-hover:scale-105"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
