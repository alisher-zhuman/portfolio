import { type Project } from './types'

export const projects: Project[] = [
  {
    id: 'kcaPublic',
    number: 10,
    title: 'KCA Public Portal',
    isWork: true,
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'kcaAdmin',
    number: 6,
    title: 'KCA Admin Panel',
    isWork: true,
    stack: ['React', 'TypeScript'],
    backendRepo: 'kca-backend',
  },
  {
    id: 'weather',
    number: 11,
    title: 'Svelte Weather Dashboard',
    isWork: false,
    stack: ['Svelte', 'TypeScript', 'Vite'],
    codeUrl: 'https://github.com/alisher-dev',
  },
  {
    id: 'portfolio',
    number: 9,
    title: 'Football Portfolio',
    isWork: false,
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    codeUrl: 'https://github.com/alisher-dev',
  },
]
