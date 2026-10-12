import { type z } from 'zod'

import { type RatingSummarySchema } from './schemas'

export type RatingSummary = z.infer<typeof RatingSummarySchema>
