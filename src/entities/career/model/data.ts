import { type CareerEvent } from './types'

// Ordered by minute; the scoreboard and the scroll clock rely on that order. Minutes stand for the
// years since 2022; the match is still on at 78′. Titles and texts are in messages/*.json under
// Match.events, as is the commentary.
export const careerEvents: CareerEvent[] = [
  { id: 'kickoff', minute: 1, kind: 'regular' },
  { id: 'academy', minute: 12, kind: 'regular', year: 2022 },
  {
    id: 'peaksoft',
    minute: 20,
    kind: 'goal',
    year: 2023,
    roles: ['Junior Frontend Developer', 'Intern Frontend Developer'],
  },
  {
    id: 'codify',
    minute: 38,
    kind: 'goal',
    year: 2024,
    roles: ['Strong Junior Frontend Developer'],
  },
  {
    id: 'clickfood',
    minute: 55,
    kind: 'goal',
    year: 2025,
    roles: ['Middle Frontend Developer'],
  },
  { id: 'tunduk', minute: 67, kind: 'big-goal', year: 2026 },
  { id: 'assist', minute: 72, kind: 'assist', year: 2026 },
  { id: 'kuttukTime', minute: 75, kind: 'goal', year: 2026 },
  { id: 'substitution', minute: 78, kind: 'substitution', year: 'now' },
]
