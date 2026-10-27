'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { playWhistle } from '@shared/audio'

const CHECK_MS = 1800

type Status = 'idle' | 'checking' | 'done'

// A mock VAR review of the 67' goal. The verdict is always the same — that's the joke.
export const VarCheck = () => {
  const [status, setStatus] = useState<Status>('idle')
  const t = useTranslations('Match')

  useEffect(() => {
    if (status !== 'checking') return

    const timer = window.setTimeout(() => setStatus('done'), CHECK_MS)

    return () => window.clearTimeout(timer)
  }, [status])

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={status === 'checking'}
        onClick={() => {
          setStatus('checking')
          playWhistle([0.1])
        }}
        className="btn min-h-9 px-3.5 py-1.5 disabled:cursor-progress disabled:opacity-60"
      >
        {t('varButton')}
      </button>

      <span role="status" className="font-semibold">
        {status === 'checking' && t('varChecking')}
        {status === 'done' && t('varDone')}
      </span>
    </div>
  )
}
