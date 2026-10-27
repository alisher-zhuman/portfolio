'use client'

import { type PointerEvent as ReactPointerEvent, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

import { playKick } from '@shared/audio'
import { useToastStore } from '@shared/stores'

const SIZE = 44
const RADIUS = SIZE / 2
const GRAVITY = 2400 // px/s²
const BOUNCE = 0.62 // share of speed kept after a bounce
const AIR_DRAG = 0.35 // share of speed lost per second in flight
const GROUND_FRICTION = 3.2 // rolling friction on the floor, per second
const MAX_SPEED = 3200
const FLOOR_OFFSET = 4 // the touchline bar along the bottom of the screen
const CEILING = 60 // the sticky header
const TAP_MOVE_PX = 6
const TAP_MS = 300

interface Body {
  x: number
  y: number
  vx: number
  vy: number
  angle: number
}

interface Sample {
  x: number
  y: number
  t: number
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

// A ball with simple physics — gravity, bounces off the screen edges, rolling friction — that can be
// kicked (click, tap, Enter/Space) or picked up and thrown. Physics state lives in a ref and is
// written straight to the element's transform; React never re-renders while it moves. The rAF loop
// goes to sleep once the ball comes to rest, so an idle ball costs nothing.
export const Ball = () => {
  const ref = useRef<HTMLButtonElement>(null)
  const body = useRef<Body>({ x: 0, y: 0, vx: 0, vy: 0, angle: 0 })
  const loop = useRef({ frame: 0, last: 0 })
  const drag = useRef<{ pointerId: number; start: Sample; samples: Sample[] } | null>(null)
  const kicks = useRef(0)
  const t = useTranslations('Ball')

  const floor = () => window.innerHeight - RADIUS - FLOOR_OFFSET

  const render = () => {
    const { x, y, angle } = body.current

    if (ref.current) {
      ref.current.style.transform = `translate3d(${x - RADIUS}px, ${y - RADIUS}px, 0) rotate(${angle}rad)`
    }
  }

  const step = (now: number) => {
    // Capped so a background tab coming back doesn't teleport the ball.
    const dt = Math.min(0.032, (now - loop.current.last) / 1000)
    loop.current.last = now
    const b = body.current

    if (!drag.current) {
      b.vy += GRAVITY * dt
      const air = Math.max(0, 1 - AIR_DRAG * dt)
      b.vx *= air
      b.vy *= air
      b.x += b.vx * dt
      b.y += b.vy * dt

      const width = window.innerWidth
      const ground = floor()

      if (b.x < RADIUS) {
        b.x = RADIUS
        b.vx = Math.abs(b.vx) * BOUNCE
      }

      if (b.x > width - RADIUS) {
        b.x = width - RADIUS
        b.vx = -Math.abs(b.vx) * BOUNCE
      }

      if (b.y < RADIUS + CEILING) {
        b.y = RADIUS + CEILING
        b.vy = Math.abs(b.vy) * BOUNCE
      }

      const onFloor = b.y >= ground

      if (onFloor) {
        b.y = ground

        if (b.vy > 220) {
          // Only a hard landing is worth a sound.
          if (b.vy > 700) playKick(Math.min(0.6, b.vy / 4000))
          b.vy = -b.vy * BOUNCE
        } else {
          b.vy = 0
        }

        b.vx *= Math.max(0, 1 - GROUND_FRICTION * dt)
      }

      // Rolling without slipping: distance travelled over the radius.
      b.angle += (b.vx * dt) / RADIUS

      if (onFloor && b.vy === 0 && Math.abs(b.vx) < 8) {
        b.vx = 0
        render()
        loop.current.frame = 0

        return
      }
    }

    render()
    loop.current.frame = window.requestAnimationFrame(step)
  }

  const wake = () => {
    if (loop.current.frame) return

    loop.current.last = performance.now()
    loop.current.frame = window.requestAnimationFrame(step)
  }

  const kick = (fromX: number | null) => {
    const b = body.current
    // Away from where it was hit; from the keyboard, towards the middle of the screen.
    const direction = fromX !== null ? (fromX < b.x ? 1 : -1) : b.x > window.innerWidth / 2 ? -1 : 1

    b.vx = direction * (500 + Math.random() * 500)
    b.vy = -(1100 + Math.random() * 500)
    playKick(1)

    kicks.current += 1
    const { showToast } = useToastStore.getState()

    if (kicks.current === 3) showToast(t('hatTrick'), 'info')
    if (kicks.current === 10) showToast(t('yellow'), 'yellow')

    wake()
  }

  useEffect(() => {
    // The loop state object is mutated, never replaced, so capturing it here is safe for cleanup.
    const loopState = loop.current

    body.current.x = window.innerWidth - RADIUS - 24
    body.current.y = floor()
    render()

    const onResize = () => {
      const b = body.current
      b.x = Math.min(b.x, window.innerWidth - RADIUS)
      b.y = Math.min(b.y, floor())
      render()
      wake()
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.cancelAnimationFrame(loopState.frame)
      loopState.frame = 0
    }
    // Mount-only: the helpers read refs, so they never go stale.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const sample = { x: event.clientX, y: event.clientY, t: performance.now() }

    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { pointerId: event.pointerId, start: sample, samples: [sample] }
    body.current.vx = 0
    body.current.vy = 0
    wake()
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = drag.current

    if (!current || current.pointerId !== event.pointerId) return

    body.current.x = event.clientX
    body.current.y = Math.min(event.clientY, floor())
    current.samples.push({ x: event.clientX, y: event.clientY, t: performance.now() })

    if (current.samples.length > 5) current.samples.shift()
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = drag.current

    if (!current || current.pointerId !== event.pointerId) return

    drag.current = null
    const now = performance.now()
    const moved = Math.hypot(event.clientX - current.start.x, event.clientY - current.start.y)

    // A short touch without movement is a kick, not a throw.
    if (moved < TAP_MOVE_PX && now - current.start.t < TAP_MS) {
      kick(current.start.x)

      return
    }

    // Throw velocity from the oldest and newest of the last few pointer samples.
    const first = current.samples[0] ?? current.start
    const last = current.samples.at(-1) ?? current.start
    const dt = Math.max(0.016, (last.t - first.t) / 1000)

    body.current.vx = clamp((last.x - first.x) / dt, -MAX_SPEED, MAX_SPEED)
    body.current.vy = clamp((last.y - first.y) / dt, -MAX_SPEED, MAX_SPEED)
    wake()
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label={t('label')}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      // detail === 0 means the click came from the keyboard; pointer kicks happen in onPointerUp.
      onClick={(event) => {
        if (event.detail === 0) kick(null)
      }}
      className="fixed top-0 left-0 z-30 size-11 cursor-grab touch-none rounded-full drop-shadow-md will-change-transform active:cursor-grabbing"
    >
      <svg viewBox="0 0 40 40" aria-hidden="true" className="size-full">
        <circle cx="20" cy="20" r="18" strokeWidth={2} className="fill-ball stroke-navy" />
        <path d="M20 11l7 5-3 8h-8l-3-8z" className="fill-navy" />
        <path
          d="M20 11V3M27 16l7-3M24 24l5 7M16 24l-5 7M13 16l-7-3"
          strokeWidth={1.5}
          className="stroke-navy fill-none"
        />
      </svg>
    </button>
  )
}
