'use client'

import { type MouseEvent, type ReactNode, useState } from 'react'

import { cn } from '@shared/helpers'

interface Props {
  front: ReactNode
  back: ReactNode
  // Colour of the kit stripe down the left edge of both faces.
  stripeClassName: string
  // Name of the keyboard-only flip button.
  flipLabel: string
}

// The kit stripe is a left border, so both faces carry it. Both faces share one grid cell: the card
// is as tall as the longer face, and nothing scrolls inside it.
const FACE =
  'bg-panel text-panel-foreground col-start-1 row-start-1 flex flex-col gap-2.5 rounded-md border-l-6 py-6 pr-6 pl-5.5 backface-hidden'

// A click or tap on the card flips it; another flips it back; a click on a link just follows it.
// The hidden face takes no pointer events: it sits in the same place, and would otherwise catch
// clicks and wheel scrolling meant for the visible one. The card itself can't be a button (that
// would hide its links), so keyboard users get a visually hidden button that shows on focus.
export const ProjectFlip = ({ front, back, stripeClassName, flipLabel }: Props) => {
  const [flipped, setFlipped] = useState(false)

  const toggle = () => setFlipped((value) => !value)

  const onClick = (event: MouseEvent) => {
    // Links follow, and the flip button toggles on its own.
    if ((event.target as Element).closest('a, button')) return

    toggle()
  }

  return (
    <div
      onClick={onClick}
      data-flipped={flipped}
      className="group relative h-full cursor-pointer perspective-distant"
    >
      <div className="grid h-full transition-transform duration-700 ease-out transform-3d group-data-[flipped=true]:rotate-y-180 motion-reduce:transition-none">
        <div
          className={cn(
            FACE,
            'relative overflow-hidden group-data-[flipped=true]:pointer-events-none',
            stripeClassName
          )}
        >
          {front}
        </div>

        <div
          className={cn(
            FACE,
            'pointer-events-none rotate-y-180 group-data-[flipped=true]:pointer-events-auto',
            stripeClassName
          )}
        >
          {back}
        </div>
      </div>

      <button
        type="button"
        aria-pressed={flipped}
        onClick={toggle}
        className="bg-panel text-panel-foreground sr-only rounded-sm px-2 py-1 text-sm font-semibold underline underline-offset-3 focus-visible:not-sr-only focus-visible:absolute focus-visible:right-4 focus-visible:bottom-4"
      >
        {flipLabel}
      </button>
    </div>
  )
}
