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

export interface Profile {
  name: string
  role: string
  club: string
  hometown: string
  rating: number
  position: string
  shirtNumber: number
  stats: PlayerStat[]
  bio: string[]
  strongFoot: string
  scout: {
    strengths: string
    growing: string
    stack: string[]
    note: string
  }
  transfer: {
    from: string
    to: string
    status: string
  }
  contacts: Contacts
}
