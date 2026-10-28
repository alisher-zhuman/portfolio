'use client'

import { type ReactNode, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useLegendStore } from '@features/cheat-code'

interface Props {
  front: ReactNode
  back: ReactNode
}

// A click or tap on the card flips it; another flips it back. The card itself can't be a button
// (a button's content is hidden from screen readers), so keyboard users get a visually hidden
// button that appears when it takes focus.
export const CardFlip = ({ front, back }: Props) => {
  const [flipped, setFlipped] = useState(false)
  const t = useTranslations('Card')
  // The cheat code's gold edition; the faces restyle themselves off data-legend.
  const legend = useLegendStore((state) => state.active)

  const toggle = () => setFlipped((value) => !value)

  return (
    <div className="grid w-full justify-items-center gap-3">
      <div
        onClick={toggle}
        data-flipped={flipped}
        data-legend={legend}
        className="group aspect-2/3 w-full cursor-pointer perspective-distant"
      >
        <div className="relative size-full transition-transform duration-700 ease-out transform-3d group-data-[flipped=true]:rotate-y-180 motion-reduce:transition-none">
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
