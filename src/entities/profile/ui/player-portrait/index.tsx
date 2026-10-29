// Head-and-shoulders version of the player for the collectible card: a flat, calm illustration in
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
      d="M41.5 33C40 16 49 7.5 61 7.5C72 7.5 80.5 15 78.5 31.5C77.5 26 75.5 22.5 72.5 20.5C66 22.5 55 22.5 47.5 20.5C44.5 23 42.5 27 41.5 33Z"
      className="fill-hair"
    />

    <path
      d="M48.5 32.5Q52.5 30.5 56.5 31.8M63.5 31.8Q67.5 30.5 71.5 32.5"
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
    <path d="M56.5 50.3Q60 51.4 63.5 50.3" strokeWidth={1.5} className="stroke-mouth fill-none" />
  </svg>
)
