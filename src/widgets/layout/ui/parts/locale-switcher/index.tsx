'use client'

import { useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

import { useDetailsDismiss } from '@shared/hooks'

import { MenuCheck } from '../menu-check'
import { MenuChevron } from '../menu-chevron'

// A native <details> disclosure: opens and works without JavaScript, and takes one pill's width in
// the header, which has no room for three more segments on a phone. Each language links to the
// current page in that language.
export const LocaleSwitcher = () => {
  const ref = useRef<HTMLDetailsElement>(null)
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('Locale')

  useDetailsDismiss(ref)

  return (
    <details ref={ref} className="group relative">
      <summary className="menu-trigger">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          strokeWidth={2}
          className="size-4.5 fill-none stroke-current"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>

        {/* The short code is for the eye; screen readers hear the language's full name. */}
        <span className="sr-only">
          {t('label')}: {t(locale)}
        </span>
        <span aria-hidden="true">{t(`${locale}Short`)}</span>

        <MenuChevron />
      </summary>

      <ul className="menu-panel">
        {routing.locales.map((code) => (
          <li key={code}>
            <Link
              href={pathname}
              locale={code}
              lang={code}
              hrefLang={code}
              aria-current={code === locale || undefined}
              className="menu-item"
            >
              <span aria-hidden="true" className="menu-badge">
                {t(`${code}Short`)}
              </span>

              {t(code)}

              <MenuCheck />
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}
