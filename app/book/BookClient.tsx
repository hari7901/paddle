"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CreditCard,
  Check,
  ArrowLeft,
  User,
  Phone,
  Mail,
} from "lucide-react";

export default function BookClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  // Booking details from query string
  const date = searchParams.get("date") || "";
  const courtId = searchParams.get("courtId") || "";
  const courtName = searchParams.get("courtName") || "";
  const courtType = searchParams.get("courtType") || "";
  const price = searchParams.get("price") || "";
  const slotId = searchParams.get("slotId") || "";
  const time = searchParams.get("time") || "";

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "card",
    agreeToTerms: false,
  });

  /* helpers */
  const formatDate = (iso: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.agreeToTerms
    ) {
      window.alert(
        "Please fill in all required fields and agree to the terms."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // API call to create booking
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courtId,
          courtName,
          courtType,
          price,
          date,
          slotId,
          time,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create booking");
      }

      setBookingReference(result.data._id);
      setBookingComplete(true);
    } catch (error) {
      console.error("Booking error:", error);
      window.alert(
        "Failed to complete booking. The slot may no longer be available."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* redirect if params missing */
  useEffect(() => {
    if (!date || !courtId || !time) router.push("/");
  }, [date, courtId, time, router]);

  /* ---------------- render ---------------- */
  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-black text-white pt-35 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg p-8 border-2 border-green-800">
            {/* confirmation */}
            <div className="text-center mb-8">
              <div className="bg-green-600 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-gray-300">
                Your court has been successfully booked.
              </p>
              {bookingReference && (
                <p className="text-sm text-gray-400 mt-2">
                  Booking Reference: {bookingReference}
                </p>
              )}
            </div>

            {/* summary */}
            <div className="border-t border-b border-gray-700 py-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="font-medium">{formatDate(date)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Time</p>
                  <p className="font-medium">{time}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Court</p>
                  <p className="font-medium">
                    {courtName} ({courtType})
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Price</p>
                  <p className="font-medium text-green-400">₹{price}</p>
                </div>
              </div>
            </div>

            {/* instructions */}
            <div className="mb-8">
              <h2 className="font-bold text-xl mb-3">Booking Instructions</h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Please arrive 15&nbsp;minutes before your booking time.
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Bring your booking confirmation (sent to your email).
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Sports shoes are mandatory on our courts.
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Equipment rental is available at an additional cost.
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <Link
                href="/"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* booking form */
  return (
    <div className="min-h-screen bg-black text-white pt-35 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/book-slots?courtId=${courtId}`}
            className="inline-flex items-center text-gray-300 hover:text-green-400 mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Time Slots
          </Link>

          <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-gray-300 mb-8">
            Fill in your details to confirm your court reservation.
          </p>

          {/* summary */}
          <div className="bg-gray-900 rounded-lg p-6 border-2 border-green-800 mb-8">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar size={18} className="text-green-400 mr-2" />
                <span className="text-gray-300 mr-2">Date:</span>
                <span className="font-medium">{formatDate(date)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="text-green-400 mr-2" />
                <span className="text-gray-300 mr-2">Time:</span>
                <span className="font-medium">{time}</span>
              </div>
            </div>

            <div className="flex items-start mt-4">
              <div
                className="bg-gray-800 h-12 w-12 rounded-md overflow-hidden mr-3 mt-1 flex-shrink-0"
                style={{
                  backgroundImage:
                    courtType === "Singles"
                      ? "url('/paddle3.jpg')"
                      : "url('/paddle4.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div>
                <p className="font-medium">{courtName}</p>
                <p className="text-gray-400 text-sm">{courtType} Court</p>
                <p className="text-green-400 font-bold">₹{price}</p>
              </div>
            </div>
          </div>

          {/* form */}
          <div className="bg-gray-900 rounded-lg p-6 border-2 border-green-800">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            <form onSubmit={handleSubmit}>
              {/* name */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-10 w-full text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-10 w-full text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* phone */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-300 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Your phone number"
                    className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-10 w-full text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* payment */}
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="mb-6">
                <label className="flex items-center mb-3">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                    className="mr-2 text-green-500 focus:ring-green-500"
                  />
                  <CreditCard size={16} className="mr-2 text-gray-400" />
                  Credit/Debit Card
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleInputChange}
                    className="mr-2 text-green-500 focus:ring-green-500"
                  />
                  Pay at Location
                </label>
              </div>

              {/* terms */}
              <div className="mb-8">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                    className="mt-1 mr-2 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-gray-300 text-sm">
                    I agree to the booking terms and conditions, including the
                    cancellation policy.
                  </span>
                </label>
              </div>

              {/* submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-3 rounded-lg font-medium flex justify-center items-center ${
                  isSubmitting
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing…
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
