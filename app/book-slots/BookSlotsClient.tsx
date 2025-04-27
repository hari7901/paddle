/* app/book-slots/BookSlotsClient.tsx */
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";

/* ---------- types ---------- */
type Slot = { id: string; time: string; available: boolean };
type Court = {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
};

export default function BookSlotsClient() {
  const sp = useSearchParams();
  const router = useRouter();

  const courtId = sp.get("courtId") || "";

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const [court, setCourt] = useState<Court | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selected, setSel] = useState<Slot[]>([]);

  const [error, setErr] = useState<string | null>(null);
  const [loadingSlots, setLS] = useState(false);

  /* in-memory slot cache  { "2025-05-03|court-1": Slot[] } */
  const cache = useRef<Record<string, Slot[]>>({});
  const abortRef = useRef<AbortController | null>(null);

  /* -------- 1. fetch court (once) ---------------------------- */
  useEffect(() => {
    if (!courtId) {
      router.push("/");
      return;
    }
    fetch(`/api/courts?id=${courtId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setCourt)
      .catch(() => setErr("Could not load court.")); // rarely happens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* -------- 2. fetch slots every date change ----------------- */
  useEffect(() => {
    if (!courtId) return;
    const key = `${date}|${courtId}`;

    if (cache.current[key]) {
      // instant from cache
      setSlots(cache.current[key]);
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLS(true);
    fetch(`/api/slots?courtId=${courtId}&date=${date}`, {
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Slot[]) => {
        cache.current[key] = data;
        setSlots(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setErr("Could not load slot list.");
      })
      .finally(() => setLS(false));
  }, [courtId, date]);

  /* -------- helpers ----------------------------------------- */
  const fmtLong = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      value: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    };
  });

  const toggle = (s: Slot) =>
    setSel((prev) =>
      prev.find((p) => p.id === s.id)
        ? prev.filter((p) => p.id !== s.id)
        : [...prev, s]
    );

  const proceed = () => {
    if (!court || selected.length === 0) return;
    const p = new URLSearchParams({
      date,
      courtId,
      courtName: court.name,
      courtType: court.type,
      price: (court.price * selected.length).toString(),
      slotIds: selected.map((s) => s.id).join(","),
      times: selected.map((s) => s.time).join(","),
    });
    router.push(`/book?${p.toString()}`);
  };

  /* ---------------- render ----------------------------------- */
  if (error)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="bg-red-900/20 border border-red-700 rounded-lg px-6 py-4">
          {error}
        </p>
      </div>
    );

  if (!court)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading…</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white pt-35 pb-16">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-gray-300 hover:text-green-400 mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        {/* card & date picker */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <CourtCard court={court} />
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">
              Select a Date &amp; Time
            </h2>
            <p className="text-gray-300 mb-6">Choose the slot(s) you want.</p>
            <label className="block mb-2 text-white font-medium">Date</label>
            <div className="flex overflow-x-auto pb-2">
              {week.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDate(d.value)}
                  className={`p-3 border rounded-lg mr-2 whitespace-nowrap
                    ${
                      d.value === date
                        ? "bg-green-600 border-green-600 text-white"
                        : "border-gray-700 hover:border-green-500 text-gray-300"
                    }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* slot grid */}
        <div className="bg-gray-900 rounded-lg p-6 border-2 border-green-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Slots • {fmtLong(date)}</h3>
            <span className="text-sm text-gray-300 flex items-center">
              <Clock size={16} className="mr-2" /> 6 AM – 11 PM
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {loadingSlots
              ? Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-14 rounded-lg bg-gray-800 animate-pulse"
                  />
                ))
              : slots.map((s) => {
                  const act = selected.some((sel) => sel.id === s.id);
                  return (
                    <motion.div
                      key={s.id}
                      onClick={() => s.available && toggle(s)}
                      whileHover={{ scale: s.available ? 1.05 : 1 }}
                      whileTap={{ scale: s.available ? 0.95 : 1 }}
                      className={`p-4 rounded-lg text-center cursor-pointer border
                        ${
                          !s.available
                            ? "border-gray-700 bg-gray-800 opacity-50 cursor-not-allowed"
                            : act
                            ? "bg-green-600 border-green-600 text-white"
                            : "border-green-600 bg-green-900/40 hover:bg-green-800"
                        }`}
                    >
                      {s.time}
                    </motion.div>
                  );
                })}
          </div>

          {/* footer */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm">
              Selected <b>{selected.length}</b> slot(s) • Total&nbsp;
              <span className="text-green-400 font-semibold">
                ₹{court.price * selected.length}
              </span>
            </p>
            <button
              onClick={proceed}
              disabled={selected.length === 0}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------ sub-component for court card ------------------- */
function CourtCard({ court }: { court: Court }) {
  return (
    <div className="md:w-1/3">
      <div
        className="h-48 rounded-lg bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${court.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-6 flex items-end">
          <div>
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
              {court.type}
            </span>
            <h1 className="text-2xl font-bold mt-2">{court.name}</h1>
            <p className="text-green-400 font-bold mt-1">₹{court.price}/hour</p>
          </div>
        </div>
      </div>
    </div>
  );
}
