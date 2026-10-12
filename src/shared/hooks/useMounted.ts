'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

// False during SSR and hydration, true afterwards — without a set-state-in-effect re-render.
export const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
