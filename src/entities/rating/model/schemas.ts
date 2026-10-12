import { z } from 'zod'

export const RatingValueSchema = z.int().min(1).max(10)

// What submitRating() and getRating() resolve to — and, once a backend exists, the shape its
// responses are checked against.
export const RatingSummarySchema = z.object({
  // null until the first vote.
  average: z.number().min(1).max(10).nullable(),
  count: z.int().nonnegative(),
  // This browser's own vote, so the form can show it and offer to change it.
  myVote: RatingValueSchema.nullable(),
})

// The localStorage record. Validated on every read: anything that has been hand-edited or written
// by an older version of the site is treated as "no votes yet" rather than trusted.
export const StoredRatingSchema = z.object({
  sum: z.number().nonnegative(),
  count: z.int().nonnegative(),
  mine: RatingValueSchema.nullable(),
})
