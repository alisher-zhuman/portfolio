import { THEME_STORAGE_KEY } from '@shared/constants'

// Runs synchronously in <head>, before hydration — sets the "dark" class from the persisted
// choice (falling back to the OS preference for "system"/first-time visitors), avoiding a flash of
// the wrong theme. Mirrors getStoredTheme in stores/theme.ts and useResolvedTheme.ts; keep the
// three in sync if the logic changes. See node_modules/next/dist/docs/01-app/02-guides/
// preventing-flash-before-hydration.md for why this lives outside React.
export const getThemeInitScript = () => `(function(){
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var isDark = stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})()`
