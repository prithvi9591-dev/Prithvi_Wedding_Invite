import React from "react";
import { WEDDING_CONFIG } from "../config/weddingConfig";

export default function VenueFooter() {
  return (
    <footer className="relative py-24 px-6 bg-gradient-to-t from-[#1a0d08] to-[#0d0907] text-[#f5ebd6] border-t border-[#d4af37]/20 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border border-[#d4af37]/60 bg-[#160d08] flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
          <span className="text-sm font-semibold tracking-widest text-[#d4af37]">
            {WEDDING_CONFIG.coupleMonogram}
          </span>
        </div>

        <p className="font-sans uppercase tracking-[0.35em] text-xs text-[#d4af37] mb-3">
          With Warmest Regards
        </p>

        <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-4">
          Your Presence Is Our Present
        </h2>

        <p className="text-base md:text-lg text-[#f5ebd6]/80 italic leading-relaxed max-w-lg mb-8">
          "We need no gifts—only your love, warm wishes, and blessings as we step
          into this joyous new beginning together."
        </p>

        <a
          href={WEDDING_CONFIG.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full border border-[#d4af37]/60 bg-[#160d08] hover:bg-[#d4af37] hover:text-[#140b07] font-sans text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium transition-all duration-300 mb-12"
        >
          <span>View Wedding Venue on Google Maps</span>
        </a>

        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mb-6" />

        <p className="text-2xl font-light tracking-widest text-[#f3e5ab]">
          {WEDDING_CONFIG.groomName} <span className="text-[#d4af37]">&amp;</span>{" "}
          {WEDDING_CONFIG.brideName}
        </p>
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#f5ebd6]/50 mt-2">
          29 • January • 2027
        </p>
      </div>
    </footer>
  );
}
