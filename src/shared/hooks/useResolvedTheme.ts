'use client'

import { useEffect, useLayoutEffect, useSyncExternalStore } from 'react'

import { useThemeStore } from '@shared/stores'
import { type ResolvedTheme } from '@shared/types'

// useLayoutEffect runs before paint, so <html>'s class never visibly lags the theme. Falls back
// to useEffect on the server, where useLayoutEffect only warns.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const getMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

const subscribeToSystemTheme = (callback: () => void) => {
  const mediaQuery = getMediaQuery()
  mediaQuery.addEventListener('change', callback)

  return () => mediaQuery.removeEventListener('change', callback)
}

const getSystemThemeSnapshot = (): ResolvedTheme => (getMediaQuery().matches ? 'dark' : 'light')

const getServerSystemThemeSnapshot = (): ResolvedTheme => 'light'

// Resolves the stored preference into the theme actually applied, and keeps <html class="dark">
// in sync with it — including live OS changes while the preference is 'system'.
export const useResolvedTheme = (): ResolvedTheme => {
  const theme = useThemeStore((state) => state.theme)
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    getServerSystemThemeSnapshot
  )

  const resolvedTheme = theme === 'system' ? systemTheme : theme

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement

    // Suppress transitions for one frame so the palette snaps instead of cross-fading.
    root.classList.add('theme-changing')
    root.classList.toggle('dark', resolvedTheme === 'dark')

    const frame = window.requestAnimationFrame(() => {
      root.classList.remove('theme-changing')
    })

    return () => window.cancelAnimationFrame(frame)
  }, [resolvedTheme])

  return resolvedTheme
}
