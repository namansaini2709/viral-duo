export interface UserSession {
  userId: string;
  email: string;
  role: 'admin' | 'team' | 'user';
  expiresAt: number;
}

const encoder = new TextEncoder();

async function getCryptoKey(): Promise<CryptoKey> {
  const secret = process.env.JWT_SECRET || 'super_secret_unbreakable_dev_key_length_32_chars_long';
  const keyData = encoder.encode(secret);
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign', 'verify']
  );
}

// Convert ArrayBuffer to hex string
function bufToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Convert hex string to Uint8Array
function hexToBuf(hex: string): Uint8Array {
  const view = new Uint8Array(hex.length / 2);
  for (let i = 0; i < view.length; i++) {
    view[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return view;
}

/**
 * Signs and generates a secure session payload using native HMAC-SHA256 Web Crypto.
 */
export async function createSessionToken(payload: Omit<UserSession, 'expiresAt'>): Promise<string> {
  const session: UserSession = {
    ...payload,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 Hours
  };

  const serialized = JSON.stringify(session);
  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(serialized)
  );
  
  const signatureHex = bufToHex(signatureBuffer);
  // Base64Url encode the payload safely
  const payloadB64 = btoa(serialized).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${payloadB64}.${signatureHex}`;
}

/**
 * Verifies the integrity and authenticity of a session token natively.
 */
export async function verifySessionToken(token: string): Promise<UserSession | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payloadB64, signatureHex] = parts;
    
    // Decode Base64Url payload safely
    const serialized = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    const session: UserSession = JSON.parse(serialized);

    // Check expiration
    if (Date.now() > session.expiresAt) {
      console.warn('[Session Warning] Token has expired.');
      return null;
    }

    // Verify signature
    const key = await getCryptoKey();
    const verified = await crypto.subtle.verify(
      'HMAC',
      key,
      hexToBuf(signatureHex) as any,
      encoder.encode(serialized)
    );

    return verified ? session : null;
  } catch (error) {
    console.error('[Session Verification Failed]', error);
    return null;
  }
}
