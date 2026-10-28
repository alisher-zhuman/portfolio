'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'

import { useDetailsDismiss, useMounted } from '@shared/hooks'
import { useThemeStore } from '@shared/stores'

import { MenuCheck } from '../menu-check'
import { MenuChevron } from '../menu-chevron'
import { ThemeIcon } from '../theme-icon'

// 'system' sits between the two explicit choices: it defers to whichever of them the OS is on,
// so the order reads as a scale. This array is the single source for the rendered order; each value
// has a label and a `<value>Title` in Theme in the messages.
const THEME_OPTIONS = ['light', 'system', 'dark'] as const

// Same <details> menu as the language switcher. Below sm the pill shows only the icon: in Kyrgyz
// the labels are long enough to push the header past a phone's width.
export const ThemeSwitcher = () => {
  const ref = useRef<HTMLDetailsElement>(null)
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const t = useTranslations('Theme')

  useDetailsDismiss(ref)

  // The store reads localStorage synchronously on the client, so its first client render already
  // differs from the server's 'system' fallback. Show the fallback until mounted, then the real
  // preference — otherwise this is a hydration mismatch.
  const mounted = useMounted()

  const displayedTheme = mounted ? theme : 'system'

  return (
    <details ref={ref} className="group relative">
      <summary className="menu-trigger">
        <ThemeIcon value={displayedTheme} />

        <span className="sr-only">{t('label')}: </span>
        <span className="max-sm:sr-only">{t(displayedTheme)}</span>

        <MenuChevron />
      </summary>

      <ul className="menu-panel min-w-56">
        {THEME_OPTIONS.map((value) => (
          <li key={value}>
            <button
              type="button"
              aria-pressed={value === displayedTheme}
              onClick={() => setTheme(value)}
              className="menu-item"
            >
              <span className="menu-badge">
                <ThemeIcon value={value} />
              </span>

              <span className="grid">
                {t(value)}
                <span className="text-board-foreground/70 text-xs font-normal">
                  {t(`${value}Title`)}
                </span>
              </span>

              <MenuCheck />
            </button>
          </li>
        ))}
      </ul>
    </details>
  )
}
