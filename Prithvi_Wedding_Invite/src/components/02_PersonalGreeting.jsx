import React from "react";
import { WEDDING_CONFIG } from "../config/weddingConfig";

export default function PersonalGreeting({ guestData }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-[#1a0f0a] via-[#120a07] to-[#0d0907] overflow-hidden">
      {/* Subtle Ambient Top Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      <p className="font-sans uppercase tracking-[0.35em] text-[11px] text-[#d4af37] mb-3">
        || Shree Ganeshaya Namah ||
      </p>
      <p className="font-sans uppercase tracking-[0.25em] text-xs text-[#f5ebd6]/75 mb-8">
        Together With Their Families
      </p>

      {/* Personalized Guest Invitation Card at the Top */}
      <div className="relative w-full max-w-lg border border-[#d4af37]/45 rounded-3xl p-8 md:p-10 bg-[#160d08]/90 shadow-[0_15px_50px_rgba(0,0,0,0.75)] mb-12">
        <div className="text-[#d4af37] text-sm mb-3">✦ ✦ ✦</div>

        <h2 className="text-3xl md:text-4xl text-[#f3e5ab] font-semibold tracking-wide mb-4">
          {guestData.salutation},
        </h2>

        <p className="text-lg md:text-xl leading-relaxed text-[#f5ebd6]/90 mb-5">
          You are cordially invited to celebrate the auspicious wedding ceremony
          of
        </p>

        {/* Couple Names Inside Top Hero */}
        <h1 className="text-4xl md:text-6xl font-light tracking-wider text-[#f5ebd6] my-6">
          {WEDDING_CONFIG.groomName}{" "}
          <span className="text-[#d4af37] italic font-normal">&amp;</span>{" "}
          {WEDDING_CONFIG.brideName}
        </h1>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-5" />

        <p className="text-base md:text-lg italic text-[#d4af37]/95 leading-relaxed">
          "{guestData.message}"
        </p>
      </div>

      <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#d4af37]/80 animate-bounce">
        The date awaits its reveal • Scroll down ↓
      </p>
    </section>
  );
}
