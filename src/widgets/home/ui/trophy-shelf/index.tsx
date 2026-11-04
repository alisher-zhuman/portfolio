import { useTranslations } from 'next-intl'

import { SectionHeading } from '@shared/ui'

import { TrophyIcon, type TrophyKind } from '../trophy-icon'

// Off-the-pitch honours from his LinkedIn, one line each; the texts live in messages under the
// same ids. Participation only — nothing here claims a win he hasn't confirmed.
const TROPHIES: TrophyKind[] = ['kiu', 'hackathons', 'volunteer']

export const TrophyShelf = () => {
  const t = useTranslations('Trophies')

  return (
    <section id="trophies" aria-labelledby="trophies-title" className="section-shell">
      <SectionHeading id="trophies-title" title={t('title')} lead={t('lead')} />

      <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
        {TROPHIES.map((id) => (
          <li
            key={id}
            className="reveal bg-panel text-panel-foreground relative flex h-full gap-4 overflow-hidden rounded-md py-6 pr-6 pl-7"
          >
            <span aria-hidden="true" className="bg-sun absolute inset-y-0 left-0 w-1.5" />

            <TrophyIcon kind={id} />

            <div className="min-w-0">
              <h3 className="font-display text-lg font-bold">{t(`items.${id}.title`)}</h3>
              <p className="text-kit-ink mt-0.5 text-sm font-semibold">{t(`items.${id}.meta`)}</p>
              <p className="mt-2">{t(`items.${id}.text`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
