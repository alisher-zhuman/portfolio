import { useTranslations } from 'next-intl'

import { profile } from '@entities/profile'

import { Crest } from '@shared/ui'

export const CardFront = () => {
  const t = useTranslations('Card')
  const tProfile = useTranslations('Profile')
  const { rating, shirtNumber, stats } = profile

  return (
    <article
      aria-label={t('front')}
      className="card-shape card-front-surface text-kit-foreground group-data-[legend=true]:card-front-legend group-data-[legend=true]:text-navy absolute inset-0 flex flex-col p-5 backface-hidden"
    >
      {/* Rating, position and crest overlay the portrait's top corners, as on a FIFA card. */}
      <div className="absolute inset-x-5 top-5 z-10 flex items-start justify-between">
        <div className="grid justify-items-center gap-1">
          <p className="grid leading-none">
            {/* Both ratings are in the HTML; the cheat code only swaps which one is displayed. */}
            <span className="font-display text-6xl font-extrabold tracking-tighter group-data-[legend=true]:hidden">
              {rating}
            </span>
            <span className="font-display hidden text-6xl font-extrabold tracking-tighter group-data-[legend=true]:inline">
              99
            </span>
          </p>

          {/* Position code under the rating, as on a FIFA card; the full name is for screen readers. */}
          <p className="font-display text-xl leading-none font-extrabold tracking-wide">
            <span aria-hidden="true">{t('positionCode')}</span>
            <span className="sr-only">{t('position')}</span>
          </p>
        </div>

        <Crest className="text-sun group-data-[legend=true]:text-navy size-9.5" />
      </div>

      {/* No drawn player: the sun from the flag with the shirt number in it. */}
      <div
        aria-hidden="true"
        className="relative mx-auto mt-11 grid aspect-6/5 w-4/5 place-items-center"
      >
        <span className="sun-rays absolute -inset-x-4 -inset-y-2" />

        <span className="bg-sun text-navy group-data-[legend=true]:bg-navy group-data-[legend=true]:text-sun font-display relative grid size-28 place-items-center rounded-full text-7xl font-extrabold">
          {shirtNumber}
        </span>
      </div>

      <h3 className="font-display mt-3.5 text-center text-2xl font-extrabold">
        {tProfile('name')}
      </h3>

      {/* Label over value in three columns: side by side they no longer fit the card's width. */}
      <dl className="mt-1.5 grid grid-cols-3 gap-2 text-center text-sm leading-tight">
        {(['club', 'city', 'hometown'] as const).map((key) => (
          <div key={key} className="flex flex-col-reverse gap-0.5">
            <dd className="font-semibold">{tProfile(key)}</dd>
            <dt className="text-xs opacity-80">{t(key)}</dt>
          </div>
        ))}
      </dl>

      <ul
        aria-label={t('stats')}
        className="border-kit-foreground/40 mt-auto grid grid-cols-3 gap-x-3 gap-y-2.5 border-t pt-3"
      >
        {stats.map(({ key, value }) => (
          <li key={key} className="flex flex-col">
            <span className="font-display text-xl leading-none font-extrabold">{value}</span>
            <span className="mt-1 text-xs font-semibold tracking-wide">{key}</span>

            <span
              aria-hidden="true"
              className="bg-kit-foreground/20 mt-1.5 block h-1 w-full rounded-sm"
            >
              {/* Width is data, not design — the one inline style on the card. */}
              <span
                className="bg-sun group-data-[legend=true]:bg-navy block h-full rounded-sm"
                style={{ width: `${value}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}
