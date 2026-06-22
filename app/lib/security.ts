import { z } from 'zod';

/**
 * HTML EXCAPING / SANITIZATION UTILITY
 * 
 * Prevents Cross-Site Scripting (XSS) and HTML Injection by replacing
 * potentially malicious markup control characters with their secure XML entities.
 */
export function escapeHTML(str: string): string {
  return str.replace(/[&<>"'/]/g, (match) => {
    switch (match) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#x27;';
      case '/': return '&#x2F;';
      default: return match;
    }
  });
}

/**
 * LOG SANITIZATION UTILITY
 * 
 * Prevents Log Injection / Log Forgery attacks by replacing carriage return (\r)
 * and newline (\n) characters with safe space replacements, ensuring user input
 * cannot manipulate log files.
 */
export function sanitizeLogInput(str: string): string {
  return str.replace(/[\r\n]/g, ' ').slice(0, 500);
}

// -------------------------------------------------------------------------
// RIGID INPUT SCHEMAS (Strict Zod Validation)
// -------------------------------------------------------------------------

/**
 * Newsletter Schema
 * - Restricts input length to prevent CPU/Memory exhaustion DoS.
 * - Forces correct RFC 5322 email format pattern.
 */
export const NewsletterSchema = z.object({
  email: z.string()
    .min(3, { message: 'Email is too short.' })
    .max(100, { message: 'Email exceeds safe length constraints.' })
    .email({ message: 'Invalid email address format.' })
    .transform((val) => escapeHTML(val.trim().toLowerCase())),
});

/**
 * Login Authentication Schema
 * - Imposes length limits to mitigate Hash CPU Denial of Service.
 * - Prevents raw injection payloads.
 */
export const LoginSchema = z.object({
  email: z.string()
    .min(3)
    .max(100)
    .email()
    .transform((val) => val.trim().toLowerCase()),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .max(72, { message: 'Password exceeds maximum length.' }), // 72 is standard bcrypt threshold
});
