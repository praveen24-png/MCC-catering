import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Home, UtensilsCrossed, Image as ImageIcon, PhoneCall } from "lucide-react";
import footerLogo from "@/assets/mcc-logo.png";
import lotusIcon from "@/assets/lotus icon.png";

const QUICK_LINKS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Services", path: "/services", icon: UtensilsCrossed },
  { label: "Gallery", path: "/gallery", icon: ImageIcon },
  { label: "Contact", path: "/contact", icon: PhoneCall },
];

const SPECIALTIES = ["Wedding", "Reception", "Corporate", "Virundhu", "Live Counter"];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full font-sans relative z-10">

      {/* ── CTA BANNER ── */}
      <section className="bg-gradient-to-br from-[#541539] to-[#3A1029] py-14 px-6 text-center">
        <span className="text-gold text-xs uppercase tracking-[0.25em] font-bold block">
          Ready to Plan Your Feast?
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-cream font-bold mt-3">
          Book Your Event Today
        </h2>
        <Link
          to="/"
          hash="book"
          className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 bg-gold text-plum-dark text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg active:scale-95 transition-all"
        >
          Request Quote
        </Link>
      </section>

      {/* ── MOBILE FOOTER ── */}
      <div className="lg:hidden bg-[#FFF8EE]">
        <div className="px-6 py-12 space-y-10">

          {/* Logo + Brand Story */}
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-300 p-1 flex items-center justify-center shrink-0">
                <img src={lotusIcon} alt="Lotus" className="w-full h-full object-contain" />
              </div>
              <div className="w-24 h-24 rounded-full bg-white shadow-lg border-2 border-amber-400 p-1.5 flex items-center justify-center">
                <img src={footerLogo} alt="My Chennai Catering" className="w-full h-full object-contain rounded-full" />
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
          <div className="space-y-4">
            <a href="tel:+919940396005" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#541539] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-gold" />
              </div>
              <div>
                <span className="text-[#3A1029] font-bold text-sm block">+91 99403 96005</span>
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
            <a href="https://maps.google.com/?q=No+49,+South+Bazar,+Pattabiram,+Chennai+600072" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#541539] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-gold" />
              </div>
              <div>
                <span className="text-[#3A1029] font-bold text-xs sm:text-sm block">Pattabiram, Chennai</span>
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

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map(({ label, path, icon: Icon }) => (
              <Link
                key={label}
                to={path}
                className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-amber-900/10 shadow-sm active:scale-[0.98] transition-all"
              >
                <Icon className="w-4 h-4 text-[#541539] shrink-0" />
                <span className="text-xs font-bold text-[#3A1029] uppercase tracking-wider">{label}</span>
              </Link>
            ))}
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
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full bg-[#541539] text-gold flex items-center justify-center active:scale-90 transition-all">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://wa.me/919940396005" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-11 h-11 rounded-full bg-[#541539] text-gold flex items-center justify-center active:scale-90 transition-all">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.953-2.005-.001-3.973-.502-5.724-1.457L0 24zM6.647 19.154c1.6.95 3.188 1.449 4.825 1.449 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.99C16.555 1.875 14.09.845 11.453.845 6.015.845 1.592 5.26 1.59 10.7c0 1.93.507 3.806 1.467 5.426L2.08 19.7l3.68-.964z" /></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-11 h-11 rounded-full bg-[#541539] text-gold flex items-center justify-center active:scale-90 transition-all">
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

      {/* ── DESKTOP FOOTER (unchanged) ── */}
      <div className="hidden lg:block">
        {/* Desktop Leaves of Life Banner */}
        <div className="relative bg-gradient-to-r from-[#2A163F] via-[#3D1A53] to-[#251238] text-white overflow-hidden border-b-2 border-amber-400/40 shadow-xl" style={{ padding: "clamp(20px, 2.5vw, 32px) clamp(16px, 3vw, 48px)" }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
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

        {/* Desktop Main Body */}
        <div className="bg-[#FAF7F0]" style={{ padding: "clamp(32px, 4vw, 64px) clamp(16px, 3vw, 48px)" }}>
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
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
              <h4 className="text-[#541539] font-bold text-xs uppercase tracking-widest mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                {QUICK_LINKS.map(({ label, path }) => (
                  <li key={label}>
                    <Link to={path} className="text-slate-700 hover:text-[#541539] transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
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
              <a href="tel:+919940396005" className="flex items-center gap-2 text-slate-700 hover:text-[#541539]"><Phone className="w-4 h-4 text-[#541539]" />+91 99403 96005</a>
              <a href="mailto:mychennaicateringservices@gmail.com" className="flex items-center gap-2 text-slate-700 hover:text-[#541539]"><Mail className="w-4 h-4 text-[#541539]" />Email Us</a>
              <div className="flex items-center gap-2 text-slate-700"><MapPin className="w-4 h-4 text-[#541539]" />Pattabiram, Chennai</div>
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
