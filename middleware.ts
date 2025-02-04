import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { aj } from './lib/arject';

export async function middleware(req: Request) {
  const decision=await aj.protect(req, { requested: 20 }); 

  if (!decision.isAllowed) {
    return NextResponse.json({ message: 'Request not allowed' }, { status: 403 });
  }
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/upgrade/:path*', '/profile/:path*', '/newsletter', '/course/:path*'],
};
