import { ProjectCard, projects } from '@entities/project'

import { SectionHeading } from '@shared/ui'

export const ProjectsSection = () => (
  <section id="projects" aria-labelledby="projects-title" className="section-shell">
    <SectionHeading
      id="projects-title"
      title="Проекты"
      lead="Над чем работал. Коротко и по делу."
    />

    <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
      {projects.map((project) => (
        <li key={project.title}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  </section>
)
