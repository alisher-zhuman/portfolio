import { type z } from 'zod'

import { RatingSummarySchema, RatingValueSchema, StoredRatingSchema } from '../model/schemas'
import { type RatingSummary } from '../model/types'

// A stand-in for a real backend, kept behind the same async interface so the swap later is a change
// to the bodies of these two functions and nothing else. The backend version would be:
//
//   export const getRating = async () => {
//     const response = await fetch(`${API_URL}/rating`)
//     if (!response.ok) throw new Error('Не удалось загрузить оценки.')
//     return RatingSummarySchema.parse(await response.json())
//   }
//
//   export const submitRating = async (value: number) => {
//     const response = await fetch(`${API_URL}/rating`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ value: RatingValueSchema.parse(value) }),
//     })
//     if (!response.ok) throw new Error('Не удалось отправить оценку.')
//     return RatingSummarySchema.parse(await response.json())
//   }

const STORAGE_KEY = 'fp-rating'

// Simulated round trip, so the UI's pending state is exercised now rather than first seen in prod.
const LATENCY_MS = 250

type StoredRating = z.infer<typeof StoredRatingSchema>

const EMPTY: StoredRating = { sum: 0, count: 0, mine: null }

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

const read = (): StoredRating => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = StoredRatingSchema.safeParse(raw ? JSON.parse(raw) : null)

    return parsed.success ? parsed.data : EMPTY
  } catch {
    // Unparseable JSON, or storage blocked (private mode, site data disabled).
    return EMPTY
  }
}

const write = (state: StoredRating) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    throw new Error('Браузер не даёт сохранить оценку. Проверьте, не включён ли приватный режим.')
  }
}

const summarize = (state: StoredRating): RatingSummary =>
  RatingSummarySchema.parse({
    average: state.count ? state.sum / state.count : null,
    count: state.count,
    myVote: state.mine,
  })

export const getRating = async (): Promise<RatingSummary> => {
  await wait(LATENCY_MS)

  return summarize(read())
}

// One browser, one vote: voting again replaces the previous vote instead of adding another.
export const submitRating = async (value: number): Promise<RatingSummary> => {
  const parsed = RatingValueSchema.safeParse(value)

  if (!parsed.success) throw new Error('Оценка должна быть целым числом от 1 до 10.')

  await wait(LATENCY_MS)

  const state = read()

  if (state.mine === null) {
    state.count += 1
  } else {
    state.sum -= state.mine
  }

  state.sum += parsed.data
  state.mine = parsed.data
  write(state)

  return summarize(state)
}
