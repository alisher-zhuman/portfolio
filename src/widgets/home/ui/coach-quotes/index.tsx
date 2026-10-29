import { useTranslations } from 'next-intl'

import { profile } from '@entities/profile'

import { SectionHeading } from '@shared/ui'

// His LinkedIn recommendations, quoted word for word (only punctuation fixed); the texts live in
// messages under the same ids.
const COACHES = ['dinara', 'dina'] as const

export const CoachQuotes = () => {
  const t = useTranslations('Coaches')

  return (
    <section id="coaches" aria-labelledby="coaches-title" className="section-shell">
      <SectionHeading id="coaches-title" title={t('title')} lead={t('lead')} />

      <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
        {COACHES.map((id) => (
          <li key={id} className="reveal">
            <figure className="bg-panel text-panel-foreground relative flex h-full flex-col gap-5 overflow-hidden rounded-md py-6 pr-6 pl-7">
              <span aria-hidden="true" className="bg-kit absolute inset-y-0 left-0 w-1.5" />

              <span
                aria-hidden="true"
                className="font-display text-panel-edge pointer-events-none absolute top-0 right-4 text-8xl leading-none font-extrabold"
              >
                “
              </span>

              <blockquote className="relative flex flex-col gap-3 pr-10">
                {(t.raw(`items.${id}.quote`) as string[]).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </blockquote>

              <figcaption className="mt-auto text-sm">
                <span className="font-display block text-base font-bold">
                  {t(`items.${id}.name`)}
                </span>
                <span className="text-kit-ink font-semibold">{t(`items.${id}.role`)}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <p className="text-on-pitch-muted reveal mt-6 text-sm">
        {t('translated') && <>{t('translated')} </>}
        <a
          href={`${profile.contacts.linkedinUrl}/details/recommendations/`}
          target="_blank"
          rel="noopener"
          className="text-on-pitch font-semibold underline underline-offset-3"
        >
          {t('full')}
        </a>
      </p>
    </section>
  )
}
