import React, { useEffect } from "react";

export default function FloatingAudioButton({
  audioRef,
  isPlaying,
  setIsPlaying,
  visible,
}) {
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Audio playback blocked:", err));
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden && isPlaying) {
        audio.pause();
      } else if (!document.hidden && isPlaying) {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [audioRef, isPlaying]);

  if (!visible) return null;

  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? "Mute background music" : "Play background music"}
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full border border-[#d4af37]/60 bg-[#160d08]/90 backdrop-blur-md text-[#f5ebd6] shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:border-[#d4af37] active:scale-95 transition-all duration-300 font-sans"
    >
      {isPlaying ? (
        <div className="flex items-end gap-[3px] h-4 w-4 justify-center">
          <span className="w-[2.5px] bg-[#d4af37] rounded-full animate-[soundwave_0.9s_ease-in-out_infinite] h-2" />
          <span className="w-[2.5px] bg-[#f3e5ab] rounded-full animate-[soundwave_0.6s_ease-in-out_infinite_0.2s] h-4" />
          <span className="w-[2.5px] bg-[#d4af37] rounded-full animate-[soundwave_1.1s_ease-in-out_infinite_0.4s] h-3" />
          <span className="w-[2.5px] bg-[#f3e5ab] rounded-full animate-[soundwave_0.75s_ease-in-out_infinite_0.1s] h-2.5" />
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 opacity-80"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}

      <span className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-medium">
        {isPlaying ? "Music On" : "Muted"}
      </span>

      <style>{`
        @keyframes soundwave {
          0%, 100% { height: 25%; }
          50% { height: 100%; }
        }
      `}</style>
    </button>
  );
}
