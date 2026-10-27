import { useTranslations } from 'next-intl'

import { ProjectCard, projects } from '@entities/project'

import { SectionHeading } from '@shared/ui'

export const ProjectsSection = () => {
  const t = useTranslations('Projects')

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-shell">
      <SectionHeading id="projects-title" title={t('title')} lead={t('lead')} />

      <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}
