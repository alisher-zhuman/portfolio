'use client'

import { type MouseEvent, type ReactNode, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useLegendStore } from '@features/cheat-code'

interface Props {
  front: ReactNode
  back: ReactNode
}

// Flips on hover in pure CSS (Tailwind's hover only applies on devices that can hover, and it works
// before hydration). Touch has no hover, so there a tap flips it. Keyboard users get a visually
// hidden button that shows on focus: the card itself can't be a button, which would hide its text
// from screen readers.
export const CardFlip = ({ front, back }: Props) => {
  const [flipped, setFlipped] = useState(false)
  const t = useTranslations('Card')
  // The cheat code's gold edition; the faces restyle themselves off data-legend.
  const legend = useLegendStore((state) => state.active)

  const toggle = () => setFlipped((value) => !value)

  const onClick = (event: MouseEvent) => {
    // A mouse already flips on hover; a click shouldn't pin it on top of that.
    if ((event.nativeEvent as PointerEvent).pointerType === 'mouse') return

    toggle()
  }

  return (
    <div className="grid w-full justify-items-center gap-3">
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

      <button
        type="button"
        aria-pressed={flipped}
        onClick={toggle}
        className="sr-only cursor-pointer rounded-sm px-2 py-1 text-sm font-semibold underline underline-offset-4 focus-visible:not-sr-only"
      >
        {t('flip')}
      </button>
    </div>
  )
}
