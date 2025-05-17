"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Single Court",
    description: "Perfect for intense one‑on‑one matches",
    buttonText: "Book Single Court",
    image: "/image1.jpeg",
    courtId: "court-1",
  },
  {
    id: 2,
    title: "Doubles Court",
    description: "Designed for exciting team play with friends",
    buttonText: "Book Doubles Court",
    image: "/image4.jpeg",
    courtId: "court-2",
  },
  {
    id: 3,
    title: "Single Court",
    description: "Perfect for intense one‑on‑one matches",
    buttonText: "Book Single Court",
    image: "/image3.jpeg",
    courtId: "court-1",
  },
  {
    id: 4,
    title: "Doubles Court",
    description: "Designed for exciting team play with friends",
    buttonText: "Book Doubles Court",
    image: "/image5.jpeg",
    courtId: "court-2",
  },
  {
    id: 5,
    title: "Single Court",
    description: "Perfect for intense one‑on‑one matches",
    buttonText: "Book Single Court",
    image: "/image6.jpeg",
    courtId: "court-1",
  },
  {
    id: 6,
    title: "Doubles Court",
    description: "Designed for exciting team play with friends",
    buttonText: "Book Doubles Court",
    image: "/image7.jpeg",
    courtId: "court-2",
  },
  {
    id: 7,
    title: "Single Court",
    description: "Perfect for intense one‑on‑one matches",
    buttonText: "Book Single Court",
    image: "/image8.jpeg",
    courtId: "court-1",
  },
  {
    id: 8,
    title: "Doubles Court",
    description: "Designed for exciting team play with friends",
    buttonText: "Book Doubles Court",
    image: "/image9.jpeg",
    courtId: "court-2",
  },
  {
    id: 9,
    title: "Single Court",
    description: "Perfect for intense one‑on‑one matches",
    buttonText: "Book Single Court",
    image: "/image10.jpeg",
    courtId: "court-1",
  },
  {
    id: 10,
    title: "Doubles Court",
    description: "Designed for exciting team play with friends",
    buttonText: "Book Doubles Court",
    image: "/image11.jpeg",
    courtId: "court-2",
  },
  {
    id: 11,
    title: "Single Court",
    description: "Perfect for intense one‑on‑one matches",
    buttonText: "Book Single Court",
    image: "/image12.jpeg",
    courtId: "court-1",
  },
  {
    id: 12,
    title: "Doubles Court",
    description: "Designed for exciting team play with friends",
    buttonText: "Book Doubles Court",
    image: "/image3.jpeg",
    courtId: "court-2",
  },
];

export default function HeroSection() {
  // Use ref to track current index to avoid closure issues
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to advance slide
  const nextSlide = () => {
    // Calculate next index
    const nextIndex = (currentIndexRef.current + 1) % slides.length;

    // Update refs and state
    currentIndexRef.current = nextIndex;
    setCurrentIndex(nextIndex);

    console.log(`Advanced to slide ${nextIndex + 1} of ${slides.length}`);
  };

  // Set up the auto-advance interval
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start a new interval
    intervalRef.current = setInterval(nextSlide, 5000);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    // Update both the ref and state
    currentIndexRef.current = index;
    setCurrentIndex(index);

    // Reset interval to prevent immediate advance
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  // Get current slide
  const slide = slides[currentIndex];

  /* framer helpers */
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 12 },
    },
  };

  return (
    <section className="w-full relative overflow-hidden h-auto md:h-screen">
      {/* mobile: image first, text below; desktop: row */}
      <div className="flex flex-col-reverse md:flex-row h-full">
        {/* TEXT */}
        <div
          className="w-full md:w-1/2 bg-white flex flex-col items-center md:items-start
                     justify-start md:justify-center px-6 sm:px-8 lg:px-16
                     pt-12 pb-20                       /* ↓ tighter mobile spacing  */
                     md:pt-0 md:pb-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              variants={container}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-md text-center md:text-left"
            >
              <motion.h1
                variants={item}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-black"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                variants={item}
                className="text-base sm:text-lg mb-6 text-black/80"
              >
                {slide.description}
              </motion.p>

              <motion.div
                variants={item}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <Link
                  href={`/book-slots?courtId=${slide.courtId}`}
                  className="bg-[#E99E1B] hover:bg-[#D68E13] text-black font-semibold px-6 py-3 rounded-lg transition-transform
                             hover:scale-105 active:scale-95"
                >
                  {slide.buttonText}
                </Link>
                <Link
                  href="#booking"
                  className="border border-black text-black hover:bg-black hover:text-white font-semibold px-6 py-3 rounded-lg transition-transform
                             hover:scale-105 active:scale-95"
                >
                  View Courts
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* IMAGE */}
        <div className="w-full md:w-1/2 h-64 md:h-full relative">
          {slides.map((s, i) => (
            <motion.div
              key={s.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: i === currentIndex ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              style={{
                backgroundImage: `url(${s.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          ))}

          {/* Current slide indicator */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {slides.length}
          </div>

          {/* dots - hide on mobile if too many */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 overflow-x-auto max-w-full px-4 justify-center flex-wrap">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all flex-shrink-0 mb-1 ${
                  i === currentIndex
                    ? "bg-[#E99E1B] w-6"
                    : "w-2.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
