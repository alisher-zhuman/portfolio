import { useFormatter, useTranslations } from 'next-intl'

import { TagList } from '@shared/ui'

import { type Project, type YearMonth } from '../../model/types'
import { ProjectFlip } from '../project-flip'

interface Props {
  project: Project
  // Shirt number printed in the corner. Decorative only.
  number: number
}

// Front: what the project is and its link. Back: what Alisher did on it (from his LinkedIn).
export const ProjectCard = ({ project, number }: Props) => {
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
    <article className="h-full">
      <ProjectFlip
        // Kit stripe: yellow for his own products, red for everything else.
        stripeClassName={club === 'own' ? 'border-sun' : 'border-kit'}
        flipLabel={t('did')}
        front={
          <>
            <span
              aria-hidden="true"
              className="font-display text-panel-edge pointer-events-none absolute top-1.5 right-4 text-7xl leading-none font-extrabold"
            >
              {number}
            </span>

            <h3 className="font-display relative pr-14 text-xl font-bold">{name}</h3>

            <p className="text-kit-ink relative text-sm font-semibold">
              {t(`clubs.${club}`)} · {period}
            </p>

            <p className="max-w-prose">{t(`items.${id}.description`)}</p>

            <TagList label={t('stackLabel')} items={stack} className="text-panel-muted mt-1" />

            <p className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-2 text-sm font-semibold">
              {/* No live link means the product is shut down or the URL is dead. */}
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener"
                  className="underline underline-offset-3"
                >
                  {url.startsWith('https://t.me/') ? t('telegram') : t('site')}
                </a>
              ) : (
                <span className="text-panel-muted">{t('inactive')}</span>
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
          </>
        }
        back={
          <>
            <p className="font-display text-xl font-bold">{name}</p>

            <p className="text-kit-ink text-sm font-semibold">{t('did')}</p>

            <ul className="grid list-disc gap-1.5 pl-4 text-xs leading-snug">
              {(t.raw(`items.${id}.did`) as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        }
      />
    </article>
  )
}
