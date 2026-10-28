import { useTranslations } from 'next-intl'

import { LiveDot } from '@shared/ui'

// A marquee of commentator one-liners, styled as a TV broadcast bar: a fixed «live» tag on the left,
// the lines scrolling past it and fading out at the edges. The list is rendered twice so the -50%
// loop is seamless; the second copy is hidden from assistive tech. Pauses on hover/focus; under
// reduced motion it becomes a plain wrapped list (styles/animations.css, .commentary-ticker).
export const CommentaryTicker = () => {
  const t = useTranslations('Match')
  const commentary = t.raw('commentary') as string[]

  return (
    <div
      aria-label={t('commentator')}
      role="region"
      className="commentary-ticker bg-sun text-sun-foreground flex text-sm font-semibold"
    >
      <p className="bg-board text-board-foreground font-display flex shrink-0 items-center px-3 text-xs tracking-wider uppercase sm:px-4">
        <LiveDot />
        {t('live')}
      </p>

      <div className="commentary-ticker__viewport min-w-0 flex-1 overflow-hidden">
        <div className="commentary-ticker__track animate-marquee flex w-max">
          {[false, true].map((isCopy) => (
            <ul key={String(isCopy)} aria-hidden={isCopy || undefined} className="flex">
              {commentary.map((line) => (
                <li
                  key={line}
                  className="px-6 py-2 whitespace-nowrap after:ml-6 after:opacity-60 after:content-['⚽']"
                >
                  {line}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
