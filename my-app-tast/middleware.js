import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log("Middleware executed for: " + request.nextUrl.pathname);
  return NextResponse.redirect(new URL('/tast', request.url));
}

export const config = {
  matcher: ['/content', '/content/:path*'],
};
