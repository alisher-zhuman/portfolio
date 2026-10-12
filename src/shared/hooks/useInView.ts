'use client'

import { type RefObject, useEffect, useState } from 'react'

// Whether the element intersects the viewport (grown by rootMargin). `initial` is the answer before
// the observer first reports: true (the default) for pausing animations, so nothing server-rendered
// starts out paused; false for deferring work, so nothing loads until the element is actually near.
export const useInView = (ref: RefObject<Element | null>, rootMargin = '0px', initial = true) => {
  const [inView, setInView] = useState(initial)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting)
      },
      { rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
