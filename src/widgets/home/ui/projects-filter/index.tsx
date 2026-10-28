'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { PROJECT_CLUBS, type ProjectClub } from '@entities/project'

interface Props {
  // The server-rendered list; each <li> carries data-club.
  children: ReactNode
  total: number
}

// Cards visible under "All" before "Show all": a long list would fill several phone screens.
const PREVIEW_COUNT = 6

// The cards are Server Components, so instead of re-rendering them this toggles `hidden` on the
// <li>s the server produced. Without JavaScript every card stays visible.
export const ProjectsFilter = ({ children, total }: Props) => {
  const [club, setClub] = useState<ProjectClub | 'all'>('all')
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const t = useTranslations('Projects')

  useEffect(() => {
    let shown = 0

    ref.current?.querySelectorAll<HTMLElement>('li[data-club]').forEach((item) => {
      const matches = club === 'all' || item.dataset.club === club

      item.hidden = !matches || (club === 'all' && !expanded && shown >= PREVIEW_COUNT)

      if (matches) shown++
    })
  }, [club, expanded])

  const options = ['all', ...PROJECT_CLUBS] as const

  return (
    <div ref={ref}>
      <div role="group" aria-label={t('filterLabel')} className="mb-6 flex flex-wrap gap-2">
        {options.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={value === club}
            onClick={() => setClub(value)}
            className="btn aria-pressed:bg-on-pitch aria-pressed:text-pitch min-h-10 px-3.5 py-1.5"
          >
            {value === 'all' ? t('all') : t(`clubs.${value}`)}
          </button>
        ))}
      </div>

      {children}

      {club === 'all' && !expanded && total > PREVIEW_COUNT && (
        <button type="button" onClick={() => setExpanded(true)} className="btn mt-6">
          {t('showAll', { count: total })}
        </button>
      )}
    </div>
  )
}
