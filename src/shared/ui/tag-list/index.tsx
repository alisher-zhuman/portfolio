import { cn } from '@shared/helpers'

interface Props {
  items: string[]
  // Accessible name of the list, e.g. "Стек".
  label: string
  className?: string
}

export const TagList = ({ items, label, className }: Props) => (
  <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
    {items.map((item) => (
      <li key={item} className="tag">
        {item}
      </li>
    ))}
  </ul>
)
