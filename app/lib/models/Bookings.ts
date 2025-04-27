// app/lib/models/Bookings.ts
import { Schema, models, model } from "mongoose";

const BookingSchema = new Schema(
  {
    /* ─── court info ─── */
    courtId: { type: String, required: true },
    courtName: { type: String, required: true },
    courtType: { type: String, required: true },
    price: { type: Number, required: true },

    /* ─── when & what ─── */
    date: { type: String, required: true }, // e.g. "2025-04-27"
    slotIds: { type: [String], required: true }, // e.g. ["605c...", "605c..."]
    times: { type: [String], required: true }, // e.g. ["20:00–21:00", ...]

    /* ─── user ─── */
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, enum: ["card", "cash"], required: true },

    /* ─── status & audit ─── */
    status: { type: String, default: "CONFIRMED" },
  },
  { timestamps: true }
);

/* ─── remove any old slotId-based unique index ───  
   we enforce per-slot clash in the API route, not via Mongo  
*/
BookingSchema.index({ courtId: 1, date: 1 }); // non-unique for lookups

export default models.Booking || model("Booking", BookingSchema);
