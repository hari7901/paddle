// app/lib/models/Bookings.ts
import { Schema, models, model, Document } from "mongoose";

export interface IBooking extends Document {
  courtId: string;
  courtName: string;
  courtType: string;
  price: number;
  date: string; // "YYYY-MM-DD"
  slotIds: string[]; // one or more slot IDs
  times: string[]; // matching array of time strings
  name: string;
  email: string;
  phone: string;
  paymentMethod: "card" | "cash";
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    /* ─── court info ─── */
    courtId: { type: String, required: true },
    courtName: { type: String, required: true },
    courtType: { type: String, required: true },
    price: { type: Number, required: true },

    /* ─── when & what ─── */
    date: { type: String, required: true }, // e.g. "2025-04-27"
    slotIds: { type: [String], required: true }, // e.g. ["slot-8","slot-9"]
    times: { type: [String], required: true }, // e.g. ["13:00–14:00","14:00–15:00"]

    /* ─── user ─── */
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, enum: ["card", "cash"], required: true },

    /* ─── status ─── */
    status: { type: String, default: "CONFIRMED" },
  },
  { timestamps: true }
);

/* index on courtId+date for fast lookups (non-unique) */
BookingSchema.index({ courtId: 1, date: 1 });

export default models.Booking || model<IBooking>("Booking", BookingSchema);
