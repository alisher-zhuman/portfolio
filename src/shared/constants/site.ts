// The deployed origin, for canonical URLs, the sitemap and absolute links in link previews. Set
// NEXT_PUBLIC_SITE_URL to override it (see .env.example); the fallback is the production domain on
// Vercel, so builds without the variable still point at the live site.
const FALLBACK_SITE_URL = 'https://alisher-zhuman.vercel.app'

const resolveSiteUrl = () => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL

  if (!raw) return FALLBACK_SITE_URL

  try {
    // Normalised origin: no trailing slash, no path.
    return new URL(raw).origin
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL is not a valid URL: "${raw}"`)
  }
}

export const SITE_URL = resolveSiteUrl()
