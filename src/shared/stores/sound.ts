import { create } from 'zustand'

import { closeSound, playWhistle, startSound, stopSound } from '@shared/audio'

interface State {
  enabled: boolean
  toggle: () => Promise<void>
  // The page is going away: release the audio device and reflect that in the button.
  release: () => void
}

// Off on every visit, by design: autoplay rules mean a remembered "on" could not actually play
// until the next click anyway, and a button claiming sound is on while silent is misleading.
export const useSoundStore = create<State>((set, get) => ({
  enabled: false,
  toggle: async () => {
    if (get().enabled) {
      stopSound()
      set({ enabled: false })

      return
    }

    try {
      await startSound()
      set({ enabled: true })
      // Audible confirmation that sound really is on.
      playWhistle()
    } catch {
      set({ enabled: false })
    }
  },
  release: () => {
    closeSound()
    set({ enabled: false })
  },
}))
