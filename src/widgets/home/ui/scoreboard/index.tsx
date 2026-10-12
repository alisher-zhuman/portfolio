import { careerEvents, getFinalScore } from '@entities/career'
import { profile } from '@entities/profile'

// Server-rendered at full time (every event played). The scroll clock rewinds and replays it on
// the client; this is what crawlers and no-JS visitors get.
export const Scoreboard = () => {
  const { home, away, minute } = getFinalScore(careerEvents)

  return (
    <div
      role="group"
      aria-label="Табло матча"
      className="text-board-foreground font-display flex items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-4"
    >
      <span className="min-w-0 flex-1 truncate text-right text-sm font-bold sm:text-base">
        {profile.name}
      </span>

      <span className="text-board-ink min-w-16 text-center text-2xl font-extrabold tabular-nums sm:text-4xl">
        {home}:{away}
      </span>

      <span className="min-w-0 flex-1 truncate text-sm font-bold sm:text-base">Баги</span>

      <span className="bg-kit text-kit-foreground min-w-13 rounded-md px-2.5 py-1 text-center text-sm font-bold tabular-nums sm:text-base">
        {minute}′
      </span>
    </div>
  )
}
