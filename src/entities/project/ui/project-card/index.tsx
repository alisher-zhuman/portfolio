import { cn } from '@shared/helpers'
import { TagList } from '@shared/ui'

import { type Project } from '../../model/types'

interface Props {
  project: Project
}

export const ProjectCard = ({ project }: Props) => {
  const { number, title, context, isWork, description, stack, backendRepo, link, linkNote } =
    project

  return (
    <article className="bg-panel text-panel-foreground relative flex h-full flex-col gap-2.5 overflow-hidden rounded-md py-6 pr-6 pl-7">
      {/* Kit stripe down the left edge: red for work projects, yellow for personal ones. */}
      <span
        aria-hidden="true"
        className={cn('absolute inset-y-0 left-0 w-1.5', isWork ? 'bg-kit' : 'bg-sun')}
      />

      <span
        aria-hidden="true"
        className="font-display text-panel-edge pointer-events-none absolute top-1.5 right-4 text-7xl leading-none font-extrabold"
      >
        {number}
      </span>

      <h3 className="font-display relative pr-14 text-xl font-bold">{title}</h3>

      <p className="text-kit-ink relative text-sm font-semibold">{context}</p>

      <p className="max-w-prose">{description}</p>

      <TagList
        label="Стек"
        items={backendRepo ? [...stack, backendRepo] : stack}
        highlighted={backendRepo ? [backendRepo] : []}
        className="text-panel-muted mt-1"
      />

      <p className="text-panel-muted mt-auto pt-2 text-sm font-semibold">
        {link ? (
          <a
            href={link.href}
            target="_blank"
            rel="noopener"
            className="text-panel-foreground underline underline-offset-3"
          >
            {link.label}
          </a>
        ) : (
          linkNote
        )}
      </p>
    </article>
  )
}
