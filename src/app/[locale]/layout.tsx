import type { Metadata, Viewport } from 'next'
import { Golos_Text, Science_Gothic } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { Analytics } from '@vercel/analytics/next'

import { routing } from '@/i18n/routing'

import { Footer, Header, Touchline } from '@widgets/layout'

import { CheatCodeListener } from '@features/cheat-code'
import { BallLoader } from '@features/kick-ball'

import { profile } from '@entities/profile'

import { SITE_URL } from '@shared/constants'
import { getThemeInitScript } from '@shared/helpers'
import { InlineScript, SkipLink, ThemeSync, Toaster } from '@shared/ui'

import '../styles/index.css'

// `cyrillic-ext` is not optional: the Kyrgyz letters ү ө ң (as in «Түндүк») live outside the
// basic `cyrillic` range, and without a preload they fall back to another face mid-word.
// Headlines. Unlike Unbounded, which it replaces, it has the Kyrgyz letters Ң, Ө and Ү. The width
// axis lets one file serve both wide headlines and narrow scoreboard labels.
const scienceGothic = Science_Gothic({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  axes: ['wdth'],
  variable: '--font-science-gothic',
})

const golos = Golos_Text({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-golos',
})

// Open Graph wants language_TERRITORY.
const OG_LOCALES = { ky: 'ky_KG', ru: 'ru_RU', en: 'en_US' } as const

// Every locale is prerendered. Cache Components also requires at least one value per root param.
export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }))

// Site-wide defaults. The canonical URL and hreflang are set per page (see page.tsx), not here — a
// layout-level canonical would also be stamped onto the 404.
export const generateMetadata = async ({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> => {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const city = (await getTranslations({ locale, namespace: 'Profile' }))('city')
  const description = t('description')

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${profile.brandName} — ${profile.role}`,
      template: `%s — ${profile.brandName}`,
    },
    description,
    applicationName: profile.brandName,
    authors: [{ name: profile.brandName, url: SITE_URL }],
    creator: profile.brandName,
    keywords: [
      profile.brandName,
      ...profile.nameVariants,
      profile.role,
      'Frontend',
      'React',
      'Next.js',
      'TypeScript',
      city,
    ],
    openGraph: {
      type: 'profile',
      locale: OG_LOCALES[locale],
      siteName: profile.brandName,
      title: `${profile.brandName} — ${profile.role}`,
      description,
      firstName: profile.givenName,
      lastName: profile.familyName,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.brandName} — ${profile.role}`,
      description,
    },
  }
}

// Follows the OS, not the in-page toggle: theme-color is read before any script runs.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22703c' },
    { media: '(prefers-color-scheme: dark)', color: '#103322' },
  ],
}

const LocaleLayout = async ({ children, params }: LayoutProps<'/[locale]'>) => {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  const t = await getTranslations('A11y')

  return (
    <html
      lang={locale}
      // Lets Next turn smooth scrolling off during route transitions and back on afterwards.
      data-scroll-behavior="smooth"
      className={`${scienceGothic.variable} ${golos.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Sets the "dark" class before hydration to avoid a flash of the wrong theme. */}
        <InlineScript html={getThemeInitScript()} />
      </head>

      <body>
        <ThemeSync />

        {/* Passes this locale's messages on to the client components. */}
        <NextIntlClientProvider>
          <SkipLink label={t('skipToContent')} />

          <Header />

          {children}

          <Footer />

          <Touchline />

          <BallLoader />

          <CheatCodeListener />

          <Toaster />
        </NextIntlClientProvider>

        <Analytics />
      </body>
    </html>
  )
}

export default LocaleLayout
