import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

// In-page anchors to the homepage sections; each key is both the section id and its label in Nav.
// Hidden below lg, where the header has no room for it and the page is short enough to scroll.
const NAV_ITEMS = ['card', 'match', 'projects'] as const

export const Nav = () => {
  const t = useTranslations('Nav')

  return (
    <nav aria-label={t('label')} className="ml-3 hidden gap-1 lg:flex">
      {NAV_ITEMS.map((id) => (
        <Link
          key={id}
          href={`/#${id}`}
          // Same-page anchors: prefetching would just fetch the page we are already on.
          prefetch={false}
          // From /projects these lead back home; on the homepage they are plain anchors.
          transitionTypes={['nav-back']}
          className="text-on-pitch-muted hover:text-on-pitch hover:bg-on-pitch/10 rounded-full px-3 py-2 font-medium"
        >
          {t(id)}
        </Link>
      ))}
    </nav>
  )
}
