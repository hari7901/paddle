import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Booking from "@/app/lib/models/Bookings";
import { sendBookingAlert } from "@/app/lib/email";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const {
      courtId,
      courtName,
      courtType,
      price,

      date,
      slotId,
      time,

      name,
      email,
      phone,
      paymentMethod,
    } = await request.json();

    // simple presence check
    if (
      !courtId ||
      !courtName ||
      !courtType ||
      price === undefined ||
      !date ||
      !slotId ||
      !time ||
      !name ||
      !email ||
      !phone ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // already booked?
    const clash = await Booking.findOne({ courtId, date, slotId });
    if (clash)
      return NextResponse.json(
        { error: "This slot is already booked" },
        { status: 409 }
      );

    const booking = await Booking.create({
      courtId,
      courtName,
      courtType,
      price,
      date,
      slotId,
      time,
      name,
      email,
      phone,
      paymentMethod,
    });

    // email the admin – don’t await block user response
    sendBookingAlert(booking.toObject()).catch(console.error);

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const email = searchParams.get("email");

    if (id) {
      const b = await Booking.findById(id);
      if (!b) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(b);
    }

    if (email) return NextResponse.json(await Booking.find({ email }));

    return NextResponse.json(
      { error: "Email or ID required" },
      { status: 400 }
    );
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
