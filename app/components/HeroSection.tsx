// app/components/HeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  /* auto-advance */
  useEffect(() => {
    const iv = setInterval(
      () => setCurrent((p) => (p + 1 === slides.length ? 0 : p + 1)),
      5000
    );
    return () => clearInterval(iv);
  }, []);

  /* ■■■ Guard against undefined slide ■■■ */
  const slide = slides[current] ?? slides[0];

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
      <div className="flex flex-col md:flex-row h-full">
        {/* LEFT */}
        <div
          className="w-full md:w-1/2 bg-white flex flex-col items-center md:items-start
                        justify-start md:justify-center px-6 sm:px-8 lg:px-16 pt-32 pb-24 md:pt-0 md:pb-0"
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

        {/* RIGHT */}
        <div className="w-full md:w-1/2 h-64 md:h-full relative">
          {slides.map((s, i) => (
            <motion.div
              key={s.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: i === current ? 1 : 0 }}
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

          {/* dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-3 rounded-full transition-all ${
                  i === current
                    ? "bg-[#E99E1B] w-8"
                    : "w-3 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
