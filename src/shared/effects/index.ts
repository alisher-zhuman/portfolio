import { type ConfettiOptions } from './confetti'

// Imperative, so loaded with a plain dynamic import() on first use rather than next/dynamic: there
// is no component to render, just a canvas that lives for two seconds. Skipped entirely under
// reduced motion.
export const fireConfetti = (options?: ConfettiOptions) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  void import('./confetti').then(({ burst }) => burst(options))
}
