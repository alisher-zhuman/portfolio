import { SectionHeading } from '@shared/ui'

import { PlayerCard } from '../player-card'
import { ScoutReport } from '../scout-report'

export const PlayerSection = () => (
  <section id="card" aria-labelledby="card-title" className="section-shell">
    <SectionHeading
      id="card-title"
      title="Карточка игрока"
      lead="Наведите курсор на карточку, чтобы перевернуть её."
    />

    <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
      <div className="w-full max-w-80 shrink-0">
        <PlayerCard />
      </div>

      <ScoutReport />
    </div>
  </section>
)
