'use client'

import { type ReactNode, useState } from 'react'

interface Props {
  front: ReactNode
  back: ReactNode
}

// Two ways to flip, layered so neither fights the other:
// - hovering with a mouse flips it in pure CSS (works before hydration, and without JS at all);
// - a click, tap or the button below *pins* it flipped via data-flipped. Unpinning while the mouse
//   is still over the card leaves it showing the back until the pointer leaves — hover still holds.
export const CardFlip = ({ front, back }: Props) => {
  const [pinned, setPinned] = useState(false)

  const toggle = () => setPinned((value) => !value)

  return (
    <div className="grid w-full justify-items-center gap-3">
      {/* Clicking the card is a pointer convenience only; the button below is the keyboard and
          screen-reader path to the same toggle. */}
      <div
        onClick={toggle}
        data-flipped={pinned}
        className="group aspect-2/3 w-full cursor-pointer perspective-distant"
      >
        <div className="relative size-full transition-transform duration-700 ease-out transform-3d group-hover:rotate-y-180 group-data-[flipped=true]:rotate-y-180 motion-reduce:transition-none">
          {front}

          {back}
        </div>
      </div>

      <button
        type="button"
        aria-pressed={pinned}
        onClick={toggle}
        className="cursor-pointer rounded-sm px-2 py-1 text-sm font-semibold underline underline-offset-4"
      >
        Перевернуть карточку
      </button>
    </div>
  )
}
