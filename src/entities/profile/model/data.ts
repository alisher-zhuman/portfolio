import { type Profile } from './types'

// Contacts and the resume are placeholders until the real ones are provided.
export const profile: Profile = {
  name: 'Алишер',
  role: 'Middle Frontend Developer',
  club: 'Түндүк',
  hometown: 'Талас',
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
  bio: [
    'Родом из Таласа, живёт в Бишкеке. Middle Frontend Developer в «Түндүк»: делает государственные сервисы, которыми пользуются люди по всей стране.',
    'Учится в колледже на «Информационную безопасность», поэтому думает не только о том, как форма выглядит, но и о том, что в неё могут отправить.',
    'Уже закрывал бэкенд-задачи на рабочем проекте. Хочет играть на этой позиции постоянно.',
  ],
  strongFoot: 'TypeScript',
  scout: {
    strengths:
      'Аккуратная типизация, адаптивная вёрстка, доступность интерфейсов, внимание к безопасности форм.',
    growing: 'Node.js, SQL, проектирование API и работа с базами данных.',
    stack: ['React', 'Next.js', 'Svelte', 'TypeScript', 'Tailwind CSS', 'Vite', 'pnpm'],
    note: 'Иногда пишет CSS в три часа ночи. Тренерский штаб в курсе.',
  },
  transfer: {
    from: 'Frontend',
    to: 'Backend',
    status: 'Переговоры идут',
  },
  contacts: {
    resumeUrl: '/resume.pdf',
    telegramUrl: 'https://t.me/alisher_dev',
    githubUrl: 'https://github.com/alisher-dev',
    email: 'alisher.dev@example.com',
  },
}
