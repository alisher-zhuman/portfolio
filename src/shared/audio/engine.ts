// Every sound on the site is synthesised with the Web Audio API — no audio files. Loaded lazily by
// ./index.ts the first time sound is switched on, so none of this ships until a visitor asks for it.

let ctx: AudioContext | null = null
let master: GainNode | null = null
let noiseBuffer: AudioBuffer | null = null
let crowd: { source: AudioBufferSourceNode; gain: GainNode; lfo: OscillatorNode } | null = null

// Created and resumed only from inside a click handler: browsers refuse to start audio otherwise.
export const start = async () => {
  if (!ctx) {
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = 0.7
    master.connect(ctx.destination)
  }

  await ctx.resume()
  startCrowd()
}

export const stop = () => {
  stopCrowd()

  // Let the crowd fade out, then suspend the context so it stops costing battery.
  window.setTimeout(() => {
    if (ctx && !crowd) void ctx.suspend()
  }, 400)
}

// Releases the audio hardware entirely; the next start() builds a fresh context.
export const close = () => {
  crowd = null

  void ctx?.close()

  ctx = null
  master = null
  noiseBuffer = null
}

// Pink noise (Paul Kellet's filter): softer than white noise and much closer to a crowd's murmur.
const getNoise = (audio: AudioContext) => {
  if (noiseBuffer) return noiseBuffer

  const length = audio.sampleRate * 4
  const buffer = audio.createBuffer(1, length, audio.sampleRate)
  const data = buffer.getChannelData(0)
  let b0 = 0
  let b1 = 0
  let b2 = 0
  let b3 = 0
  let b4 = 0
  let b5 = 0
  let b6 = 0

  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + white * 0.0555179
    b1 = 0.99332 * b1 + white * 0.0750759
    b2 = 0.969 * b2 + white * 0.153852
    b3 = 0.8665 * b3 + white * 0.3104856
    b4 = 0.55 * b4 + white * 0.5329522
    b5 = -0.7616 * b5 - white * 0.016898
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
    b6 = white * 0.115926
  }

  noiseBuffer = buffer

  return buffer
}

const noiseSource = (audio: AudioContext) => {
  const source = audio.createBufferSource()
  source.buffer = getNoise(audio)
  source.loop = true

  return source
}

// Background stadium murmur: band-passed noise with a slow swell on its volume.
const startCrowd = () => {
  if (!ctx || !master || crowd) return

  const source = noiseSource(ctx)
  const band = ctx.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = 520
  band.Q.value = 0.6

  const gain = ctx.createGain()
  gain.gain.value = 0
  gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.5)

  // The stands quieten and liven up on a ~8 s cycle.
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.13
  const lfoDepth = ctx.createGain()
  lfoDepth.gain.value = 0.02
  lfo.connect(lfoDepth).connect(gain.gain)

  source.connect(band).connect(gain).connect(master)
  source.start()
  lfo.start()

  crowd = { source, gain, lfo }
}

const stopCrowd = () => {
  if (!ctx || !crowd) return

  const { source, gain, lfo } = crowd
  const t = ctx.currentTime

  gain.gain.cancelScheduledValues(t)
  gain.gain.setValueAtTime(gain.gain.value, t)
  gain.gain.linearRampToValueAtTime(0, t + 0.3)
  source.stop(t + 0.35)
  lfo.stop(t + 0.35)

  crowd = null
}

// A referee's pea whistle: a ~2.9 kHz tone with ~32 Hz frequency modulation, which is the trill the
// pea makes. `pattern` is the length of each blast in seconds.
export const whistle = (pattern: number[] = [0.22]) => {
  if (!ctx || !master) return

  let t = ctx.currentTime + 0.02

  for (const duration of pattern) {
    const tone = ctx.createOscillator()
    tone.frequency.value = 2900

    const trill = ctx.createOscillator()
    trill.frequency.value = 32
    const trillDepth = ctx.createGain()
    trillDepth.gain.value = 180
    trill.connect(trillDepth).connect(tone.frequency)

    const envelope = ctx.createGain()
    envelope.gain.setValueAtTime(0, t)
    envelope.gain.linearRampToValueAtTime(0.16, t + 0.02)
    envelope.gain.setValueAtTime(0.16, t + duration - 0.04)
    envelope.gain.linearRampToValueAtTime(0, t + duration)

    tone.connect(envelope).connect(master)
    tone.start(t)
    trill.start(t)
    tone.stop(t + duration + 0.05)
    trill.stop(t + duration + 0.05)

    t += duration + 0.12
  }
}

// A boot on a ball: a sine dropping fast in pitch plus a short click of high-passed noise.
export const kick = (strength = 1) => {
  if (!ctx || !master) return

  const t = ctx.currentTime

  const thud = ctx.createOscillator()
  thud.frequency.setValueAtTime(160, t)
  thud.frequency.exponentialRampToValueAtTime(45, t + 0.14)
  const thudEnvelope = ctx.createGain()
  thudEnvelope.gain.setValueAtTime(0.5 * strength, t)
  thudEnvelope.gain.exponentialRampToValueAtTime(0.001, t + 0.16)
  thud.connect(thudEnvelope).connect(master)
  thud.start(t)
  thud.stop(t + 0.2)

  const click = noiseSource(ctx)
  const highPass = ctx.createBiquadFilter()
  highPass.type = 'highpass'
  highPass.frequency.value = 1500
  const clickEnvelope = ctx.createGain()
  clickEnvelope.gain.setValueAtTime(0.25 * strength, t)
  clickEnvelope.gain.exponentialRampToValueAtTime(0.001, t + 0.04)
  click.connect(highPass).connect(clickEnvelope).connect(master)
  click.start(t)
  click.stop(t + 0.05)
}

// The stands erupting: wide band-passed noise, a fast rise and a long fall.
const roar = (audio: AudioContext, output: AudioNode, duration: number) => {
  const t = audio.currentTime
  const source = noiseSource(audio)

  const band = audio.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.setValueAtTime(500, t)
  band.frequency.linearRampToValueAtTime(900, t + 0.5)
  band.Q.value = 0.5

  const envelope = audio.createGain()
  envelope.gain.setValueAtTime(0, t)
  envelope.gain.linearRampToValueAtTime(0.5, t + 0.4)
  envelope.gain.setValueAtTime(0.5, t + duration * 0.5)
  envelope.gain.exponentialRampToValueAtTime(0.001, t + duration)

  source.connect(band).connect(envelope).connect(output)
  source.start(t)
  source.stop(t + duration + 0.1)
}

// «Гоооол!» by crude formant synthesis. Two detuned sawtooths (the vocal folds) pass through three
// band-pass filters on the formants of the vowel «о» (~450, 800, 2600 Hz). At the end the second
// formant slides up, which the ear hears as the «л».
const voiceGoal = (audio: AudioContext, output: AudioNode, duration: number) => {
  const t = audio.currentTime + 0.05

  const voice = audio.createGain()
  voice.gain.setValueAtTime(0, t)
  voice.gain.linearRampToValueAtTime(0.9, t + 0.08)
  voice.gain.setValueAtTime(0.9, t + duration - 0.25)
  voice.gain.linearRampToValueAtTime(0, t + duration)
  voice.connect(output)

  const formants = [
    { frequency: 450, q: 7, level: 1 },
    { frequency: 800, q: 9, level: 0.6 },
    { frequency: 2600, q: 12, level: 0.15 },
  ].map(({ frequency, q, level }, index) => {
    const band = audio.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.value = frequency
    band.Q.value = q

    if (index === 1) {
      band.frequency.setValueAtTime(800, t + duration - 0.3)
      band.frequency.linearRampToValueAtTime(1300, t + duration - 0.05)
    }

    const gain = audio.createGain()
    gain.gain.value = level
    band.connect(gain).connect(voice)

    return band
  })

  for (const detune of [0, 7]) {
    const folds = audio.createOscillator()
    folds.type = 'sawtooth'
    folds.detune.value = detune

    // A commentator's intonation: up, hold, down.
    folds.frequency.setValueAtTime(150, t)
    folds.frequency.linearRampToValueAtTime(230, t + 0.25)
    folds.frequency.linearRampToValueAtTime(215, t + duration * 0.8)
    folds.frequency.linearRampToValueAtTime(170, t + duration)

    const vibrato = audio.createOscillator()
    vibrato.frequency.value = 5.5
    const vibratoDepth = audio.createGain()
    vibratoDepth.gain.value = 6
    vibrato.connect(vibratoDepth).connect(folds.frequency)

    formants.forEach((band) => folds.connect(band))
    folds.start(t)
    vibrato.start(t)
    folds.stop(t + duration + 0.1)
    vibrato.stop(t + duration + 0.1)
  }
}

export const goal = () => {
  if (!ctx || !master) return

  roar(ctx, master, 3.2)
  voiceGoal(ctx, master, 1.8)
}

// A short low «бу-у» from the stands, for cards.
export const boo = () => {
  if (!ctx || !master) return

  const t = ctx.currentTime
  const source = noiseSource(ctx)

  const lowPass = ctx.createBiquadFilter()
  lowPass.type = 'lowpass'
  lowPass.frequency.value = 400

  const envelope = ctx.createGain()
  envelope.gain.setValueAtTime(0, t)
  envelope.gain.linearRampToValueAtTime(0.35, t + 0.2)
  envelope.gain.exponentialRampToValueAtTime(0.001, t + 1.2)

  source.connect(lowPass).connect(envelope).connect(master)
  source.start(t)
  source.stop(t + 1.3)
}
