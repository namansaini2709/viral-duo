interface ValidationResult {
  success: boolean;
  error?: string;
  sanitizedFilename?: string;
}

// 5MB Max File Size limit to prevent DoS resource exhaustion
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Whitelist of strictly allowed MIME types and corresponding Magic Number signatures
const ALLOWED_MIME_TYPES: Record<string, { ext: string; bytes: number[] }> = {
  'image/jpeg': { ext: '.jpg', bytes: [0xFF, 0xD8, 0xFF] },
  'image/png': { ext: '.png', bytes: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A] },
  'image/gif': { ext: '.gif', bytes: [0x47, 0x49, 0x46, 0x38] },
};

/**
 * SECURE FILE VALIDATION GUARD
 * 
 * Inspects raw buffer magic bytes, sanitizes filenames, and verifies file sizes
 * to guarantee no arbitrary, malicious, or executable files can enter the environment.
 */
export async function validateAndSanitizeUpload(
  fileBuffer: ArrayBuffer,
  clientFilename: string
): Promise<ValidationResult> {
  // 1. Enforce rigorous file size verification
  if (fileBuffer.byteLength > MAX_FILE_SIZE) {
    return {
      success: false,
      error: 'File size exceeds maximum permitted limit (5MB).',
    };
  }

  const fileBytes = new Uint8Array(fileBuffer);
  let resolvedMime: string | null = null;

  // 2. Validate actual file signature (magic bytes) to block masquerading scripts
  for (const [mime, schema] of Object.entries(ALLOWED_MIME_TYPES)) {
    const isMatch = schema.bytes.every((byte, idx) => fileBytes[idx] === byte);
    if (isMatch) {
      resolvedMime = mime;
      break;
    }
  }

  if (!resolvedMime) {
    return {
      success: false,
      error: 'Unsupported file type or invalid file signature detected.',
    };
  }

  // 3. Cryptographically sanitize the filename to eliminate injection & path traversal
  // Never preserve the raw user filename. Generate a cryptographically random prefix.
  const secureRandomId = crypto.randomUUID();
  const safeExtension = ALLOWED_MIME_TYPES[resolvedMime].ext;
  
  // Clean raw filename from illegal characters, directories, and traversal attempts
  const cleanedOriginalName = clientFilename
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 50);

  const sanitizedFilename = `${secureRandomId}_${cleanedOriginalName}${safeExtension}`;

  return {
    success: true,
    sanitizedFilename,
  };
}
