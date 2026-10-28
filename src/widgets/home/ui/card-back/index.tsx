import { useTranslations } from 'next-intl'

export const CardBack = () => {
  const t = useTranslations('Card')

  return (
    <article
      aria-label={t('back')}
      className="card-notched bg-board text-board-foreground border-kit absolute inset-0 flex rotate-y-180 flex-col gap-2.5 border-t-8 p-5 text-sm leading-relaxed backface-hidden"
    >
      <h3 className="font-display text-sun mb-1 text-xl font-bold">{t('bioTitle')}</h3>

      {(t.raw('bio') as string[]).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <p className="text-sun mt-auto font-semibold">{t('strongFoot')}</p>
    </article>
  )
}
