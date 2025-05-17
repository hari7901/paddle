"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";

/* ---------------- types ---------------- */
type Slot = { id: string; time: string; available: boolean };
type Court = {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
};

/* ---------------- helpers ---------------- */
const ACCENT = "#E99E1B";

function getLocalISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatLocalDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ================= component ================= */
export default function BookSlotsClient() {
  const sp = useSearchParams();
  const router = useRouter();

  const courtId = sp.get("courtId") || "";
  const otherCourtId = courtId === "court-1" ? "court-2" : "court-1";
  const todayISO = getLocalISO(new Date());

  const [date, setDate] = useState(todayISO);
  const [court, setCourt] = useState<Court | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selected, setSelected] = useState<Slot[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  /* -------- fetch court once -------- */
  useEffect(() => {
    if (!courtId) return router.replace("/");
    fetch(`/api/courts?id=${courtId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setCourt)
      .catch(() => setErr("Could not load court."));
  }, [courtId, router]);

  /* -------- fetch slots on date change -------- */
  useEffect(() => {
    if (!courtId) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);

    fetch(`/api/slots?courtId=${courtId}&date=${date}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Slot[]) => {
        // Filter slots to only show between 4 PM (16:00) and 11 PM (23:00)
        const filteredSlots = data.filter((slot) => {
          // Extract the hour from the time string
          const hourMatch = slot.time.match(/^(\d+):00/);
          if (!hourMatch) return false;

          const hour = parseInt(hourMatch[1], 10);
          // We want to keep slots starting at 16:00 through 22:00
          // (16:00 is 4 PM, 22:00 is 10 PM which ends at 11 PM)
          return hour >= 16 && hour <= 22;
        });

        setSlots(filteredSlots);
        setSelected([]);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setErr("Could not load slots.");
      })
      .finally(() => setLoading(false));
  }, [courtId, date]);

  /* -------- error / loading -------- */
  if (err) return <FullScreen text={err} />;
  if (!court) return <FullScreen text="Loading…" spinner />;

  /* -------- helpers -------- */
  const toggle = (s: Slot) =>
    setSelected((prev) =>
      prev.some((x) => x.id === s.id)
        ? prev.filter((x) => x.id !== s.id)
        : [...prev, s]
    );

  const proceed = () => {
    if (!selected.length) return;
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

  /* next 7 local dates */
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

  /* ================= render ================= */
  return (
    <section className="min-h-screen bg-white text-black pt-35 pb-16">
      <div className="container mx-auto px-4">
        {/* -------- navigation -------- */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center bg-[#E99E1B] hover:bg-[#CF8A17] text-black font-semibold px-5 py-2 rounded-lg"
          >
            <ArrowLeft size={16} className="mr-2" />
            Home
          </Link>
          <Link
            href={`/book-slots?courtId=${otherCourtId}`}
            className="inline-flex items-center bg-[#E99E1B] hover:bg-[#CF8A17] text-black font-semibold px-5 py-2 rounded-lg"
          >
            {court.type === "Singles" ? "Doubles Court" : "Singles Court"} Slots
          </Link>
        </div>

        {/* -------- court card + date picker -------- */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <CourtCard court={court} />
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">
              Select a Date &amp; Time
            </h2>
            <p className="text-black/70 mb-6">Choose your preferred slot(s).</p>

            <label className="block mb-2 font-medium">Date</label>
            <div className="flex overflow-x-auto pb-2">
              {week.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDate(d.value)}
                  className={`px-4 py-3 border rounded-lg mr-2 whitespace-nowrap ${
                    d.value === date
                      ? "bg-[#E99E1B] border-[#E99E1B] text-black"
                      : "border-black/20 hover:border-[#E99E1B] text-black/70"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* -------- slots grid -------- */}
        <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              Slots • {formatLocalDate(date)}
            </h3>
            <span className="text-sm text-black/60 flex items-center">
              <Clock size={16} className="mr-2" />{" "}
              4&nbsp;PM&nbsp;–&nbsp;11&nbsp;PM
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {loading
              ? Array.from({ length: 17 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 rounded-lg bg-black/5 animate-pulse"
                  />
                ))
              : slots.map((s) => {
                  const isSel = selected.some((x) => x.id === s.id);
                  const base =
                    "p-4 rounded-lg text-center border h-16 flex flex-col justify-center text-sm";

                  if (!s.available) {
                    return (
                      <div
                        key={s.id}
                        className={`${base} border-red-500/30 bg-red-100 text-red-400 cursor-default`}
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
                      className={
                        isSel
                          ? `${base} bg-[#E99E1B] border-[#E99E1B] text-black`
                          : `${base} bg-black/5 border-black/10 hover:bg-black/10 text-black`
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {s.time}
                    </motion.div>
                  );
                })}
          </div>

          {/* footer */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-black/70">
              Selected <b>{selected.length}</b> • Total{" "}
              <span className="text-[#E99E1B] font-semibold">
                ₹{court.price * selected.length}
              </span>
            </p>
            <button
              onClick={proceed}
              disabled={!selected.length}
              className="bg-[#E99E1B] hover:bg-[#CF8A17] text-black px-6 py-3 rounded-lg disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- helper components ---------------- */
function CourtCard({ court }: { court: Court }) {
  return (
    <div className="md:w-1/3">
      <div
        className="h-48 rounded-lg bg-cover bg-center relative overflow-hidden shadow"
        style={{ backgroundImage: `url(${court.image})` }}
      >
        <div className="absolute inset-0 bg-black/40 p-6 flex items-end">
          <div>
            <span
              className="text-xs px-2 py-1 rounded"
              style={{ backgroundColor: ACCENT, color: "black" }}
            >
              {court.type}
            </span>
            <h1 className="text-2xl font-bold mt-2 text-white">{court.name}</h1>
            <p className="font-bold mt-1" style={{ color: ACCENT }}>
              ₹{court.price}/hour
            </p>
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
    <div className="min-h-screen bg-white text-black flex items-center justify-center">
      {spinner ? (
        <div className="animate-pulse">{text}</div>
      ) : (
        <p className="border border-red-500/30 bg-red-50 rounded-lg px-6 py-4 text-red-500">
          {text}
        </p>
      )}
    </div>
  );
}
