import { cn } from '@shared/helpers'

import { profile } from '../../model/data'

interface Props {
  className?: string
}

// The drawn character juggling a ball, animated entirely in CSS (styles/animations.css). Rendered
// on the server so it is part of the first paint. Interactivity lives in the widget that wraps it:
// it sets --eye-x/--eye-y/--tilt (inherited), data-paused and data-celebrating on an ancestor.
// Decorative: that wrapper carries the accessible name.
export const PlayerFigure = ({ className }: Props) => (
  <svg
    viewBox="0 0 220 300"
    aria-hidden="true"
    className={cn('player-figure h-auto overflow-visible', className)}
  >
    <ellipse
      cx="108"
      cy="284"
      rx="62"
      ry="7"
      className="player-figure__shadow fill-ground-shadow"
    />

    <g className="player-figure__body">
      {/* Standing leg */}
      <g>
        <rect x="84" y="176" width="18" height="96" rx="9" className="fill-skin" />
        <rect x="84" y="228" width="18" height="42" rx="5" className="fill-sock" />
        <rect x="84" y="240" width="18" height="5" className="fill-kit" />
        <path d="M80 266h24a8 8 0 0 1 8 8v4H80z" className="fill-hair" />
      </g>

      {/* Kicking leg — pivots at the hip (114,182) */}
      <g className="player-figure__kick-leg">
        <rect x="105" y="176" width="18" height="96" rx="9" className="fill-skin" />
        <rect x="105" y="228" width="18" height="42" rx="5" className="fill-sock" />
        <rect x="105" y="240" width="18" height="5" className="fill-kit" />
        <path d="M101 266h24a8 8 0 0 1 8 8v4h-32z" className="fill-hair" />
      </g>

      <path d="M78 158h56l5 36h-29l-4-10-4 10H73z" className="fill-navy" />

      <g className="player-figure__arm-back">
        <path
          d="M80 104q-18 22-22 52"
          strokeWidth={12}
          strokeLinecap="round"
          className="stroke-skin fill-none"
        />
      </g>

      <path d="M74 96q32-10 64 0l12 26-13 7-2 37H77l-2-37-13-7z" className="fill-kit" />
      <path
        d="M96 90l10 12 10-12"
        strokeWidth={4}
        strokeLinejoin="round"
        className="stroke-sun fill-none"
      />
      <text
        x="106"
        y="150"
        textAnchor="middle"
        fontSize={34}
        className="fill-sun font-display font-extrabold"
      >
        {profile.shirtNumber}
      </text>

      <g className="player-figure__arm-front">
        <path
          d="M132 104q18 22 24 50"
          strokeWidth={12}
          strokeLinecap="round"
          className="stroke-skin fill-none"
        />
      </g>

      <g className="player-figure__head">
        <rect x="99" y="80" width="14" height="16" className="fill-skin" />
        <circle cx="106" cy="62" r="24" className="fill-skin" />
        <path d="M82 60q-1-29 26-28 23 1 22 25-9-10-23-9-14-1-25 12z" className="fill-hair" />

        <g className="player-figure__eyes fill-hair">
          <circle cx="98" cy="64" r="2.8" />
          <circle cx="115" cy="64" r="2.8" />
        </g>

        <path
          d="M100 75q6 5 13 0"
          strokeWidth={2.2}
          strokeLinecap="round"
          className="stroke-mouth fill-none"
        />
      </g>
    </g>

    <g className="player-figure__ball">
      <g className="player-figure__ball-spin">
        <circle cx="182" cy="234" r="12" strokeWidth={2} className="stroke-navy fill-ball" />
        <path d="M182 227l6 4-2 7h-8l-2-7z" className="fill-navy" />
      </g>
    </g>
  </svg>
)
