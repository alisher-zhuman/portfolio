// Head-and-shoulders version of the player for the collectible card, in the navy away kit so it
// reads against the red card face. Decorative.
export const PlayerPortrait = () => (
  <svg viewBox="0 0 120 100" aria-hidden="true" className="relative w-full">
    <path d="M18 100q4-30 42-34 38 4 42 34z" className="fill-navy" />
    <path
      d="M50 66l10 12 10-12"
      strokeWidth={4}
      strokeLinejoin="round"
      className="stroke-sun fill-none"
    />
    <rect x="53" y="52" width="14" height="16" className="fill-skin" />
    <circle cx="60" cy="38" r="22" className="fill-skin" />
    <path d="M38 36q-1-27 24-26 21 1 20 23-8-9-21-8-13-1-23 11z" className="fill-hair" />
    <circle cx="53" cy="40" r="2.4" className="fill-hair" />
    <circle cx="68" cy="40" r="2.4" className="fill-hair" />
    <path
      d="M54 50q6 4 12 0"
      strokeWidth={2.2}
      strokeLinecap="round"
      className="stroke-mouth fill-none"
    />
  </svg>
)
