'use client'

import { useEffect, useRef } from 'react'

// How long after the last scroll event the runner stops.
const STOP_MS = 160

// Scroll progress drawn as a chalk touchline along the bottom of the screen, with a tiny player
// running along it in the direction of the scroll. Everything is a transform driven by one custom
// property (--progress), so a scroll frame costs one style write and no layout.
export const Touchline = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = ref.current

    if (!line) return

    let frame = 0
    let stopTimer = 0
    let lastY = window.scrollY

    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0

      line.style.setProperty('--progress', progress.toFixed(4))
      line.dataset.direction = window.scrollY < lastY ? 'back' : 'forward'
      lastY = window.scrollY
    }

    const onScroll = () => {
      line.dataset.running = 'true'
      window.clearTimeout(stopTimer)
      stopTimer = window.setTimeout(() => {
        line.dataset.running = 'false'
      }, STOP_MS)

      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.cancelAnimationFrame(frame)
      window.clearTimeout(stopTimer)
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
        viewBox="0 0 24 28"
        strokeWidth={2.4}
        strokeLinecap="round"
        className="touchline__runner stroke-on-pitch absolute bottom-0.75 left-0 h-6 w-5 fill-none"
      >
        <circle cx="13" cy="5" r="4" className="fill-kit stroke-none" />
        <path d="M12 9l-1 9" />
        <path d="M11 18l-4 8" className="touchline__leg-a" />
        <path d="M11 18l4 8" className="touchline__leg-b" />
        <path d="M12 11l-5 4M12 11l5 3" />
      </svg>
    </div>
  )
}
