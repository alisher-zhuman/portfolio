import { useTranslations } from 'next-intl'

import { profile } from '@entities/profile'

import { TagList } from '@shared/ui'

export const ScoutReport = () => {
  const t = useTranslations('Scout')

  return (
    <div className="reveal max-w-prose">
      <h3 className="font-display text-2xl font-bold">{t('title')}</h3>

      <dl className="mt-5 grid gap-4.5">
        <div>
          <dt className="text-sun font-semibold">{t('strengthsLabel')}</dt>
          <dd className="mt-1">{t('strengths')}</dd>
        </div>

        <div>
          <dt className="text-sun font-semibold">{t('growingLabel')}</dt>
          <dd className="mt-1">{t('growing')}</dd>
        </div>

        <div>
          <dt className="text-sun font-semibold">{t('squadLabel')}</dt>
          <dd className="mt-1.5">
            <TagList label={t('stackLabel')} items={profile.stack} />
          </dd>
        </div>

        <div>
          <dt className="text-sun font-semibold">{t('noteLabel')}</dt>
          <dd className="mt-1">{t('note')}</dd>
        </div>
      </dl>
    </div>
  )
}
