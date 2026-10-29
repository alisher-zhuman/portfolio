import { useTranslations } from 'next-intl'

import { cn } from '@shared/helpers'

import { profile } from '../../model/data'

interface Props {
  // The hero spells the email and phone out; the footer just says «Почта» and «Телефон».
  emailLabel?: 'address' | 'short'
  className?: string
}

export const ContactLinks = ({ emailLabel = 'address', className }: Props) => {
  const t = useTranslations('Contacts')
  const { resumeUrl, linkedinUrl, telegramUrl, githubUrl, email, phone, phoneDisplay } =
    profile.contacts

  return (
    <ul aria-label={t('label')} className={cn('flex flex-wrap gap-2', className)}>
      <li>
        <a className="btn-primary" href={resumeUrl} target="_blank" rel="noopener">
          {t('resume')}
        </a>
      </li>

      <li>
        <a className="btn" href={linkedinUrl} target="_blank" rel="noopener">
          LinkedIn
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
          {emailLabel === 'address' ? email : t('email')}
        </a>
      </li>

      <li>
        <a className="btn" href={`tel:${phone}`}>
          {emailLabel === 'address' ? phoneDisplay : t('phone')}
        </a>
      </li>
    </ul>
  )
}
