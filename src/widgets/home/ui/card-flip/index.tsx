'use client'

import { type MouseEvent, type ReactNode, useState } from 'react'

import { useLegendStore } from '@features/cheat-code'

interface Props {
  front: ReactNode
  back: ReactNode
}

// Flips on hover in pure CSS (Tailwind's hover only applies on devices that can hover, and it
// works before hydration). Touch has no hover, so there a tap flips it instead.
export const CardFlip = ({ front, back }: Props) => {
  const [flipped, setFlipped] = useState(false)
  // The cheat code's gold edition; the faces restyle themselves off data-legend.
  const legend = useLegendStore((state) => state.active)

  const onClick = (event: MouseEvent) => {
    // A mouse already flips on hover; a click shouldn't pin it on top of that.
    if ((event.nativeEvent as PointerEvent).pointerType === 'mouse') return

    setFlipped((value) => !value)
  }

  return (
    <div
      onClick={onClick}
      data-flipped={flipped}
      data-legend={legend}
      className="group aspect-2/3 w-full perspective-distant"
    >
      <div className="relative size-full transition-transform duration-700 ease-out transform-3d group-hover:rotate-y-180 group-data-[flipped=true]:rotate-y-180 motion-reduce:transition-none">
        {front}

        {back}
      </div>
    </div>
  )
}
