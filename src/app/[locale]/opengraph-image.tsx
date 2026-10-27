import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { routing } from '@/i18n/routing'

import { profile } from '@entities/profile'

// Link preview for Telegram, LinkedIn and the rest, styled as the hero's transfer-news flash.
// Generated once per locale at build time (no request-time APIs here), so each is a static PNG.

// Static, so the same in every language: the brand and the role read the same everywhere.
export const alt = `${profile.brandName} — ${profile.role}`

export const size = { width: 1200, height: 630 }

export const contentType = 'image/png'

// Prerenders one image per locale; without it the [locale] param makes the route render on demand.
export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }))

// Satori renders text only with fonts it is handed, and only TTF/OTF/WOFF — next/font's WOFF2
// can't be reused. Static instances live in /assets/fonts with their OFL licences.
const [unbounded, golos] = await Promise.all([
  readFile(join(process.cwd(), 'assets/fonts/Unbounded-ExtraBold.ttf')),
  readFile(join(process.cwd(), 'assets/fonts/GolosText-SemiBold.ttf')),
])

// Inline styles only: Satori supports a flexbox subset of CSS, no classes. Colours mirror the
// light-theme tokens in styles/theme.css.
const COLORS = {
  pitch: '#22703c',
  stripe: '#1d6535',
  chalk: '#ffffff',
  muted: '#d9eedd',
  kit: '#c8102e',
  sun: '#f6c343',
  navy: '#13233a',
  panel: '#f3f7f1',
}

const OpenGraphImage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale: requested } = await params
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale
  // Root params aren't available to metadata image routes, so the locale is passed explicitly.
  const t = await getTranslations({ locale })

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 64,
        color: COLORS.chalk,
        fontFamily: 'Golos',
        backgroundColor: COLORS.pitch,
        backgroundImage: `repeating-linear-gradient(180deg, ${COLORS.pitch} 0 105px, ${COLORS.stripe} 105px 210px)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 30 }}>
        <div
          style={{
            display: 'flex',
            padding: '8px 18px',
            backgroundColor: COLORS.kit,
            fontFamily: 'Unbounded',
            letterSpacing: 1,
          }}
        >
          {t('OpenGraph.flash')}
        </div>
        <div
          style={{
            display: 'flex',
            padding: '8px 18px',
            backgroundColor: COLORS.panel,
            color: COLORS.navy,
          }}
        >
          {t('Hero.window')}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          fontFamily: 'Unbounded',
          fontSize: 76,
          lineHeight: 1.08,
          maxWidth: 900,
        }}
      >
        {t('Hero.title', { name: t('Profile.name') })}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', fontFamily: 'Unbounded', fontSize: 40 }}>
            {profile.brandName}
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: COLORS.muted }}>
            {profile.role} · {t('Transfer.fromValue')} → {t('Transfer.toValue')}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '14px 26px',
            backgroundColor: COLORS.kit,
            border: `4px solid ${COLORS.sun}`,
          }}
        >
          <div style={{ display: 'flex', fontFamily: 'Unbounded', fontSize: 72, lineHeight: 1 }}>
            {profile.rating}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: COLORS.sun }}>{profile.position}</div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Unbounded', data: unbounded, style: 'normal', weight: 800 },
        { name: 'Golos', data: golos, style: 'normal', weight: 600 },
      ],
    }
  )
}

export default OpenGraphImage
