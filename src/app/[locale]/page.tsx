import type { Metadata } from 'next'

import { routing } from '@/i18n/routing'

import { getPersonJsonLd } from '@app/helpers'

import { Hero, MatchSection, PlayerSection, ProjectsSection, SectionWhistle } from '@widgets/home'

import { JsonLd } from '@shared/ui'

// Canonical and hreflang live here, not in the layout, so the 404 doesn't inherit them.
export const generateMetadata = async ({ params }: PageProps<'/[locale]'>): Promise<Metadata> => {
  const { locale } = await params

  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((code) => [code, `/${code}`])),
        'x-default': `/${routing.defaultLocale}`,
      },
    },
  }
}

const HomePage = async () => (
  <main id="main">
    <JsonLd data={await getPersonJsonLd()} />

    <Hero />

    <PlayerSection />

    <MatchSection />

    <ProjectsSection />

    <SectionWhistle />
  </main>
)

export default HomePage
