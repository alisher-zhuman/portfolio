import { useTranslations } from 'next-intl'

// A marquee of commentator one-liners. The list is rendered twice so the -50% loop is seamless;
// the second copy is hidden from assistive tech. Pauses on hover/focus; under reduced motion it
// becomes a plain wrapped list (styles/animations.css, .commentary-ticker).
export const CommentaryTicker = () => {
  const t = useTranslations('Match')
  const commentary = t.raw('commentary') as string[]

  return (
    <div
      aria-label={t('commentator')}
      role="region"
      className="commentary-ticker bg-sun text-sun-foreground overflow-hidden text-sm font-semibold"
    >
      <div className="commentary-ticker__track animate-marquee flex w-max">
        {[false, true].map((isCopy) => (
          <ul key={String(isCopy)} aria-hidden={isCopy || undefined} className="flex">
            {commentary.map((line) => (
              <li
                key={line}
                className="px-7 py-2 whitespace-nowrap after:ml-7 after:content-['⚽']"
              >
                {line}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
