export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'AUDIT';

interface LogPayload {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  traceId?: string;
  metadata?: Record<string, any>;
}

// Regex whitelists to auto-detect and redact highly sensitive data before it hits logs
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const JWT_SECRET_REGEX = /eyJhbGciOi[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.?[a-zA-Z0-9-_=]*/g;
const GENERIC_SECRET_KEYS = /(password|api_key|token|secret|credential|db_url|auth_key|authorization)\s*[:=]\s*["']?([a-zA-Z0-9_-]{8,})["']?/gi;

/**
 * LOG SANITIZER ENGINE
 * 
 * Aggressively scans and redacts PII (Emails, JWTs, and sensitive authorization strings)
 * from logs, protecting developers from leaking credentials to centralized logging systems.
 */
export function redactSensitiveData(str: string): string {
  let sanitized = str;
  
  // 1. Redact Emails
  sanitized = sanitized.replace(EMAIL_REGEX, '[REDACTED_EMAIL]');
  
  // 2. Redact JWT Tokens
  sanitized = sanitized.replace(JWT_SECRET_REGEX, '[REDACTED_JWT]');

  // 3. Redact generic secrets/passwords patterns
  sanitized = sanitized.replace(GENERIC_SECRET_KEYS, (match, key) => `${key}: [REDACTED_KEY]`);

  return sanitized;
}

/**
 * STRUCTURED JSON LOGGER
 * 
 * Enforces structured JSON logging for improved indexability, audit tracking,
 * and automated alerting configurations in cloud monitoring platforms.
 */
class SecureLogger {
  private log(level: LogLevel, message: string, context?: string, metadata?: Record<string, any>) {
    const payload: LogPayload = {
      timestamp: new Date().toISOString(),
      level,
      message: redactSensitiveData(message),
      context,
      metadata: metadata ? JSON.parse(redactSensitiveData(JSON.stringify(metadata))) : undefined,
    };

    // Output strictly as structured stringified JSON
    const output = JSON.stringify(payload);

    if (level === 'ERROR') {
      console.error(output);
    } else {
      console.log(output);
    }
  }

  public info(message: string, context?: string, metadata?: Record<string, any>) {
    this.log('INFO', message, context, metadata);
  }

  public warn(message: string, context?: string, metadata?: Record<string, any>) {
    this.log('WARN', message, context, metadata);
  }

  public error(message: string, context?: string, metadata?: Record<string, any>) {
    this.log('ERROR', message, context, metadata);
  }

  /**
   * Secure Audit Trails tracking critical system states (like logins, signups, rate limits)
   */
  public audit(message: string, context?: string, metadata?: Record<string, any>) {
    this.log('AUDIT', message, context, metadata);
  }
}

export const logger = new SecureLogger();
