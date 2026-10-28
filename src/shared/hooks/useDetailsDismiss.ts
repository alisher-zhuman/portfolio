'use client'

import { type RefObject, useEffect } from 'react'

// A <details> menu opens and closes without JavaScript but stays open until its summary is clicked
// again. This adds what a menu is expected to do: close on a click outside, after a link or button
// inside is chosen, and on Escape, which returns focus to the summary.
export const useDetailsDismiss = (ref: RefObject<HTMLDetailsElement | null>) => {
  useEffect(() => {
    const details = ref.current

    if (!details) return

    const onPointerDown = (event: PointerEvent) => {
      if (details.open && !details.contains(event.target as Node)) details.open = false
    }

    const onClick = (event: MouseEvent) => {
      if ((event.target as Element).closest('a, button')) details.open = false
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !details.open) return

      details.open = false
      details.querySelector('summary')?.focus()
    }

    document.addEventListener('pointerdown', onPointerDown)
    details.addEventListener('click', onClick)
    details.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      details.removeEventListener('click', onClick)
      details.removeEventListener('keydown', onKeyDown)
    }
  }, [ref])
}
