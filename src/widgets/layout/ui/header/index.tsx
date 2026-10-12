import { Crest } from '@shared/ui'

import { ThemeSwitcher } from '../parts/theme-switcher'

export const Header = () => (
  <header className="bg-header border-chalk sticky top-0 z-20 border-b-2">
    <div className="container-page flex h-15 items-center gap-3">
      <a
        href="#top"
        aria-label="Алишер, к началу страницы"
        className="font-display flex items-center gap-2.5 font-bold"
      >
        <Crest className="size-7.5" />

        <span className="max-sm:sr-only">Алишер</span>
      </a>

      <div className="ml-auto flex items-center gap-2">
        <ThemeSwitcher />
      </div>
    </div>
  </header>
)
