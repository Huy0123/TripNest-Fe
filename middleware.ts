/**
 * Authentication Middleware for Next.js App Router
 * Route protection and redirects
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/tours',
  '/contact',
  '/about',
  '/blog',
  '/help',
  '/signin',
  '/signup',
  '/forgot-password',
  '/reset-password',
];

// Routes that require authentication
const protectedRoutes = [
  '/profile',
  '/bookings',
  '/favorites',
  '/settings',
];

// Admin-only routes
const adminRoutes = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get auth token from cookies
  const token = request.cookies.get('auth_token')?.value;
  const isAuthenticated = !!token;

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Check if route is admin
  const isAdminRoute = adminRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect unauthenticated users from admin routes
  if (isAdminRoute && !isAuthenticated) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && (pathname === '/signin' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

// Specify which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
