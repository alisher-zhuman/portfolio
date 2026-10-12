// The deployed origin, for canonical URLs, the sitemap and absolute links in link previews. Set
// NEXT_PUBLIC_SITE_URL per environment (see .env.example); the fallback keeps local builds working
// and is obviously not a real domain, so a missing variable shows up in the first preview checked.
const FALLBACK_SITE_URL = 'https://alisher.example'

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
