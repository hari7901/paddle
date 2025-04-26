"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  ArrowLeft,
} from "lucide-react";

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

type Court = {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
};

const BookSlotsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------- */
  /* 1. Court details from query string                 */
  /* -------------------------------------------------- */
  useEffect(() => {
    const courtId = searchParams.get("courtId") || "";

    // today in YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);

    // demo data – swap for API call in production
    if (courtId === "court-1") {
      setSelectedCourt({
        id: "court-1",
        name: "Singles Court",
        type: "Singles",
        price: 1200,
        image: "/paddle3.jpg",
      });
    } else if (courtId === "court-2") {
      setSelectedCourt({
        id: "court-2",
        name: "Doubles Court",
        type: "Doubles",
        price: 1600,
        image: "/paddle4.jpg",
      });
    }

    setLoading(false);
  }, [searchParams]);

  /* -------------------------------------------------- */
  /* 2. Generate demo time-slots                        */
  /* -------------------------------------------------- */
  useEffect(() => {
    if (!selectedDate) return;

    const slots: TimeSlot[] = [];

    // 6 AM → 11 PM
    for (let hour = 6; hour < 23; hour++) {
      const hourStr = hour.toString().padStart(2, "0");
      const nextStr = (hour + 1).toString().padStart(2, "0");

      slots.push({
        id: `slot-${hour - 5}`, // slot-1 … slot-17
        time: `${hourStr}:00 - ${nextStr}:00`,
        available: Math.random() > 0.3, // 70 % chance
      });
    }

    setTimeSlots(slots);
  }, [selectedDate]);

  /* -------------------------------------------------- */
  /* Helpers                                            */
  /* -------------------------------------------------- */
  const formatDate = (iso: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  const getNextSevenDays = () =>
    Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        value: date.toISOString().split("T")[0],
        display: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      };
    });

  const handleSlotClick = (slotId: string, time: string) => {
    if (!selectedCourt) return;

    const params = new URLSearchParams({
      date: selectedDate,
      courtId: selectedCourt.id,
      courtName: selectedCourt.name,
      courtType: selectedCourt.type,
      price: selectedCourt.price.toString(),
      slotId,
      time,
    });

    router.push(`/book?${params.toString()}`);
  };

  /* -------------------------------------------------- */
  /* Render                                             */
  /* -------------------------------------------------- */
  if (loading || !selectedCourt) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-16 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const availableDates = getNextSevenDays();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-gray-300 hover:text-green-400 mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* COURT CARD -------------------------------------- */}
          <div className="md:w-1/3">
            <div
              className="h-48 rounded-lg bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${selectedCourt.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
                <div>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    {selectedCourt.type}
                  </span>
                  <h1 className="text-white text-2xl font-bold mt-2">
                    {selectedCourt.name}
                  </h1>
                  <p className="text-green-400 font-bold mt-1">
                    ₹{selectedCourt.price}/hour
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DATE PICKER ------------------------------------ */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">
              Select a Date &amp; Time
            </h2>
            <p className="text-gray-300 mb-6">
              Choose from available time slots to book your court.
            </p>

            <div className="mb-8">
              <label className="block text-white font-medium mb-2">Date</label>
              <div className="flex overflow-x-auto pb-2">
                {availableDates.map((date) => (
                  <button
                    key={date.value}
                    type="button"
                    className={`p-3 border rounded-lg text-center transition-colors whitespace-nowrap mr-2 ${
                      selectedDate === date.value
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-700 hover:border-green-600 text-gray-300"
                    }`}
                    onClick={() => setSelectedDate(date.value)}
                  >
                    {date.display}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TIME-SLOTS GRID ---------------------------------- */}
        <div className="bg-gray-900 rounded-lg p-6 border-2 border-green-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              Available Time Slots for {formatDate(selectedDate)}
            </h3>
            <div className="text-sm text-gray-300 flex items-center">
              <Clock size={16} className="mr-2" />
              Operating Hours: 6:00 AM – 11:00 PM
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {timeSlots.map((slot) => (
              <motion.div
                key={slot.id}
                whileHover={{ scale: slot.available ? 1.05 : 1 }}
                whileTap={{ scale: slot.available ? 0.95 : 1 }}
                className={`p-4 rounded-lg text-center cursor-pointer border ${
                  slot.available
                    ? "border-green-600 bg-green-900/40 hover:bg-green-800"
                    : "border-gray-700 bg-gray-800 opacity-50 cursor-not-allowed"
                }`}
                onClick={() =>
                  slot.available && handleSlotClick(slot.id, slot.time)
                }
              >
                <p className="font-medium">{slot.time}</p>
                <p className="text-sm mt-1 text-gray-400">
                  {slot.available ? "Available" : "Booked"}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-sm text-gray-300 bg-gray-800 p-4 rounded-lg">
            <p className="flex items-center">
              <span className="bg-green-900/40 border border-green-600 w-4 h-4 rounded mr-2" />
              Available slots can be booked instantly
            </p>
            <p className="flex items-center mt-2">
              <span className="bg-gray-800 border border-gray-700 w-4 h-4 rounded mr-2" />
              Unavailable slots are already booked
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSlotsPage;
