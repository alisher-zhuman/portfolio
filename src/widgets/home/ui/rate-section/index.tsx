import { useTranslations } from 'next-intl'

import { RateForm } from '@features/rate-player'

import { SectionHeading } from '@shared/ui'

// Drawn as the penalty area: a chalk box with the arc («D») below it.
export const RateSection = () => {
  const t = useTranslations('Rate')

  return (
    <section id="rate" aria-labelledby="rate-title" className="section-shell">
      <div className="border-chalk after:border-chalk relative rounded-xs border-2 px-5 pt-9 pb-7 after:absolute after:-bottom-15 after:left-1/2 after:h-15 after:w-40 after:-translate-x-1/2 after:rounded-b-full after:border-2 after:border-t-0 sm:px-10 sm:pt-11 sm:pb-9">
        <SectionHeading id="rate-title" title={t('title')} lead={t('lead')} />

        <RateForm />
      </div>
    </section>
  )
}
