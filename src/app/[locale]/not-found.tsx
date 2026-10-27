import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { PenaltyGameLoader } from '@features/penalty-shootout'

const NotFound = () => {
  const t = useTranslations('NotFound')

  return (
    <main id="main" className="container-page py-8 text-center sm:py-12">
      <h1 className="font-display text-4xl font-extrabold text-balance sm:text-5xl">
        {t('title')}
      </h1>

      <p className="text-on-pitch-muted mx-auto mt-3 max-w-prose">{t('text')}</p>

      <div className="mt-7">
        <PenaltyGameLoader />
      </div>

      {/* Outside the client-only game, so the way home works even before (or without) JS. */}
      <Link href="/" className="btn-primary mt-5">
        {t('home')}
      </Link>
    </main>
  )
}

export default NotFound
