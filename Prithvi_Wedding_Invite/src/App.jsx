import React, { useState, useEffect, useRef } from "react";
import { WEDDING_CONFIG } from "./config/weddingConfig";
import GoldenPetalsCanvas from "./components/GoldenPetalsCanvas";
import FloatingAudioButton from "./components/FloatingAudioButton";
import CurtainIntro from "./components/01_CurtainIntro";
import PersonalGreeting from "./components/02_PersonalGreeting";
import DateReveal from "./components/03_DateReveal";
import CoupleSection from "./components/04_CoupleSection";
import LoveStory from "./components/05_LoveStory";
import Ceremonies from "./components/06_Ceremonies";
import PhotoGallery from "./components/07_PhotoGallery";
import VenueFooter from "./components/08_VenueFooter";
import ThankYouScreen from "./components/ThankYouScreen";

export default function App() {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestData, setGuestData] = useState({
    name: "",
    salutation: "Dear Friends & Family",
    message:
      "We would be honoured to have you celebrate our special day with us.",
  });

  // Check if current time is past January 29, 2027 1:00 PM IST OR if ?preview=thankyou is in URL
  const [isPostWedding, setIsPostWedding] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "thankyou") return true;
    const targetTime = new Date(WEDDING_CONFIG.targetDateISO).getTime();
    return Date.now() >= targetTime;
  });

  const audioRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestSlug = params.get("g");

    if (guestSlug) {
      fetch("/guests.json")
        .then((res) => res.json())
        .then((data) => {
          const normalized = guestSlug.toLowerCase().trim();
          if (data[normalized]) {
            setGuestData(data[normalized]);
          } else {
            // Graceful fallback if someone types ?g=Prathamesh without running generator
            const formattedName = guestSlug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ");
            setGuestData({
              name: formattedName,
              salutation: `Dear ${formattedName}`,
              message:
                "We are so excited to celebrate our special day with you! Your presence means the world to us.",
            });
          }
        })
        .catch((err) => console.error("Failed to load guests.json:", err));
    }
  }, []);

  // Stop audio immediately if countdown transitions to Thank You screen while page is open
  useEffect(() => {
    if (isPostWedding && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPostWedding]);

  const handleOpenCurtain = () => {
    setCurtainOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // POST-COUNTDOWN VIEW: Single non-scrollable personalized Thank You page, no audio, falling petals
  if (isPostWedding) {
    return <ThankYouScreen guestData={guestData} />;
  }

  // PRE-COUNTDOWN VIEW: Full Interactive Wedding Cinema Experience
  return (
    <div
      className={`relative min-h-screen bg-[#0d0907] text-[#f5ebd6] font-serif overflow-x-hidden ${
        !curtainOpen ? "h-screen overflow-y-hidden" : ""
      }`}
    >
      {/* Background Instrumental Audio */}
      <audio
        ref={audioRef}
        src="/audio/wedding-theme.mp3"
        loop
        preload="auto"
      />

      {/* Falling Golden Petals Overlay (Starts once curtains open) */}
      <GoldenPetalsCanvas active={curtainOpen} />

      {/* Floating Audio Mute / Unmute Controller */}
      <FloatingAudioButton
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        visible={curtainOpen}
      />

      {/* 1. Parting Velvet Curtains Intro */}
      <CurtainIntro
        curtainOpen={curtainOpen}
        onOpen={handleOpenCurtain}
        salutation={guestData.salutation}
      />

      {/* 2. Top Personalized Invitation Greeting */}
      <PersonalGreeting guestData={guestData} />

      {/* 3. Interactive Gold Foil Scratch Card & Countdown to 29 Jan 2027, 1:00 PM */}
      <DateReveal onCountdownComplete={() => setIsPostWedding(true)} />

      {/* 4. Meet The Couple (Prithvi & Aishwarya) */}
      <CoupleSection />

      {/* 5. Scroll-Driven Love Story Timeline */}
      <LoveStory />

      {/* 6. Wedding Ceremony Only (Shubh Vivah - No Haldi) */}
      <Ceremonies />

      {/* 7. Swipeable Photo Gallery with 01-05 Pagination */}
      <PhotoGallery />

      {/* 8. Venue Map & Closing Blessing Footer (No RSVP) */}
      <VenueFooter />
    </div>
  );
}
