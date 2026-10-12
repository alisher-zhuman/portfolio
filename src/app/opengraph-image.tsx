import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { profile } from '@entities/profile'

// Link preview for Telegram, LinkedIn and the rest, styled as the hero's transfer-news flash.
// Generated once at build time (no request-time APIs here), so it is a static PNG in production.

export const alt = `${profile.brandName} — ${profile.role}. Срочно: близок к переходу в бэкенд.`

export const size = { width: 1200, height: 630 }

export const contentType = 'image/png'

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

const OpenGraphImage = async () =>
  new ImageResponse(
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
          СРОЧНО
        </div>
        <div
          style={{
            display: 'flex',
            padding: '8px 18px',
            backgroundColor: COLORS.panel,
            color: COLORS.navy,
          }}
        >
          Трансферное окно открыто
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
        {profile.name} близок к переходу в бэкенд
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', fontFamily: 'Unbounded', fontSize: 40 }}>
            {profile.brandName}
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: COLORS.muted }}>
            {profile.role} · {profile.transfer.from} → {profile.transfer.to}
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

export default OpenGraphImage
