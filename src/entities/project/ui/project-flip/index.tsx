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
  // Colour of the kit stripe down the left edge of both faces.
  stripeClassName: string
}

// The kit stripe is a left border, not an overlay, so it stays put while the back scrolls.
const FACE =
  'bg-panel text-panel-foreground flex flex-col gap-2.5 rounded-md border-l-6 py-6 pr-6 pl-5.5 backface-hidden'

// The front sets the card's height. The back (the full LinkedIn list, up to seven long points)
// is laid over it and scrolls inside, so a long back doesn't leave a tall, empty front.
const FRONT = cn(FACE, 'relative h-full overflow-hidden')
const BACK = cn(FACE, 'absolute inset-0 rotate-y-180 overflow-y-auto overscroll-contain')

const BUTTON = 'cursor-pointer underline underline-offset-3'

// Flips only by button: the card holds links, so a hover or whole-card click would fight them.
// The hidden face is inert, which takes it out of the tab order and the accessibility tree; both
// faces are still in the server HTML.
export const ProjectFlip = ({
  front,
  back,
  links,
  flipLabel,
  backLabel,
  stripeClassName,
}: Props) => {
  const [flipped, setFlipped] = useState(false)
  const frontButton = useRef<HTMLButtonElement>(null)
  const backButton = useRef<HTMLButtonElement>(null)

  const backFace = useRef<HTMLDivElement>(null)

  const flip = (value: boolean) => {
    setFlipped(value)
    // The back always opens at its first point.
    if (value && backFace.current) backFace.current.scrollTop = 0
    // The pressed button turns inert; focus its twin once React has re-rendered. Without
    // preventScroll, focusing the back's button (at the bottom) would scroll the list to its end.
    requestAnimationFrame(() =>
      (value ? backButton : frontButton).current?.focus({ preventScroll: true })
    )
  }

  return (
    <div className="h-full perspective-distant">
      <div
        data-flipped={flipped}
        className="relative h-full transition-transform duration-700 ease-out transform-3d data-[flipped=true]:rotate-y-180 motion-reduce:transition-none"
      >
        <div inert={flipped} className={cn(FRONT, stripeClassName)}>
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

        <div ref={backFace} inert={!flipped} className={cn(BACK, stripeClassName)}>
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
