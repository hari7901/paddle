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

  /*  NEW: multiple slots  */
  const slotIds = (sp.get("slotIds") || "").split(",").filter(Boolean);
  const times = (sp.get("times") || "").split(",").filter(Boolean);

  /* ------------ component state -------------------------------- */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "card" as "card" | "cash",
    agreeToTerms: false,
  });

  /* ------------ helpers ---------------------------------------- */
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ------------ submit handler --------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.agreeToTerms
    ) {
      alert("Fill all fields and accept the terms.");
      return;
    }
    setIsSubmitting(true);
    try {
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          paymentMethod: formData.paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create booking");
      setBookingRef(data.data._id);
      setBookingComplete(true);
    } catch {
      alert("Could not complete booking — slot may be taken.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------ guard: missing params -------------------------- */
  useEffect(() => {
    if (!date || !courtId || slotIds.length === 0) router.push("/");
  }, [date, courtId, slotIds, router]);

  if (bookingComplete)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white pt-35 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#191A24] to-[#4D789D] rounded-lg p-8 border-2 border-[#4D789D]">
            <div className="text-center mb-8">
              <div className="bg-[#E99E1B] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-[#CCCCCC]">
                Your court has been successfully booked.
              </p>
              {bookingRef && (
                <p className="text-sm text-[#CCCCCC] mt-2">Ref: {bookingRef}</p>
              )}
            </div>

            <div className="border-t border-b border-[#4D789D] py-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#CCCCCC] text-sm">Date</p>
                  <p className="font-medium">{formatDate(date)}</p>
                </div>
                <div>
                  <p className="text-[#CCCCCC] text-sm">Time</p>
                  {times.map((t) => (
                    <p key={t} className="font-medium">
                      {t}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-[#CCCCCC] text-sm">Court</p>
                  <p className="font-medium">
                    {courtName} ({courtType})
                  </p>
                </div>
                <div>
                  <p className="text-[#CCCCCC] text-sm">Total</p>
                  <p className="font-medium text-[#E99E1B]">₹{price}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                href="/"
                className="bg-[#E99E1B] hover:bg-[#D68E13] px-6 py-3 rounded-lg text-white"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white pt-35 pb-16">
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

        <div className="bg-gradient-to-br from-[#191A24] to-[#4D789D] rounded-lg p-6 border-2 border-[#4D789D]">
          <h2 className="text-xl font-bold mb-6">Personal Information</h2>
          <form onSubmit={handleSubmit}>
            <InputRow
              icon={<User size={16} className="text-[#CCCCCC]" />}
              id="name"
              label="Full Name *"
              value={formData.name}
              onChange={onInput}
              required
            />
            <InputRow
              icon={<Mail size={16} className="text-[#CCCCCC]" />}
              id="email"
              type="email"
              label="Email Address *"
              value={formData.email}
              onChange={onInput}
              required
            />
            <InputRow
              icon={<Phone size={16} className="text-[#CCCCCC]" />}
              id="phone"
              type="tel"
              label="Phone Number *"
              value={formData.phone}
              onChange={onInput}
              required
            />

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
                  required
                  className="mt-1 mr-2 text-[#E99E1B] focus:ring-[#E99E1B]"
                />
                <span className="text-[#CCCCCC] text-sm">
                  I agree to the booking terms and conditions, including the
                  cancellation policy.
                </span>
              </label>
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

function InputRow({
  icon,
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  icon: React.ReactNode;
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
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
    </div>
  );
}

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

function Spinner() {
  return (
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
  );
}
