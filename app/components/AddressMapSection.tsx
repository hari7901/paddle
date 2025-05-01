// app/components/AddressMapSection.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function AddressMapSection() {
  return (
    <section
      id="location"
      className="py-20 bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white relative overflow-hidden"
    >
      {/* Decorative backgrounds */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E3D5A]/0 via-[#E99E1B] to-[#2E3D5A]/0" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#5A8FC8]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5A8FC8]/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-gradient-to-br from-[#191A24] to-[#4D789D] rounded-xl shadow-2xl overflow-hidden border border-[#4D789D]"
      >
        <div className="md:flex">
          {/* Address Info */}
          <div className="md:w-1/2 p-8 bg-[#191A24]/30 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E3D5A]/0 via-[#E99E1B] to-[#2E3D5A]/0" />
            <h3 className="text-2xl font-bold mb-6">Our Location</h3>
            <div className="flex items-start">
              <MapPin
                size={24}
                className="text-[#4D789D] mt-1 mr-3 flex-shrink-0"
              />
              <a
                href="https://maps.app.goo.gl/5QdYzyt2853gVvCS6?g_st=com.google.maps.preview.copy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CCCCCC] hover:text-white underline transition-colors"
              >
                Ozmo Gym &amp; Spa – South City, Ludhiana
              </a>
            </div>
          </div>

          {/* Map Preview */}
          <div className="md:w-1/2 p-8">
            <div className="h-64 md:h-full">
              <iframe
                title="Ozmo Gym & Spa Location"
                src="https://maps.google.com/maps?q=Ozmo%20Gym%20%26%20Spa%20South%20City%20Ludhiana&output=embed"
                className="w-full h-full rounded-lg border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
