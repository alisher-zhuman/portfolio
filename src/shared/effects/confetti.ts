// One burst of confetti on a throwaway canvas. The canvas exists only for the burst's duration.

export interface ConfettiOptions {
  count?: number
  durationMs?: number
  // Launch height as a share of the viewport, 0 = top.
  originY?: number
}

// Kit red, sun yellow, white, navy, grass green.
const COLORS = ['#c8102e', '#f6c343', '#ffffff', '#13233a', '#3fae5b']

export const burst = ({ count = 140, durationMs = 2200, originY = 0.35 }: ConfettiOptions = {}) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = window.innerWidth
  const height = window.innerHeight

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;z-index:35;pointer-events:none'
  document.body.append(canvas)
  context.scale(dpr, dpr)

  const pieces = Array.from({ length: count }, () => {
    // Fan upwards within ~100° of vertical.
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1
    const speed = 500 + Math.random() * 700

    return {
      x: width / 2 + (Math.random() - 0.5) * width * 0.3,
      y: height * originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 6 + Math.random() * 6,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? '#ffffff',
    }
  })

  const startedAt = performance.now()
  let last = startedAt

  const frame = (now: number) => {
    const dt = Math.min(0.033, (now - last) / 1000)
    last = now
    const elapsed = now - startedAt

    context.clearRect(0, 0, width, height)
    context.globalAlpha = Math.max(0, 1 - elapsed / durationMs)

    for (const piece of pieces) {
      piece.vy += 1400 * dt
      piece.vx *= 0.985
      piece.vy *= 0.985
      piece.x += piece.vx * dt
      piece.y += piece.vy * dt
      piece.rotation += piece.spin * dt

      context.save()
      context.translate(piece.x, piece.y)
      context.rotate(piece.rotation)
      context.fillStyle = piece.color
      // Squashing the width with the rotation reads as a paper strip tumbling in 3D.
      context.fillRect(
        -piece.size / 2,
        -piece.size / 4,
        piece.size * Math.cos(piece.rotation * 2),
        piece.size / 2
      )
      context.restore()
    }

    if (elapsed < durationMs) window.requestAnimationFrame(frame)
    else canvas.remove()
  }

  window.requestAnimationFrame(frame)
}
