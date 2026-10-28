import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { ProjectCard, projects } from '@entities/project'

import { SectionHeading } from '@shared/ui'

// The homepage shows the newest few; the full list with the club filter lives on /projects.
const PREVIEW_COUNT = 6

export const ProjectsSection = () => {
  const t = useTranslations('Projects')

  return (
    <section id="projects" aria-labelledby="projects-home-title" className="section-shell">
      <SectionHeading id="projects-home-title" title={t('title')} lead={t('lead')} />

      <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
        {projects.slice(0, PREVIEW_COUNT).map((project, index) => (
          <li key={project.id}>
            <ProjectCard project={project} number={index + 1} />
          </li>
        ))}
      </ul>

      <Link href="/projects" className="btn mt-6">
        {t('allLink', { count: projects.length })} →
      </Link>
    </section>
  )
}
