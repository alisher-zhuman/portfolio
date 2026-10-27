'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { playBoo, playWhistle } from '@shared/audio'
import { cn } from '@shared/helpers'
import { useToastStore } from '@shared/stores'

import { useMatchStore } from '../../stores'

// What the referee shows on each click on «Баги», matching Match.fouls in the messages line for line.
// The last one repeats once they are off.
const FOULS = ['yellow', 'red', 'info'] as const

// The store starts at full time, so the first render matches the server HTML exactly.
export const Scoreboard = () => {
  const minute = useMatchStore((state) => state.minute)
  const home = useMatchStore((state) => state.home)
  const goalFlash = useMatchStore((state) => state.goalFlash)
  const showToast = useToastStore((state) => state.showToast)
  const [fouls, setFouls] = useState(0)
  const t = useTranslations('Match')
  const tProfile = useTranslations('Profile')

  const sentOff = fouls >= 2

  const book = () => {
    const index = Math.min(fouls, FOULS.length - 1)
    const kind = FOULS[index] ?? 'info'
    const text = (t.raw('fouls') as string[])[index]

    if (text) showToast(text, kind)

    playWhistle([0.12, 0.12])

    if (kind === 'red') playBoo()

    setFouls((count) => count + 1)
  }

  return (
    <div
      role="group"
      aria-label={t('scoreboard')}
      className="text-board-foreground font-display flex items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-4"
    >
      <span className="min-w-0 flex-1 truncate text-right text-sm font-bold sm:text-base">
        {tProfile('name')}
      </span>

      {/* Keyed on goalFlash so each goal remounts the span and replays the flash. */}
      <span
        key={goalFlash}
        className={cn(
          'text-board-ink min-w-16 text-center text-2xl font-extrabold tabular-nums sm:text-4xl',
          goalFlash > 0 && 'animate-score-flash'
        )}
      >
        {home}:0
      </span>

      <span className="min-w-0 flex-1">
        <button
          type="button"
          onClick={book}
          title={sentOff ? t('bugsSentOff') : t('bugsTitle')}
          className={cn(
            '-ml-2 cursor-pointer rounded-md px-2 py-0.5 text-sm font-bold hover:bg-board-foreground/10 sm:text-base',
            sentOff && 'line-through opacity-60'
          )}
        >
          {t('bugs')}
        </button>
      </span>

      <span className="bg-kit text-kit-foreground min-w-13 rounded-md px-2.5 py-1 text-center text-sm font-bold tabular-nums sm:text-base">
        {minute}′
      </span>
    </div>
  )
}
