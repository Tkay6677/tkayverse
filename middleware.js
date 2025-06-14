import { NextResponse } from 'next/server';
import { Buffer } from 'buffer';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  // Protect admin pages and relevant API routes
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api/projects') ||
    pathname.startsWith('/api/posts') ||
    pathname.startsWith('/api/upload')
  ) {
    const auth = req.headers.get('authorization');
    if (!auth || !auth.startsWith('Basic ')) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }
    const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64')
      .toString()
      .split(':');
    if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }
  }
  return NextResponse.next();
}
