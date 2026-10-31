import { describe, expect, it } from 'vitest'

import { careerEvents } from '@entities/career'
import { projects } from '@entities/project'

import en from '../../messages/en.json'
import ky from '../../messages/ky.json'
import ru from '../../messages/ru.json'

// ru.json is the typed source (global.d.ts), so a key missing there fails typecheck. Nothing checks
// ky and en against it — this file does.

type Messages = Record<string, unknown>

// Every leaf as 'A.b.0.c' -> string. Arrays are walked by index, so a list that lost an item in
// one language shows up as a missing key.
const flatten = (value: unknown, prefix = ''): Record<string, string> => {
  if (typeof value === 'string') return { [prefix]: value }

  return Object.entries(value as Messages).reduce<Record<string, string>>(
    (leaves, [key, child]) => ({ ...leaves, ...flatten(child, prefix ? `${prefix}.${key}` : key) }),
    {}
  )
}

// ICU arguments ({count}, {count, plural, …}) and rich-text tags (<author>) a component fills in.
// Plural branches like `one {# год}` don't match: their brace isn't followed by a name.
const slots = (message: string) =>
  [
    ...[...message.matchAll(/\{\s*([A-Za-z_]\w*)\s*[,}]/g)].map(([, name]) => `{${name}}`),
    ...[...message.matchAll(/<(\w+)>/g)].map(([, tag]) => `<${tag}>`),
  ].sort()

const source = flatten(ru)
const locales = { ky: flatten(ky), en: flatten(en) }
const all = { ru: source, ...locales }

describe.each(Object.entries(locales))('%s.json', (_, messages) => {
  it('has exactly the keys of ru.json', () => {
    expect(Object.keys(messages).sort()).toEqual(Object.keys(source).sort())
  })

  it('has no empty strings', () => {
    expect(Object.entries(messages).filter(([, text]) => !text.trim())).toEqual([])
  })

  it('fills the same arguments and tags as ru.json', () => {
    const mismatched = Object.entries(source)
      .filter(
        ([key, text]) => key in messages && slots(text).join() !== slots(messages[key]!).join()
      )
      .map(([key]) => key)

    expect(mismatched).toEqual([])
  })
})

describe.each(Object.entries(all))('%s texts for the data', (_, messages) => {
  // Ids are cast to message keys in the components, so typecheck can't catch a missing one.
  it('has a title and text for every career event', () => {
    const missing = careerEvents
      .flatMap(({ id }) => [`Match.events.${id}.title`, `Match.events.${id}.text`])
      .filter((key) => !(key in messages))

    expect(missing).toEqual([])
  })

  it('has a description for every project, and a title where the data has none', () => {
    const missing = projects
      .flatMap(({ id, title }) => [
        `Projects.items.${id}.description`,
        ...(title ? [] : [`Projects.items.${id}.title`]),
      ])
      .filter((key) => !(key in messages))

    expect(missing).toEqual([])
  })

  it('names every club a project plays for', () => {
    const missing = projects
      .map(({ club }) => `Projects.clubs.${club}`)
      .filter((key) => !(key in messages))

    expect(missing).toEqual([])
  })
})
