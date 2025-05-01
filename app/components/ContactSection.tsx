// app/components/ContactSection.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div
      className="py-20 bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white relative overflow-hidden"
      id="contact"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E3D5A]/0 via-[#E99E1B] to-[#2E3D5A]/0"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#5A8FC8]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5A8FC8]/20 rounded-full blur-3xl"></div>

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
            className="inline-block bg-[#191A24]/30 rounded-full px-4 py-1 mb-4"
          >
            <span className="text-[#E99E1B] text-sm font-semibold tracking-wider uppercase">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Contact Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-[#CCCCCC] max-w-2xl mx-auto"
          >
            Have questions or need assistance? Reach out to our team and we'll
            get back to you as soon as possible.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 50,
          }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-[#191A24] to-[#4D789D] rounded-xl shadow-2xl overflow-hidden border border-[#4D789D]"
        >
          <div className="md:flex">
            {/* Contact Information */}
            <div className="md:w-1/3 bg-[#191A24]/30 text-white p-8 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E3D5A]/0 via-[#E99E1B] to-[#2E3D5A]/0"></div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>

              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-center mb-3 transition-colors group-hover:text-[#4D789D]">
                    <Phone size={20} className="mr-3 text-[#4D789D]" />
                    <h4 className="font-bold">Phone</h4>
                  </div>
                  <p className="pl-8 text-[#CCCCCC] group-hover:text-white transition-colors">
                    +91 90410 13409
                  </p>
                </div>

                <div className="group">
                  <div className="flex items-center mb-3 transition-colors group-hover:text-[#4D789D]">
                    <Mail size={20} className="mr-3 text-[#4D789D]" />
                    <h4 className="font-bold">Email</h4>
                  </div>
                  <p className="pl-8 text-[#CCCCCC] group-hover:text-white transition-colors">
                    proplaysports032@gmail.com
                  </p>
                </div>

                <div className="group">
                  <div className="flex items-center mb-3 transition-colors group-hover:text-[#4D789D]">
                    <MapPin size={20} className="mr-3 text-[#4D789D]" />
                    <h4 className="font-bold">Address</h4>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/5QdYzyt2853gVvCS6?g_st=com.google.maps.preview.copy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pl-8 text-[#CCCCCC] group-hover:text-white transition-colors hover:underline"
                  >
                    Ozmo Gym &amp; Spa – South City, Ludhiana
                  </a>
                </div>

                <div className="group">
                  <div className="flex items-center mb-3 transition-colors group-hover:text-[#4D789D]">
                    <Clock size={20} className="mr-3 text-[#4D789D]" />
                    <h4 className="font-bold">Business Hours</h4>
                  </div>
                  <p className="pl-8 text-[#CCCCCC] group-hover:text-white transition-colors">
                    Mon–Fri: 9 AM – 9 PM
                    <br />
                    Sat–Sun: 8 AM – 8 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#191A24]/30 border border-[#4D789D] text-[#4D789D] px-4 py-3 rounded mb-6"
                >
                  <p>Thank you for your message! We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[#CCCCCC] font-medium mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#E99E1B] focus:border-[#E99E1B] text-white"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[#CCCCCC] font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#E99E1B] focus:border-[#E99E1B] text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[#CCCCCC] font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#E99E1B] focus:border-[#E99E1B] text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[#CCCCCC] font-medium mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#E99E1B] focus:border-[#E99E1B] text-white"
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center bg-[#E99E1B] hover:bg-[#D68E13] text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2 text-[#4D789D]" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
