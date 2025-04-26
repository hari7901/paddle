/* app/api/admin/bookings/[id]/route.ts */
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db";
import Booking from "@/app/lib/models/Bookings";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } } // ✅ correct ctx signature
) {
  /* ─── simple bearer-token check ─── */
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (token !== process.env.ADMIN_API_TOKEN)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectToDatabase();
    const removed = await Booking.findByIdAndDelete(params.id);

    if (!removed)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    /* 204 = delete succeeded, no content */
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
