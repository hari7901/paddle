// app/components/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import { Award, Clock, Shield, Users } from "lucide-react";

export default function AboutSection() {
  /* ---------- feature data ---------- */
  const features = [
    {
      icon: <Clock size={32} className="text-[#E99E1B]" />,
      title: "Extended Hours",
      description: "Open from 6 AM – 11 PM every day for your schedule.",
    },
    {
      icon: <Award size={32} className="text-[#E99E1B]" />,
      title: "Premium Quality",
      description: "Courts built to professional standards.",
    },
    {
      icon: <Users size={32} className="text-[#E99E1B]" />,
      title: "For Everyone",
      description: "Perfect for beginners through advanced players.",
    },
    {
      icon: <Shield size={32} className="text-[#E99E1B]" />,
      title: "Safe Environment",
      description: "Well-maintained facilities and safety measures.",
    },
  ];

  /* ---------- framer variants ---------- */
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

  /* ---------- render ---------- */
  return (
    <section className="py-20 bg-white text-black relative overflow-hidden">
      {/* accent & blobs */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* ---------- header ---------- */}
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

        {/* ---------- story block (image + text) ---------- */}
        <motion.div
          variants={sectionV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center gap-12 mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative h-64 md:h-80 lg:h-96 w-full rounded-xl overflow-hidden shadow-xl group">
              <img
                src="/paddle3.jpg"
                alt="ProPlay Sports Court"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <h3 className="text-2xl font-bold mb-4">Our Story</h3>
            <p className="text-black/75 mb-4">
              Founded in 2022 by paddle enthusiasts, ProPlay Sports delivers a
              top-tier playing experience for everyone.
            </p>
            <p className="text-black/75">
              Today we operate two pro-grade courts (Singles ₹1 200/h, Doubles
              ₹1 600/h) and host regular events that build community.
            </p>
          </motion.div>
        </motion.div>

        {/* ---------- feature grid (bg-white on ALL screens) ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-white"
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

        {/* ---------- facilities block ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
          viewport={{ once: true }}
          className="mt-20 bg-white text-black p-10 rounded-lg shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />

          <div className="grid md:grid-cols-2 gap-10">
            {/* facilities list */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Facilities</h3>
              <ul className="space-y-4 text-black/80">
                <li className="flex items-start">
                  <span className="text-[#E99E1B] mr-3">•</span>
                  <div>
                    <span className="font-bold">Singles Court:</span> ₹1
                    200/hour
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E99E1B] mr-3">•</span>
                  <div>
                    <span className="font-bold">Doubles Court:</span> ₹1
                    600/hour
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E99E1B] mr-3">•</span>
                  <div>
                    <span className="font-bold">Hours:</span> 6 AM – 11 PM
                  </div>
                </li>
              </ul>
            </div>

            {/* why choose */}
            <div>
              <h3 className="text-2xl text-black font-bold mb-4">Why Choose Us</h3>
              <ul className="space-y-3 ">
                {[
                  "Pro surfaces & lighting",
                  "24/7 online booking",
                  "Flexible one-hour slots",
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
