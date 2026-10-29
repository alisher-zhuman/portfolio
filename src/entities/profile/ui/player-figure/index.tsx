import { cn } from '@shared/helpers'

import { profile } from '../../model/data'

interface Props {
  className?: string
}

// Line art: white outlines on the pitch colour, yellow accents. Shapes are filled with the pitch
// colour so a part in front hides the lines of the part behind it. Arms are a thick white stroke
// with a thinner pitch-coloured one inside, which draws an outlined limb with rounded ends.
const LINE = 'fill-pitch stroke-on-pitch'

// The drawn character juggling a ball, animated entirely in CSS (styles/animations.css). Rendered
// on the server so it is part of the first paint. Interactivity lives in the widget that wraps it:
// it sets --eye-x/--eye-y/--tilt (inherited), data-paused and data-celebrating on an ancestor.
// Pivots the CSS relies on: hip 114,182; shoulders 80,104 and 132,104; head 106,86; ball 182,234.
// Decorative: that wrapper carries the accessible name.
export const PlayerFigure = ({ className }: Props) => (
  <svg
    viewBox="0 0 220 300"
    aria-hidden="true"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('player-figure h-auto overflow-visible', className)}
  >
    <ellipse
      cx="108"
      cy="284"
      rx="58"
      ry="6"
      className="player-figure__shadow fill-ground-shadow stroke-none"
    />

    <g className="player-figure__body">
      {/* Standing leg */}
      <g>
        <path d="M86 182C85 210 87 236 88 262H101C102 236 104 210 103 182Z" className={LINE} />
        <path d="M87 226Q94 223 102 226L101.5 262H87.5Z" className={LINE} />
        <path d="M87.5 238H101.5" className="stroke-sun" />
        <path
          d="M85 262H103Q114 263 117 270Q118 276 112 277H85Q83 270 85 262Z"
          className="fill-on-pitch stroke-on-pitch"
        />
      </g>

      {/* Kicking leg — pivots at the hip (114,182) */}
      <g className="player-figure__kick-leg">
        <path d="M105 182C105 210 107 236 108 262H121C122 236 124 210 124 182Z" className={LINE} />
        <path d="M106 226Q113 223 121 226L120.5 262H106.5Z" className={LINE} />
        <path d="M106.5 238H120.5" className="stroke-sun" />
        <path
          d="M104 262H122Q133 263 136 270Q137 276 131 277H104Q102 270 104 262Z"
          className="fill-on-pitch stroke-on-pitch"
        />
      </g>

      <path
        d="M79 154H135Q139 172 141 190Q127 194 112 192L107 180L102 192Q87 194 73 190Q75 172 79 154Z"
        className={LINE}
      />

      {/* Each arm carries its own sleeve, so a raised arm (the celebration) keeps it. */}
      <g className="player-figure__arm-back">
        <path d="M65 130Q61 140 60 150" strokeWidth={11} className="stroke-on-pitch fill-none" />
        <path d="M65 130Q61 140 60 150" strokeWidth={6.6} className="stroke-pitch fill-none" />
        <path d="M84 97Q70 99 65 108L58 124Q62 130 71 132L78 118Z" className={LINE} />
      </g>

      <path
        d="M80 96Q106 88 132 96Q137 98 137 106L136 164Q106 171 76 164L75 106Q75 98 80 96Z"
        className={LINE}
      />
      <path d="M97 92L106 102L115 92" strokeWidth={3.5} className="stroke-sun fill-none" />
      <text
        x="106"
        y="146"
        textAnchor="middle"
        fontSize={30}
        className="fill-sun font-display stroke-none font-extrabold"
      >
        {profile.shirtNumber}
      </text>

      <g className="player-figure__arm-front">
        <path d="M147 130Q151 140 152 150" strokeWidth={11} className="stroke-on-pitch fill-none" />
        <path d="M147 130Q151 140 152 150" strokeWidth={6.6} className="stroke-pitch fill-none" />
        <path d="M128 97Q142 99 147 108L154 124Q150 130 141 132L134 118Z" className={LINE} />
      </g>

      <g className="player-figure__head">
        <path d="M100 78h12v16q-6 3-12 0z" className={LINE} />
        <circle cx="85" cy="63" r="4" className={LINE} />
        <circle cx="127" cy="63" r="4" className={LINE} />
        <ellipse cx="106" cy="60" rx="21" ry="24" className={LINE} />
        <path
          d="M84 58C82 38 94 31 107 31C121 31 131 39 129 57C124 48 116 45 106 46C96 46 89 50 84 58Z"
          className={LINE}
        />
        <path d="M96 37q5 4 11 5M111 34q6 4 11 9" className="stroke-on-pitch fill-none" />
        <path d="M93 53q5-3 10 0M109 53q5-3 10 0" className="stroke-on-pitch fill-none" />

        <g className="player-figure__eyes fill-on-pitch stroke-none">
          <circle cx="98" cy="62.5" r="2.2" />
          <circle cx="114" cy="62.5" r="2.2" />
        </g>

        {/* Glasses, as on his photo. */}
        <g className="stroke-on-pitch fill-none">
          <rect x="91.5" y="56.5" width="13" height="11" rx="4.5" />
          <rect x="107.5" y="56.5" width="13" height="11" rx="4.5" />
          <path d="M104.5 61q1.5-1.6 3 0" />
        </g>

        <path d="M100 73q6 4 12 0" className="stroke-on-pitch fill-none" />
      </g>
    </g>

    <g className="player-figure__ball">
      <g className="player-figure__ball-spin">
        <circle cx="182" cy="234" r="12" className={LINE} />
        <path d="M182 228.5l5.2 3.8-2 6.1h-6.4l-2-6.1z" className="fill-on-pitch stroke-on-pitch" />
        <path
          d="M182 228.5V222.3M187.2 232.3l5.8-1.8M185.2 238.4l3.4 4.7M178.8 238.4l-3.4 4.7M176.8 232.3l-5.8-1.8"
          strokeWidth={1.5}
          className="stroke-on-pitch fill-none"
        />
      </g>
    </g>
  </svg>
)
