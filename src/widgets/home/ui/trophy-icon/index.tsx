// Kinds match the trophies' ids in Trophies.items (messages/*.json).
export type TrophyKind = 'kiu' | 'hackathons' | 'volunteer'

interface Props {
  kind: TrophyKind
}

// Small flat trophies for the shelf: a sealed letter, a cup, a rosette. Only the flag's sun and kit
// colours, which read on the panel in both themes (navy vanishes on the evening panel). Decorative.
export const TrophyIcon = ({ kind }: Props) => (
  <svg
    viewBox="0 0 48 48"
    aria-hidden="true"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-12 shrink-0"
  >
    {kind === 'kiu' && (
      <>
        <rect x="6" y="11" width="36" height="26" rx="3" className="fill-sun" />
        <path d="M8 14l16 12 16-12" strokeWidth={2.5} className="stroke-navy fill-none" />
        <circle cx="36" cy="35" r="7" className="fill-kit" />
        <path d="M33 35l2 2 4-4" strokeWidth={2} className="stroke-kit-foreground fill-none" />
      </>
    )}

    {kind === 'hackathons' && (
      <>
        <path d="M14 8h20v10a10 10 0 0 1-20 0z" className="fill-sun" />
        <path
          d="M14 11H8a6 6 0 0 0 6 8M34 11h6a6 6 0 0 1-6 8"
          strokeWidth={2.5}
          className="stroke-sun fill-none"
        />
        <path d="M21 27h6v7h-6z" className="fill-sun" />
        <rect x="15" y="34" width="18" height="6" rx="1.5" className="fill-kit" />
      </>
    )}

    {kind === 'volunteer' && (
      <>
        <path d="M17 26l-5 16 7-4 4 6 3-14M31 26l5 16-7-4-4 6-3-14" className="fill-kit" />
        <circle cx="24" cy="19" r="13" className="fill-sun" />
        <circle cx="24" cy="19" r="7" className="fill-kit" />
      </>
    )}
  </svg>
)
