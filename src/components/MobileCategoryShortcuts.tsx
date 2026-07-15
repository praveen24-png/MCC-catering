import { Link } from "@tanstack/react-router";

import weddingImg from "@/assets/IMG_4558.webp";
import engagementImg from "@/assets/ai-wedding-feast.png";
import corporateImg from "@/assets/corporate-catering.jpg";
import feastImg from "@/assets/2_20260624_020643_0001.png";
import galleryImg from "@/assets/banana-leaf-feast-blended.png";

const CATEGORIES = [
  { label: "Weddings", emoji: "💒", img: weddingImg, to: "/wedding-catering-services-in-chennai" },
  { label: "Engagements", emoji: "💍", img: engagementImg, to: "/engagement-catering-services-in-chennai" },
  { label: "Corporate", emoji: "🏢", img: corporateImg, to: "/corporate-catering-services-in-chennai" },
  { label: "Feast Menus", emoji: "🍃", img: feastImg, to: "/menu" },
  { label: "Gallery", emoji: "🖼️", img: galleryImg, to: "/gallery" },
] as const;

export default function MobileCategoryShortcuts() {
  return (
    <section className="lg:hidden bg-[#FFFDF8] py-5 px-2 border-b border-amber-900/5">
      <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory px-1">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.label}
            to={cat.to}
            className="snap-start shrink-0 w-[19%] min-w-[68px] flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-300 shadow-sm">
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-white border border-amber-200 shadow flex items-center justify-center text-[13px] leading-none">
                {cat.emoji}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#541539] text-center leading-tight">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
