import { PlayerPortrait, profile } from '@entities/profile'

import { Crest } from '@shared/ui'

export const CardFront = () => {
  const { name, rating, position, club, hometown, stats } = profile

  return (
    <article
      aria-label="Лицевая сторона карточки"
      className="card-notched card-front-surface text-kit-foreground absolute inset-0 flex flex-col p-5 backface-hidden"
    >
      <div className="flex items-start justify-between">
        <p className="grid leading-none">
          <span className="font-display text-6xl font-extrabold tracking-tighter">{rating}</span>
          <span className="font-display text-sun mt-1.5 text-sm font-bold">{position}</span>
        </p>

        <Crest className="text-sun size-9.5" />
      </div>

      <div className="relative mx-auto -mt-3 grid aspect-6/5 w-4/5 place-items-end">
        <span aria-hidden="true" className="sun-rays absolute -inset-x-4 -top-2 bottom-4" />

        <PlayerPortrait />
      </div>

      <h3 className="font-display mt-3.5 text-center text-2xl font-extrabold">{name}</h3>

      <dl className="mt-1.5 flex justify-center gap-4 text-sm">
        <div className="flex gap-1.5">
          <dt className="text-kit-foreground/80">Клуб</dt>
          <dd className="font-semibold">{club}</dd>
        </div>

        <div className="flex gap-1.5">
          <dt className="text-kit-foreground/80">Родной город</dt>
          <dd className="font-semibold">{hometown}</dd>
        </div>
      </dl>

      <ul
        aria-label="Характеристики"
        className="border-kit-foreground/40 mt-auto grid grid-cols-3 gap-x-3 gap-y-2.5 border-t pt-3"
      >
        {stats.map(({ key, value }) => (
          <li key={key} className="flex flex-wrap items-baseline gap-x-1.5">
            <span className="font-display text-xl leading-none font-extrabold">{value}</span>
            <span className="text-xs font-semibold tracking-wide">{key}</span>

            <span
              aria-hidden="true"
              className="bg-kit-foreground/20 mt-1.5 block h-1 w-full rounded-sm"
            >
              {/* Width is data, not design — the one inline style on the card. */}
              <span className="bg-sun block h-full rounded-sm" style={{ width: `${value}%` }} />
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}
