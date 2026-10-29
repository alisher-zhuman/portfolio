// 'goal' events raise the home score; 'big-goal' is the one the page celebrates; 'assist' is a
// playmaker's moment — marked on the timeline, not counted in the score.
export type CareerEventKind = 'regular' | 'goal' | 'big-goal' | 'assist' | 'substitution'

// Keys of Match.events in messages/*.json, where each event's title and text live.
export type CareerEventId =
  | 'kickoff'
  | 'academy'
  | 'peaksoft'
  | 'codify'
  | 'clickfood'
  | 'kuttukTime'
  | 'tunduk'
  | 'assist'
  | 'substitution'

export interface CareerEvent {
  id: CareerEventId
  minute: number
  kind: CareerEventKind
  // Shown under the minute; 'now' reads as Match.now. Left out where the date isn't public.
  year?: number | 'now'
  // His job titles there, as on LinkedIn, newest first. Each one's bullets are under
  // Match.events.<id>.did in the same order, shown behind a «Подробнее» toggle.
  roles?: string[]
}
