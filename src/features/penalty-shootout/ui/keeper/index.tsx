import { type Ref } from 'react'

interface Props {
  ref: Ref<SVGSVGElement>
}

// The goalkeeper in the yellow kit, arms up, as a sports pictogram to match the kicking player on
// the card (rounded bars and a round head, no face). Decorative; animated by PenaltyGame.
export const Keeper = ({ ref }: Props) => (
  <svg
    ref={ref}
    viewBox="0 0 100 140"
    aria-hidden="true"
    strokeLinecap="round"
    className="absolute bottom-0 left-1/2 z-10 w-1/5 -translate-x-1/2 origin-bottom"
  >
    <g className="stroke-sun">
      <path d="M50 52L22 22M50 52L78 22" strokeWidth={11} />
      <path d="M50 52V84" strokeWidth={24} />
      <path d="M46 88L34 132M54 88L66 132" strokeWidth={14} />
    </g>
    <circle cx="50" cy="26" r="13" className="fill-sun" />
    <circle cx="19" cy="19" r="8" className="fill-navy" />
    <circle cx="81" cy="19" r="8" className="fill-navy" />
  </svg>
)
