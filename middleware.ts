import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from './app/lib/auth';

/**
 * NEXT.JS EDGE MIDDLEWARE ROUTE GUARD
 * 
 * Intercepts requests to sensitive areas (like `/admin` or `/dashboard`)
 * and strictly validates user sessions and authorization roles before serving them.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define target routes that require protection
  const isProtectedAdminRoute = pathname.startsWith('/admin');
  const isProtectedDashboardRoute = pathname.startsWith('/dashboard');

  if (isProtectedAdminRoute || isProtectedDashboardRoute) {
    const sessionCookie = request.cookies.get('__session')?.value;

    if (!sessionCookie) {
      // Missing Session: Redirect directly to safe login route
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const session = await verifySessionToken(sessionCookie);

    if (!session) {
      // Invalid / Tampered Session: Clear cookie and redirect
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('__session');
      return response;
    }

    // RBAC: Admin Role validation check
    if (isProtectedAdminRoute && session.role !== 'admin') {
      console.warn(`[Auth Warning] Non-admin user ${session.email} attempted to access admin route.`);
      // Unauthorized: Redirect to dashboard or access denied
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

// Config matching rules for optimization
export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
