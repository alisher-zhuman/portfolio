'use client'

import { useRef, useState } from 'react'

import { playBoo, playGoal, playKick, playWhistle } from '@shared/audio'
import { fireConfetti } from '@shared/effects'
import { cn } from '@shared/helpers'

import { Keeper } from '../keeper'

// Six target zones: three columns by two rows. The keeper saves if he dives to the same column —
// a one-in-three chance, enough to make a goal feel earned without making the 404 a chore.
const ZONES = [
  { col: 0, row: 0, label: 'Левый верхний угол' },
  { col: 1, row: 0, label: 'По центру, верхом' },
  { col: 2, row: 0, label: 'Правый верхний угол' },
  { col: 0, row: 1, label: 'Левый нижний угол' },
  { col: 1, row: 1, label: 'По центру, низом' },
  { col: 2, row: 1, label: 'Правый нижний угол' },
] as const

const GOAL_LINES = [
  'Гоооол! Страница всё ещё не найдена, зато счёт открыт.',
  'Гол! Вратарь угадал стадион, но не угол.',
  'В девятку! Можно возвращаться на главную героем.',
]

const SAVE_LINES = [
  'Сейв! Вратарь прочитал удар. Попробуйте ещё раз.',
  'Отбил! 404 защищается лучше, чем кажется.',
]

const FLIGHT_MS = 520

const pick = (lines: string[]) => lines[Math.floor(Math.random() * lines.length)] ?? ''

// The keeper picks a corner at random, independent of the shot.
const randomDive = () => ({
  col: Math.floor(Math.random() * 3),
  row: Math.floor(Math.random() * 2),
})

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The flight and the dive use the Web Animations API: one-off, fire-and-forget motion that is
// awkward as CSS classes, and whose finished promise sequences the result neatly.
export const PenaltyGame = () => {
  const goalRef = useRef<HTMLDivElement>(null)
  const keeperRef = useRef<SVGSVGElement>(null)
  const ballRef = useRef<SVGSVGElement>(null)
  const zoneRefs = useRef<(HTMLButtonElement | null)[]>([])
  const againRef = useRef<HTMLButtonElement>(null)
  const animations = useRef<Animation[]>([])

  const [busy, setBusy] = useState(false)
  const [taken, setTaken] = useState(false)
  const [scored, setScored] = useState(false)
  const [status, setStatus] = useState('Выберите угол.')
  const [score, setScore] = useState({ goals: 0, shots: 0 })

  const shoot = async (index: number) => {
    const zone = ZONES[index]
    const zoneEl = zoneRefs.current[index]
    const goal = goalRef.current
    const keeper = keeperRef.current
    const ball = ballRef.current

    if (busy || taken || !zone || !zoneEl || !goal || !keeper || !ball) return

    setBusy(true)
    setTaken(true)
    playKick(1)

    const { col: keeperCol, row: keeperRow } = randomDive()
    const saved = keeperCol === zone.col

    const duration = reducedMotion() ? 1 : FLIGHT_MS
    const easing = 'cubic-bezier(0.2, 0.7, 0.3, 1)'

    // From the ball's centre to the chosen zone's centre.
    const ballBox = ball.getBoundingClientRect()
    const zoneBox = zoneEl.getBoundingClientRect()
    const dx = zoneBox.left + zoneBox.width / 2 - (ballBox.left + ballBox.width / 2)
    const dy = zoneBox.top + zoneBox.height / 2 - (ballBox.top + ballBox.height / 2)
    const width = goal.clientWidth

    // The dive: sideways by column, a little higher for the top row, tilted into the dive.
    const kx = (keeperCol - 1) * width * 0.3
    const ky = keeperRow === 0 ? -width * 0.06 : 0
    animations.current.push(
      keeper.animate(
        [
          { transform: 'none' },
          { transform: `translate(${kx}px, ${ky}px) rotate(${(keeperCol - 1) * 70}deg)` },
        ],
        { duration: duration * 0.9, easing, fill: 'forwards', delay: duration > 1 ? 60 : 0 }
      )
    )

    // A save stops short and rebounds; a goal flies all the way, shrinking with distance.
    const flight = ball.animate(
      saved
        ? [
            { transform: 'translate(0, 0) scale(1)' },
            { transform: `translate(${dx * 0.85}px, ${dy * 0.85}px) scale(0.62)`, offset: 0.7 },
            {
              transform: `translate(${dx * 0.3 + (zone.col - 1) * 60}px, ${dy * 0.35}px) scale(0.8)`,
            },
          ]
        : [
            { transform: 'translate(0, 0) scale(1)' },
            { transform: `translate(${dx}px, ${dy}px) scale(0.55)` },
          ],
      { duration: saved ? duration * 1.4 : duration, easing, fill: 'forwards' }
    )
    animations.current.push(flight)

    await flight.finished.catch(() => undefined)

    if (saved) {
      playBoo()
      setStatus(pick(SAVE_LINES))
    } else {
      playGoal()
      fireConfetti({ originY: 0.3 })
      setScored(true)
      setStatus(pick(GOAL_LINES))
    }

    setScore((current) => ({
      goals: current.goals + (saved ? 0 : 1),
      shots: current.shots + 1,
    }))
    setBusy(false)
    // The next useful action; the button renders hidden until now, so wait a frame.
    window.requestAnimationFrame(() => againRef.current?.focus())
  }

  const reset = () => {
    animations.current.splice(0).forEach((animation) => animation.cancel())
    setTaken(false)
    setScored(false)
    setStatus('Выберите угол.')
    playWhistle([0.15])
    // The zones are still disabled until React applies setTaken(false), so focus on the next frame.
    window.requestAnimationFrame(() => zoneRefs.current[1]?.focus())
  }

  return (
    <div className="mx-auto w-full max-w-140">
      <div className="relative aspect-14/11 w-full select-none">
        <div
          ref={goalRef}
          className={cn(
            'goal-net border-ball absolute inset-x-5 top-0 h-5/11 rounded-t-sm border-8 border-b-0',
            scored && 'animate-net-ripple'
          )}
        >
          <Keeper ref={keeperRef} />

          <div
            role="group"
            aria-label="Выберите угол для удара"
            className="absolute inset-0 z-20 grid grid-cols-3 grid-rows-2"
          >
            {ZONES.map((zone, index) => (
              <button
                key={zone.label}
                ref={(element) => {
                  zoneRefs.current[index] = element
                }}
                type="button"
                aria-label={zone.label}
                disabled={taken}
                onClick={() => void shoot(index)}
                className="hover:bg-sun/30 focus-visible:bg-sun/30 cursor-crosshair rounded-sm transition-colors focus-visible:-outline-offset-4 disabled:cursor-default disabled:bg-transparent motion-reduce:transition-none"
              />
            ))}
          </div>
        </div>

        {/* Six-yard box and penalty spot. */}
        <span
          aria-hidden="true"
          className="border-chalk absolute inset-x-1/5 top-5/11 h-1/7 border-3 border-t-0"
        />
        <span
          aria-hidden="true"
          className="bg-ball absolute top-4/5 left-1/2 size-3 -translate-x-1/2 translate-y-full rounded-full"
        />

        <svg
          ref={ballRef}
          viewBox="0 0 40 40"
          aria-hidden="true"
          className="absolute top-4/5 left-1/2 z-30 w-1/11 -translate-1/2"
        >
          <circle cx="20" cy="20" r="18" strokeWidth={2} className="fill-ball stroke-navy" />
          <path d="M20 11l7 5-3 8h-8l-3-8z" className="fill-navy" />
          <path
            d="M20 11V3M27 16l7-3M24 24l5 7M16 24l-5 7M13 16l-7-3"
            strokeWidth={1.5}
            className="stroke-navy fill-none"
          />
        </svg>
      </div>

      <p role="status" className="font-display mt-5 min-h-16 text-xl font-bold text-balance">
        {status}
      </p>

      <p className="text-on-pitch-muted mt-1">
        Голов: {score.goals} из {score.shots}
      </p>

      <button
        ref={againRef}
        type="button"
        hidden={!taken || busy}
        onClick={reset}
        className="btn mt-5"
      >
        Ещё удар
      </button>
    </div>
  )
}
