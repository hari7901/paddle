import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Booking from "@/app/lib/models/Bookings";

/*  /api/admin/bookings/[id]  */
export async function DELETE(
  req: NextRequest,
  ctx: any // ← keep it untyped; stops the TS error
) {
  const id = ctx?.params?.id as string | undefined;

  /* -------- guard clauses -------- */
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (token !== process.env.ADMIN_API_TOKEN)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  /* -------- DB work -------- */
  try {
    await connectToDatabase();
    const removed = await Booking.findByIdAndDelete(id);

    if (!removed)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return new NextResponse(null, { status: 204 }); // success, no content
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
