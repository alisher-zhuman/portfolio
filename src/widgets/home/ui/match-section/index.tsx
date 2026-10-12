import { CareerEvent, careerEvents } from '@entities/career'

import { SectionHeading } from '@shared/ui'

import { CommentaryTicker } from '../commentary-ticker'
import { Scoreboard } from '../scoreboard'

export const MatchSection = () => (
  <section id="match" aria-labelledby="match-title" className="section-shell">
    <SectionHeading
      id="match-title"
      title="Карьера как матч"
      lead="От стартового свистка в Таласе до выхода на бэкенд-позицию."
    />

    {/* Stays in view while the timeline scrolls past, just under the sticky header. */}
    <div className="bg-board border-chalk sticky top-17 z-10 mb-9 overflow-hidden rounded-md border-2">
      <Scoreboard />

      <CommentaryTicker />
    </div>

    {/* The touchline rail runs through the middle of each event's gap; the two left offsets must
        match CareerEvent's marker maths. */}
    <ol className="before:bg-chalk relative max-w-3xl before:absolute before:inset-y-2 before:left-18 before:-ml-px sm:before:left-24 before:w-0.75">
      {careerEvents.map((event) => (
        <CareerEvent key={event.minute} event={event} />
      ))}
    </ol>
  </section>
)
