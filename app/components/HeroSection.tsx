// app/components/HeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Single Court",
      description: "Perfect for intense one-on-one matches",
      buttonText: "Book Single Court",
      image: "/paddle3.jpg",
      courtId: "court-1",
    },
    {
      id: 2,
      title: "Doubles Court",
      description: "Designed for exciting team play with friends",
      buttonText: "Book Doubles Court",
      image: "/paddle4.jpg",
      courtId: "court-2",
    },
  ];

  // Auto-advance every 5 seconds
  useEffect(() => {
    const iv = setInterval(() => {
      setCurrentSlide((p) => (p === slides.length - 1 ? 0 : p + 1));
    }, 5000);
    return () => clearInterval(iv);
  }, [slides.length]);

  const goTo = (i: number) => setCurrentSlide(i);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${
            i === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-[#2E3D5A]/40" />
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${s.image})` }}
          />
        </div>
      ))}

      {/* Slide content */}
      <div className="relative z-10 flex items-center justify-center h-full pointer-events-auto">
        <div className="container mx-auto px-4 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="max-w-3xl mx-auto text-center"
              variants={container}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h1
                variants={item}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                variants={item}
                className="text-lg sm:text-xl md:text-2xl text-white opacity-90 mb-6 drop-shadow-md px-4"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div variants={item}>
                <Link
                  href={`/book-slots?courtId=${slides[currentSlide].courtId}`}
                  className="inline-block bg-[#E99E1B] hover:bg-[#D68E13] text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg transition-transform duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  {slides[currentSlide].buttonText}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-10 pointer-events-auto">
        <div className="flex justify-center items-center space-x-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "bg-[#E99E1B] w-8"
                  : "w-3 bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
