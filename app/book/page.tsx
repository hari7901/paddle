// app/book/page.tsx
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

const BookPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Get booking details from URL parameters
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

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.agreeToTerms
    ) {
      alert("Please fill in all required fields and agree to the terms.");
      return;
    }

    // Submit booking
    setIsSubmitting(true);

    // Simulate booking API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingComplete(true);

      // In a real application, you would make an API call to your backend
      // to create the booking in your database
    }, 1500);
  };

  // If booking parameters are missing, redirect to the home page
  useEffect(() => {
    if (!date || !courtId || !time) {
      router.push("/");
    }
  }, [date, courtId, time, router]);

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg p-8 border-2 border-green-800">
            <div className="text-center mb-8">
              <div className="bg-green-600 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-gray-300">
                Your court has been successfully booked.
              </p>
            </div>

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

            <div className="mb-8">
              <h2 className="font-bold text-xl mb-3">Booking Instructions</h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>
                    Please arrive 15 minutes before your booking time.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>
                    Bring your booking confirmation (sent to your email).
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>
                    Sports shoes are mandatory for playing on our courts.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>
                    Equipment rental is available at an additional cost.
                  </span>
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

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
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

          {/* Booking Summary */}
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
                  backgroundImage: `url(${
                    courtType === "Singles" ? "/paddle3.jpg" : "/paddle4.jpg"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div>
                <p className="font-medium">{courtName}</p>
                <p className="text-gray-400 text-sm">{courtType} Court</p>
                <p className="text-green-400 font-bold">₹{price}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-gray-900 rounded-lg p-6 border-2 border-green-800">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>

            <form onSubmit={handleSubmit}>
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
                    className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-10 w-full text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

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
                    className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-10 w-full text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

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
                    className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-10 w-full text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="Your phone number"
                    required
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4">Payment Method</h2>

              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                    className="mr-2 text-green-500 focus:ring-green-500"
                  />
                  <label htmlFor="card" className="flex items-center">
                    <CreditCard size={16} className="mr-2 text-gray-400" />
                    Credit/Debit Card
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleInputChange}
                    className="mr-2 text-green-500 focus:ring-green-500"
                  />
                  <label htmlFor="cash">Pay at Location</label>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 mr-2 text-green-500 focus:ring-green-500"
                    required
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="text-gray-300 text-sm"
                  >
                    I agree to the booking terms and conditions, including the
                    cancellation policy.
                  </label>
                </div>
              </div>

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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
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
};

export default BookPage;
