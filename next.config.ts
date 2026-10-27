import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// The site is static with no third-party embeds or cross-origin forms, so the CSP only closes
// clickjacking, base-URL hijacking and plugins without touching resource loading.
const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  {
    key: 'Content-Security-Policy',
    value: "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'",
  },
]

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Don't advertise the framework and its version on every response.
  poweredByHeader: false,
  headers: async () => [{ source: '/:path*', headers: SECURITY_HEADERS }],
}

// Points next-intl at src/i18n/request.ts (its default location).
const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
