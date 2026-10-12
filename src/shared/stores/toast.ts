import { create } from 'zustand'

// Referee-card styling: a yellow or red card, a ball for goals, nothing for plain info.
export type ToastKind = 'yellow' | 'red' | 'goal' | 'info'

export interface Toast {
  id: number
  text: string
  kind: ToastKind
}

interface State {
  toasts: Toast[]
  showToast: (text: string, kind?: ToastKind, durationMs?: number) => void
  dismissToast: (id: number) => void
}

// More than three stacked toasts cover the content they comment on; the oldest goes first.
const MAX_TOASTS = 3

let nextId = 1

export const useToastStore = create<State>((set, get) => ({
  toasts: [],
  showToast: (text, kind = 'info', durationMs = 4000) => {
    const id = nextId++

    set((state) => ({ toasts: [...state.toasts, { id, text, kind }].slice(-MAX_TOASTS) }))

    window.setTimeout(() => get().dismissToast(id), durationMs)
  },
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))
