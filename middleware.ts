import { url } from 'inspector';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  const {pathname} = req.nextUrl;

  if(pathname.startsWith('/daftar')){
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (!token) {
    // Jika tidak ada token, redirect ke halaman login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Jika token ada, lanjutkan request
  return NextResponse.next();
}

export const config = {
    matcher: ["/daftar", "/dashboard", "/dashboard/:path*"]
}