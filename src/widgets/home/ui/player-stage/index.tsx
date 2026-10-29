'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'

import { playKick } from '@shared/audio'
import { useInView } from '@shared/hooks'

interface Props {
  // The server-rendered drawing (the tactics board).
  children: ReactNode
  // Accessible name: what the drawing shows and what a click does.
  label: string
}

const CELEBRATION_MS = 1300

// Interactive shell around the CSS-animated drawing: a click sets off its celebration (data-
// celebrating), and the animation pauses while the hero is off screen (data-paused).
export const PlayerStage = ({ children, label }: Props) => {
  const ref = useRef<HTMLButtonElement>(null)
  const inView = useInView(ref)
  const [celebrating, setCelebrating] = useState(false)

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
      aria-label={label}
      data-paused={!inView}
      data-celebrating={celebrating}
      onClick={() => {
        setCelebrating(true)
        playKick(0.8)
      }}
      className="relative grid w-full max-w-72 cursor-pointer justify-items-center rounded-2xl sm:max-w-80 lg:max-w-85"
    >
      {children}
    </button>
  )
}
