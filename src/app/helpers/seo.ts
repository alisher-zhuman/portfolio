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
    // «Түндүк & Кызмат»: the whole team moved from one to the other (2026-11), so both are named.
    worksFor: tProfile('club')
      .split(' & ')
      .map((name) => ({ '@type': 'Organization', name })),
    homeLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: tProfile('city'),
        addressCountry: 'KG',
      },
    },
    // No birthPlace: «родом из Таласа» is his hometown, not a confirmed place of birth (dropped
    // 2026-11-01). The card shows the hometown as text.
    knowsAbout: [...profile.stack, t('knowsAboutSecurity')],
    email: `mailto:${profile.contacts.email}`,
    telephone: profile.contacts.phone,
    sameAs: [
      profile.contacts.linkedinUrl,
      profile.contacts.githubUrl,
      profile.contacts.telegramUrl,
      profile.contacts.instagramUrl,
    ],
  }
}
