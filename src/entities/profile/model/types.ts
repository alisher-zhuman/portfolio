export interface PlayerStat {
  // Short uppercase label as printed on the card, e.g. "REACT".
  key: string
  // 0–100.
  value: number
}

export interface Contacts {
  resumeUrl: string
  telegramUrl: string
  githubUrl: string
  email: string
}

// Only what reads the same in every language. Translated copy (name, club, city, bio, the scout's
// notes, the transfer) lives in messages/*.json under Profile, Card, Scout and Transfer.
export interface Profile {
  // The public brand, used in titles, previews and structured data.
  brandName: string
  // Other spellings people search for; feed JSON-LD alternateName.
  nameVariants: string[]
  givenName: string
  familyName: string
  role: string
  rating: number
  position: string
  shirtNumber: number
  stats: PlayerStat[]
  strongFoot: string
  stack: string[]
  contacts: Contacts
}
