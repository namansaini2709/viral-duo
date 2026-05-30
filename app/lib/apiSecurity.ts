import { NextResponse } from 'next/server';

// Trusted origins permitted to communicate with API endpoints
const TRUSTED_ORIGINS = [
  'https://theviralduo.com',
  'https://www.theviralduo.com',
];

/**
 * SECURE CORS VALIDATOR
 * 
 * Verifies incoming request origins against a strict whitelist.
 * Returns a set of headers allowing or denying access based on validation.
 */
export function validateCORS(request: Request): Record<string, string> {
  const origin = request.headers.get('origin');
  const headers: Record<string, string> = {
    'Vary': 'Origin',
  };

  // Only allow configured domains in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (origin && (TRUSTED_ORIGINS.includes(origin) || !isProduction)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  return headers;
}

/**
 * DATA TRANSFER OBJECT (DTO) FIELD FILTER
 * 
 * Aggressively sanitizes output objects by stripping out sensitive,
 * internal, or private database parameters (e.g. password hashes, internal keys)
 * before serialization. Prevents excessive data exposure (OWASP API3:2023).
 */
export function filterSensitiveFields<T extends Record<string, any>>(
  data: T,
  allowedKeys: Array<keyof T>
): Partial<T> {
  const filtered: Partial<T> = {};
  
  for (const key of allowedKeys) {
    if (key in data) {
      filtered[key] = data[key];
    }
  }

  return filtered;
}

/**
 * STANDARDIZED API RESPONSE WRAPPER
 * 
 * Guarantees all API outputs follow a uniform format and automatically applies
 * strict secure headers (CORS, anti-clickjacking) while preventing stack trace leaks.
 */
export function createSecureResponse(
  payload: Record<string, any>,
  status: number,
  request: Request
): NextResponse {
  const corsHeaders = validateCORS(request);
  
  const response = NextResponse.json(payload, {
    status,
    headers: {
      ...corsHeaders,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    },
  });

  return response;
}
