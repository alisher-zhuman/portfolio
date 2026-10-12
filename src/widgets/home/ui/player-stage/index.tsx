'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'

import { profile } from '@entities/profile'

import { playKick } from '@shared/audio'
import { useInView } from '@shared/hooks'

interface Props {
  // The server-rendered PlayerFigure.
  children: ReactNode
}

const CELEBRATION_MS = 1300

// Head centre in the figure's 220×300 viewBox, as a share of the rendered box.
const HEAD_X = 106 / 220
const HEAD_Y = 62 / 300

// Interactive shell around the CSS-animated player: the eyes and head follow the pointer, a click
// sets off a celebration, and the juggling pauses while the hero is off screen. The figure reads
// --eye-x, --eye-y and --tilt, which inherit from this button.
export const PlayerStage = ({ children }: Props) => {
  const ref = useRef<HTMLButtonElement>(null)
  const inView = useInView(ref)
  const [celebrating, setCelebrating] = useState(false)

  useEffect(() => {
    const stage = ref.current

    if (!stage || !inView) return

    let frame = 0
    let pointer = { x: 0, y: 0 }

    // Read layout once per frame at most, however many pointermove events arrive.
    const look = () => {
      frame = 0
      const rect = stage.getBoundingClientRect()
      const dx = pointer.x - (rect.left + HEAD_X * rect.width)
      const dy = pointer.y - (rect.top + HEAD_Y * rect.height)
      const distance = Math.hypot(dx, dy) || 1
      // Full deflection only from ~300px away; a cursor on the face barely moves the eyes.
      const reach = Math.min(1, distance / 300)

      stage.style.setProperty('--eye-x', `${((dx / distance) * 3 * reach).toFixed(2)}px`)
      stage.style.setProperty('--eye-y', `${((dy / distance) * 2.5 * reach).toFixed(2)}px`)
      stage.style.setProperty('--tilt', `${((dx / distance) * 6 * reach).toFixed(2)}deg`)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY }

      if (!frame) frame = window.requestAnimationFrame(look)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.cancelAnimationFrame(frame)
    }
  }, [inView])

  useEffect(() => {
    if (!celebrating) return

    const timer = window.setTimeout(() => setCelebrating(false), CELEBRATION_MS)

    return () => window.clearTimeout(timer)
  }, [celebrating])

  return (
    <button
      ref={ref}
      type="button"
      // Includes the shirt number: it is visible text inside the drawing, and WCAG 2.5.3 wants
      // visible text to be part of the accessible name.
      aria-label={`Футболист с номером ${profile.shirtNumber} чеканит мяч. Нажмите, чтобы он отпраздновал`}
      data-paused={!inView}
      data-celebrating={celebrating}
      onClick={() => {
        setCelebrating(true)
        playKick(0.8)
      }}
      className="relative grid w-3/5 max-w-75 cursor-pointer justify-items-center rounded-full lg:w-full lg:max-w-85"
    >
      {children}
    </button>
  )
}
