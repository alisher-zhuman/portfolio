import { useTranslations } from 'next-intl'

import { ContactLinks } from '@entities/profile'

export const Footer = () => {
  const t = useTranslations('Footer')

  return (
    <footer aria-labelledby="footer-title" className="section-shell mt-16 pb-20">
      <h2 id="footer-title" className="font-display text-3xl font-bold sm:text-4xl">
        {t('title')}
      </h2>

      <p className="text-on-pitch-muted mt-2.5 max-w-prose">{t('text')}</p>

      <ContactLinks emailLabel="short" className="mt-6" />

      <p className="text-on-pitch-muted mt-7 text-sm">
        {t('cheat')} <span aria-label={t('cheatLabel')}>↑ ↑ ↓ ↓ ← → ← → B A</span>
      </p>

      {/* Attribution required by the card icon's CC BY 3.0 licence. */}
      <p className="text-on-pitch-muted mt-2 text-xs">
        {t.rich('credit', {
          author: (chunks) => (
            <a
              href="https://game-icons.net/1x1/delapouite/soccer-kick.html"
              className="underline underline-offset-2"
            >
              {chunks}
            </a>
          ),
        })}
      </p>
    </footer>
  )
}
