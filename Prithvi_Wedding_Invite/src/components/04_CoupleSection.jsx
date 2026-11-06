import React, { useEffect, useRef, useState } from "react";

const COUPLE_DATA = [
  {
    role: "The Groom",
    name: "Prithvi",
    family: "Son of Smt. & Shri Gajanan Totewar",
    bio: "Calm, grounded, and always ready with a warm smile—counting down the days to begin this new chapter with his best friend.",
    image: "/images/couple/groom.jpg",
    fallbackImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    role: "The Bride",
    name: "Aishwarya",
    family: "Beloved Daughter of Proud Parents",
    bio: "Graceful, vibrant, and full of life—bringing warmth, laughter, and endless joy to every moment they share together.",
    image: "/images/couple/bride.jpg",
    fallbackImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CoupleSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 bg-gradient-to-b from-[#0d0907] via-[#150c08] to-[#0d0907] text-[#f5ebd6] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <p className="font-sans uppercase tracking-[0.35em] text-xs text-[#d4af37] mb-3 text-center">
          Two Souls, One Journey
        </p>
        <h2 className="text-3xl md:text-5xl font-light tracking-wide text-center mb-4">
          Meet The Couple
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-16" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 w-full items-center">
          {COUPLE_DATA.map((person, index) => (
            <div
              key={person.name}
              style={{ transitionDelay: `${index * 200}ms` }}
              className={`flex flex-col items-center text-center p-6 md:p-8 rounded-3xl border border-[#d4af37]/30 bg-[#140b07]/90 shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition-all duration-1000 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="relative w-60 h-72 md:w-64 md:h-80 p-2 rounded-t-full rounded-b-2xl border border-[#d4af37]/60 bg-gradient-to-b from-[#d4af37]/20 to-transparent mb-6 overflow-hidden group">
                <img
                  src={person.image}
                  onError={(e) => {
                    e.currentTarget.src = person.fallbackImage;
                  }}
                  alt={person.name}
                  className="w-full h-full object-cover rounded-t-full rounded-b-xl transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-t-full rounded-b-xl ring-1 ring-inset ring-[#d4af37]/40 pointer-events-none" />
              </div>

              <span className="font-sans uppercase tracking-[0.3em] text-[10px] text-[#d4af37] px-4 py-1 rounded-full border border-[#d4af37]/30 bg-[#1f120b] mb-3">
                {person.role}
              </span>

              <h3 className="text-3xl md:text-4xl font-semibold text-[#f5ebd6] tracking-wide mb-1">
                {person.name}
              </h3>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#d4af37]/80 mb-4">
                {person.family}
              </p>

              <p className="text-base text-[#f5ebd6]/80 leading-relaxed max-w-sm italic">
                "{person.bio}"
              </p>
            </div>
          ))}

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#d4af37] bg-[#1a0f0a] items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.3)] z-10">
            <span className="text-sm font-semibold tracking-widest text-[#d4af37]">
              P&amp;A
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
