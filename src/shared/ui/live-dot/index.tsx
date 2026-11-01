import { cn } from '@shared/helpers'

interface Props {
  // Only the broadcast's «live» tag pulses; elsewhere a still dot says «in progress» without
  // several halos blinking out of step on one screen.
  pulse?: boolean
}

// Red dot for something still in progress. Purely visual: the text beside it says so.
export const LiveDot = ({ pulse = false }: Props) => (
  <span
    aria-hidden="true"
    className={cn(
      'bg-kit mr-2 inline-block size-2.5 rounded-full align-middle',
      pulse && 'animate-live-pulse'
    )}
  />
)
