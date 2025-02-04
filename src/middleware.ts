import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/profile"]
const guestRoutes = ['/login']

export default async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('session')?.value
  const session = await decrypt(cookie)

  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  const guestRoute = guestRoutes.includes(path)
  if (guestRoute && session?.userId) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
