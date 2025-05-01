// app/book-slots/BookSlotsClient.tsx
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

/** Return YYYY-MM-DD for the given Date in *local* time */
function getLocalISO(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Format YYYY-MM-DD into a more human-friendly string */
function formatLocalDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BookSlotsClient() {
  const sp = useSearchParams();
  const router = useRouter();

  const courtId = sp.get("courtId") || "";
  const otherCourtId = courtId === "court-1" ? "court-2" : "court-1";

  const todayISO = getLocalISO(new Date());

  const [date, setDate] = useState<string>(todayISO);
  const [court, setCourt] = useState<Court | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selected, setSelected] = useState<Slot[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const abortRef = useRef<AbortController | null>(null);

  /* Fetch court info once */
  useEffect(() => {
    if (!courtId) {
      router.push("/");
      return;
    }
    fetch(`/api/courts?id=${courtId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setCourt)
      .catch(() => setErr("Could not load court."));
  }, [courtId, router]);

  /* Fetch slots on date change */
  useEffect(() => {
    if (!courtId) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    fetch(`/api/slots?courtId=${courtId}&date=${date}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Slot[]) => {
        setSlots(data);
        setSelected([]);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setErr("Could not load slots.");
      })
      .finally(() => setLoading(false));
  }, [courtId, date]);

  if (err) return <FullScreen text={err} />;
  if (!court) return <FullScreen text="Loading…" spinner />;

  const toggle = (s: Slot) =>
    setSelected((prev) =>
      prev.find((x) => x.id === s.id)
        ? prev.filter((x) => x.id !== s.id)
        : [...prev, s]
    );

  const proceed = () => {
    if (!court || !selected.length) return;
    const params = new URLSearchParams({
      date,
      courtId,
      courtName: court.name,
      courtType: court.type,
      price: (court.price * selected.length).toString(),
      slotIds: selected.map((s) => s.id).join(","),
      times: selected.map((s) => s.time).join(","),
    });
    router.push(`/book?${params.toString()}`);
  };

  /* next 7 local dates for picker */
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      value: getLocalISO(d),
      label: d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white pt-35 pb-16">
      <div className="container mx-auto px-4">
        {/* Navigation: Back + Switch Court */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center bg-[#E99E1B] hover:bg-[#D68E13] text-white font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          <Link
            href={`/book-slots?courtId=${otherCourtId}`}
            className="inline-flex items-center bg-[#E99E1B] hover:bg-[#D68E13] text-white font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            {court.type === "Singles"
              ? "View Doubles Court Slots"
              : "View Singles Court Slots"}
          </Link>
        </div>

        {/* Court info + Date picker */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <CourtCard court={court} />
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">
              Select a Date &amp; Time
            </h2>
            <p className="text-[#CCCCCC] mb-6">
              Choose your preferred slot(s).
            </p>
            <label className="block mb-2 font-medium text-[#CCCCCC]">
              Date
            </label>
            <div className="flex overflow-x-auto pb-2">
              {week.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDate(d.value)}
                  className={`p-3 border rounded-lg mr-2 whitespace-nowrap ${
                    d.value === date
                      ? "bg-[#E99E1B] border-[#E99E1B] text-white"
                      : "border-[#4D789D] hover:border-[#E99E1B] text-[#CCCCCC]"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Slots grid */}
        <div className="bg-gradient-to-br from-[#191A24] to-[#4D789D] rounded-lg p-6 border border-[#4D789D]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">
              Slots • {formatLocalDate(date)}
            </h3>
            <span className="text-sm text-[#CCCCCC] flex items-center">
              <Clock size={16} className="mr-2" /> 6 AM – 11 PM
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {loading
              ? Array.from({ length: 17 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 rounded-lg bg-[#191A24]/20 animate-pulse"
                  />
                ))
              : slots.map((s) => {
                  const isSel = selected.some((x) => x.id === s.id);
                  const base =
                    "p-4 rounded-lg text-center border h-16 flex flex-col justify-center";

                  if (!s.available) {
                    return (
                      <div
                        key={s.id}
                        className={`${base} border-red-700 bg-red-900/40 text-red-300 cursor-default`}
                      >
                        <span>{s.time}</span>
                        <span className="text-xs mt-0.5">Booked</span>
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={s.id}
                      onClick={() => toggle(s)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${base} cursor-pointer ${
                        isSel
                          ? "bg-[#E99E1B] border-[#E99E1B] text-white"
                          : "bg-[#191A24]/30 border-[#4D789D] hover:bg-[#4D789D]/20 text-[#CCCCCC]"
                      }`}
                    >
                      {s.time}
                    </motion.div>
                  );
                })}
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-[#CCCCCC]">
              Selected <b>{selected.length}</b> • Total&nbsp;
              <span className="text-[#E99E1B] font-semibold">
                ₹{court.price * selected.length}
              </span>
            </p>
            <button
              onClick={proceed}
              disabled={!selected.length}
              className="bg-[#E99E1B] hover:bg-[#D68E13] px-6 py-3 rounded-lg disabled:opacity-50 text-white"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourtCard({ court }: { court: Court }) {
  return (
    <div className="md:w-1/3">
      <div
        className="h-48 rounded-lg bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${court.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-6 flex items-end">
          <div>
            <span className="bg-[#E99E1B] text-white text-xs px-2 py-1 rounded">
              {court.type}
            </span>
            <h1 className="text-2xl font-bold mt-2 text-white">{court.name}</h1>
            <p className="text-[#E99E1B] font-bold mt-1">₹{court.price}/hour</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FullScreen({
  text,
  spinner = false,
}: {
  text: string;
  spinner?: boolean;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E3D5A] to-[#5A8FC8] text-white flex items-center justify-center">
      {spinner ? (
        <div className="animate-pulse text-[#CCCCCC]">{text}</div>
      ) : (
        <p className="bg-red-900/20 border border-red-700 rounded-lg px-6 py-4 text-[#CCCCCC]">
          {text}
        </p>
      )}
    </div>
  );
}
