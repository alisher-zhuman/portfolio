'use client'

import dynamic from 'next/dynamic'

import { useReducedMotion } from '@shared/hooks'

// The physics ball is pure decoration with nothing to server-render, so it is loaded client-only
// and after hydration. Under reduced motion it is not loaded at all — not just hidden.
const Ball = dynamic(() => import('../ball').then((module) => module.Ball), { ssr: false })

export const BallLoader = () => {
  const reducedMotion = useReducedMotion()

  return reducedMotion ? null : <Ball />
}
