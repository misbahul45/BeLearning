import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

const adminEmail = [
  "admin123@gmail.com"
];

export async function middleware(req: Request) {
  const session = await auth();
  const pathName = new URL(req.url).pathname;
  const email = session?.user.email?.trim().toLowerCase();
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (!pathName.includes('admin') && adminEmail.includes(email as string)) {
    return NextResponse.redirect(new URL('/browse', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/upgrade/:path*', '/profile/:path*', '/newsletter'],
};
