import { describe, expect, it } from 'vitest'

import { careerEvents } from './data'
import { getFinalScore } from './score'

describe('getFinalScore', () => {
  it('counts goals and the big goal, not assists or substitutions', () => {
    expect(
      getFinalScore([
        { id: 'kickoff', minute: 1, kind: 'regular' },
        { id: 'peaksoft', minute: 20, kind: 'goal' },
        { id: 'tunduk', minute: 67, kind: 'big-goal' },
        { id: 'assist', minute: 72, kind: 'assist' },
        { id: 'substitution', minute: 78, kind: 'substitution' },
      ])
    ).toEqual({ home: 2, away: 0, minute: 78 })
  })

  it('is 0:0 at minute 0 before any event', () => {
    expect(getFinalScore([])).toEqual({ home: 0, away: 0, minute: 0 })
  })
})

describe('careerEvents', () => {
  // The scoreboard and the scroll clock read the events in this order.
  it('is ordered by minute, with no minute used twice', () => {
    const minutes = careerEvents.map(({ minute }) => minute)

    expect(minutes).toEqual([...new Set(minutes)].sort((a, b) => a - b))
  })

  it('celebrates exactly one big goal', () => {
    expect(careerEvents.filter(({ kind }) => kind === 'big-goal')).toHaveLength(1)
  })

  it('ends as the server renders it: 5:0 at 78′', () => {
    expect(getFinalScore(careerEvents)).toEqual({ home: 5, away: 0, minute: 78 })
  })
})
