// app/components/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import { Award, Clock, Shield, Users } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: <Clock size={32} className="text-[#4D789D]" />,
      title: "Extended Hours",
      description:
        "Open from 6:00 AM to 11:00 PM every day to accommodate your busy schedule.",
    },
    {
      icon: <Award size={32} className="text-[#4D789D]" />,
      title: "Premium Quality",
      description:
        "State-of-the-art courts designed to professional standards for the best playing experience.",
    },
    {
      icon: <Users size={32} className="text-[#4D789D]" />,
      title: "For Everyone",
      description:
        "Courts suitable for all skill levels, from beginners to advanced players.",
    },
    {
      icon: <Shield size={32} className="text-[#4D789D]" />,
      title: "Safe Environment",
      description:
        "Regularly maintained facilities with appropriate safety measures in place.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="py-20 bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E3D5A]/0 via-[#E99E1B] to-[#2E3D5A]/0"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#5A8FC8]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5A8FC8]/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-block bg-[#191A24]/30 rounded-full px-4 py-1 mb-4"
          >
            <span className="text-[#E99E1B] text-sm font-semibold tracking-wider uppercase">
              Our Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            About ProPlay Sports
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-[#CCCCCC] max-w-2xl mx-auto"
          >
            We're dedicated to providing the best paddle court experience in the
            city, with premium facilities and flexible booking options.
          </motion.p>
        </motion.div>

        {/* Story and Image Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="flex flex-col lg:flex-row items-center gap-12 mb-16"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full group mb-8 lg:mb-0"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-64 md:h-80 lg:h-96 w-full">
              <img
                src="/paddle3.jpg"
                alt="ProPlay Sports Court"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-[#2E3D5A] opacity-50" />
            </div>
          </motion.div>

          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <h3 className="text-2xl font-bold mb-4">Our Story</h3>
            <p className="text-[#CCCCCC] mb-4">
              ProPlay Sports was founded in 2022 by paddle enthusiasts
              frustrated by the lack of quality courts in the city. Our mission
              was simple: create a premium facility where players of all levels
              could enjoy the sport they love in a welcoming environment.
            </p>
            <p className="text-[#CCCCCC] mb-4">
              Today, we're proud to offer two professional-grade courts - one
              for singles play (₹1,200/hour) and one for doubles (₹1,600/hour) -
              that meet the highest standards. Our courts are open to everyone,
              whether you're a beginner or an experienced player.
            </p>
            <p className="text-[#CCCCCC]">
              We believe paddle isn't just a sport – it's a community. We host
              regular events, tournaments, and social gatherings to foster
              camaraderie among our members.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#191A24] rounded-lg p-6 text-center transition-transform duration-300 hover:scale-105 shadow-lg border-2 border-[#4D789D]"
            >
              <div className="flex justify-center mb-4 transition-transform duration-300 group-hover:rotate-12">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-[#CCCCCC]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Facilities and Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-[#191A24] to-[#4D789D] text-white p-10 rounded-lg border-2 border-[#4D789D] shadow-2xl relative overflow-hidden"
        >
          {/* Subtle decorative overlay */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E3D5A]/0 via-[#E99E1B] to-[#2E3D5A]/0"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Our Facilities */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Facilities</h3>
              <p className="mb-4 text-[#CCCCCC]">
                At ProPlay Sports, we offer two state-of-the-art paddle courts:
              </p>
              <ul className="space-y-4 text-[#CCCCCC]">
                <li className="flex items-start group">
                  <span className="text-[#4D789D] mr-2 transition-colors group-hover:text-[#E99E1B]">
                    •
                  </span>
                  <div>
                    <span className="font-bold">Singles Court:</span>{" "}
                    ₹1,200/hour
                    <p className="mt-1 text-gray-400">
                      Ideal for one-on-one matches with perfect dimensions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="text-[#4D789D] mr-2 transition-colors group-hover:text-[#E99E1B]">
                    •
                  </span>
                  <div>
                    <span className="font-bold">Doubles Court:</span>{" "}
                    ₹1,600/hour
                    <p className="mt-1 text-gray-400">
                      Spacious court designed for team play.
                    </p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="text-[#4D789D] mr-2 transition-colors group-hover:text-[#E99E1B]">
                    •
                  </span>
                  <div>
                    <span className="font-bold">Operating Hours:</span> 6 AM–11
                    PM
                    <p className="mt-1 text-gray-400">
                      Extended hours with one-hour slots.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Why Choose Us */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Why Choose Us</h3>
              <ul className="space-y-3">
                {[
                  "Professional-grade courts with premium surfaces",
                  "24/7 online booking system",
                  "Flexible scheduling in one-hour increments",
                  "Clean, well-lit facilities",
                  "Regular tournaments and social events",
                  "Equipment rental available",
                ].map((reason, idx) => (
                  <li
                    key={idx}
                    className="flex items-start group transition-transform duration-300 hover:translate-x-2"
                  >
                    <span className="text-[#4D789D] mr-2 group-hover:text-[#E99E1B] transition-colors">
                      ✓
                    </span>
                    <span className="text-[#CCCCCC] group-hover:text-white transition-colors">
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
