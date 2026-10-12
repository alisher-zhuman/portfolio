import { profile } from '@entities/profile'

export const CardBack = () => (
  <article
    aria-label="Оборотная сторона карточки"
    className="card-notched bg-board text-board-foreground border-kit absolute inset-0 flex rotate-y-180 flex-col gap-2.5 border-t-8 p-5 text-sm leading-relaxed backface-hidden"
  >
    <h3 className="font-display text-sun mb-1 text-xl font-bold">Биография</h3>

    {profile.bio.map((paragraph) => (
      <p key={paragraph}>{paragraph}</p>
    ))}

    <p className="text-sun mt-auto font-semibold">Сильная нога: {profile.strongFoot}</p>
  </article>
)
