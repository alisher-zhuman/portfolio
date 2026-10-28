import { useTranslations } from 'next-intl'

import { ProjectCard, projects } from '@entities/project'

import { SectionHeading } from '@shared/ui'

import { ProjectsFilter } from '../projects-filter'

export const ProjectsSection = () => {
  const t = useTranslations('Projects')

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-shell">
      <SectionHeading id="projects-title" title={t('title')} lead={t('lead')} />

      <ProjectsFilter total={projects.length}>
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
