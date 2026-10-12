// Public sound API. Every call is a no-op until sound has been switched on, and the synthesiser
// itself (./engine) is only downloaded on that first switch-on — so a visitor who never turns
// sound on never pays for it.

// Type-only: erased at build time, so it doesn't pull the engine into the main bundle.
import type * as EngineModule from './engine'

type Engine = typeof EngineModule

let enginePromise: Promise<Engine> | null = null
let enabled = false

const loadEngine = () => (enginePromise ??= import('./engine'))

// Must be called from inside a user gesture (a click), or the browser keeps the context suspended.
export const startSound = async () => {
  const engine = await loadEngine()

  await engine.start()
  enabled = true
}

export const stopSound = () => {
  enabled = false

  void loadEngine().then((engine) => engine.stop())
}

// For pagehide: frees the audio device. Only meaningful if the engine was ever loaded.
export const closeSound = () => {
  enabled = false

  void enginePromise?.then((engine) => engine.close())
}

const play = (run: (engine: Engine) => void) => {
  if (!enabled) return

  void loadEngine().then((engine) => {
    if (enabled) run(engine)
  })
}

export const playWhistle = (pattern?: number[]) => play((engine) => engine.whistle(pattern))

// Two short and one long: the full-time whistle.
export const playFinalWhistle = () => play((engine) => engine.whistle([0.18, 0.18, 0.7]))

export const playKick = (strength?: number) => play((engine) => engine.kick(strength))

export const playGoal = () => play((engine) => engine.goal())

export const playBoo = () => play((engine) => engine.boo())
