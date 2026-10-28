import { useTranslations } from 'next-intl'

import { TagList } from '@shared/ui'

import { type Project } from '../../model/types'
import { ProjectFlip } from '../project-flip'

interface Props {
  project: Project
  // Shirt number printed in the corner. Decorative only.
  number: number
}

// Front: what the project is. Back: what Alisher did on it (from his LinkedIn) and its links.
export const ProjectCard = ({ project, number }: Props) => {
  const t = useTranslations('Projects')
  const { id, title, club, years, stack, url, codeUrl } = project
  const name = title ?? t(`items.${id}.title` as 'items.kca.title')

  return (
    <article className="h-full">
      <ProjectFlip
        // Kit stripe: yellow for his own products, red for everything else.
        stripeClassName={club === 'own' ? 'border-sun' : 'border-kit'}
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
              {t(`clubs.${club}`)} · {years}
            </p>

            <p className="max-w-prose">{t(`items.${id}.description`)}</p>

            <TagList label={t('stackLabel')} items={stack} className="text-panel-muted mt-1" />
          </>
        }
        back={
          <>
            <p className="font-display text-xl font-bold">{name}</p>

            <p className="text-kit-ink text-sm font-semibold">{t('did')}</p>

            {/* The list scrolls inside the card; tabIndex lets keyboard users scroll it too. */}
            <div
              tabIndex={0}
              className="-mr-3 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-3"
            >
              <ul className="grid list-disc gap-2 pl-5 text-sm">
                {(t.raw(`items.${id}.did`) as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <p className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-sm font-semibold">
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
      />
    </article>
  )
}
