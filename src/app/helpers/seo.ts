import { profile } from '@entities/profile'

import { SITE_URL } from '@shared/constants'

// One description for <meta>, Open Graph and JSON-LD, so search snippets and link previews say the
// same thing. Leads with the Cyrillic full name: the site is in Russian and so are most searches.
export const SITE_DESCRIPTION = `${profile.nameVariants[0]} (${profile.brandName}) — ${profile.role} в «${profile.club}», ${profile.city}. React, Next.js, TypeScript; переход в бэкенд: Node.js и SQL.`

export const getPersonJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: profile.brandName,
  alternateName: profile.nameVariants,
  givenName: profile.givenName,
  familyName: profile.familyName,
  jobTitle: profile.role,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  worksFor: { '@type': 'Organization', name: profile.club },
  homeLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressLocality: profile.city, addressCountry: 'KG' },
  },
  // «Родом из Таласа» — the town he comes from.
  birthPlace: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressLocality: profile.hometown, addressCountry: 'KG' },
  },
  knowsAbout: [...profile.scout.stack, 'Node.js', 'SQL', 'Информационная безопасность'],
  sameAs: [profile.contacts.githubUrl, profile.contacts.telegramUrl],
})
