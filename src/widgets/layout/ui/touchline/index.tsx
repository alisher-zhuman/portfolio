'use client'

import { useEffect, useRef } from 'react'

// Scroll progress drawn as a chalk touchline along the bottom of the screen, with a ball rolling
// along it. Everything is a transform driven by one custom property (--progress), so a scroll frame
// costs one style write and no layout; the ball's spin is tied to the same value, so it rolls back
// on its own when the page scrolls up.
export const Touchline = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = ref.current

    if (!line) return

    let frame = 0

    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0

      line.style.setProperty('--progress', progress.toFixed(4))
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="touchline pointer-events-none fixed inset-x-0 bottom-0 z-30 h-1"
    >
      <div className="touchline__bar bg-sun h-full origin-left" />

      <svg
        viewBox="0 0 20 20"
        strokeWidth={1.3}
        strokeLinejoin="round"
        className="touchline__ball stroke-navy absolute bottom-1 left-0 size-4"
      >
        <circle cx="10" cy="10" r="9.2" className="fill-ball" />
        <path d="M10 6.6L13.2 9L12 12.8H8L6.8 9Z" className="fill-navy" />
        <path
          d="M10 6.6V1M13.2 9L18.6 7.2M12 12.8L15.3 17.3M8 12.8L4.7 17.3M6.8 9L1.4 7.2"
          className="fill-none"
        />
      </svg>
    </div>
  )
}
