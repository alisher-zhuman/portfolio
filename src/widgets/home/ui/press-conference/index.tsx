import { useTranslations } from 'next-intl'

import { SectionHeading } from '@shared/ui'

// What recruiters ask before an offer, as a pre-match press conference. The format, relocation and
// position answers are his own (2026-11-04); the texts live in messages under the same ids.
export const PRESS_QUESTIONS = ['format', 'relocation', 'position', 'backend', 'goat'] as const

export const PressConference = () => {
  const t = useTranslations('Press')

  return (
    <section id="press" aria-labelledby="press-title" className="section-shell">
      <SectionHeading id="press-title" title={t('title')} lead={t('lead')} />

      <dl className="grid max-w-3xl gap-6">
        {PRESS_QUESTIONS.map((id) => (
          <div key={id} className="reveal border-sun border-l-4 pl-5">
            <dt className="font-display text-lg font-bold sm:text-xl">{t(`items.${id}.q`)}</dt>
            <dd className="text-on-pitch-muted mt-1">{t(`items.${id}.a`)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
