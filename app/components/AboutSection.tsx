// app/components/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Shield,
  Users,
  Instagram,
  Coffee,
  MapPin,
  Trophy,
  Flame,
  Sparkles,
  CircleDot,
} from "lucide-react";

export default function AboutSection() {
  /* ──────────────────────────────────────────
     1. Feature grid (top of section)
  ────────────────────────────────────────── */
  const features = [
    {
      icon: <Clock size={32} className="text-[#E99E1B]" />,
      title: "Extended Hours",
      description: "Open 4 PM – 11 PM every day.",
    },
    {
      icon: <Award size={32} className="text-[#E99E1B]" />,
      title: "European Standard",
      description: "Pro‑grade courts & lighting.",
    },
    {
      icon: <Users size={32} className="text-[#E99E1B]" />,
      title: "For Everyone",
      description: "Beginners to advanced players.",
    },
    {
      icon: <Shield size={32} className="text-[#E99E1B]" />,
      title: "Safe & Clean",
      description: "Well‑maintained facilities.",
    },
  ];

  /* ──────────────────────────────────────────
     2. PROYARD highlight cards (bottom)
  ────────────────────────────────────────── */
  const highlights = [
    {
      icon: <CircleDot size={28} className="text-[#E99E1B]" />,
      text: "2 Premium Courts – singles & doubles",
    },
    {
      icon: <Coffee size={28} className="text-[#E99E1B]" />,
      text: "Stylish café with outdoor seating",
    },
    {
      icon: <Sparkles size={28} className="text-[#E99E1B]" />,
      text: "First‑of‑its‑kind in Ludhiana",
    },
    {
      icon: <Trophy size={28} className="text-[#E99E1B]" />,
      text: "Perfect for players, families & friends",
    },
    {
      icon: <Flame size={28} className="text-[#E99E1B]" />,
      text: "Events, coaching & community fun",
    },
    {
      icon: <MapPin size={28} className="text-[#E99E1B]" />,
      text: "Located in the heart of Ludhiana",
    },
  ];

  /* ──────────────────────────────────────────
     3. Framer‑motion helpers
  ────────────────────────────────────────── */
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };
  const sectionV = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  /* ──────────────────────────────────────────
     4. Render
  ────────────────────────────────────────── */
  return (
    <section className="py-20 bg-white text-black relative overflow-hidden">
      {/* decorative blobs & accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* ───── Header ───── */}
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-black/10 rounded-full px-4 py-1 mb-4 text-[#E99E1B] text-sm font-semibold uppercase tracking-wider">
            Our Journey
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About ProPlay Sports
          </h2>

          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Premium facilities • Flexible booking • Community spirit
          </p>
        </motion.div>

        {/* ───── Story block (image + NEW copy) ───── */}
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center gap-12 mb-16"
        >
          {/* image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative h-64 md:h-80 lg:h-96 w-full rounded-xl overflow-hidden shadow-xl group">
              <img
                src="/image14.jpeg"
                alt="ProPlay Sports Court"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </motion.div>

          {/* NEW copy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              PROYARD – Ludhiana’s First European‑Standard Padel Experience!
            </h3>

            <ul className="space-y-3 text-black/80 mb-6">
              <li className="flex items-start">
                <CircleDot className="text-[#E99E1B] mr-2" size={20} />2 Premium
                Courts – singles & doubles
              </li>
              <li className="flex items-start">
                <Coffee className="text-[#E99E1B] mr-2" size={20} />
                Stylish Café with outdoor seating – chill, chat, or refuel
                post‑game
              </li>
            </ul>

            <p className="text-black/75 mb-4">
              Be part of the padel revolution! PROYARD brings
              international‑grade courts, vibrant energy, and a relaxed social
              vibe — all in one stunning outdoor space. Whether you're here to
              compete or just connect, this is Ludhiana’s go‑to spot for sport
              and lifestyle.
            </p>

            <ul className="space-y-3 text-black/80 mb-6">
              <li className="flex items-start">
                <Sparkles className="text-[#E99E1B] mr-2" size={20} />
                First‑of‑its‑kind in the city
              </li>
              <li className="flex items-start">
                <Trophy className="text-[#E99E1B] mr-2" size={20} />
                Perfect for players, families & friends
              </li>
              <li className="flex items-start">
                <Flame className="text-[#E99E1B] mr-2" size={20} />
                Events, coaching & community fun
              </li>
            </ul>

            <p className="text-black/75">
              👉 Book your court now – Let the game begin!
              <br />
              📍 Located in the heart of Ludhiana
            </p>
            <div className="mt-4 flex items-center">
              <Instagram size={20} className="text-[#E99E1B] mr-1" />
              <span className="text-black/80">@proyard_ldh</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ───── Feature grid ───── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              className="bg-white rounded-lg p-6 text-center border border-black/10
                         shadow-sm hover:shadow-lg transition-transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-black/70">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ───── Facilities block ───── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
          viewport={{ once: true }}
          className="mt-20 bg-white text-black p-10 rounded-lg shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Facilities</h3>
              <ul className="space-y-4 text-black/80">
                <li className="flex items-start">
                  <span className="text-[#E99E1B] mr-3">•</span>
                  <div>
                    <span className="font-bold">Singles Court:</span>{" "}
                    ₹1400/hour
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E99E1B] mr-3">•</span>
                  <div>
                    <span className="font-bold">Doubles Court:</span>{" "}
                    ₹2000/hour
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E99E1B] mr-3">•</span>
                  <div>
                    <span className="font-bold">Hours:</span> 4 PM – 11 PM
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Why Choose Us</h3>
              <ul className="space-y-3">
                {[
                  "Pro surfaces & lighting",
                  "24/7 online booking",
                  "Flexible one‑hour slots",
                  "Clean, safe facilities",
                  "Fun tournaments & socials",
                ].map((r) => (
                  <li key={r} className="flex items-start">
                    <span className="text-[#E99E1B] mr-3">✓</span>
                    <span className="text-black/80">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
