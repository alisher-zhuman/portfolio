import { cn } from '@shared/helpers'

interface Props {
  className?: string
}

// The club crest: a tunduk (the crown of a yurt) drawn as a circle crossed by two sets of three
// arcs. Decorative everywhere it appears, so it is always hidden from assistive tech.
export const Crest = ({ className }: Props) => (
  <svg
    viewBox="0 0 40 40"
    aria-hidden="true"
    className={cn('fill-none stroke-current stroke-2', className)}
  >
    <circle cx="20" cy="20" r="17" />
    <circle cx="20" cy="20" r="8" />
    <path d="M12 6 Q20 20 12 34 M20 3 V37 M28 6 Q20 20 28 34 M6 12 Q20 20 34 12 M3 20 H37 M6 28 Q20 20 34 28" />
  </svg>
)
