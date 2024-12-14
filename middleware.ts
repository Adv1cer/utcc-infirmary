import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log('Token:', token);

  const { pathname } = request.nextUrl;
  console.log('Pathname:', pathname);

  if (token) {
    if (pathname === "/" || pathname.toLowerCase() === "/login") {
      return NextResponse.redirect(new URL("/homepage", request.url));
    }
  } else {
    if (pathname.toLowerCase().startsWith("/homepage") ||
        pathname.toLowerCase().startsWith("/stocking") ||
        pathname.toLowerCase().startsWith("/dashboard") ||
        pathname.toLowerCase().startsWith("/ticket")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*', '/homepage/:path*', '/stocking/:path*', '/history/:path*', '/ticket/:path*'],
};