import { useState, useEffect, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import { X } from "lucide-react";
import { publicAPI } from "@/services/api";

const OCCASIONS = [
  "Wedding",
  "Reception",
  "Corporate Event",
  "Birthday",
  "Seemantham",
  "Griha Pravesham",
  "Puberty Ceremony",
  "Engagement",
  "Other",
];

const DESKTOP_VARIANTS = {
  hidden: { opacity: 0, y: 30, scale: 0.92, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 22, stiffness: 260, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.92,
    filter: "blur(6px)",
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

const MOBILE_VARIANTS = {
  hidden: { opacity: 0, y: 60, scale: 0.9, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 24, stiffness: 280, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.9,
    filter: "blur(6px)",
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

const INNER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.12 },
  },
};

const FIELD_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 300 },
  },
};

export default function EnquiryPopup() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [occasion, setOccasion] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isHome) {
      const timer = setTimeout(() => setOpen(true), 1800);
      return () => clearTimeout(timer);
    } else {
      setOpen(false);
    }
  }, [isHome]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim()) {
      setError("Please fill in your name and phone number.");
      return;
    }

    setSubmitting(true);

    /* ── 1. Save to CRM database ── */
    try {
      await publicAPI.submitEnquiry({
        name,
        phone,
        event_type: occasion || undefined,
        event_date: date || new Date().toISOString().split("T")[0],
        guests: guests ? Number(guests) : undefined,
        special_requests: occasion ? `Occasion: ${occasion}` : undefined,
      });
    } catch {
      console.warn("CRM save failed, continuing with email submission");
    }

    /* ── 2. Send email notification ── */
    try {
      await fetch(
        "https://formsubmit.co/ajax/mychennaicateringservices@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `Quick Enquiry: ${occasion || "Event"} — ${name}`,
            name,
            phone,
            eventDate: date,
            guests,
            occasion,
            _replyto: "mychennaicateringservices@gmail.com",
          }),
        },
      );
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setDate("");
    setGuests("");
    setOccasion("");
  };

  return (
    <AnimatePresence mode="wait">
      {isHome && open && (
        <>
          {/* ── DESKTOP: bottom-right corner card ── */}
          <motion.div
            key="enquiry-desktop"
            variants={DESKTOP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden lg:block fixed bottom-6 right-6 z-50 w-[300px]"
          >
            <CardInner
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              date={date}
              setDate={setDate}
              guests={guests}
              setGuests={setGuests}
              occasion={occasion}
              setOccasion={setOccasion}
              error={error}
              submitting={submitting}
              submitted={submitted}
              onSubmit={submit}
              onReset={reset}
              onClose={() => setOpen(false)}
            />
          </motion.div>

          {/* ── MOBILE: bottom-right corner card ── */}
          <motion.div
            key="enquiry-mobile"
            variants={MOBILE_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden fixed bottom-[68px] right-3 z-50 w-[280px]"
          >
            <CardInner
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              date={date}
              setDate={setDate}
              guests={guests}
              setGuests={setGuests}
              occasion={occasion}
              setOccasion={setOccasion}
              error={error}
              submitting={submitting}
              submitted={submitted}
              onSubmit={submit}
              onReset={reset}
              onClose={() => setOpen(false)}
              mobile
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Shared card ── */

type CardProps = {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  guests: string;
  setGuests: (v: string) => void;
  occasion: string;
  setOccasion: (v: string) => void;
  error: string | null;
  submitting: boolean;
  submitted: boolean;
  onSubmit: (e: FormEvent) => void;
  onReset: () => void;
  onClose: () => void;
  mobile?: boolean;
};

function CardInner({
  name,
  setName,
  phone,
  setPhone,
  date,
  setDate,
  guests,
  setGuests,
  occasion,
  setOccasion,
  error,
  submitting,
  submitted,
  onSubmit,
  onReset,
  onClose,
  mobile,
}: CardProps) {
  const inputClass =
    "w-full px-2.5 py-1.5 rounded-lg border border-[#541539]/15 bg-white focus:border-[#C6A04A] focus:outline-none text-xs text-[#3A1029] placeholder:text-[#3A1029]/35 transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(198,160,74,0.12)]";
  const labelClass =
    "block text-[9px] uppercase tracking-[0.18em] text-[#541539]/60 mb-0.5 font-medium";

  return (
    <motion.div
      variants={INNER_VARIANTS}
      initial="hidden"
      animate="visible"
      className="bg-[#FBF7EF] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-[#C6A04A]/20 relative"
      style={{ borderTop: "2px solid #C6A04A" }}
    >
      {/* Close */}
      <motion.button
        onClick={onClose}
        aria-label="Close enquiry form"
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#541539]/10 flex items-center justify-center text-[#541539]/60 hover:bg-[#541539]/20 hover:text-[#541539] transition-colors z-10"
      >
        <X className="w-3 h-3" />
      </motion.button>

      <div className={mobile ? "p-3 pt-4" : "p-4 pt-4"}>
        {/* Eyebrow */}
        <motion.p
          variants={FIELD_VARIANTS}
          className="text-center text-[8px] font-bold uppercase tracking-[0.25em] text-[#C6A04A] mb-1"
        >
          My Chennai Catering
        </motion.p>

        {/* Headline */}
        <motion.h3
          variants={FIELD_VARIANTS}
          className="text-center text-[#541539] font-bold mb-0.5"
          style={{
            fontFamily: '"Playfair Display", ui-serif, Georgia, serif',
            fontSize: mobile ? "1rem" : "1.05rem",
          }}
        >
          Planning a celebration?
        </motion.h3>

        {/* Diamond divider */}
        <motion.div
          variants={FIELD_VARIANTS}
          className="flex items-center justify-center gap-1.5 my-1.5"
        >
          <motion.span
            className="h-px bg-[#C6A04A]/40"
            initial={{ width: 0 }}
            animate={{ width: 20 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A04A]" />
          <motion.span
            className="h-px bg-[#C6A04A]/40"
            initial={{ width: 0 }}
            animate={{ width: 20 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>

        <motion.p
          variants={FIELD_VARIANTS}
          className="text-center text-[#541539]/60 text-[10px] leading-relaxed mb-3"
        >
          Tell us about your event and we'll send a custom quote within a day.
        </motion.p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", damping: 20, stiffness: 260 }}
              className="text-center py-3 space-y-2"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                  delay: 0.1,
                }}
                className="w-8 h-8 rounded-full bg-[#1E4620]/10 mx-auto flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-[#1E4620]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <p className="text-[#541539] font-semibold text-xs">Thank you!</p>
              <p className="text-[#541539]/60 text-[10px]">
                We'll get back to you with a custom quote soon.
              </p>
              <button
                onClick={onReset}
                className="text-[9px] text-[#C6A04A] font-semibold underline underline-offset-2 hover:text-[#541539] transition-colors"
              >
                Submit another enquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            >
              <motion.div variants={FIELD_VARIANTS}>
                <label className={labelClass}>Your name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className={inputClass}
                />
              </motion.div>

              <motion.div variants={FIELD_VARIANTS}>
                <label className={labelClass}>Phone (WhatsApp)</label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91"
                  className={inputClass}
                />
              </motion.div>

              <motion.div variants={FIELD_VARIANTS} className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Event date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Guests</label>
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    min={1}
                    placeholder="e.g. 200"
                    className={inputClass}
                  />
                </div>
              </motion.div>

              <motion.div variants={FIELD_VARIANTS}>
                <label className={labelClass}>Occasion</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select occasion</option>
                  {OCCASIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-red-600 text-[10px] bg-red-50 border border-red-200 rounded-lg px-3 py-1.5"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.div variants={FIELD_VARIANTS}>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2 rounded-xl bg-[#541539] text-[#FAF6F0] text-xs font-semibold hover:bg-[#3A1029] transition-colors disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Get my quote"}
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.p
          variants={FIELD_VARIANTS}
          className="text-center text-[#541539]/40 text-[8px] mt-2 tracking-wide"
        >
          20+ years · Pure vegetarian · Across Chennai
        </motion.p>
      </div>
    </motion.div>
  );
}
