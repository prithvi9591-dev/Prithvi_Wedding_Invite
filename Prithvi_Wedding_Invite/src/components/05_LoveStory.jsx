import React, { useEffect, useRef, useState } from "react";

const STORY_CHAPTERS = [
  {
    chapter: "CHAPTER 01",
    title: "The First Hello",
    subtitle: "Where It All Began",
    description:
      "What started as a simple conversation quickly turned into hours of effortless laughter, shared dreams, and an unmistakable connection that felt like home from day one.",
    image: "/images/story/chapter-1.jpg",
    fallbackImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  },
  {
    chapter: "CHAPTER 02",
    title: "Growing Together",
    subtitle: "Countless Memories & Shared Dreams",
    description:
      "Through every season and milestone, our bond grew deeper. We found magic in the little moments—supporting each other's ambitions and celebrating life side by side.",
    image: "/images/story/chapter-2.jpg",
    fallbackImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    chapter: "CHAPTER 03",
    title: "Saying Yes To Forever",
    subtitle: "With the Blessings of Both Families",
    description:
      "Surrounded by the love and blessings of our parents and families, we decided to turn our favourite love story into a lifetime of togetherness.",
    image: "/images/story/chapter-3.jpg",
    fallbackImage:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  },
];

export default function LoveStory() {
  const containerRef = useRef(null);
  const [scrollLineHeight, setScrollLineHeight] = useState(0);
  const [visibleChapters, setVisibleChapters] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.7;
      const scrolled = start - rect.top;
      const percentage = Math.min(Math.max((scrolled / rect.height) * 100, 0), 100);
      setScrollLineHeight(percentage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-chapter-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.getAttribute("data-chapter-index");
            setVisibleChapters((prev) => ({ ...prev, [idx]: true }));
          }
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 px-6 bg-[#0d0907] text-[#f5ebd6] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-sans uppercase tracking-[0.35em] text-xs text-[#d4af37] mb-3">
            Written In The Stars
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-4">
            Our Love Story
          </h2>
          <p className="text-base text-[#f5ebd6]/70 italic max-w-md mx-auto">
            Every chapter brought us closer to the day we begin our forever
          </p>
        </div>

        <div ref={containerRef} className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#d4af37]/20" />

          <div
            style={{ height: `${scrollLineHeight}%` }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#d4af37] via-[#f3e5ab] to-[#d4af37] shadow-[0_0_12px_#d4af37] transition-all duration-150"
          />

          <div className="space-y-16 md:space-y-24">
            {STORY_CHAPTERS.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isShown = visibleChapters[idx];

              return (
                <div
                  key={item.chapter}
                  data-chapter-index={idx}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } pl-12 md:pl-0`}
                >
                  <div
                    className={`absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-5 h-5 rounded-full border-2 transition-all duration-500 z-10 ${
                      isShown
                        ? "border-[#f3e5ab] bg-[#d4af37] shadow-[0_0_15px_#d4af37] scale-110"
                        : "border-[#d4af37]/40 bg-[#0d0907]"
                    }`}
                  />

                  <div
                    className={`w-full md:w-[45%] transition-all duration-1000 transform ${
                      isShown
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="rounded-2xl border border-[#d4af37]/35 bg-[#160d08]/95 p-5 md:p-6 shadow-2xl">
                      <span className="font-sans inline-block text-[10px] uppercase tracking-[0.3em] text-[#d4af37] border border-[#d4af37]/40 px-3 py-1 rounded-full bg-[#24140c] mb-4">
                        {item.chapter}
                      </span>

                      <div className="w-full h-52 rounded-xl overflow-hidden border border-[#d4af37]/25 mb-5">
                        <img
                          src={item.image}
                          onError={(e) => {
                            e.currentTarget.src = item.fallbackImage;
                          }}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>

                      <h3 className="text-2xl md:text-3xl font-semibold text-[#f5ebd6] mb-1">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#d4af37] mb-3">
                        {item.subtitle}
                      </p>
                      <p className="text-base text-[#f5ebd6]/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
