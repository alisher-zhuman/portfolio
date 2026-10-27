'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import { playFinalWhistle, playGoal } from '@shared/audio'
import { fireConfetti } from '@shared/effects'
import { useToastStore } from '@shared/stores'

import { useLegendStore } from '../../stores/legend'

// ↑ ↑ ↓ ↓ ← → ← → B A
const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

const GOAL_DELAY_MS = 900

// Arrow keys by name; letters by physical key (event.code), so B A works on a Russian layout too,
// where event.key would be «и» and «ф».
const keyOf = (event: KeyboardEvent) =>
  event.key.startsWith('Arrow') ? event.key : event.code.replace('Key', '').toLowerCase()

export const CheatCodeListener = () => {
  const t = useTranslations('CheatCode')
  const toast = t('toast')

  useEffect(() => {
    let position = 0
    let goalTimer = 0

    const onKeyDown = (event: KeyboardEvent) => {
      if (useLegendStore.getState().active) return

      const key = keyOf(event)

      if (key === SEQUENCE[position]) {
        position += 1
      } else {
        // A wrong key restarts the sequence, but may itself be its first key.
        position = key === SEQUENCE[0] ? 1 : 0
      }

      if (position < SEQUENCE.length) return

      useLegendStore.getState().activate()
      playFinalWhistle()
      goalTimer = window.setTimeout(playGoal, GOAL_DELAY_MS)
      fireConfetti({ count: 220 })
      useToastStore.getState().showToast(toast, 'goal', 5000)
      document.getElementById('card')?.scrollIntoView({ block: 'start' })
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(goalTimer)
    }
  }, [toast])

  return null
}
