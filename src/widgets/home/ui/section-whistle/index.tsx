'use client'

import { useEffect } from 'react'

import { playWhistle } from '@shared/audio'

// Don't whistle for the section the page loads on, or for a fling through several sections.
const ARM_DELAY_MS = 1000
const MIN_GAP_MS = 1500

// The referee whistles as a new section of the pitch reaches the middle of the screen. Silent
// unless sound is on (playWhistle is a no-op otherwise). Renders nothing.
export const SectionWhistle = () => {
  useEffect(() => {
    let current: Element | null = null
    let lastWhistle = 0
    let armed = false

    const armTimer = window.setTimeout(() => {
      armed = true
    }, ARM_DELAY_MS)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.target === current) continue

          current = entry.target
          const now = performance.now()

          if (armed && now - lastWhistle > MIN_GAP_MS) {
            lastWhistle = now
            playWhistle([0.2])
          }
        }
      },
      // A thin band across the middle of the viewport.
      { rootMargin: '-45% 0px -45% 0px' }
    )

    document.querySelectorAll('main > section').forEach((section) => observer.observe(section))

    return () => {
      window.clearTimeout(armTimer)
      observer.disconnect()
    }
  }, [])

  return null
}
