// 'goal' events raise the home score; 'big-goal' is the one the page celebrates.
export type CareerEventKind = 'regular' | 'goal' | 'big-goal' | 'substitution'

export interface CareerEvent {
  minute: number
  title: string
  text: string
  kind: CareerEventKind
}
