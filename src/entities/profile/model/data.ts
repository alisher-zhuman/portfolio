import { type Profile } from './types'

// Contacts and the resume are placeholders until the real ones are provided.
export const profile: Profile = {
  brandName: 'Alisher Zhuman',
  nameVariants: ['Алишер Жуманов', 'Алишер Жуманов Бакирович', 'Alizher Zhuman'],
  givenName: 'Alisher',
  familyName: 'Zhuman',
  role: 'Middle Frontend Developer',
  rating: 78,
  position: 'FE → BE',
  shirtNumber: 7,
  stats: [
    { key: 'REACT', value: 86 },
    { key: 'TS', value: 80 },
    { key: 'CSS', value: 88 },
    { key: 'NODE', value: 55 },
    { key: 'SQL', value: 50 },
    { key: 'SEC', value: 62 },
  ],
  strongFoot: 'TypeScript',
  stack: ['React', 'Next.js', 'Svelte', 'TypeScript', 'Tailwind CSS', 'Vite', 'pnpm'],
  contacts: {
    resumeUrl: '/resume.pdf',
    telegramUrl: 'https://t.me/alisher_dev',
    githubUrl: 'https://github.com/alisher-dev',
    email: 'alisher.dev@example.com',
  },
}
