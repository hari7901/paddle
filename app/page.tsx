// app/page.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import HeroSection from "@/app/components/HeroSection";
import BookingSection from "@/app/components/BookingSection";
import AboutSection from "@/app/components/AboutSection";
import ContactSection from "@/app/components/ContactSection";
import AddressMapSection from "./components/AddressMapSection";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const router = useRouter();

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
    <main className="flex flex-col min-h-screen relative">
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

      <section id="adress" data-aos="fade-up">
        <AddressMapSection />
      </section>

      <section id="about" data-aos="fade-up">
        <AboutSection />
      </section>

      <section id="contact" data-aos="fade-up">
        <ContactSection />
      </section>

      {/* Floating "Book Now" button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/book-slots?courtId=court-1")}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#E99E1B] hover:bg-[#D68E13] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all z-50"
      >
        Book Now
      </motion.button>
    </main>
  );
}
