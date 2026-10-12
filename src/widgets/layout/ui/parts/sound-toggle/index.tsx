'use client'

import { useEffect } from 'react'

import { cn } from '@shared/helpers'
import { useSoundStore } from '@shared/stores'

// Off by default on every visit. The accessible name is just «Звук» and the on/off state is
// aria-pressed — so the name stays stable and is contained in the visible text «Звук выкл.»
// (WCAG 2.5.3, Label in Name: a voice-control user can say what they see). On the narrowest
// screens «Звук» is visually hidden but still names the button.
export const SoundToggle = () => {
  const enabled = useSoundStore((state) => state.enabled)
  const toggle = useSoundStore((state) => state.toggle)
  const release = useSoundStore((state) => state.release)

  // Free the audio device when the page goes away (including into the back/forward cache).
  useEffect(() => {
    window.addEventListener('pagehide', release)

    return () => window.removeEventListener('pagehide', release)
  }, [release])

  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => void toggle()}
      className={cn(
        'border-sun inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border-2 px-2.5 text-sm font-semibold sm:px-3',
        enabled ? 'bg-sun text-sun-foreground' : 'text-on-pitch'
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 fill-none stroke-current"
      >
        <path d="M4 9h4l5-4v14l-5-4H4z" className="fill-current" />
        {enabled ? (
          <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
        ) : (
          <path d="M16 9l6 6M22 9l-6 6" />
        )}
      </svg>

      <span className="max-sm:sr-only">Звук</span>

      <span aria-hidden="true" className="-ml-1 max-sm:hidden">
        {enabled ? 'вкл.' : 'выкл.'}
      </span>
    </button>
  )
}
