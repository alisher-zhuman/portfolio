import { type CareerEvent } from './types'

// Ordered by minute; the scoreboard and the scroll clock rely on that order. Titles and texts are
// in messages/*.json under Match.events, as is the commentary.
export const careerEvents: CareerEvent[] = [
  { id: 'kickoff', minute: 1, kind: 'regular' },
  { id: 'bishkek', minute: 23, kind: 'regular' },
  { id: 'college', minute: 38, kind: 'regular' },
  { id: 'react', minute: 52, kind: 'goal' },
  { id: 'tunduk', minute: 67, kind: 'big-goal' },
  { id: 'backendTasks', minute: 74, kind: 'regular' },
  { id: 'substitution', minute: 78, kind: 'substitution' },
]
