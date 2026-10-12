import { type Ref } from 'react'

interface Props {
  ref: Ref<SVGSVGElement>
}

// The goalkeeper in the yellow kit, arms up. Decorative; animated by PenaltyGame.
export const Keeper = ({ ref }: Props) => (
  <svg
    ref={ref}
    viewBox="0 0 100 140"
    aria-hidden="true"
    className="absolute bottom-0 left-1/2 z-10 w-1/5 -translate-x-1/2 origin-bottom"
  >
    <path
      d="M14 30l22 26M86 30L64 56"
      strokeWidth={10}
      strokeLinecap="round"
      className="stroke-skin"
    />
    <circle cx="12" cy="27" r="8" className="fill-navy" />
    <circle cx="88" cy="27" r="8" className="fill-navy" />
    <path d="M32 50q18-8 36 0l2 42H30z" className="fill-sun" />
    <path d="M31 90h38l2 18H29z" className="fill-navy" />
    <rect x="34" y="106" width="12" height="28" rx="6" className="fill-skin" />
    <rect x="54" y="106" width="12" height="28" rx="6" className="fill-skin" />
    <rect x="44" y="36" width="12" height="14" className="fill-skin" />
    <circle cx="50" cy="28" r="15" className="fill-skin" />
    <path d="M35 26q0-17 16-16 14 1 14 15-6-6-14-6-9 0-16 7z" className="fill-hair" />
    <circle cx="45" cy="29" r="2" className="fill-hair" />
    <circle cx="56" cy="29" r="2" className="fill-hair" />
  </svg>
)
