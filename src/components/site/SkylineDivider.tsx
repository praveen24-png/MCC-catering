import skylineSketch from "@/assets/chennai-skyline-sketch.png";

/**
 * SkylineDivider — hand-sketched Chennai skyline strip.
 * Full-bleed band that sits between the last section and the footer.
 * The sketch is white-background art, so `mix-blend-multiply` drops the white
 * and leaves only the graphite lines on the cream page.
 */
export function SkylineDivider() {
  return (
    <div className="skyline-divider full-bleed" aria-hidden="true">
      <img
        src={skylineSketch}
        alt=""
        className="skyline-divider-img"
        loading="lazy"
        decoding="async"
      />
      <div className="skyline-divider-fade" />
    </div>
  );
}

export default SkylineDivider;
