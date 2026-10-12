import { cn } from '@shared/helpers'

interface Props {
  items: string[]
  // Accessible name of the list, e.g. "Стек".
  label: string
  // Items rendered as a filled kit-red tag instead of an outlined one.
  highlighted?: string[]
  className?: string
}

export const TagList = ({ items, label, highlighted = [], className }: Props) => (
  <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
    {items.map((item) => (
      <li
        key={item}
        className={cn('tag', highlighted.includes(item) && 'bg-kit text-kit-foreground border-kit')}
      >
        {item}
      </li>
    ))}
  </ul>
)
