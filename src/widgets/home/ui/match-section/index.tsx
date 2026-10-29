import { useLocale, useTranslations } from 'next-intl'

import { CareerEvent, careerEvents } from '@entities/career'
import { getResumeUrl, profile } from '@entities/profile'

import { OffscreenPause, SectionHeading } from '@shared/ui'

import { CommentaryTicker } from '../commentary-ticker'
import { MatchTimeline } from '../match-timeline'
import { Scoreboard } from '../scoreboard'
import { VarCheck } from '../var-check'

export const MatchSection = () => {
  const t = useTranslations('Match')
  const resumeUrl = getResumeUrl(useLocale())

  return (
    <section id="match" aria-labelledby="match-title" className="section-shell">
      <SectionHeading id="match-title" title={t('title')} lead={t('lead')} />

      {/* Stays in view while the timeline scrolls past, just under the sticky header. */}
      <div className="bg-board border-chalk sticky top-17 z-10 mb-9 overflow-hidden rounded-md border-2">
        <Scoreboard />

        <OffscreenPause>
          <CommentaryTicker />
        </OffscreenPause>
      </div>

      {/* The touchline rail runs through the middle of each event's gap; the two left offsets must
        match CareerEvent's marker maths. */}
      <MatchTimeline className="before:bg-chalk relative max-w-3xl before:absolute before:inset-y-2 before:left-18 before:-ml-px before:w-0.75 sm:before:left-24">
        {careerEvents.map((event) => (
          <CareerEvent key={event.id} event={event}>
            {event.kind === 'big-goal' && <VarCheck />}
          </CareerEvent>
        ))}
      </MatchTimeline>

      {/* The full story per job lives in the CV and on LinkedIn; the timeline stays short. */}
      <p className="text-on-pitch-muted mt-10 max-w-prose text-sm">
        {t.rich('more', {
          resume: (chunks) => (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener"
              className="text-on-pitch font-semibold underline underline-offset-3"
            >
              {chunks}
            </a>
          ),
          linkedin: (chunks) => (
            <a
              href={profile.contacts.linkedinUrl}
              target="_blank"
              rel="noopener"
              className="text-on-pitch font-semibold underline underline-offset-3"
            >
              {chunks}
            </a>
          ),
        })}
      </p>
    </section>
  )
}
