import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  console.log('token = = = >', token)

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile","/setting", "/home", "/farm-health", "/roi", "/watch-list", "/watch-list-items"], // Protect these routes
};
