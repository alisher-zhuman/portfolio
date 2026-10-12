import { type ReactNode } from 'react'

import { cn } from '@shared/helpers'
import { LiveDot } from '@shared/ui'

import { type CareerEvent as CareerEventData } from '../../model/types'

interface Props {
  event: CareerEventData
  // Whether the match clock has reached this event. The server renders the final state (true);
  // the scroll clock replays it on the client.
  passed?: boolean
  // Extra content under the text, e.g. the VAR check on the big goal.
  children?: ReactNode
}

export const CareerEvent = ({ event, passed = true, children }: Props) => {
  const { minute, title, text, kind } = event
  const isGoal = kind === 'goal' || kind === 'big-goal'

  return (
    <li
      data-minute={minute}
      data-passed={passed}
      className="group relative flex gap-8 pb-11 last:pb-0 sm:gap-12"
    >
      <span
        className={cn(
          'font-display w-14 shrink-0 text-right text-2xl sm:w-18 leading-none font-extrabold tabular-nums transition-colors',
          'text-on-pitch-muted group-data-[passed=true]:text-on-pitch',
          kind === 'substitution' && 'text-sun group-data-[passed=true]:text-sun'
        )}
      >
        {minute}′
      </span>

      {/* The ball marker, centred on the touchline rail that runs through the middle of the gap.
          Mobile: w-14 + half of gap-8 = 4.5rem, minus half the marker = left-15.5.
          sm+: w-18 + half of gap-12 = 6rem, minus half the marker = left-21.5. */}
      <span
        aria-hidden="true"
        className={cn(
          'border-on-pitch bg-pitch absolute top-1 left-15.5 size-5 sm:left-21.5 rounded-full border-3 transition-colors',
          isGoal
            ? 'group-data-[passed=true]:bg-sun group-data-[passed=true]:border-sun'
            : 'group-data-[passed=true]:bg-on-pitch'
        )}
      />

      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            'font-display font-bold break-words hyphens-auto',
            kind === 'big-goal' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          )}
        >
          {kind === 'big-goal' && (
            <span className="bg-sun text-sun-foreground mr-1.5 inline-block -rotate-3 rounded-md px-2.5 py-0.5">
              ГОЛ!
            </span>
          )}
          {title}
        </h3>

        <p className="text-on-pitch-muted mt-1.5 max-w-prose">
          {kind === 'substitution' && <LiveDot />}
          {text}
        </p>

        {children}
      </div>
    </li>
  )
}
