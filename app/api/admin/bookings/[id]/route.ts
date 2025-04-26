import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Booking from "@/app/lib/models/Bookings";

/*  /api/admin/bookings/[id]   */
export async function DELETE(
  request: Request, // ← use the Web-standard Request
  context: { params: { id: string } } // ← generic “context” object
) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  if (token !== process.env.ADMIN_API_TOKEN)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectToDatabase();
    const removed = await Booking.findByIdAndDelete(context.params.id);

    if (!removed)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    /* 204 No-Content is the REST-y response for a successful delete */
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
