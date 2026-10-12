'use client'

import dynamic from 'next/dynamic'

// The game is client-only (Web Animations, random dives) and only matters on the 404 page, so it
// is split out and loaded after hydration. The placeholder reserves the field's exact box so the
// page doesn't jump when the game arrives.
const PenaltyGame = dynamic(() => import('../penalty-game').then((module) => module.PenaltyGame), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="mx-auto aspect-14/11 w-full max-w-140" />,
})

export const PenaltyGameLoader = () => <PenaltyGame />
