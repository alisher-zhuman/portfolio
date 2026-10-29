import { useTranslations } from 'next-intl'

import { profile } from '@entities/profile'

import { TagList } from '@shared/ui'

interface Trait {
  label: string
  text: string
}

// Football skills, one line each, for how he works; the stack comes last as his squad.
export const ScoutReport = () => {
  const t = useTranslations('Scout')

  return (
    <div className="reveal max-w-prose">
      <h3 className="font-display text-2xl font-bold">{t('title')}</h3>

      <dl className="mt-5 grid gap-3.5">
        {(t.raw('traits') as Trait[]).map(({ label, text }) => (
          <div key={label}>
            <dt className="text-sun font-semibold">{label}</dt>
            <dd className="mt-0.5">{text}</dd>
          </div>
        ))}

        <div>
          <dt className="text-sun font-semibold">{t('squadLabel')}</dt>
          <dd className="mt-1.5">
            <TagList label={t('stackLabel')} items={profile.stack} />
          </dd>
        </div>
      </dl>
    </div>
  )
}
