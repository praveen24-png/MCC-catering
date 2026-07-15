import { useEffect, useRef } from "react";

type Clip = {
  id: string;
  start: number;
  end: number;
  label: string;
  portrait?: boolean;
};

const CLIPS: Clip[] = [
  { id: "F7EWobVE_2k", start: 0,   end: 42,  label: "Testimonial 1", portrait: true },
  { id: "F7EWobVE_2k", start: 42,  end: 107, label: "Testimonial 2", portrait: true },
  { id: "F7EWobVE_2k", start: 108, end: 118, label: "Testimonial 3", portrait: true },
  { id: "DqWyxwCvXds", start: 111, end: 140, label: "Testimonial 4" },
  { id: "DqWyxwCvXds", start: 148, end: 192, label: "Testimonial 5" },
  { id: "DqWyxwCvXds", start: 192, end: 199, label: "Testimonial 6" },
  { id: "DqWyxwCvXds", start: 199, end: 210, label: "Testimonial 7" },
];

function VideoCard({ clip, index }: { clip: Clip; index: number }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;
    let timer: number;

    const poll = () => {
      if (cancelled) return;
      try {
        const contentWindow = iframe.contentWindow;
        if (!contentWindow) return;

        contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "getCurrentTime",
            args: [],
          }),
          "*"
        );
      } catch {
        // cross-origin or not ready
      }
      timer = window.setTimeout(poll, 500);
    };

    // Start polling after a delay to let iframe load
    const startTimer = window.setTimeout(() => {
      if (!cancelled) poll();
    }, 3000);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(timer);
    };
  }, []);

  // Build embed URL with all needed params
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    fs: "0",
    disablekb: "1",
    playlist: clip.id,
    // YouTube doesn't support end param in embed URLs, but we use start
    start: String(clip.start),
  });

  const embedUrl = `https://www.youtube.com/embed/${clip.id}?${params.toString()}`;

  return (
    <div
      className={`vt-card ${clip.portrait ? "is-portrait" : "is-landscape"}`}
      role="button"
      tabIndex={0}
      onClick={() =>
        window.open(
          `https://www.youtube.com/watch?v=${clip.id}&t=${clip.start}s`,
          "_blank",
          "noopener,noreferrer"
        )
      }
      onKeyDown={(e) => {
        if (e.key === "Enter")
          window.open(
            `https://www.youtube.com/watch?v=${clip.id}&t=${clip.start}s`,
            "_blank",
            "noopener,noreferrer"
          );
      }}
    >
      <iframe
        ref={iframeRef}
        src={embedUrl}
        className="w-full h-full border-0"
        allow="autoplay; encrypted-media"
        loading="lazy"
        title={clip.label}
      />
      <span className="vt-label">{clip.label}</span>
    </div>
  );
}

export default function VideoTestimonials() {
  const track = [...CLIPS, ...CLIPS];

  return (
    <div className="pt-8 pb-4 overflow-hidden">
      <div className="text-center mb-6 px-4">
        <span className="text-gold text-xs font-bold uppercase tracking-[0.25em]">
          Watch Their Stories
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-cream mt-2">
          Video Testimonials
        </h3>
      </div>

      <div className="vt-marquee">
        <div className="vt-track">
          {track.map((clip, i) => (
            <VideoCard key={i} clip={clip} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .vt-marquee {
          width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
        }
        .vt-track {
          display: flex;
          align-items: center;
          gap: 0;
          width: max-content;
          padding: 4px 9px;
          animation: vt-scroll 60s linear infinite;
          will-change: transform;
        }
        .vt-marquee:hover .vt-track { animation-play-state: paused; }

        .vt-card {
          position: relative;
          flex: 0 0 auto;
          height: 320px;
          aspect-ratio: 9 / 16;
          border-radius: 18px;
          overflow: hidden;
          border: 2px solid rgba(200, 149, 30, 0.45);
          box-shadow: 0 8px 22px rgba(84, 21, 57, 0.16);
          background: #1a1a1a;
          cursor: pointer;
        }
        .vt-card iframe {
          border: 0;
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .is-portrait iframe { inset: 0; width: 100%; height: 100%; }

        .is-landscape iframe {
          top: 0; left: 50%;
          height: 100%; width: auto;
          aspect-ratio: 16 / 9;
          transform: translateX(-50%);
        }

        .vt-label {
          position: absolute;
          left: 10px; bottom: 10px;
          z-index: 2;
          padding: 4px 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(84, 21, 57, 0.72);
          border-radius: 999px;
          pointer-events: none;
        }
        @keyframes vt-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (max-width: 640px) {
          .vt-card { height: 230px; }
          .vt-track { animation-duration: 45s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vt-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
