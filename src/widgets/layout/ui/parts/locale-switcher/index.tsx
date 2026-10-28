'use client'

import { useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

import { useDetailsDismiss } from '@shared/hooks'

// A native <details> disclosure: opens and works without JavaScript, and takes one pill's width in
// the header, which has no room for three more segments on a phone. Each language links to the
// homepage in that language — the site has a single page.
export const LocaleSwitcher = () => {
  const ref = useRef<HTMLDetailsElement>(null)
  const locale = useLocale()
  const t = useTranslations('Locale')

  useDetailsDismiss(ref)

  return (
    <details ref={ref} className="group relative">
      <summary className="summary-plain border-chalk hover:bg-on-pitch/10 group-open:bg-on-pitch group-open:text-pitch inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border-2 px-2.5 text-sm font-semibold uppercase transition-colors sm:px-3">
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

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5 fill-none stroke-current transition-transform group-open:rotate-180 max-sm:hidden"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <ul className="bg-board text-board-foreground border-chalk animate-menu-in absolute top-full right-0 z-30 mt-2 grid min-w-48 origin-top-right gap-0.5 rounded-xl border-2 p-1.5 shadow-xl">
        {routing.locales.map((code) => (
          <li key={code}>
            <Link
              href="/"
              locale={code}
              lang={code}
              hrefLang={code}
              aria-current={code === locale || undefined}
              className="group/item hover:bg-board-foreground/10 aria-[current=true]:bg-board-foreground/10 flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium aria-[current=true]:font-semibold"
            >
              {/* The code as a kit-style badge; the current language wears the sun colour. */}
              <span
                aria-hidden="true"
                className="font-display border-board-foreground/30 group-aria-[current=true]/item:bg-sun group-aria-[current=true]/item:text-sun-foreground grid h-7 w-9 place-items-center rounded-md border text-xs font-extrabold uppercase group-aria-[current=true]/item:border-transparent"
              >
                {code}
              </span>

              {t(code)}

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-sun ml-auto hidden size-4 fill-none stroke-current group-aria-[current=true]/item:block"
              >
                <path d="m5 12 5 5 9-10" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
