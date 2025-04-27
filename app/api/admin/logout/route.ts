import { NextResponse } from "next/server";
import { destroySession } from "@/app/lib/auth";

export async function POST() {
  destroySession(); // removes “admin_session” cookie
  return NextResponse.json({ ok: true });
}
