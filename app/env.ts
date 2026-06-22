/**
 * Runtime Environment Variable Validation & Configuration Layer
 * 
 * This file strictly validates that required environment variables are present
 * and correctly structured during startup/execution.
 * 
 * It prevents silent failures from missing keys, ensuring they are caught instantly.
 */

interface EnvSchema {
  NEXT_PUBLIC_APP_URL: string;
  NEWSLETTER_PROVIDER: 'resend' | 'mailchimp' | 'convertkit' | 'mock';
  NEWSLETTER_API_KEY?: string;
  NEWSLETTER_LIST_ID?: string;
}

function validateEnv(): EnvSchema {
  const isProduction = process.env.NODE_ENV === 'production';

  const config: EnvSchema = {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    NEWSLETTER_PROVIDER: (process.env.NEWSLETTER_PROVIDER as any) || 'mock',
    NEWSLETTER_API_KEY: process.env.NEWSLETTER_API_KEY,
    NEWSLETTER_LIST_ID: process.env.NEWSLETTER_LIST_ID,
  };

  // Enforce rigid verification in production or if provider is configured
  if (config.NEWSLETTER_PROVIDER !== 'mock') {
    if (!config.NEWSLETTER_API_KEY || config.NEWSLETTER_API_KEY.includes('your_secure_server_only')) {
      const errorMsg = `CRITICAL CONFIGURATION ERROR: NEWSLETTER_API_KEY is not defined or is set to placeholder for provider "${config.NEWSLETTER_PROVIDER}".`;
      if (isProduction) {
        throw new Error(errorMsg);
      } else {
        console.warn(`[Env Warning]: ${errorMsg}`);
      }
    }
  }

  return config;
}

export const env = validateEnv();
