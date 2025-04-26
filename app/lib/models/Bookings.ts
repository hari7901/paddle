// app/lib/models/Bookings.ts
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    courtId: {
      type: String,
      required: true,
    },
    courtName: { type: String, required: true },
    courtType: { type: String, required: true },
    price: { type: Number, required: true },
    date: {
      type: String,
      required: true,
    },
    slotId: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add a compound index to prevent duplicate bookings
BookingSchema.index({ courtId: 1, date: 1, slotId: 1 }, { unique: true });

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
