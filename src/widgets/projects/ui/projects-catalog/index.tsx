import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { ProjectCard, projects } from '@entities/project'

import { SectionHeading } from '@shared/ui'

import { ProjectsFilter } from '../projects-filter'

// The /projects page: every project, filterable by club.
export const ProjectsCatalog = () => {
  const t = useTranslations('Projects')

  return (
    <section aria-labelledby="projects-title" className="container-page py-10 sm:py-14">
      <Link
        href="/#projects"
        className="text-on-pitch-muted hover:text-on-pitch mb-6 inline-block text-sm font-semibold underline underline-offset-3"
      >
        ← {t('backHome')}
      </Link>

      <SectionHeading id="projects-title" as="h1" title={t('title')} lead={t('pageLead')} />

      <ProjectsFilter>
        <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
          {projects.map((project, index) => (
            <li key={project.id} data-club={project.club}>
              <ProjectCard project={project} number={index + 1} />
            </li>
          ))}
        </ul>
      </ProjectsFilter>
    </section>
  )
}
