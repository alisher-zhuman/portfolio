// Head-and-shoulders version of the player for the collectible card: a flat, friendly illustration in
// the navy away kit so it reads against the red card face. Decorative.
export const PlayerPortrait = () => (
  <svg
    viewBox="0 0 120 100"
    aria-hidden="true"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="relative w-full"
  >
    <path d="M4 100C6 84 20 77 40 72L50 69H70L80 72C100 77 114 84 116 100Z" className="fill-navy" />
    <path d="M51 50V68Q60 75 69 68V50Z" className="fill-skin" />
    {/* The chin's shadow on the neck. */}
    <path d="M51 54Q60 63 69 54V50H51Z" fillOpacity={0.18} className="fill-hair" />
    <path d="M49 69L60 81L71 69" strokeWidth={3.5} className="stroke-sun fill-none" />

    <ellipse cx="42.5" cy="37" rx="3.5" ry="5.5" className="fill-skin" />
    <ellipse cx="77.5" cy="37" rx="3.5" ry="5.5" className="fill-skin" />
    <path
      d="M42 33C42 18 50 11 60 11C70 11 78 18 78 33C78 46 72 55.5 60 57.5C48 55.5 42 46 42 33Z"
      className="fill-skin"
    />
    <path
      d="M40.5 39C37.5 18 47.5 5.5 61 6C74.5 6.5 83 16 79.5 39C78.5 31.5 77 27 75 24C71 27.5 64.5 27.5 60 25.5C55 28.5 48 28.5 45 25C42.5 29 41 34 40.5 39Z"
      className="fill-hair"
    />

    <path
      d="M48.5 32Q52.5 29.8 56.5 31.2M63.5 31.2Q67.5 29.8 71.5 32"
      strokeWidth={1.8}
      className="stroke-hair fill-none"
    />
    <ellipse cx="52.5" cy="37.5" rx="1.9" ry="1.5" className="fill-hair" />
    <ellipse cx="67.5" cy="37.5" rx="1.9" ry="1.5" className="fill-hair" />
    <path
      d="M60.5 38.5L58.6 45.2Q60 46.2 61.8 45.6"
      strokeWidth={1.3}
      strokeOpacity={0.35}
      className="stroke-hair fill-none"
    />
    <path d="M54.5 48.8Q60 53.6 65.5 48.8" strokeWidth={1.7} className="stroke-mouth fill-none" />
  </svg>
)
