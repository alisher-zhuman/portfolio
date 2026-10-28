import { type PlayerStat, type Profile } from './types'

const stats: PlayerStat[] = [
  { key: 'REACT', value: 86 },
  { key: 'TS', value: 80 },
  { key: 'CSS', value: 88 },
  { key: 'NEXT', value: 82 },
  { key: 'PERF', value: 86 },
  { key: 'A11Y', value: 80 },
]

// The card's overall rating is the rounded mean of the stats, so it can't drift from them.
const getOverallRating = (list: PlayerStat[]) =>
  Math.round(list.reduce((sum, { value }) => sum + value, 0) / list.length)

// The resume is still a placeholder PDF.
export const profile: Profile = {
  brandName: 'Alisher Zhuman',
  nameVariants: ['Алишер Жуманов', 'Алишер Жуманов Бакирович', 'Alizher Zhuman'],
  givenName: 'Alisher',
  familyName: 'Zhuman',
  role: 'Middle Frontend Developer',
  rating: getOverallRating(stats),
  // Switch to 'open' when job hunting: the hero's flash then reads «Трансферное окно открыто».
  transferWindow: 'closed',
  shirtNumber: 7,
  stats,
  stack: [
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Zustand',
    'React Query',
    'React Hook Form',
    'Zod',
    'Vitest',
    'Playwright',
    'Vite',
    'pnpm',
  ],
  contacts: {
    resumeUrl: '/resume.pdf',
    telegramUrl: 'https://t.me/alisher_zh',
    githubUrl: 'https://github.com/alisher-zhuman',
    email: 'zumanovaliser814@gmail.com',
    phone: '+996999101677',
    phoneDisplay: '+996 999 101 677',
  },
}
