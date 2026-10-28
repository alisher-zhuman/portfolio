import { useTranslations } from 'next-intl'

import { cn } from '@shared/helpers'
import { TagList } from '@shared/ui'

import { type Project } from '../../model/types'

interface Props {
  project: Project
  // Shirt number printed in the corner. Decorative only.
  number: number
}

export const ProjectCard = ({ project, number }: Props) => {
  const t = useTranslations('Projects')
  const { id, title, club, years, stack, url, codeUrl } = project

  return (
    <article className="bg-panel text-panel-foreground relative flex h-full flex-col gap-2.5 overflow-hidden rounded-md py-6 pr-6 pl-7">
      {/* Kit stripe down the left edge: yellow for his own products, red for everything else. */}
      <span
        aria-hidden="true"
        className={cn('absolute inset-y-0 left-0 w-1.5', club === 'own' ? 'bg-sun' : 'bg-kit')}
      />

      <span
        aria-hidden="true"
        className="font-display text-panel-edge pointer-events-none absolute top-1.5 right-4 text-7xl leading-none font-extrabold"
      >
        {number}
      </span>

      <h3 className="font-display relative pr-14 text-xl font-bold">
        {title ?? t(`items.${id}.title` as 'items.kca.title')}
      </h3>

      <p className="text-kit-ink relative text-sm font-semibold">
        {t(`clubs.${club}`)} · {years}
      </p>

      <p className="max-w-prose">{t(`items.${id}.description`)}</p>

      <TagList label={t('stackLabel')} items={stack} className="text-panel-muted mt-1" />

      {(url || codeUrl) && (
        <p className="mt-auto flex flex-wrap gap-x-4 pt-2 text-sm font-semibold">
          {url && (
            <a href={url} target="_blank" rel="noopener" className="underline underline-offset-3">
              {t('site')}
            </a>
          )}
          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-3"
            >
              {t('codeOnGithub')}
            </a>
          )}
        </p>
      )}
    </article>
  )
}
