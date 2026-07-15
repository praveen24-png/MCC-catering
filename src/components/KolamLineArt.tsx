import React from "react";

type KolamType = "pulli" | "sikku" | "kambi" | "padi" | "neli";

interface Props {
  type: KolamType;
  size?: number;
  color?: string;
  className?: string;
}

export function KolamLineArt({ type, size = 200, color = "#C8951E", className = "" }: Props) {
  const s = size;

  if (type === "pulli") {
    return (
      <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
        <style>{`
          .kolam-pulli { stroke-dasharray: 600; stroke-dashoffset: 600; animation: drawKolam 4s ease-out forwards; }
          @keyframes drawKolam { to { stroke-dashoffset: 0; } }
        `}</style>
        {[20, 40, 60, 80].map((x) =>
          [20, 40, 60, 80].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill={color} opacity="0.7" />
          ))
        )}
        <path
          className="kolam-pulli"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          d="M 20,20 Q 30,10 40,20 Q 50,30 40,40 Q 30,50 20,40 Q 10,30 20,20 Z
             M 40,20 Q 50,10 60,20 Q 70,30 60,40 Q 50,50 40,40 Q 30,30 40,20 Z
             M 60,20 Q 70,10 80,20 Q 90,30 80,40 Q 70,50 60,40 Q 50,30 60,20 Z
             M 20,40 Q 30,30 40,40 Q 50,50 40,60 Q 30,70 20,60 Q 10,50 20,40 Z
             M 40,40 Q 50,30 60,40 Q 70,50 60,60 Q 50,70 40,60 Q 30,50 40,40 Z
             M 60,40 Q 70,30 80,40 Q 90,50 80,60 Q 70,70 60,60 Q 50,50 60,40 Z
             M 20,60 Q 30,50 40,60 Q 50,70 40,80 Q 30,90 20,80 Q 10,70 20,60 Z
             M 40,60 Q 50,50 60,60 Q 70,70 60,80 Q 50,90 40,80 Q 30,70 40,60 Z
             M 60,60 Q 70,50 80,60 Q 90,70 80,80 Q 70,90 60,80 Q 50,70 60,60 Z"
        />
      </svg>
    );
  }

  if (type === "sikku") {
    return (
      <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
        <style>{`
          .kolam-sikku { stroke-dasharray: 800; stroke-dashoffset: 800; animation: drawKolam 4s ease-out forwards; }
        `}</style>
        <path
          className="kolam-sikku"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          d="M 50,10 C 70,10 90,30 90,50 C 90,70 70,90 50,90 C 30,90 10,70 10,50 C 10,30 30,10 50,10 Z
             M 50,25 C 60,25 75,40 75,50 C 75,60 60,75 50,75 C 40,75 25,60 25,50 C 25,40 40,25 50,25 Z
             M 30,30 L 70,70 M 70,30 L 30,70
             M 50,10 L 50,25 M 90,50 L 75,50 M 50,90 L 50,75 M 10,50 L 25,50
             M 30,10 Q 40,20 50,10 M 70,10 Q 60,20 50,10
             M 90,30 Q 80,40 90,50 M 90,70 Q 80,60 90,50
             M 70,90 Q 60,80 50,90 M 30,90 Q 40,80 50,90
             M 10,70 Q 20,60 10,50 M 10,30 Q 20,40 10,50"
        />
      </svg>
    );
  }

  if (type === "kambi") {
    return (
      <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
        <style>{`
          .kolam-kambi { stroke-dasharray: 500; stroke-dashoffset: 500; animation: drawKolam 4s ease-out forwards; }
        `}</style>
        {[20, 50, 80].map((x) =>
          [20, 50, 80].map((y) => (
            <circle key={`k${x}-${y}`} cx={x} cy={y} r="2.5" fill={color} opacity="0.6" />
          ))
        )}
        <path
          className="kolam-kambi"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          d="M 20,20 L 50,20 L 80,20
             M 20,50 L 50,50 L 80,50
             M 20,80 L 50,80 L 80,80
             M 20,20 L 20,50 L 20,80
             M 50,20 L 50,50 L 50,80
             M 80,20 L 80,50 L 80,80
             M 20,20 Q 35,35 50,50 Q 65,65 80,80
             M 80,20 Q 65,35 50,50 Q 35,65 20,80"
        />
      </svg>
    );
  }

  if (type === "padi") {
    return (
      <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
        <style>{`
          .kolam-padi { stroke-dasharray: 700; stroke-dashoffset: 700; animation: drawKolam 4s ease-out forwards; }
        `}</style>
        <path
          className="kolam-padi"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          d="M 10,10 L 90,10 L 90,90 L 10,90 Z
             M 20,20 L 80,20 L 80,80 L 20,80 Z
             M 30,30 L 70,30 L 70,70 L 30,70 Z
             M 40,40 L 60,40 L 60,60 L 40,60 Z"
        />
        <path
          className="kolam-padi"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          d="M 50,10 L 50,90 M 10,50 L 90,50
             M 10,10 L 90,90 M 90,10 L 10,90
             M 50,10 L 30,30 M 50,10 L 70,30
             M 90,50 L 70,30 M 90,50 L 70,70
             M 50,90 L 70,70 M 50,90 L 30,70
             M 10,50 L 30,70 M 10,50 L 30,30"
        />
      </svg>
    );
  }

  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
      <style>{`
        .kolam-neli { stroke-dasharray: 600; stroke-dashoffset: 600; animation: drawKolam 4s ease-out forwards; }
      `}</style>
      <path
        className="kolam-neli"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        d="M 50,15 C 65,15 80,25 85,40 C 90,55 80,70 65,75 C 50,80 35,75 25,65
           C 15,55 15,40 25,30 C 35,20 50,15 50,15 Z
           M 50,30 C 58,30 68,35 70,45 C 72,55 65,62 55,62
           C 45,62 38,55 38,45 C 38,35 45,30 50,30 Z
           M 20,20 Q 30,10 40,20 Q 50,30 40,40 Q 30,50 20,40 Q 10,30 20,20
           M 80,20 Q 70,10 60,20 Q 50,30 60,40 Q 70,50 80,40 Q 90,30 80,20
           M 20,80 Q 30,70 40,80 Q 50,90 40,80 Q 30,70 20,80
           M 80,80 Q 70,70 60,80 Q 50,90 60,80 Q 70,70 80,80"
      />
    </svg>
  );
}
