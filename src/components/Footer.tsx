import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import footerLogo from "@/assets/mcc-logo.png";
import lotusIcon from "@/assets/lotus icon.png";
import skylineSketch from "@/assets/chennai-skyline-sketch.png";
import { BananaLeaf, Dosa, Idli, Tumbler, OilLamp, CurryLeaf } from "./FoodDoodles";

const SPECIALTIES = ["Wedding", "Reception", "Corporate", "Virundhu", "Live Counter"];

function KolamCorner({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer square frame with rounded corners */}
        <rect x="20" y="20" width="160" height="160" rx="12" strokeDasharray="8 4">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="50s" repeatCount="indefinite" />
        </rect>
        {/* Inner diamond */}
        <polygon points="100,25 175,100 100,175 25,100" strokeDasharray="6 4">
          <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="40s" repeatCount="indefinite" />
        </polygon>
        {/* Interlocking petal curves — traditional kolam loops */}
        <path d="M100 30 C130 60, 140 80, 100 100 C60 80, 70 60, 100 30Z" strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M170 100 C140 130, 120 140, 100 100 C120 60, 140 70, 170 100Z" strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M100 170 C70 140, 60 120, 100 100 C140 120, 130 140, 100 170Z" strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M30 100 C60 70, 80 60, 100 100 C80 140, 60 130, 30 100Z" strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
        </path>
        {/* Corner loop details */}
        <path d="M35 35 C55 35, 55 55, 35 55 C35 35, 55 35, 55 55" strokeDasharray="3 3" opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="0" to="18" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M165 35 C145 35, 145 55, 165 55 C165 35, 145 35, 145 55" strokeDasharray="3 3" opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="0" to="18" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M35 165 C55 165, 55 145, 35 145 C35 165, 55 165, 55 145" strokeDasharray="3 3" opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="0" to="18" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M165 165 C145 165, 145 145, 165 145 C165 165, 145 165, 145 145" strokeDasharray="3 3" opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="0" to="18" dur="4s" repeatCount="indefinite" />
        </path>
        {/* Pulli dots grid */}
        {[50, 75, 100, 125, 150].map((x) =>
          [50, 75, 100, 125, 150].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill="currentColor" opacity="0.5" />
          ))
        )}
        {/* Center highlight */}
        <circle cx="100" cy="100" r="3" fill="currentColor" opacity="0.8" />
      </g>
    </svg>
  );
}

function BananaLeafBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute -left-16 top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.07]" viewBox="0 0 200 200" fill="none">
        <path d="M30 180 C30 180 40 40 160 20 C160 20 80 50 50 140 Z" fill="#39FF14" stroke="#39FF14" strokeWidth="0.5" />
        <path d="M90 20 C90 20 85 100 50 140" stroke="#2BCC0F" strokeWidth="0.8" opacity="0.6" />
        <path d="M90 20 C90 20 100 80 50 140" stroke="#2BCC0F" strokeWidth="0.5" opacity="0.4" />
        <path d="M90 20 C90 20 110 60 50 140" stroke="#2BCC0F" strokeWidth="0.4" opacity="0.3" />
      </svg>
      <svg className="absolute -right-10 top-1/3 w-56 h-56 opacity-[0.06] rotate-[30deg]" viewBox="0 0 200 200" fill="none">
        <path d="M170 180 C170 180 160 40 40 20 C40 20 120 50 150 140 Z" fill="#39FF14" stroke="#39FF14" strokeWidth="0.5" />
        <path d="M110 20 C110 20 115 100 150 140" stroke="#2BCC0F" strokeWidth="0.8" opacity="0.6" />
      </svg>
      <svg className="absolute left-1/2 -bottom-8 -translate-x-1/2 w-80 h-32 opacity-[0.05]" viewBox="0 0 300 100" fill="none">
        <path d="M10 90 C10 90 30 10 150 5 C150 5 60 30 10 90 Z" fill="#39FF14" stroke="#39FF14" strokeWidth="0.5" />
        <path d="M290 90 C290 90 270 10 150 5 C150 5 240 30 290 90 Z" fill="#39FF14" stroke="#39FF14" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full font-sans relative z-10 pb-[72px] lg:pb-0">

      {/* ── SKYLINE (immediately above CTA) ── */}
      <div className="relative w-full h-[150px] lg:h-[200px] overflow-hidden bg-[#FAF7F0]" aria-hidden="true">
        <img
          src={skylineSketch}
          alt=""
          className="block w-full h-full object-cover object-bottom"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 pointer-events-none skyline-fade" />
      </div>

      {/* ── CTA BANNER (unified mobile + desktop) ── */}
      <section className="relative overflow-hidden">
        {/* Deep purple background with geometric overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A163F] via-[#3D1A53] to-[#1E0F2E]" />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(200,149,30,0.3) 20px, rgba(200,149,30,0.3) 21px), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(200,149,30,0.3) 20px, rgba(200,149,30,0.3) 21px)`,
        }} />

        {/* Neon green banana leaf decorations */}
        <BananaLeafBg />

        {/* Kolam corner — top right */}
        <KolamCorner className="absolute -top-10 -right-10 w-56 h-56 text-teal-300 pointer-events-none opacity-70 lg:w-72 lg:h-72 lg:-top-12 lg:-right-12 lg:opacity-80" />
        {/* Kolam corner — bottom left (desktop only) */}
        <KolamCorner className="hidden lg:block absolute -bottom-14 -left-14 w-64 h-64 text-teal-400/50 pointer-events-none opacity-60" />

        {/* Mobile layout */}
        <div className="lg:hidden relative z-10 pt-14 pb-24 px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-500/15 border border-teal-400/30 mb-5">
            <span className="text-teal-300 text-xs">✨</span>
            <span className="text-teal-300 text-[10px] font-bold uppercase tracking-[0.2em]">Leaves of Life Tradition</span>
          </div>
          <div className="mx-auto mb-4 w-14 h-14 rounded-full border-2 border-teal-400/40 flex items-center justify-center">
            <svg className="w-7 h-7 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c-4-4-8-7.5-8-12a8 8 0 0116 0c0 4.5-4 8-8 12z" />
              <path d="M12 12V6" />
              <path d="M9 9l3-3 3 3" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
            Planning a Royal Grand Feast?
          </h2>
          <p className="text-white/60 mt-3 max-w-md mx-auto text-sm">
            Experience authentic grand feasts served with love on fresh banana leaves.
          </p>
          <a
            href="tel:+919940396005"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-white/10 border border-amber-300/30 text-white hover:bg-white/20 transition-all"
          >
            <Phone className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-semibold">+91 99403 96005</span>
          </a>
        </div>

        {/* Desktop layout — horizontal bar */}
        <div className="hidden lg:block relative z-10" style={{ padding: "clamp(20px, 2.5vw, 32px) clamp(16px, 3vw, 48px)" }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full border-2 border-teal-400/40 flex items-center justify-center shrink-0">
                <svg className="w-5.5 h-5.5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c-4-4-8-7.5-8-12a8 8 0 0116 0c0 4.5-4 8-8 12z" />
                  <path d="M12 12V6" />
                  <path d="M9 9l3-3 3 3" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-white" style={{ fontSize: "clamp(16px, 2vw, 28px)" }}>
                Planning a Royal Grand Feast?
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+919940396005" className="flex items-center gap-2 font-semibold text-white hover:text-amber-300 transition-colors py-2 px-4 rounded-full bg-white/10 border border-amber-300/30" style={{ fontSize: "clamp(10px, 1vw, 14px)" }}>
                <Phone className="w-4 h-4 text-amber-300" />
                <span>+91 99403 96005</span>
              </a>
              <Link to="/menu" className="inline-flex items-center px-6 py-3 font-bold tracking-wider uppercase text-emerald-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 rounded-full shadow-[0_4px_25px_rgba(245,158,11,0.5)] transition-all duration-300" style={{ fontSize: "clamp(10px, 1vw, 14px)" }}>
                EXPLORE FEAST MENUS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE FOOTER ── */}
      <div className="lg:hidden bg-[#FFF8EE] relative overflow-hidden">
        {/* Kolam — top right */}
        <svg className="absolute -top-6 -right-6 w-36 h-36 text-[#C8951E] pointer-events-none opacity-[0.09]" viewBox="0 0 200 200" fill="none">
          <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="20" y="20" width="160" height="160" rx="12" strokeDasharray="8 4">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="50s" repeatCount="indefinite" />
            </rect>
            <polygon points="100,25 175,100 100,175 25,100" strokeDasharray="6 4">
              <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="40s" repeatCount="indefinite" />
            </polygon>
            <path d="M100 30 C130 60, 140 80, 100 100 C60 80, 70 60, 100 30Z" strokeDasharray="4 3">
              <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M170 100 C140 130, 120 140, 100 100 C120 60, 140 70, 170 100Z" strokeDasharray="4 3">
              <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M100 170 C70 140, 60 120, 100 100 C140 120, 130 140, 100 170Z" strokeDasharray="4 3">
              <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M30 100 C60 70, 80 60, 100 100 C80 140, 60 130, 30 100Z" strokeDasharray="4 3">
              <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
            </path>
            {[50, 75, 100, 125, 150].map((x) =>
              [50, 75, 100, 125, 150].map((y) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="currentColor" opacity="0.5" />
              ))
            )}
            <circle cx="100" cy="100" r="2.5" fill="currentColor" opacity="0.7" />
          </g>
        </svg>
        {/* Kolam — bottom left */}
        <svg className="absolute -bottom-8 -left-8 w-40 h-40 text-[#C8951E] pointer-events-none opacity-[0.07]" viewBox="0 0 200 200" fill="none">
          <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <circle cx="100" cy="100" r="80" strokeDasharray="6 4">
              <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="35s" repeatCount="indefinite" />
            </circle>
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <ellipse key={a} cx="100" cy="100" rx="35" ry="10" transform={`rotate(${a} 100 100)`} strokeDasharray="3 3">
                <animateTransform attributeName="transform" type="rotate" from={`${a} 100 100`} to={`${a + 360} 100 100`} dur="25s" repeatCount="indefinite" />
              </ellipse>
            ))}
            <circle cx="100" cy="100" r="2" fill="currentColor" opacity="0.6" />
          </g>
        </svg>
        {/* Food doodles */}
        <div className="absolute top-16 left-3 text-amber-800 opacity-[0.07] pointer-events-none"><BananaLeaf size={60} /></div>
        <div className="absolute bottom-24 right-4 text-amber-800 opacity-[0.07] pointer-events-none"><Dosa size={48} /></div>
        <div className="absolute top-1/2 left-1 text-amber-800 opacity-[0.05] pointer-events-none"><Idli size={40} /></div>
        <div className="absolute bottom-40 left-4 text-amber-800 opacity-[0.06] pointer-events-none"><Tumbler size={36} /></div>
        <div className="absolute top-32 right-2 text-amber-800 opacity-[0.05] pointer-events-none"><OilLamp size={32} /></div>
        <div className="absolute bottom-16 right-8 text-amber-800 opacity-[0.06] pointer-events-none"><CurryLeaf size={38} /></div>

        <div className="px-6 py-12 space-y-10 relative z-10">

          {/* Logo + Brand Story */}
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-300 p-1 flex items-center justify-center shrink-0">
                <img src={lotusIcon} alt="Lotus" className="w-full h-full object-contain" />
              </div>
              <div className="w-24 h-24 rounded-full overflow-hidden shrink-0">
                <img src={footerLogo} alt="My Chennai Catering" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[#541539] text-sm font-semibold italic">
                Thank you for choosing My Chennai Catering.
              </p>
              <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
                "Every meal is served with tradition, love & hospitality."
              </p>
            </div>
          </div>

          <div className="w-12 h-px bg-amber-300/60 mx-auto" />

          {/* Contact Info */}
          <div className="space-y-3">
            <a href="tel:+919940396005" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#541539] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-gold" />
              </div>
              <div>
                <span className="text-[#3A1029] font-bold text-sm block">Proprietor: 99403 96005, 95516 39651</span>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">Call Us</span>
              </div>
            </a>
            <a href="tel:+919600034612" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#541539] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-gold" />
              </div>
              <div>
                <span className="text-[#3A1029] font-bold text-sm block">Manager: 9600034612</span>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">Call Us</span>
              </div>
            </a>
            <a href="tel:+919840608236" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#541539] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-gold" />
              </div>
              <div>
                <span className="text-[#3A1029] font-bold text-sm block">Office: 9840608236</span>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">Call Us</span>
              </div>
            </a>
            <a href="tel:+9104426850005" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#541539] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-gold" />
              </div>
              <div>
                <span className="text-[#3A1029] font-bold text-sm block">Landline: 044-26850005</span>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">Call Us</span>
              </div>
            </a>
            <a href="mailto:mychennaicateringservices@gmail.com" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#541539] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-gold" />
              </div>
              <div className="min-w-0">
                <span className="text-[#3A1029] font-bold text-xs sm:text-sm block truncate">mychennaicateringservices@gmail.com</span>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">Email Us</span>
              </div>
            </a>
            <a href="https://maps.google.com/?q=No+49,+South+Bazaar,+Thandurai,+Pattabiram,+Chennai+600072" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#541539] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-gold" />
              </div>
              <div>
                <span className="text-[#3A1029] font-bold text-xs sm:text-sm block">No 49, South Bazaar, Thandurai, Pattabiram, Chennai – 600 072</span>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">Get Directions</span>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#541539] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-gold" />
              </div>
              <div>
                <span className="text-[#3A1029] font-bold text-sm block">8 AM – 9 PM</span>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">Open Daily</span>
              </div>
            </div>
          </div>

          <div className="w-12 h-px bg-amber-300/60 mx-auto" />

          {/* Popular Services Chips */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#541539] uppercase tracking-[0.2em]">Popular Services</span>
            <div className="flex flex-wrap justify-center gap-2">
              {SPECIALTIES.map((s) => (
                <span
                  key={s}
                  className="px-4 py-1.5 bg-white border border-amber-900/15 rounded-full text-[10px] font-bold text-[#541539] uppercase tracking-wider"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="w-12 h-px bg-amber-300/60 mx-auto" />

          {/* Social Icons */}
          <div className="flex justify-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full bg-[#541539] text-gold flex items-center justify-center active:scale-90 transition-all">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="https://www.instagram.com/mychennaicateringservices?igsh=MTlwcWQzNGhyOWc0ZQ==" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full bg-[#541539] text-gold flex items-center justify-center active:scale-90 transition-all">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://wa.me/919940396005" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-11 h-11 rounded-full bg-[#541539] text-gold flex items-center justify-center active:scale-90 transition-all">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.953-2.005-.001-3.973-.502-5.724-1.457L0 24zM6.647 19.154c1.6.95 3.188 1.449 4.825 1.449 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.99C16.555 1.875 14.09.845 11.453.845 6.015.845 1.592 5.26 1.59 10.7c0 1.93.507 3.806 1.467 5.426L2.08 19.7l3.68-.964z" /></svg>
            </a>
            <a href="https://www.youtube.com/@mychennaicatering" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-11 h-11 rounded-full bg-[#541539] text-gold flex items-center justify-center active:scale-90 transition-all">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="bg-[#541539] py-4 px-6">
          <div className="text-center space-y-2">
            <span className="text-cream/70 text-[10px] block">
              © {currentYear} My Chennai Catering Services
            </span>
            <div className="flex items-center justify-center gap-4">
              <Link to="/about" className="text-cream/50 text-[10px] hover:text-gold transition-colors">Privacy Policy</Link>
              <span className="text-cream/30">|</span>
              <Link to="/about" className="text-cream/50 text-[10px] hover:text-gold transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP FOOTER ── */}
      <div className="hidden lg:block">
        {/* Desktop Main Body */}
        <div className="bg-[#FAF7F0] relative overflow-hidden" style={{ padding: "clamp(32px, 4vw, 64px) clamp(16px, 3vw, 48px)" }}>
          {/* Kolam — top right */}
          <svg className="absolute -top-8 -right-8 w-64 h-64 text-[#C8951E] pointer-events-none opacity-[0.08]" viewBox="0 0 200 200" fill="none">
            <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="20" y="20" width="160" height="160" rx="12" strokeDasharray="8 4">
                <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="50s" repeatCount="indefinite" />
              </rect>
              <polygon points="100,25 175,100 100,175 25,100" strokeDasharray="6 4">
                <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="40s" repeatCount="indefinite" />
              </polygon>
              <path d="M100 30 C130 60, 140 80, 100 100 C60 80, 70 60, 100 30Z" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M170 100 C140 130, 120 140, 100 100 C120 60, 140 70, 170 100Z" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M100 170 C70 140, 60 120, 100 100 C140 120, 130 140, 100 170Z" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M30 100 C60 70, 80 60, 100 100 C80 140, 60 130, 30 100Z" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" from="0" to="28" dur="3s" repeatCount="indefinite" />
              </path>
              {[50, 75, 100, 125, 150].map((x) =>
                [50, 75, 100, 125, 150].map((y) => (
                  <circle key={`m-${x}-${y}`} cx={x} cy={y} r="1.8" fill="currentColor" opacity="0.5" />
                ))
              )}
              <circle cx="100" cy="100" r="3" fill="currentColor" opacity="0.7" />
            </g>
          </svg>
          {/* Kolam — bottom left */}
          <svg className="absolute -bottom-10 -left-10 w-56 h-56 text-[#C8951E] pointer-events-none opacity-[0.06]" viewBox="0 0 200 200" fill="none">
            <g stroke="currentColor" strokeWidth="1">
              <circle cx="100" cy="100" r="80" strokeDasharray="6 4">
                <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="35s" repeatCount="indefinite" />
              </circle>
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <ellipse key={a} cx="100" cy="100" rx="35" ry="10" transform={`rotate(${a} 100 100)`} strokeDasharray="3 3">
                  <animateTransform attributeName="transform" type="rotate" from={`${a} 100 100`} to={`${a + 360} 100 100`} dur="25s" repeatCount="indefinite" />
                </ellipse>
              ))}
              <circle cx="100" cy="100" r="2.5" fill="currentColor" opacity="0.6" />
            </g>
          </svg>
          {/* Food doodles */}
          <div className="absolute top-12 left-4 text-amber-800 opacity-[0.06] pointer-events-none"><BananaLeaf size={90} /></div>
          <div className="absolute bottom-8 right-6 text-amber-800 opacity-[0.06] pointer-events-none"><Dosa size={70} /></div>
          <div className="absolute top-1/3 right-3 text-amber-800 opacity-[0.05] pointer-events-none"><Idli size={55} /></div>
          <div className="absolute bottom-16 left-8 text-amber-800 opacity-[0.05] pointer-events-none"><Tumbler size={50} /></div>
          <div className="absolute top-8 right-1/3 text-amber-800 opacity-[0.04] pointer-events-none"><OilLamp size={45} /></div>
          <div className="absolute bottom-4 right-1/3 text-amber-800 opacity-[0.05] pointer-events-none"><CurryLeaf size={48} /></div>

          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={footerLogo} alt="My Chennai Catering" className="w-16 h-16 object-contain" />
                <img src={lotusIcon} alt="Lotus" className="w-8 h-8 object-contain" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                Crafting royal South Indian banana-leaf feasts with authentic flavors & traditional hospitality.
              </p>
            </div>
            <div>
              <h4 className="text-[#541539] font-bold text-xs uppercase tracking-widest mb-4">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES.map((s) => (
                  <span key={s} className="px-3 py-1 bg-white border border-amber-900/15 rounded-full text-xs font-bold text-[#541539]">{s}</span>
                ))}
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <h4 className="text-[#541539] font-bold text-xs uppercase tracking-widest mb-4">Contact</h4>
              <a href="tel:+919940396005" className="flex items-center gap-2 text-slate-700 hover:text-[#541539]"><Phone className="w-4 h-4 text-[#541539]" />Proprietor: 99403 96005, 95516 39651</a>
              <a href="tel:+919600034612" className="flex items-center gap-2 text-slate-700 hover:text-[#541539]"><Phone className="w-4 h-4 text-[#541539]" />Manager: 9600034612</a>
              <a href="tel:+919840608236" className="flex items-center gap-2 text-slate-700 hover:text-[#541539]"><Phone className="w-4 h-4 text-[#541539]" />Office: 9840608236</a>
              <a href="tel:+9104426850005" className="flex items-center gap-2 text-slate-700 hover:text-[#541539]"><Phone className="w-4 h-4 text-[#541539]" />Landline: 044-26850005</a>
              <a href="mailto:mychennaicateringservices@gmail.com" className="flex items-center gap-2 text-slate-700 hover:text-[#541539]"><Mail className="w-4 h-4 text-[#541539]" />Email Us</a>
              <div className="flex items-center gap-2 text-slate-700"><MapPin className="w-4 h-4 text-[#541539]" />No 49, South Bazaar, Thandurai, Pattabiram, Chennai – 600 072</div>
              <div className="flex items-center gap-2 text-slate-700"><Clock className="w-4 h-4 text-[#541539]" />8 AM – 9 PM Daily</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP BOTTOM BAR ── */}
      <div className="bg-[#541539] py-4 px-6 hidden lg:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-cream/70 text-xs">© {currentYear} My Chennai Catering Services. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-cream/50 text-xs hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/about" className="text-cream/50 text-xs hover:text-gold transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
