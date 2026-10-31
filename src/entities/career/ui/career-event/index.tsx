import { type ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import { cn } from '@shared/helpers'
import { LiveDot } from '@shared/ui'

import { type CareerEvent as CareerEventData } from '../../model/types'

interface Props {
  event: CareerEventData
  // Extra content under the text, e.g. the VAR check on the big goal.
  children?: ReactNode
}

// Rendered in the final state (data-passed="true", every event played). The scroll clock in
// widgets/home rewrites data-passed and data-live directly on these nodes on the client; the
// group-data-* classes below are what those attributes drive.
export const CareerEvent = ({ event, children }: Props) => {
  const t = useTranslations('Match')
  const { id, minute, kind, year, current } = event
  const isGoal = kind === 'goal' || kind === 'big-goal'

  return (
    <li
      data-minute={minute}
      data-goal={isGoal}
      data-passed="true"
      className="group relative flex gap-8 pb-11 last:pb-0 sm:gap-12"
    >
      <span className="grid w-14 shrink-0 content-start justify-items-end gap-1 sm:w-18">
        <span
          className={cn(
            'font-display text-2xl leading-none font-extrabold tabular-nums transition-colors',
            'text-on-pitch-muted group-data-[passed=true]:text-on-pitch',
            kind === 'substitution' && 'text-sun-ink group-data-[passed=true]:text-sun-ink'
          )}
        >
          {minute}′
        </span>

        {/* The real year behind the minute. */}
        {year && (
          <span className="text-on-pitch-muted text-xs font-semibold tabular-nums">
            {year === 'now' ? t('now') : year}
          </span>
        )}
      </span>

      {/* The ball marker, centred on the touchline rail that runs through the middle of the gap.
          Mobile: w-14 + half of gap-8 = 4.5rem, minus half the marker = left-15.5.
          sm+: w-18 + half of gap-12 = 6rem, minus half the marker = left-21.5. */}
      <span
        aria-hidden="true"
        className={cn(
          'border-on-pitch bg-pitch absolute top-1 left-15.5 size-5 sm:left-21.5 rounded-full border-3 transition motion-reduce:transition-none',
          isGoal
            ? 'group-data-[passed=true]:bg-sun group-data-[passed=true]:border-sun'
            : kind === 'assist'
              ? 'group-data-[passed=true]:border-sun group-data-[passed=true]:bg-pitch'
              : 'group-data-[passed=true]:bg-on-pitch',
          // The event the clock is currently on.
          'group-data-[live=true]:bg-sun group-data-[live=true]:border-sun group-data-[live=true]:scale-125'
        )}
      />

      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            'font-display font-bold wrap-break-word hyphens-auto',
            kind === 'big-goal' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          )}
        >
          {kind === 'big-goal' && (
            <span className="bg-sun text-sun-foreground mr-1.5 inline-block -rotate-3 rounded-md px-2.5 py-0.5">
              {t('goalBadge')}
            </span>
          )}
          {kind === 'assist' && (
            <span className="border-sun text-sun-ink mr-1.5 inline-block -rotate-3 rounded-md border-2 px-2 py-0.5 text-base">
              {t('assistBadge')}
            </span>
          )}
          {t(`events.${id}.title`)}
        </h3>

        <p className="text-on-pitch-muted mt-1.5 max-w-prose">
          {kind === 'substitution' && <LiveDot />}
          {t(`events.${id}.text`)}
        </p>

        {current && (
          <p className="border-sun text-on-pitch mt-3 inline-flex items-center rounded-full border-2 px-3 py-1 text-sm font-semibold">
            <LiveDot />
            {t('currentClub')}
          </p>
        )}

        {children}
      </div>
    </li>
  )
}
