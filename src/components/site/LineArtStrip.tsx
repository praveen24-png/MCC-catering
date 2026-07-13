import { SelfDrawingSVG } from "./SelfDrawingSVG";
import { DishArt, DISH_NAMES } from "./line-art";
import { MorphingDish } from "./MorphingDish";

interface LineArtStripProps {
  className?: string;
}

export function LineArtStrip({ className = "" }: LineArtStripProps) {
  return (
    <div className={`line-art-strip ${className}`} role="img" aria-label="South Indian food illustrations">
      {DISH_NAMES.map((name, i) => (
        <SelfDrawingSVG
          key={name}
          duration={1400}
          stagger={100}
          delay={i * 300}
          fillOnComplete
          className="text-gold-dark"
        >
          <DishArt name={name} size={80} />
        </SelfDrawingSVG>
      ))}

      {/* Center morphing dish */}
      <MorphingDish size={100} className="text-plum" />
    </div>
  );
}
