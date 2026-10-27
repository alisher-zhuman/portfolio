// Keys of Rate.errors in messages/*.json. The API reports what went wrong as a code; the form turns
// it into words in the visitor's language.
export type RatingErrorCode = 'loadFailed' | 'submitFailed' | 'storageUnavailable' | 'invalidValue'

export class RatingError extends Error {
  code: RatingErrorCode

  constructor(code: RatingErrorCode) {
    super(code)
    this.name = 'RatingError'
    this.code = code
  }
}
