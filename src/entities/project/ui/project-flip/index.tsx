'use client'

import { type MouseEvent, type ReactNode, useState } from 'react'

import { cn } from '@shared/helpers'

interface Props {
  front: ReactNode
  back: ReactNode
  // Colour of the kit stripe down the left edge of both faces.
  stripeClassName: string
}

// The kit stripe is a left border, not an overlay, so it stays put while the back scrolls.
const FACE =
  'bg-panel text-panel-foreground flex flex-col gap-2.5 rounded-md border-l-6 py-6 pr-6 pl-5.5 backface-hidden'

// The front sets the card's height; the back is laid over it, so a long back doesn't leave a
// tall, empty front.
const FRONT = cn(FACE, 'relative h-full overflow-hidden')
const BACK = cn(FACE, 'absolute inset-0 rotate-y-180')

// A click or tap on the card flips it; another flips it back; a click on a link just follows it.
// Keyboard users flip it by tabbing into the back's list (marked data-face="back"). The front's
// links don't flip it, and it's :focus-visible, not :focus-within: a click focuses the list too,
// and the card couldn't be flipped back while it held focus.
export const ProjectFlip = ({ front, back, stripeClassName }: Props) => {
  const [flipped, setFlipped] = useState(false)

  const onClick = (event: MouseEvent) => {
    // A click on a link should just follow it.
    if ((event.target as Element).closest('a')) return

    setFlipped((value) => !value)
  }

  return (
    <div
      onClick={onClick}
      data-flipped={flipped}
      className="group h-full cursor-pointer perspective-distant"
    >
      <div className="relative h-full transition-transform duration-700 ease-out transform-3d group-has-[[data-face=back]:focus-visible]:rotate-y-180 group-data-[flipped=true]:rotate-y-180 motion-reduce:transition-none">
        <div className={cn(FRONT, stripeClassName)}>{front}</div>

        <div className={cn(BACK, stripeClassName)}>{back}</div>
      </div>
    </div>
  )
}
