import { useTranslations } from 'next-intl'

import { LiveDot } from '@shared/ui'

export const TransferPanel = () => {
  const t = useTranslations('Transfer')

  return (
    <div className="relative mt-5 max-w-md">
      <dl className="grid grid-cols-2 gap-x-10 gap-y-2 sm:gap-x-14">
        <div className="border-chalk min-w-0 rounded-md border-2 px-2.5 py-2.5 sm:px-3">
          <dt className="text-on-pitch-muted text-sm">{t('from')}</dt>
          <dd className="font-display text-base font-bold tracking-tight sm:text-xl sm:tracking-normal">
            {t('fromValue')}
          </dd>
        </div>

        <div className="border-sun min-w-0 rounded-md border-2 px-2.5 py-2.5 sm:px-3">
          <dt className="text-on-pitch-muted text-sm">{t('to')}</dt>
          <dd className="font-display text-base font-bold tracking-tight sm:text-xl sm:tracking-normal">
            {t('toValue')}
          </dd>
        </div>

        <div className="col-span-2 flex items-baseline gap-2.5">
          <dt className="text-on-pitch-muted text-sm">{t('status')}</dt>
          <dd className="font-semibold">
            <LiveDot />
            {t('statusValue')}
          </dd>
        </div>
      </dl>

      {/* Sits in the gap between the two boxes. Outside the <dl>, which may only hold dt/dd groups. */}
      <svg
        viewBox="0 0 80 20"
        aria-hidden="true"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="8 6"
        className="stroke-sun animate-dash-flow absolute top-7 left-1/2 w-10 -translate-x-1/2 fill-none"
      >
        <path d="M2 10h70M62 3l10 7-10 7" />
      </svg>
    </div>
  )
}
