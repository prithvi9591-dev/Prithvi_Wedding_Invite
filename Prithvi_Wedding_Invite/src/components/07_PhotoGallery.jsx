import React, { useRef, useState } from "react";

const GALLERY_PHOTOS = [
  {
    id: "01",
    src: "/images/gallery/photo-1.jpg",
    fallback:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    caption: "Together in every moment",
  },
  {
    id: "02",
    src: "/images/gallery/photo-2.jpg",
    fallback:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
    caption: "A promise of forever",
  },
  {
    id: "03",
    src: "/images/gallery/photo-3.jpg",
    fallback:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
    caption: "Laughter & endless joy",
  },
  {
    id: "04",
    src: "/images/gallery/photo-4.jpg",
    fallback:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
    caption: "Counting down the days",
  },
  {
    id: "05",
    src: "/images/gallery/photo-5.jpg",
    fallback:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
    caption: "Two hearts, one soul",
  },
];

export default function PhotoGallery() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveIndex(Math.min(Math.max(index, 0), GALLERY_PHOTOS.length - 1));
  };

  const scrollToSlide = (index) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: index * scrollRef.current.clientWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section className="relative py-24 px-6 bg-[#0d0907] text-[#f5ebd6] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans uppercase tracking-[0.35em] text-xs text-[#d4af37] mb-3">
            Captured Moments
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-3">
            Glimpses Of Us
          </h2>
          <p className="text-sm text-[#f5ebd6]/65 italic">
            Swipe left or right to browse our moments
          </p>
        </div>

        {/* Horizontal Touch-Swipeable Carousel */}
        <div className="relative rounded-3xl border border-[#d4af37]/40 bg-[#140b07] p-3 md:p-5 shadow-2xl">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-2xl"
          >
            {GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                className="w-full flex-shrink-0 snap-center relative h-[380px] md:h-[480px] overflow-hidden rounded-2xl"
              >
                <img
                  src={photo.src}
                  onError={(e) => {
                    e.currentTarget.src = photo.fallback;
                  }}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-6">
                  <p className="text-lg italic text-[#f5ebd6]">{photo.caption}</p>
                  <span className="font-sans text-xs tracking-[0.25em] text-[#d4af37]">
                    {photo.id} / 05
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Numbered Pagination (01 02 03 04 05) matching Wedding Cinema */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {GALLERY_PHOTOS.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => scrollToSlide(idx)}
              className={`font-sans text-xs tracking-[0.2em] px-3.5 py-2 rounded-full border transition-all duration-300 ${
                activeIndex === idx
                  ? "border-[#d4af37] bg-[#d4af37] text-[#140b07] font-semibold scale-110"
                  : "border-[#d4af37]/30 bg-[#160d08] text-[#d4af37]/75 hover:border-[#d4af37]"
              }`}
            >
              {photo.id}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
