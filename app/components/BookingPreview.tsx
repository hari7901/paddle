// app/components/BookingPreview.tsx
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

const BookingPreview = ({
  courtId,
  courtName,
  courtType,
  courtImage,
  price,
  features,
}: BookingPreviewProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-green-800/30 shadow-xl hover:shadow-green-600/20"
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-green-600 text-white text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full">
          {courtType}
        </div>
      </div>

      {/* Image section */}
      <div className="relative h-56 overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${courtImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-xl font-bold">{courtName}</h3>
          <div className="mt-1 flex items-center">
            <span className="text-green-400 font-semibold text-lg">
              ₹{price}
            </span>
            <span className="text-gray-300 text-sm ml-1">per hour</span>
          </div>
        </div>
      </div>

      {/* Court details */}
      <div className="p-5">
        <div className="flex items-center text-gray-300 mb-3">
          <Clock size={16} className="text-green-500 mr-2" />
          <span className="text-sm">Available 6:00 AM - 11:00 PM</span>
        </div>

        <div className="space-y-2 mb-5">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="text-green-500 mr-2 mt-0.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <Link href={`/book-slots?courtId=${courtId}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
          >
            <Calendar size={16} className="mr-2" />
            View Available Slots
          </motion.button>
        </Link>
      </div>

      {/* Overlay line animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-green-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
};

export default BookingPreview;
