import React from "react";
import { WEDDING_CONFIG } from "../config/weddingConfig";

export default function Ceremonies() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-[#0d0907] via-[#140c08] to-[#0d0907] text-[#f5ebd6] overflow-hidden">
      {/* Ambient Royal Spotlight */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <p className="font-sans uppercase tracking-[0.35em] text-xs text-[#d4af37] mb-3">
            The Sacred Union
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-4">
            The Wedding Ceremony
          </h2>
          <p className="text-base text-[#f5ebd6]/70 italic max-w-md mx-auto">
            Join us as we take our sacred vows and begin our journey together
          </p>
        </div>

        {/* Single Royal Spotlight Card for Shubh Vivah */}
        <div className="relative mx-auto max-w-xl rounded-3xl p-8 md:p-12 bg-gradient-to-b from-[#4a0e0e] via-[#2b0707] to-[#140303] border-2 border-[#d4af37]/65 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/50 bg-[#d4af37]/15 text-[#f3e5ab] font-sans text-[11px] uppercase tracking-[0.28em] mb-6">
            <span>✦</span>
            <span>Shubh Vivah Muhurat</span>
            <span>✦</span>
          </div>

          <h3 className="text-4xl md:text-5xl font-semibold text-[#f5ebd6] tracking-wide mb-2">
            The Wedding
          </h3>
          <p className="text-lg italic text-[#d4af37] mb-8">
            An Auspicious Celebration of Love &amp; Blessings
          </p>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mb-8" />

          {/* Ceremony Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center mb-8">
            <div className="p-4 rounded-2xl bg-black/25 border border-[#d4af37]/25">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#d4af37] mb-1">
                Date
              </p>
              <p className="text-xl font-semibold text-[#f5ebd6]">
                Friday, 29 Jan 2027
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/25 border border-[#d4af37]/25">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#d4af37] mb-1">
                Auspicious Muhurat
              </p>
              <p className="text-xl font-semibold text-[#f3e5ab]">
                1:00 PM Onwards
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-black/25 border border-[#d4af37]/25 mb-8">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#d4af37] mb-1">
              Venue
            </p>
            <p className="text-xl font-medium text-[#f5ebd6]">
              {WEDDING_CONFIG.venueName}
            </p>
            <p className="text-sm text-[#f5ebd6]/75 mt-1">
              {WEDDING_CONFIG.venueAddress}
            </p>
          </div>

          {/* Google Maps Directions Button */}
          <a
            href={WEDDING_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full md:w-auto min-w-[240px] py-3.5 px-8 rounded-xl border border-[#d4af37] bg-[#d4af37] text-[#140b07] hover:bg-[#f3e5ab] font-sans text-xs uppercase tracking-[0.25em] font-semibold shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300"
          >
            Get Venue Directions
          </a>
        </div>
      </div>
    </section>
  );
}
