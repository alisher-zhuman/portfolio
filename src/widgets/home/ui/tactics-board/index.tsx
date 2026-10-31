import { profile } from '@entities/profile'

// A coach's tactics board instead of a drawn player: 4-3-3 going up the board, with number 7 as
// the holding midfielder every pass goes through. The ball is a CSS animation
// (styles/animations.css); a click on the surrounding PlayerStage sets data-celebrating, which
// turns the passing loop into a shot at goal. Decorative: that wrapper carries the accessible name.

interface Spot {
  number: number
  x: number
  y: number
}

const SEVEN = { x: 120, y: 200 }

const TEAMMATES: Spot[] = [
  { number: 1, x: 120, y: 292 },
  { number: 3, x: 45, y: 244 },
  { number: 4, x: 95, y: 252 },
  { number: 5, x: 145, y: 252 },
  { number: 2, x: 195, y: 244 },
  { number: 8, x: 70, y: 168 },
  { number: 10, x: 170, y: 168 },
  { number: 11, x: 50, y: 95 },
  { number: 9, x: 120, y: 80 },
  { number: 14, x: 190, y: 95 },
]

// Everyone number 7 passes to: the passing network drawn as faint dashed lines.
const PASS_TARGETS = [4, 5, 8, 10, 11, 9, 14]

const OPPONENTS = [
  { x: 92, y: 122 },
  { x: 150, y: 128 },
  { x: 120, y: 150 },
  { x: 62, y: 205 },
  { x: 182, y: 210 },
]

const LINE = 'stroke-board-foreground fill-none'

export const TacticsBoard = () => (
  <svg
    viewBox="0 0 240 320"
    aria-hidden="true"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="tactics-board h-auto w-full"
  >
    <rect x="2" y="2" width="236" height="316" rx="14" className="fill-board" />

    {/* Pitch markings */}
    <g strokeWidth={1.4} strokeOpacity={0.45} className={LINE}>
      <rect x="14" y="14" width="212" height="292" rx="3" />
      <path d="M14 160H226" />
      <circle cx="120" cy="160" r="26" />
      <path d="M62 14V58H178V14M96 14V30H144V14M98 58A26 26 0 0 0 142 58" />
      <path d="M62 306V262H178V306M96 306V290H144V306M98 262A26 26 0 0 1 142 262" />
    </g>
    <circle cx="120" cy="160" r="2" className="fill-board-foreground" fillOpacity={0.45} />
    <rect x="104" y="7" width="32" height="7" rx="1.5" className="tactics-board__goal fill-sun" />

    {/* Passing network */}
    <g strokeWidth={1.2} strokeDasharray="3 4" strokeOpacity={0.35} className={LINE}>
      {TEAMMATES.filter(({ number }) => PASS_TARGETS.includes(number)).map(({ number, x, y }) => (
        <path key={number} d={`M${SEVEN.x} ${SEVEN.y}L${x} ${y}`} />
      ))}
    </g>

    {/* Runs: the left winger in behind, the right back overlapping. */}
    <g strokeWidth={1.6} strokeOpacity={0.7} className="stroke-sun fill-none">
      <path d="M44 84Q36 58 58 36" />
      <path d="M52 41L58 36L59 44" />
      <path d="M204 236Q222 210 214 178" />
      <path d="M210 184L214 178L219 184" />
    </g>

    {OPPONENTS.map(({ x, y }) => (
      <path
        key={`${x}-${y}`}
        d={`M${x - 4} ${y - 4}L${x + 4} ${y + 4}M${x + 4} ${y - 4}L${x - 4} ${y + 4}`}
        strokeWidth={2}
        strokeOpacity={0.5}
        className={LINE}
      />
    ))}

    {TEAMMATES.map(({ number, x, y }) => (
      <g key={number}>
        <circle cx={x} cy={y} r="9" className="fill-kit" />
        <text
          x={x}
          y={y + 3.2}
          textAnchor="middle"
          fontSize={9}
          className="fill-kit-foreground font-display font-bold"
        >
          {number}
        </text>
      </g>
    ))}

    <circle
      cx={SEVEN.x}
      cy={SEVEN.y}
      r="13"
      strokeWidth={2}
      strokeOpacity={0.5}
      className="stroke-sun fill-none"
    />
    <circle cx={SEVEN.x} cy={SEVEN.y} r="12" className="fill-sun" />
    <text
      x={SEVEN.x}
      y={SEVEN.y + 4.5}
      textAnchor="middle"
      fontSize={13}
      className="fill-sun-foreground font-display font-extrabold"
    >
      {profile.shirtNumber}
    </text>

    {/* Offset to the player's feet, so the ball never covers a number. */}
    <g transform="translate(9 9)">
      <circle r="4" strokeWidth={1.5} className="tactics-board__ball fill-ball stroke-navy" />
    </g>
  </svg>
)
