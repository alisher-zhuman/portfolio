import type { MetadataRoute } from 'next'

import { routing } from '@/i18n/routing'

import { SITE_URL } from '@shared/constants'

// Every page in each language, each entry listing all three languages as alternates. The 404 is
// deliberately absent — it is noindex by design.
// No lastModified: `new Date()` would make this route dynamic under Cache Components, and a date
// that just tracks the last build would misreport content changes to crawlers anyway.
const PAGES = [
  { path: '', priority: 1 },
  { path: '/projects', priority: 0.8 },
]

const sitemap = (): MetadataRoute.Sitemap =>
  PAGES.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((code) => [code, `${SITE_URL}/${code}${path}`])
        ),
      },
    }))
  )

export default sitemap
