import { useTranslations } from 'next-intl'

import { SectionHeading } from '@shared/ui'

import { PlayerCard } from '../player-card'
import { ScoutReport } from '../scout-report'

export const PlayerSection = () => {
  const t = useTranslations('Card')

  return (
    <section id="card" aria-labelledby="card-title" className="section-shell">
      <SectionHeading id="card-title" title={t('title')} lead={t('lead')} />

      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
        <div className="reveal w-full max-w-80 shrink-0">
          <PlayerCard />
        </div>

        <ScoutReport />
      </div>
    </section>
  )
}
