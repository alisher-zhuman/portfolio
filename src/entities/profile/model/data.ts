import { type Profile } from './types'

// The resume is still a placeholder PDF.
export const profile: Profile = {
  brandName: 'Alisher Zhuman',
  nameVariants: ['Алишер Жуманов', 'Алишер Жуманов Бакирович', 'Alizher Zhuman'],
  givenName: 'Alisher',
  familyName: 'Zhuman',
  role: 'Middle Frontend Developer',
  rating: 78,
  // Switch to 'open' when job hunting: the hero's flash then reads «Трансферное окно открыто».
  transferWindow: 'closed',
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
    telegramUrl: 'https://t.me/alisher_zh',
    githubUrl: 'https://github.com/alisher-zhuman',
    email: 'zumanovaliser814@gmail.com',
    phone: '+996999101677',
    phoneDisplay: '+996 999 101 677',
  },
}
