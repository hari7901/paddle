import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASS
  ) {
    await createSession(email);
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Invalid creds" }, { status: 401 });
}
