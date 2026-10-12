import { cn } from '@shared/helpers'

import { profile } from '../../model/data'

interface Props {
  // The hero spells the address out; the footer, with more room for prose, just says "Почта".
  emailLabel?: 'address' | 'short'
  className?: string
}

export const ContactLinks = ({ emailLabel = 'address', className }: Props) => {
  const { resumeUrl, telegramUrl, githubUrl, email } = profile.contacts

  return (
    <ul aria-label="Контакты" className={cn('flex flex-wrap gap-2', className)}>
      <li>
        <a className="btn-primary" href={resumeUrl} target="_blank" rel="noopener">
          Резюме (PDF)
        </a>
      </li>

      <li>
        <a className="btn" href={telegramUrl} target="_blank" rel="noopener">
          Telegram
        </a>
      </li>

      <li>
        <a className="btn" href={githubUrl} target="_blank" rel="noopener">
          GitHub
        </a>
      </li>

      <li>
        <a className="btn" href={`mailto:${email}`}>
          {emailLabel === 'address' ? email : 'Почта'}
        </a>
      </li>
    </ul>
  )
}
