import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Public routes accessible without authentication.
 */
export const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/books',
  '/authors',
  '/categories',
  '/search',
];

/**
 * Admin-only routes requiring ADMIN role.
 */
const adminRoutes = [
  '/admin',
  '/admin/books',
  '/admin/books/new',
  '/admin/users',
  '/admin/authors',
  '/admin/categories',
  '/admin/loans',
  '/admin/loans/new',
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Token & role stored in HttpOnly cookies during login
  const token = request.cookies.get('authToken')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  // Check if route is public
  // Support exact match or nested dynamic paths like /books/[id]
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  // Check if route is admin
  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  // Unauthenticated users hitting protected routes
  // Guard Logic: No token + accessing protected/admin route -> Redirect to /login?redirect=[pathname]
  if (!isPublicRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated users accessing /login or /register
  // Guard Logic: Has token + accessing /login or /register -> Redirect to /profile
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Admin routes protection
  // Guard Logic: Has token + wrong role for admin -> Redirect to /profile
  if (isAdminRoute && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata)
     * - Static asset file extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2)).*)',
  ],
};
