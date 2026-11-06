import React, { useRef, useState, useEffect, useCallback } from "react";
import { WEDDING_CONFIG } from "../config/weddingConfig";

export default function DateReveal({ onCountdownComplete }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    const targetTime = new Date(WEDDING_CONFIG.targetDateISO).getTime();
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (updated.isPast && onCountdownComplete) {
        onCountdownComplete();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [onCountdownComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const goldGradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    goldGradient.addColorStop(0, "#b8860b");
    goldGradient.addColorStop(0.25, "#f3e5ab");
    goldGradient.addColorStop(0.5, "#d4af37");
    goldGradient.addColorStop(0.75, "#fff6d6");
    goldGradient.addColorStop(1, "#996515");

    ctx.fillStyle = goldGradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = "rgba(26, 15, 10, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(14, 14, rect.width - 28, rect.height - 28);

    ctx.fillStyle = "#2a1810";
    ctx.font = "600 13px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ SCRATCH TO REVEAL ✨", rect.width / 2, rect.height / 2 - 10);

    ctx.font = "italic 17px 'Cormorant Garamond', Georgia, serif";
    ctx.fillStyle = "#3d2314";
    ctx.fillText(
      "Rub gently with your finger to unveil the auspicious date",
      rect.width / 2,
      rect.height / 2 + 18
    );
  }, []);

  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    const step = 16 * 4;
    const totalSampled = pixels.length / step;

    for (let i = 3; i < pixels.length; i += step) {
      if (pixels[i] < 128) {
        transparentPixels++;
      }
    }

    const percent = Math.round((transparentPixels / totalSampled) * 100);
    setScratchProgress(percent);

    if (percent >= 38) {
      setIsRevealed(true);
    }
  }, [isRevealed]);

  const scratchAtPoint = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleMouseDown = (e) => {
    isDrawingRef.current = true;
    scratchAtPoint(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    scratchAtPoint(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e) => {
    isDrawingRef.current = true;
    const touch = e.touches[0];
    scratchAtPoint(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDrawingRef.current) return;
    const touch = e.touches[0];
    scratchAtPoint(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
  };

  return (
    <section className="relative py-24 px-6 bg-[#0d0907] text-[#f5ebd6] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      <p className="font-sans uppercase tracking-[0.35em] text-xs text-[#d4af37] mb-3 text-center">
        Save The Date
      </p>
      <h2 className="text-3xl md:text-5xl font-light tracking-wide text-center mb-3">
        The Date Awaits Its Reveal
      </h2>
      <p className="text-base text-[#f5ebd6]/70 italic mb-10 text-center max-w-xs">
        {isRevealed
          ? "The auspicious moment has been unveiled!"
          : "Scratch the golden seal below to reveal our wedding date & muhurat"}
      </p>

      {/* Interactive Scratch Card Container */}
      <div className="relative w-full max-w-md h-64 rounded-2xl border border-[#d4af37]/50 bg-gradient-to-b from-[#1c100b] via-[#140b07] to-[#1c100b] shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden select-none flex flex-col items-center justify-center p-6 text-center">
        <div
          className={`transition-all duration-700 transform ${
            isRevealed ? "scale-100 opacity-100" : "scale-95 opacity-90"
          }`}
        >
          <p className="font-sans uppercase tracking-[0.3em] text-xs text-[#d4af37] mb-2">
            Shubh Vivah Muhurat
          </p>

          <div className="my-3 py-3 px-6 border-y border-[#d4af37]/30">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-wider text-[#f5ebd6]">
              {WEDDING_CONFIG.displayDate}
            </h3>
          </div>

          <p className="font-sans text-xs md:text-sm text-[#d4af37] font-medium tracking-[0.22em] uppercase mt-3">
            {WEDDING_CONFIG.displayTime}
          </p>
          <p className="text-sm text-[#f5ebd6]/65 italic mt-2">
            Bless us with your presence as we begin our forever
          </p>
        </div>

        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-1000 ${
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </div>

      {!isRevealed && scratchProgress > 0 && (
        <p className="font-sans text-[11px] uppercase tracking-widest text-[#d4af37]/70 mt-4 animate-pulse">
          Keep scratching...
        </p>
      )}

      {/* Live Countdown Timer */}
      <div
        className={`mt-14 w-full max-w-lg transition-all duration-1000 transform ${
          isRevealed
            ? "opacity-100 translate-y-0"
            : "opacity-45 translate-y-2 blur-[1.5px]"
        }`}
      >
        <p className="font-sans text-center uppercase tracking-[0.3em] text-[11px] text-[#d4af37] mb-6">
          Counting Down To 29 Jan 2027 • 1:00 PM
        </p>

        <div className="grid grid-cols-4 gap-3 md:gap-5">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center py-4 px-2 rounded-xl border border-[#d4af37]/35 bg-[#160d08]/90 shadow-lg"
            >
              <span className="text-2xl md:text-4xl font-semibold text-[#f5ebd6] tabular-nums">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#d4af37] mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
