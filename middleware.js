import { NextResponse } from 'next/server';

const ADMIN_HOST_PREFIX = 'smurfrank-admin';

export function middleware(request) {
  const hostname = (request.headers.get('host') || '').split(':')[0];
  const isAdminHost = hostname === `${ADMIN_HOST_PREFIX}.vercel.app` || hostname.startsWith(`${ADMIN_HOST_PREFIX}-`);

  if (!isAdminHost) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/admin';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico|robots.txt|sitemap.xml|opengraph-image|icon).*)'],
};
