import { useTranslations } from 'next-intl'

import { ContactLinks, PlayerFigure } from '@entities/profile'

import { InsiderQuote } from '../insider-quote'
import { PlayerStage } from '../player-stage'
import { TransferPanel } from '../transfer-panel'

export const Hero = () => {
  const t = useTranslations('Hero')
  const tProfile = useTranslations('Profile')

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="container-page grid gap-6 overflow-hidden pt-6 pb-12 lg:grid-cols-12 lg:items-center lg:py-20"
    >
      <div className="lg:col-span-7">
        <p className="bg-panel text-panel-foreground inline-flex overflow-hidden rounded-md text-sm font-semibold">
          <span className="bg-kit text-kit-foreground font-display px-3 py-1.5 font-extrabold tracking-wide uppercase">
            {t('flash')}
          </span>
          <span className="px-3 py-1.5">{t('window')}</span>
        </p>

        <h1
          id="hero-title"
          className="font-display mt-4 max-w-2xl text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {t('title', { name: tProfile('name') })}
        </h1>

        <InsiderQuote />

        <TransferPanel />

        <ContactLinks className="mt-6" />
      </div>

      {/* The centre circle of the pitch, with the player warming up inside it. */}
      <div className="relative grid justify-items-center gap-2 lg:col-span-5">
        <span
          aria-hidden="true"
          className="border-chalk absolute top-1/2 left-1/2 aspect-square w-full max-w-90 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        />

        <PlayerStage>
          <PlayerFigure className="w-full" />
        </PlayerStage>

        <p className="text-on-pitch-muted relative text-sm">{t('stageHint')}</p>
      </div>
    </section>
  )
}
