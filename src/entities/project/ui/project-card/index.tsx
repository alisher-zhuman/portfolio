import { useTranslations } from 'next-intl'

import { cn } from '@shared/helpers'
import { TagList } from '@shared/ui'

import { type Project } from '../../model/types'

interface Props {
  project: Project
}

export const ProjectCard = ({ project }: Props) => {
  const t = useTranslations('Projects')
  const { id, number, title, isWork, stack, backendRepo, codeUrl } = project

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

      <p className="text-kit-ink relative text-sm font-semibold">{t(`items.${id}.context`)}</p>

      <p className="max-w-prose">{t(`items.${id}.description`)}</p>

      <TagList
        label={t('stackLabel')}
        items={backendRepo ? [...stack, backendRepo] : stack}
        highlighted={backendRepo ? [backendRepo] : []}
        className="text-panel-muted mt-1"
      />

      <p className="text-panel-muted mt-auto pt-2 text-sm font-semibold">
        {codeUrl ? (
          <a
            href={codeUrl}
            target="_blank"
            rel="noopener"
            className="text-panel-foreground underline underline-offset-3"
          >
            {t('codeOnGithub')}
          </a>
        ) : (
          t('closedCode')
        )}
      </p>
    </article>
  )
}
