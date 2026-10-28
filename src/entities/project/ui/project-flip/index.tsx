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

// Flips on hover (Tailwind's hover only applies on devices that can hover) and while keyboard
// focus is inside, so keyboard users reach the back's links. :focus-visible, not :focus-within: a
// click or tap focuses the scrolling list, and the card would stay flipped after the mouse left.
// Touch has no hover: a tap flips it instead.
export const ProjectFlip = ({ front, back, stripeClassName }: Props) => {
  const [flipped, setFlipped] = useState(false)

  const onClick = (event: MouseEvent) => {
    // A mouse already flips on hover, and a tap on a link should just follow it.
    if ((event.nativeEvent as PointerEvent).pointerType === 'mouse') return
    if ((event.target as Element).closest('a')) return

    setFlipped((value) => !value)
  }

  return (
    <div onClick={onClick} data-flipped={flipped} className="group h-full perspective-distant">
      <div className="relative h-full transition-transform duration-700 ease-out transform-3d group-has-focus-visible:rotate-y-180 group-hover:rotate-y-180 group-data-[flipped=true]:rotate-y-180 motion-reduce:transition-none">
        <div className={cn(FRONT, stripeClassName)}>{front}</div>

        <div className={cn(BACK, stripeClassName)}>{back}</div>
      </div>
    </div>
  )
}
