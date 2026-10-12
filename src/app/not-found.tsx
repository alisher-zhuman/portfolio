import type { Metadata } from 'next'
import Link from 'next/link'

import { PenaltyGameLoader } from '@features/penalty-shootout'

export const metadata: Metadata = {
  title: '404 — мяч ушёл за трибуны',
}

const NotFound = () => (
  <main id="main" className="container-page py-8 text-center sm:py-12">
    <h1 className="font-display text-4xl font-extrabold text-balance sm:text-5xl">
      404: мяч ушёл за трибуны
    </h1>

    <p className="text-on-pitch-muted mx-auto mt-3 max-w-prose">
      Такой страницы нет. Пока судья ищет мяч, пробейте пенальти: выберите угол ворот мышкой, тапом
      или клавишами Tab и Enter.
    </p>

    <div className="mt-7">
      <PenaltyGameLoader />
    </div>

    {/* Outside the client-only game, so the way home works even before (or without) JS. */}
    <Link href="/" className="btn-primary mt-5">
      На главную
    </Link>
  </main>
)

export default NotFound
