import { useTranslations } from 'next-intl'

import { ContactLinks, profile } from '@entities/profile'

const CHANNELS = [
  { id: 'linkedin', name: 'LinkedIn', url: profile.contacts.linkedinUrl },
  { id: 'instagram', name: 'Instagram', url: profile.contacts.instagramUrl },
] as const

export const Footer = () => {
  const t = useTranslations('Footer')

  return (
    <footer aria-labelledby="footer-title" className="section-shell mt-16 pb-20">
      <h2 id="footer-title" className="font-display text-3xl font-bold sm:text-4xl">
        {t('title')}
      </h2>

      <p className="text-on-pitch-muted mt-2.5 max-w-prose">{t('text')}</p>

      {/* Where he posts, as a TV listing: LinkedIn is the main channel, Instagram the off-pitch one. */}
      <h3 className="font-display mt-8 text-lg font-bold">{t('channelsTitle')}</h3>

      <ul className="mt-3 grid max-w-3xl gap-3 sm:grid-cols-2">
        {CHANNELS.map(({ id, name, url }) => (
          <li key={id}>
            <a
              href={url}
              target="_blank"
              rel="noopener"
              className="border-chalk hover:bg-on-pitch/10 block h-full rounded-md border px-4 py-3"
            >
              <span className="text-sun-ink block text-xs font-semibold tracking-wide uppercase">
                {t(`channels.${id}.name`)}
              </span>
              <span className="font-display mt-1 block text-lg font-bold">{name}</span>
              <span className="text-on-pitch-muted block text-sm">{t(`channels.${id}.text`)}</span>
            </a>
          </li>
        ))}
      </ul>

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
