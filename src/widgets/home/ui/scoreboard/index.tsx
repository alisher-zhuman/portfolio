'use client'

import { useState } from 'react'

import { profile } from '@entities/profile'

import { playBoo, playWhistle } from '@shared/audio'
import { cn } from '@shared/helpers'
import { useToastStore } from '@shared/stores'

import { useMatchStore } from '../../stores'

// What the referee says on each click on «Баги». The last line repeats once they are off.
const FOULS = [
  {
    text: 'Жёлтая карточка команде «Баги» за симуляцию: «на моей машине работает».',
    kind: 'yellow',
  },
  {
    text: 'Вторая жёлтая — красная! Баги удалены с поля. До следующего релиза.',
    kind: 'red',
  },
  { text: 'Баги уже в раздевалке. Судья просит не беспокоить.', kind: 'info' },
] as const

// The store starts at full time, so the first render matches the server HTML exactly.
export const Scoreboard = () => {
  const minute = useMatchStore((state) => state.minute)
  const home = useMatchStore((state) => state.home)
  const goalFlash = useMatchStore((state) => state.goalFlash)
  const showToast = useToastStore((state) => state.showToast)
  const [fouls, setFouls] = useState(0)

  const sentOff = fouls >= 2

  const book = () => {
    const foul = FOULS[Math.min(fouls, FOULS.length - 1)]

    if (foul) showToast(foul.text, foul.kind)

    playWhistle([0.12, 0.12])

    if (foul?.kind === 'red') playBoo()

    setFouls((count) => count + 1)
  }

  return (
    <div
      role="group"
      aria-label="Табло матча"
      className="text-board-foreground font-display flex items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-4"
    >
      <span className="min-w-0 flex-1 truncate text-right text-sm font-bold sm:text-base">
        {profile.name}
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
          title={sentOff ? 'Удалены с поля' : 'Не трогайте баги'}
          className={cn(
            '-ml-2 cursor-pointer rounded-md px-2 py-0.5 text-sm font-bold hover:bg-board-foreground/10 sm:text-base',
            sentOff && 'line-through opacity-60'
          )}
        >
          Баги
        </button>
      </span>

      <span className="bg-kit text-kit-foreground min-w-13 rounded-md px-2.5 py-1 text-center text-sm font-bold tabular-nums sm:text-base">
        {minute}′
      </span>
    </div>
  )
}
