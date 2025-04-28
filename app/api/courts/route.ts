// app/api/courts/route.ts
import { NextRequest, NextResponse } from "next/server";

const courts = [
  {
    id: "court-1",
    name: "Singles Court",
    type: "Singles",
    price: 1200,
    image: "/paddle3.jpg",
  },
  {
    id: "court-2",
    name: "Doubles Court",
    type: "Doubles",
    price: 1600,
    image: "/paddle4.jpg",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courtId = searchParams.get("id");

    // Return specific court if ID is provided
    if (courtId) {
      const court = courts.find((court) => court.id === courtId);

      if (!court) {
        return NextResponse.json({ error: "Court not found" }, { status: 404 });
      }

      return NextResponse.json(court);
    }

    // Return all courts if no ID is provided
    return NextResponse.json(courts);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courts" },
      { status: 500 }
    );
  }
}
