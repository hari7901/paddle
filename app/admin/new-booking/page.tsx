"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Phone, Mail, ChevronLeft } from "lucide-react";

/* ---------- types ---------- */
type Court = {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
};
type Slot = { id: string; time: string; available: boolean };

export default function NewAdminBooking() {
  const router = useRouter();

  /* courts ----------------------------------------------------------- */
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/courts");
      setCourts(await res.json());
    })();
  }, []);

  /* date ------------------------------------------------------------- */
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  /* slots ------------------------------------------------------------ */
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  useEffect(() => {
    if (!selectedCourt || !date) return;
    (async () => {
      const res = await fetch(
        `/api/slots?courtId=${selectedCourt.id}&date=${date}`
      );
      setSlots(await res.json());
      setSelectedSlot(null);
    })();
  }, [selectedCourt, date]);

  /* customer form ---------------------------------------------------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "cash" as "cash" | "card",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* submit ----------------------------------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourt || !selectedSlot) return alert("Pick slot & court");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courtId: selectedCourt.id,
          courtName: selectedCourt.name,
          courtType: selectedCourt.type,
          price: selectedCourt.price,
          date,
          slotId: selectedSlot.id,
          time: selectedSlot.time,
          name: form.name,
          email: form.email,
          phone: form.phone,
          paymentMethod: form.paymentMethod,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.push("/admin/bookings");
    } catch (err: any) {
      alert(err.message || "Failed to create booking");
    }
  };

  /* helpers ---------------------------------------------------------- */
  const formatDateLong = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  /* ---------------------------- UI --------------------------------- */
  return (
    <div className="pt-32 px-4 md:px-8 max-w-4xl mx-auto">
      <Link
        href="/admin/bookings"
        className="text-gray-300 hover:text-green-400 flex items-center mb-6"
      >
        <ChevronLeft size={18} className="mr-1" />
        Back to bookings
      </Link>

      <h1 className="text-2xl font-bold mb-6">New Booking (Admin)</h1>

      {/* court + date */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* court selector */}
        <div>
          <label className="font-medium mb-2 block">Court</label>
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
            value={selectedCourt?.id ?? ""}
            onChange={(e) =>
              setSelectedCourt(
                courts.find((c) => c.id === e.target.value) || null
              )
            }
          >
            <option value="" disabled>
              Select court…
            </option>
            {courts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.type}) — ₹{c.price}/h
              </option>
            ))}
          </select>
        </div>

        {/* date picker */}
        <div>
          <label className="font-medium mb-2 block">Date</label>
          <input
            type="date"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* time slots */}
      {selectedCourt && (
        <div className="mb-8">
          <h2 className="font-medium mb-3">
            Time Slots for {formatDateLong(date)}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {slots.map((s) => (
              <button
                key={s.id}
                disabled={!s.available}
                onClick={() => setSelectedSlot(s)}
                className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                  !s.available
                    ? "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
                    : selectedSlot?.id === s.id
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-gray-900 border-gray-700 text-gray-300 hover:border-green-500"
                }`}
              >
                {s.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* customer & payment */}
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-lg font-medium mb-4">Customer Details</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Phone *</label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-gray-400"
                size={16}
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 p-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 p-2 text-sm"
            />
          </div>
        </div>

        <h2 className="text-lg font-medium mb-4">Payment Method</h2>
        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={form.paymentMethod === "cash"}
              onChange={handleChange}
            />
            Cash / Pay on site
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={form.paymentMethod === "card"}
              onChange={handleChange}
            />
            Card
          </label>
        </div>

        <button
          type="submit"
          disabled={!selectedCourt || !selectedSlot}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg disabled:opacity-50"
        >
          Create Booking
        </button>
      </form>
    </div>
  );
}
