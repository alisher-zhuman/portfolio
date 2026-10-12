'use client'

import { useMounted } from '@shared/hooks'
import { useThemeStore } from '@shared/stores'

// 'system' sits between the two explicit choices: it defers to whichever of them the OS is on,
// so the order reads as a scale. This array is the single source for the rendered order.
const THEME_OPTIONS = [
  { value: 'light', label: 'День', title: 'Дневной матч' },
  { value: 'system', label: 'Авто', title: 'Как в системе' },
  { value: 'dark', label: 'Вечер', title: 'Вечерний матч под прожекторами' },
] as const

export const ThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  // The store reads localStorage synchronously on the client, so its first client render already
  // differs from the server's 'system' fallback. Show the fallback until mounted, then the real
  // preference — otherwise this is a hydration mismatch.
  const mounted = useMounted()

  const displayedTheme = mounted ? theme : 'system'

  return (
    <div
      role="group"
      aria-label="Тема оформления"
      className="border-chalk flex rounded-full border-2 p-0.5"
    >
      {THEME_OPTIONS.map(({ value, label, title }) => (
        <button
          key={value}
          type="button"
          title={title}
          aria-pressed={value === displayedTheme}
          onClick={() => setTheme(value)}
          className="pill-segment cursor-pointer"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
