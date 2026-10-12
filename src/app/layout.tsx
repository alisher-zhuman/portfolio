import type { Metadata, Viewport } from 'next'
import { Golos_Text, Unbounded } from 'next/font/google'

import { SITE_DESCRIPTION } from '@app/helpers'

import { Footer, Header, Touchline } from '@widgets/layout'

import { CheatCodeListener } from '@features/cheat-code'
import { BallLoader } from '@features/kick-ball'

import { profile } from '@entities/profile'

import { SITE_URL } from '@shared/constants'
import { getThemeInitScript } from '@shared/helpers'
import { InlineScript, SkipLink, ThemeSync, Toaster } from '@shared/ui'

import './styles/index.css'

// `cyrillic-ext` is not optional: the Kyrgyz letters ү ө ң (as in «Түндүк») live outside the
// basic `cyrillic` range, and without a preload they fall back to another face mid-word.
const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-unbounded',
})

const golos = Golos_Text({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-golos',
})

// Site-wide defaults. The canonical URL is set per page (see page.tsx), not here — a layout-level
// canonical would also be stamped onto the 404.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.brandName} — ${profile.role}`,
    template: `%s — ${profile.brandName}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: profile.brandName,
  authors: [{ name: profile.brandName, url: SITE_URL }],
  creator: profile.brandName,
  keywords: [
    profile.brandName,
    ...profile.nameVariants,
    profile.role,
    'Frontend',
    'Backend',
    'React',
    'Next.js',
    'TypeScript',
    profile.city,
  ],
  openGraph: {
    type: 'profile',
    locale: 'ru_RU',
    siteName: profile.brandName,
    title: `${profile.brandName} — ${profile.role}`,
    description: SITE_DESCRIPTION,
    firstName: profile.givenName,
    lastName: profile.familyName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.brandName} — ${profile.role}`,
    description: SITE_DESCRIPTION,
  },
}

// Follows the OS, not the in-page toggle: theme-color is read before any script runs.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22703c' },
    { media: '(prefers-color-scheme: dark)', color: '#103322' },
  ],
}

const RootLayout = ({ children }: LayoutProps<'/'>) => (
  <html
    lang="ru"
    // Lets Next turn smooth scrolling off during route transitions and back on afterwards.
    data-scroll-behavior="smooth"
    className={`${unbounded.variable} ${golos.variable} antialiased`}
    suppressHydrationWarning
  >
    <head>
      {/* Sets the "dark" class before hydration to avoid a flash of the wrong theme. */}
      <InlineScript html={getThemeInitScript()} />
    </head>

    <body>
      <ThemeSync />

      <SkipLink />

      <Header />

      {children}

      <Footer />

      <Touchline />

      <BallLoader />

      <CheatCodeListener />

      <Toaster />
    </body>
  </html>
)

export default RootLayout
