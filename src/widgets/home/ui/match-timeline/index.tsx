'use client'

import { type ReactNode, useEffect, useRef } from 'react'

import { careerEvents } from '@entities/career'

import { playGoal, playWhistle } from '@shared/audio'
import { fireConfetti } from '@shared/effects'
import { useInView } from '@shared/hooks'
import { useToastStore } from '@shared/stores'

import { useMatchStore } from '../../stores'

interface Props {
  // The server-rendered CareerEvent list items.
  children: ReactNode
  className?: string
}

// Share of the viewport height where an event counts as "played".
const READ_LINE = 0.55

// A goal only counts as seen if it is still on screen this long after crossing the line — so
// jumping past the timeline via an anchor, or flinging through it, doesn't set off the celebration.
const GOAL_CONFIRM_MS = 400

const bigGoal = careerEvents.find((event) => event.kind === 'big-goal')

// Runs the match clock off the scroll position. The <li>s are Server Components, so instead of
// re-rendering them every frame this writes data-passed/data-live straight onto the DOM nodes the
// server produced; only the minute and score go through the store, and only when they change.
export const MatchTimeline = ({ children, className }: Props) => {
  const ref = useRef<HTMLOListElement>(null)
  // Start tracking a little before the list scrolls into view.
  const near = useInView(ref, '0px 0px 200px 0px')
  const celebratedRef = useRef(false)

  useEffect(() => {
    const list = ref.current

    if (!list || !near) return

    const items = [...list.querySelectorAll<HTMLElement>('li[data-minute]')]
    const minutes = items.map((item) => Number(item.dataset.minute))
    const isGoal = items.map((item) => item.dataset.goal === 'true')
    const { setClock, flashGoal } = useMatchStore.getState()

    let frame = 0
    let goalTimer = 0
    let lastPassed = -1

    const confirmGoal = (item: HTMLElement, minute: number) => {
      window.clearTimeout(goalTimer)
      goalTimer = window.setTimeout(() => {
        const top = item.getBoundingClientRect().top

        if (top < 0 || top > window.innerHeight) return

        flashGoal()

        if (bigGoal && minute === bigGoal.minute && !celebratedRef.current) {
          celebratedRef.current = true
          playGoal()
          fireConfetti()
          useToastStore
            .getState()
            .showToast(`ГОЛ! ${bigGoal.minute}-я минута: ${bigGoal.title}.`, 'goal')
        } else {
          playWhistle([0.15])
        }
      }, GOAL_CONFIRM_MS)
    }

    const update = () => {
      frame = 0
      const line = window.innerHeight * READ_LINE
      const tops = items.map((item) => item.getBoundingClientRect().top)
      const passed = tops.filter((top) => top <= line).length

      // Interpolate the minute between the last passed event and the next one.
      let minute = 0

      if (passed === items.length) {
        minute = minutes.at(-1) ?? 0
      } else if (passed > 0) {
        const from = passed - 1
        const fromTop = tops[from] ?? 0
        const toTop = tops[passed] ?? fromTop
        const fromMinute = minutes[from] ?? 0
        const toMinute = minutes[passed] ?? fromMinute
        const progress = toTop === fromTop ? 0 : (line - fromTop) / (toTop - fromTop)

        minute = Math.round(fromMinute + (toMinute - fromMinute) * progress)
      }

      items.forEach((item, index) => {
        item.dataset.passed = String(index < passed)
        item.dataset.live = String(index === passed - 1)
      })

      const home = isGoal.slice(0, passed).filter(Boolean).length

      // A goal is scored only when the clock moves forward onto it, never on the first measurement.
      if (lastPassed >= 0 && passed > lastPassed && isGoal[passed - 1]) {
        const item = items[passed - 1]
        const goalMinute = minutes[passed - 1]

        if (item && goalMinute !== undefined) confirmGoal(item, goalMinute)
      }

      lastPassed = passed
      setClock(minute, home)
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.cancelAnimationFrame(frame)
      window.clearTimeout(goalTimer)
    }
  }, [near])

  return (
    <ol ref={ref} className={className}>
      {children}
    </ol>
  )
}
