// app/components/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import { Award, Clock, Shield, Users } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: <Clock size={32} className="text-green-400" />,
      title: "Extended Hours",
      description:
        "Open from 6:00 AM to 11:00 PM every day to accommodate your busy schedule.",
    },
    {
      icon: <Award size={32} className="text-green-400" />,
      title: "Premium Quality",
      description:
        "State-of-the-art courts designed to professional standards for the best playing experience.",
    },
    {
      icon: <Users size={32} className="text-green-400" />,
      title: "For Everyone",
      description:
        "Courts suitable for all skill levels, from beginners to advanced players.",
    },
    {
      icon: <Shield size={32} className="text-green-400" />,
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
    <div className="py-20 bg-black text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-900/0 via-green-600 to-green-900/0"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-900/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-900/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-block bg-green-900/30 rounded-full px-4 py-1 mb-4"
          >
            <span className="text-green-400 text-sm font-semibold tracking-wider uppercase">
              Our Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            About ProPlay Sports
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
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
            transition={{
              duration: 0.7,
              type: "spring",
              stiffness: 50,
            }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full group mb-8 lg:mb-0"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-64 md:h-80 lg:h-96 w-full">
              <img
                src="/paddle3.jpg"
                alt="ProPlay Sports Court"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-green-900 opacity-50" />
            </div>
          </motion.div>

          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              type: "spring",
              stiffness: 50,
            }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Our Story</h3>
            <p className="text-gray-300 mb-4">
              ProPlay Sports was founded in 2022 by a group of paddle
              enthusiasts who were frustrated by the lack of quality courts in
              the city. Our mission was simple: create a premium facility where
              players of all levels could enjoy the sport they love in a
              welcoming environment.
            </p>
            <p className="text-gray-300 mb-4">
              Today, we're proud to offer two professional-grade courts - one
              for singles play (₹1,200/hour) and one for doubles (₹1,600/hour) -
              that meet the highest standards. Our courts are open to everyone,
              whether you're a beginner looking to learn the basics or an
              experienced player wanting to refine your skills.
            </p>
            <p className="text-gray-300">
              We believe that paddle isn't just a sport – it's a community.
              That's why we host regular events, tournaments, and social
              gatherings to bring players together and foster a sense of
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
              className="bg-gray-900 rounded-lg p-6 text-center transition-all duration-300 
                         hover:transform hover:scale-105 hover:shadow-2xl 
                         border-2 border-green-900 hover:border-green-600"
            >
              <div
                className="flex justify-center mb-4 
                             transition-transform duration-300 
                             group-hover:rotate-12"
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Facilities and Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 50,
          }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-gray-900 to-black 
                     text-white p-10 rounded-lg border-2 border-green-800 
                     shadow-2xl relative overflow-hidden"
        >
          {/* Subtle decorative overlay */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-900/0 via-green-600 to-green-900/0"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Our Facilities */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Our Facilities
              </h3>
              <p className="mb-4 text-gray-300">
                At ProPlay Sports, we offer two state-of-the-art paddle courts:
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start group">
                  <span className="text-green-400 mr-2 group-hover:text-green-600 transition">
                    •
                  </span>
                  <div>
                    <span className="font-bold">Singles Court:</span> ₹1,200 per
                    hour
                    <p className="mt-1 text-gray-400">
                      Ideal for one-on-one matches with perfect dimensions for
                      singles play.
                    </p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="text-green-400 mr-2 group-hover:text-green-600 transition">
                    •
                  </span>
                  <div>
                    <span className="font-bold">Doubles Court:</span> ₹1,600 per
                    hour
                    <p className="mt-1 text-gray-400">
                      Spacious court designed for team play with ample room for
                      doubles matches.
                    </p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="text-green-400 mr-2 group-hover:text-green-600 transition">
                    •
                  </span>
                  <div>
                    <span className="font-bold">Operating Hours:</span> 6:00 AM
                    - 11:00 PM daily
                    <p className="mt-1 text-gray-400">
                      Extended hours to fit your schedule, with booking
                      available in one-hour slots.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Why Choose Us */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Why Choose Us
              </h3>
              <ul className="space-y-3">
                {[
                  "Professional-grade courts with the latest playing surfaces",
                  "Convenient online booking system available 24/7",
                  "Flexible scheduling with one-hour time slots",
                  "Clean, well-maintained facilities with excellent lighting",
                  "Regular tournaments and social events for the community",
                  "Equipment rental available for those without their own gear",
                ].map((reason, index) => (
                  <li
                    key={index}
                    className="flex items-start group transition-all duration-300 
                               hover:translate-x-2 hover:text-green-400"
                  >
                    <span className="text-green-400 mr-2 group-hover:text-white transition">
                      ✓
                    </span>
                    <span className="text-gray-300 group-hover:text-white transition">
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
