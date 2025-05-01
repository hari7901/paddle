// app/book/book.tsx
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
  const sp = useSearchParams();
  const router = useRouter();

  /* ------------ booking data from URL -------------------------- */
  const date = sp.get("date") || "";
  const courtId = sp.get("courtId") || "";
  const courtName = sp.get("courtName") || "";
  const courtType = sp.get("courtType") || "";
  const price = sp.get("price") || "";
  const slotIds = (sp.get("slotIds") || "").split(",").filter(Boolean);
  const times = (sp.get("times") || "").split(",").filter(Boolean);

  /* ------------ component state -------------------------------- */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    localNumber: "",
    paymentMethod: "card" as "card" | "cash",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    agreeToTerms: "",
  });

  /* ------------ helpers ---------------------------------------- */
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const validate = () => {
    const errs = { name: "", email: "", phone: "", agreeToTerms: "" };

    // Name
    if (!formData.name.trim()) {
      errs.name = "Name is required.";
    } else if (!/^[A-Za-z ]{3,}$/.test(formData.name.trim())) {
      errs.name = "Enter a valid name (min 3 letters).";
    }

    // Email (@gmail.com)
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@gmail\.com$/.test(formData.email.trim())) {
      errs.email = "Enter a valid @gmail.com address.";
    }

    // Phone (just local 10 digits)
    if (!/^[6-9]\d{9}$/.test(formData.localNumber)) {
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    // Terms
    if (!formData.agreeToTerms) {
      errs.agreeToTerms = "You must accept the terms.";
    }

    setErrors(errs);
    return !Object.values(errs).some(Boolean);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ------------ submit handler --------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const phone = "+91" + formData.localNumber;
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courtId,
          courtName,
          courtType,
          price: Number(price),
          date,
          slotIds,
          times,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone,
          paymentMethod: formData.paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        // show the API error (including 409 slot clash)
        alert(data.error || "Could not complete booking");
      } else {
        setBookingRef(data.data._id);
        setUserEmail(formData.email.trim());
        setBookingComplete(true);
      }
    } catch {
      alert("Network error — please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------ guard: missing params -------------------------- */
  useEffect(() => {
    if (!date || !courtId || slotIds.length === 0) router.push("/");
  }, [date, courtId, slotIds, router]);

  /* ------------ booking complete view -------------------------- */
  if (bookingComplete)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white pt-40 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#191A24] to-[#4D789D] rounded-lg p-8 border-2 border-[#4D789D] text-center">
            <div className="mb-6">
              <div className="bg-[#E99E1B] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-[#CCCCCC]">Your court has been booked.</p>
              {bookingRef && (
                <p className="text-sm text-[#CCCCCC] mt-2">Ref: {bookingRef}</p>
              )}
              <p className="text-[#CCCCCC] mt-4">
                A confirmation email has been sent to{" "}
                <strong>{userEmail}</strong>.
              </p>
            </div>
            <Link
              href="/"
              className="bg-[#E99E1B] hover:bg-[#D68E13] px-6 py-3 rounded-lg text-white"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );

  /* ------------ booking form view ----------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white pt-40 pb-16">
      <div className="container mx-auto px-4">
        <Link
          href={`/book-slots?courtId=${courtId}`}
          className="inline-flex items-center text-[#CCCCCC] hover:text-[#E99E1B] mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Time Slots
        </Link>

        <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
        <p className="text-[#CCCCCC] mb-8">
          Fill in your details to confirm your reservation.
        </p>

        {/* Booking Summary */}
        <div className="bg-gradient-to-br from-[#191A24] to-[#4D789D] rounded-lg p-6 border-2 border-[#4D789D] mb-8">
          <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar size={18} className="text-[#4D789D] mr-2" />
              <span className="mr-2 text-[#CCCCCC]">Date:</span>
              <span className="font-medium">{formatDate(date)}</span>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="text-[#4D789D] mr-2" />
              <span className="mr-2 text-[#CCCCCC]">Time:</span>
              <span className="font-medium">{times.join(" | ")}</span>
            </div>
          </div>
          <div className="flex items-start mt-4">
            <div
              className="bg-gradient-to-br from-[#191A24] to-[#4D789D] h-12 w-12 rounded-md overflow-hidden mr-3 mt-1 flex-shrink-0"
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
              <p className="text-[#CCCCCC] text-sm">{courtType} Court</p>
              <p className="text-[#E99E1B] font-bold">₹{price}</p>
            </div>
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="bg-gradient-to-br from-[#191A24] to-[#4D789D] rounded-lg p-6 border-2 border-[#4D789D]">
          <h2 className="text-xl font-bold mb-6">Personal Information</h2>
          <form onSubmit={handleSubmit}>
            <InputRow
              icon={<User size={16} className="text-[#CCCCCC]" />}
              id="name"
              label="Full Name *"
              type="text"
              value={formData.name}
              onChange={onInput}
              required
              error={errors.name}
            />
            <InputRow
              icon={<Mail size={16} className="text-[#CCCCCC]" />}
              id="email"
              label="Email (@gmail.com) *"
              type="email"
              value={formData.email}
              onChange={onInput}
              required
              error={errors.email}
            />
            <div className="mb-4">
              <label htmlFor="phone" className="block text-[#CCCCCC] mb-2">
                Phone Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-800 border border-r-0 border-gray-700 text-white rounded-l-lg">
                  +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="localNumber"
                  value={formData.localNumber}
                  onChange={onInput}
                  placeholder="XXXXXXXXXX"
                  required
                  className="bg-gray-800 border border-gray-700 rounded-r-lg py-2 px-3 flex-1 text-white focus:ring-1 focus:ring-[#E99E1B] focus:border-[#E99E1B]"
                />
              </div>
              {errors.phone && (
                <p className="text-[#FF6B6B] text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="mb-6">
              <Radio
                id="card"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={onInput}
                icon={<CreditCard size={16} className="text-[#CCCCCC] mr-2" />}
                label="Credit/Debit Card"
              />
              <Radio
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === "cash"}
                onChange={onInput}
                label="Pay at Location"
              />
            </div>

            <div className="mb-8">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={onInput}
                  className="mt-1 mr-2 text-[#E99E1B] focus:ring-[#E99E1B]"
                />
                <span className="text-[#CCCCCC] text-sm">
                  I agree to the booking terms and conditions, including the
                  cancellation policy.
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-[#FF6B6B] text-sm mt-1">
                  {errors.agreeToTerms}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full py-3 rounded-lg font-medium flex justify-center items-center text-white ${
                isSubmitting
                  ? "bg-[#4D789D] cursor-not-allowed"
                  : "bg-[#E99E1B] hover:bg-[#D68E13]"
              }`}
            >
              {isSubmitting ? <Spinner /> : "Confirm Booking"}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Reusable input row component
function InputRow({
  icon,
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  error,
}: {
  icon: React.ReactNode;
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-[#CCCCCC] mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-3">{icon}</span>
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={label.replace(" *", "")}
          className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-10 w-full text-white focus:ring-1 focus:ring-[#E99E1B] focus:border-[#E99E1B]"
        />
      </div>
      {error && <p className="text-[#FF6B6B] text-sm mt-1">{error}</p>}
    </div>
  );
}

// Reusable radio component
function Radio({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  icon,
}: {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="flex items-center mb-3 text-[#CCCCCC]">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mr-2 text-[#E99E1B] focus:ring-[#E99E1B]"
      />
      {icon}
      {label}
    </label>
  );
}

// Spinner for loading state
function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        className="opacity-25"
      />
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        className="opacity-75"
      />
    </svg>
  );
}
