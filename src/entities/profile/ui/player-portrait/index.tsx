// Faceless head-and-shoulders silhouette for the collectible card, like the placeholder a FIFA card
// shows before a photo exists: one flat navy shape and the sun-yellow V-neck, no features to draw
// crooked. Decorative.
export const PlayerPortrait = () => (
  <svg viewBox="0 0 120 100" aria-hidden="true" className="relative w-full">
    <path
      d="M6 100C8 84 22 76 42 71C48 69.5 51.5 66 52 58L68 58C68.5 66 72 69.5 78 71C98 76 112 84 114 100Z"
      className="fill-navy"
    />
    <path
      d="M43 33C42 17 50 9 60 9C70 9 78 17 77 33C76.5 46 70 57 60 59C50 57 43.5 46 43 33Z"
      className="fill-navy"
    />
    <ellipse cx="43" cy="37" rx="3" ry="5.5" className="fill-navy" />
    <ellipse cx="77" cy="37" rx="3" ry="5.5" className="fill-navy" />
    <path
      d="M48 70L60 83L72 70"
      strokeWidth={4}
      strokeLinejoin="round"
      className="stroke-sun fill-none"
    />
  </svg>
)
