import { getLocale, getTranslations } from 'next-intl/server'

import { profile } from '@entities/profile'

import { SITE_URL } from '@shared/constants'

// The Person entity for the current locale. Its description is the same one as <meta> and Open
// Graph, so search snippets and link previews say the same thing.
export const getPersonJsonLd = async () => {
  const t = await getTranslations('Metadata')
  const tProfile = await getTranslations('Profile')
  const locale = await getLocale()

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: profile.brandName,
    alternateName: profile.nameVariants,
    givenName: profile.givenName,
    familyName: profile.familyName,
    jobTitle: profile.role,
    description: t('description'),
    url: SITE_URL,
    image: `${SITE_URL}/${locale}/opengraph-image`,
    worksFor: { '@type': 'Organization', name: tProfile('club') },
    homeLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: tProfile('city'),
        addressCountry: 'KG',
      },
    },
    // «Родом из Таласа» — the town he comes from.
    birthPlace: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: tProfile('hometown'),
        addressCountry: 'KG',
      },
    },
    knowsAbout: [...profile.stack, t('knowsAboutSecurity')],
    email: `mailto:${profile.contacts.email}`,
    telephone: profile.contacts.phone,
    sameAs: [profile.contacts.githubUrl, profile.contacts.telegramUrl],
  }
}
