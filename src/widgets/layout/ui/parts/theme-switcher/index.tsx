'use client'

import { useTranslations } from 'next-intl'

import { useMounted } from '@shared/hooks'
import { useThemeStore } from '@shared/stores'

// 'system' sits between the two explicit choices: it defers to whichever of them the OS is on,
// so the order reads as a scale. This array is the single source for the rendered order; each value
// has a label and a `<value>Title` in Theme in the messages.
const THEME_OPTIONS = ['light', 'system', 'dark'] as const

// Below sm the labels give way to icons: in Kyrgyz they are long enough to push the header past a
// phone's width. The label stays in the DOM for screen readers, so it is still the button's name.
const ICONS = {
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  system: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 0 16z" className="fill-current" />
    </>
  ),
  dark: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
}

export const ThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const t = useTranslations('Theme')

  // The store reads localStorage synchronously on the client, so its first client render already
  // differs from the server's 'system' fallback. Show the fallback until mounted, then the real
  // preference — otherwise this is a hydration mismatch.
  const mounted = useMounted()

  const displayedTheme = mounted ? theme : 'system'

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="border-chalk flex rounded-full border-2 p-0.5"
    >
      {THEME_OPTIONS.map((value) => (
        <button
          key={value}
          type="button"
          title={t(`${value}Title`)}
          aria-pressed={value === displayedTheme}
          onClick={() => setTheme(value)}
          className="pill-segment cursor-pointer max-sm:px-2.5"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5 fill-none stroke-current sm:hidden"
          >
            {ICONS[value]}
          </svg>

          <span className="max-sm:sr-only">{t(value)}</span>
        </button>
      ))}
    </div>
  )
}
