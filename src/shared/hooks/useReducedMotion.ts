'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const subscribe = (callback: () => void) => {
  const query = window.matchMedia(QUERY)
  query.addEventListener('change', callback)

  return () => query.removeEventListener('change', callback)
}

// Live: flips if the visitor changes the OS setting while the page is open. The server snapshot
// assumes reduced motion, so nothing motion-heavy is rendered before the client has checked.
export const useReducedMotion = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true
  )
