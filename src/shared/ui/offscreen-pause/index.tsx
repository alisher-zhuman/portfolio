'use client'

import { type ReactNode, useRef } from 'react'

import { useInView } from '@shared/hooks'

interface Props {
  children: ReactNode
  className?: string
}

// Pauses every CSS animation inside while the block is off screen (see the [data-paused] rule in
// styles/animations.css). Infinite animations nobody can see still cost frames.
export const OffscreenPause = ({ children, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  return (
    <div ref={ref} data-paused={!inView} className={className}>
      {children}
    </div>
  )
}
