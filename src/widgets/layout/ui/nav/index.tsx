import Link from 'next/link'

// In-page anchors to the homepage sections. Hidden below lg, where the header has no room for it
// and the page is short enough to scroll.
const NAV_ITEMS = [
  { href: '/#card', label: 'Игрок' },
  { href: '/#match', label: 'Карьера' },
  { href: '/#projects', label: 'Проекты' },
] as const

export const Nav = () => (
  <nav aria-label="Разделы" className="ml-3 hidden gap-1 lg:flex">
    {NAV_ITEMS.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className="text-on-pitch-muted hover:text-on-pitch hover:bg-on-pitch/10 rounded-full px-3 py-2 font-medium"
      >
        {label}
      </Link>
    ))}
  </nav>
)
