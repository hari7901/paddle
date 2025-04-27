/* app/lib/auth.ts */
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const ALG = "HS256";
const NAME = "admin_session";
const secret = new TextEncoder().encode(
  process.env.ADMIN_SECRET || "change-me"
);

/* ---------- create & store cookie (Route Handler) ---------- */
export async function createSession(email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: ALG })
    .setExpirationTime("7d")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set({
    name: NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(NAME);
}

/* ---------- verify (Route Handler / Server Component) ------ */
export async function getSessionEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: [ALG] });
    return payload.email as string;
  } catch {
    return null;
  }
}
