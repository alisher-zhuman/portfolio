import { useTranslations } from 'next-intl'

interface Fact {
  label: string
  text: string
}

export const CardBack = () => {
  const t = useTranslations('Card')

  return (
    <article
      aria-label={t('back')}
      className="card-shape bg-board text-board-foreground border-kit absolute inset-0 flex rotate-y-180 flex-col gap-2 border-t-8 p-5 text-sm leading-relaxed backface-hidden"
    >
      <h3 className="font-display text-sun mb-1 text-xl font-bold">{t('bioTitle')}</h3>

      {(t.raw('bio') as string[]).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {/* Short facts at the bottom, above the strong foot. */}
      <dl className="border-chalk mt-auto grid gap-1 border-t pt-2.5 text-xs">
        {(t.raw('facts') as Fact[]).map(({ label, text }) => (
          <div key={label}>
            <dt className="text-board-ink inline font-semibold">{label}: </dt>
            <dd className="inline">{text}</dd>
          </div>
        ))}
      </dl>

      <p className="text-sun font-semibold">{t('strongFoot')}</p>
    </article>
  )
}
