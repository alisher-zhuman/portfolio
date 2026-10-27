import { notFound } from 'next/navigation'
import { locale as getRootLocale } from 'next/root-params'
import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

// Reads the locale from the [locale] root segment through next/root-params, which keeps every page
// statically rendered — no headers involved, no setRequestLocale in each layout and page.
export default getRequestConfig(async ({ locale }) => {
  // `locale` is only set when a caller passes one explicitly, e.g. getTranslations({ locale }) in
  // the Open Graph image route, where root params aren't available.
  const requested = locale ?? (await getRootLocale())

  if (!hasLocale(routing.locales, requested)) notFound()

  return {
    locale: requested,
    messages: (await import(`../../messages/${requested}.json`)).default,
  }
})
