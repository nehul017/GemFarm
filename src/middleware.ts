import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Access cookies from the request headers
  const cookieHeader = req.headers.get("cookie");
  const token = cookieHeader
    ? cookieHeader
        .split("; ")
        .find((c) => c.startsWith("authToken="))
        ?.split("=")[1]
    : null;

  if (!token || token === "undefined") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/profile", "/setting", "/home", "/farm-health", "/roi", "/watch-list", "/watch-list-items"], // Protect these routes
};
