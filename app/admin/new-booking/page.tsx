/* app/admin/bookings/new/page.tsx */
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

  /* courts ---------------------------------------------------------------- */
  const [courts, setCourts] = useState<Court[]>([]);
  const [court, setCourt] = useState<Court | null>(null);

  useEffect(() => {
    fetch("/api/courts")
      .then((r) => r.json())
      .then(setCourts);
  }, []);

  /* date ------------------------------------------------------------------ */
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  /* slots ----------------------------------------------------------------- */
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selected, setSelected] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  /* fetch slots each court/date change */
  useEffect(() => {
    if (!court) return;
    setLoadingSlots(true);
    fetch(`/api/slots?courtId=${court.id}&date=${date}`)
      .then((r) => r.json())
      .then((data: Slot[]) => {
        setSlots(data);
        setSelected([]);
      })
      .finally(() => setLoadingSlots(false));
  }, [court, date]);

  const toggle = (s: Slot) =>
    setSelected((p) =>
      p.find((x) => x.id === s.id) ? p.filter((x) => x.id !== s.id) : [...p, s]
    );

  /* customer form --------------------------------------------------------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "cash" as "cash" | "card",
  });
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  /* submit ---------------------------------------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!court || !selected.length) return alert("Pick court + slot(s)");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courtId: court.id,
          courtName: court.name,
          courtType: court.type,
          price: court.price * selected.length,
          date,
          slotIds: selected.map((s) => s.id),
          times: selected.map((s) => s.time),
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

  /* helpers --------------------------------------------------------------- */
  const fmtLong = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  /* ---------------------------- UI -------------------------------------- */
  return (
    <div className="pt-32 px-4 md:px-8 max-w-4xl mx-auto">
      <Link
        href="/admin/bookings"
        className="text-gray-300 hover:text-green-400 flex items-center mb-6"
      >
        <ChevronLeft size={18} className="mr-1" /> Back to bookings
      </Link>

      <h1 className="text-2xl font-bold mb-6">New Booking (Admin)</h1>

      {/* court + date */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="font-medium mb-2 block">Court</label>
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
            value={court?.id ?? ""}
            onChange={(e) =>
              setCourt(courts.find((c) => c.id === e.target.value) || null)
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

      {/* slots */}
      {court && (
        <div className="mb-8">
          <h2 className="font-medium mb-3">Time Slots for {fmtLong(date)}</h2>

          {loadingSlots ? (
            <p className="text-gray-400 text-sm">Loading slots…</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {slots.map((s) => {
                const sel = selected.some((x) => x.id === s.id);
                return (
                  <button
                    key={s.id}
                    disabled={!s.available}
                    onClick={() => toggle(s)}
                    className={`px-3 py-2 rounded-lg text-sm border transition-all
                      ${
                        !s.available
                          ? "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
                          : sel
                          ? "bg-green-600 border-green-600 text-white"
                          : "bg-gray-900 border-gray-700 text-gray-300 hover:border-green-500"
                      }`}
                  >
                    {s.time}
                    {!s.available && (
                      <span className="block text-xs">Booked</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* customer + payment */}
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-lg font-medium mb-4">Customer Details</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <InputRow
            icon={<User size={16} />}
            id="name"
            value={form.name}
            onChange={onChange}
            required
          />
          <InputRow
            icon={<Phone size={16} />}
            id="phone"
            value={form.phone}
            onChange={onChange}
            required
          />
        </div>
        <InputRow
          icon={<Mail size={16} />}
          id="email"
          value={form.email}
          onChange={onChange}
        />

        <h2 className="text-lg font-medium mt-6 mb-4">Payment Method</h2>
        <div className="flex gap-6 mb-6">
          <Radio
            id="cash"
            name="paymentMethod"
            value="cash"
            checked={form.paymentMethod === "cash"}
            onChange={onChange}
            label="Cash / Pay on site"
          />
          <Radio
            id="card"
            name="paymentMethod"
            value="card"
            checked={form.paymentMethod === "card"}
            onChange={onChange}
            label="Card"
          />
        </div>

        <button
          type="submit"
          disabled={!court || !selected.length}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg disabled:opacity-50"
        >
          Create Booking
        </button>
      </form>
    </div>
  );
}

/* ---------- tiny UI helpers ---------- */
function InputRow({
  icon,
  id,
  value,
  onChange,
  required = false,
}: {
  icon: React.ReactNode;
  id: string;
  value: string;
  onChange: any;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm mb-1 capitalize">
        {id}
        {required && " *"}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
        <input
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 p-2 text-sm"
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
}: {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: any;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
