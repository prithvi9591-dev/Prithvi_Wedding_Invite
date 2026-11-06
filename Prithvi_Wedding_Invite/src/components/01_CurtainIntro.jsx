import React from "react";

export default function CurtainIntro({ curtainOpen, onOpen, salutation }) {
  return (
    <div
      onClick={onOpen}
      className={`fixed inset-0 z-50 flex cursor-pointer transition-all duration-1000 select-none ${
        curtainOpen ? "pointer-events-none" : ""
      }`}
    >
      {/* Left Velvet Curtain */}
      <div
        className={`w-1/2 h-full bg-gradient-to-r from-[#2b0505] via-[#540d0d] to-[#380707] border-r border-[#d4af37]/40 shadow-[10px_0_50px_rgba(0,0,0,0.9)] transition-transform duration-[1500ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          curtainOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_top,#d4af37,transparent_70%)]" />
      </div>

      {/* Right Velvet Curtain */}
      <div
        className={`w-1/2 h-full bg-gradient-to-l from-[#2b0505] via-[#540d0d] to-[#380707] border-l border-[#d4af37]/40 shadow-[-10px_0_50px_rgba(0,0,0,0.9)] transition-transform duration-[1500ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          curtainOpen ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_top,#d4af37,transparent_70%)]" />
      </div>

      {/* Center Golden Royal Seal */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all duration-700 ${
          curtainOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      >
        <p className="font-sans uppercase tracking-[0.35em] text-[10px] md:text-xs text-[#d4af37] mb-3">
          Shubh Vivah Invitation
        </p>

        <h1 className="text-3xl md:text-4xl font-light tracking-widest text-[#f5ebd6] mb-6">
          Prithvi <span className="text-[#d4af37]">&amp;</span> Aishwarya
        </h1>

        <div className="relative group">
          <div className="absolute -inset-2 rounded-full bg-[#d4af37]/20 blur-md animate-pulse" />
          <div className="relative w-32 h-32 rounded-full border-2 border-[#d4af37] bg-gradient-to-b from-[#240707] to-[#120303] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.35)]">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#f3e5ab] font-medium">
              Tap to
            </span>
            <span className="text-sm font-sans uppercase tracking-[0.3em] text-[#d4af37] font-semibold mt-1">
              Open
            </span>
            <span className="text-[#d4af37] text-xs mt-1">✦</span>
          </div>
        </div>

        <p className="text-lg md:text-xl text-[#f3e5ab] italic mt-6">
          {salutation}
        </p>
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#f5ebd6]/50 mt-2">
          Tap anywhere to unveil your invitation
        </p>
      </div>
    </div>
  );
}
