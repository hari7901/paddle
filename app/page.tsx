// app/page.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/app/components/HeroSection";
import BookingSection from "@/app/components/BookingSection";
import AboutSection from "@/app/components/AboutSection";
import ContactSection from "@/app/components/ContactSection";
import AddressSection from "@/app/components/AddressSection";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  // Initialize AOS animation library
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({
        duration: 800,
        once: false,
      });
    });
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full"
      >
        <HeroSection />
      </motion.div>

      <section id="booking" data-aos="fade-up">
        <BookingSection />
      </section>

      <section id="about" data-aos="fade-up">
        <AboutSection />
      </section>

      <section id="contact" data-aos="fade-up">
        <ContactSection />
      </section>

      <section id="address" data-aos="fade-up">
        <AddressSection />
      </section>
    </main>
  );
}
