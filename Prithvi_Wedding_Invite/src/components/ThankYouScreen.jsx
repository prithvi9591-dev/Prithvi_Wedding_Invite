import React from "react";
import GoldenPetalsCanvas from "./GoldenPetalsCanvas";
import { WEDDING_CONFIG } from "../config/weddingConfig";

/**
 * Displayed automatically once the countdown reaches 00:00:00:00
 * (After 29 Jan 2027, 1:00 PM IST, or when testing with ?preview=thankyou).
 * Single non-scrollable viewport, no audio required, personalized for the guest,
 * with continuous falling golden & floral petals in the background.
 */
export default function ThankYouScreen({ guestData }) {
  const guestName = guestData?.name ? guestData.name : "Dear Friends & Family";

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-[#1a0d08] via-[#0d0907] to-[#1a0d08] text-[#f5ebd6] flex items-center justify-center p-6 select-none">
      {/* Continuous Falling Floral / Golden Petals in Background */}
      <GoldenPetalsCanvas active={true} />

      {/* Soft Radial Golden Glow */}
      <div className="absolute w-[480px] h-[480px] bg-[#d4af37]/12 rounded-full blur-3xl pointer-events-none" />

      {/* Center Non-Scrollable Royal Gratitude Card */}
      <div className="relative z-10 w-full max-w-xl rounded-3xl border-2 border-[#d4af37]/55 bg-[#140b07]/90 backdrop-blur-md px-7 py-10 md:px-12 md:py-14 text-center shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
        {/* Monogram Seal */}
        <div className="mx-auto w-16 h-16 rounded-full border border-[#d4af37] bg-[#1f100a] flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.3)] mb-5">
          <span className="text-sm font-semibold tracking-widest text-[#d4af37]">
            {WEDDING_CONFIG.coupleMonogram}
          </span>
        </div>

        <p className="font-sans uppercase tracking-[0.35em] text-[10px] md:text-xs text-[#d4af37] mb-3">
          With Hearts Full Of Gratitude
        </p>

        {/* Personalized Guest Thank You Heading */}
        <h1 className="text-3xl md:text-5xl font-semibold text-[#f3e5ab] tracking-wide mb-2">
          Thank You, {guestName}!
        </h1>

        <p className="font-sans uppercase tracking-[0.22em] text-[11px] text-[#d4af37]/90 mb-6">
          For Attending Our Wedding &amp; Blessing Our Union
        </p>

        <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-6" />

        {/* Warm Grateful Message */}
        <p className="text-base md:text-xl text-[#f5ebd6]/90 leading-relaxed italic mb-4">
          "Thank you for coming to our wedding and making our celebration so
          memorable. Your warm presence, love, and blessings truly mean the
          world to us and our families."
        </p>

        <p className="text-sm md:text-base text-[#f5ebd6]/75 leading-relaxed mb-8">
          We feel deeply grateful to have shared the beginning of our forever
          with you.
        </p>

        <div className="text-[#d4af37] text-xs mb-4">✦ ✦ ✦</div>

        {/* Couple Signature */}
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/80 mb-1">
          Forever Grateful,
        </p>
        <h2 className="text-2xl md:text-3xl font-light tracking-widest text-[#f5ebd6]">
          {WEDDING_CONFIG.groomName}{" "}
          <span className="text-[#d4af37]">&amp;</span>{" "}
          {WEDDING_CONFIG.brideName}
        </h2>
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#f5ebd6]/45 mt-2">
          29 • January • 2027
        </p>
      </div>
    </main>
  );
}
