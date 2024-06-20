import authConfig from './auth.config';
import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { apiAuthPrefix, defaultLoginRedirect, authRoutes, publicRoutes } from '@/shared/constants';

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isApiAuthRoute) return NextResponse.next();
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) return NextResponse.redirect(new URL(defaultLoginRedirect, nextUrl));
    return NextResponse.next();
  }
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  if (!isLoggedIn && !isPublicRoute) return NextResponse.redirect(new URL('/auth/login', nextUrl));
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
