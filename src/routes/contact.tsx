import { createFileRoute } from "@tanstack/react-router";
import { ScrollCutouts } from "@/components/ScrollCutouts";
import { FoodPeekEdge } from "@/components/FoodPeekEdge";
import lmClockTower from "@/assets/cutout-landmark-clock-tower.png";
import cutTiffin from "@/assets/cutout-tiffin.png";
import cutBiryani from "@/assets/cutout-biryani.png";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import { FloatingFoodDoodles, SectionDoodleDivider } from "@/components/FloatingDoodles";
import { DoodleLayer } from "@/components/DoodleLayer";
import { AnimatedFoodDoodles } from "@/components/AnimatedFoodDoodles";
import { BananaLeafDivider } from "@/components/GrainDivider";
import { FoodPeek } from "@/components/FoodPeek";
import weddingHallImg from "@/assets/IMG_4558.webp";
import feastFood2 from "@/assets/feast-food-2.png";
import spicesImg from "@/assets/spices.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Best Catering Services in Chennai | My Chennai Catering" },
      {
        name: "description",
        content:
          "Need reliable catering in Chennai for your next event? Contact My Chennai Catering today for bookings, custom menus, and inquiries. Let’s make your event memorable!",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
      },
      {
        property: "og:title",
        content: "Contact Best Catering Services in Chennai | My Chennai Catering",
      },
      {
        property: "og:description",
        content:
          "Need reliable catering in Chennai for your next event? Contact My Chennai Catering today for bookings, custom menus, and inquiries.",
      },
      { property: "og:url", content: "https://mychennaicateringservices.com/contact/" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact My Chennai Catering Services" },
      {
        name: "twitter:description",
        content: "Contact My Chennai Catering today for bookings, custom menus, and inquiries.",
      },
    ],
    links: [{ rel: "canonical", href: "https://mychennaicateringservices.com/contact/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact My Chennai Catering",
          url: "https://mychennaicateringservices.com/contact/",
          mainEntity: {
            "@type": "CateringService",
            name: "My Chennai Catering Services",
            telephone: "+919940396005",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Pattabiram",
              addressRegion: "Chennai, Tamil Nadu",
              postalCode: "600072",
              addressCountry: "IN",
            },
          },
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="relative py-12 lg:py-20 bg-cream overflow-x-hidden overflow-hidden">
        <AnimatedFoodDoodles section="contact" />
        <FoodPeekEdge
          src={lmClockTower}
          side="right"
          top="6%"
          size={330}
          peek={0.4}
          speed={0.1}
          rotate={-4}
          maxOpacity={0.5}
          behind
        />
        <DoodleLayer section="contact" />
        <FloatingFoodDoodles section="contact" />
        <div className="max-w-7xl mx-auto px-4 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 relative z-10">
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Get in touch</span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-plum mt-4 leading-[1.1]">
              Contact <em className="text-gold-gradient not-italic">My Chennai Catering</em>
            </h1>
            <p className="mt-4 text-foreground/70 text-sm leading-relaxed max-w-md">
              Speak directly with D. Venkat or his team — we typically respond within an hour during
              working hours.
            </p>

            <div className="mt-8 space-y-3">
              <ContactCard
                icon={Phone}
                label="Call us"
                value="+91 99403 96005"
                href="tel:+919940396005"
              />
              <ContactCard
                icon={MessageCircle}
                label="WhatsApp"
                value="Quick chat with our team"
                href="https://wa.me/919940396005"
              />
              <ContactCard
                icon={Mail}
                label="Email"
                value="mychennaicateringservices@gmail.com"
                href="mailto:mychennaicateringservices@gmail.com"
              />
              <ContactCard
                icon={MapPin}
                label="Visit our office"
                value="No 49, South Bazar, Thandurai, Pattabiram, Chennai 600072"
              />
            </div>

            <div className="mt-8 rounded-2xl overflow-hidden border border-plum/10 w-full aspect-[16/9]">
              <iframe
                title="MCC Catering — Pattabiram"
                src="https://www.google.com/maps?q=Pattabiram,+Chennai&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </Reveal>

          <SectionDoodleDivider variant="kolam" />
          <Reveal delay={0.1}>
            <BookingForm />
          </Reveal>
        </div>
      </section>

      <BananaLeafDivider />

      <section className="py-16 bg-gradient-to-r from-plum-dark via-[#3A1029] to-plum-dark text-white overflow-hidden relative">
        <ScrollCutouts cutouts={[
          { src: cutTiffin, side: "left", top: "10%", size: 260, rotate: -8 },
          { src: cutBiryani, side: "right", top: "50%", size: 280, rotate: 6 },
        ]} />
        <img
          src={weddingHallImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          loading="lazy"
        />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-amber-300 font-bold">
            Visit Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mt-3">
            See Our Work in Person
          </h2>
          <p className="text-cream/70 mt-3 max-w-xl mx-auto text-sm">
            Schedule a tasting session or visit our kitchen to experience the quality firsthand.
          </p>
          <div className="flex items-center justify-center gap-5 mt-8">
            <FoodPeek src={weddingHallImg} alt="Wedding setup" size={64} />
             <FoodPeek src={feastFood2} alt="Traditional menu" size={56} />
            <FoodPeek src={spicesImg} alt="Fresh spices" size={60} />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const Tag: React.ElementType = href ? "a" : "div";
  return (
    <Tag
      href={href}
      className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-plum/10 hover:border-gold transition-all group"
    >
      <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-plum-dark transition-all shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-plum/60">{label}</div>
        <div className="text-plum font-medium mt-1">{value}</div>
      </div>
    </Tag>
  );
}
