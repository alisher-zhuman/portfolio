import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { routing } from '@/i18n/routing'

import { ProjectsCatalog } from '@widgets/projects'

import { PageTransition } from '@shared/ui'

export const generateMetadata = async ({
  params,
}: PageProps<'/[locale]/projects'>): Promise<Metadata> => {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  const t = await getTranslations({ locale, namespace: 'Projects' })

  return {
    title: t('title'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        ...Object.fromEntries(routing.locales.map((code) => [code, `/${code}/projects`])),
        'x-default': `/${routing.defaultLocale}/projects`,
      },
    },
  }
}

const ProjectsPage = () => (
  <PageTransition>
    <main id="main">
      <ProjectsCatalog />
    </main>
  </PageTransition>
)

export default ProjectsPage
