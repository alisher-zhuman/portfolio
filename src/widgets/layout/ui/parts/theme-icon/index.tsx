// One icon per theme value, for the theme menu's pill and its items.
const ICONS = {
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  system: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 0 16z" className="fill-current" />
    </>
  ),
  dark: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
}

export const ThemeIcon = ({ value }: { value: keyof typeof ICONS }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4.5 fill-none stroke-current"
  >
    {ICONS[value]}
  </svg>
)
