// app/components/AddressMapSection.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

/** Google‑Maps share and embed URLs for the very same pin */
const CLICK_URL = "https://maps.app.goo.gl/v345SW8RqBTa8pJG9?g_st=iw";

const EMBED_URL =
  "https://www.google.com/maps?q=Proyard+Padel,+South+City,+Ludhiana&output=embed";

export default function AddressMapSection() {
  return (
    <section
      id="location"
      className="py-20 bg-white text-black relative overflow-hidden"
    >
      {/* accent line & blobs */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />
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
          {/* address / link */}
          <div className="md:w-1/2 p-8 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />
            <h3 className="text-2xl font-bold mb-6">Our Location</h3>

            <div className="flex items-start">
              <MapPin size={24} className="text-[#E99E1B] mt-1 mr-3" />
              <a
                href={CLICK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-black/80 hover:text-[#E99E1B] transition-colors"
              >
                Proyard&nbsp;Padel – South&nbsp;City, Ludhiana
              </a>
            </div>
          </div>

          {/* map preview */}
          <div className="md:w-1/2 p-8 bg-white">
            <div className="h-64 md:h-full">
              <iframe
                title="Proyard Padel Location"
                src={EMBED_URL}
                loading="lazy"
                allowFullScreen
                className="w-full h-full border-0 rounded-lg"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
