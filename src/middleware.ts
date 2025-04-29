import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-jwt-token-with-at-least-32-characters-long');

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/signin?error=session_invalid', req.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return NextResponse.redirect(new URL('/signin?error=session_expired', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/signin?error=session_invalid', req.url));
  }
}

export const config = {
  matcher: ["/home", "/profile", "/setting", "/farm-health", "/roi", "/watch-list", "/watch-list-items"],
};
