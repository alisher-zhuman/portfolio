import type { MetadataRoute } from 'next'

import { SITE_URL } from '@shared/constants'

// One page today. The 404 is deliberately absent — it is noindex by design.
// No lastModified: `new Date()` would make this route dynamic under Cache Components, and a date
// that just tracks the last build would misreport content changes to crawlers anyway.
const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: `${SITE_URL}/`,
    changeFrequency: 'monthly',
    priority: 1,
  },
]

export default sitemap
