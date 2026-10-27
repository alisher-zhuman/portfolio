// 'goal' events raise the home score; 'big-goal' is the one the page celebrates.
export type CareerEventKind = 'regular' | 'goal' | 'big-goal' | 'substitution'

// Keys of Match.events in messages/*.json, where each event's title and text live.
export type CareerEventId =
  'kickoff' | 'bishkek' | 'college' | 'react' | 'tunduk' | 'backendTasks' | 'substitution'

export interface CareerEvent {
  id: CareerEventId
  minute: number
  kind: CareerEventKind
}
