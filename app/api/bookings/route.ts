// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Booking from "@/app/lib/models/Bookings";
import {
  sendAdminNotification,
  sendCustomerConfirmation,
} from "@/app/lib/email";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const {
      courtId,
      courtName,
      courtType,
      date,
      slotIds,
      times,
      price,
      name,
      email,
      phone,
      paymentMethod,
    } = await req.json();

    // ── validation ──
    if (
      !courtId ||
      !courtName ||
      !courtType ||
      !date ||
      !Array.isArray(slotIds) ||
      slotIds.length === 0 ||
      !Array.isArray(times) ||
      times.length !== slotIds.length ||
      price === undefined ||
      !name ||
      !email ||
      !phone ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    // ── clash check ──
    const clash = await Booking.findOne({
      courtId,
      date,
      slotIds: { $in: slotIds },
      status: "CONFIRMED",
    });
    if (clash) {
      return NextResponse.json(
        { error: "Some slot is already booked" },
        { status: 409 }
      );
    }

    // ── create booking ──
    const booking = await Booking.create({
      courtId,
      courtName,
      courtType,
      date,
      slotIds,
      times,
      price,
      name,
      email,
      phone,
      paymentMethod,
      status: "CONFIRMED",
    });

    // ── send emails ──
    const params = {
      bookingId: booking._id.toString(),
      courtName,
      courtType,
      date,
      times,
      slotIds,
      price,
      name,
      email,
      phone,
      supportPhone: "+91 90410 13409",
    };

    await sendAdminNotification(params);
    await sendCustomerConfirmation(params);

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (err) {
    console.error("Booking POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const emailQ = searchParams.get("email");

    if (id) {
      const b = await Booking.findById(id);
      if (!b)
        return NextResponse.json(
          { error: "Booking not found" },
          { status: 404 }
        );
      return NextResponse.json(b);
    }

    if (emailQ) {
      const list = await Booking.find({ email: emailQ }).sort({
        createdAt: -1,
      });
      return NextResponse.json(list);
    }

    return NextResponse.json(
      { error: "Either `id` or `email` query param is required" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Booking GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
