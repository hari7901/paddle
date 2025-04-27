import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Booking from "@/app/lib/models/Bookings";

type TimeSlot = { id: string; time: string; available: boolean };

/* GET /api/slots?courtId=...&date=yyyy-mm-dd */
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const courtId = searchParams.get("courtId");
    const date = searchParams.get("date");

    if (!courtId || !date)
      return NextResponse.json(
        { error: "Court ID and date are required" },
        { status: 400 }
      );

    /* get *all* bookings on that date for that court */
    const bookings = await Booking.find({ courtId, date }).select("slotIds");

    /* flatten every slotIds[] into one Set */
    const bookedIds = new Set<string>();
    bookings.forEach((b) => {
      (b.slotIds as string[]).forEach((id) => bookedIds.add(id));
    });

    /* generate 6 am – 11 pm slots */
    const slots: TimeSlot[] = [];
    for (let hour = 6; hour < 23; hour++) {
      const start = hour.toString().padStart(2, "0");
      const next = (hour + 1).toString().padStart(2, "0");
      const id = `slot-${hour - 5}`; // slot-1 … slot-17
      slots.push({
        id,
        time: `${start}:00 – ${next}:00`,
        available: !bookedIds.has(id),
      });
    }

    return NextResponse.json(slots);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}
