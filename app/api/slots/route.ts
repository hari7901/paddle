// app/api/slots/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Booking from "@/app/lib/models/Bookings";

// Define TimeSlot type
type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

// GET endpoint - retrieve available slots for a court on a specific date
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const courtId = searchParams.get("courtId");
    const date = searchParams.get("date");

    if (!courtId || !date) {
      return NextResponse.json(
        { error: "Court ID and date are required" },
        { status: 400 }
      );
    }

    // Get all bookings for this court on this date
    const existingBookings = await Booking.find({
      courtId: courtId,
      date: date,
    });

    // Set of booked slot IDs
    const bookedSlotIds = new Set(
      existingBookings.map((booking) => booking.slotId)
    );

    // Generate all possible time slots for the day
    const slots: TimeSlot[] = [];
    for (let hour = 6; hour < 23; hour++) {
      const h = hour.toString().padStart(2, "0");
      const next = (hour + 1).toString().padStart(2, "0");
      const slotId = `slot-${hour - 5}`; // slot-1 ... slot-17

      slots.push({
        id: slotId,
        time: `${h}:00 - ${next}:00`,
        available: !bookedSlotIds.has(slotId),
      });
    }

    return NextResponse.json(slots);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
