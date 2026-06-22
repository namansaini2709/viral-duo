import { NextResponse } from 'next/server';
import { env } from '../../env';
import { NewsletterSchema, sanitizeLogInput } from '../../lib/security';
import { globalRateLimiter, getClientIp, applyRateLimitHeaders } from '../../lib/rateLimit';
import { logger } from '../../lib/logger';

/**
 * SECURE SERVER-SIDE BOUNDARY
 * 
 * This NextJS API route handles newsletter signups securely on the server-side.
 * It prevents exposing sensitive API keys (e.g., Resend, Mailchimp, ConvertKit)
 * to client-side browser bundles.
 */
export async function POST(request: Request) {
  const ip = getClientIp(request);
  
  // Apply aggressive rate-limiting for spam protection: 5 requests per 10 minutes
  const limiter = globalRateLimiter.limit(ip, 5, 10 * 60 * 1000);
  
  if (!limiter.success) {
    logger.warn(`Rate limit exceeded for IP: ${ip}`, 'API_NEWSLETTER');
    const errorResponse = NextResponse.json(
      { success: false, error: 'Too many subscription requests. Please try again later.' },
      { status: 429 }
    );
    return applyRateLimitHeaders(errorResponse, limiter.limit, limiter.remaining, limiter.reset);
  }

  try {
    const body = await request.json();
    
    // 1. Strict Schema Validation using Zod
    const validation = NewsletterSchema.safeParse(body);
    if (!validation.success) {
      const errorResponse = NextResponse.json(
        { success: false, error: validation.error.issues[0].message },
        { status: 400 }
      );
      return applyRateLimitHeaders(errorResponse, limiter.limit, limiter.remaining, limiter.reset);
    }

    const { email } = validation.data;
    const provider = env.NEWSLETTER_PROVIDER;

    // Sanitize values before logging to prevent Log Injection
    const safeLogEmail = sanitizeLogInput(email);
    const safeLogProvider = sanitizeLogInput(provider);

    logger.audit(`Processing signup for ${safeLogEmail} using server-only provider: ${safeLogProvider}`, 'API_NEWSLETTER', { ip });

    // 2. Server-Side Execution of Service Integrations
    if (provider === 'resend') {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.NEWSLETTER_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'The Viral Duo <newsletter@theviralduo.com>',
          to: [email],
          subject: 'Welcome to The Viral Duo Newsletter!',
          html: '<p>Thanks for subscribing! Stay viral. 🔥</p>',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error(`Resend service error: ${errorText}`, 'API_NEWSLETTER');
        throw new Error('Failed to send welcome email via Resend.');
      }
    } else if (provider === 'mailchimp') {
      // Example Mailchimp integration
      const mailchimpUrl = `https://<us-dc>.api.mailchimp.com/3.0/lists/${env.NEWSLETTER_LIST_ID}/members`;
      logger.info(`Mailchimp API targeted at: ${mailchimpUrl}`, 'API_NEWSLETTER');
      // Actual fetch implementation would go here...
    } else if (provider === 'convertkit') {
      // Example ConvertKit integration
      const convertKitUrl = `https://api.convertkit.com/v3/forms/${env.NEWSLETTER_LIST_ID}/subscribe`;
      logger.info(`ConvertKit API targeted at: ${convertKitUrl}`, 'API_NEWSLETTER');
      // Actual fetch implementation would go here...
    } else {
      // 'mock' provider or local fallback: simulate successful server integration
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    logger.info(`Successfully subscribed email: ${safeLogEmail}`, 'API_NEWSLETTER', { ip });
    const successResponse = NextResponse.json({ success: true, message: 'Successfully subscribed.' });
    return applyRateLimitHeaders(successResponse, limiter.limit, limiter.remaining, limiter.reset);
  } catch (error: any) {
    logger.error(`Exception processing subscription: ${error.message}`, 'API_NEWSLETTER');
    const errResponse = NextResponse.json(
      { success: false, error: 'Internal server error processing subscription.' },
      { status: 500 }
    );
    return applyRateLimitHeaders(errResponse, limiter.limit, limiter.remaining, limiter.reset);
  }
}
