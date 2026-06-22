const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Pull secure key. In local/development, use a strong placeholder.
const DB_CRYPTO_SECRET = process.env.DB_CRYPTO_SECRET || 'super_secret_unbreakable_db_encryption_key_32_chars';

async function getEncryptionKey(): Promise<CryptoKey> {
  const keyData = encoder.encode(DB_CRYPTO_SECRET.slice(0, 32)); // Ensure exactly 32 bytes
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

// Convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert Base64 to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Encrypts a sensitive string field using authenticated AES-256-GCM encryption.
 * Outputs a string containing the IV and Ciphertext joined securely.
 */
export async function encryptField(plainText: string): Promise<string> {
  try {
    const key = await getEncryptionKey();
    
    // Generate a unique 12-byte initialization vector (IV) to prevent pattern attacks
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const cipherBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv as any,
      },
      key,
      encoder.encode(plainText)
    );

    const ivB64 = arrayBufferToBase64(iv.buffer);
    const cipherB64 = arrayBufferToBase64(cipherBuffer);

    return `${ivB64}:${cipherB64}`;
  } catch (error) {
    console.error('[Database Crypto Encryption Failed]', error);
    throw new Error('Encryption operation failed.');
  }
}

/**
 * Decrypts an AES-256-GCM encrypted database field.
 */
export async function decryptField(encryptedText: string): Promise<string> {
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid ciphertext format.');
    }

    const [ivB64, cipherB64] = parts;
    const key = await getEncryptionKey();
    const iv = base64ToUint8Array(ivB64);
    const cipherData = base64ToUint8Array(cipherB64);

    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv as any,
      },
      key,
      cipherData as any
    );

    return decoder.decode(decryptedBuffer);
  } catch (error) {
    console.error('[Database Crypto Decryption Failed]', error);
    throw new Error('Decryption operation failed.');
  }
}
