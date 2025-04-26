"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    {
      id: 1,
      title: "Premium Single Court",
      description: "Perfect for intense one-on-one matches",
      buttonText: "Book Single Court",
      image: "/paddle3.jpg",
    },
    {
      id: 2,
      title: "Spacious Doubles Court",
      description: "Designed for exciting team play with friends",
      buttonText: "Book Doubles Court",
      image: "/paddle4.jpg",
    },
  ];

  // Set up autoplay for the slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Functions to handle manual navigation
  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  // ← here we’ve added a type annotation for index
  const goToSpecificSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
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
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Overlay with reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-green-900/40" />

          {/* Background Image */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-4 md:px-12">
        <button
          onClick={goToPrevSlide}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-green-600/80 text-white flex items-center justify-center transition-colors duration-300 focus:outline-none"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNextSlide}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-green-600/80 text-white flex items-center justify-center transition-colors duration-300 focus:outline-none"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="max-w-3xl mx-auto text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl text-white opacity-90 mb-6 md:mb-10 drop-shadow-md px-4"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div variants={itemVariants}>
                <a
                  href="#booking"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg transition-colors duration-300 shadow-lg transform hover:scale-105 active:scale-95"
                >
                  {slides[currentSlide].buttonText}
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-10">
        <div className="flex justify-center items-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSpecificSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-green-500 w-8"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
