/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // In development mode, NextJS requires 'unsafe-eval' for HMR, Turbopack source maps, and callstack reconstruction.
    // In production mode, 'unsafe-eval' is strictly omitted to prevent any XSS code evaluation vulnerabilities.
    const scriptSrc = `default-src 'self'; script-src 'self' 'unsafe-inline' ${isDevelopment ? "'unsafe-eval'" : ""} https://app.cal.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://app.cal.com; frame-src 'self' https://app.cal.com;`;

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: scriptSrc,
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), battery=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
