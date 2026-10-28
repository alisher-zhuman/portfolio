// The club a project was played for; drives the filter and the colour of the card's kit stripe.
export type ProjectClub = 'tunduk' | 'own' | 'clickfood' | 'freelance' | 'codify' | 'peaksoft'

// Keys of Projects.items in messages/*.json, where each project's description lives.
export type ProjectId =
  | 'kca'
  | 'kuttukTime'
  | 'kiu'
  | 'bilimBulak'
  | 'quant'
  | 'clickfood'
  | 'turan'
  | 'billingCenter'
  | 'codifyLms'
  | 'codifyGo'
  | 'virtualAccelerate'
  | 'jobCodify'
  | 'codifyAcademy'
  | 'codifyTeens'
  | 'startupNation'
  | 'codifyLab'
  | 'alphaCargo'
  | 'shine'
  | 'peaksoftHouse'
  | 'bilingual'
  | 'airbnb'
  | 'healthCheck'
  | 'gadgetarium'

export interface Project {
  id: ProjectId
  // Product names stay as they are in every language. Left out for the one name that is
  // translated, which then comes from Projects.items.<id>.title.
  title?: string
  club: ProjectClub
  // Reads the same in every language, e.g. "2024–2025".
  years: string
  stack: string[]
  // The live product, only where the address is confirmed.
  url?: string
  // Public source code.
  codeUrl?: string
}
