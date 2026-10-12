import type { Metadata } from 'next'

import { getPersonJsonLd } from '@app/helpers'

import {
  Hero,
  MatchSection,
  PlayerSection,
  ProjectsSection,
  RateSection,
  SectionWhistle,
} from '@widgets/home'

import { JsonLd } from '@shared/ui'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const HomePage = () => (
  <main id="main">
    <JsonLd data={getPersonJsonLd()} />

    <Hero />

    <PlayerSection />

    <MatchSection />

    <ProjectsSection />

    <RateSection />

    <SectionWhistle />
  </main>
)

export default HomePage
