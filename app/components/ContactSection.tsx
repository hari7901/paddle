// app/components/ContactSection.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, MapPin, Clock } from "lucide-react";

const ACCENT = "#E99E1B";

export default function ContactSection() {
  /* ---------------- state ---------------- */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  /* ---------------- handlers ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- render ---------------- */
  return (
    <section
      id="contact"
      className="py-20 bg-white text-black relative overflow-hidden"
    >
      {/* accent line + soft blobs */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E99E1B]/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* ---------- header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-black/10 rounded-full px-4 py-1 mb-4 text-[#E99E1B] text-sm font-semibold uppercase tracking-wider">
            Get in Touch
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Have questions or need assistance? Reach out and we’ll respond
            promptly.
          </p>
        </motion.div>

        {/* ---------- card ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-xl shadow-xl overflow-hidden border border-black/10 bg-white"
        >
          <div className="md:flex">
            {/* -------- info pane -------- */}
            <div className="md:w-1/3 bg-black text-white p-8 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E99E1B] to-transparent" />
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

              <ul className="space-y-6">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+91 90410 13409",
                  },
                  {
                    icon: Phone,
                    label: "Phone (alt)",
                    value: "+91 98551 77676",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "proplaysports032@gmail.com",
                  },
                  {
                    icon: MapPin,
                    label: "Address",
                    value: "Proyard Padel South City, Ludhiana",
                    link: "https://maps.app.goo.gl/5QdYzyt2853gVvCS6?g_st=com.google.maps.preview.copy",
                  },
                  {
                    icon: Clock,
                    label: "Business Hours",
                    value: "Mon–Sun 6 AM–10 PM",
                  },
                ].map(({ icon: Icon, label, value, link }) => (
                  <li key={label} className="group">
                    <div className="flex items-center mb-3">
                      <Icon size={20} className="mr-3 text-[#E99E1B]" />
                      <h4 className="font-bold">{label}</h4>
                    </div>
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pl-8 text-white/80 hover:text-[#E99E1B] underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="pl-8 text-white/80">{value}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* -------- form pane -------- */}
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/5 border border-black/10 text-black px-4 py-3 rounded mb-6"
                >
                  Thank you! We’ll reply shortly.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* name */}
                  <div>
                    <label htmlFor="name" className="block font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-black/10 rounded-lg
                                 focus:ring-2 focus:ring-[#E99E1B] focus:border-[#E99E1B]"
                      required
                    />
                  </div>

                  {/* email */}
                  <div>
                    <label htmlFor="email" className="block font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-black/10 rounded-lg
                                 focus:ring-2 focus:ring-[#E99E1B] focus:border-[#E99E1B]"
                      required
                    />
                  </div>
                </div>

                {/* phone */}
                <div>
                  <label htmlFor="phone" className="block font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-black/10 rounded-lg
                               focus:ring-2 focus:ring-[#E99E1B] focus:border-[#E99E1B]"
                  />
                </div>

                {/* message */}
                <div>
                  <label htmlFor="message" className="block font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-black/10 rounded-lg
                               focus:ring-2 focus:ring-[#E99E1B] focus:border-[#E99E1B]"
                    required
                  />
                </div>

                {/* submit */}
                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.96 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-[#E99E1B] hover:bg-[#CF8A17]
                             text-black font-bold py-3 rounded-lg disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
