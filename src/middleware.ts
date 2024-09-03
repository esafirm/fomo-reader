import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	console.log('Request URL:', request.nextUrl);

  // Check if it's go to root path
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
