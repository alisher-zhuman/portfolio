import { useTranslations } from 'next-intl'

import { ContactLinks, profile } from '@entities/profile'

import { InsiderQuote } from '../insider-quote'
import { PlayerStage } from '../player-stage'
import { TacticsBoard } from '../tactics-board'
import { TransferPanel } from '../transfer-panel'

export const Hero = () => {
  const t = useTranslations('Hero')
  const isWindowOpen = profile.transferWindow === 'open'

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="container-page grid gap-6 overflow-hidden pt-6 pb-12 lg:grid-cols-12 lg:items-center lg:py-20"
    >
      <div className="min-w-0 lg:col-span-7">
        <p className="bg-panel text-panel-foreground inline-flex overflow-hidden rounded-md text-sm font-semibold">
          <span className="bg-kit text-kit-foreground font-display px-3 py-1.5 font-extrabold tracking-wide uppercase">
            {isWindowOpen ? t('flashOpen') : t('flashClosed')}
          </span>
          <span className="px-3 py-1.5">{isWindowOpen ? t('windowOpen') : t('windowClosed')}</span>
        </p>

        <h1
          id="hero-title"
          className="font-display mt-4 max-w-2xl text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {t('title')}
        </h1>

        <InsiderQuote />

        <TransferPanel />

        <ContactLinks className="mt-6" />
      </div>

      {/* The coach's tactics board: number 7 in the middle of every move. */}
      <div className="relative grid justify-items-center gap-2 lg:col-span-5">
        <PlayerStage label={t('boardLabel', { number: profile.shirtNumber })}>
          <TacticsBoard />
        </PlayerStage>

        <p className="text-on-pitch-muted relative text-sm">{t('stageHint')}</p>
      </div>
    </section>
  )
}
