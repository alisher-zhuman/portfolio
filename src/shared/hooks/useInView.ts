'use client'

import { type RefObject, useEffect, useState } from 'react'

// Whether the element intersects the viewport (grown by rootMargin). Starts as true so nothing
// server-rendered is paused before the observer has had a chance to report.
export const useInView = (ref: RefObject<Element | null>, rootMargin = '0px') => {
  const [inView, setInView] = useState(true)

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
