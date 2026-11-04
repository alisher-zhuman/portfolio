import { useTranslations } from 'next-intl'

import { cn } from '@shared/helpers'
import { SectionHeading } from '@shared/ui'

// His setup as a player's kit bag (a «uses» page in one block), from his own answers on
// 2026-11-04; the texts live in messages under the same ids.
// The locker (his desk) is a long list, so it takes a whole row under the four.
const KIT = ['boots', 'shirt', 'camp', 'bench', 'locker'] as const

export const KitBag = () => {
  const t = useTranslations('Kit')

  return (
    <section id="kit" aria-labelledby="kit-title" className="section-shell">
      <SectionHeading id="kit-title" title={t('title')} lead={t('lead')} />

      <dl className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {KIT.map((id) => (
          <div
            key={id}
            className={cn(
              'reveal border-chalk border-t pt-4',
              id === 'locker' && 'sm:col-span-2 lg:col-span-4'
            )}
          >
            <dt className="text-sun-ink text-sm font-semibold tracking-wide uppercase">
              {t(`items.${id}.label`)}
            </dt>
            <dd className="font-display mt-1.5 text-xl font-bold">{t(`items.${id}.value`)}</dd>
            <dd className="text-on-pitch-muted mt-1 max-w-prose">{t(`items.${id}.note`)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
