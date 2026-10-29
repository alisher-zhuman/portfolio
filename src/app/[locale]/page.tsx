import type { Metadata } from 'next'

import { routing } from '@/i18n/routing'

import { getPersonJsonLd } from '@app/helpers'

import {
  CoachQuotes,
  Hero,
  MatchSection,
  PlayerSection,
  ProjectsSection,
  SectionWhistle,
} from '@widgets/home'

import { JsonLd, PageTransition } from '@shared/ui'

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
  <PageTransition>
    <main id="main">
      <JsonLd data={await getPersonJsonLd()} />

      <Hero />

      <PlayerSection />

      <MatchSection />

      <CoachQuotes />

      <ProjectsSection />

      <SectionWhistle />
    </main>
  </PageTransition>
)

export default HomePage
