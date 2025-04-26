import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Booking from "@/app/lib/models/Bookings";
import { sendBookingAlert } from "@/app/lib/email";
import { sendWhatsAppConfirmation } from "@/app/lib/whatsapp"; 

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

    /* ---------- validation (unchanged) ---------- */
    if (
      !courtId ||
      !courtName ||
      !courtType ||
      price === undefined ||
      !date ||
      !slotId ||
      !time ||
      !name ||
      !phone ||
      !paymentMethod
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    /* ---------- clash check ---------- */
    const clash = await Booking.findOne({ courtId, date, slotId });
    if (clash)
      return NextResponse.json(
        { error: "Slot already booked" },
        { status: 409 }
      );

    /* ---------- save ---------- */
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

    /* ---------- alerts ---------- */
    sendBookingAlert(booking.toObject()).catch(console.error);

    /* NEW: WhatsApp confirmation (fire-and-forget) */
    sendWhatsAppConfirmation({
      _id: booking._id.toString(),
      name,
      phone,
      courtName,
      courtType,
      date,
      time,
      price,
    }).catch(console.error);

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (err) {
    console.error(err);
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
