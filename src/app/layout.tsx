import type { Metadata, Viewport } from 'next'
import { Golos_Text, Unbounded } from 'next/font/google'

import { Footer, Header, Touchline } from '@widgets/layout'

import { CheatCodeListener } from '@features/cheat-code'
import { BallLoader } from '@features/kick-ball'

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

export const metadata: Metadata = {
  title: 'Алишер — портфолио',
  description: 'Middle Frontend Developer. Переход в бэкенд.',
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
