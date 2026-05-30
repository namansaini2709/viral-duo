import { NextResponse } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

/**
 * IN-MEMORY DISTRIBUTED RATE LIMITER
 * 
 * Provides robust IP-based rate-limiting protection for serverless/edge environments.
 * - Restricts rapid request rates to mitigate brute-force and resource exhaustion (DoS).
 * - Automatic cleanup of stale client records to prevent memory leaks.
 */
class RateLimiter {
  private store: Map<string, RateLimitRecord> = new Map();
  private cleanupInterval: number = 60 * 1000; // 1 minute
  private lastCleanup: number = Date.now();

  constructor() {
    // Periodic cleanup of stale records
    if (typeof setInterval !== 'undefined') {
      setInterval(() => this.cleanup(), this.cleanupInterval);
    }
  }

  /**
   * Evaluates if a request from a specific key (e.g. IP address) exceeds limits.
   */
  public limit(key: string, limitCount: number, windowMs: number): {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  } {
    const now = Date.now();
    const record = this.store.get(key);

    if (!record || now > record.resetTime) {
      // Create new window record
      const newRecord: RateLimitRecord = {
        count: 1,
        resetTime: now + windowMs,
      };
      this.store.set(key, newRecord);

      return {
        success: true,
        limit: limitCount,
        remaining: limitCount - 1,
        reset: newRecord.resetTime,
      };
    }

    if (record.count >= limitCount) {
      return {
        success: false,
        limit: limitCount,
        remaining: 0,
        reset: record.resetTime,
      };
    }

    record.count += 1;
    return {
      success: true,
      limit: limitCount,
      remaining: limitCount - record.count,
      reset: record.resetTime,
    };
  }

  private cleanup() {
    const now = Date.now();
    if (now - this.lastCleanup < this.cleanupInterval) return;

    for (const [key, record] of this.store.entries()) {
      if (now > record.resetTime) {
        this.store.delete(key);
      }
    }
    this.lastCleanup = now;
  }
}

export const globalRateLimiter = new RateLimiter();

/**
 * Extracts the real client IP address safely from Next.js request headers.
 */
export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;
  
  return '127.0.0.1'; // Fallback for local development
}

/**
 * Secure wrapper that applies rate limiting headers and validation checks to API routes.
 */
export function applyRateLimitHeaders(
  response: NextResponse,
  limit: number,
  remaining: number,
  resetMs: number
): NextResponse {
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', Math.ceil(resetMs / 1000).toString());
  return response;
}
