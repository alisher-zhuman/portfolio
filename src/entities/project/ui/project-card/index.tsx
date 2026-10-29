import { useFormatter, useTranslations } from 'next-intl'

import { cn } from '@shared/helpers'
import { TagList } from '@shared/ui'

import { type Project, type YearMonth } from '../../model/types'

interface Props {
  project: Project
  // Shirt number printed in the corner. Decorative only.
  number: number
  // h3 under a section heading on the home page; h2 straight under the h1 on /projects.
  headingAs?: 'h2' | 'h3'
}

export const ProjectCard = ({ project, number, headingAs: Heading = 'h3' }: Props) => {
  const t = useTranslations('Projects')
  const format = useFormatter()
  const { id, title, club, from, to, stack, url, codeUrl } = project
  const name = title ?? t(`items.${id}.title` as 'items.kca.title')

  // "Aug 2025" / "авг. 2025": the month alone, then the year, which keeps Russian's «г.» out.
  const month = (value: YearMonth) => {
    const year = Number(value.slice(0, 4))
    const date = new Date(Date.UTC(year, Number(value.slice(5, 7)) - 1))

    return `${format.dateTime(date, { month: 'short', timeZone: 'UTC' })} ${year}`
  }
  const period = to
    ? `${month(from)} – ${to === 'present' ? t('present') : month(to)}`
    : month(from)

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

      <Heading className="font-display relative pr-14 text-xl font-bold">{name}</Heading>

      <p className="text-kit-ink relative text-sm font-semibold">
        {t(`clubs.${club}`)} · {period}
      </p>

      <p className="max-w-prose">{t(`items.${id}.description`)}</p>

      <TagList label={t('stackLabel')} items={stack} className="text-panel-muted mt-1" />

      <p className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-2 text-sm font-semibold">
        {/* No live link means the product is shut down or the URL is dead. */}
        {url ? (
          <a href={url} target="_blank" rel="noopener" className="underline underline-offset-3">
            {url.startsWith('https://t.me/') ? t('telegram') : t('site')}
          </a>
        ) : (
          <span className="text-panel-muted">{t('inactive')}</span>
        )}
        {codeUrl && (
          <a href={codeUrl} target="_blank" rel="noopener" className="underline underline-offset-3">
            {t('codeOnGithub')}
          </a>
        )}
      </p>
    </article>
  )
}
