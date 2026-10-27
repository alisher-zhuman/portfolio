'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'
import { useFormatter, useTranslations } from 'next-intl'

import { type RatingError, type RatingErrorCode, type RatingSummary } from '@entities/rating'

import { playBoo, playGoal } from '@shared/audio'
import { fireConfetti } from '@shared/effects'
import { cn } from '@shared/helpers'
import { useInView } from '@shared/hooks'
import { useToastStore } from '@shared/stores'

const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; value: number }
  | { kind: 'pick-first' }
  | { kind: 'error'; code: RatingErrorCode }

// The API throws RatingError with a code; anything else (a chunk that failed to load, say) counts
// as a generic failure.
const errorCode = (error: unknown, fallback: RatingErrorCode): RatingErrorCode =>
  error instanceof Error && 'code' in error ? (error as RatingError).code : fallback

// The rating API carries zod, which would otherwise ride in the first-load bundle for a section at
// the very bottom of the page. Loaded on demand instead — see the effect below. Type imports above
// are erased at build time and don't pull it in.
const loadRatingApi = () => import('@entities/rating')

// The extremes get a reaction from the stands.
const react = (value: number, lines: { ten: string; one: string }) => {
  const { showToast } = useToastStore.getState()

  if (value === 10) {
    playGoal()
    fireConfetti()
    showToast(lines.ten, 'goal')
  } else if (value === 1) {
    playBoo()
    showToast(lines.one, 'yellow')
  }
}

export const RateForm = () => {
  // null until the first load resolves; the server renders the loading state.
  const [summary, setSummary] = useState<RatingSummary | null>(null)
  const [loadFailed, setLoadFailed] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const ref = useRef<HTMLDivElement>(null)
  // Start fetching a screen or so before the section scrolls into view.
  const near = useInView(ref, '600px 0px', false)
  const [requested, setRequested] = useState(false)
  const t = useTranslations('Rate')
  const format = useFormatter()

  if (near && !requested) setRequested(true)

  useEffect(() => {
    if (!requested) return

    let cancelled = false

    loadRatingApi()
      .then(({ getRating }) => getRating())
      .then((result) => {
        if (cancelled) return

        setSummary(result)
        setSelected((current) => current ?? result.myVote)
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [requested])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (selected === null) {
      setStatus({ kind: 'pick-first' })

      return
    }

    setStatus({ kind: 'sending' })

    try {
      const { submitRating } = await loadRatingApi()

      setSummary(await submitRating(selected))
      setStatus({ kind: 'sent', value: selected })
      react(selected, { ten: t('ten'), one: t('one') })
    } catch (error) {
      setStatus({ kind: 'error', code: errorCode(error, 'submitFailed') })
    }
  }

  const hasVoted = summary?.myVote != null

  return (
    <div ref={ref} className="flex flex-col gap-7 md:flex-row md:items-start md:gap-12">
      <form onSubmit={(event) => void handleSubmit(event)} noValidate className="min-w-0 md:flex-1">
        <fieldset>
          <legend className="sr-only">{t('legend')}</legend>

          <div className="grid max-w-xl grid-cols-5 gap-2 sm:grid-cols-10">
            {SCALE.map((value) => (
              <label key={value} className="relative">
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={selected === value}
                  onChange={() => setSelected(value)}
                  className="peer absolute inset-0 cursor-pointer opacity-0"
                />

                <span
                  className={cn(
                    'border-chalk font-display grid h-12 place-items-center rounded-md border-2 font-bold transition',
                    'peer-hover:bg-on-pitch/10 motion-reduce:transition-none',
                    'peer-checked:bg-sun peer-checked:text-sun-foreground peer-checked:border-sun peer-checked:-translate-y-0.75',
                    'peer-focus-visible:outline-sun peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2'
                  )}
                >
                  {value}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" disabled={status.kind === 'sending'} className="btn-primary mt-4.5">
          {status.kind === 'sending' ? t('sending') : hasVoted ? t('change') : t('send')}
        </button>

        <p
          role="status"
          className={cn(
            'mt-3 min-h-6 font-medium',
            (status.kind === 'error' || status.kind === 'pick-first') && 'text-sun'
          )}
        >
          {status.kind === 'sent' && t('accepted', { value: status.value })}
          {status.kind === 'pick-first' && t('pickFirst')}
          {status.kind === 'error' && t(`errors.${status.code}`)}
        </p>
      </form>

      <div
        aria-live="polite"
        className="bg-board text-board-foreground min-w-50 shrink-0 self-start rounded-md px-6 py-4.5"
      >
        <p className="font-display text-board-ink text-5xl font-extrabold">
          {summary?.average != null
            ? format.number(summary.average, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
            : '–'}
          <small className="text-board-foreground/70 ml-1 text-lg">/10</small>
        </p>

        <p className="text-board-foreground/80 mt-1.5">
          {loadFailed
            ? t('errors.loadFailed')
            : summary === null
              ? t('loading')
              : summary.count === 0
                ? t('empty')
                : t('votes', { count: summary.count })}
        </p>
      </div>
    </div>
  )
}
