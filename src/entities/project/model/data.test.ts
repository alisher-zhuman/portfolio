import { describe, expect, it } from 'vitest'

import { projects } from './data'

const YEAR_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/

describe('projects', () => {
  it('has unique ids', () => {
    const ids = projects.map(({ id }) => id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('dates every project as a real YYYY-MM month', () => {
    const invalid = projects
      .flatMap(({ id, from, to }) => [
        [id, from],
        [id, to ?? from],
      ])
      .filter(([, value]) => value !== 'present' && !YEAR_MONTH.test(value!))

    expect(invalid).toEqual([])
  })

  it('never ends a project before it starts', () => {
    // 'YYYY-MM' strings compare in date order.
    const backwards = projects
      .filter(({ from, to }) => to && to !== 'present' && to < from)
      .map(({ id }) => id)

    expect(backwards).toEqual([])
  })

  it('links only over https', () => {
    const insecure = projects
      .flatMap(({ url, codeUrl }) => [url, codeUrl])
      .filter((link) => link && !link.startsWith('https://'))

    expect(insecure).toEqual([])
  })
})
