// app/components/BookingSection.tsx
"use client";

import { motion } from "framer-motion";
import BookingPreview from "./BookingPreview";

/* ---------- data ---------- */
const courts = [
  {
    id: "court-1",
    name: "Singles Court",
    type: "Singles",
    price: 1200,
    image: "/paddle3.jpg",
    features: [
      "Professional-grade playing surface",
      "Perfect dimensions for 1v1 matches",
      "High-quality evening lighting",
      "Equipment rental available",
    ],
  },
  {
    id: "court-2",
    name: "Doubles Court",
    type: "Doubles",
    price: 1600,
    image: "/paddle4.jpg",
    features: [
      "Regulation-size doubles court",
      "Spacious 2v2 play area",
      "Premium court markings",
      "Shade canopy for spectators",
    ],
  },
];

/* ---------- framer variants ---------- */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const item = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60, damping: 15 },
  },
};

/* ---------- component ---------- */
export default function BookingSection() {
  return (
    <section
      id="booking"
      className="py-20 bg-white text-black relative overflow-hidden"
    >
      {/* decorative accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block bg-black/10 rounded-full px-4 py-1 mb-4"
          >
            <span className="text-[#E99E1B] text-sm font-semibold uppercase tracking-wider">
              Reserve Your Spot
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl font-bold mb-5"
          >
            Book Your Perfect Court
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg text-black/70"
          >
            Pick a premium paddle court and reserve your preferred time slot in
            seconds — instant confirmation, zero hassle.
          </motion.p>
        </div>

        {/* cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {courts.map((c) => (
            <motion.div key={c.id} variants={item}>
              <BookingPreview
                courtId={c.id}
                courtName={c.name}
                courtType={c.type}
                courtImage={c.image}
                price={c.price}
                features={c.features}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
