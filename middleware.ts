/* middleware.ts */
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const NAME = "admin_session";
const ALG = "HS256";
const secret = new TextEncoder().encode(
  process.env.ADMIN_SECRET || "change-me"
);

/* helper */
async function loggedIn(req: NextRequest) {
  const token = req.cookies.get(NAME)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret, { algorithms: [ALG] });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /* admin HTML routes */
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (await loggedIn(req)) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  /* admin **data** routes  (_next/data/...) */
  if (
    pathname.match(/^\/_next\/data\/[^/]+\/admin\/(.*)\.json$/) &&
    !(await loggedIn(req))
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", "/admin/" + RegExp.$1);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/* run only for the two patterns above */
export const config = {
  matcher: [
    "/admin/:path*", // HTML navigation or hard reload
    "/_next/data/:path*/admin/:path*", // JSON data prefetch
  ],
};
