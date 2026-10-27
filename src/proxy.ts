import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

// Sends every path without a locale to its prefixed version (/ → /ky, /abc → /ky/abc), so unknown
// paths still land on the localized 404 inside [locale].
export default createMiddleware(routing)

export const config = {
  // Skips Next internals, Vercel's analytics script and anything with a file extension
  // (robots.txt, sitemap.xml, icon.svg, resume.pdf).
  matcher: '/((?!_next|_vercel|.*\\..*).*)',
}
