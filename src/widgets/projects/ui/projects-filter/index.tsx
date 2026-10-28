'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { PROJECT_CLUBS, type ProjectClub } from '@entities/project'

interface Props {
  // The server-rendered list; each <li> carries data-club.
  children: ReactNode
}

// The cards are Server Components, so instead of re-rendering them this toggles `hidden` on the
// <li>s the server produced. Without JavaScript every card stays visible.
export const ProjectsFilter = ({ children }: Props) => {
  const [club, setClub] = useState<ProjectClub | 'all'>('all')
  const ref = useRef<HTMLDivElement>(null)
  const t = useTranslations('Projects')

  useEffect(() => {
    ref.current?.querySelectorAll<HTMLElement>('li[data-club]').forEach((item) => {
      item.hidden = club !== 'all' && item.dataset.club !== club
    })
  }, [club])

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
    </div>
  )
}
