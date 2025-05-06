// app/components/AddressMapSection.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function AddressMapSection() {
  return (
    <section
      id="location"
      className="py-20 bg-white text-black relative overflow-hidden"
    >
      {/* yellow accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />

      {/* soft yellow blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto rounded-xl shadow-xl overflow-hidden border border-black/10"
      >
        <div className="md:flex">
          {/* ───── address panel (now white) ───── */}
          <div className="md:w-1/2 p-8 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />
            <h3 className="text-2xl font-bold mb-6">Our Location</h3>

            <div className="flex items-start">
              <MapPin size={24} className="text-[#E99E1B] mt-1 mr-3" />
              <a
                href="https://maps.app.goo.gl/5QdYzyt2853gVvCS6?g_st=com.google.maps.preview.copy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/80 hover:text-[#E99E1B] underline transition-colors"
              >
                Ozmo Gym &amp; Spa – South City, Ludhiana
              </a>
            </div>
          </div>

          {/* ───── map panel (also white) ───── */}
          <div className="md:w-1/2 p-8 bg-white">
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
