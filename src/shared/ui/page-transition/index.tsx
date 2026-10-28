import { type ReactNode, ViewTransition } from 'react'

interface Props {
  children: ReactNode
}

// Links tag a navigation as nav-forward or nav-back; anything untagged (browser back, refresh)
// swaps instantly. The slides themselves are CSS in styles/animations.css.
const DIRECTIONS = { 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }

// Wraps a page's content, not the layout: layouts persist across navigations, so enter and exit
// would never fire there.
export const PageTransition = ({ children }: Props) => (
  <ViewTransition enter={DIRECTIONS} exit={DIRECTIONS} default="none">
    {children}
  </ViewTransition>
)
