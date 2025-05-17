"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Check,
  ArrowLeft,
  User,
  Phone,
  Mail,
} from "lucide-react";

const ACCENT = "#E99E1B"; // yellow
const ERROR = "#FF6B6B"; // red for validation

export default function BookClient() {
  /* ------------ booking data from URL -------------------------- */
  const sp = useSearchParams();
  const router = useRouter();
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
    paymentMethod: "cash", // Default to cash payment only
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

    if (!formData.name.trim()) {
      errs.name = "Name is required.";
    } else if (!/^[A-Za-z ]{3,}$/.test(formData.name.trim())) {
      errs.name = "Enter a valid name (min 3 letters).";
    }

    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@gmail\.com$/.test(formData.email.trim())) {
      errs.email = "Enter a valid @gmail.com address.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.localNumber)) {
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.agreeToTerms)
      errs.agreeToTerms = "You must accept the terms.";

    setErrors(errs);
    return !Object.values(errs).some(Boolean);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ------------ submit ----------------------------------------- */
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
          paymentMethod: "cash", // Always send cash as payment method
        }),
      });
      const data = await res.json();
      if (!res.ok) {
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
    if (!date || !courtId || slotIds.length === 0) router.replace("/");
  }, [date, courtId, slotIds, router]);

  /* ============================================================= */
  /* =======  CONFIRMATION  ====================================== */
  /* ============================================================= */
  if (bookingComplete)
    return (
      <section className="min-h-screen bg-white pt-40 pb-16 text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-black rounded-lg p-8 text-center shadow-xl">
            <div className="mb-6">
              <div
                className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: ACCENT }}
              >
                <Check size={32} className="text-black" />
              </div>
              <h1 className="text-3xl font-bold mb-2 text-white">
                Booking Confirmed!
              </h1>
              <p className="text-white/80">
                Your court has been booked.
                {bookingRef && (
                  <>
                    {" "}
                    Ref: <span className="font-semibold">{bookingRef}</span>
                  </>
                )}
              </p>
              <p className="text-white/80 mt-4">
                A confirmation email has been sent to&nbsp;
                <strong>{userEmail}</strong>.
              </p>
            </div>
            <Link
              href="/"
              className="inline-block bg-[#E99E1B] hover:bg-[#CF8A17] text-black font-semibold px-6 py-3 rounded-lg"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    );

  /* ============================================================= */
  /* =======  BOOKING FORM  ====================================== */
  /* ============================================================= */
  return (
    <section className="min-h-screen bg-white pt-40 pb-16 text-black">
      <div className="container mx-auto px-4">
        {/* back link */}
        <Link
          href={`/book-slots?courtId=${courtId}`}
          className="inline-flex items-center text-black/60 hover:text-[#E99E1B] mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Time Slots
        </Link>

        <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
        <p className="text-black/70 mb-8">
          Fill in your details to confirm your reservation.
        </p>

        {/* summary ------------------------------------------------ */}
        <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
          <div className="grid md:grid-cols-2 gap-4 text-black/80">
            <div className="flex items-center">
              <Calendar size={18} className="text-[#E99E1B] mr-2" />
              <span className="mr-2">Date:</span>
              <span className="font-medium">{formatDate(date)}</span>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="text-[#E99E1B] mr-2" />
              <span className="mr-2">Time:</span>
              <span className="font-medium">{times.join(" | ")}</span>
            </div>
          </div>

          <div className="flex items-start mt-4">
            <div
              className="h-12 w-12 rounded-md overflow-hidden mr-3 mt-1 flex-shrink-0"
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
              <p className="text-black/70 text-sm">{courtType} Court</p>
              <p className="text-[#E99E1B] font-bold">₹{price}</p>
            </div>
          </div>
        </div>

        {/* form --------------------------------------------------- */}
        <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Personal Information</h2>
          <form onSubmit={handleSubmit}>
            <InputRow
              icon={<User size={16} className="text-black/60" />}
              id="name"
              label="Full Name *"
              value={formData.name}
              onChange={onInput}
              error={errors.name}
              required
            />
            <InputRow
              icon={<Mail size={16} className="text-black/60" />}
              id="email"
              type="email"
              label="Email (@gmail.com) *"
              value={formData.email}
              onChange={onInput}
              error={errors.email}
              required
            />

            {/* phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block font-medium mb-2">
                Phone Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-black/5 border border-r-0 border-black/10 rounded-l-lg">
                  +91
                </span>
                <input
                  id="phone"
                  name="localNumber"
                  value={formData.localNumber}
                  onChange={onInput}
                  placeholder="XXXXXXXXXX"
                  className="flex-1 bg-white border border-black/10 rounded-r-lg px-3 py-2
                             focus:ring-1 focus:ring-[#E99E1B] focus:border-[#E99E1B]"
                  required
                />
              </div>
              {errors.phone && (
                <p className="text-[#FF6B6B] text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* payment */}
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={true}
                  readOnly
                  className="mr-2 text-[#E99E1B] focus:ring-[#E99E1B]"
                />
                <span>Pay at Location</span>
              </div>
              <p className="text-black/70 text-sm pl-6">
                Please pay in full at the venue before your scheduled time slot.
              </p>
            </div>

            {/* terms */}
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
                <span className="text-black/70 text-sm">
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

            {/* submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.96 }}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center
                ${
                  isSubmitting
                    ? "bg-black/40"
                    : "bg-[#E99E1B] hover:bg-[#CF8A17]"
                }`}
            >
              {isSubmitting ? <Spinner /> : "Confirm Booking"}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- helpers ------------------------------------ */
function InputRow({
  icon,
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  error = "",
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
      <label htmlFor={id} className="block font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-3">{icon}</span>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={label.replace(" *", "")}
          className="w-full bg-white border border-black/10 rounded-lg py-2 pl-10 pr-3
                     focus:ring-1 focus:ring-[#E99E1B] focus:border-[#E99E1B]"
        />
      </div>
      {error && <p className="text-[#FF6B6B] text-sm mt-1">{error}</p>}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
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
