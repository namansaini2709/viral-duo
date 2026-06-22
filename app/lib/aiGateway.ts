interface GatewayResult {
  success: boolean;
  error?: string;
  sanitizedPrompt?: string;
}

// 1. Adversarial Injection Detection Patterns (Case-insensitive strings)
const ADVERSARIAL_PATTERNS = [
  'ignore previous instructions',
  'ignore the instructions above',
  'system override',
  'bypass instruction',
  'you are now in developer mode',
  'disregard prior directives',
  'new rules:',
  'forget what we talked about',
];

// 2. High-Risk Output Leaks (Regular Expressions for PII)
const US_SSN_REGEX = /\b\d{3}-\d{2}-\d{4}\b/g;
const CREDIT_CARD_REGEX = /\b(?:\d[ -]*?){13,16}\b/g;

/**
 * SECURE AI GATEWAY GUARD
 * 
 * Sanitizes incoming LLM inputs and dynamically checks outputs to prevent
 * prompt injection, jailbreaking, and sensitive credential leakage.
 */
export function sanitizeLLMInput(rawPrompt: string): GatewayResult {
  // Reject excessively large inputs to mitigate token abuse Denial of Service
  if (rawPrompt.length > 2000) {
    return {
      success: false,
      error: 'Prompt size exceeds the maximum permitted payload size (2000 characters).',
    };
  }

  const normalized = rawPrompt.toLowerCase();

  // Inspect incoming prompt for common prompt injection / jailbreak payload sequences
  for (const pattern of ADVERSARIAL_PATTERNS) {
    if (normalized.includes(pattern)) {
      return {
        success: false,
        error: 'Adversarial instruction sequence detected. Action blocked by security gateway.',
      };
    }
  }

  // Remove control characters to keep prompt clean
  const sanitizedPrompt = rawPrompt.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

  return {
    success: true,
    sanitizedPrompt,
  };
}

/**
 * AI OUTPUT MODERATION FILTER
 * 
 * Scans generated LLM completions before sending them to users.
 * Automatically redacts PII (SSNs, Credit Cards) to prevent leakage of credentials.
 */
export function sanitizeLLMOutput(generatedText: string): string {
  let moderated = generatedText;

  // 1. Redact Social Security Numbers (SSN)
  moderated = moderated.replace(US_SSN_REGEX, '[REDACTED_SSN]');

  // 2. Redact Credit Card Numbers
  moderated = moderated.replace(CREDIT_CARD_REGEX, '[REDACTED_CARD]');

  return moderated;
}
