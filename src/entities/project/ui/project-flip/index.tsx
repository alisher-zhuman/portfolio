'use client'

import { type ReactNode, useRef, useState } from 'react'

import { cn } from '@shared/helpers'

interface Props {
  front: ReactNode
  back: ReactNode
  // The project's links, in the front face's footer next to the flip button.
  links: ReactNode
  flipLabel: string
  backLabel: string
}

// Both faces share one grid cell, so the card is as tall as the longer face and nothing jumps.
const FACE =
  'bg-panel text-panel-foreground relative col-start-1 row-start-1 flex flex-col gap-2.5 overflow-hidden rounded-md py-6 pr-6 pl-7 backface-hidden'

const BUTTON = 'cursor-pointer underline underline-offset-3'

// Flips only by button: the card holds links, so a hover or whole-card click would fight them.
// The hidden face is inert, which takes it out of the tab order and the accessibility tree; both
// faces are still in the server HTML.
export const ProjectFlip = ({ front, back, links, flipLabel, backLabel }: Props) => {
  const [flipped, setFlipped] = useState(false)
  const frontButton = useRef<HTMLButtonElement>(null)
  const backButton = useRef<HTMLButtonElement>(null)

  const flip = (value: boolean) => {
    setFlipped(value)
    // The pressed button turns inert; focus its twin once React has re-rendered.
    requestAnimationFrame(() => (value ? backButton : frontButton).current?.focus())
  }

  return (
    <div className="h-full perspective-distant">
      <div
        data-flipped={flipped}
        className="grid h-full transition-transform duration-700 ease-out transform-3d data-[flipped=true]:rotate-y-180 motion-reduce:transition-none"
      >
        <div inert={flipped} className={FACE}>
          {front}

          <p className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-sm font-semibold">
            {links}

            <button
              ref={frontButton}
              type="button"
              onClick={() => flip(true)}
              className={cn(BUTTON, 'ml-auto')}
            >
              {flipLabel} <span aria-hidden="true">→</span>
            </button>
          </p>
        </div>

        <div inert={!flipped} className={cn(FACE, 'rotate-y-180')}>
          {back}

          <p className="mt-auto pt-2 text-sm font-semibold">
            <button ref={backButton} type="button" onClick={() => flip(false)} className={BUTTON}>
              <span aria-hidden="true">←</span> {backLabel}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
