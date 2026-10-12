import { create } from 'zustand'

import { careerEvents, getFinalScore } from '@entities/career'

interface State {
  minute: number
  home: number
  // Bumped on every goal; the scoreboard keys its score on it to restart the flash animation.
  goalFlash: number
  setClock: (minute: number, home: number) => void
  flashGoal: () => void
}

const final = getFinalScore(careerEvents)

// Starts at full time so the first client render matches the server HTML; MatchTimeline rewinds
// it to wherever the visitor actually is right after mount.
export const useMatchStore = create<State>((set, get) => ({
  minute: final.minute,
  home: final.home,
  goalFlash: 0,
  setClock: (minute, home) => {
    const state = get()

    // Called on every scroll frame — only notify subscribers when something actually changed.
    if (state.minute !== minute || state.home !== home) set({ minute, home })
  },
  flashGoal: () => set((state) => ({ goalFlash: state.goalFlash + 1 })),
}))
