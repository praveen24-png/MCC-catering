import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, Utensils, X } from "lucide-react";

type Msg = { sender: "bot" | "user"; text: string };

const QUICK = [
  { text: "Show Brahmin Menu", tag: "menu" },
  { text: "Minimum guest count?", tag: "guests" },
  { text: "Wedding decoration?", tag: "decor" },
  { text: "Service corridors?", tag: "location" },
];

function reply(text: string) {
  const t = text.toLowerCase();
  if (/menu|brahmin|veg|sattvik/.test(t))
    return "We offer Tiffin (₹250+), Moderate Veg Dinner (₹450+), and Executive Dinner (₹650+). All prepared strictly under pure vegetarian / Sattvik traditional guidelines.";
  if (/guest|minimum|count/.test(t))
    return "We cater functions starting from 50 guests up to grand weddings of 2000+ guests.";
  if (/decor|rose|flower|hall/.test(t))
    return "Yes! We specialize in chandelier-lit dining hall setups, heart-shaped rose petal decors for couples, and Rajasthani puppet-styled dessert counter themes.";
  if (/location|corridor|where|area/.test(t))
    return "Our office is in Pattabiram. We serve Avadi, Ambattur, Poonamallee, Thiruverkadu, Mogappair, Porur and all Western Chennai areas.";
  return "I'd love to help — please call MCC at +91 99403 96005 for custom menu cards & event proposals.";
}

export default function CateringChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      sender: "bot",
      text: "Vanakkam! I am the MCC Catering assistant. How can I help you plan your event menu today?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((p) => [...p, { sender: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((p) => [...p, { sender: "bot", text: reply(text) }]);
    }, 600);
  };

  return (
    <div className="fixed right-4 bottom-[72px] lg:bottom-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[88vw] max-w-sm rounded-3xl border border-gold/30 shadow-glow-plum flex flex-col chatbot-panel"
          >
            <div className="bg-plum-dark text-cream px-4 py-3 flex items-center gap-3 border-b border-gold/20 rounded-t-3xl shrink-0">
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                <Utensils className="w-4 h-4 text-gold" />
              </div>
              <div className="flex-1">
                <div className="font-serif text-sm text-gold">MCC Catering Assistant</div>
                <div className="text-[10px] text-cream/60 uppercase tracking-widest">
                  Online · 20+ years legacy
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-cream/70 hover:text-gold">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-cream min-h-0">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-plum text-cream rounded-br-md"
                        : "bg-white text-plum border border-plum/10 rounded-bl-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-cream shrink-0">
              {QUICK.map((q) => (
                <button
                  key={q.tag}
                  onClick={() => send(q.text)}
                  className="px-3 py-1.5 bg-plum/5 text-[10px] font-semibold text-plum hover:bg-gold hover:text-plum-dark rounded-full border border-plum/10 transition-all uppercase tracking-wider"
                >
                  {q.text}
                </button>
              ))}
            </div>

            <div className="p-3 border-t border-plum/10 flex gap-2 bg-white rounded-b-3xl shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Ask about menu, decor, dates…"
                autoComplete="off"
                className="flex-1 px-3 py-2 bg-cream border border-plum/15 rounded-xl text-xs focus:outline-none focus:border-gold"
              />
              <button
                onClick={() => send(input)}
                className="p-2.5 bg-plum hover:bg-plum-dark text-cream rounded-xl shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat assistant"
        className="w-14 h-14 bg-gold text-plum-dark rounded-full flex items-center justify-center shadow-xl border-2 border-cream hover:bg-gold-light transition-all"
      >
        {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      <style>{`
        .chatbot-panel {
          height: min(520px, calc(100vh - 180px));
          max-height: calc(100dvh - 180px);
        }
        @media (max-width: 767px) {
          .chatbot-panel {
            height: min(480px, calc(100dvh - 160px));
            max-height: calc(100dvh - 160px);
            width: 88vw;
          }
        }
      `}</style>
    </div>
  );
}
