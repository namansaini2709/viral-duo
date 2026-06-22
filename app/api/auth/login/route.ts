import { NextResponse } from 'next/server';
import { createSessionToken } from '../../../lib/auth';
import { LoginSchema, sanitizeLogInput } from '../../../lib/security';
import { globalRateLimiter, getClientIp, applyRateLimitHeaders } from '../../../lib/rateLimit';
import { logger } from '../../../lib/logger';

/**
 * SECURE AUTHENTICATION ENDPOINT
 * 
 * Demonstates the secure issuance of a signed JWT session cookie.
 * 
 * Hardening Best Practices Implemented:
 * 1. HTTPOnly cookie prevents access from client-side JavaScript (Mitigates XSS).
 * 2. Secure flag ensures cookies are only sent over encrypted HTTPS connections.
 * 3. SameSite=Lax blocks CSRF (Cross-Site Request Forgery) attacks.
 * 4. Generic login errors prevent username enumeration.
 */
export async function POST(request: Request) {
  const ip = getClientIp(request);

  // Strictly throttle login attempts to mitigate brute force: 3 attempts per 15 minutes
  const limiter = globalRateLimiter.limit(ip, 3, 15 * 60 * 1000);

  if (!limiter.success) {
    logger.warn(`Brute-force limit hit for IP: ${ip}`, 'API_AUTH_LOGIN');
    const errorResponse = NextResponse.json(
      { success: false, error: 'Too many login attempts. Please try again in 15 minutes.' },
      { status: 429 }
    );
    return applyRateLimitHeaders(errorResponse, limiter.limit, limiter.remaining, limiter.reset);
  }

  try {
    const body = await request.json();

    // Validate inputs via strict Zod constraints (limits length and format checks)
    const validation = LoginSchema.safeParse(body);
    if (!validation.success) {
      const errorResponse = NextResponse.json(
        { success: false, error: 'Invalid email or password format.' },
        { status: 400 }
      );
      return applyRateLimitHeaders(errorResponse, limiter.limit, limiter.remaining, limiter.reset);
    }

    const { email, password } = validation.data;
    const safeLogEmail = sanitizeLogInput(email);

    logger.info(`Authentication attempt received for: ${safeLogEmail}`, 'API_AUTH_LOGIN', { ip });

    // CONCEPTUAL PLACEHOLDER: Secure password validation
    // In a live system, query database and run dynamic verification:
    // const user = await db.user.findFirst({ where: { email } });
    // const matches = await bcrypt.compare(password, user.passwordHash);
    
    // Simulate validation check
    const isValidUser = email === 'admin@theviralduo.com' && password === 'admin_secure_pass_123';

    if (!isValidUser) {
      logger.audit(`Authentication failure for: ${safeLogEmail}`, 'API_AUTH_LOGIN', { ip });
      // Use generic error message to prevent account enumeration vulnerabilities
      const errorResponse = NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
      return applyRateLimitHeaders(errorResponse, limiter.limit, limiter.remaining, limiter.reset);
    }

    logger.audit(`Successful authentication for administrator: ${safeLogEmail}`, 'API_AUTH_LOGIN', { ip });

    // Generate signed token
    const token = await createSessionToken({
      userId: 'usr_admin_1',
      email: 'admin@theviralduo.com',
      role: 'admin',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Successfully logged in.',
      role: 'admin',
    });

    // Write HttpOnly secure session cookie
    response.cookies.set('__session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 Hours
    });

    return applyRateLimitHeaders(response, limiter.limit, limiter.remaining, limiter.reset);
  } catch (error: any) {
    logger.error(`Exception processing authentication: ${error.message}`, 'API_AUTH_LOGIN');
    const errResponse = NextResponse.json(
      { success: false, error: 'Internal server error processing authentication.' },
      { status: 500 }
    );
    return applyRateLimitHeaders(errResponse, limiter.limit, limiter.remaining, limiter.reset);
  }
}
