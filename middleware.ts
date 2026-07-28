import { NextResponse, type NextRequest } from 'next/server';

import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from '@/lib/adminAuth';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (cookie !== ADMIN_SESSION_VALUE) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
