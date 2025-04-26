/* app/admin/bookings/page.tsx */
"use client";

import { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import Link from "next/link";
import {
  Trash2,
  Loader2,
  ShieldAlert,
  Search,
  XCircle,
  Filter,
} from "lucide-react";

type Booking = {
  _id: string;
  name: string;
  phone: string;
  courtName: string;
  courtType: string;
  price: number;
  paymentMethod: string; // "card" | "cash"
  date: string;
  time: string;
  createdAt: string;
};

const bearer = `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`;

export default function AdminBookings() {
  /* ---------- state ---------- */
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* search + filters */
  const [q, setQ] = useState("");
  const [filterDate, setDate] = useState("");
  const [filterCourt, setCourt] = useState("All");
  const [filterTime, setTime] = useState("All");

  /* ---------- fetch ---------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/bookings", {
          headers: { Authorization: bearer },
        });
        if (!res.ok) throw new Error();
        setBookings(await res.json());
      } catch {
        setError("Not authorised or failed to load.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------- delete ---------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: bearer },
      });
      if (!res.ok) throw new Error();
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to cancel booking.");
    }
  };

  /* ---------- filter lists ---------- */
  const courtTypes = useMemo(
    () => Array.from(new Set(bookings.map((b) => b.courtType))).sort(),
    [bookings]
  );
  const timeSlots = useMemo(
    () => Array.from(new Set(bookings.map((b) => b.time))).sort(),
    [bookings]
  );

  /* ---------- combined filtering ---------- */
  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesText =
        !q.trim() ||
        b.name.toLowerCase().includes(q.toLowerCase()) ||
        b.phone.includes(q);

      const matchesDate = !filterDate || b.date === filterDate;
      const matchesCourt = filterCourt === "All" || b.courtType === filterCourt;
      const matchesTime = filterTime === "All" || b.time === filterTime;

      return matchesText && matchesDate && matchesCourt && matchesTime;
    });
  }, [bookings, q, filterDate, filterCourt, filterTime]);

  /* ---------- UI ---------- */
  if (loading)
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="animate-spin mr-2" /> Loading…
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-red-500 flex items-center">
        <ShieldAlert className="mr-2" /> {error}
      </div>
    );

  return (
    <div className="pt-32 px-4 md:px-8 max-w-6xl mx-auto">
      {/* header with New Booking button */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <Link
          href="/admin/new-booking"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1"
        >
          <span className="text-xl leading-none">＋</span> New&nbsp;Booking
        </Link>
      </div>

      {/* search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-10 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm"
          placeholder="Search name or phone…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q && (
          <button
            className="absolute right-3 top-[0.55rem] text-gray-400 hover:text-gray-300"
            onClick={() => setQ("")}
          >
            <XCircle size={18} />
          </button>
        )}
      </div>

      {/* filters */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-sm">
          <Filter size={16} className="text-green-400" />
          <span className="font-medium">Filters:</span>
        </div>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />

        <select
          value={filterTime}
          onChange={(e) => setTime(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
        >
          <option>All</option>
          {timeSlots.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select
          value={filterCourt}
          onChange={(e) => setCourt(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
        >
          <option>All</option>
          {courtTypes.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {(filterDate || filterTime !== "All" || filterCourt !== "All") && (
          <button
            onClick={() => {
              setDate("");
              setTime("All");
              setCourt("All");
            }}
            className="ml-auto text-sm text-red-400 hover:text-red-300"
          >
            Clear
          </button>
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Court</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-center w-16">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, idx) => (
              <tr
                key={b._id}
                className={
                  idx % 2
                    ? "bg-gray-900/60"
                    : "bg-gray-900/40 hover:bg-gray-800"
                }
              >
                <td className="px-4 py-3 text-gray-200">
                  {format(new Date(b.createdAt), "dd MMM yy · HH:mm")}
                </td>
                <td className="px-4 py-3 text-gray-200">{b.date}</td>
                <td className="px-4 py-3 text-gray-200">{b.time}</td>
                <td className="px-4 py-3 text-gray-200">
                  {b.courtName}{" "}
                  <span className="text-xs text-gray-400">({b.courtType})</span>
                </td>
                <td className="px-4 py-3 text-gray-200">
                  {b.name}
                  <br />
                  <span className="text-gray-400">{b.phone}</span>
                </td>
                <td className="px-4 py-3 text-right text-gray-200">
                  ₹{b.price}
                </td>
                <td className="px-4 py-3 text-gray-200">
                  {b.paymentMethod === "card" ? "Card" : "Pay on site"}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="text-red-500 hover:text-red-600"
                    title="Cancel booking"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && (
          <p className="text-center text-gray-400 mt-8">No bookings match.</p>
        )}
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {filtered.map((b) => (
          <div
            key={b._id}
            className="border border-gray-800 rounded-lg p-4 bg-gray-900/70 flex flex-col gap-2"
          >
            <div className="flex justify-between text-xs text-gray-400">
              <span>{format(new Date(b.createdAt), "dd MMM '•' HH:mm")}</span>
              <button
                onClick={() => handleDelete(b._id)}
                className="text-red-500 hover:text-red-600"
                title="Cancel booking"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <p className="text-sm">
              <b>{b.courtName}</b> ({b.courtType})
            </p>

            <p className="text-sm">
              {b.date} • {b.time}
            </p>

            <p className="text-sm">{b.name}</p>
            <p className="text-xs text-gray-400">{b.phone}</p>

            <p className="text-sm">
              Payment:&nbsp;
              <span className="font-medium text-gray-200">
                {b.paymentMethod === "card" ? "Card" : "Pay on site"}
              </span>
            </p>

            <p className="text-sm text-green-400 font-semibold">₹{b.price}</p>
          </div>
        ))}

        {!filtered.length && (
          <p className="text-center text-gray-400 mt-6">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
