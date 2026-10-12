import { create } from 'zustand'

import { THEME_STORAGE_KEY } from '@shared/constants'
import { type Theme } from '@shared/types'

// Reads localStorage directly rather than through zustand/persist: persist's JSON envelope would
// have to be mirrored inside the plain-JS init script, and the first-paint flash is already
// handled outside React by that script.
const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system'

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)

    return stored === 'light' || stored === 'dark' ? stored : 'system'
  } catch {
    // Storage can throw in private mode or with site data blocked.
    return 'system'
  }
}

interface State {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<State>((set) => ({
  theme: getStoredTheme(),
  setTheme: (theme) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // The choice still applies for this visit; it just won't survive a reload.
    }

    set({ theme })
  },
}))
