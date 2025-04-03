import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import Cookies from "js-cookie";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'JWT_SECRET');

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  console.log('🔍 Middleware Token:', token);

  if (!token) {
    console.log('❌ No token found. Redirecting to /signin');
    Cookies.remove("authToken");
    Cookies.remove("user");
    return NextResponse.redirect(new URL('/signin?error=session_expired', req.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.log('❌ Token expired. Redirecting to /signin');
            Cookies.remove("authToken");
            Cookies.remove("user");
      return NextResponse.redirect(new URL('/signin?error=session_expired', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('❌ JWT Verification Error:', error);
    Cookies.remove("authToken");
    Cookies.remove("user");
    return NextResponse.redirect(new URL('/signin?error=session_invalid', req.url));
  }
}

export const config = {
  matcher: ["/home", "/profile", "/setting", "/farm-health", "/roi", "/watch-list", "/watch-list-items"],
};
