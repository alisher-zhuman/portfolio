import { type CareerEvent } from './types'

export const isGoal = (event: CareerEvent) => event.kind === 'goal' || event.kind === 'big-goal'

// The final state the server renders: every event played. The scroll clock replays it on the
// client, but this is what a visitor without JS (and every crawler) sees.
export const getFinalScore = (events: CareerEvent[]) => ({
  home: events.filter(isGoal).length,
  away: 0,
  minute: events.at(-1)?.minute ?? 0,
})
