// app/admin/bookings/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import {
  Trash2,
  Loader2,
  ShieldAlert,
  Search,
  XCircle,
  Filter,
  LogOut,
} from "lucide-react";

/* ---------- API shape ---------- */
type Booking = {
  _id: string;
  createdAt: string;
  date: string;
  times: string[];
  courtName: string;
  courtType: string;
  price: number;
  paymentMethod: "card" | "cash";
  name: string;
  phone: string;
};

export default function AdminBookings() {
  const router = useRouter();

  /* ---------- state ---------- */
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* search + filters */
  const [q, setQ] = useState("");
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const [filterDate, setDate] = useState(todayStr);
  const [filterCourt, setCourt] = useState("All");
  const [filterTime, setTime] = useState("All");

  /* ---------- fetch ---------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/bookings");
        if (res.status === 401) {
          router.replace("/admin/login?next=/admin/bookings");
          return;
        }
        if (!res.ok) throw new Error();
        const data: Booking[] = await res.json();
        setBookings(
          data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        );
      } catch {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  /* ---------- delete ---------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
      });
      if (res.status === 401) {
        router.replace("/admin/login?next=/admin/bookings");
        return;
      }
      if (!res.ok) throw new Error();
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to cancel booking.");
    }
  };

  /* ---------- logout ---------- */
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  /* ---------- filter helpers ---------- */
  const courtTypes = useMemo(
    () => Array.from(new Set(bookings.map((b) => b.courtType))).sort(),
    [bookings]
  );
  const timeSlots = useMemo(
    () => Array.from(new Set(bookings.flatMap((b) => b.times))).sort(),
    [bookings]
  );

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      // normalize booking date to YYYY-MM-DD
      const bookingDate = b.date.includes("T") ? b.date.split("T")[0] : b.date;

      const txt = q.trim().toLowerCase();
      const matchTxt =
        !txt || b.name.toLowerCase().includes(txt) || b.phone.includes(txt);
      const matchDate = !filterDate || bookingDate === filterDate;
      const matchCourt = filterCourt === "All" || b.courtType === filterCourt;
      const matchTime = filterTime === "All" || b.times.includes(filterTime);

      return matchTxt && matchDate && matchCourt && matchTime;
    });
  }, [bookings, q, filterDate, filterCourt, filterTime]);

  /* ---------- stats ---------- */
  const countFiltered = filtered.length;
  const earningsFiltered = filtered.reduce((sum, b) => sum + b.price, 0);
  const earningsAll = useMemo(
    () => bookings.reduce((sum, b) => sum + b.price, 0),
    [bookings]
  );

  /* ---------- UI ---------- */
  if (error)
    return (
      <div className="p-8 text-red-500 flex items-center">
        <ShieldAlert className="mr-2" /> {error}
      </div>
    );

  return (
    <div className="pt-32 px-4 md:px-8 max-w-6xl mx-auto relative">
      {/* overlay spinner */}
      {loading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 rounded-lg">
          <Loader2 className="animate-spin text-green-500 mr-2" /> Loading…
        </div>
      )}

      {/* header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/new-booking"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1"
          >
            <span className="text-xl leading-none">＋</span> New Booking
          </Link>
          <button
            onClick={logout}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-3 py-2 rounded-lg flex items-center gap-1"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </div>

      {/* statistics */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">Bookings</p>
          <p className="text-2xl font-bold">{countFiltered}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">Earnings</p>
          <p className="text-2xl font-bold text-green-400">
            ₹{earningsFiltered}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">Total Earnings</p>
          <p className="text-2xl font-bold text-green-400">₹{earningsAll}</p>
        </div>
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

        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={!filterDate}
            onChange={() => setDate("")}
            className="accent-green-500"
          />
          All dates
        </label>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setDate(e.target.value)}
          disabled={!filterDate}
          className="bg-gray-800 disabled:bg-gray-700 border border-gray-700 disabled:border-gray-600 rounded-lg px-3 py-1.5 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
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

        <button
          onClick={() => {
            setDate(todayStr);
            setTime("All");
            setCourt("All");
          }}
          className="ml-auto text-sm text-red-400 hover:text-red-300"
        >
          Reset
        </button>
      </div>

      {/* ───────── TABLE (desktop) ───────── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <TH>Created</TH>
              <TH>Date</TH>
              <TH>Time</TH>
              <TH>Court</TH>
              <TH>Customer</TH>
              <TH align="right">Price</TH>
              <TH>Payment</TH>
              <TH align="center" className="w-16">
                Cancel
              </TH>
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
                <TD>{format(new Date(b.createdAt), "dd MMM yy · HH:mm")}</TD>
                <TD>{b.date}</TD>
                <TD>{b.times.join(", ")}</TD>
                <TD>
                  {b.courtName}{" "}
                  <span className="text-xs text-gray-400">({b.courtType})</span>
                </TD>
                <TD>
                  {b.name}
                  <br />
                  <span className="text-gray-400">{b.phone}</span>
                </TD>
                <TD align="right" className="text-green-400 font-semibold">
                  ₹{b.price}
                </TD>
                <TD>{b.paymentMethod === "card" ? "Card" : "Pay on site"}</TD>
                <TD align="center">
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="text-red-500 hover:text-red-600"
                    title="Cancel booking"
                  >
                    <Trash2 size={18} />
                  </button>
                </TD>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && !loading && (
          <p className="text-center text-gray-400 mt-8">No bookings match.</p>
        )}
      </div>

      {/* ───────── CARDS (mobile) ───────── */}
      <div className="md:hidden space-y-4">
        {filtered.map((b) => (
          <div
            key={b._id}
            className="border border-gray-800 rounded-lg p-4 bg-gray-900/70"
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
            <p className="text-sm mt-1">
              <b>{b.courtName}</b> ({b.courtType})
            </p>
            <p className="text-sm mt-1">
              {b.date} • {b.times.join(", ")}
            </p>
            <p className="text-sm mt-1">{b.name}</p>
            <p className="text-xs text-gray-400">{b.phone}</p>
            <p className="text-sm mt-1">
              Payment:{" "}
              <span className="font-medium text-gray-200">
                {b.paymentMethod === "card" ? "Card" : "Pay on site"}
              </span>
            </p>
            <p className="text-sm text-green-400 font-semibold mt-1">
              ₹{b.price}
            </p>
          </div>
        ))}
        {!filtered.length && !loading && (
          <p className="text-center text-gray-400 mt-6">No bookings found.</p>
        )}
      </div>
    </div>
  );
}

/* ---------- tiny TD / TH helpers ---------- */
function TH(props: {
  children: React.ReactNode;
  align?: string;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3 text-left ${
        props.align ? `text-${props.align}` : ""
      } ${props.className ?? ""}`}
    >
      {props.children}
    </th>
  );
}
function TD(props: { children: React.ReactNode; align?: string }) {
  return (
    <td className={`px-4 py-3 ${props.align ? `text-${props.align}` : ""}`}>
      {props.children}
    </td>
  );
}
