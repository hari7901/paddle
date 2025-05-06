"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface BookingPreviewProps {
  courtId: string;
  courtName: string;
  courtType: string;
  courtImage: string;
  price: number;
  features: string[];
}

export default function BookingPreview({
  courtId,
  courtName,
  courtType,
  courtImage,
  price,
  features,
}: BookingPreviewProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-black rounded-2xl overflow-hidden
                 border border-white/10 shadow-lg hover:shadow-yellow-500/10"
    >
      {/* badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-[#E99E1B] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          {courtType}
        </span>
      </div>

      {/* image */}
      <div className="relative h-56 overflow-hidden">
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${courtImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </motion.div>

        {/* title & price (desktop only) */}
        <div className="absolute bottom-0 inset-x-0 p-4 hidden md:block">
          <h3 className="text-xl font-bold text-white">{courtName}</h3>
          <div className="flex items-center mt-1">
            <span className="font-semibold text-lg text-[#E99E1B]">
              ₹{price}
            </span>
            <span className="ml-1 text-sm text-white/70">per hour</span>
          </div>
        </div>
      </div>

      {/* details block (desktop only) */}
      <div className="p-5 hidden md:block">
        <div className="flex items-center text-white/70 mb-3">
          <Clock size={16} className="text-[#E99E1B] mr-2" />
          <span className="text-sm">Available 6 AM – 11 PM</span>
        </div>

        <ul className="space-y-2 mb-6">
          {features.map((f, i) => (
            <li key={i} className="flex items-start">
              <span className="text-[#E99E1B] mr-2 mt-0.5">✔</span>
              <p className="text-sm text-white/80">{f}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA button – always visible */}
      <div className="p-5 pt-4 md:pt-0">
        <Link href={`/book-slots?courtId=${courtId}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#E99E1B] to-[#FFC83D]
                       hover:from-[#FFC83D] hover:to-[#E99E1B]
                       text-black font-bold py-3 rounded-lg flex items-center
                       justify-center transition-all"
          >
            <Calendar size={16} className="mr-2" />
            View Slots
          </motion.button>
        </Link>
      </div>

      {/* hover accent */}
      <motion.div
        className="absolute top-0 left-0 h-1 w-full bg-[#E99E1B]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}
