import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

// A native <details> disclosure: opens and works without JavaScript, and takes one pill's width in
// the header, which has no room for three more segments on a phone. Each language links to the
// homepage in that language — the site has a single page.
export const LocaleSwitcher = () => {
  const locale = useLocale()
  const t = useTranslations('Locale')

  return (
    <details className="relative">
      <summary className="summary-plain border-chalk inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border-2 px-2.5 text-sm font-semibold uppercase sm:px-3">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          strokeWidth={2}
          className="size-4.5 fill-none stroke-current"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>

        <span className="sr-only">{t('label')}: </span>
        {locale}
      </summary>

      <ul className="bg-board text-board-foreground border-chalk absolute top-full right-0 z-30 mt-2 grid min-w-36 rounded-md border-2 p-1">
        {routing.locales.map((code) => (
          <li key={code}>
            <Link
              href="/"
              locale={code}
              lang={code}
              hrefLang={code}
              aria-current={code === locale || undefined}
              className="hover:bg-board-foreground/10 aria-[current=true]:text-board-ink block rounded-sm px-3 py-2 text-sm font-medium aria-[current=true]:font-bold"
            >
              {t(code)}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
