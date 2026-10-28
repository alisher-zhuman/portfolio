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
  | 'peaksoftLms'
  | 'gadgetarium'

// 'YYYY-MM', formatted per language on the card.
export type YearMonth = `${number}-${number}`

export interface Project {
  id: ProjectId
  // Product names stay as they are in every language. Left out for the one name that is
  // translated, which then comes from Projects.items.<id>.title.
  title?: string
  club: ProjectClub
  // As on his LinkedIn, month by month; to is left out for a one-month project.
  from: YearMonth
  to?: YearMonth | 'present'
  stack: string[]
  // The live product (a site or a Telegram bot); left out for projects that are no longer live.
  url?: string
  // Public source code.
  codeUrl?: string
}
