/* app/api/admin/bookings/route.ts */
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Booking from "@/app/lib/models/Bookings";
import { getSessionEmail } from "@/app/lib/auth"; // ← verifies the cookie

export async function GET(_req: NextRequest) {
  /* ───── auth guard ───── */
  if (!(await getSessionEmail()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  /* ───── DB work ───── */
  try {
    await connectToDatabase();
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(bookings);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
