import { cn } from '@shared/helpers'

interface Props {
  className?: string
}

// The site's logo: «AZ» with a yellow 7 on a red rounded square (Kyrgyzstan's colours, Ronaldo's
// number). The letters are Science Gothic converted to paths, centred with a 12% margin, so the
// logo needs no font. The same drawing is app/icon.svg. Decorative: the link around it is named.
export const Logo = ({ className }: Props) => (
  <svg viewBox="0 0 100 100" aria-hidden="true" className={cn('shrink-0', className)}>
    <rect width="100" height="100" rx="24" className="fill-kit" />
    <path
      d="M11.9 69.1 25.5 44.6H33.5L47.2 69.1H37.1L35.1 65.3H22.9L20.8 69.1ZM26 59.8H32.4L29.3 54ZM48.8 69.1V66.3L61.9 51.5L61.9 51.6H50.4V44.6H75.2V47.4L62.2 62.2L62.1 62.1H75.4V69.1Z"
      className="fill-kit-foreground"
    />
    <path d="M72.4 35.7V30.9H88.1V34.3L81.9 45.6H76.4L82.7 34.6H77.2V36.6Z" className="fill-sun" />
  </svg>
)
