import { create } from 'zustand'

interface State {
  // The card shows the gold «легенда» edition with a 99 rating. Lasts until reload.
  active: boolean
  activate: () => void
}

export const useLegendStore = create<State>((set) => ({
  active: false,
  activate: () => set({ active: true }),
}))
