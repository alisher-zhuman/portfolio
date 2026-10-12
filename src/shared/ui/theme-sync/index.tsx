'use client'

import { useResolvedTheme } from '@shared/hooks'

// Mounted once in the root layout — keeps <html class="dark"> in sync after hydration
// (toggling, OS changes). The very first paint is handled by the inline script in <head>.
export const ThemeSync = () => {
  useResolvedTheme()

  return null
}
