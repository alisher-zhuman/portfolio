import type { MetadataRoute } from 'next'

import { routing } from '@/i18n/routing'

import { SITE_URL } from '@shared/constants'

const languages = Object.fromEntries(
  routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}`])
)

// The homepage in each language, each entry listing all three as alternates. The 404 is
// deliberately absent — it is noindex by design.
// No lastModified: `new Date()` would make this route dynamic under Cache Components, and a date
// that just tracks the last build would misreport content changes to crawlers anyway.
const sitemap = (): MetadataRoute.Sitemap =>
  routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    changeFrequency: 'monthly',
    priority: 1,
    alternates: { languages },
  }))

export default sitemap
