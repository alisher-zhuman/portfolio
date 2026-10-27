import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { Crest } from '@shared/ui'

import { Nav } from '../nav'
import { LocaleSwitcher } from '../parts/locale-switcher'
import { SoundToggle } from '../parts/sound-toggle'
import { ThemeSwitcher } from '../parts/theme-switcher'

export const Header = () => {
  const t = useTranslations('Header')
  const name = useTranslations('Profile')('name')

  return (
    <header className="bg-header border-chalk sticky top-0 z-20 border-b-2">
      <div className="container-page flex h-15 items-center gap-3">
        <Link
          href="/#top"
          prefetch={false}
          aria-label={t('homeLabel', { name })}
          className="font-display flex items-center gap-2.5 font-bold"
        >
          <Crest className="size-7.5" />

          <span className="max-sm:sr-only">{name}</span>
        </Link>

        <Nav />

        <div className="ml-auto flex items-center gap-2">
          <SoundToggle />

          <LocaleSwitcher />

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
