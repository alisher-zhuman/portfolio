'use client'

import { cn } from '@shared/helpers'
import { type ToastKind, useToastStore } from '@shared/stores'

const ICON_CLASS: Record<ToastKind, string> = {
  yellow: 'bg-sun h-7.5 w-5.5 -rotate-6 rounded-sm',
  red: 'bg-card-red h-7.5 w-5.5 -rotate-6 rounded-sm',
  goal: "text-2xl leading-none after:content-['⚽']",
  info: 'hidden',
}

// One polite live region for every toast on the page, so screen readers hear each message once.
export const Toaster = () => {
  const toasts = useToastStore((state) => state.toasts)

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-6 left-1/2 z-40 grid w-full max-w-md -translate-x-1/2 gap-2 px-4"
    >
      {toasts.map(({ id, text, kind, leaving }) => (
        <div
          key={id}
          className={cn(
            'bg-board text-board-foreground border-chalk flex items-center gap-3 rounded-md border-2 px-4 py-3 font-medium',
            leaving ? 'animate-toast-out' : 'animate-toast-in'
          )}
        >
          <span aria-hidden="true" className={cn('shrink-0', ICON_CLASS[kind])} />

          <span>{text}</span>
        </div>
      ))}
    </div>
  )
}
