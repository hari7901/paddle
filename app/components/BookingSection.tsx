// app/components/BookingSection.tsx
"use client";

import { motion } from "framer-motion";
import BookingPreview from "./BookingPreview";

const BookingSection = () => {
  /* court data -------------------------------------------------- */
  const courts = [
    {
      id: "court-1",
      name: "Singles Court",
      type: "Singles",
      price: 1200,
      image: "/paddle3.jpg",
      features: [
        "Professional-grade playing surface",
        "Perfect court dimensions for 1v1 matches",
        "High-quality lighting for evening play",
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
        "Spacious play area for 2v2 matches",
        "Premium court markings",
        "Shade canopy for spectators",
      ],
    },
  ];

  /* framer variants -------------------------------------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 15, stiffness: 60 },
    },
  };

  /* render ------------------------------------------------------ */
  return (
    <div
      id="booking"
      className="py-20 bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white relative overflow-hidden"
    >
      {/* decorative lines & blobs */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E3D5A]/0 via-[#E99E1B] to-[#2E3D5A]/0" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#5A8FC8]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5A8FC8]/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block bg-[#191A24]/30 rounded-full px-4 py-1 mb-4"
          >
            <span className="text-[#E99E1B] text-sm font-semibold tracking-wider uppercase">
              Reserve Your Spot
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Book Your Perfect Court
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-[#CCCCCC] max-w-2xl mx-auto"
          >
            Choose from our premium paddle courts and find available time slots
            that fit your schedule. Easy booking process, instant confirmation.
          </motion.p>
        </div>

        {/* court cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16"
        >
          {courts.map((court) => (
            <motion.div
              key={court.id}
              variants={itemVariants}
              className="flex-1"
            >
              <BookingPreview
                courtId={court.id}
                courtName={court.name}
                courtType={court.type}
                courtImage={court.image}
                price={court.price}
                features={court.features}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSection;
